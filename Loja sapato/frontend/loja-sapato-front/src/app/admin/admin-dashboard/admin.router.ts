import { Component, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { PedidoComponent } from "src/app/produto/vendas/pedido/pedido.component";


const adminRouter: Routes = [
    {
        path:'',component:AdminDashboardComponent,
        children:[
            {path:'produtos',
            loadChildren: () => import('../../produto/produto.module').then(m => m.ProdutoModule)},
            {
            path:'usuarios',
            loadChildren: () => import('../../usuario/usuario.module')
            .then(m => m.UsuarioModule)
            },
            {
            path:'pedidos',
            loadChildren: () => import('../../produto/vendas/vendas.module')
            .then(m => m.VendasModule)
            },
            
        ]
        
    }
    
]

@NgModule({
    imports: [
        RouterModule.forChild(adminRouter)
    ],
    exports: [RouterModule]
})
export class AdminRouterModule{}