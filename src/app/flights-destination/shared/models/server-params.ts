export enum ViewBy { DESTINATION = 'DESTINATION', DURATION = 'DURATION', WEEK = 'WEEK', COUNTRY = 'COUNTRY'
}
export const originCities: string[] = [
  'MAD',
  'LON'
]
export interface IFlightsDestinationQueryParams {
  origin: string;
  departureDate: string,
  oneWay: boolean,
  nonStop: boolean,
  viewBy: ViewBy,
  maxPrice: number
}