import { Moment } from "moment";

export interface IFlightDestination {
  origin: string;
  destination: string;
  departureDate: Moment;
  returnDate: Moment;
  price: number;
}