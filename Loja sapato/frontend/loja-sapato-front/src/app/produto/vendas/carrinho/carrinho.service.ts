import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<any[]>([])
  carrinho$ = this.carrinhoSubject.asObservable();

  adicionarItem(item: any) {
    const carrinhoAtual = this.carrinhoSubject.value;
    const productExistInCart = carrinhoAtual.find((prod:any) => prod.id === item.id && prod.cor === item.cor && prod.tamanho === item.tamanho)
    if (!productExistInCart) {
      carrinhoAtual.push({ ...item, qtd: 1 }); // enhance "porduct" object with "num" property
      this.carrinhoSubject.next(carrinhoAtual);
      return;
    }
    productExistInCart.qtd +=1;
    
    this.carrinhoSubject.next(carrinhoAtual);
  }
  adicionarItemQuantidade(item: any,quantidade:number) {
    const carrinhoAtual = this.carrinhoSubject.value;
    const productExistInCart = carrinhoAtual.find(({id}:any) => id === item.id)
    if (!productExistInCart) {
      carrinhoAtual.push({ ...item, qtd: quantidade }); // enhance "porduct" object with "num" property
      this.carrinhoSubject.next(carrinhoAtual);
      return;
    }
    productExistInCart.qtd +=quantidade;
    
    this.carrinhoSubject.next(carrinhoAtual);
  }
  decrementarQuantidade(index: any){
    let carrinhoAtual = this.carrinhoSubject.value;
    let productExistInCart = carrinhoAtual[index];
    if(productExistInCart.qtd < 2){
      this.removerItem(index);
      return;
    }
    productExistInCart.qtd --;
    carrinhoAtual[productExistInCart] = productExistInCart;
    this.carrinhoSubject.next(carrinhoAtual);
  }

  removerItem(index: number) {
    const carrinhoAtual = this.carrinhoSubject.value;
    carrinhoAtual.splice(index, 1);
    this.carrinhoSubject.next(carrinhoAtual);
  }

  resetarCarrinho(){
    const carrinhoAtual = this.carrinhoSubject.value;
    this.carrinhoSubject.next([]);
  }
}
