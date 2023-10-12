import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService extends BaseService {

  constructor(private http: HttpClient) {super() }

  criarPedido(pedido:any): Observable<any>{
    return this.http.post<any>(this.urlServiceV1 + 'pedidos',pedido,this.obterHeaderAuth())
        .pipe(catchError(this.serviceError))
  }
  listarPedidos(): Observable<any>{
    return this.http.get<any>(this.urlServiceV1 + 'pedidos',this.obterHeaderAuth())
        .pipe(catchError(this.serviceError))
  }
  buscarPedidoPorId(id:any): Observable<any>{
    return this.http.get<any>(this.urlServiceV1 + `pedidos/${id}`,this.obterHeaderAuth())
        .pipe(catchError(this.serviceError))
  }
  gerarNotaFiscalPdf(id:any){
    return this.http.get(this.urlServiceV1 + `pedidos/gerar-nota/${id}`,{headers: this.obterHeaderPdfAuth().headers, responseType:'blob'})
  }
}
