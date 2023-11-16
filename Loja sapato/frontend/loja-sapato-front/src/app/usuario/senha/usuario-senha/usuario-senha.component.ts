import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, switchMap } from 'rxjs';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-senha',
  templateUrl: './usuario-senha.component.html',
  styleUrls: ['./usuario-senha.component.css']
})
export class UsuarioSenhaComponent implements OnInit {
  usuarios: Usuario[] = []
  errors: any = []
  queryField = new FormControl()
  escolhaRadio: number
  constructor(private usuarioService: UsuarioService,  private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.selecionarRadio(2);
    this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      debounceTime(200),
      switchMap((value:any) => this.usuarioFactory(value))
    ).subscribe({
      next: (s) => this.processarSucesso(s,'Usuario listado'),
      error: (s) => this.processarFalha(s)
    })
  }

  buscarUsuario(){
    this.usuarioService.listarTodosUsuarios()
      .subscribe(
        sucesso => {this.processarSucesso(sucesso,'Usuarios listados')},
        falha =>{console.log(falha)}
      )
  }
  getPlaceholder(){
    if(this.escolhaRadio ===2) return 'Pesquisar usuario por email';
    return 'Pesquisar usuario por CPF'
  }
  selecionarRadio(valor: number): void {
    this.escolhaRadio = valor;
  }
  usuarioFactory(value:any): Observable<any>{
    if(this.escolhaRadio === 2){
      return this.usuarioService.listarUsuarioPorEmail(value);
    }
    return this.usuarioService.listarUsuarioPorCpf(value);
    
  }
  processarSucesso(request:any,message: string){
    if(!(this.queryField.value === '')){
      this.usuarios = request;
    }
      
  }

  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
  }


}
