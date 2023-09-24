package com.lojasapato.lojasapato.infrastructure.repositories;

import com.lojasapato.lojasapato.domain.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {
    Optional<List<Produto>> findByNomeContaining(String nome);
}
