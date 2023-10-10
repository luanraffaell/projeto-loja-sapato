package com.lojasapato.lojasapato.infrastructure.repositories;

import com.lojasapato.lojasapato.domain.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido,Long> {
    @Query("SELECT p FROM Pedido p WHERE p.funcionario.id = :id")
    List<Pedido> findByVendedorId(@Param("id") Long id);
}
