import { TestBed } from '@angular/core/testing';

import { ExperimenterService } from './experimenter.service';

describe('ExperimenterService', () => {
  let service: ExperimenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperimenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
