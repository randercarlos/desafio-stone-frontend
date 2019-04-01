import { Routes, RouterModule } from '@angular/router';
import { NgcCrudRootListarComponent } from 'ngc';

import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioListagemComponent } from './funcionario-listagem/funcionario-listagem.component';

export const FuncionarioRoutes = {

  // Nome da rota
  path: 'funcionarios',
  // Nome do componente
  component: FuncionarioComponent,
  data: { breadcrumb: 'Funcionários' },

  children: [
    { path: '', pathMatch: 'full', redirectTo: 'listar' },
    {
      path: 'listar',
      component: FuncionarioListagemComponent,
      data: { breadcrumb: 'Listagem' }
    },
    {
      path: 'visualizar/:id',
      component: FuncionarioFormComponent,
      data: { breadcrumb: 'Visualizar' }
    },
    {
      path: 'editar/:id',
      component: FuncionarioFormComponent,
      data: { breadcrumb: 'Editar' }
    },
    {
      path: 'cadastrar',
      component: FuncionarioFormComponent,
      data: { breadcrumb: 'Cadastrar' }
    }
  ]

};
