import {LatLngBoundsExpression, PolylineOptions, Rectangle} from "leaflet";


export class RectangleMarker extends Rectangle {
  metadata: any;
  constructor(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions, metadata?: any)
  {
    super(latLngBounds, options);
    this.metadata = metadata;
  }
}
