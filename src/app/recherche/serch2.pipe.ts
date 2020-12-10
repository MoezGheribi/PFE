import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serch2'
})
export class Serch2Pipe implements PipeTransform {

  transform(value: any, args2: any): any {
    if (args2 == null || args2 == "")
      return value;
    else
      return value.filter(item => (item.IdCommentaire +"").includes(args2)|| item.Contenu.includes(args2));

  }

}
