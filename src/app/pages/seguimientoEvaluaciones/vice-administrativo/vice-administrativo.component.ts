import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Departamento } from '../../../models/departamento';
import { ViceAdministrativo } from '../../../models/viceAdministrativo';
import { ViceAdministrativoService } from '../../../services/viceAdministrativo.service';

@Component({
  selector: 'app-vice-administrativo',
  templateUrl: './vice-administrativo.component.html',
  styleUrls: ['./vice-administrativo.component.css']
})
export class ViceAdministrativoComponent implements OnInit {


  //Crear Vice-Administrativo
  viceAdministrativo: ViceAdministrativo;
  departamentos: Departamento[];

  constructor(private viceAdministrativoService: ViceAdministrativoService, private fb: FormBuilder) { }

  public viceAdministrativoForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    campos1: this.fb.array(<any>[]),
    campos2: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.viceAdministrativoService.getDepartamentos("VICEADMINISTRATIVO").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const viceAdministrativoFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(viceAdministrativoFromGroup);
          const campos1FromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos1.push(campos1FromGroup);
          const campos2FromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos2.push(campos2FromGroup);
        }


        const resultadoFromGroup = this.fb.group({
          porcentajeCumplimiento: 0,
          categoriaEjecucion: '',
          avanceFisico: 0,
          categoriaMetas: '',
          indiceGestion: 0,
          class: ''
        });
        this.resultado.push(resultadoFromGroup);
      }, err => {
        console.error(err);
      }
    );


  }

  get campos() {
    return this.viceAdministrativoForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.viceAdministrativoForm.get('resultado') as FormArray;
  }

  get campos1() {
    return this.viceAdministrativoForm.get('campos1') as FormArray;
  }

  get campos2() {
    return this.viceAdministrativoForm.get('campos2') as FormArray;
  }

  calcularPorcentajeCumplimiento(numero: number, index: number) {
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].porcentajeCumplimiento;
    }
    this.resultado.value[0].porcentajeCumplimiento = (total / this.campos.length) / 100;
    this.cumpleOrNotCumple(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].porcentajeCumplimiento * 100);
    this.calcularUltima();

  }

  calcularAvanceFisico(numero: number, index: number) {
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].avanceFisico;
    }
    this.resultado.value[0].avanceFisico = (total / this.campos.length) / 100;
    this.cumpleOrNotCumpleAvanceFisico(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].avanceFisico * 100);
    this.calcularUltima();
  }

  calcularUltima() {
    for (let i = 0; i < this.campos.length; i++) {
      this.campos.value[i].indiceGestion =
        ((this.campos.value[i].porcentajeCumplimiento + this.campos.value[i].avanceFisico) / 2) / 100;
    }

    this.resultado.value[0].indiceGestion =
      ((this.resultado.value[0].porcentajeCumplimiento + this.resultado.value[0].avanceFisico) / 2);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].indiceGestion * 100);
  }

  cumpleOrNotCumple(numero, index) {
    if (numero >= 0 && numero <= 69.99) {
      this.campos1.value[index].class = 'bg-danger'
      this.campos1.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else if (numero > 69.99 && numero <= 85.4) {
      this.campos1.value[index].class = 'bg-warning'
      this.campos1.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else if (numero > 85.4 && numero <= 100) {
      this.campos1.value[index].class = 'bg-success'
      this.campos1.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    } else if (numero > 100) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }
  cumpleOrNotCumplePorcentajeCumplimiento(numero, index) {
    if (numero >= 0 && numero <= 69.99) {
      this.campos1.value[index].class = 'bg-danger'
      this.campos1.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else if (numero > 69.99 && numero <= 85.4) {
      this.campos1.value[index].class = 'bg-warning'
      this.campos1.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else if (numero > 85.4 && numero <= 100) {
      this.campos1.value[index].class = 'bg-success'
      this.campos1.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    } else if (numero > 100) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleAvanceFisico(numero, index) {
    if (numero >= 0 && numero <= 69.99) {
      this.campos2.value[index].class = 'bg-danger'
      this.campos2.value[index].categoriaMetas = "METAS NO CUMPLIDAS"
    }
    else if (numero > 69.99 && numero <= 85.4) {
      this.campos2.value[index].class = 'bg-warning'
      this.campos2.value[index].categoriaMetas = "MEDIO CUMPLIMIENTO"
    }
    else if (numero > 85.4 && numero <= 100) {
      this.campos2.value[index].class = 'bg-success'
      this.campos2.value[index].categoriaMetas = "METAS CUMPLIDAS"
    } else if (numero > 100) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleTotal(numero) {
    if (numero >= 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS NO CUMPLIDAS"
    } else if (numero > 69.99 && numero <= 85.4) {
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS PARCIALMENTE CUMPLIDAS"

    } else if (numero > 85.4) {
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS CUMPLIDAS"
    }
  }


  createViceAdministrativo() {
    this.viceAdministrativoService.addOpcion(this.viceAdministrativoForm.value).subscribe(res => {
      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )
    })
  }

}