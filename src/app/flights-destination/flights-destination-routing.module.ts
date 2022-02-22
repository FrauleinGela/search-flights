import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/core/auth/auth-guard.service';
import { FlightsDestinationContainer } from './flights-destination-container';

const routes: Routes = [
  {
    path: 'flights-destination',
    canActivate: [AuthGuardService],
    component: FlightsDestinationContainer
  },
  {
    path: '**',
    redirectTo: 'flights-destination'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsDestinationRoutingModule { }
