import { Usuario } from "./usuarios.models";

export class Indicadores {
    _id : string;

    unidad:string
    role:string
    responde:string
    evaluacion:string
    macroProceso:string
    producto:string
    indicador:string
    formula:string
    descripcion:string
    responsable:string
    nombreResponsable:string
    fechaMedicion:string
    lineaBase:string
    comportamiento:string
    unidadMedida:string
    sentidoMedicion:string
    meta:string
  
    enero:string
    febrero:string
    marzo:string
    abril:string
    mayo:string
    junio:string
    julio:string
    agosto:string
    septiembre:string
    octubre:string
    noviembre:string
    diciembre:string
    trimestre1:string
    trimestre2:string
    trimestre3:string
    trimestre4:string
    cuatrimestral1:string
    cuatrimestral2:string
    cuatrimestral3:string
    semestral1:string
    semestral2:string
    anual:string
    observaciones:string
    usuario: Usuario
    periodicidad:string
    estadoSolicitud:string

    fechaCreacion :Date
    fechaModificacion :Date
    autorizacion:string 
    /* Avance Indicadores */
    periods: Array<any>
    resultYear: Array<any>
    solicitaAvanceIndicador: string
    solicitaUpd:string
    fechaReporte?: string
    check?: boolean

}