import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContaAppComponent } from './conta.app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaRouterModule } from './conta.route';
import { ContaService } from './services/conta.service';
import { ContaGuard } from '../services/conta.guard';


@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    ContaAppComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ContaService,ContaGuard
  ]
})
export class ContaModule { }
