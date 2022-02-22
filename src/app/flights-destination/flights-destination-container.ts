import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { catchError, Observable, of, Subject, switchMap } from 'rxjs';
import { ISearchParametersUi } from './flights-destination.component';
import { IFlightDestination } from './shared/models/flights-destination';
import { IFlightsDestinationQueryParams, originCities, ViewBy } from './shared/models/server-params';
import { FlightsDestinationService } from './shared/services/flights-destination.service';

@Component({
  selector: 'app-flights-destination-container',
  template: `<app-flights-destination 
  [flights]="flights" 
  [searchViewDef]="searchViewDef" 
  (onNewSearched)="newSearch($event)"
  [resultStatus]="resultStatus"
  ></app-flights-destination>`
})
export class FlightsDestinationContainer implements OnInit {

  searchViewDef = {
    minDate: moment(),
    maxDate: moment().add(180, 'days'),
    viewByList: Object.values(ViewBy),
    originCities: originCities
  }
  flights: IFlightDestination[] = [];
  resultStatus: string = '';
  searchFlights$ = new Subject<IFlightsDestinationQueryParams>();
  constructor(private flightsService: FlightsDestinationService) {

  }

  ngOnInit(): void {
    this.searchFlights$.pipe(switchMap(
      (searchParameters) => this.getFlights(searchParameters).pipe(catchError(() => of([]))))
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
      departureDate: this.getRangeOfDates(searchParameters.startDate, searchParameters.endDate),
      maxPrice: searchParameters.maxPrice
    }
  }

  getRangeOfDates(startDate: Moment, endDate: Moment): string {
    if (endDate) {
      return `${startDate.format('YYYY-MM-DD')},${endDate.format('YYYY-MM-DD')}`;
    }
    return `${startDate.format('YYYY-MM-DD')}`;
  }
}
