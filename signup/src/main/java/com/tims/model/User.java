package com.tims.model;

import java.sql.Timestamp;

public class User {
    private int id;
    private String username;
    private String email;
    private String password; // hashed password
    private String role;     // USER or ADMIN
    private Timestamp createdAt;

    public User() {}

    public User(int id, String username, String email, String password, String role, Timestamp createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + '\'' +
               ", email='" + email + '\'' + ", role='" + role + '\'' +
               ", createdAt=" + createdAt + '}';
    }
}
