import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ConfigModule } from './../../config.module';
import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './logar.component';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule,
    AngularMaterialModule
  ],
  declarations: [
    LogarComponent,
    LoginComponent
  ],
  providers: [
    LoginService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginModule { }
