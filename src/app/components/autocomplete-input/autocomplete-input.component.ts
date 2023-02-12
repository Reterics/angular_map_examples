import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {mergeMap, Observable, of, Subscription} from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {GoogleMapsAPIService} from "../../services/google-api/google.maps.api.service";


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.less']
})
export class AutocompleteInputComponent {
  public suggestions:string[] = [];
  public searchControl: FormControl = new FormControl();


  constructor(private http: HttpClient, private googleAPI: GoogleMapsAPIService) {
  }

  ngOnInit() {
  }

  private async filterSuggestions(value: string): Promise<string[]> {
    if (!value) {
      return [] as string[];
    }

    return await this.googleAPI.geoCodeAddress(value)
      .then(data => data.map((result: { formatted_address: string; }) => result.formatted_address))
      .then(formattedTexts => {
        formattedTexts.forEach(text=>this.suggestions.push(text));
        return formattedTexts;
      });
  }

  searchTermChanged() {
    const value = this.searchControl.value as string;
    void this.filterSuggestions(value);
  }
}
