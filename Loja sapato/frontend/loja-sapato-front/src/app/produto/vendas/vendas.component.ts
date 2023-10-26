import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto-service.service';
import { Produto } from '../models/produto';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from './carrinho/carrinho.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  produtos: any
  errors: any = []
  queryField = new FormControl()

  constructor(private produtoService: ProdutoService,
     private carrinhoService: CarrinhoService, private toastr: ToastrService){
      this.listarProdutos()
     }

  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        switchMap((value:any) => this.produtoService.listarTodosProdutosPorNome(value))
      ).subscribe({
        next: (s) => this.processarSucesso(s),
        error: (s) => this.processarErro(s)
      })
  }

  listarProdutosPorNome(value:any){
     this.produtoService.listarTodosProdutosPorNome(value)
       .subscribe({
         next: (s) => this.processarSucesso(s),
         error: (s) => this.processarErro(s)
       })
   }
   listarProdutos(){
    this.produtoService.listarTodosProdutos()
      .subscribe({
        next: (s) => this.processarSucesso(s),
        error: (s) => this.processarErro(s)
      })
  }
  processarSucesso(response: any){  
    this.errors = []
    this.produtos = response;
  }
  processarErro(erro: any){
    this.toastr.success('Falha ao listar produtos')
    this.errors = [erro.error.detail]
  }

 
}
