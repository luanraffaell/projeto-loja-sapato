package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.Produto;
import com.lojasapato.lojasapato.infrastructure.repositories.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public List<Produto> listarProdutos(){
        return this.produtoRepository.findAll();
    }
    public Produto buscarProdutoPorId(Long id){
        return this.produtoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado um produto com o id:"+id));
    }
    public List<Produto> listarProdutosPorNomeContendo(String nome){
        return this.produtoRepository.findByNomeContaining(nome)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Não foi encontrado produtos com o nome:"+nome));
    }
    @Transactional
    public Produto cadastrarProduto(Produto produto){
        return this.produtoRepository.save(produto);
    }
    public Produto atualizarProduto(Long id,Produto produto){
         Produto produtoAtual = this.buscarProdutoPorId(id);
        BeanUtils.copyProperties(produto,produtoAtual,"id");
        return this.produtoRepository.save(produto);
    }
    @Transactional
    public void removerProdutoPorId(Long id){
        this.produtoRepository.deleteById(id);
    }
}
