package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;

    public List<Pedido>listarPedidos(){
        return this.pedidoRepository.findAll();
    }
}
