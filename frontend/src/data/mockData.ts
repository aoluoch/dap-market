import { Listing } from '@/types';

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: "listing-1",
    itemName: "Crystal Widget",
    price: 100,
    owner: "0x8fa23d...9b1c",
    imageUrl: "https://source.unsplash.com/400x300/?crystal",
    status: 'available'
  },
  {
    id: "listing-2",
    itemName: "Golden Widget",
    price: 250,
    owner: "0x2b93fe...11d4",
    imageUrl: "https://source.unsplash.com/400x300/?gold",
    status: 'available'
  },
  {
    id: "listing-3",
    itemName: "Emerald Widget",
    price: 180,
    owner: "0xa1d45f...4e7a",
    imageUrl: "https://source.unsplash.com/400x300/?emerald",
    status: 'available'
  },
  {
    id: "listing-4",
    itemName: "Obsidian Widget",
    price: 90,
    owner: "0x7cd9b2...2a8e",
    imageUrl: "https://source.unsplash.com/400x300/?obsidian",
    status: 'available'
  },
  {
    id: "listing-5",
    itemName: "Platinum Widget",
    price: 300,
    owner: "0x4fa812...9c32",
    imageUrl: "https://source.unsplash.com/400x300/?platinum",
    status: 'available'
  }
];

export const CURRENT_USER = "0x8fa23d...9b1c";