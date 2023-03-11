import { TestBed } from '@angular/core/testing';

import { LicitacionService } from './licitacion.service';

describe('LicitacionService', () => {
  let service: LicitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
