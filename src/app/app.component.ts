import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'map_project';
  navigationItems = [
    { label: 'Home', route: '/home' },
    { label: 'Leaflet Map', route: '/map' }
  ];
}
