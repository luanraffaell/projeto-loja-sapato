import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['../usuario.app.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  cadastroForm: FormGroup
  usuario: Usuario
  usuarioId: any
  fieldTextType: boolean;
  errors: any[] = []

  mudancasNaoSalvas: boolean
  
    constructor(private fb: FormBuilder,
       private usuarioService: UsuarioService,
       private activateRoute: ActivatedRoute,
       private route: Router,
       private toastr: ToastrService
       ){

    }
 

  ngOnInit(): void {
    this.usuarioId = this.activateRoute.snapshot.params['id'];
    this.cadastroForm = this.fb.group({
      nome:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      cpf:['',Validators.required],
      tipoUsuario:['',Validators.required],
      id:['']  
    })
    this.usuarioService.buscarUsuarioPorId(this.usuarioId)
      .subscribe((usuario) => {
        this.cadastroForm.patchValue(usuario)
      })
  }
 
  canDeactivate(): boolean {
    if(this.cadastroForm.dirty ||this.cadastroForm.touched) return true;
    return false;
}
  atualizarUsuario(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({},this.usuario,this.cadastroForm.value)

      this.usuarioService.atualizarUsuario(this.usuario)
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
    let toast = this.toastr.success('Registro realizado com sucesso!')
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
