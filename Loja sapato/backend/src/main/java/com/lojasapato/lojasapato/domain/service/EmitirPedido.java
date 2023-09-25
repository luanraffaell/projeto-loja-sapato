package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.FormaPagamento;
import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.domain.model.Produto;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmitirPedido {
    private final UsuarioService usuarioService;
    private final FormaPagamentoService formaPagamentoService;
    private final ProdutoService produtoService;
    private final PedidoRepository pedidoRepository;

    @Transactional
    public Pedido emitirPedido(Pedido pedido){
        validarPedido(pedido);
        validarItens(pedido);
        pedido.calcularValorTotal();
        return pedidoRepository.save(pedido);
    }

    private void validarPedido(Pedido pedido) {
        Usuario funcionario = this.usuarioService.buscarOuFalhar(pedido.getFuncionario().getId());
        FormaPagamento formaPagamento =
                this.formaPagamentoService.buscarFormaPagamentoPorId(pedido.getFormaPagamento().getId());
        pedido.setFuncionario(funcionario);
        pedido.setFormaPagamento(formaPagamento);
    }

    private void validarItens(Pedido pedido) {
        pedido.getItens().forEach(item -> {
            Produto produto = this.produtoService.buscarProdutoPorId(item.getId().getProduto().getId());
            item.getId().setPedido(pedido);
            item.getId().setProduto(produto);
            item.setPrecoUnitario(produto.getPreco());
        });
    }


    public Pedido buscarOuFalhar(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado um pedido com id:"+id));
    }
}
