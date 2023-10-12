import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../services/pedido-service.service';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
errors:any = []
pedidos: any = [];
  constructor(private pedidoService: PedidoServiceService,
    private toastr: ToastrService
    ){}

ngOnInit(): void {
  this.pedidoService.listarPedidos()
      .subscribe({
        next: (s) => this.processarSucesso(s),
        error: (s) => this.processarErro(s)
      })
}
processarSucesso(response:any){
  this.pedidos = response;
}
processarErro(error: any){
  this.toastr.error('Ops, ocorreu um erro!')
}
}
