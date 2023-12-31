import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../../../models/usuarios.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Indicadores } from '../../../models/indicadores';
import { Unidad } from '../../../models/unidad.Models';
import { Macro } from '../../../models/macroProceso.Model';
import { Responder } from '../../../models/responder.Models';
import { GeneralService } from '../../../services/general.service';
import { IndicadoresService } from '../../../services/indicadores.service';
import { MacroProcesoService } from '../../../services/macro-proceso.service';
import { ResponderService } from '../../../services/responder.service';
import { UnidadDireccionService } from '../../../services/unidad-direccion.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Notification } from '../../../models/notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-id-indicadores',
  templateUrl: './id-indicadores.component.html',
  styleUrls: ['./id-indicadores.component.css'],
})
export class IdIndicadoresComponent implements OnInit {
  indicadorModelo = new Indicadores();

  unidades: Unidad[];
  role: string;
  user: Usuario;
  usuarios: Usuario[] = [];
  public formSubmitted = false;
  responder: Responder[];
  cargando: boolean = true;
  totalRegistros: number = 0;
  next: number = 0;

  macro: Macro[];
  mostrar = false;
  mostrar2 = false;
  mostrar3 = false;
  mostrar4 = false;
  mostrar5 = false;
  selected: FormControl = new FormControl(null);
  opc: any;

  //periodo
  periodo: string;

  public registerForm = this.fb.group({
    unidad: ['', [Validators.required]],
    role: ['', [Validators.required]],
    responde: ['', [Validators.required]],
    evaluacion: ['', [Validators.required]],
    macroProceso: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    indicador: ['', [Validators.required]],
    formula: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    responsable: ['', [Validators.required]],
    nombreResponsable: ['', [Validators.required]],
    fechaMedicion: ['', [Validators.required]],
    lineaBase: ['', [Validators.required]],
    comportamiento: ['', [Validators.required]],
    unidadMedida: ['', [Validators.required]],
    sentidoMedicion: ['', [Validators.required]],
    meta: ['', [Validators.required]],

    enero: ['0', [Validators.required]],
    febrero: ['0', [Validators.required]],
    marzo: ['0', [Validators.required]],
    abril: ['0', [Validators.required]],
    mayo: ['0', [Validators.required]],
    junio: ['0', [Validators.required]],
    julio: ['0', [Validators.required]],
    agosto: ['0', [Validators.required]],
    septiembre: ['0', [Validators.required]],
    octubre: ['0', [Validators.required]],
    noviembre: ['0', [Validators.required]],
    diciembre: ['0', [Validators.required]],
    trimestre1: ['0', [Validators.required]],
    trimestre2: ['0', [Validators.required]],
    trimestre3: ['0', [Validators.required]],
    trimestre4: ['0', [Validators.required]],
    cuatrimestral1: ['0', [Validators.required]],
    cuatrimestral2: ['0', [Validators.required]],
    cuatrimestral3: ['0', [Validators.required]],
    semestral1: ['0', [Validators.required]],
    semestral2: ['0', [Validators.required]],
    anual: ['0', [Validators.required]],
    observaciones: ['', [Validators.required]],

    solicitaUpd: [''],
    autorizacion: [''],
  });

  //NOTIFICATION
  notification = new Notification();
  userUDPI = new Array<any>();
  selectUDPI = new Array<Usuario>();

  constructor(
    private listainforme: IndicadoresService,
    private route: ActivatedRoute,
    private _unidad: UnidadDireccionService,
    private _responder: ResponderService,
    private _macro: MacroProcesoService,
    private fb: FormBuilder,
    private _notificationService: GeneralService,
    private _usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listainforme.getIndicadoresId(id).subscribe((resp) => {
      this.indicadorModelo = resp;
      this.periodo = this.indicadorModelo.periodicidad;
    });
    this.selected.valueChanges.subscribe((changes) => {
      this.Opciones(changes);
    });

    this.getUnidades();

    this.getResponde();
    this.getMacro();
    //NOTIFICATION
    this.getAllUPDI();
    //indicadores
    this.usuariosRole();
  }

  //post USER 
  guardarUsuaio(usuario: Usuario) {
    return this._usuarioService.crearUsuario(usuario).subscribe((res) => { });
  }

  getUnidades() {
    return this._unidad.getUnidades().subscribe((resp) => {
      this.unidades = resp;
    });
  }

  getResponde() {
    return this._responder.getResponder().subscribe((result) => {
      this.responder = result;
    });
  }

  getMacro() {
    return this._macro.getMacro().subscribe((result) => {
      this.macro = result;
    });
  }

  Opciones(opc) {
    this.opc = opc;
    if (opc == 'MENSUAL') {
      this.mostrar = !this.mostrar;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == 'TRIMESTRAL') {
      this.mostrar = false;
      this.mostrar2 = true;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == 'CUATRIMESTRAL') {
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = true;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == 'SEMESTRAL') {
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = true;
      this.mostrar5 = false;
    } else if (opc == 'ANUAL') {
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = true;
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  update(text: string): void {
    if (text != 'ACTUALIZAR DATOS') {
      Swal.fire({
        title: `Solicitud`,
        text: `Enviar una Solicitud para Editar el Indicador`,
        icon: 'warning',
        input: 'select',
        inputOptions: this.userUDPI,
        inputPlaceholder: 'Selecciona destinatario',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Enviar',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value == '') {
              resolve('Selecciona un destionatario, por favor');
            } else {
              this.listainforme
                .updateOpcion(this.indicadorModelo)
                .subscribe((result) => {
                  // Send Notification
                  this.notification.title = this.indicadorModelo.indicador;
                  this.notification.detalle = 'Solicitud para Editar Indicador';
                  this.notification.uri = this.indicadorModelo._id.toString();
                  this.notification.receiver = this.selectUDPI[Number(value)];
                  this.notification.trasmitter = this.indicadorModelo.usuario;
                  this.notification.view = false;

                  this._notificationService
                    .create(this.notification, `notification`)
                    .subscribe(
                      (res) => {
                        Swal.fire(
                          'Actualización de Indicadores existoso',
                          '',
                          'success'
                        );
                      },
                      (err) => {
                        console.error(err);
                      }
                    );
                });
            }
          });
        },
      });
    } else {
      this.indicadorModelo.autorizacion = '';
      if (this.periodo != this.indicadorModelo.periodicidad) {
        Swal.fire({
          title: 'Confirmación',
          text:
            'Si cambias la Periodicidad del Indicador, se reiniciará los periodos.¿Deseas Continuar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, hazlo!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            /* Avance Indicadores*/
            this.indicadorModelo.periods = [];
            this.indicadorModelo.resultYear[0]['class'] = '';
            this.indicadorModelo.resultYear[0]['color'] = '';
            this.indicadorModelo.resultYear[0]['compliance'] = '';
            this.indicadorModelo.resultYear[0]['result'] = '';
            this.indicadorModelo.resultYear[0]['enabled'] = true;
            this.indicadorModelo.solicitaAvanceIndicador = 'NO REALIZADA';
            this.actualizarBDD();
          }
        });
      } else {
        this.actualizarBDD();
      }
    }
  }

  //Actualizar EN BDD
  actualizarBDD() {
    this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
      Swal.fire('Actualización de Indicadores existoso', '', 'success');
    }, err => {
      console.error(err);
    });
  }

  //All user UPDI
  getAllUPDI() {
    this.userUDPI = [];
    this._notificationService.get(`notification/updi?role=UPDI_ROLE`).subscribe(
      (res) => {
        res['data'].forEach((element) => {
          this.userUDPI.push(element.nombre);
        });
        this.selectUDPI = res['data'];
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /* VALIDAR INPUTS META ANUAL */
  validarMetaAnual() {
    // Validar llenar meta anual
    if (this.registerForm.value.meta == '') {
      Swal.fire('Revisar Formulario', 'Ingrese la Meta Anual', 'warning');
      return;
    }
    //Validacion para el Comportamiento
    if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
      // Validacion de Periodos
      this.validarPeriodosMeta('DISCRETO ACUMULADO');
    } else if (this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO') {
      this.validarPeriodosMeta('DISCRETO POR PERIODO');
    } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
      this.validarPeriodosMeta('CONTINUO');
    } else {
      // No a selecciona comportamiento
      Swal.fire(
        'Revisar Formulario',
        'Seleccione el Comportamiento del Indicador',
        'warning'
      );
    }
  }

  validarPeriodosMeta(comportamiento: string) {
    // variable se suma totad los periodos
    let total = 0;
    let habilitarPeriodo = false;
    // Validacion de Periodos Mensual, trimestral....
    switch (this.opc) {
      case 'MENSUAL':
        if (comportamiento == 'DISCRETO ACUMULADO') {
          total =
            +this.registerForm.value.enero +
            +this.registerForm.value.febrero +
            +this.registerForm.value.marzo +
            +this.registerForm.value.abril +
            +this.registerForm.value.mayo +
            +this.registerForm.value.junio +
            +this.registerForm.value.julio +
            +this.registerForm.value.agosto +
            +this.registerForm.value.septiembre +
            +this.registerForm.value.octubre +
            +this.registerForm.value.noviembre +
            +this.registerForm.value.diciembre;
        } else if (comportamiento == 'DISCRETO POR PERIODO') {
          total =
            this.registerForm.value.enero +
            +this.registerForm.value.febrero +
            +this.registerForm.value.marzo +
            +this.registerForm.value.abril +
            +this.registerForm.value.mayo +
            +this.registerForm.value.junio +
            +this.registerForm.value.julio +
            +this.registerForm.value.agosto +
            +this.registerForm.value.septiembre +
            +this.registerForm.value.octubre +
            +this.registerForm.value.noviembre +
            +this.registerForm.value.diciembre;
          // Division de Periodo
          total = total / 12;
        } else if (comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.diciembre;
        }
        //ingresar ultimo valor
        if (+this.registerForm.value.diciembre > 0) {
          habilitarPeriodo = true;
        }
        break;
      case 'TRIMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
          // Validacion de Periodos
          total =
            this.registerForm.value.trimestre1 +
            +this.registerForm.value.trimestre2 +
            +this.registerForm.value.trimestre3 +
            +this.registerForm.value.trimestre4;
        } else if (
          this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO'
        ) {
          total =
            this.registerForm.value.trimestre1 +
            +this.registerForm.value.trimestre2 +
            +this.registerForm.value.trimestre3 +
            +this.registerForm.value.trimestre4;
          // Division de Periodo
          total = total / 4;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.trimestre4;
        }
        //ingresar ultimo valor
        if (+this.registerForm.value.trimestre4 > 0) {
          habilitarPeriodo = true;
        }
        break;
      case 'CUATRIMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
          // Validacion de Periodos
          total =
            this.registerForm.value.cuatrimestral1 +
            +this.registerForm.value.cuatrimestral2 +
            +this.registerForm.value.cuatrimestral3;
        } else if (
          this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO'
        ) {
          total =
            this.registerForm.value.cuatrimestral1 +
            +this.registerForm.value.cuatrimestral2 +
            +this.registerForm.value.cuatrimestral3;
          // Division de Periodo
          total = total / 3;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.cuatrimestral3;
        }
        //ingresar ultimo valor
        if (+this.registerForm.value.cuatrimestral3 > 0) {
          habilitarPeriodo = true;
        }
        break;
      case 'SEMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
          // Validacion de Periodos
          total =
            this.registerForm.value.semestral1 +
            +this.registerForm.value.semestral2;
        } else if (
          this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO'
        ) {
          total =
            this.registerForm.value.semestral1 +
            +this.registerForm.value.semestral2;
          // Division de Periodo
          total = total / 2;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.semestral2;
        }
        //ingresar ultimo valor
        if (+this.registerForm.value.semestral2 > 0) {
          habilitarPeriodo = true;
        }
        break;
      case 'ANUAL':
        if (comportamiento == 'DISCRETO ACUMULADO') {
          total = this.registerForm.value.anual;
        } else if (comportamiento == 'DISCRETO POR PERIODO') {
          total = this.registerForm.value.anual;
          // Division de Periodo
          total = total / 1;
        } else if (comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.anual;
        }
        //ingresar ultimo valor
        if (+this.registerForm.value.anual > 0) {
          habilitarPeriodo = true;
        }
        break;
    }

    if (comportamiento == 'CONTINUO' && total > 0) {
      if (
        total != this.registerForm.value.meta && habilitarPeriodo
      ) {
        Swal.fire(
          'Revisar Valores',
          'El ultimo periodo es diferente a la Meta Anual',
          'warning'
        );
      }
    } else {
      if (total > this.registerForm.value.meta) {
        Swal.fire(
          'Revisar Valores',
          `Los periodos han superado a la Meta Anual el resultado actual es <b>${total}</b>`,
          'warning'
        );
      }
      if (
        total < this.registerForm.value.meta && habilitarPeriodo
      ) {
        Swal.fire(
          'Revisar Valores',
          `Los periodos es menor a la Meta Anual el resultado actual es <b>${total}</b>`,
          'warning'
        );
      }
    }
  }
  usuariosRole() {
    this.cargando = true;
    this._usuarioService.userRole().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
    })
  }
}
