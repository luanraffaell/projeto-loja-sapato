import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';

@Injectable()
export class ProdutoService extends BaseService  {

  constructor(private http: HttpClient) { super()}

  listarTodosProdutos(): Observable<any>{ 
    return this.http.get<any>(this.urlServiceV1 + 'produtos',this.obterHeaderAuth())
           .pipe(catchError(this.serviceError))
}
listarTodosProdutosPorNome(nome:any): Observable<any>{ 
  const params = { name: nome };
  let url = this.urlServiceV1 + 'produtos';
  url +=`?nome=${params.name}`;
  return this.http.get<any>(url, this.obterHeaderAuth())
         .pipe(catchError(this.serviceError))
}
cadastrarProduto(produto:Produto): Observable<Produto>{
    return this.http.post<Produto>(this.urlServiceV1 + 'produtos',produto, this.obterHeaderAuth())
            .pipe(catchError(this.serviceError))
}
atualizarProduto(produto:Produto): Observable<Produto>{
  return this.http.put<Produto>(this.urlServiceV1 + `produtos/${produto.id}`,produto, this.obterHeaderAuth())
          .pipe(catchError(this.serviceError))
}
buscarProdutoPorId(id:number): Observable<any>{
  return this.http.get<any>(this.urlServiceV1 +`produtos/${id}`,this.obterHeaderAuth())
    .pipe(catchError(this.serviceError))
}
deletarProdutoPorId(id:number):Observable<any>{
  return this.http.delete(this.urlServiceV1 + `produtos/${id}`,this.obterHeaderAuth())
  .pipe(catchError(this.serviceError))
}

}
