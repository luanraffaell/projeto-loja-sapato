import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['../usuario.app.component.css']
})
export class NovoUsuarioComponent {

  cadastroForm: FormGroup
  usuario: Usuario
  fieldTextType: boolean;
  errors: any[] = []

  mudancasNaoSalvas: boolean
  
    constructor(private fb: FormBuilder,
       private contaService: UsuarioService,
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
         .subscribe({
           next: (s) => this.processarSucesso(s),
           error: (s) => this.processarFalha(s)
         })
    }
  }
  processarSucesso(response: any){
    this.cadastroForm.reset()
    this.errors = []
    let toast = this.toastr.success('Registro realizado com sucesso!','Bem vindo!!!')
      if(toast){
        toast.onShown.subscribe(() => {
          this.route.navigate(['/admin','usuarios'])
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
