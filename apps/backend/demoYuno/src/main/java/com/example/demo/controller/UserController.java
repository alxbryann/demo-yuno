package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User", description = "The User API")
public class UserController {

    private List<String> users = new ArrayList<>();

    public UserController() {
        users.add("Alice");
        users.add("Bob");
    }

    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @GetMapping
    public List<String> getAllUsers() {
        return users;
    }

    @Operation(summary = "Get a user by name", description = "Returns a single user")
    @GetMapping("/{name}")
    public String getUser(@PathVariable String name) {
        return users.stream()
                .filter(u -> u.equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }

    @Operation(summary = "Create a new user", description = "Adds a new user to the list")
    @PostMapping
    public String createUser(@RequestBody String name) {
        users.add(name);
        return "User " + name + " created";
    }
}
