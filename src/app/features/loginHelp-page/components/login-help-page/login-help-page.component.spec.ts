import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHelpPageComponent } from './login-help-page.component';

describe('LoginHelpPageComponent', () => {
  let component: LoginHelpPageComponent;
  let fixture: ComponentFixture<LoginHelpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHelpPageComponent]
    });
    fixture = TestBed.createComponent(LoginHelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
