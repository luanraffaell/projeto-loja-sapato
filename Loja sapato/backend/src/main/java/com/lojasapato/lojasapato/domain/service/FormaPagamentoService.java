package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.model.FormaPagamento;
import com.lojasapato.lojasapato.infrastructure.repositories.FormaPagamentoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FormaPagamentoService {
    private final FormaPagamentoRepository formaPagamentoRepository;

    @Transactional
    public FormaPagamento cadastrarFormaPagamento(FormaPagamento formaPagamento){
        return this.formaPagamentoRepository.save(formaPagamento);
    }
    public FormaPagamento buscarFormaPagamentoPorId(Long id){
        return this.formaPagamentoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Forma de pagamento com id "+id+" não encontrada!"));
    }
    public List<FormaPagamento> listarFormasDePagamento(){
        return this.formaPagamentoRepository.findAll();
    }
}
