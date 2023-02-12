import config from "../../../config";
import {Injectable} from "@angular/core";
import { GeoCoderResponse, GeoCoderResult } from "src/types/google.maps.api.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsAPIService{
  private geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private apiKey = config.GOOGLE_API_KEY;

  async geoCodeAddress(address: string): Promise<GeoCoderResult[]> {
    const url = `${this.geoCodeUrl}${address}&key=${this.apiKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const geoCoderResponse: GeoCoderResponse = data;
        if (geoCoderResponse) {
          return data.results as GeoCoderResult[];

        } else {
          return [] as GeoCoderResult[];
        }
      });
  }
}
