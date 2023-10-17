package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.api.model.AuthenticationResponse;
import com.lojasapato.lojasapato.api.model.LoginDTO;
import com.lojasapato.lojasapato.api.model.UsuarioDTO;
import com.lojasapato.lojasapato.domain.model.TipoUsuario;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.config.jwt.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private UsuarioService usuarioService;
    private UserDetailsService userDetailsService;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;

    public AuthenticationResponse register(UsuarioDTO usuarioDTO){
        Usuario user = Usuario.builder()
                .nome(usuarioDTO.getNome())
                .email(usuarioDTO.getEmail())
                .senha(passwordEncoder.encode(usuarioDTO.getSenha()))
                .tipoUsuario(TipoUsuario.valueOf(usuarioDTO.getTipoUsuario().toUpperCase()))
                .cpf(usuarioDTO.getCpf())
                .build();
        user = usuarioService.criarUsuario(user);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(user.getUsername(),token,user.getTipoUsuario().name());
    }
    public AuthenticationResponse authenticate(LoginDTO login){
        var auth = new UsernamePasswordAuthenticationToken(login.email(),login.senha());
        authenticationManager.authenticate(auth);
        UserDetails userDetails = userDetailsService.loadUserByUsername(login.email());
        String token = jwtService.generateToken(userDetails);
        Usuario usuario = (Usuario) userDetails;
        return new AuthenticationResponse(userDetails.getUsername(), token, usuario.getTipoUsuario().name());
    }
}
