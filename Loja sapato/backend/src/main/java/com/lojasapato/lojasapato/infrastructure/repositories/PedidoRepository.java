package com.lojasapato.lojasapato.infrastructure.repositories;

import com.lojasapato.lojasapato.domain.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido,Long> {
}
