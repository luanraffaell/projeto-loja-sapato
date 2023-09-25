package com.lojasapato.lojasapato.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.lojasapato.lojasapato.domain.model.ItemPedido;
import lombok.Data;

import java.math.BigDecimal;
@Data
@JsonPropertyOrder("produto")
public class ItemDTO {
    @JsonProperty("produto")
    private ProdutoDTO produtoDTO;
    private Integer quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal precoTotal;
    private String observacao;

    public ItemDTO(ItemPedido itemPedido) {
        this.produtoDTO = new ProdutoDTO(itemPedido.getId().getProduto());
        this.quantidade = itemPedido.getQuantidade();
        this.precoUnitario = itemPedido.getPrecoUnitario();
        this.precoTotal = itemPedido.getPrecoTotal();
        this.observacao = itemPedido.getObservacao();
    }
}
