import {circle, latLng} from 'leaflet';

export function radiusToGPSDifference(radius: number) {
  return radius / ( 0.00001 / 1.11 );
}

export function generateBoundingBoxMath(latitude: number, longitude: number, radius: number) {
  const earthRadius = 6371; // Earth's radius in kilometers
  const diameter = radius * 2; // Example diameter in meters
  ///const latitude = 47.4979; // Example latitude
  ///const longitude = 19.0402; // Example longitude

  const latitudeDelta = (diameter / 1000) / earthRadius;
  const longitudeDelta = (diameter / 1000) / (earthRadius * Math.cos(latitude * (Math.PI / 180)));

  const minLatitude = latitude - latitudeDelta;
  const maxLatitude = latitude + latitudeDelta;
  const minLongitude = longitude - longitudeDelta;
  const maxLongitude = longitude + longitudeDelta;

  return {
    minLatitude,
    maxLatitude,
    minLongitude,
    maxLongitude,
  };
}

export function generateBoundingBox(lat:number, lng:number, r:number) {
  const radius = r / 1000;
  const RADIUS_OF_EARTH_KM = 6371;
  // const latRadians = lat * (Math.PI / 180);
  // const lngRadians = lng * (Math.PI / 180);
  const degreesPerKm = 360 / (2 * Math.PI * RADIUS_OF_EARTH_KM);

  const latMin = lat - radius * degreesPerKm;
  const latMax = lat + radius * degreesPerKm;
  const lngDelta = Math.asin(radius / RADIUS_OF_EARTH_KM) / (Math.PI / 180);

  const lngMin = lng - lngDelta;
  const lngMax = lng + lngDelta;

  return {
    minLatitude: latMin,
    maxLatitude: latMax,
    minLongitude: lngMin,
    maxLongitude: lngMax,
  };
}

export interface GridPoint {
  lat: number
  lon: number
}

export function generateGridPoints (latitude: number, longitude:number, radius: number, zoomLevel: number = 17): GridPoint[] {
  const earthRadius = 6371; // Earth's radius in kilometers
  const boundingBox = generateBoundingBox(latitude, longitude, radius);

  const cellSize = Math.pow(2, 20 - zoomLevel) / earthRadius;

  const grid:GridPoint[] = [];
  for (let lat = boundingBox.minLatitude; lat < boundingBox.maxLatitude; lat += cellSize) {
    for (let lon = boundingBox.minLongitude; lon < boundingBox.maxLongitude; lon += cellSize) {
      grid.push({ lat, lon });
    }
  }
  return grid;
}

