package com.jee.back.service;

import com.jee.back.dto.FeedbackDTO;
import com.jee.back.dto.FeedbackResponseDTO;
import com.jee.back.entity.Feedback;
import com.jee.back.entity.User;
import com.jee.back.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public FeedbackDTO saveFeedback(String userEmail, String content) {
        User user = userService.getUserByEmail(userEmail);

        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setContent(content);
        feedbackDTO.setUser(user);
        feedbackDTO.setCreatedAt(LocalDateTime.now());
        Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
        Feedback savedFeedback = feedbackRepository.save(feedback);
        FeedbackDTO returnFeedback = modelMapper.map(savedFeedback, FeedbackDTO.class);
        return returnFeedback;
    }

    public List<Feedback> getFeedbackByUser(User user) {
        return feedbackRepository.findByUser(user);
    }

    public List<FeedbackResponseDTO> getAllFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(FeedbackResponseDTO::new).collect(Collectors.toList());
    }
}
