import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeafletMapComponent} from "./pages/leaflet-map/leaflet-map.component";
import {HomeComponentComponent} from "./pages/home-component/home-component.component";

const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'map', component: LeafletMapComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
