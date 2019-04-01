import { Injectable } from '@angular/core';
import { NgcCrudServiceInterface, NgcHttpService, NgcDialogoService, NgcSnackbarService, DTO } from 'ngc';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FuncionarioService implements NgcCrudServiceInterface, Resolve<any> {

  private path = 'funcionarios';

  public showOrdenar = false;

  constructor(
    private http: NgcHttpService,
  ) { }

  public updateDTO(dto: DTO) {

    return this.http.post(environment.apiUrl + this.path + '/search', dto).map(
        (response) => {
          // console.log(response);
          return response;
        }
    );
  }

  public getById(id: number) {
    return this.http.get(`${environment.apiUrl}${this.path}/${id}`);
  }

  public getAll() {
    // return this.http.get(`${environment.apiUrl}${this.path}`);
  }

  public save(funcionario) {
    return this.http.post(`${environment.apiUrl}${this.path}`, funcionario);
  }

  public removeById(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.path}/${id}`);
  }

  public updateOne(funcionario) {
    return this.http.put(`${environment.apiUrl}${this.path}/${funcionario.id_funcionario}`, funcionario);
  }


  public resolve(route: ActivatedRouteSnapshot) {
    const param = route.paramMap.get('param');
    if (!param) {
        throw new Error('A rota deve passar um /:param, ou não foi passado um valor válido');
    }
    return this.getById(Number(param));
  }
}
