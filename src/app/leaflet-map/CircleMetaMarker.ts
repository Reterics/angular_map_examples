import {CircleMarker, CircleMarkerOptions, LatLngExpression, MarkerOptions} from "leaflet";


export class CircleMetaMarker extends CircleMarker {
  metadata: any;

  constructor(latlng: LatLngExpression, options?: CircleMarkerOptions, metadata?: any) {
    super(latlng, options);
    this.metadata = metadata;
  }
}
