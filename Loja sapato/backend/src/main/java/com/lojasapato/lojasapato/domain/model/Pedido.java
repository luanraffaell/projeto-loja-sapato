package com.lojasapato.lojasapato.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_pedido")
public class Pedido {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal subtotal;
    private BigDecimal valorTotal;
    @Enumerated(EnumType.STRING)
    private StatusPedido statusPedido;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private FormaPagamento formaPagamento;
    @OneToMany(mappedBy = "id.pedido", cascade = CascadeType.ALL)
    private List<ItemPedido> itens = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "usuario_funcionario_id")
    private Usuario funcionario;
    @CreationTimestamp
    private LocalDateTime dataCriacao;
    private String protocolo;

    public void calcularValorTotal(){
        this.getItens().forEach(ItemPedido::calcularPrecoTotal);
        this.subtotal = this.getItens()
                .stream()
                .map(item -> item.getPrecoTotal())
                .reduce(BigDecimal.ZERO,BigDecimal::add);
        this.valorTotal = subtotal;
    }

}
