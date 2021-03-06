import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { catchError, finalize, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ISearchParametersUi } from './shared/components/search-filter/search-filter.component';
import { IFlightDestination } from './shared/models/flights-destination';
import { IFlightsDestinationQueryParams, originCities, ViewBy } from './shared/models/server-params';
import { FlightsDestinationService } from './shared/services/flights-destination.service';

@Component({
  selector: 'app-flights-destination-container',
  templateUrl: './flights-destination-container.html'
})
export class FlightsDestinationContainer implements OnInit, OnDestroy {
  originFieldName: string = '';
  searchViewDef = {
    minDate: moment(),
    maxDate: moment().add(180, 'days'),
    viewByList: Object.values(ViewBy),
    originCities: originCities
  }
  flights: IFlightDestination[] = [];
  resultStatus: string = '';
  searchFlights$ = new Subject<IFlightsDestinationQueryParams>();
  showProgress$: Subject<boolean> = new Subject();
  destroy$ = new Subject<void>();
  constructor(private flightsService: FlightsDestinationService) { }

  ngOnInit(): void {
    this.searchFlights$.pipe(switchMap(
      (searchParameters) => {
        this.showProgress$.next(true)
        return this.getFlights(searchParameters).pipe(
          catchError(() => of([])),
          finalize(() => this.showProgress$.next(false)))
      }),
      takeUntil(this.destroy$)
    ).subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.flights = resp;
        this.resultStatus = `You have ${this.flights.length} results to fly`
      } else {
        this.resultStatus = 'No flights found for you';
        this.flights = [];
      }
    });
  }
  newSearch(searchParameters: ISearchParametersUi) {
    this.originFieldName = searchParameters.origin;
    this.searchFlights$.next(this.getRequestQueryParams(searchParameters));
  }

  getFlights(queryParameters: IFlightsDestinationQueryParams): Observable<IFlightDestination[]> {
    return this.flightsService.get(queryParameters);
  }

  getRequestQueryParams(searchParameters: ISearchParametersUi): IFlightsDestinationQueryParams {
    return {
      viewBy: searchParameters.viewBy,
      nonStop: searchParameters.nonStop,
      origin: searchParameters.origin,
      oneWay: searchParameters.oneWay,
      departureDate: this.getDepartureDateQueryParam(searchParameters.startDate, searchParameters.endDate),
      maxPrice: searchParameters.maxPrice
    }
  }

  getDepartureDateQueryParam(startDate: Moment, endDate: Moment): string {
    if (endDate) {
      return `${startDate.format('YYYY-MM-DD')},${endDate.format('YYYY-MM-DD')}`;
    }
    return `${startDate.format('YYYY-MM-DD')}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
