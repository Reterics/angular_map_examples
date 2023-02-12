import { Component } from '@angular/core';
import {
  tileLayer,
  latLng,
  MapOptions,
  Marker,
  icon,
  MarkerClusterGroupOptions,
  LeafletMouseEvent,
  CircleMarker, latLngBounds, Rectangle, bounds
} from 'leaflet';
import 'leaflet.markercluster';
import { markerClusterGroup, MarkerCluster, Map } from 'leaflet';
import {generateBoundingBox, generateGridPoints, radiusToGPSDifference} from "../../lib/coordinateModule";
import {PointMarker} from "./PointMarker";
import {CircleMetaMarker} from "./CircleMetaMarker";
import {RectangleMarker} from "./RectangleMarker";

const earthRadius = 6371; // Earth's radius in kilometers

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.less']
})
export class LeafletMapComponent {
  center: number[] = [47.497966, 19.040209];
  CACHE_ZOOM_LEVEL:number = 17;
  options: MapOptions = {
    doubleClickZoom: false,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'OpenStreetMap'
      }),
      markerClusterGroup()
    ],
    zoom: 12,
    center: latLng([this.center[0], this.center[1]])
  };

  layers: (PointMarker|CircleMetaMarker|RectangleMarker)[] = [];

  cellSize: number = Math.pow(2, 20 - this.CACHE_ZOOM_LEVEL) / earthRadius;
  latitude: number = 46.879966;
  longitude: number = 12.040209;
  radius: number = 10;
  selectedRectangleMarker: RectangleMarker = new RectangleMarker(latLngBounds([[46.879966, -121.726909], [46.879966, -121.726909]]), {
    color: 'red'
  }, 'main');/*new CircleMetaMarker(latLng(this.latitude, this.longitude), {
    radius: this.radius
  }, 'pointer');*/

  map: Map | undefined;
  onMapReady(map: Map) {
    this.map = map;
  }

  zoomEnd() {
    // const radiusInPixels = this.getRadiusInPixels(this.radius);
    const boundingBox = generateBoundingBox(this.latitude, this.longitude, this.radius);
    this.selectedRectangleMarker.setBounds([
      [boundingBox.minLatitude, boundingBox.minLongitude],
      [boundingBox.maxLatitude, boundingBox.maxLongitude],
    ])
    // this.selectedRectangleMarker.setRadius(radiusInPixels);
  }

  getRadiusInPixels(radiusInMeters: number) {
    if (this.map) {
      const metersPerPixel = 40075016.686 * Math.abs(Math.cos(this.map.getCenter().lat * Math.PI / 180)) / Math.pow(2, this.map.getZoom() + 8);
      return radiusInMeters / metersPerPixel;
    }
    return 0;
  }
  ngOnInit() {

    this.layers.push(this.selectedRectangleMarker);


    const gridPoints = generateGridPoints(this.center[0], this.center[1], 500, this.CACHE_ZOOM_LEVEL);
    console.error(gridPoints);
    gridPoints.map(gridPoints=>this.layers.push(new PointMarker(
      latLng(gridPoints.lat, gridPoints.lon), {}, 'grid')));
    console.error(this.layers);
  }

  activateIntersectingPoints() {
    //  Web Mercator projection
    const meters = 156543.03392 * Math.cos(this.latitude * Math.PI / 180) / Math.pow(2, this.CACHE_ZOOM_LEVEL);

    for (let i = this.layers.length - 1; i >= 0; i--){
      const layer = this.layers[i];
      if(layer instanceof RectangleMarker && layer.metadata === 'activated') {
        this.layers.splice(i, 1);
      }
    }
    const selectionBounds = this.selectedRectangleMarker.getBounds();
    for (let i = 0; i < this.layers.length; i++){
      const layer = this.layers[i];
      let otherLayer:PointMarker|undefined;
      if(this.layers[i-1] instanceof PointMarker) {
        otherLayer = this.layers[i-1] as PointMarker;
      } else if(this.layers[i] instanceof PointMarker) {
        otherLayer = this.layers[i] as PointMarker;
      }
      if(otherLayer && layer instanceof PointMarker ) {
        const latLng = layer.getLatLng();
        const diff = this.cellSize / 2;
        const bound = latLngBounds([
          [latLng.lat - diff, latLng.lng - diff],
          [latLng.lat + diff, latLng.lng + diff],
        ]);
        if(selectionBounds.intersects(bound)) {
          const activatedRectangle = new RectangleMarker(bound, {
            color: 'blue'
          }, 'activated');
          this.layers.push(activatedRectangle);
        }
      }
    }
  }
  markerClusterReady(markerCluster: MarkerCluster) {
    // Do stuff with group
  }

  selectCachePoints() {
    const gridPoints = generateGridPoints(this.latitude, this.longitude, this.radius);

  }

  updateMarkerByForm() {
    //this.selectedRectangleMarker.setLatLng(latLng(this.latitude, this.longitude));
    this.zoomEnd();
  }

  updateMarker(lat: number, lng: number) {

    //this.selectedRectangleMarker.setLatLng(latLng(lat, lng));
  }
  updateMarkerClick(event: LeafletMouseEvent) {
    //this.updateMarker(event.latlng.lat, event.latlng.lng);
    this.latitude = event.latlng.lat;
    this.longitude = event.latlng.lng;
    this.zoomEnd();

  }


}
