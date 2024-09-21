import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarQrPage } from './registrar-qr.page';

describe('RegistrarQrPage', () => {
  let component: RegistrarQrPage;
  let fixture: ComponentFixture<RegistrarQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
