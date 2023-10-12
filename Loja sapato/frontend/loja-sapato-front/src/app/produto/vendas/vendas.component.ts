import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto-service.service';
import { Produto } from '../models/produto';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from './carrinho/carrinho.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  produtos: any
  errors: any = []

  constructor(private produtoService: ProdutoService,
     private carrinhoService: CarrinhoService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.listarProdutos()
  }

    listarProdutos(){
      this.produtoService.listarTodosProdutos()
        .subscribe({
          next: (s) => this.processarSucesso(s),
          error: (s) => this.processarErro(s)
        })
    }
  processarSucesso(response: Produto){  
    this.errors = []
    this.produtos = response;
  }
  processarErro(erro: any){
    this.toastr.success('Falha ao listar produtos')
    this.errors = [erro.error.detail]
  }

  adicionarProdutoAoCarrinho(produto:any){
    this.carrinhoService.adicionarItem(produto);
  }
}
