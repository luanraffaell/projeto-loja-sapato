import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = []
  errors: any = []
  queryField = new FormControl()
  escolhaRadio: number
  constructor(private usuarioService: UsuarioService,  private toastr: ToastrService){
    this.listarProdutos()
  }


  ngOnInit(): void {
    this.selecionarRadio(2);
    this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      debounceTime(200),
      switchMap((value:any) => this.usuarioFactory(value))
    ).subscribe({
      next: (s) => this.processarSucesso(s,'Produto listado'),
      error: (s) => this.processarFalha(s)
    })
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
  listarProdutos(){
    this.usuarioService.listarTodosUsuarios()
      .subscribe(
        sucesso => {this.processarSucesso(sucesso,'Usuarios listados')},
        falha =>{console.log(falha)}
      )
  }
  deletarUsuario(usuario:any){
    this.usuarioService.deletarUsuarioPorId(usuario.id)
      .subscribe(
        sucesso => {this.processarDelete(sucesso,'Usuario removido com sucesso')},
        falha => {this.processarFalha(falha)}
      )
  }
  processarSucesso(request:any,message: string){
    if(Array.isArray(request)){
      this.usuarios = request;
    }else{
      this.usuarios = [request]
    }
    
  }

  processarFalha(fail: any){
    this.errors = [fail.error.detail]
    this.toastr.error('Ocorreu um erro!','Opa :(')
    
  }
  processarDelete(request:any,message: string){
    this.toastr.success(message)
    this.listarProdutos()
  }

}
