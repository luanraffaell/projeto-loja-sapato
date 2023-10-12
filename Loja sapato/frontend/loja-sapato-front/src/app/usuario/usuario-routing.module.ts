import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoUsuarioComponent } from './criar/novo-usuario.component';
import { DetalheUsuarioComponent } from './detalhe/detalhe-usuario.component';
import { EditarUsuarioComponent } from './editar/editar-usuario.component';
import { ListarUsuarioComponent } from './listar/listar-usuario.component';

const routes: Routes = [
  {path:'cadastrar-usuario', component: NovoUsuarioComponent},
  {path:'editar/:id', component: EditarUsuarioComponent},
  {path:':id',component: DetalheUsuarioComponent},
  {path: '', component: ListarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
