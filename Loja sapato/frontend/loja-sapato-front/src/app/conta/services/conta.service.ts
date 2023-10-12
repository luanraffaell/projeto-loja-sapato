import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";
import { Observable, catchError, map } from "rxjs";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class ContaService extends BaseService{
    constructor(private http: HttpClient) {super()}

    registrarUsuario(usuario: Usuario): Observable<Usuario>{        
         return this.http.post<Usuario>(this.urlServiceV1 + 'auth/register',usuario,this.obterHeaderJson())
                .pipe(catchError(this.serviceError))
    }

    login(usuario: any):Observable<any>{
         return this.http.post<any>(this.urlServiceV1 + 'auth/login',usuario,this.obterHeaderJson())
                .pipe(catchError(this.serviceError))
    }
}
