import { NgModule } from '@angular/core';
import { FlightsDestinationMapperService } from './shared/services/flights-destination-mapper.service';
import { FlightsDestinationService } from './shared/services/flights-destination.service';
import { SharedModule } from 'src/shared/shared.module';
import { FlightsDestinationContainer } from './flights-destination-container';
import { FlightsDestinationRoutingModule } from './flights-destination-routing.module';
import { AuthGuardService } from 'src/core/auth/auth-guard.service';
import { SearchFilterComponent } from './shared/components/search-filter/search-filter.component';

@NgModule({
  declarations: [FlightsDestinationContainer, SearchFilterComponent],
  imports: [SharedModule, FlightsDestinationRoutingModule],
  exports: [],
  providers: [FlightsDestinationMapperService, FlightsDestinationService, AuthGuardService],
})
export class FlightsDestinationModule { }