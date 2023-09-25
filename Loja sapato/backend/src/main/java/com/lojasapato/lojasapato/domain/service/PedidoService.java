package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.infrastructure.repositories.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;

    public List<PedidoResponseDTO>listarPedidos(){
        return this.pedidoRepository.findAll()
                .stream()
                .map(pedido -> new PedidoResponseDTO(pedido))
                .collect(Collectors.toList());
    }
}
