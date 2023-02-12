import {bounds, icon, LatLngExpression, Marker, MarkerOptions} from "leaflet";
const customIcon = icon({
  iconSize: [5, 5],
  iconAnchor: [5, 5],
  popupAnchor: [1, 1],
  iconUrl: 'assets/dot.png'
});


export class PointMarker extends Marker {
  metadata: any;

  constructor(latlng: LatLngExpression, options?: MarkerOptions, metadata?: any) {
    if(!options) {
      options = {};
    }
    if (!options.icon) {
      options.icon = customIcon;
    }
    super(latlng, options);
    this.metadata = metadata;
  }
}
