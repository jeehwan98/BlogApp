package com.jee.back.service;

import com.jee.back.entity.Blog;
import com.jee.back.repository.TagsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;

    public List<Blog> findByTagName(String tagName) {
        return tagsRepository.findByTagName(tagName);
    }
}
