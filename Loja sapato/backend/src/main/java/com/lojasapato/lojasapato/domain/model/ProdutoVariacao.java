package com.lojasapato.lojasapato.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Data
@Entity
@Table(name = "tb_produto_variacao")
public class ProdutoVariacao implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cor;

    @ElementCollection
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @CollectionTable(name = "tb_produto_tamanho", joinColumns = @JoinColumn(name = "variacao_id"))
    @Column(name = "tamanho")
    private List<Integer> tamanhos = new ArrayList<>();
    @Lob
    private String imgUrl;

}
