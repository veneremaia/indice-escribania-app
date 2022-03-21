import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceFormComponent } from './indice-form.component';

describe('IndiceFormComponent', () => {
  let component: IndiceFormComponent;
  let fixture: ComponentFixture<IndiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
