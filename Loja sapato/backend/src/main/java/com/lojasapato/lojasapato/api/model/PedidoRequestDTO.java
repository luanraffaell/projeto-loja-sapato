package com.lojasapato.lojasapato.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRequestDTO {
    private Long vendedorId;
    private Long formaPagamentoId;
    private List<ProdutoRequestDTO> itens = new ArrayList<>();
}
