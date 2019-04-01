import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import {
  NgcLayoutModule,
  NgcTranslateModule,
  NgcTranslateLoader,
  TranslateHttpLoader,
  NgcSnackbarService,
  NgcTranslateService,
} from 'ngc';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './modules/auth/auth.guard';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    NgcLayoutModule,
    FlexLayoutModule,
    FuncionarioModule,
    NgcTranslateModule.forRoot({
      loader: {
        provide: NgcTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    AuthGuard,
    NgcSnackbarService,
    NgcTranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
  constructor(private ngcTranslateService: NgcTranslateService) {
    this.ngcTranslateService.use('pt-BR');
  }
}
