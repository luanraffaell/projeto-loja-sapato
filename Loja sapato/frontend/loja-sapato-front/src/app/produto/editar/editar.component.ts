import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto-service.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../novo/novo.component.css','../novo/foundation-themes.scss']
})
export class EditarComponent implements OnInit {
    cadastroForm: FormGroup;
    productId: number;
    fieldTextType: boolean;
    produto: any;
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
      id:[''],
      corTamanho: this.formBuilder.array([]),
    })
 
    this.produtoService.buscarProdutoPorId(this.productId)
      .subscribe((produto) => {
        produto.corTamanho.forEach((cor: any) => {
          cor.tamanhos = cor.tamanhos.map((tamanho: number) => tamanho.toString());
          this.carregarCores(cor.cor, cor.tamanhos, cor.imgUrl);
        });
        this.cadastroForm.patchValue(produto)
      })
      
  }
  get cores(){
    return <FormArray>this.cadastroForm?.get('corTamanho')
  }
  adicionarCores(){
    this.cores.push(this.coresForm())
  }
  carregarCores(cor: string, tamanhos: string, imgUrl: string) {
    const control = this.coresForm();
    control.patchValue({ cor, tamanhos, imgUrl });
    this.cores.push(control);
  }
  removerCores(index:any){
    this.cores.removeAt(index);
  }
  coresForm(): FormGroup{
    return new FormGroup({
      cor: new FormControl(''),
      tamanhos: new FormControl(''),
      imgUrl: new FormControl('')
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
      let corTamanhoExtract = this.produto.corTamanho.map((x:any) => {
        let prod = {
          cor: x.cor,
          tamanhos: x.tamanhos.map((f:any) => {
            if(!(f instanceof Object)){
              return f;
            }
           return f.value
          }),
          imgUrl: x.imgUrl
        }
        return prod;
      })
      this.produto.corTamanho = corTamanhoExtract;
      this.produtoService.atualizarProduto(this.produto)
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
