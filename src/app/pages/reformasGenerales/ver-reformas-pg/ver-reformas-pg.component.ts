import { Component, OnInit } from '@angular/core';
import { Reforma } from '../../../models/reforma.models';
import { ReformaService } from '../../../services/reforma.service';

@Component({
  selector: 'app-ver-reformas-pg',
  templateUrl: './ver-reformas-pg.component.html',
  styleUrls: ['./ver-reformas-pg.component.css']
})
export class VerReformasPGComponent implements OnInit {

  formularios: Reforma[];
  totalRegistros: number = 0;

  constructor(private listainforme: ReformaService) { }
  ngOnInit() {
    //  this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
  }

  getFormulariosHoja() {
    this.listainforme.getOpciones().subscribe(
      result => {
        this.formularios = result
      });
  }

}

