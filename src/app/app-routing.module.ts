import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeafletMapComponent} from "./leaflet-map/leaflet-map.component";

const routes: Routes = [
  { path: 'map', component: LeafletMapComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
