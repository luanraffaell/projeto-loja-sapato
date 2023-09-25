package com.lojasapato.lojasapato.api.model;

import com.lojasapato.lojasapato.domain.model.Usuario;
import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String tipoUsuario;

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.tipoUsuario = usuario.getTipoUsuario().name();
    }
}