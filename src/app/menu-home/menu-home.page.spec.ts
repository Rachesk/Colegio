import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuHomePage } from './menu-home.page';

describe('MenuHomePage', () => {
  let component: MenuHomePage;
  let fixture: ComponentFixture<MenuHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
