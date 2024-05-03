import { Routes } from '@angular/router';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { ConsultarEmpresaComponent } from './consultar-empresa/consultar-empresa.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { ConsultarFuncionarioComponent } from './consultar-funcionario/consultar-funcionario.component';

export const routes: Routes = [
    {
        path : 'cadastrar-empresa',
        component : CadastrarEmpresaComponent
    },

    {
        path : 'consultar-empresa',
        component : ConsultarEmpresaComponent
    },

    {
        path : 'cadastrar-funcionario',
        component : CadastrarFuncionarioComponent
    },

    {
        path : 'consultar-funcionario',
        component : ConsultarFuncionarioComponent
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/cadastrar-empresa'
    }

];
