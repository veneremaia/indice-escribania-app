import { Pipe, PipeTransform } from '@angular/core';
import { Indice } from './models/indices';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(indices : Indice[], searchValue: string): Indice[] {
    if(!indices || !searchValue){
      return indices;
    }
    return indices.filter(indice => (indice.nombre1.toLocaleLowerCase().startsWith(searchValue)||indice.nombre2.toLocaleLowerCase().startsWith(searchValue)));
  }

}
