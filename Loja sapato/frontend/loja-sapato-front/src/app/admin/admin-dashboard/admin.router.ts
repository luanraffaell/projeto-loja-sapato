import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard.component";


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
            }
            
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