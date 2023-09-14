import { PipesModule } from './../pipes/pipes.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { IndicadoresGestionComponent } from './indicadoresGenerales/indicadores-gestion/indicadores-gestion.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IdIndicadoresComponent } from './indicadoresGenerales/id-indicadores/id-indicadores.component';
import { IndicadoresUpdiComponent } from './indicadoresGenerales/indicadores-updi/indicadores-updi.component';
import { VerindicadoresComponent } from './indicadoresGenerales/verindicadores/verindicadores.component';
import { IdindicadoresUpdiComponent } from './indicadoresGenerales/idindicadores-updi/idindicadores-updi.component';
import { IdreformasRequirenteComponent } from './reformasGenerales/idreformas-requirente/idreformas-requirente.component';
import { ReformasPresupuestariasComponent } from './reformasGenerales/reformas-presupuestarias/reformas-presupuestarias.component';
import { VerReformasPGComponent } from './reformasGenerales/ver-reformas-pg/ver-reformas-pg.component';
import { ReformasRequirenteComponent } from './reformasGenerales/reformas-requirente/reformas-requirente.component';
import { NotificationComponent } from './notification/notification.component';
import { IasaComponent } from './seguimientoEvaluaciones/iasa/iasa.component';
import { LatacungaComponent } from './seguimientoEvaluaciones/latacunga/latacunga.component';
import { ChartsModule } from 'ng2-charts';
import { IndicadorReportesComponent } from './indicadoresGenerales/indicador-reportes/indicador-reportes.component';
import { GastoInversionComponent } from './seguimientoEvaluaciones/gasto-inversion/gasto-inversion.component';
import { GastoCorrienteComponent } from './seguimientoEvaluaciones/gasto-corriente/gasto-corriente.component';
import { SantoDomingoComponent } from './seguimientoEvaluaciones/santo-domingo/santo-domingo.component';
import { ResumenPugInformeComponent } from './seguimientoEvaluaciones/resumen-pug-informe/resumen-pug-informe.component';
import { UnidadesRectoradoComponent } from './seguimientoEvaluaciones/unidades-rectorado/unidades-rectorado.component';
import { ViceInvestigacionComponent } from './seguimientoEvaluaciones/vice-investigacion/vice-investigacion.component';
import { ViceAdministrativoComponent } from './seguimientoEvaluaciones/vice-administrativo/vice-administrativo.component';
import { VagComponent } from './seguimientoEvaluaciones/vag/vag.component';
import { ViceDocenciaComponent } from './seguimientoEvaluaciones/vice-docencia/vice-docencia.component';
import { ActualizarIndicadorComponent } from './indicadoresGenerales/actualizar-indicador/actualizar-indicador.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    AdminUsuariosComponent,
    AccountSettingsComponent,
    IndicadoresGestionComponent,
    VerindicadoresComponent,
    IdIndicadoresComponent,
    IndicadoresUpdiComponent,
    IdindicadoresUpdiComponent,
    ReformasPresupuestariasComponent,
    ReformasRequirenteComponent,
    IdreformasRequirenteComponent,
    VerReformasPGComponent,
    IasaComponent,
    LatacungaComponent,
    SantoDomingoComponent,
    ResumenPugInformeComponent,    
    NotificationComponent,
    UnidadesRectoradoComponent,
    ViceInvestigacionComponent,
    ViceAdministrativoComponent,
    VagComponent,
    ViceDocenciaComponent,
    IndicadorReportesComponent,
    GastoCorrienteComponent,
    GastoInversionComponent,
    ActualizarIndicadorComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    PagesRoutingModule,
    PipesModule,
    NgxPaginationModule,
    ChartsModule,
  ]
})

export class PagesModule { }