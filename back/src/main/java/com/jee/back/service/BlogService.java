package com.jee.back.service;

import com.jee.back.dto.PostBlogDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.Tags;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogRepository;
import com.jee.back.repository.TagsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final TagsRepository tagsRepository;
    private final ModelMapper modelMapper;

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

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
}
