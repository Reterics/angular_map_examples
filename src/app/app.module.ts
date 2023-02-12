import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletMapComponent } from './pages/leaflet-map/leaflet-map.component';
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HttpClientModule} from "@angular/common/http";
import {IndexedDBModule} from "./services/indexed-db/indexed.db.module";
import {GoogleMapsAPIModule} from "./services/google-api/google.maps.api.module";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { HomeComponentComponent } from './pages/home-component/home-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    AutocompleteInputComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    IndexedDBModule,
    GoogleMapsAPIModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
