package org.narxoz.backend.task;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<TaskDto>> myTasks(@AuthenticationPrincipal UserDetails user) {
        var tasks = taskService.listByOwner(user.getUsername());
        return ResponseEntity.ok(taskService.toDtoList(tasks));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TaskDto>> allTasks() {
        var tasks = taskService.listAll();
        return ResponseEntity.ok(taskService.toDtoList(tasks));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<TaskDto> get(@PathVariable Long id, @AuthenticationPrincipal UserDetails user) {
        Task t = taskService.get(id);
        if (!isOwnerOrAdmin(user, t)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(taskService.toDto(t));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<TaskDto> create(@Valid @RequestBody CreateTaskRequest req,
                                          @AuthenticationPrincipal UserDetails user) {
        Task created = taskService.create(user.getUsername(), req.getTitle(), req.getDescription(), req.getStatus(), req.getDueDate());
        return ResponseEntity.created(URI.create("/api/tasks/" + created.getId()))
                .body(taskService.toDto(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<TaskDto> update(@PathVariable Long id,
                                          @RequestBody UpdateTaskRequest req,
                                          @AuthenticationPrincipal UserDetails user) {
        Task t = taskService.get(id);
        if (!isOwnerOrAdmin(user, t)) return ResponseEntity.status(403).build();
        Task updated = taskService.update(id, req.getTitle(), req.getDescription(), req.getStatus(), req.getDueDate());
        return ResponseEntity.ok(taskService.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal UserDetails user) {
        Task t = taskService.get(id);
        if (!isOwnerOrAdmin(user, t)) return ResponseEntity.status(403).build();
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private boolean isOwnerOrAdmin(UserDetails user, Task t) {
        boolean admin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean owner = t.getOwner() != null && t.getOwner().getUsername().equals(user.getUsername());
        return admin || owner;
    }
}
