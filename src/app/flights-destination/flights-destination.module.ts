import { NgModule } from '@angular/core';
import { FlightsDestinationMapperService } from './shared/services/flights-destination-mapper.service';
import { FlightsDestinationService } from './shared/services/flights-destination.service';
import { FlightsDestinationComponent } from './flights-destination.component';
import { SharedModule } from 'src/shared/shared.module';
import { FlightsDestinationContainer } from './flights-destination-container';
import { FlightsDestinationRoutingModule } from './flights-destination-routing.module';
import { AuthGuardService } from 'src/core/auth/auth-guard.service';

@NgModule({
  declarations: [FlightsDestinationComponent, FlightsDestinationContainer],
  imports: [SharedModule, FlightsDestinationRoutingModule],
  exports: [],
  providers: [FlightsDestinationMapperService, FlightsDestinationService, AuthGuardService],
})
export class FlightsDestinationModule { }