import { FormGroup } from "@angular/forms"

export class GenericValidator{
    constructor(private valitationMessages: ValidationMessages){}

    processarMensagens(container: FormGroup) : {[key: string]: string}{
        let messages: any = {}
        for(let controlKey in container.controls){
            if(container.controls.hasOwnProperty(controlKey)){
                let c = container.controls[controlKey]

                if(c instanceof FormGroup){
                    let childMessages = this.processarMensagens(c);
                    Object.assign(messages,childMessages)
                }else{
                    if(this.valitationMessages[controlKey]){
                        messages[controlKey] = ''
                        if((c.dirty || c.touched)&& c.errors){
                            Object.keys(c.errors).map(messagekey => {
                                if(this.valitationMessages[controlKey][messagekey]){
                                    messages[controlKey] += this.valitationMessages[controlKey][messagekey]
                                }
                            });

                        }

                    }
                }
            }
        }
        return messages;
    }
    
}


export interface DisplayMessage{
    [key: string]: string
}
export interface ValidationMessages{
    [key:string] : {
        [key:string]: string
    }
}