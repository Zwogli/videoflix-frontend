import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideoCardComponent } from './upload-video-card.component';

describe('UploadVideoCardComponent', () => {
  let component: UploadVideoCardComponent;
  let fixture: ComponentFixture<UploadVideoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadVideoCardComponent]
    });
    fixture = TestBed.createComponent(UploadVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
