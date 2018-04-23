import { TestBed, inject } from '@angular/core/testing';

import { MapJsonService } from './map-json.service';

describe('MapJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapJsonService]
    });
  });

  it('should be created', inject([MapJsonService], (service: MapJsonService) => {
    expect(service).toBeTruthy();
  }));
});
