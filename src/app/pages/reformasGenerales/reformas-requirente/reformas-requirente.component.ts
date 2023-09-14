import { Component, OnInit } from '@angular/core';
import { Reforma } from '../../../models/reforma.models';
import { Usuario } from '../../../models/usuarios.models';
import { ReformaService } from '../../../services/reforma.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-reformas-requirente',
  templateUrl: './reformas-requirente.component.html',
  styleUrls: ['./reformas-requirente.component.css']
})
export class ReformasRequirenteComponent implements OnInit {

  usuario: Usuario;
  formularios: Reforma[];
  totalRegistros: number = 0;

  constructor(private _usuarioService: UsuariosService, private listainforme: ReformaService) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
  }

  getFormulariosHoja() {
    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.getReforma(usuario._id).subscribe(
      result => {
        this.formularios = result
      });
  }

}