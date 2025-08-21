import { useState } from 'react';
import { AppState, Listing, Widget } from '@/types';
import { INITIAL_LISTINGS, CURRENT_USER } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    listings: INITIAL_LISTINGS,
    myListings: [],
    widgets: [],
    profits: 0,
  });

  const buyListing = (listingId: string) => {
    const listing = state.listings.find(l => l.id === listingId);
    if (!listing) return;

    if (listing.owner === CURRENT_USER) {
      toast({
        title: "Cannot buy your own listing",
        description: "You cannot purchase items you've listed yourself.",
        variant: "destructive",
      });
      return;
    }

    const updatedListing = { ...listing, owner: CURRENT_USER, status: 'sold' as const };
    
    setState(prev => ({
      ...prev,
      listings: prev.listings.filter(l => l.id !== listingId),
      myListings: [...prev.myListings, updatedListing],
      profits: prev.profits + listing.price,
    }));

    toast({
      title: "Purchase successful!",
      description: `You bought ${listing.itemName} for ${listing.price} coins.`,
    });
  };

  const delistItem = (listingId: string) => {
    setState(prev => ({
      ...prev,
      myListings: prev.myListings.filter(l => l.id !== listingId),
    }));

    toast({
      title: "Item delisted",
      description: "Your item has been removed from the marketplace.",
    });
  };

  const mintWidget = () => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
    };

    setState(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget],
    }));

    toast({
      title: "Widget minted!",
      description: `New widget created: ${newWidget.id}`,
    });
  };

  const withdrawProfits = () => {
    const currentProfits = state.profits;
    
    setState(prev => ({
      ...prev,
      profits: 0,
    }));

    toast({
      title: "Profits withdrawn",
      description: `${currentProfits} coins withdrawn successfully.`,
    });
  };

  return {
    state,
    buyListing,
    delistItem,
    mintWidget,
    withdrawProfits,
  };
};