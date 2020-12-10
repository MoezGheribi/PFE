import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serch1'
})
export class Serch1Pipe implements PipeTransform {

  transform(value: any, args1: any): any {
    if (args1 == null || args1 == "")
      return value;
    else
      return value.filter(item => (item.nomconducteur +"").includes(args1) || (item.IdTrajet +"").includes(args1) || (item.IdCommentaire +"").includes(args1) || (item.IdVoiture +"").includes(args1) || item.Date.includes(args1));

  }

}
