import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FlightsDestinationMapperService } from './flights-destination-mapper.service';

import { FlightsDestinationService } from './flights-destination.service';

describe('FlightsDestinationService', () => {
  let service: FlightsDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightsDestinationMapperService, FlightsDestinationService]
    });
    service = TestBed.inject(FlightsDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
