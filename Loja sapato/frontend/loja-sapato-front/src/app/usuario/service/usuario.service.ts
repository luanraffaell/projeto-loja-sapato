import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(private http: HttpClient) { super()}

    listarTodosUsuarios(): Observable<Usuario>{ 
      return this.http.get<Usuario>(this.urlServiceV1 + 'usuarios',this.obterHeaderAuth())
            .pipe(catchError(this.serviceError))
    }
    buscarUsuarioPorId(id:any): Observable<Usuario>{
      return this.http.get<Usuario>(this.urlServiceV1 + `usuarios/${id}`,this.obterHeaderAuth())
            .pipe(catchError(this.serviceError))
    }

    registrarUsuario(usuario: Usuario): Observable<Usuario>{        
      return this.http.post<Usuario>(this.urlServiceV1 + 'usuarios',usuario,this.obterHeaderAuth())
             .pipe(catchError(this.serviceError))
    }
    deletarUsuarioPorId(id:any): Observable<any>{
      return this.http.delete(this.urlServiceV1 + `usuarios/${id}`,this.obterHeaderAuth())
              .pipe(catchError(this.serviceError))
    }
    atualizarUsuario(usuario:Usuario): Observable<Usuario>{
      return this.http.put<Usuario>(this.urlServiceV1 + `usuarios/${usuario.id}`,
      usuario,this.obterHeaderAuth())
        .pipe(catchError(this.serviceError))
    }
}
