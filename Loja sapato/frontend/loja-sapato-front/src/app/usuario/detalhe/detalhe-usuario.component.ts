import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
  styleUrls: ['./detalhe-usuario.component.css']
})
export class DetalheUsuarioComponent implements OnInit {
  usuarioId:any
  errors: any[] = []
  usuario: Usuario

  constructor(private usuarioService: UsuarioService,
     private activeRoute: ActivatedRoute, private toastr: ToastrService){
  }

  ngOnInit(): void {
   this.usuarioId = this.activeRoute.snapshot.params['id']
   this.getUsuarioPorId()
  }

  getUsuarioPorId(){
    this.usuarioService.buscarUsuarioPorId(this.usuarioId)
      .subscribe(
        sucesso => {console.log(sucesso),this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      )
  }
  processarSucesso(response:Usuario){
    this.errors = []
    let toast = this.toastr.success('Produto encontrado')
    if(toast){
      toast.onShown.subscribe(() => {
        this.usuario = response;
      })
    }
  }
  processarFalha(fail:any){
    this.errors = [fail.error.detail]
    this.toastr.error('Produto não encontrado')
  }
}
