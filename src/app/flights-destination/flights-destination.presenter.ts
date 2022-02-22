import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { ISearchParametersUi } from './flights-destination.component';
import { ViewBy } from './shared/models/server-params';

@Injectable()
export class FlightsDestinationPresenter {
  search$ = new Subject<ISearchParametersUi>();
  form: FormGroup = new FormGroup({
    origin: new FormControl('MAD', [Validators.required]),
    departureDate: new FormGroup({
      startDate: new FormControl(moment(), [Validators.required]),
      endDate: new FormControl(),
    }),
    maxPrice: new FormControl(2000, [Validators.min(0), Validators.pattern("^[0-9]*$")]),
    oneWay: new FormControl(false),
    viewBy: new FormControl(ViewBy.COUNTRY),
    nonStop: new FormControl(false)
  });

  updatedForm() {
    if (this.form.valid) {
      const searchParameters = {
        viewBy: this.form.controls['viewBy'].value,
        nonStop: this.form.controls['nonStop'].value,
        origin: this.form.controls['origin'].value,
        oneWay: this.form.controls['oneWay'].value,
        startDate: this.form.controls['departureDate'].get('startDate')!.value,
        endDate: this.form.controls['departureDate'].get('endDate')!.value,
        maxPrice: this.form.controls['maxPrice'].value
      }
      this.search$.next(searchParameters);
    }
  }
}