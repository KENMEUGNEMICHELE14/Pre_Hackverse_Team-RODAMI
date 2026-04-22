package com.hackverse.antiproc.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(min = 3, max = 50, message = "Le nom d'utilisateur doit faire entre 3 et 50 caractères.")
    private String username;

    @Email(message = "Format d'email invalide.")
    private String email;

    private String currentPassword;

    @Size(min = 8, max = 128,
            message = "Le mot de passe doit contenir entre 8 et 128 caractères.")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
            message = "Le mot de passe doit contenir au moins une majuscule et un chiffre.")
    private String newPassword;
}
