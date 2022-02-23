import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { ViewBy } from './shared/models/server-params';
import { Moment } from 'moment';
import { IFlightDestination } from './shared/models/flights-destination';
import { FlightsDestinationPresenter } from './flights-destination.presenter';
export interface ISearchParametersUi {
  viewBy: ViewBy,
  nonStop: boolean,
  origin: string,
  oneWay: boolean,
  startDate: Moment,
  endDate: Moment,
  maxPrice: number
}
@Component({
  selector: 'app-flights-destination',
  templateUrl: './flights-destination.component.html',
  styleUrls: ['./flights-destination.component.scss'],
  providers: [FlightsDestinationPresenter]
})
export class FlightsDestinationComponent {
  @Output() onNewSearched = new EventEmitter<ISearchParametersUi>();
  @Input() resultStatus = '';
  @Input() flights: IFlightDestination[] = [];
  @Input() searchViewDef: {
    minDate: Moment,
    maxDate: Moment,
    viewByList: string[],
    originCities: string[]
  } = { minDate: moment(), maxDate: moment(), viewByList: [], originCities: [] };
  @Input() showProgress: boolean = false;
  constructor(private presenter: FlightsDestinationPresenter) { }
  ngOnInit(): void {
    this.presenter.search$.subscribe((formValues) => this.onNewSearched.emit(formValues));
    this.form.valueChanges.subscribe(() => this.presenter.updatedForm())
    this.form.updateValueAndValidity();
  }

  get form() {
    return this.presenter.form;
  }
}
