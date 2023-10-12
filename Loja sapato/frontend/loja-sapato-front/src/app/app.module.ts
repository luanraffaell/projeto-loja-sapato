import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { AdminModule } from './admin/admin.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VendasModule } from './produto/vendas/vendas.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.handler.service';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true
  }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    AdminModule,
    BrowserAnimationsModule, // required animations module
    ProdutoModule,
    UsuarioModule,
    VendasModule,
    ToastrModule.forRoot(),
    HttpClientModule  
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
