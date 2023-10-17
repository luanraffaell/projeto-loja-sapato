import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarComponent } from './editar/editar.component';
import { ProdutoListarComponent } from './listar/listar.component';
import { ProdutoNovoComponent } from './novo/novo.component';
import { ProdutoDetalheComponent } from './detalhe/detalhe.component';
import { ProdutoRouter } from './produto.router';
import { ProdutoService } from './services/produto-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrinhoService } from './vendas/carrinho/carrinho.service';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    EditarComponent,
    ProdutoListarComponent,
    ProdutoNovoComponent,
    ProdutoDetalheComponent,
  ],
  imports: [
    CommonModule,
    ProdutoRouter,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
    
  ],
  exports: [
    EditarComponent,
    ProdutoListarComponent,
    ProdutoNovoComponent,
    ProdutoDetalheComponent,
  ],
  providers: [
    ProdutoService, CarrinhoService
  ]
})
export class ProdutoModule { }
