import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Indicadores } from '../../../models/indicadores';
import { Macro } from '../../../models/macroProceso.Model';
import { Notification } from '../../../models/notification';
import { Responder } from '../../../models/responder.Models';
import { Unidad } from '../../../models/unidad.Models';
import { Usuario } from '../../../models/usuarios.models';
import { GeneralService } from '../../../services/general.service';
import { IndicadoresService } from '../../../services/indicadores.service';
import { MacroProcesoService } from '../../../services/macro-proceso.service';
import { ResponderService } from '../../../services/responder.service';
import { UnidadDireccionService } from '../../../services/unidad-direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-indicador',
  templateUrl: './actualizar-indicador.component.html',
  styleUrls: ['./actualizar-indicador.component.css']
})
export class ActualizarIndicadorComponent implements OnInit {

  public usuario = new Usuario();
  indicadorModelo = new Indicadores();

  public bloqueoEdicion = false;
  public bloqueoFormulario = true;


  unidades: Unidad[];

  public formSubmitted = false;
  responder: Responder[];

  macro: Macro[];
  mostrar = false;
  mostrar2 = false;
  mostrar3 = false;
  mostrar4 = false;
  mostrar5 = false;
  selected: FormControl = new FormControl(null);
  opc: any;

  periodo: string;

  registerForm = new FormGroup({
    solicitaUpd: new FormControl(),
    unidad: new FormControl(),
    responde: new FormControl(),
    evaluacion: new FormControl(),
    macroProceso: new FormControl(),
    producto: new FormControl(),
    indicador: new FormControl(),
    formula: new FormControl(),
    descripcion: new FormControl(),
    responsable: new FormControl(),
    nombreResponsable: new FormControl(),
    fechaMedicion: new FormControl(),
    lineaBase: new FormControl(),
    comportamiento: new FormControl(),
    unidadMedida: new FormControl(),
    sentidoMedicion: new FormControl(),
    meta: new FormControl(),
    enero: new FormControl(),
    febrero: new FormControl(),
    marzo: new FormControl(),
    abril: new FormControl(),
    mayo: new FormControl(),
    junio: new FormControl(),
    julio: new FormControl(),
    agosto: new FormControl(),
    septiembre: new FormControl(),
    octubre: new FormControl(),
    noviembre: new FormControl(),
    diciembre: new FormControl(),
    trimestre1: new FormControl(),
    trimestre2: new FormControl(),
    trimestre3: new FormControl(),
    trimestre4: new FormControl(),
    cuatrimestral1: new FormControl(),
    cuatrimestral2: new FormControl(),
    cuatrimestral3: new FormControl(),
    semestral1: new FormControl(),
    semestral2: new FormControl(),
    anual: new FormControl(),
    observaciones: new FormControl(),
    autorizacion: new FormControl(),  
  });

  notification = new Notification();
  userUDPI = new Array<any>();
  selectUDPI = new Array<Usuario>();

  constructor(
    private listainforme: IndicadoresService, 
    private route: ActivatedRoute, 
    private _unidad: UnidadDireccionService,
    private _responder: ResponderService, 
    private _macro: MacroProcesoService, 
    private _notificationService: GeneralService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    var session = localStorage.getItem("usuario");
    this.usuario = JSON.parse(session) as Usuario;

    if(this.usuario.role == "UPDI_ROLE"){
      this.bloqueoEdicion = false;
    } else {
      this.bloqueoEdicion = true;
    }

    this.getUnidades();

    setTimeout(() => {
      this.obtenerIndicador(id);
    }, 1000);
    
  }

  getUnidades() {
    return this._unidad.getUnidades().subscribe((resp) => {
      this.unidades = resp;
      this.getResponde();
    });
  }

  getResponde() {
    return this._responder.getResponder().subscribe((result) => {
      this.responder = result;
      this.getMacro();
    });
  }

  getMacro() {
    return this._macro.getMacro().subscribe((result) => {
      this.macro = result;
      this.getAllUPDI();
    });
  }

  getAllUPDI() {
    this.userUDPI = [];
    this._notificationService.get(`notification/updi?role=UPDI_ROLE`).subscribe(
      (res) => {
        res['data'].forEach((element) => {
          this.userUDPI.push(element.nombre);
        });
        this.selectUDPI = res['data'];

        this.selected.valueChanges.subscribe((changes) => {
          this.Opciones(changes);
        });

      },
      (err) => {
        console.error(err);
      }
    );
  }

  Opciones(opc:any) {
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

  obtenerIndicador(id:any){

    this.listainforme.getIndicadoresId(id).subscribe((resp) => {

      this.indicadorModelo = resp;
      console.log(this.indicadorModelo);
      if(this.usuario.role != "UPDI_ROLE" && (this.indicadorModelo.estadoSolicitud == "RECHAZADA" || this.indicadorModelo.estadoSolicitud == "ENVIADA" || this.indicadorModelo.estadoSolicitud == "NULA")){
        this.bloqueoFormulario = true;
      }else if(this.usuario.role != "UPDI_ROLE" && this.indicadorModelo.estadoSolicitud == "APROBADA"){
        this.bloqueoFormulario = false;
      }else if(this.usuario.role == "UPDI_ROLE" && (this.indicadorModelo.estadoSolicitud == "RECHAZADA" || this.indicadorModelo.estadoSolicitud == "ENVIADA" || this.indicadorModelo.estadoSolicitud == "NULA" || this.indicadorModelo.estadoSolicitud == "APROBADA")){
        this.bloqueoFormulario = false;
      }

      console.log(this.bloqueoFormulario);
      console.log(this.bloqueoEdicion);

      this.periodo = this.indicadorModelo.periodicidad;
    });

  }

  solicitarAutorizacion(){

    Swal.fire({
      title: `Solicitar Autorización`,
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
            this.indicadorModelo.estadoSolicitud = "ENVIADA";
            this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
              this.notification.title = this.indicadorModelo.indicador;
              this.notification.detalle = 'Solicitud para Editar Indicador';
              this.notification.uri = this.indicadorModelo._id.toString();
              this.notification.receiver = this.selectUDPI[Number(value)];
              this.notification.trasmitter = this.indicadorModelo.usuario;
              this.notification.view = false;
              this._notificationService.create(this.notification, `notification`).subscribe((res) => {
                Swal.fire('Solicitud Enviada Exitosamente','','success');
              }, (err) => {
                console.error(err);
              });
            });

          }

        });


      },
    });

  }

  gestionAutorizacion(){
    if(this.indicadorModelo.autorizacion == "APROBADA"){
      this.indicadorModelo.estadoSolicitud = "APROBADA";
      this.indicadorModelo.autorizacion = "";
      this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
        console.log(result);
        Swal.fire("Información","Autorización aceptada exitosamente","success");
      },(error)=>{
        console.log(error);
      });
    }else if(this.indicadorModelo.autorizacion == "RECHAZADA"){
      this.indicadorModelo.estadoSolicitud = "RECHAZADA";
      this.indicadorModelo.autorizacion = "";
      this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
        console.log(result);
        Swal.fire("Información","La solicitud fue rechazada","success");
      },(error)=>{
        console.log(error);
      });
    }
  }

  solicitarAutorizacionNuevamente(){
    this.indicadorModelo.estadoSolicitud = "NULA";
    this.indicadorModelo.autorizacion == ""
      this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
        console.log(result);
      },(error)=>{
        console.log(error);
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  update(): void {
    if ( this.periodo != this.indicadorModelo.periodicidad ) {
      Swal.fire({
        title: 'Confirmación',
        text: "Si cambias la Periodicidad del Indicador, se reiniciará los periodos.¿Deseas Continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, hazlo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.indicadorModelo.periods = [];
          this.indicadorModelo.resultYear[0]['class'] = '';
          this.indicadorModelo.resultYear[0]['color'] = '';
          this.indicadorModelo.resultYear[0]['compliance'] = '';
          this.indicadorModelo.resultYear[0]['result'] = '';
          this.indicadorModelo.resultYear[0]['enabled'] = true;
          this.indicadorModelo.solicitaAvanceIndicador = 'NO REALIZADA';

          this.actualizarBDD();
        }
      })
    } else {
      this.actualizarBDD();
    }
  }

  actualizarBDD() {

    var temp1 = this.unidades.find(e => e.unidad == this.indicadorModelo.unidad);
    this.indicadorModelo.role = temp1 == undefined ? '' : temp1.role;
    
    this.indicadorModelo.fechaModificacion = new Date(new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ));
    this.indicadorModelo.estadoSolicitud = "NULA";
    this.indicadorModelo.autorizacion == ""

    this.listainforme.updateOpcion(this.indicadorModelo).subscribe((result) => {
      
      this.notification.title = this.indicadorModelo.indicador;
      this.notification.detalle = 'Se han cambiado algunos datos del Indicador';
      this.notification.uri = this.indicadorModelo._id.toString();
      this.notification.receiver = this.indicadorModelo.usuario;
      this.notification.trasmitter = JSON.parse(localStorage.getItem('usuario'));
      this.notification.view = false;

      this._notificationService.create(this.notification, `notification`).subscribe((res) => {
        Swal.fire('Actualización de Indicadores existoso', '', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },(err) => {
        console.error(err);
      }
      );
    });
  }
  
  validarMetaAnual() {
    if (this.registerForm.value.meta == '') {
      Swal.fire('Revisar Formulario', 'Ingrese la Meta Anual', 'warning');
      return;
    }
    if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
      this.validarPeriodosMeta('DISCRETO ACUMULADO');
    } else if (this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO') {
      this.validarPeriodosMeta('DISCRETO POR PERIODO');
    } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
      this.validarPeriodosMeta('CONTINUO');
    } else {
      Swal.fire(
        'Revisar Formulario',
        'Seleccione el Comportamiento del Indicador',
        'warning'
      );
    }
  }

  validarPeriodosMeta(comportamiento: string) {
    let total = 0;
    let habilitarPeriodo = false;
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
          total = total / 12;
        } else if (comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.diciembre;
        }
        if ( +this.registerForm.value.diciembre > 0 ) {
          habilitarPeriodo = true;
        }
        break;
      case 'TRIMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
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
          total = total / 4;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.trimestre4;
        }
        if ( +this.registerForm.value.trimestre4 > 0 ) {
          habilitarPeriodo = true;
        }
        break;
      case 'CUATRIMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
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
          total = total / 3;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.cuatrimestral3;
        }
        if ( +this.registerForm.value.cuatrimestral3 > 0 ) {
          habilitarPeriodo = true;
        }
        break;
      case 'SEMESTRAL':
        if (this.registerForm.value.comportamiento == 'DISCRETO ACUMULADO') {
          total =
            this.registerForm.value.semestral1 +
            +this.registerForm.value.semestral2;
        } else if (
          this.registerForm.value.comportamiento == 'DISCRETO POR PERIODO'
        ) {
          total =
            this.registerForm.value.semestral1 +
            +this.registerForm.value.semestral2;
          total = total / 2;
        } else if (this.registerForm.value.comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.semestral2;
        }
        if ( +this.registerForm.value.semestral2 > 0 ) {
          habilitarPeriodo = true;
        }
        break;
      case 'ANUAL':
        if (comportamiento == 'DISCRETO ACUMULADO') {
          total = this.registerForm.value.anual;
        } else if (comportamiento == 'DISCRETO POR PERIODO') {
          total = this.registerForm.value.anual;
          total = total / 1;
        } else if (comportamiento == 'CONTINUO') {
          total = +this.registerForm.value.anual;
        }
        if ( +this.registerForm.value.anual > 0 ) {
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

  public regresarPagina() {
    history.back();
  }

}