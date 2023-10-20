package com.lojasapato.lojasapato.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_item_pedido")
public class ItemPedido implements Serializable {
//    @EmbeddedId
//    private ItemPedidoPK id = new ItemPedidoPK();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
    private Integer quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal precoTotal;
    private String cor;
    private Integer tamanho;
    private String observacao;

    public ItemPedido(Pedido pedido,Produto produto, Integer quantidade) {
        super();
        this.pedido = pedido;
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = produto.getPreco();
    }
    public void calcularPrecoTotal() {
        BigDecimal precoUnitario = this.getPrecoUnitario();
        Integer quantidade = this.getQuantidade();

        if (precoUnitario == null) {
            precoUnitario = BigDecimal.ZERO;
        }

        if (quantidade == null) {
            quantidade = 0;
        }

        this.setPrecoTotal(precoUnitario.multiply(new BigDecimal(quantidade)));
    }
}
