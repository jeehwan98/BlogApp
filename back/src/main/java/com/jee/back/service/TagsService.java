package com.jee.back.service;

import com.jee.back.repository.TagsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;
}
