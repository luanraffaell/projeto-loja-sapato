package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.exception.NegocioException;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public Usuario findUsuarioByEmail(String email){
        Optional<Usuario> usuarioAtual = this.usuarioRepository.findUsuarioByEmail(email);
        if(usuarioAtual.isEmpty()){
            throw new EntidadeNaoEncontradaException("Não foi encontrado um usuário com o email:"+email);
        }
        return usuarioAtual.get();
    }
    @Transactional
    public Usuario criarUsuario(Usuario usuario){
        Optional<Usuario> usuarioAtual = this.usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        if(usuarioAtual.isPresent()){
            throw new NegocioException("Já existe um usuario cadastrado com o email:"+usuario.getEmail());
        }
        return this.usuarioRepository.save(usuario);
    }
}
