import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = []
  errors: any = []

  constructor(private usuarioService: UsuarioService,  private toastr: ToastrService){}


  ngOnInit(): void {
    this.listarProdutos()
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
    this.toastr.success(message)
    this.usuarios = request;
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
