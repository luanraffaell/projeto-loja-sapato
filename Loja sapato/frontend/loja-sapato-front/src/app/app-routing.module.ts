import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { VendasComponent } from './produto/vendas/vendas.component';
import { CheckoutComponent } from './produto/vendas/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'admin',
    loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule)
  },
  {path: 'conta',
    loadChildren: () => import('./conta/conta.module')
        .then(m => m.ContaModule)
  },
  {path:'vendas',
    loadChildren:() => import('./produto/vendas/vendas.module')
        .then(m => m.VendasModule)
},
  {path: '**',component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
