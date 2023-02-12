import {PointMarker} from "../app/pages/leaflet-map/PointMarker";
import {RectangleMarker} from "../app/pages/leaflet-map/RectangleMarker";

export interface LocalLayer {
  id?: number
  name: string
  marker: (PointMarker|RectangleMarker)
}
