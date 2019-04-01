import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acoes } from './../../../../../enums/Acoes.enum';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';

import { FuncionarioService } from './../../../services/funcionario.service';

import { NgcElementConfig,
  NgcElement,
  NgcFormComponent,
  NgcType,
  NgcTabelaComponent,
  DTO,
  NgcDialogoService,
  NgcSnackbarService } from 'ngc';

import { Response } from '@angular/http';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit, AfterViewInit {

  @ViewChild('ngcTabela') ngcTabela: NgcTabelaComponent;
  dto = new DTO();
  requisicao: Observable<Response> = Observable.create(new DTO());
  acao: Acoes = Acoes.Cadastrar;

  paginacaoOptions = {
    itensPagina: 5,
    paginaIndex: 0,
    opcoesPaginas: [2, 5, 10, 20, 30]
  };

  @ViewChild('form') myForm: NgcFormComponent;
  formData: NgcElementConfig[][] = [
  [
    {
      name: 'nm_funcionario',
      label: 'Nome',
      type: NgcElement.Input,
      required: true,
      minLength: 3,
      maxLength: 100,
      crudConfig: {
        value: 'nm_funcionario',
      }
    }
  ],
  [
    {
      name: 'vl_idade',
      label: 'Idade',
      type: NgcElement.Input,
      required: true,
      minLength: 1,
      maxLength: 3,
      mask: [/\d/, /\d/, /\d/],
      crudConfig: {
        value: 'vl_idade',
      }
    },
    {
      name: 'nm_cargo',
      label: 'Cargo',
      type: NgcElement.Input,
      required: true,
      minLength: 3,
      maxLength: 30,
      crudConfig: {
        value: 'nm_cargo',
      }
    },
  ]
];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngcSnackbarService: NgcSnackbarService,
    private ngcDialogService: NgcDialogoService,
    private cdr: ChangeDetectorRef,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {
    // this.resolverRota();
  }

  ngAfterViewInit(): void {

    this.resolverRota();

    /*  Resolve o problema: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    / Previous value: 'ngIf: true'. Current value: 'ngIf: false' */
    this.cdr.detectChanges();
  }

  limparCampos(): void {

    this.myForm.controls.nm_funcionario.setValue('');
    this.myForm.controls.vl_idade.setValue('');
    this.myForm.controls.nm_cargo.setValue('');
  }
  // método para identificar a ação
  private resolverRota(): void {
    this.activatedRoute.url.subscribe(
      segmentoDeRota => {
        this.acao = Acoes[segmentoDeRota[0]['path']];
        this.alterarTelaParaAcao();
      }
    );
  }

  // método para abrir a tela de edição ou de visualização
  alterarTelaParaAcao() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as any;

    switch (this.acao) {

      /*case Acoes.Cadastrar:
      break; */

      case Acoes.Editar :
        this.buscaPorId(id);
      break;

      case Acoes.Visualizar:
        this.buscaPorId(id);

        Object.keys(this.myForm.controls).forEach(key => {
          this.myForm.controls[key].disable(); // percorre formControls e atribui disable
        });

      break;

    }
  }


  buscaPorId(id: number) {
    this.funcionarioService.getById(id).subscribe(data => {
      const funcionario = data;

      this.preencherCampos(funcionario);
    });
  }

  preencherCampos(obj) {

    // console.log(obj);
    if (this.acao !== Acoes.Cadastrar) {
      this.myForm.controls.nm_funcionario.setValue(obj.nm_funcionario);
      this.myForm.controls.vl_idade.setValue(obj.vl_idade);
      this.myForm.controls.nm_cargo.setValue(obj.nm_cargo);
    }
  }

  validarDados() {

    const nome = this.myForm.controls.nm_funcionario;
    const cargo = this.myForm.controls.nm_cargo;

    if (!nome.value.trim()) {
      this.alerta('Falha na validação!', 'Favor, informe o campo nome.');
      nome.setValue('');

      return false;
    }

    if (!cargo.value.trim()) {
      this.alerta('Falha na validação!', 'Favor, informe o campo cargo.');
      cargo.setValue('');

      return false;
    }

    return true;
  }

  salvar() {

    if (!this.validarDados()) {
      return false;
    }

    const funcionario: any = { // interface do tipo pesquisa para ser gravada no BD
      id_funcionario: null,
      nm_funcionario: this.myForm.controls.nm_funcionario.value,
      vl_idade: this.myForm.controls.vl_idade.value,
      nm_cargo: this.myForm.controls.nm_cargo.value,
    };

    if (this.acao === 0) { // verifica a ação(cadastrar/editar/visualizar)
      this.criar(funcionario);
    } else if (this.acao === 1) {

      funcionario.id_funcionario = this.activatedRoute.snapshot.paramMap.get('id') as any;
      console.log('id_funcionario: ');
      console.log(funcionario);
      this.editar(funcionario);

    }
  }


  criar(funcionario) {
    this.funcionarioService.save(funcionario).subscribe(response => {

        this.alerta('Sucesso!', 'Funcionário foi criado com sucesso!');
        this.irParaTelaDeListagem();

      }, error => {
        const er = error.error;
        const msg = [];

        if (er.code === 400) {
          this.alerta('Falha ao salvar funcionário',  er.messages);
        }

      });
  }

  editar(funcionario) {
    this.funcionarioService.updateOne(funcionario).subscribe(response => {

      this.alerta('Sucesso!', 'Funcionário foi atualizado com sucesso!');
      this.irParaTelaDeListagem();

    }, error => {
        const er = error.error;
        const msg = [];

        if (er.code === 400) {
          this.alerta('Falha ao salvar funcionário',  er.messages);
        }

    });
  }

  alertWhenHasASuccess(wordKey: string) {
    this.ngcSnackbarService.success(
      'Período de aplicação ' + wordKey + ' com sucesso!',
      null,
      'Fechar',
    );
  }

  alerta(title, msg) {
    this.ngcDialogService.informacao(
      title,
      msg,
      'Ok',
    );
  }

  irParaTelaDeListagem() {
    if (this.acao === Acoes.Cadastrar) {
      this.router.navigate(['./../listar'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['./../../listar'], { relativeTo: this.activatedRoute });
    }
  }
}
