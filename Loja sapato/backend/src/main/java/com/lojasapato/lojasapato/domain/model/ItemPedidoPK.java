package com.lojasapato.lojasapato.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Embeddable
public class ItemPedidoPK implements Serializable {
    @JsonIgnore
    @EqualsAndHashCode.Include
    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
    @EqualsAndHashCode.Include
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;


}
