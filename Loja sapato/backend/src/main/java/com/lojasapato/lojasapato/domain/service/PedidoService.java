package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.domain.model.TipoUsuario;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final UsuarioService usuarioService;
    public List<PedidoResponseDTO>listarPedidos(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = this.usuarioService.findUsuarioByEmail(email);
        if(usuario.getTipoUsuario().equals(TipoUsuario.ADMIN)){
            return this.pedidoRepository.findAll()
                    .stream()
                    .map(pedido -> new PedidoResponseDTO(pedido))
                    .collect(Collectors.toList());
        }
        return this.pedidoRepository.findByVendedorId(usuario.getId())
                .stream().map(pedido -> new PedidoResponseDTO(pedido))
                .collect(Collectors.toList());
    }
    public PedidoResponseDTO buscarOuFalhar(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado um pedido com id:" + id));
        return new PedidoResponseDTO(pedido);

    }
}
