import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasComponent } from './vendas.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendasRouter } from './vendas.routing';
import { PedidoServiceService } from './services/pedido-service.service';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';



@NgModule({
  declarations: [
    VendasComponent,
    CarrinhoComponent,
    CheckoutComponent,
    PedidoComponent,
    PedidoDetalheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VendasRouter
  ],
  exports:[
    VendasComponent,
    CarrinhoComponent,
    CheckoutComponent,
    PedidoComponent,
    PedidoDetalheComponent
  ],
  providers: [
    PedidoServiceService
  ]
})
export class VendasModule { }
