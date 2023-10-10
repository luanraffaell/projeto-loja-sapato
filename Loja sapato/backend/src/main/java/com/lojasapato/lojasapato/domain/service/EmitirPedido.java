package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.api.model.PedidoRequestDTO;
import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.*;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EmitirPedido {
    private final UsuarioService usuarioService;
    private final FormaPagamentoService formaPagamentoService;
    private final ProdutoService produtoService;
    private final PedidoRepository pedidoRepository;

    @Transactional
    public PedidoResponseDTO emitirPedido(PedidoRequestDTO pedidoDTO){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = this.usuarioService.findUsuarioByEmail(email);
        pedidoDTO.setVendedorId(usuario.getId());
        Pedido pedido = converterEValidarPedidoDTO(pedidoDTO);
        pedido.calcularValorTotal();
        pedido.setStatusPedido(StatusPedido.CRIADO);
        pedido = pedidoRepository.save(pedido);
        pedido.setProtocolo(this.gerarProtocolo(pedido.getId()));
        return new PedidoResponseDTO(pedidoRepository.save(pedido));
    }
    private String gerarProtocolo(Long idProduto){
        String ano = String.valueOf(LocalDateTime.now().getYear());
        String mes = String.valueOf(LocalDateTime.now().getMonth().getValue());
        String id = String.valueOf(idProduto);
        return ano+mes+"00"+id;
    }
    private Pedido converterEValidarPedidoDTO(PedidoRequestDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        Usuario funcionario = this.usuarioService.buscarOuFalhar(pedidoDTO.getVendedorId());
        FormaPagamento formaPagamento =
                this.formaPagamentoService.buscarFormaPagamentoPorId(pedidoDTO.getFormaPagamentoId());
        pedido.setFuncionario(funcionario);
        pedido.setFormaPagamento(formaPagamento);
        pedido.setItens(this.validarItens(pedidoDTO,pedido));
        return pedido;
    }

    private List<ItemPedido> validarItens(PedidoRequestDTO pedidoDTO, Pedido pedido) {
        List<ItemPedido> listaDeItens = new ArrayList<>();
        pedidoDTO.getItens().forEach(item -> {
            Produto produto = this.produtoService.buscarProdutoPorId(item.getId());
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.getId().setPedido(pedido);
            itemPedido.getId().setProduto(produto);
            itemPedido.setPrecoUnitario(produto.getPreco());
            itemPedido.setQuantidade(item.getQuantidade());
            listaDeItens.add(itemPedido);
        });
        return listaDeItens;
    }


    public Pedido buscarOuFalhar(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado um pedido com id:"+id));
    }
}
