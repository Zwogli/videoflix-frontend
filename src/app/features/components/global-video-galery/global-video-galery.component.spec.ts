import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalVideoGaleryComponent } from './global-video-galery.component';

describe('GlobalVideoGaleryComponent', () => {
  let component: GlobalVideoGaleryComponent;
  let fixture: ComponentFixture<GlobalVideoGaleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalVideoGaleryComponent]
    });
    fixture = TestBed.createComponent(GlobalVideoGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
