package com.lojasapato.lojasapato.api.model;

import com.lojasapato.lojasapato.domain.model.TipoUsuario;

public record AuthenticationDTO(String nome, String email, String password, TipoUsuario userType){};
