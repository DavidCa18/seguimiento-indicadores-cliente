import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Reforma } from '../../../models/reforma.models';
import { ReformaService } from '../../../services/reforma.service';
import { DragdropService } from '../../../services/dragdrop.service';
import { Usuario } from '../../../models/usuarios.models';

@Component({
  selector: 'app-idreformas-requirente',
  templateUrl: './idreformas-requirente.component.html',
  styleUrls: ['./idreformas-requirente.component.css']
})
export class IdreformasRequirenteComponent implements OnInit {

  unidades: Reforma[];
  public formSubmitted = false;
  reformaModelo = new Reforma()
  votes: number;
  votes1: number;

  urlPDF: string;

  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string;
  progress: number = 0;

  public registerForm = this.fb.group({

    requirente: ['', [Validators.required]],
    numeroModificacion: ['', [Validators.required]],
    fechapresupuestaria: ['', [Validators.required]],
    tipoGasto: ['', [Validators.required]],
    tipoModificacion: ['', [Validators.required]],
    montoSolicitado: ['', [Validators.required]],
    justificacion: ['', [Validators.required]],
    resolucion: ['', [Validators.required]],
    modificacionPresupuestaria: this.fb.array([]),
    reprogramacionFinaciera: this.fb.array([]),
    requisito1: ['', [Validators.required]],
    requisito2: ['', [Validators.required]],
    requisito3: ['', [Validators.required]],
    requisito4: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    analisisInformeRequisito: ['', [Validators.required]],
    analisisInformeRequisito2: ['', [Validators.required]],
    analisisInformeRequisito3: ['', [Validators.required]],
    analisisInformeRequisito4: ['', [Validators.required]],
    analisisInformeRequisitoDescripcion: ['', [Validators.required]],

    analistaTecnico1: ['', [Validators.required]],
    analistaTecnico2: ['', [Validators.required]],
    analistaTecnico3: ['', [Validators.required]],
    analistaTecnicoDescripcion: ['', [Validators.required]],

    dicatemPresupuestaria1: ['', [Validators.required]],
    dicatemPresupuestaria2: ['', [Validators.required]],
    dicatemPresupuestariaDescripcion: ['', [Validators.required]],

    firmaResponsabilidad: ['', [Validators.required]],
    firmaResponsabilidad1: ['', [Validators.required]],
    firmaResponsabilidad2: ['', [Validators.required]],
    firmaResponsabilidad3: ['', [Validators.required]],
    firmaResponsabilidad4: ['', [Validators.required]],
    firmaResponsabilidad5: ['', [Validators.required]],
    firmaResponsabilidad6: ['', [Validators.required]],
    firmaResponsabilidad7: ['', [Validators.required]],
    firmaResponsabilidad8: ['', [Validators.required]],

    firmaAnalisisPoa: ['', [Validators.required]],
    firmaAnalisisPoa1: ['', [Validators.required]],
    firmaAnalisisPoa2: ['', [Validators.required]],

    firmaTecnico: ['', [Validators.required]],
    firmaTecnico1: ['', [Validators.required]],
    firmaTecnico2: ['', [Validators.required]],
    firmaTecnico3: ['', [Validators.required]],
    firmaTecnico4: ['', [Validators.required]],
    firmaTecnico5: ['', [Validators.required]],


    firmaDicatamen: ['', [Validators.required]],
    firmaDicatamen1: ['', [Validators.required]],
    firmaDicatamen2: ['', [Validators.required]],
    firmaDicatamen3: ['', [Validators.required]],
    firmaDicatamen4: ['', [Validators.required]],
    firmaDicatamen5: ['', [Validators.required]],
    firmaDicatamen6: ['', [Validators.required]],
    firmaDicatamen7: ['', [Validators.required]],
    firmaDicatamen8: ['', [Validators.required]],


    firmaAprobacion: ['', [Validators.required]],
    firmaAprobacion1: ['', [Validators.required]],
    firmaAprobacion2: ['', [Validators.required]],
    firmaAprobacion3: ['', [Validators.required]],
    firmaAprobacion4: ['', [Validators.required]],
    firmaAprobacion5: ['', [Validators.required]],
    firmaAprobacion6: ['', [Validators.required]],
    firmaAprobacion7: ['', [Validators.required]],
    firmaAprobacion8: ['', [Validators.required]],

    avatar: [null],
    urlPdf: ['']
  })


  constructor( private fb: FormBuilder, private _reformas: ReformaService, private sanitizer: DomSanitizer, private route: ActivatedRoute, public dragdropService: DragdropService ) {
    this.votes = this.votes || 0;
    this.votes1 = this.votes1 || 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this._reformas.getReformaId(id)
      .subscribe(resp => {
        this.reformaModelo = resp
      });

  }



  get modificacionPresupuestaria() {

    return this.registerForm.get('modificacionPresupuestaria') as FormArray;
  }

  AgregarModificacion() {

    const modificacionFormgroup = this.fb.group({

      //partidaOrigen:['',[Validators.required]],
      //partidaDestino:['',[Validators.required]],
      lineaPoa: ['', [Validators.required]],
      eod: ['', [Validators.required]],
      estructuraProgramatica: ['', [Validators.required]],
      actividadProyectos: ['', [Validators.required]],
      fuenteFinanciamiento: ['', [Validators.required]],
      detallePartida: ['', [Validators.required]],
      itemPresupuestario: ['', [Validators.required]],
      saldoComprometer: ['', [Validators.required]],
      certificado: ['', [Validators.required]],
      incremento: ['', [Validators.required]],
      reduccion: ['', [Validators.required]],
      nuevosaldo: ['', [Validators.required]],

      //partida destino
      lineaPoa1: ['', [Validators.required]],
      eod1: ['', [Validators.required]],
      estructuraProgramatica1: ['', [Validators.required]],
      actividadProyectos1: ['', [Validators.required]],
      fuenteFinanciamiento1: ['', [Validators.required]],
      detallePartida1: ['', [Validators.required]],
      itemPresupuestario1: ['', [Validators.required]],
      saldoComprometer1: ['', [Validators.required]],
      certificado1: ['', [Validators.required]],
      incremento1: ['', [Validators.required]],
      reduccion1: ['', [Validators.required]],
      nuevosaldo1: ['', [Validators.required]],

    })

    this.modificacionPresupuestaria.push(modificacionFormgroup)

  }
  QuitarModificacion(indice: number) {
    this.modificacionPresupuestaria.removeAt(indice)
  }


  voteUp(valor: number) {

    if (this.votes >= 50 && valor >= 0) {
      return this.votes = 50;
    }
    //  this.votes++;
    if (this.votes <= 0 && valor < 0) {
      return this.votes = 0;
    }

    this.votes = this.votes + valor;

    this.AgregarModificacion();
  }

  voteDown(valor: number) {

    //  this.votes++;
    if (this.votes <= 0 && valor < 0) {
      return this.votes = 0;
    }
    this.votes = this.votes + valor;
    this.QuitarModificacion(0)
  }

  get reprogramacionFinaciera() {

    return this.registerForm.get('reprogramacionFinaciera') as FormArray;
  }

  AgregarReprogramacioFinaciera() {

    const reprogramacionFinancieraFormgroup = this.fb.group({

      detallePartida: ['', [Validators.required]],
      numeroPartida: ['', [Validators.required]],
      nuevoSaldo: ['', [Validators.required]],
      ejecucionPoa: ['', [Validators.required]],
      enero: ['', [Validators.required]],
      febrero: ['', [Validators.required]],
      marzo: ['', [Validators.required]],

      abril: ['', [Validators.required]],
      mayo: ['', [Validators.required]],
      junio: ['', [Validators.required]],
      julio: ['', [Validators.required]],
      agosto: ['', [Validators.required]],
      septiembre: ['', [Validators.required]],
      octubre: ['', [Validators.required]],
      noviembre: ['', [Validators.required]],
      diciembre: ['', [Validators.required]],
      reprogramacionTotal: ['', [Validators.required]],

      //partida destino
      detallePartida1: ['', [Validators.required]],
      numeroPartida1: ['', [Validators.required]],
      nuevoSaldo1: ['', [Validators.required]],
      ejecucionPoa1: ['', [Validators.required]],
      enero1: ['', [Validators.required]],
      febrero1: ['', [Validators.required]],
      marzo1: ['', [Validators.required]],
      abril1: ['', [Validators.required]],
      mayo1: ['', [Validators.required]],
      junio1: ['', [Validators.required]],
      julio1: ['', [Validators.required]],
      agosto1: ['', [Validators.required]],
      septiembre1: ['', [Validators.required]],
      octubre1: ['', [Validators.required]],
      noviembre1: ['', [Validators.required]],
      diciembre1: ['', [Validators.required]],
      reprogramacionTotal1: ['', [Validators.required]],



    })

    this.reprogramacionFinaciera.push(reprogramacionFinancieraFormgroup)
  }

  QuitarReprogramacion(indice: number) {
    this.reprogramacionFinaciera.removeAt(indice)
  }

  voteUp1(valor: number) {

    if (this.votes1 >= 50 && valor >= 0) {
      return this.votes1 = 50;
    }
    //  this.votes++;
    if (this.votes1 <= 0 && valor < 0) {
      return this.votes1 = 0;
    }

    this.votes1 = this.votes1 + valor;

    this.AgregarReprogramacioFinaciera();
  }

  voteDown1(valor: number) {

    //  this.votes++;
    if (this.votes1 <= 0 && valor < 0) {
      return this.votes1 = 0;
    }
    this.votes1 = this.votes1 + valor;
    this.QuitarReprogramacion(0)
  }






  crearInidcador() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.urlPdf = this.urlPDF;
    this._reformas.addOpcion(this.registerForm.value).subscribe(
      resp => {
        Swal.fire("Registro  existoso", "", "success")

      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');

      })
  }

  update(): void {
    this.reformaModelo.urlPdf = this.urlPDF;
    this._reformas.updateOpcion(this.reformaModelo)
      .subscribe(result => {
        Swal.fire("Actualización de Indicadores existoso", "", "success")
      });
  }



  //=======================subir archivos===========================//


  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.registerForm.patchValue({
      avatar: this.fileObj
    })

    this.registerForm.get('avatar').updateValueAndValidity()

    // Upload to server
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.dragdropService.addFiles(this.registerForm.value.avatar)


      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.urlPDF = event.body.userCreated.avatar[0];
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "Documento cargado exitosamente!"
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  //=======================subir archivos===========================//
  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }



  nohay() {
    Swal.fire(

      'NO HAY',
      'ADJUNTOS EN ESTE INFORME',
      'warning'
    );

  }
}
