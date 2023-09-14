import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(public _usuarioService: UsuariosService) { }

  canActivate() {

    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'USER_ROLE') {
      Swal.fire({
        icon: 'question',
        title: 'Oops...',
        text: 'Su usuario esta pendiente de activación comuniquese con el administrador',

      });
      return false;
    }
    
    if (this._usuarioService.usuario.role === 'RECTOR_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'PRESUPUESTO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DIRECTOR_UPDI_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'VICERECTOR_ADMINISTRATIVO_ROLE') {
      return true;
    }
    
    if (this._usuarioService.usuario.role === 'VICERECTOR_ACADEMICO__GENERAL_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'REQUIRENTE_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'UPDI_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'VICERECTOR_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DIRECTOR_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'PLANIFICADOR_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'FINANCIERO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CENTRO_DE_EDUCACION_CONTINUA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CENTRO_DE_INVESTIGACIONES_Y_APLICACIONES_MILITARES_CICTE_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CIMSE_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_TIERRA_Y_LA_CONSTRUCCION_CARRERAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_AGRICULTURA_CARRERAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_LA_AGRICULTURA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_Y_DE_COMERCIO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_Y_DE_COMERCIO_CARRERAS_ROLE') {
      return true;
    }

    //mios
    if (this._usuarioService.usuario.role=== 'SEDE_LATACUNGA_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'SEDE_LATACUNGA_DEPARTAMENTOS_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'SEDE_LATACUNGA_CARRERAS_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'SEDE_SANTO_DOMINGO_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'SEDE_SANTO_DOMINGO_DEPARTAMENTOS_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'SEGUIMIENTO_A_GRADUADOS_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'TECNOLOGIAS_DE_LA_INFORMACION_Y_COMUNICACIONES_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'UNIDAD_DE_GESTION_DE_LA_INVESTIGACION_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'UNIDAD_DE_TALENTO_HUMANO_ROLE') {
      return true;

    }
    if (this._usuarioService.usuario.role=== 'UNIDAD_DE_SEGURIDAD_FISICA_ROLE') {
      return true;

    }

    if (this._usuarioService.usuario.role=== 'DESARROLLO_FISICO_ROLE') {
      return true;

    }

    if (this._usuarioService.usuario.role=== 'EDUCACION_A_DISTANCIA_ROLE') {
      return true;

    }

    if (this._usuarioService.usuario.role=== 'PLANIFICACION_Y_DESARROLLO_INSTITUCIONAL_ROLE') {
      return true;

    }
    
    if (this._usuarioService.usuario.role=== 'RELACIONES_DE_COOPERACION_INTERINSTITUCIONAL_ROLE') {
      return true;

    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_ELECTRICA_Y_ELECTRONICA_CARRERAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'SEDE_DOMINGO_CARRERAS_ROLE') {
      return true;
    }


    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_HUMANAS_Y_SOCIALES_CARRERAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_ELECTRICA_Y_ELECTRONICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_ENERGIA_Y_MECANICA_CARRERAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DESARROLLO_EDUCATIVO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'UNIDAD_FINANCIERA_ROLE') {
      return true;
    }
    if (this._usuarioService.usuario.role === 'AUTOEVALUACION_Y_ASEGURAMIENTO_DE_LA_CALIDAD_ACADEMICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'PLANIFICACION_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'ESPE_LATACUNGA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'ESPE_STO_DOMINGO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'ADMISION_REGISTRO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'VICERECTOR_INVESTIGACION_INNOVACION_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'GESTION_INVESTIGACION_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'TECNOLOGIAS_INFORMACION_COMUNICACIONES_ROLE') {
      return true;
    }

    

    if (this._usuarioService.usuario.role === 'COMUNICACION_SOCIAL_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'BIENESTAR_ESTUDIANTIL_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'BIBLIOTECA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CENTRO_DE_EDUCACIÓN_CONTINUA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'GESTION_DE_VINCULACION_CON_LA_SOCIEDAD_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CENTRO_DE_POSGRADOS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DESAROLLO_FISICO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'SERVICIOS_UNIVERSITARIOS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'SEGURIDAD_INTEGRADA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'EDUCACION_A_DISTACIA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'INSTITUTO_DE_IDIOMAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CICTE_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'TALENTO_HUMANO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'LOGISTICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'SECRETARIA_GENERAL_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'IASA_1_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'ASESORIA_JURIDICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'CENTRO_DE_NANOCIENCIA_Y_NANOTECNOLOGIA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'SEGURIDAD_FISICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'VICERRECTORADO_ACADEMICO_GENERAL_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_MEDICAS_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'VICERRECTORADO_DE_DOCENCIA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_HUMANAS_Y_SOCIALES_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_DE_LA_AGRICULTURA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_COMPUTACION_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_SEGURIDAD_Y_DEFENSA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_DE_COMERCIO_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_DE_TIERRA_Y_LA_CONSTRUCCION_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_ENERGIA_Y_MECANICA_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_ELECTRICA_ELECTRONICA_Y_TELECOMUNICACIONES_ROLE') {
      return true;
    }

    if (this._usuarioService.usuario.role === 'DEPARTAMENTO_DE_CIENCIAS_EXACTAS_ROLE') {
      return true;
    }
      if (this._usuarioService.usuario.role === 'VINCULACION_CON_LA_SOCIEDAD_ROLE') {
        return true;
      }
      if (this._usuarioService.usuario.role === 'IASAI_DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_LA_AGRICULTURA_ROLE') {
        return true;
      }
    
      else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Su usuario esta Inactivo',
      });
      this._usuarioService.logOut();
      return false;
    };

  }

}