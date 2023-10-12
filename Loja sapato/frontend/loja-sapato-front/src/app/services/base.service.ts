import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError, throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";


export abstract class BaseService{
    protected urlServiceV1: string = 'http://localhost:8080/'

    public LoocalStorage = new LocalStorageUtils()

    protected obterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }
    protected obterHeaderAuth(){
        let token = this.LoocalStorage.obterTokenUsuario();  
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        }
    }
    protected obterHeaderPdfAuth(){
        let token = this.LoocalStorage.obterTokenUsuario();  
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/pdf',
                'Authorization': `Bearer ${token}`
            })
        }
    }

    protected extractData(response:any){
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse){
            if(response.statusText === "Unknown Error"){
                customError.push("Ocorreu um erro desconhecido");
                response.error.detail = customError;
            }
        }
        
        return throwError(response)
    }
}