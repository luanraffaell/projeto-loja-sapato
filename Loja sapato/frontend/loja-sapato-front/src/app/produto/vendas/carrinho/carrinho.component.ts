import { Component } from '@angular/core';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  carrinho: any[] = [];
  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.carrinho$.subscribe((carrinho) =>{
      this.carrinho = carrinho;
    })
  }

  adicionarAoCarrinho(item: any) {
    this.carrinhoService.adicionarItem(item);
  }

  removerDoCarrinho(index: number) {
    this.carrinhoService.removerItem(index);
  }
  valorTotal(){
    return this.carrinho.reduce((acc,prod) => acc+= prod.preco * prod.qtd,0);
  }
  quantidadeItems(){
    return this.carrinho.reduce((acc,prod) => acc+= prod.qtd,0);
  }
}
