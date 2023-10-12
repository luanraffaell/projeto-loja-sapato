import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CadastroComponent } from "../conta/cadastro/cadastro.component";
import { Observable } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";


export interface CanComponentDeactivate {
    canDeactivate(): boolean;
  }
@Injectable()
export class ContaGuard implements CanDeactivate<CanComponentDeactivate>, CanActivate{
    localStorage = new LocalStorageUtils()

    constructor(private router: Router){}

    canDeactivate(component: CadastroComponent){
        if(component.canDeactivate()){
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?')
        }
        return true
    }
    canActivate(){
        if(this.localStorage.obterTokenUsuario() != ''){
            this.router.navigate(['/home'])
        }
        return true;
    }
    

}