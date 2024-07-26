import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHelpComponent } from './login-help.component';

describe('LoginHelpPageComponent', () => {
  let component: LoginHelpComponent;
  let fixture: ComponentFixture<LoginHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHelpComponent],
    });
    fixture = TestBed.createComponent(LoginHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
