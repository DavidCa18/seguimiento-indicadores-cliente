import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Pipe({ name: 'imagen' })

export class ImagenPipe implements PipeTransform {

  transform(img: any,  tipo: string = 'usuario'): any {
    
    let url = environment.base_url + '/img';
    
    if (!img) {
      return url + '/usuarios/xxx';
    }

    switch (tipo) {
      case 'usuario': url += '/usuarios/' + img;
      default: url + '/usuarios/xxx';
    }

    return url;
  }

}