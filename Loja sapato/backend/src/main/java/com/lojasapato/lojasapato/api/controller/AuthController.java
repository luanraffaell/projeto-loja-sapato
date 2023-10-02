package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.api.model.LoginDTO;
import com.lojasapato.lojasapato.api.model.UsuarioDTO;
import com.lojasapato.lojasapato.domain.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO auth){
        return ResponseEntity.ok().body(authService.authenticate(auth));
    }
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UsuarioDTO usuario){
        return ResponseEntity.ok().body(authService.register(usuario));
    }

}
