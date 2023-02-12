import {LatLngBoundsExpression, PolylineOptions, Rectangle} from "leaflet";


export class RectangleMarker extends Rectangle {
  metadata: any;
  constructor(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions, metadata?: any)
  {
    super(latLngBounds, options);
    this.metadata = metadata;
  }

  public forceUpdate() {
    const map = this._map;

    this.remove();
    this.addTo(map);
  }

  isVisible: boolean = true;
  _tempMap:any;
  public getVisibility() {
    return this.isVisible;
  }
  public show() {
    if(!this.isVisible) {
      this.addTo(!this._map ? this._tempMap : this._map);
    }
    this.isVisible = true;
  }
  public hide() {
    if (this.isVisible) {
      this._tempMap = this._map;
      this.remove();
    }
    this.isVisible = false;
  }
}
