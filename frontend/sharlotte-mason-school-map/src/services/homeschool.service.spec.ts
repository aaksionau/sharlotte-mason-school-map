import { TestBed } from '@angular/core/testing';

import { HomeschoolService } from './homeschool.service';

describe('HomeschoolService', () => {
  let service: HomeschoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeschoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
