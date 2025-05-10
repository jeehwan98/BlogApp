package com.jee.back.repository;

import com.jee.back.entity.Blog;
import com.jee.back.entity.BlogsLike;
import com.jee.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogsLikeRepository extends JpaRepository<BlogsLike, Integer> {
    @Query("SELECT bl FROM BlogsLike bl WHERE bl.blog.id = :blogId")
    List<BlogsLike> findByBlogId(@Param("blogId") int blogId);

    @Query("SELECT bl FROM BlogsLike bl WHERE bl.user.email = :email")
    List<BlogsLike> findByUserEmail(String email);

    Optional<BlogsLike> findByBlogAndUser(Blog blog, User user);

    @Query("SELECT COUNT(bl) FROM BlogsLike bl WHERE bl.blog = :blog")
    int countByBlog(@Param("blog") Blog blog);

    @Query("SELECT COUNT(bl) FROM BlogsLike bl WHERE bl.user = :user")
    long countByUser(@Param("user") User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM BlogsLike bl WHERE bl.blog = :blog AND bl.user = :user")
    int deleteByBlogAndUser(@Param("blog") Blog blog, @Param("user") User user);
}
