package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.api.model.PedidoRequestDTO;
import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.service.EmitirPedido;
import com.lojasapato.lojasapato.domain.service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/pedidos")
@AllArgsConstructor
public class PedidoController {
    private final PedidoService pedidoService;
    private final EmitirPedido emitirPedido;

    @GetMapping
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidos(){
        return ResponseEntity.ok().body(this.pedidoService.listarPedidos());
    }
    @PostMapping
    public ResponseEntity<PedidoResponseDTO> emitirPedido(@RequestBody PedidoRequestDTO pedidoDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.emitirPedido.emitirPedido(pedidoDTO));
    }
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponseDTO> buscarPedidoPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(this.pedidoService.buscarOuFalhar(id));
    }
}
