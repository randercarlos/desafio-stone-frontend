// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://pesquisa-backend.local/api/pesquisa/',
  apiUrl: 'http://localhost:3000/',
  portalUrl: 'http://localhost:4200',
  // apiUrl: 'http://localhost::8002/api/pesquisa/',
  apiUrlPortal: 'http://localhost:8000/api/portal/',
  // apiUrlAcademico: 'http://localhost:8002/api/academico/',
  apiUrlAcademico: 'http://10.1.113.234:8090/api/academico/',
  apiUrlpessoal: 'http://pessoal-backend.local/api/pessoal/',
  ambiente: 'LOCAL'
};
