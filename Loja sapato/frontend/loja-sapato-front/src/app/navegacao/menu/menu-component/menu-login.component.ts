import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-login.component.html',
  styleUrls: ['../menu.component.css']
})
export class MenuLoginComponent {
  token: string = '';
  user:any;
  email: string = '';
  localStorageUtils = new LocalStorageUtils()

  constructor(private route: Router){}

  usuarioLogado(): boolean{
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario()

    if(this.user != ''){
      this.email = this.user.username;
    }
      
      return this.token !== '';  
  }

  logout(){
    this.localStorageUtils.limparDadosLocaisUsuario()
    window.location.reload();
    this.route.navigate(['/conta/login'])
  }

}
