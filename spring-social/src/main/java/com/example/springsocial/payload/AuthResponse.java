package com.example.springsocial.payload;

import java.util.List;
import lombok.Data;

public @Data class AuthResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private Long id;
  private String email;
  private List<String> roles;

  public AuthResponse(String accessToken, Long id, String email, List<String> roles) {
    this.accessToken = accessToken;
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}
