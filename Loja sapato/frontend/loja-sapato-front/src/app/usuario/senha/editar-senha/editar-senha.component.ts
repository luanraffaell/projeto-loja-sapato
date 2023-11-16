import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-senha',
  templateUrl: './editar-senha.component.html',
  styleUrls: ['./editar-senha.component.css','../../usuario.app.component.css']
})
export class EditarSenhaComponent implements OnInit {
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
      nome:[''],
      email:[''],
      id:[this.usuarioId],
      senha:['', [Validators.required,Validators.minLength(5)]]
    })
    this.usuarioService.buscarUsuarioPorId(this.usuarioId)
      .subscribe((usr) => {
        this.cadastroForm.patchValue({
          nome: usr.nome,
          email: usr.email
        })
      })
  }
  atualizarUsuario(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({},this.usuario,this.cadastroForm.value)
      this.usuarioService.alterarSenha(this.usuario)
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
    let toast = this.toastr.success('Senha atualizada com sucesso!')
      if(toast){
        toast.onShown.subscribe(() => {
          this.route.navigate(['/admin','usuarios','alterar-senha'])
        })
      }
      this.mudancasNaoSalvas = false
    
  }
  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
  }
  isInputInvalid(field: string) {
    const control = this.cadastroForm.get(field);
    return control?.errors && (control?.touched || control?.dirty);
  }
  isSenhaInvalid(field: string) {
    const control = this.cadastroForm.get(field);
    const senha = this.cadastroForm.get('senha');
    return control?.errors && (control?.touched || control?.dirty) && !(control.value === senha?.value);
  }
 
  isInputValid(field: string) {
    const control = this.cadastroForm.get(field);
    return control?.valid && (control?.touched || control?.dirty);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
