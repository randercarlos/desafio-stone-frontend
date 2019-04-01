import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import {
  NgcCrudModule,
  NgcTranslateService,
  TranslateHttpLoader,
  NgcTranslateModule,
  NgcTranslateLoader,
  NgcFormModule,
  NgcLayoutModule,
} from 'ngc';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'ngc/src/ngc/material/material.module';
import { RouterModule } from '@angular/router';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
// tslint:disable-next-line:max-line-length

import { FuncionarioService } from './services/funcionario.service';
// tslint:disable-next-line:max-line-length
import { FuncionarioListagemComponent } from './components/funcionario/funcionario-listagem/funcionario-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    NgcCrudModule,
    FlexLayoutModule,
    NgcFormModule,
    NgcLayoutModule,
    HttpModule,
    RouterModule,
    NgcTranslateModule.forRoot({
      loader: {
        provide: NgcTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    // Diretivas e componentes
    FuncionarioComponent,
    FuncionarioListagemComponent,
    FuncionarioFormComponent,
  ],
  providers: [
    // ALGUM SERVIÇO
    FuncionarioService,
  ],
  entryComponents: [
    // ALGUM COMPONENTE
  ],
})
export class FuncionarioModule {
  constructor(private ngcTranslateService: NgcTranslateService) {
    this.ngcTranslateService.use('pt-BR');
  }
}
