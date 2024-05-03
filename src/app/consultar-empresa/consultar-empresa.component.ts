import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-consultar-empresa',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-empresa.component.html',
  styleUrl: './consultar-empresa.component.css'
})
export class ConsultarEmpresaComponent implements OnInit {
  
  empresas: any[] = []; 

  constructor(
    private httpClient : HttpClient
  ){}

  formEdicao = new FormGroup({
    idEmpresa : new FormControl(''),
    nomeFantasia: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    razaoSocial: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    cnpj: new FormControl('', [
      Validators.required, Validators.maxLength(14)
    ]),
      });

  get fEdicao() {
    return this.formEdicao.controls;
    }

  ngOnInit(): void {
    this.httpClient.get<any>('http://localhost:5195/api/Empresa') 
    .subscribe({
      next : (data) =>{
        this.empresas = data.$values as any[]; 
      },
      error : (e) =>{
        console.log(e.error)
      }
    })
  }

  onDelete(id: any) : void {

    if(confirm('Deseja realmente excluir a empresa?')) {

    this.httpClient.delete('http://localhost:5195/api/Empresa/' + id)
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

onEdit(id: string) : void {

  this.httpClient.get('http://localhost:5195/api/Empresa/' + id)
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
  console.log(this.formEdicao.value)
  this.httpClient.put('http://localhost:5195/api/Empresa', this.formEdicao.value)
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
