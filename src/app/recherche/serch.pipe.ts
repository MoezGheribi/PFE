import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serch'
})
export class SerchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args == null || args == "")
      return value;
    else
      return value.filter(item => item.Email.includes(args) || item.Nom.includes(args) || item.Prenom.includes(args) || item.Adresse.includes(args) || (item.NumTel + "").includes(args));

  }

}

