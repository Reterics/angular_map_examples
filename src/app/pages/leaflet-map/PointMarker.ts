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

  public forceUpdate() {
    const map = this._map;

    this.remove();
    this.addTo(map);
  }
  isVisible: boolean = true;
  _tempMap = this._map;
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
