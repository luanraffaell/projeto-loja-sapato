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



@NgModule({
  declarations: [
    NovoUsuarioComponent,
    DetalheUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent
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
    ListarUsuarioComponent
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }
