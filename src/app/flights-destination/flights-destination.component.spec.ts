import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDestinationComponent } from './flights-destination.component';
import { FlightsDestinationService } from './shared/services/flights-destination.service';

describe('FlightsDestinationComponent', () => {
  let component: FlightsDestinationComponent;
  let fixture: ComponentFixture<FlightsDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsDestinationComponent],
      providers: [FlightsDestinationService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
