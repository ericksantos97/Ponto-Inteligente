import { CadastroPfService } from './services/cadastro-pf.service';
import { ConfigModule } from './../../config.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { CadastroPfComponent } from './components/cadastro-pf.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ConfigModule,
    SharedModule
  ],
  providers: [
    CadastroPfService
  ]
})
export class CadastroPfModule { }
