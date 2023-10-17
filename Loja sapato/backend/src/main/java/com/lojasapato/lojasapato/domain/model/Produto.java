package com.lojasapato.lojasapato.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_produto")
public class Produto {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Lob
    private String descricao;
    private BigDecimal preco;
    private Boolean ativo;
    private String imgUrl;

    @OneToMany
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<ProdutoVariacao> corTamanho = new ArrayList<>();


}
