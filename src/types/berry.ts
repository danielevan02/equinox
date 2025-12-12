export interface Berry {
  id?: number;
  name: string;
  url: string;
}

export interface BerryApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Berry[];
}

export interface BerryFlavor {
  flavor: {
    name: string;
    url: string;
  };
  potency: number;
}

export interface BerryDetail {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: {
    name: string;
    url: string;
  } | null;
  flavors: BerryFlavor[];
  item: {
    name: string;
    url: string;
  };
  natural_gift_type: {
    name: string;
    url: string;
  } | null;
}