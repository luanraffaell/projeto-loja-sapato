package com.lojasapato.lojasapato.api.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.lojasapato.lojasapato.domain.model.ItemPedido;
import lombok.Data;

import java.math.BigDecimal;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder("produto")
public class ItemDTO {
    @JsonProperty("produto")
    private ProdutoDTO produtoDTO;
    private Integer quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal precoTotal;
    private String cor;
    private Integer tamanho;
    private String observacao;

    public ItemDTO(ItemPedido itemPedido) {
        this.produtoDTO = new ProdutoDTO(itemPedido.getProduto());
        this.produtoDTO.setImgUrl(this.buscarUrlImagem(itemPedido));
        this.quantidade = itemPedido.getQuantidade();
        this.precoUnitario = itemPedido.getPrecoUnitario();
        this.precoTotal = itemPedido.getPrecoTotal();
        this.observacao = itemPedido.getObservacao();
        this.cor = itemPedido.getCor();
        this.tamanho = itemPedido.getTamanho();
    }
    private String buscarUrlImagem(ItemPedido item){
        return item.getProduto()
                .getCorTamanho().stream()
                .filter(p -> p.getCor().equals(item.getCor())).findFirst().get().getImgUrl();

    }
}
