import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEmpresaComponent } from './consultar-empresa.component';

describe('ConsultarEmpresaComponent', () => {
  let component: ConsultarEmpresaComponent;
  let fixture: ComponentFixture<ConsultarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
