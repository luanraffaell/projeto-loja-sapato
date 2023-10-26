import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NovoUsuarioComponent } from './criar/novo-usuario.component';
import { DetalheUsuarioComponent } from './detalhe/detalhe-usuario.component';
import { EditarUsuarioComponent } from './editar/editar-usuario.component';
import { ListarUsuarioComponent } from './listar/listar-usuario.component';
import { UsuarioService } from './service/usuario.service';
import { UsuarioSenhaComponent } from './senha/usuario-senha/usuario-senha.component';
import { EditarSenhaComponent } from './senha/editar-senha/editar-senha.component';



@NgModule({
  declarations: [
    NovoUsuarioComponent,
    DetalheUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    UsuarioSenhaComponent,
    EditarSenhaComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    NovoUsuarioComponent,
    DetalheUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    UsuarioSenhaComponent,
    EditarSenhaComponent
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }
