import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

import { FuncionarioRoutes } from './modules/funcionario/components/funcionario/funcionario.routing';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data : { breadcrumb: 'Início' },
    canActivateChild: [], // [AuthGuard],
    children: [
      FuncionarioRoutes,
    ]
  }
];

@NgModule({
  // Para debugar as routas, habilitar o enableTracing
  imports: [RouterModule.forRoot(routes, { enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
