import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../models/pedido';
import { PedidoServiceService } from '../services/pedido-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carrinho: any = []
  cadastroForm: FormGroup
  pedido: Pedido = new Pedido()
  constructor(private carrinhoService: CarrinhoService,
     private fb: FormBuilder,
      private pedidoService: PedidoServiceService,
      private toastr: ToastrService, private router:Router
      ){}

  ngOnInit(): void {
    this.buscarItens()
    this.cadastroForm = this.fb.group({
      selectField: ['', Validators.required]
    })
    
  }

  enviarPedido(){
   this.montarPedido()
   console.log(this.pedido)
   this.pedidoService.criarPedido(this.pedido)
      .subscribe({
        next: (s) => this.processarSucesso(s),
        error: (s) => this.processarErro(s)
      })
  }
  processarSucesso(response:any){
    const toast = this.toastr.success('Pedido criado com sucesso!');
    if(toast){
      toast.onShown.subscribe(() =>{
        this.router.navigate([`vendas/pedidos/${response.id}`])
        this.carrinhoService.resetarCarrinho()
      })
    }
    
  }
  processarErro(error: any){
    this.toastr.error('Ops, ocorreu um erro!')
  }
  montarPedido(){
    this.pedido.vendedorId = 0,
    this.pedido.formaPagamentoId = this.cadastroForm.get('selectField')?.value;
    this.pedido.itens = this.carrinho.map((p:any) => {
      let pedido = {
        id: Number,
        quantidade: Number,
        cor: String,
        tamanho: Number
      }
      pedido.id = p.id;
      pedido.quantidade = p.qtd;
      pedido.cor = p.cor;
      pedido.tamanho = p.tamanho;
      return pedido;
    })
  }

  buscarItens(){
    this.carrinhoService.carrinho$.subscribe((carrinho) =>{
      this.carrinho = carrinho
    })
  }
  adicionarItem(produto:any){
    this.carrinhoService.adicionarItem(produto);
  }
  decrementarItem(index:any){
    this.carrinhoService.decrementarQuantidade(index);
  }
  removerDoCarrinho(index: number) {
    this.carrinhoService.removerItem(index);
  }
  valorTotal(){
    return this.carrinho.reduce((acc:any,prod:any) => acc+= prod.preco * prod.qtd,0);
  }
  quantidadeItems(){
    return this.carrinho.reduce((acc:any,prod:any) => acc+= prod.qtd,0);
  }
}
