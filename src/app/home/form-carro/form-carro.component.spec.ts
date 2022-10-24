import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarroComponent } from './form-carro.component';

describe('FormCarroComponent', () => {
  let component: FormCarroComponent;
  let fixture: ComponentFixture<FormCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
