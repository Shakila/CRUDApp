package com.example.backend.payload.request;

import com.example.backend.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    Set<Role> roles;
}
