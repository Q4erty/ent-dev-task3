package org.narxoz.backend.task.domain.dto;

import lombok.Data;
import org.narxoz.backend.task.domain.TaskStatus;

import java.time.LocalDate;

@Data
public class UpdateTaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDate dueDate;
}
