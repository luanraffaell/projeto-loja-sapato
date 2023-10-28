package com.lojasapato.lojasapato.domain.service;

import com.itextpdf.text.DocumentException;
import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.domain.model.TipoUsuario;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import com.lojasapato.lojasapato.utils.NotaFiscalPdf;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final UsuarioService usuarioService;
    private final NotaFiscalPdf notaFiscalPdf;
    public List<PedidoResponseDTO>listarPedidos(String protocolo){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = this.usuarioService.findUsuarioByEmail(email);
        if(usuario.getTipoUsuario().equals(TipoUsuario.ADMIN)){
            if(protocolo == null || protocolo.isEmpty()){
                return this.pedidoRepository.findAll()
                        .stream()
                        .map(pedido -> new PedidoResponseDTO(pedido))
                        .collect(Collectors.toList());
            }
            List<Pedido> pedidos = this.pedidoRepository.findByProtocoloContainingIgnoreCase(protocolo)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Pedido não encontrado"));
            return pedidos.stream().map(p -> new PedidoResponseDTO(p)).collect(Collectors.toList());
        }
        if(protocolo == null || protocolo.isEmpty()) {
            return this.pedidoRepository.findByVendedorId(usuario.getId())
                    .stream().map(pedido -> new PedidoResponseDTO(pedido))
                    .collect(Collectors.toList());
        }
        List<Pedido> pedidos = this.pedidoRepository.findByProtocoloContainingIgnoreCase(protocolo)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Pedido não encontrado"));
        return pedidos.stream()
                .filter(p -> p.getId() == usuario.getId())
                .map(pedido -> new PedidoResponseDTO(pedido))
                .collect(Collectors.toList());
    }
    public PedidoResponseDTO buscarOuFalhar(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado um pedido com id:" + id));
        return new PedidoResponseDTO(pedido);

    }
    public byte[] gerarNota(Long id) throws DocumentException, IOException {
        PedidoResponseDTO pedido = this.buscarOuFalhar(id);
        return this.notaFiscalPdf.createNotaFiscalPdf(pedido);

    }
}
