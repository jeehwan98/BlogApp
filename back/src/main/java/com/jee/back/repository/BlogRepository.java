package com.jee.back.repository;

import com.jee.back.entity.Blog;
import com.jee.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByUser(User user);

}
