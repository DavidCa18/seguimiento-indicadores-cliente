import { IndicadoresService } from '../../../services/indicadores.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuarios.models';
import { Indicadores } from '../../../models/indicadores';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-verindicadores',
  templateUrl: './verindicadores.component.html',
  styleUrls: ['./verindicadores.component.css']
})
export class VerindicadoresComponent implements OnInit {

  usuario: Usuario;
  role:string;
  formularios: any;
  totalRegistros: number = 0;

  cantidadItems : number =  5;
  paginaActual : number = 1;


  constructor(private _usuarioService: UsuariosService, private listainforme: IndicadoresService) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
  }

  getFormulariosHoja() {
    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.listarIndicadoresusuario(usuario._id).subscribe(result => {
      var res :any = result;
      if(res.ok){
        this.formularios = res.datos;
      }
    });
  }
  
}