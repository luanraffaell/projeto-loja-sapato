import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../services/pedido-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.css']
})
export class PedidoDetalheComponent implements OnInit {
 pedidoId:any;
 pedido:any;

  constructor(private pedidoService: PedidoServiceService,
    private activeRoute: ActivatedRoute, private toastr:ToastrService
    ){}

 ngOnInit(): void {
  this.pedidoId = this.activeRoute.snapshot.params['id']
  this.buscarPedidoPorId()
}
buscarPedidoPorId(){
  this.pedidoService.buscarPedidoPorId(this.pedidoId)
      .subscribe({
        next: (r) => this.processarSucesso(r),
        error: (r) => this.processarErro(r)
      });
      
}
processarSucesso(response:any){
  this.pedido = response;
}
processarSucessoPDF(response: Blob){
  const blobUrl = URL.createObjectURL(response);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'nota-fiscal.pdf'; 
  link.style.display = 'none';

  
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

}
processarErro(error: any){
  this.toastr.error('Ops, ocorreu um erro!')
  console.log(error)
}
quantidadeItens(){
  return this.pedido.items.reduce((acc:any,pedido:any) => acc+= pedido.quantidade,0);
}
gerarNotaFiscal(pedidoId:any){
  this.pedidoService.gerarNotaFiscalPdf(pedidoId)
      .subscribe({
        next: (p) => this.processarSucessoPDF(p),
        error: (p) => this.processarErro(p)
      })
}
}
