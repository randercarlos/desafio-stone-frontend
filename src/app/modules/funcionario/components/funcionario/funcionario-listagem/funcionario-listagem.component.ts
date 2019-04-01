import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FuncionarioService } from './../../../services/funcionario.service';
import { MatDialog } from '@angular/material';


import {
  DTO,
  getValorFromObjeto,
  NgcElement,
  NgcElementConfig,
  NgcFormComponent,
  NgcTabelaAcao,
  NgcTabelaColuna,
  NgcTabelaComponent,
  NgcTabelaPaginacaoOptions,
  NgcDialogoService,
} from 'ngc';


@Component({
  selector: 'app-funcionario-listagem',
  templateUrl: './funcionario-listagem.component.html',
  styleUrls: ['./funcionario-listagem.component.css']
})
export class FuncionarioListagemComponent implements OnInit, AfterViewInit {

 // Formulário
 @ViewChild('form') public form: NgcFormComponent;

 public camposFormulario: NgcElementConfig[][] = [
  [
    {
      name: 'nm_funcionario',
      label: 'Nome',
      type: NgcElement.Input,
      required: false,
      async: false,
    },
  ],
  [
    {
      name: 'nm_cargo',
      label: 'Cargo',
      type: NgcElement.Input,
      required: false,
      async: false,
      group: 'advanced-form-field',
    },
  ],
  [
    {
      name: 'vl_idade_inicio',
      label: 'Idade(de)',
      type: NgcElement.Input,
      required: false,
      maxLength: 2,
      group: 'advanced-form-field',
    },
    {
      name: 'vl_idade_fim',
      label: 'Idade(até)',
      type: NgcElement.Input,
      required: false,
      maxLength: 2,
      group: 'advanced-form-field',
    },
  ]
];

 // Tabela
 @ViewChild('tabela') public _tabela: NgcTabelaComponent;
 public dto;
 public requisicao;
 public filtroAberto = false;
 public paginacao: NgcTabelaPaginacaoOptions = {
   itensPagina: 20,
   paginaIndex: 0,
   opcoesPaginas: [5, 20, 50, 100, 200]
 };
 public colunas: NgcTabelaColuna[] = [
   {
     id: 'nm_funcionario',
     nome: 'Nome',
     value: 'nm_funcionario'
   },
   {
     id: 'vl_idade',
     nome: 'Idade',
     value: 'vl_idade'
   },
   {
     id: 'nm_cargo',
     nome: 'Cargo',
     value: 'nm_cargo'
   }
 ];
 public acoes: NgcTabelaAcao[] = [
   {
      nome: 'visualizar',
      titulo: 'Visualizar',
      icone: 'search',
      tooltip: 'Visualizar',
      onClique: (item, index: number) => {
        this._router.navigate([`./../visualizar/${item.id_funcionario}`], { relativeTo: this._route });
      }
   },
   {
     nome: 'alterar',
     titulo: 'Alterar',
     icone: 'edit',
     tooltip: 'Alterar',
     onClique: (item, index: number) => {
       this._router.navigate([`./../editar/${item.id_funcionario}`], { relativeTo: this._route });
     }
   },
   {
      nome: 'excluir',
      titulo: 'Excluir',
      icone: 'delete',
      tooltip: 'Deletar',
      onClique: (item, index: number) => {
        this._ngcDialogoService.confirmacao(
          `Deletar funcionário`,
          `Tem certeza que você deseja deletar o funcionário(a) ${item.nm_funcionario} ?`,
          'Sim',
          'Não',
          true
        ).subscribe((confirmacao) => {

          if (confirmacao) {

            this.funcionarioService.removeById(item.id_funcionario).subscribe(() => {

              this.dialogService.informacao(
                'Sucesso',
                'Funcionário removido com sucesso!',
                'Ok',
              ).subscribe(() => { });

              this._tabela.atualizar();

            }, error => {

                this.dialogService.informacao(
                  'Erro ao excluir funcionário',
                  error.json(),
                  'Ok',
                );

            });

          }

        });
      }
   },

 ];

 constructor(
    public dialogService: NgcDialogoService,
    public funcionarioService: FuncionarioService,
    public dialog: MatDialog,

    private _ngcDialogoService: NgcDialogoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
 ) {}

  ngOnInit(): void {
    this.dto = new DTO();
    // this.requisicao = this.periodoAplicacaoService.updateDTO(this.dto);
    this.requisicao = this.funcionarioService.updateDTO(this.dto);
  }


  ngAfterViewInit() {
    this.toggleFiltro();


    this.cdr.detectChanges();
  }

  public getValorFromObjeto(objeto, valor) {
    return getValorFromObjeto(objeto, valor);
  }

  public redirectTo(uri: any): void {
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this._router.navigate([uri]));
  }

  public getResult(): void {

    this._tabela.dto['filter'] = this.form.value;

  }

  public limparCampos() {
    this.form.reset();
    this._tabela.atualizar();
  }

  public toggleFiltro() {

    if (this.filtroAberto) {
      this.form.showGroup('advanced-form-field');
    } else {
      this.form.hideGroup('advanced-form-field');
    }

    this.filtroAberto = !this.filtroAberto;
  }

  public novoFuncionario(): void {

    this._router.navigate([`./funcionarios/cadastrar`]);


  }

}
