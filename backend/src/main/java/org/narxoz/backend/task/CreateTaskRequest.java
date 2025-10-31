package org.narxoz.backend.task;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskRequest {
    @NotBlank
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDate dueDate;
}
