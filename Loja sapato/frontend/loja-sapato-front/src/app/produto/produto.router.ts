import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListarComponent } from "./listar/listar.component";
import { ProdutoDetalheComponent } from "./detalhe/detalhe.component";
import { ProdutoNovoComponent } from "./novo/novo.component";
import { EditarComponent } from "./editar/editar.component";
import { CheckoutComponent } from "./vendas/checkout/checkout.component";
import { PedidoComponent } from "./vendas/pedido/pedido.component";
import { AdminGuard } from "../admin/services/admin.guars";

const routes: Routes = [
    {path:'cadastrar-produto', component: ProdutoNovoComponent,
        canActivate:[AdminGuard],
        data: [{claim:{nome:'perfil', valor:'ADMIN'}}]
    },
    {path:':id',component: ProdutoDetalheComponent},
    {path:'editar/:id', component: EditarComponent,
        canActivate:[AdminGuard],
        data: [{claim:{nome:'perfil', valor:'ADMIN'}}]
    },
    {path: '', component: ProdutoListarComponent, pathMatch:"full"}, 
    
        
    
        
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProdutoRouter{

}