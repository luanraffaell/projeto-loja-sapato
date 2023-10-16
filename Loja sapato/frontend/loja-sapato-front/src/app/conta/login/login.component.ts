import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../conta.app.component.css']
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  fieldTextType: boolean;

  errors: any[] = []
  usuario: Usuario

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private route: Router,
    private toastr: ToastrService
    ){

 }
  ngOnInit(): void {
    this.initRegForm()
   
  }

  initRegForm() {
    this.registrationForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", Validators.required]
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  login(){
    if(this.registrationForm.dirty && this.registrationForm.valid){
      this.usuario = Object.assign({},this.usuario,this.registrationForm.value)
      this.contaService.login(this.usuario)
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
    this.registrationForm.reset()
    this.errors = []

    this.contaService.LoocalStorage.salvarDadosLocaisUsuario(response)
    let toast = this.toastr.success('Login realizado sucesso!','Bem vindo!!!');
      if(toast){
        toast.onShown.subscribe(() => {
          this.route.navigate(['/home'])
        })
      }
    
  }
  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
  }

}

