package org.narxoz.backend.task;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDate dueDate;
    private String ownerUsername;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
