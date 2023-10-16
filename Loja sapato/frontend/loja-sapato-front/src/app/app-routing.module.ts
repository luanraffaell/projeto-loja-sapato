import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { AdminGuard } from './admin/services/admin.guars';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,
  canActivate:[AdminGuard]},
  {path:'admin',
    loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule),
    canActivate:[AdminGuard],
    data: [{claim:{nome:'perfil', valor:'ADMIN'}}]
  },
  {path: 'conta',
    loadChildren: () => import('./conta/conta.module')
        .then(m => m.ContaModule)
  },
  {path:'vendas',
    loadChildren:() => import('./produto/vendas/vendas.module')
        .then(m => m.VendasModule),
        canActivate:[AdminGuard],
},
  {path: 'acesso-negado',component:AcessoNegadoComponent},
  {path: '**',component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
