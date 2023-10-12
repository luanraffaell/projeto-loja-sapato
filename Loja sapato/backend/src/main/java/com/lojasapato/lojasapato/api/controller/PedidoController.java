package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.api.model.PedidoRequestDTO;
import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import com.lojasapato.lojasapato.domain.service.EmitirPedido;
import com.lojasapato.lojasapato.domain.service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
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
    @GetMapping("/gerar-nota/{pedidoId}")
    public ResponseEntity<byte[]> gerarNota(@PathVariable Long pedidoId){
        try{
            byte[] pedidoPDF = this.pedidoService.gerarNota(pedidoId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "nota-fiscal.pdf");

            return new ResponseEntity<>(pedidoPDF, headers, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
