package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.api.model.AuthenticationResponse;
import com.lojasapato.lojasapato.api.model.LoginDTO;
import com.lojasapato.lojasapato.api.model.UsuarioDTO;
import com.lojasapato.lojasapato.domain.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDTO auth){
        return ResponseEntity.ok().body(authService.authenticate(auth));
    }
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UsuarioDTO usuario){
        return ResponseEntity.ok().body(authService.register(usuario));
    }

}
