import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoginHelpComponent } from './card-login-help.component';

describe('CardLoginHelpComponent', () => {
  let component: CardLoginHelpComponent;
  let fixture: ComponentFixture<CardLoginHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardLoginHelpComponent]
    });
    fixture = TestBed.createComponent(CardLoginHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
