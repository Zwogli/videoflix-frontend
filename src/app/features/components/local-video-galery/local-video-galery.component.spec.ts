import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVideoGaleryComponent } from './local-video-galery.component';

describe('LocalVideoGaleryComponent', () => {
  let component: LocalVideoGaleryComponent;
  let fixture: ComponentFixture<LocalVideoGaleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalVideoGaleryComponent]
    });
    fixture = TestBed.createComponent(LocalVideoGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
