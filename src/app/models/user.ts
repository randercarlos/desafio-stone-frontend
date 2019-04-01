import { Pessoa } from './pessoa.model';

export class User {

  constructor(
    public username = '',
    public password = '',
    public firstName = '',
    public lastName = '',
    public pessoa = new Pessoa(),
    public permissoes = []
  ) {}
}
