import { AdminGuard } from './services/admin-guard.service';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from './../angular-material.module';
import { PtBrMatPaginatorIntl } from './../shared/converter/pt-br-mat-paginator-intl';
import { FuncionarioService } from './../shared/services/funcionario.service';
import { HttpUtilService } from './../shared/services/http-util.service';
import { LancamentoService } from './../shared/services/lancamento.service';
import { AdminComponent } from './components/admin.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ListagemComponent } from './components/listagem/listagem.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent,
    DialogComponent
  ],
  providers: [
    LancamentoService,
    HttpUtilService,
    MatPaginatorIntl,
    FuncionarioService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
    AdminGuard
  ],
  entryComponents: [DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }

