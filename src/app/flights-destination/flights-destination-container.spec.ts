import { CompatibleSpy, createComponentFactory, mockProvider, Spectator } from "@ngneat/spectator";
import { FlightsDestinationContainer } from "./flights-destination-container";
import { MockComponent } from 'ng-mocks';
import { MatProgressBar } from "@angular/material/progress-bar";
import { ISearchParametersUi, SearchFilterComponent } from "./shared/components/search-filter/search-filter.component";
import { MaterialModule } from "src/shared/material.module";
import { FlightsDestinationService } from "./shared/services/flights-destination.service";
import { Observable, of } from "rxjs";
import { IFlightDestination } from "./shared/models/flights-destination";
import * as moment from "moment";
import { IFlightsDestinationQueryParams, ViewBy } from "./shared/models/server-params";

describe('FlightsDestinationContainer', () => {
  let flightsDestinationServiceSpy: jasmine.Spy<((params: IFlightsDestinationQueryParams) => Observable<IFlightDestination[]>) & CompatibleSpy>;
  let spectator: Spectator<FlightsDestinationContainer>;
  const createComponent = createComponentFactory({
    component: FlightsDestinationContainer,
    declarations: [
      MockComponent(MatProgressBar),
      MockComponent(SearchFilterComponent)
    ],
    imports: [MaterialModule],
    providers: [
      mockProvider(FlightsDestinationService, {
        get: (): Observable<IFlightDestination[]> => of([
          <IFlightDestination>{
            origin: 'MAD',
            departureDate: moment('2022-02-24'),
            destination: 'LON',
            returnDate: moment('2022-02-24'),
            price: 220
          }
        ])
      })
    ]
  })
  beforeEach(() => {
    spectator = createComponent();
    const flightsDestinationService = spectator.inject(FlightsDestinationService);
    flightsDestinationServiceSpy = spyOn(flightsDestinationService, 'get').and.callThrough();
  })

  afterEach(() => {
    spectator.component.ngOnDestroy();
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  })

  it('should call get() from FlightsDestinationService  Spy', () => {
    spectator.component.newSearch(<ISearchParametersUi>{
      origin: 'MAD',
      startDate: moment('2022-02-24'),
      oneWay: false,
      nonStop: false,
      endDate: moment('2022-02-24'),
      maxPrice: 220,
      viewBy: ViewBy.COUNTRY
    });
    expect(flightsDestinationServiceSpy).toHaveBeenCalledWith({
      origin: 'MAD',
      oneWay: false,
      nonStop: false,
      departureDate: `${moment('2022-02-24').format('YYYY-MM-DD')},${moment('2022-02-24').format('YYYY-MM-DD')}`,
      maxPrice: 220,
      viewBy: ViewBy.COUNTRY
    });
    expect(spectator.component).toBeTruthy();
  })

  it('should getDepartureDateQueryParam return 2 dates separated by comma', () => {
    const rangeOfDates = spectator.component.getDepartureDateQueryParam(moment('2022-02-24'), moment('2022-02-28'));
    expect(rangeOfDates).toBe(`${moment('2022-02-24').format('YYYY-MM-DD')},${moment('2022-02-28').format('YYYY-MM-DD')}`);
  })
})