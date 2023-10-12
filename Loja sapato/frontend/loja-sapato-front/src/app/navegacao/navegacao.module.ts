import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MenuLoginComponent } from './menu/menu-component/menu-login.component';
import { CarrinhoService } from '../produto/vendas/carrinho/carrinho.service';
import { ProdutoModule } from '../produto/produto.module';
import { VendasModule } from '../produto/vendas/vendas.module';




@NgModule({
  declarations: [ 
    MenuComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    MenuLoginComponent

  ],
  imports: [
    CommonModule,RouterModule,
    AppRoutingModule,
    ProdutoModule,
    VendasModule
  ],
  exports:[
    MenuComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent
  ],
  providers:[
    CarrinhoService
  ]
})
export class NavegacaoModule { }
