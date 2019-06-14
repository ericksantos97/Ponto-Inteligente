import { ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { FuncionarioComponent } from './components/funcionario.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const FuncionarioRoutes: Routes = [
  {
    path: 'funcionario',
    component: FuncionarioComponent,
    children: [
      {
        path: '',
        component: LancamentoComponent
      },
      {
        path: 'listagem',
        component: ListagemComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(FuncionarioRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FuncionarioRoutingModule { }
