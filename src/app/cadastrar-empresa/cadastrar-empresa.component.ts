import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-empresa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-empresa.component.html',
  styleUrl: './cadastrar-empresa.component.css'
})
export class CadastrarEmpresaComponent {



    //método construtor
    constructor(
      private httpClient: HttpClient
    ) { }

    //criando o formulário
   //criando o formulário
   form = new FormGroup({ 
    nomeFantasia: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    razaoSocial: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    cnpj: new FormControl('', [
      Validators.required, Validators.maxLength(14)
    ]),

  })

  mensagemSucesso: string = '';
  
  get f() { 
    return this.form.controls;
  }

  onSubmit(): void {
    this.httpClient.post('http://localhost:5195/api/Empresa', this.form.value)
        .subscribe({
            next: (data: any) => {
                console.log('Empresa cadastrada com sucesso:', data);
                this.mensagemSucesso = data.message;
                this.form.reset();
            },
            error: (error) => {
                console.error('Erro ao cadastrar empresa:', error);
            }
        });
    }
    
}
