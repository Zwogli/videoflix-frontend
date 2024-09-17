import { TestBed } from '@angular/core/testing';

import { LocalThumbnailService } from './local-thumbnail.service';

describe('LocalThumbnailService', () => {
  let service: LocalThumbnailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalThumbnailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
