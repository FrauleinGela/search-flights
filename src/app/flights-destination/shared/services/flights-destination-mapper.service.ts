import { Injectable } from '@angular/core';
import { IFlightDestination } from '../models/flights-destination';

@Injectable()
export class FlightsDestinationMapperService {
  map(resp: any): IFlightDestination[]{
    return resp.data.map((flight: any)=> {
      return {
        origin: flight.origin,
        destination: flight.destination,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,
        price:  flight.price.total
      }
    })
  }
}