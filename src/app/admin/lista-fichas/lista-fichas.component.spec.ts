import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFichasComponent } from './lista-fichas.component';

describe('ListaFichasComponent', () => {
  let component: ListaFichasComponent;
  let fixture: ComponentFixture<ListaFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFichasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
