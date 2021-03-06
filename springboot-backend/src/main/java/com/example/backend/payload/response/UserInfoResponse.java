package com.example.backend.payload.response;

import com.example.backend.model.Role;

import java.util.ArrayList;
import java.util.List;

public class UserInfoResponse {

    private long id;
    private String username;
    private String email;
    private List<String> roles = new ArrayList<>();
    /*
    * Default constructor is used by hibernate internal user proxies to create proxy objects
    * */
    public UserInfoResponse() {
    }

    public UserInfoResponse(long id, String username, String email, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
