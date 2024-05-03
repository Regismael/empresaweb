import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.css'
})
export class CadastrarFuncionarioComponent implements OnInit {

  constructor(
    private httpClient : HttpClient
  ){}

  form = new FormGroup({
    idEmpresa: new FormControl('',[
      Validators.required
    ]),
    nome: new FormControl('',[
      Validators.required, Validators.maxLength(100), Validators.minLength(8)
    ]),
    matricula: new FormControl('',[
      Validators.required, Validators.maxLength(6)
    ]),
    cpf: new FormControl('',[
      Validators.required, Validators.maxLength(11)
    ]),
    dataAdmissao: new FormControl('', [
      Validators.required
    ])

  });

  

  empresas: any[] = []; 

  mensagemSucesso : string = '';

  get f(){
    return this.form.controls;
  }

  carregarEmpresas(): void {
    this.httpClient.get<any>('http://localhost:5195/api/Empresa')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.empresas = data.$values as any[];
        },
        error: (error) => {
          console.error('Erro ao carregar empresas:', error);
        }
      }); 
  }

  ngOnInit(): void {
    this.httpClient.get<any>('http://localhost:5195/api/Empresa') 
    .subscribe({
      next : (data) =>{
        console.log(data  )
        this.empresas = data.$values as any[]; 
      },
      error : (e) =>{
        console.log(e.error)
      }
    })
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.httpClient.post('http://localhost:5195/api/Funcionario', this.form.value)
        .subscribe({
            next: (data: any) => {              
                this.mensagemSucesso = data.message;
                this.form.reset();
            },
            error: (error) => {
                console.error('Erro ao cadastrar funcionário:', error);
            }
        });
    }

  }

