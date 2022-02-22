import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFlightDestination } from '../models/flights-destination';
import { IFlightsDestinationQueryParams } from '../models/server-params';
import { FlightsDestinationMapperService } from './flights-destination-mapper.service';
export interface IFlightsDestinationParams {
  origin: string;
  departureDate: string,
  oneWay: boolean,
  nonStop: boolean,
  maxPrice: number
}
@Injectable()
export class FlightsDestinationService {
  private apiUrl: string;
  constructor(private http: HttpClient, private mapper: FlightsDestinationMapperService) {
    this.apiUrl = 'https://test.api.amadeus.com/v1/shopping/flight-destinations';
  }
  get(params: IFlightsDestinationQueryParams): Observable<IFlightDestination[]> {
    return this.http.get(this.apiUrl, { params: this.setHttpParams(params) }).pipe(
      map((resp) => this.mapper.map(resp))
    )
  }

  // TODO: Move method to a shared utils service
  setHttpParams(parameters: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(parameters).forEach((key) => {
      httpParams = httpParams.set(key, parameters[key]);
    });
    return httpParams;
  }
}
