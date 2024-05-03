import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-consultar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-funcionario.component.html',
  styleUrl: './consultar-funcionario.component.css'
})
export class ConsultarFuncionarioComponent implements OnInit {

  funcionarios : any[] = [];

  constructor(
   private httpClient : HttpClient

  ){}

  formEdicao = new FormGroup({
    idEmpresa : new FormControl(''),
    nome : new FormControl('', [Validators.minLength(8), Validators.maxLength(100), Validators.required]),
    matricula : new FormControl('',[Validators.required, Validators.maxLength(6)]),
    cpf : new FormControl('',[Validators.required, Validators.maxLength(11)]),
    dataAdmissao : new FormControl('',[Validators.required])
  })

  get fEdicao(){
    return this.formEdicao.controls
  }

  
  ngOnInit(): void {
    this.httpClient.get<any>('http://localhost:5195/api/Funcionario') 
    .subscribe({
      next : (data) =>{
        console.log(data);
        this.funcionarios = data.$values as any[]; 
      },
      error : (e) =>{
        console.log(e.error)
      }
    })
  }

  
  onDelete(id: any): void {
    if (confirm('Deseja realmente excluir o funcionário?')) {
        this.httpClient.delete('http://localhost:5195/api/Funcionario/' + id)
            .subscribe({
                next: (data: any) => {
                    alert(data.message);
                    this.ngOnInit();
                },
                error: (e) => {
                    console.log(e.error);
                }
            });
    }
}

onEdit(id: string): void {
    this.httpClient.get('http://localhost:5195/api/Funcionario/' + id)
        .subscribe({
            next: (data: any) => {
              console.log(data)
                this.formEdicao.patchValue(data);
            },
            error: (e) => {
                console.log(e.error);
            }
        });
}

onEditSubmit(): void {
  this.httpClient.put('http://localhost:5195/api/Funcionario', this.formEdicao.value)
  .subscribe({
  next: (data: any) => {
  alert(data.message); 
  this.ngOnInit(); 
  },
  error: (e) => {
  console.log(e.error);
  }
  });
  }
}
