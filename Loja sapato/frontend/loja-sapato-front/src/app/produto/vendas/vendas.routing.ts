import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VendasComponent } from "./vendas.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { PedidoDetalheComponent } from "./pedido-detalhe/pedido-detalhe.component";
import { ProdutoDetalheComponent } from "../detalhe/detalhe.component";


const routes: Routes = [
    {path:'checkout', component: CheckoutComponent},
    {path:'pedidos', component: PedidoComponent},
    {path:'pedidos/:id',component: PedidoDetalheComponent},
    {path:'produto/:id',component: ProdutoDetalheComponent},
    {path: '', component: VendasComponent, pathMatch:"full"},  
        
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class VendasRouter{

}