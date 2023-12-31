import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';

const routes: Routes = [
  //Rutas de inicio
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forChild(routes)],
  exports:[ RouterModule]
})

export class AuthRoutingModule { }