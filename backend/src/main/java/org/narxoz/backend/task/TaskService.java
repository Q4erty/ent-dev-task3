package org.narxoz.backend.task;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.narxoz.backend.auth.domain.entity.User;
import org.narxoz.backend.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task create(String ownerUsername, String title, String description, TaskStatus status, java.time.LocalDate dueDate) {
        User owner = userRepository.findByUsername(ownerUsername)
                .orElseThrow(() -> new IllegalArgumentException("Owner not found"));

        Task t = Task.builder()
                .title(title)
                .description(description)
                .status(status == null ? TaskStatus.TODO : status)
                .dueDate(dueDate)
                .owner(owner)
                .build();

        return taskRepository.save(t);
    }

    public Task update(Long id, String title, String description, TaskStatus status, java.time.LocalDate dueDate) {
        Task t = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (StringUtils.hasText(title)) t.setTitle(title);
        if (description != null) t.setDescription(description);
        if (status != null) t.setStatus(status);
        if (dueDate != null) t.setDueDate(dueDate);

        return taskRepository.save(t);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public Task get(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
    }

    public List<Task> listAll() {
        return taskRepository.findAll();
    }

    public List<Task> listByOwner(String username) {
        return taskRepository.findAllByOwner_Username(username);
    }

    public TaskDto toDto(Task t) {
        return TaskDto.builder()
                .id(t.getId())
                .title(t.getTitle())
                .description(t.getDescription())
                .status(t.getStatus())
                .dueDate(t.getDueDate())
                .ownerUsername(t.getOwner() != null ? t.getOwner().getUsername() : null)
                .createdAt(t.getCreatedAt())
                .updatedAt(t.getUpdatedAt())
                .build();
    }

    public List<TaskDto> toDtoList(List<Task> tasks) {
        return tasks.stream().map(this::toDto).toList();
    }
}
