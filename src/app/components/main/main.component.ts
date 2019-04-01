import { Component, OnInit } from '@angular/core';
import { NgcSideNavElement, NgcDialogoService } from 'ngc';
import { environment } from './../../../environments/environment';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  currentUser: User = new User();

  title = 'Stone Tecnologia RC';

  subtitle = 'Sistema de Cadastro de Funcionários';

  ambiente = environment.ambiente;

  options = {
    sidePanelOpened: false,
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr',
  };

  mediaQuery: string;

  menuElements: NgcSideNavElement[] = [
    { title: 'Página Inicial', icon: 'home', url: '/' },
  ];

  constructor(
    private router: Router,
    private dialogBar: NgcDialogoService,
    private authService: AuthService
  ) {}

  changeNav(event) {
    this.options.collapsed = !this.options.collapsed;
  }

  changeTheme(event) {
      this.options.dark = !this.options.dark;
  }

  logout() {
    const dialogoConfirmacaoLogout = this.dialogBar.confirmacao(
      'Encerrar Sessão',
      'Deseja realmente encerrar sua sessão?',
      'Sim'
    );

    dialogoConfirmacaoLogout.subscribe(confirmacao => {
      if (confirmacao) {
        this.authService.logout().subscribe(() => {
          localStorage.removeItem('currentUser');
          window.location.href = environment.portalUrl;

          return;
        });
      }
    });

    return false;
  }

  ngOnInit() {
    // this.authService.currentUser().subscribe((user) => {
    //   this.currentUser = user;
    //   this.router.navigate(['/']);
    // });

    const menu = { title: 'Funcionário', icon: 'assignment', url: '/funcionarios', aberto: false, elements: [] };

    menu.elements.push(
      { title: 'Listagem', url: '/funcionarios' },
      { title: 'Cadastro', url: '/funcionarios/cadastrar'},
    );

    this.menuElements.push(menu);

  }

}
