export interface Widget {
  id: string;
}

export interface Listing {
  id: string;
  itemName: string;
  price: number;
  owner: string;
  imageUrl: string;
  status?: 'available' | 'sold';
}

export interface AppState {
  listings: Listing[];
  myListings: Listing[];
  widgets: Widget[];
  profits: number;
}