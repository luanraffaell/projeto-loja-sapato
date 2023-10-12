import { ToastrService } from 'ngx-toastr';
import { Produto } from './../models/produto';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto-service.service';
import { CarrinhoService } from '../vendas/carrinho/carrinho.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {
  produtoId:any
  errors: any[] = []
  produto: Produto
  constructor(private produtoService: ProdutoService,
     private activeRoute: ActivatedRoute, private toastr: ToastrService,
      private carrinhoService: CarrinhoService){
  }

  ngOnInit(): void {
   this.produtoId = this.activeRoute.snapshot.params['id']
   this.getProdutoPorId()
   
  }


  getProdutoPorId(){
    this.produtoService.buscarProdutoPorId(this.produtoId)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      )
  }
  processarSucesso(response:Produto){
    this.errors = []
    let toast = this.toastr.success('Produto encontrado')
    if(toast){
      toast.onShown.subscribe(() => {
        this.produto = response;
      })
    }
  }
  processarFalha(fail:any){
    this.errors = [fail.error.detail]
    this.toastr.error('Produto não encontrado')
  }
  adicionarProdutoAoCarrinho(produto:any,quantidade:any){
    let quant = Number(quantidade)
    if(quant > 0){
      this.carrinhoService.adicionarItemQuantidade(produto,quant)
    }
    
  }
}

