import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoUsuarioComponent } from './criar/novo-usuario.component';
import { DetalheUsuarioComponent } from './detalhe/detalhe-usuario.component';
import { EditarUsuarioComponent } from './editar/editar-usuario.component';
import { ListarUsuarioComponent } from './listar/listar-usuario.component';
import { UsuarioSenhaComponent } from './senha/usuario-senha/usuario-senha.component';
import { EditarSenhaComponent } from './senha/editar-senha/editar-senha.component';

const routes: Routes = [
  {path:'cadastrar-usuario', component: NovoUsuarioComponent},
  {path:'alterar-senha',component: UsuarioSenhaComponent},
  {path:'alterar-senha/:id',component: EditarSenhaComponent},
  {path:'editar/:id', component: EditarUsuarioComponent},
  {path:':id',component: DetalheUsuarioComponent},
  {path: '', component: ListarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
