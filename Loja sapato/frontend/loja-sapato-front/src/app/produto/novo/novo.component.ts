import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto-service.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css','./foundation-themes.scss']
})
export class ProdutoNovoComponent implements OnInit {
  cadastroForm: FormGroup
  produto: any
  fieldTextType: boolean;
  errors: any[] = []
  chipsModel: string[] = [];

  constructor(private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private produtoService: ProdutoService
    ){}


  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome:['', Validators.required],
      preco:['', [Validators.required]],
      descricao:['',[Validators.required,Validators.minLength(4)]],
      imgUrl:['',Validators.required],
      ativo:[false],
      corTamanho: this.fb.array([])
    })
    this.adicionarCores();
  }
  get cores(){
    return <FormArray>this.cadastroForm?.get('corTamanho')
  }
  adicionarCores(){
    this.cores.push(this.coresForm())
  }
  removerCores(index:any){
    this.cores.removeAt(index);
  }
  coresForm(): FormGroup{
    return new FormGroup({
      cor: new FormControl(''),
      tamanhos: new FormControl('')
    })
  }
  getFinalData(){
    return this.cadastroForm.value.cores;
  }
    adicionarProduto(){
      if(this.cadastroForm.dirty && this.cadastroForm.valid){
        this.produto = Object.assign({},this.produto,this.cadastroForm.value)
        
        let corTamanhoExtract = this.produto.corTamanho.map((x:any) => {
          let prod = {
            cor: x.cor,
            tamanhos: x.tamanhos.map((f:any) => f.value)
          }
          return prod;
        })
        this.produto.corTamanho = corTamanhoExtract;
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
          this.route.navigate(['admin/produtos'])
        })
      }
    }
    processarFalha(response:any){
      this.errors = [response.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    }
    isInputInvalid(field: string) {
      const control = this.cadastroForm.get(field);
      return control?.errors && (control?.touched || control?.dirty);
    }
    isInputValid(field: string) {
      const control = this.cadastroForm.get(field);
      return control?.valid && (control?.touched || control?.dirty);
    }


    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
}
