import { PtBrMatPaginatorIntl } from './../shared/converter/pt-br-mat-paginator-intl';
import { MatPaginatorIntl } from '@angular/material';
import { LancamentoService } from './../shared/services/lancamento.service';
import { ConfigModule } from './../config.module';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { FuncionarioComponent } from './components/funcionario.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { ListagemComponent } from './components/listagem/listagem.component';
import { HttpUtilService } from '../shared/services/http-util.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListagemComponent,
    LancamentoComponent,
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ConfigModule,
    SharedModule
  ],
  providers: [
    HttpUtilService,
    LancamentoService,
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuncionarioModule { }
