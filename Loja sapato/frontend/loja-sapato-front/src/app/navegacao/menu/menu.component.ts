import { Component } from '@angular/core';
import { CarrinhoService } from 'src/app/produto/vendas/carrinho/carrinho.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 localStorage = new LocalStorageUtils()

 showMenuAuth(permissao:any){
  let user = this.localStorage.obterUsuario()
  if(user.perfil === permissao){
    return true;
  }
  return false;
 }
 showMenu(){
  let user = this.localStorage.obterUsuario()
  if(user.perfil){
    return true;
  }
  return false;
 }
}
