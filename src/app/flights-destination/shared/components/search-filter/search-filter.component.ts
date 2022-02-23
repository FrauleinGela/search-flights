import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { ViewBy } from '../../models/server-params';
import { SearchFilterPresenter } from './search-filter.presenter';
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
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  providers: [SearchFilterPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFilterComponent implements OnDestroy {
  @Output() onNewSearched = new EventEmitter<ISearchParametersUi>();
  @Input() searchViewDef: {
    minDate: Moment,
    maxDate: Moment,
    viewByList: string[],
    originCities: string[]
  } = { minDate: moment(), maxDate: moment(), viewByList: [], originCities: [] };
  destroy$: Subject<void> = new Subject();
  constructor(private presenter: SearchFilterPresenter) { }
  ngOnInit(): void {
    this.presenter.search$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((formValues) => this.onNewSearched.emit(formValues));
    this.form.valueChanges.subscribe(() => this.presenter.updatedForm());
  }

  get form() {
    return this.presenter.form;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
