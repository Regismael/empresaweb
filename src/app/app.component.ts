
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu-empresa/menu.component';
import { ConsultarEmpresaComponent } from './consultar-empresa/consultar-empresa.component';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { ConsultarFuncionarioComponent } from './consultar-funcionario/consultar-funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent, 
    ConsultarEmpresaComponent,
    CadastrarEmpresaComponent,
    CadastrarFuncionarioComponent,
    ConsultarFuncionarioComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'empresaweb';
  
}
