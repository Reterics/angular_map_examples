import config from "../../../../config";
import {Injectable, NgModule} from "@angular/core";
import {CachedGeoCoder, GeoCoderResponse, GeoCoderResult} from "src/types/google.maps.api.service";
import {IndexedDBService} from "../indexed-db/client.indexed.db.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsAPIService {
  private geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private apiKey = config.GOOGLE_API_KEY;
  geoCoderCache: IndexedDBService;

  constructor(private idb: IndexedDBService) {
    this.geoCoderCache = idb.initDB('db', 'googleGeoCoder');
  }

  async geoCodeAddress(address: string): Promise<GeoCoderResult[]> {
    const url = `${this.geoCodeUrl}${address}&key=${this.apiKey}`;

    const cachedData = await this.geoCoderCache.getData(address) as GeoCoderResponse;
    if (cachedData) {
      console.log('Loaded from Cache');
      return cachedData.results;
    }
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        const geoCoderResponse: GeoCoderResponse = data;
        if (geoCoderResponse) {
          const cache = geoCoderResponse as CachedGeoCoder;
          cache.id = address;
          cache.time = new Date().getTime();
          this.geoCoderCache.addData(cache);
          return data.results as GeoCoderResult[];
        } else {
          return [] as GeoCoderResult[];
        }
      });
  }
}
