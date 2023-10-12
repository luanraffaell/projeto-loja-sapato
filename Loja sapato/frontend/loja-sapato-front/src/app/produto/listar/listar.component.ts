import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto-service.service';
import { ToastrService } from 'ngx-toastr';



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

  constructor(private produtoService: ProdutoService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.listarProdutos()
  }

  listarProdutos(){
    this.produtoService.listarTodosProdutos()
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
    this.toastr.success(message)
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
