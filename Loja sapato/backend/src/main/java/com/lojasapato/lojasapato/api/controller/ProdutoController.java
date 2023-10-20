package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.domain.model.Pedido;
import com.lojasapato.lojasapato.domain.model.Produto;
import com.lojasapato.lojasapato.domain.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/produtos")
@AllArgsConstructor
public class ProdutoController {
    private final ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos(){
        return ResponseEntity.ok().body(this.produtoService.listarProdutos());
    }
    @PostMapping
    public ResponseEntity<Produto> cadastrarProduto(@RequestBody Produto produto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.produtoService.cadastrarProduto(produto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produto){
        return ResponseEntity.ok()
                .body(this.produtoService.atualizarProduto(id,produto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Produto> obterProdutoPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(this.produtoService.buscarProdutoPorId(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarPorId(@PathVariable Long id){
        this.produtoService.removerProdutoPorId(id);
        return ResponseEntity.noContent().build();
    }
}
