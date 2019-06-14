import { CadastroPjService } from './services/cadastro-pj.service';
import { ConfigModule } from './../../config.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { CadastroPjComponent } from './components/cadastro-pj.component';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CadastrarPjComponent } from './components/cadastrar-pj/cadastrar-pj.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CadastrarPjComponent,
    CadastroPjComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ConfigModule,
    SharedModule
  ],
  providers: [
    CadastroPjService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CadastroPjModule { }
