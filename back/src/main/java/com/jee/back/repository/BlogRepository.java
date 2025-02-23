package com.jee.back.repository;

import com.jee.back.entity.Blog;
import com.jee.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByUser(User user);
}
