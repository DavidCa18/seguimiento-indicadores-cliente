import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { GastoCorrienteService } from '../../../services/gastoCorriente.service';
import { GastoCorriente } from '../../../models/gastoCorriente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-gasto-corriente',
  templateUrl: './gasto-corriente.component.html',
  styleUrls: ['./gasto-corriente.component.css']
})
export class GastoCorrienteComponent implements OnInit {

  gastoCorriente: GastoCorriente;

  asignado = [];
  resultados = [];
  selectedGastoEnviar: string;
  selectedGastoConsultar: string = 'GASTO CORRIENTE';
  selectExtension: string = 'IASA';


  constructor(private gastoCorrienteService: GastoCorrienteService, private fb: FormBuilder,
    private router: Router) { }

  public gastoCorrienteForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    tipoGasto: ['', Validators.required]
  })

  buscadorAsignado = '';
  pageActual: number = 1;


  ngOnInit(): void {
    //this.gastoCorrienteService.getGastoCorriente
  }

  get campos() {
    return this.gastoCorrienteForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.gastoCorrienteForm.get('resultado') as FormArray;
  }

  calcularAsignado(numero: number, index: number) {
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].asignado;
    }
    this.resultado.value[0].asignado = (total / this.campos.length) / 100;
    //this.cumpleOrNotCumpleTotal(this.resultado.value[0].porcentajeCumplimiento*100);
    //this.calcularUltima();

  }

  // subir archivo Ecxel
  onFileChange(evt: any) {
    var fileName = evt.target.files[0].name;
    $('.custom-file-label').html(fileName);

    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      wb.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        this.asignado = rowObject;

      })
      this.resultados = [];
      this.resultados.push(this.asignado[this.asignado.length - 1]);
      this.asignado.pop();

    };
    reader.readAsBinaryString(target.files[0]);
  }

  createGastoCorriente() {
    this.gastoCorrienteForm.value.campos = this.asignado;
    this.gastoCorrienteForm.value.resultado = this.resultados;
    this.gastoCorrienteForm.value.tipoGasto = 'GASTO CORRIENTE';

    this.gastoCorrienteService.addOpcion(this.gastoCorrienteForm.value).subscribe(res => {

      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )

    })

  }

  consultarGastoDepartamento() {
    if (this.selectExtension == "IASA") {
      this.router.navigate(['/dashboard/iasa'], {
        queryParams: {
          tipoGasto: this.selectedGastoConsultar,
          extension: this.selectExtension
        }
      });
    } else if (this.selectExtension == "SANTO DOMINGO") {
      this.router.navigate(['/dashboard/santo-domingo'], {
        queryParams: {
          tipoGasto: this.selectedGastoConsultar,
          extension: this.selectExtension
        }
      });
    } else if (this.selectExtension == "LATACUNGA") {
      this.router.navigate(['/dashboard/latacunga'], {
        queryParams: {
          tipoGasto: this.selectedGastoConsultar,
          extension: this.selectExtension
        }
      });
    } else if (this.selectExtension == "PLANTA CENTRAL") {
      this.router.navigate(['/dashboard/unidades-rectorado'], {
        queryParams: {
          tipoGasto: this.selectedGastoConsultar,
          extension: this.selectExtension
        }
      });
    }

  }
}