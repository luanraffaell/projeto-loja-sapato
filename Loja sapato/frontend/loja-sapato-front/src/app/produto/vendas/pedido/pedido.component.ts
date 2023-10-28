import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../services/pedido-service.service';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../models/pedido';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
errors:any = []
pedidos: any = [];
queryField = new FormControl()
  constructor(private pedidoService: PedidoServiceService,
    private toastr: ToastrService
    ){this.listarPedidos()}

ngOnInit(): void {
  this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      debounceTime(200),
      switchMap((value:any) => this.pedidoService.listarTodosPedidosPorProtocolo(value))
    ).subscribe({
      next: (s) => this.processarSucesso(s),
      error: (s) => this.processarErro(s)
    })
    
}
listarPedidos(){
  this.pedidoService.listarPedidos().subscribe({
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
