package com.lojasapato.lojasapato.infrastructure.repositories;

import com.lojasapato.lojasapato.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    Optional<Usuario> findUsuarioByEmail(String email);
}
