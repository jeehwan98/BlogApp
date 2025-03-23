package com.jee.back.service;

import com.jee.back.dto.BlogsDTO;
import com.jee.back.dto.PostBlogDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.BlogsLike;
import com.jee.back.entity.Tags;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogRepository;
import com.jee.back.repository.BlogsLikeRepository;
import com.jee.back.repository.TagsRepository;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final TagsRepository tagsRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BlogsLikeRepository blogsLikeRepository;

    public Blog saveBlog(PostBlogDTO postBlogDTO, User user) {
        postBlogDTO.setCreatedAt(LocalDateTime.now());
        postBlogDTO.setUpdatedAt(postBlogDTO.getCreatedAt());
        Set<Tags> tags = new HashSet<>();
        for (String tagName : postBlogDTO.getTags()) {
            Tags tag = tagsRepository.findByName(tagName)
                    .orElseGet(() -> tagsRepository.save(new Tags(tagName))); // create new tag if it doesn't exist
            tags.add(tag);
        }
        Blog blog = modelMapper.map(postBlogDTO, Blog.class);
        blog.setTags(tags);
        blog.setUser(user);

        System.out.println("blog to be saved?: " + blog.toString());
        return blogRepository.save(blog);
    }

    @Transactional(readOnly = true)
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<BlogsDTO> getBlogs(User currentUser) {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream()
                .map(blog -> new BlogsDTO(blog, currentUser))
                .collect(Collectors.toList());
    }

    public List<BlogsDTO> getBlogsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
        List<Blog> blogs = blogRepository.findByUser(user);
        return blogs.stream().map(BlogsDTO::new).collect(Collectors.toList());
    }

    public Blog getBlogById(int id) {
        return blogRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Blog not found for id: " + id));
    }

    public void saveBlogsLike(BlogsLike blogsLike) {
        blogsLikeRepository.save(blogsLike);
    }

    public List<BlogsLike> getBlogsLikeById(int id) {
        List<BlogsLike> blogsLikes = blogsLikeRepository.findByBlogId(id);
        if (blogsLikes.isEmpty()) {
            throw new IllegalArgumentException("No likes found for blogId: " + id);
        }
        return blogsLikes;
    }

    public List<BlogsLike> getBlogsLikeFromUser(String email) {
        List<BlogsLike> blogsLikes = blogsLikeRepository.findByUserEmail(email);
        if (blogsLikes.isEmpty()) {
            throw new IllegalArgumentException("No likes found for email: " + email);
        }

        return blogsLikes;
    }

    public void deleteBlogLike(Blog blog, User user) {
        int deletedCount = blogsLikeRepository.deleteByBlogAndUser(blog, user);
        log.info("Deleted {} BlogsLike entries for blog {} and user {}", deletedCount, blog.getId(), user.getId());
        if (deletedCount == 0) {
            throw new IllegalStateException("No BlogsLike found to delete for blog " + blog.getId() + " and user " + user.getId());
        }
    }
}
