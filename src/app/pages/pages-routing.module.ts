import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { IndicadoresGestionComponent } from './indicadoresGenerales/indicadores-gestion/indicadores-gestion.component';

import { IdIndicadoresComponent } from './indicadoresGenerales/id-indicadores/id-indicadores.component';
import { VerindicadoresComponent } from './indicadoresGenerales/verindicadores/verindicadores.component';
import { IndicadoresUpdiComponent } from './indicadoresGenerales/indicadores-updi/indicadores-updi.component';
import { IdindicadoresUpdiComponent } from './indicadoresGenerales/idindicadores-updi/idindicadores-updi.component';
// Generar Reporte
import { IndicadorReportesComponent } from './indicadoresGenerales/indicador-reportes/indicador-reportes.component';

import { IdreformasRequirenteComponent } from './reformasGenerales/idreformas-requirente/idreformas-requirente.component';
import { ReformasPresupuestariasComponent } from './reformasGenerales/reformas-presupuestarias/reformas-presupuestarias.component';
import { ReformasRequirenteComponent } from './reformasGenerales/reformas-requirente/reformas-requirente.component';
import { VerReformasPGComponent } from './reformasGenerales/ver-reformas-pg/ver-reformas-pg.component';

/* Notification */
import { NotificationComponent } from './notification/notification.component';
import { IasaComponent } from './seguimientoEvaluaciones/iasa/iasa.component';
import { LatacungaComponent } from './seguimientoEvaluaciones/latacunga/latacunga.component';
import { GastoCorrienteComponent } from './seguimientoEvaluaciones/gasto-corriente/gasto-corriente.component';
import { GastoInversionComponent } from './seguimientoEvaluaciones/gasto-inversion/gasto-inversion.component';
import { ResumenPugInformeComponent } from './seguimientoEvaluaciones/resumen-pug-informe/resumen-pug-informe.component';
import { SantoDomingoComponent } from './seguimientoEvaluaciones/santo-domingo/santo-domingo.component';
import { UnidadesRectoradoComponent } from './seguimientoEvaluaciones/unidades-rectorado/unidades-rectorado.component';
import { ViceAdministrativoComponent } from './seguimientoEvaluaciones/vice-administrativo/vice-administrativo.component';
import { ViceInvestigacionComponent } from './seguimientoEvaluaciones/vice-investigacion/vice-investigacion.component';
import { VagComponent } from './seguimientoEvaluaciones/vag/vag.component';
import { ViceDocenciaComponent } from './seguimientoEvaluaciones/vice-docencia/vice-docencia.component';
import { ActualizarIndicadorComponent } from './indicadoresGenerales/actualizar-indicador/actualizar-indicador.component';


const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AdminGuard],
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [AdminGuard] },
      { path: '', component: IdIndicadoresComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard] },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }, canActivate: [AdminGuard] },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas' }, canActivate: [AdminGuard], },
      { path: 'adminUsers', component: AdminUsuariosComponent, data: { titulo: 'Usuarios Registrados' }, canActivate: [AdminGuard], },
      { path: 'indicadoresGestion', component: IndicadoresGestionComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'historial', component: VerindicadoresComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'indicadores/:id', component: IdIndicadoresComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'visualizar/indicador/:id', component: ActualizarIndicadorComponent, data: { titulo: 'Información del Indicador' }, canActivate: [AdminGuard], },
      
      // Reportes Generar Indicador
      { path: 'reportesIndicador', component: IndicadorReportesComponent, data: { titulo: 'Reportes Indicador' }, canActivate: [AdminGuard], },
      { path: 'resumen-pug-informe', component: ResumenPugInformeComponent, data: { titulo: 'Resumen' }, canActivate: [AdminGuard], },
      { path: 'iasa', component: IasaComponent, data: { titulo: 'Iasa' }, canActivate: [AdminGuard], },
      { path: 'gasto-corriente', component: GastoCorrienteComponent, data: { titulo: 'Gasto Corriente' }, canActivate: [AdminGuard], },
      { path: 'gasto-inversion', component: GastoInversionComponent, data: { titulo: 'Gasto Inversion' }, canActivate: [AdminGuard], },

      { path: 'latacunga', component: LatacungaComponent, data: { titulo: 'Latacunga' }, canActivate: [AdminGuard], },
      { path: 'santo-domingo', component: SantoDomingoComponent, data: { titulo: 'Santo Domingo' }, canActivate: [AdminGuard], },
      { path: 'unidades-rectorado', component: UnidadesRectoradoComponent, data: { titulo: 'Unidades Resctorado' }, canActivate: [AdminGuard], },
      { path: 'vice-administrativo', component: ViceAdministrativoComponent, data: { titulo: 'Vice administrativo' }, canActivate: [AdminGuard], },
      { path: 'vice-investigacion', component: ViceInvestigacionComponent, data: { titulo: 'Vice investigacion' }, canActivate: [AdminGuard], },
      { path: 'vag', component: VagComponent, data: { titulo: 'Vag' }, canActivate: [AdminGuard], },
      { path: 'vice-docencia', component: ViceDocenciaComponent, data: { titulo: 'Vice Docencia' }, canActivate: [AdminGuard], },

      { path: 'indicadoresUpdi', component: IndicadoresUpdiComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'indicadoresUpdiId', component: IdindicadoresUpdiComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'indicadoresUpdiId/:id', component: IdindicadoresUpdiComponent, data: { titulo: 'Indicadores de Gestión' }, canActivate: [AdminGuard], },
      { path: 'reformas', component: ReformasPresupuestariasComponent, data: { titulo: 'Reforma Presupuestaria' }, canActivate: [AdminGuard], },
      { path: 'reformasRequirente', component: ReformasRequirenteComponent, data: { titulo: 'Reformas' }, canActivate: [AdminGuard], },
      { path: 'reformasRequirentes', component: IdreformasRequirenteComponent, data: { titulo: 'Reforma Presupuestaria' }, canActivate: [AdminGuard] },
      { path: 'reformasRequirentes/:id', component: IdreformasRequirenteComponent, data: { titulo: 'Reforma Presupuestaria' }, canActivate: [AdminGuard] },

      { path: 'reformasGenerales', component: VerReformasPGComponent, data: { titulo: 'Reforma Presupuestaria' }, canActivate: [AdminGuard] },

      /* Notification */
      { path: 'notificationAll', component: NotificationComponent, canActivate: [AdminGuard] }

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }