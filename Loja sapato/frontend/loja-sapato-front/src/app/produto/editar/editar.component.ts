import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto-service.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../produto.component.css']
})
export class EditarComponent implements OnInit {
    cadastroForm: FormGroup;
    productId: number;
    fieldTextType: boolean;
    produto: Produto;
    errors: any[] = []

    constructor(
      private formBuilder: FormBuilder,
      private produtoService: ProdutoService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
    ){

    }
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];

    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['', Validators.required],
      ativo:['',Validators.required],
      imgUrl:['',Validators.required],
      id:['']
    })

    this.produtoService.buscarProdutoPorId(this.productId)
      .subscribe((produto) => {
        this.cadastroForm.patchValue(produto)
      })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  isInputInvalid(field: string) {
    const control = this.cadastroForm.get(field);
    return control?.errors && (control?.touched || control?.dirty);
  }
  
  isInputValid(field: string) {
    const control = this.cadastroForm.get(field);
    return control?.valid && (control?.touched || control?.dirty);
  }
  adicionarProduto(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.produto = Object.assign({},this.produto,this.cadastroForm.value)
      this.produtoService.cadastrarProduto(this.produto)
          .subscribe(
            sucesso => {this.processarSucesso(sucesso)},
            falha => {this.processarFalha(falha)}
          )
    }
    
  }
  processarSucesso(response: Produto){
    this.cadastroForm.reset()
    this.errors = []
    let toast = this.toastr.success('Cadastro realizado com sucesso!')
    if(toast){
      toast.onShown.subscribe(() => {
        this.router.navigate(['admin/produtos'])
      })
    }
  }
  processarFalha(response:any){
    this.errors = [response.error.detail]
  this.toastr.error('Ocorreu um erro!','Opa :(')
  }
}
