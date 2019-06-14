import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';
import { CadastroPfComponent } from './components/cadastro-pf.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const CadastroPfRoutes: Routes = [
  {
    path: 'cadastro-pf',
    component: CadastroPfComponent,
    children: [
      {
        path: '',
        component: CadastrarPfComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CadastroPfRoutes)],
  exports: [RouterModule]
})
export class CadastroPfRoutingModule { }
