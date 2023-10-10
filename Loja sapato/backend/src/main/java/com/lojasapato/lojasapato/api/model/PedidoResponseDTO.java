package com.lojasapato.lojasapato.api.model;

import com.lojasapato.lojasapato.domain.model.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoResponseDTO {
    private Long id;
    private BigDecimal valorTotal;
    private String statusPedido;
    private String formaPagamento;
    private LocalDateTime data;
    private String protocolo;
    private List<ItemDTO> items = new ArrayList<>();
    private UsuarioDTO funcionario;

    public PedidoResponseDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.valorTotal = pedido.getValorTotal();
        this.statusPedido = pedido.getStatusPedido().name();
        this.formaPagamento = pedido.getFormaPagamento().getDescricao();
        pedido.getItens().forEach(item -> items.add(new ItemDTO(item)));
        this.funcionario = new UsuarioDTO(pedido.getFuncionario());
        this.data = pedido.getDataCriacao();
        this.protocolo = pedido.getProtocolo();
    }
}
