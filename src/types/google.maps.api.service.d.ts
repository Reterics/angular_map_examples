export interface GeoCoderResponse {
  status: string
  results: GeoCoderResult[]
}

export interface GeoCoderResult {
  address_components: AddressComponent[],
  formatted_address: string
  geometry:GeoCoderGeometry
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface GeoLatLng {
  lat: number,
  lng: number
}

export interface GeoCoderGeometry {
  bounds: any
  location: GeoLatLng
  location_type: string
  viewport: {northeast: GeoLatLng, southwest: GeoLatLng}
  place_id: string
  types: string[]
}
