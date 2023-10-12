import { Usuario } from './../models/usuario';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../services/conta.service';


import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['../conta.app.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup
  usuario: Usuario
  fieldTextType: boolean;
  errors: any[] = []

  mudancasNaoSalvas: boolean
  
    constructor(private fb: FormBuilder,
       private contaService: ContaService,
       private route: Router,
       private toastr: ToastrService
       ){

    }
 

  ngOnInit(): void {
    
    this.cadastroForm = this.fb.group({
      nome:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      senha:['',[Validators.required,Validators.minLength(5)]],
      cpf:['',Validators.required],
      tipoUsuario:['',Validators.required]
      
    })
  }


 
  canDeactivate(): boolean {
    if(this.cadastroForm.dirty ||this.cadastroForm.touched) return true;
    return false;
}
  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({},this.usuario,this.cadastroForm.value)

      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso)},
          falha => {this.processarFalha(falha)}
        )
        // this.contaService.registrarUsuario(this.usuario)
        // .subscribe({
        //   next: (s) => this.processarSucesso(s),
        //   error: (s) => this.processarFalha(s)
        // })
    }
  }
  processarSucesso(response: any){
    this.cadastroForm.reset()
    this.errors = []
    this.contaService.LoocalStorage.salvarDadosLocaisUsuario(response)
    let toast = this.toastr.success('Registro realizado com sucesso!','Bem vindo!!!')
      if(toast){
        toast.onShown.subscribe(() => {
          this.route.navigate(['/home'])
        })
      }
      this.mudancasNaoSalvas = false
    
  }
  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
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

}
