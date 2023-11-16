import { LocalStorageUtils } from './../../utils/localstorage';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate{
    localStorage = new LocalStorageUtils()

    constructor(private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.localStorage.obterTokenUsuario()){
            this.router.navigate(['/conta/login'])
        }
        let user = this.localStorage.obterUsuario();
        let claim: any = route.data[0]

        if(claim !== undefined){
            let claim = route.data[0]['claim']
            if(claim){

                if(!user.perfil){
                    this.navegarAcessoNegado()
                }

                let userPerfil = user.perfil;
                if(!userPerfil){
                    this.navegarAcessoNegado()
                }
                if(!userPerfil.includes(claim.valor)){
                    this.navegarAcessoNegado()
                }
            }
        }

        return true;
    }
    navegarAcessoNegado(){
        this.router.navigate(['/acesso-negado'])
    }

}