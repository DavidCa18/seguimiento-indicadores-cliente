import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { GastoCorrienteService } from '../../../services/gastoCorriente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-gasto-inversion',
  templateUrl: './gasto-inversion.component.html',
  styleUrls: ['./gasto-inversion.component.css']
})

export class GastoInversionComponent implements OnInit {
  @Input()
  asignado = [];

  resultados = [];
  selectedGastoEnviar: string;
  selectedGastoConsultar: string = 'GASTO INVERSION';
  selectExtension: string = 'IASA';

  constructor(private router: Router, private gastoCorrienteService: GastoCorrienteService, private fb: FormBuilder) { }
  pageActual: number = 1;

  public gastoInversionForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    tipoGasto: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  get campos() {
    return this.gastoInversionForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.gastoInversionForm.get('resultado') as FormArray;
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
  createGastoInversion() {
    this.gastoInversionForm.value.campos = this.asignado;
    this.gastoInversionForm.value.resultado = this.resultados;
    this.gastoInversionForm.value.tipoGasto = 'GASTO INVERSION';

    this.gastoCorrienteService.addOpcion(this.gastoInversionForm.value).subscribe(res => {

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
