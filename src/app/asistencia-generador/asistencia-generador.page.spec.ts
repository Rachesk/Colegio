import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaGeneradorPage } from './asistencia-generador.page';

describe('AsistenciaGeneradorPage', () => {
  let component: AsistenciaGeneradorPage;
  let fixture: ComponentFixture<AsistenciaGeneradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaGeneradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
