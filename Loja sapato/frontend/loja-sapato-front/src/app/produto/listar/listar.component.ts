import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ProdutoListarComponent implements OnInit {
  produtos: any = []
  errors: any = []
  currentProduct = null;
  currentIndex = -1;
  name = '';
  queryField = new FormControl()
  constructor(private produtoService: ProdutoService, private toastr: ToastrService){
    this.listarProdutos()
  }

  ngOnInit(): void {
    this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      debounceTime(200),
      switchMap((value:any) => this.produtoService.listarTodosProdutosPorNome(value))
    ).subscribe({
      next: (s) => this.processarSucesso(s,'Produto listado'),
      error: (s) => this.processarFalha(s)
    })
  }

  listarProdutos(){
    this.produtoService.listarTodosProdutos()
      .subscribe(
        sucesso => {this.processarSucesso(sucesso,'Produtos listados')},
        falha =>{console.log(falha)}
      )
  }
  listarTodosProdutosPorNome(value:any){
    this.produtoService.listarTodosProdutosPorNome(value)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso,'Produtos listados')},
        falha =>{console.log(falha)}
      )
  }
  deletarProduto(produto: any){
    this.produtoService.deletarProdutoPorId(produto.id)
      .subscribe(
        sucesso => {this.processarDelete(sucesso,'Produto deletado com sucesso')},
        falha => {this.processarFalha(falha)}
      )
  }
  processarSucesso(request:any,message: string){
    this.produtos = request;
  }
  processarDelete(request:any,message: string){
    this.toastr.success(message)
    this.listarProdutos()
  }
  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
  }
  
  refresh(){}
  setCurrentProduct(product:any, index:any){
    console.log(product,index)
  }
  deleteAllProducts(){}
  searchByName(){}

}
