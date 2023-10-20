package com.lojasapato.lojasapato.api.model;

import lombok.Data;

@Data
public class ProdutoRequestDTO {
    private Long id;
    private Integer quantidade;
    private String cor;
    private Integer tamanho;
}
