import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification';
import { Usuario } from '../../models/usuarios.models';
import { UsuariosService } from '../../services/usuarios.service';
import { GeneralService } from '../../services/general.service';

declare function customInitFunctions();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  //Notificacion
  notifications = new Array<Notification>();
  newNotifications: number;

  constructor(
    private _usuarioService: UsuariosService,
    private _notificationService: GeneralService,
    private router: Router
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    customInitFunctions();
    //Notificacion
    this.getNotifications();
  }

  cerrarSesion() {
    this._usuarioService.logOut();
  }

  activar() {
    customInitFunctions();
  }

  getNotifications() {
    this.newNotifications = 0;
    this._notificationService
      .get(`notification?user_id=${this.usuario._id}`)
      .subscribe(
        (res) => {
          this.notifications = res['data'];
          this.notifications.forEach((element) => {
            if (!element.view) {
              this.newNotifications += 1;
            }
          });
        },
        (err) => {
          console.error(err);
        }
      );
  }

  /* Notification */
  viewNotification(notification: Notification) {
    localStorage.setItem('idNotification', notification._id);
    if (notification.view) {
      this.routerNavigate(notification);
    } else {
      notification.view = true;
      this._notificationService
        .updateOpcion(notification, `notification`)
        .subscribe(
          (res) => {
            this.routerNavigate(notification);
          },
          (err) => {
            console.error(err);
          }
        );
    }
  }

  routerNavigate(notification: Notification){

    console.log(notification);

    if (notification.receiver.role == 'PLANIFICADOR_ROLE') {
      this.router
        .navigateByUrl(`/`, {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`dashboard/visualizar/indicador/${notification.uri}`]);
        } );
    } else if (notification.receiver.role == 'UPDI_ROLE') {
      this.router
        .navigateByUrl(`/`, {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`dashboard/visualizar/indicador/${notification.uri}`]);
        } );
    }
  }
}
