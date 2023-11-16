import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorModalComponent } from './login-error-modal.component';

describe('LoginErrorModalComponent', () => {
  let component: LoginErrorModalComponent;
  let fixture: ComponentFixture<LoginErrorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginErrorModalComponent]
    });
    fixture = TestBed.createComponent(LoginErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
