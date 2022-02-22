import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'flights-destination',
    loadChildren: () => import('./flights-destination/flights-destination.module').then((module) => module.FlightsDestinationModule)
  },
  {
  path: '**',
  redirectTo: 'flights-destination'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
