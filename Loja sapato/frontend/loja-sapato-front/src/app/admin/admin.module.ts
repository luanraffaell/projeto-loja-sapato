import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRouterModule } from './admin-dashboard/admin.router';
import { ProdutoModule } from '../produto/produto.module';
import { ContaService } from '../conta/services/conta.service';
import { ProdutoService } from '../produto/services/produto-service.service';
import { AdminGuard } from './services/admin.guars';



@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouterModule,
    ProdutoModule
   
  ],
  exports: [AdminDashboardComponent],
  providers:[ContaService, ProdutoService, AdminGuard]
})
export class AdminModule { }
