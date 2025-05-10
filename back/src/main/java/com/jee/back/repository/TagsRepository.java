package com.jee.back.repository;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagsRepository extends JpaRepository<Tags, Integer> {
    Optional<Tags> findByName(String tagName);

    @Query(value = "SELECT DISTINCT b.* " +
            "FROM blogs b " +
            "JOIN blog_tags bt ON b.id = bt.blog_id " +
            "JOIN tags t ON bt.tag_id = t.id " +
            "WHERE t.name = :tagName", nativeQuery = true)
    List<Blog> findByTagName(String tagName);
}
