// Mock data types
export interface MockWidget {
  id: string;
  owner: string;
  type: string;
}

export interface MockListing {
  listingId: string;
  askPrice: string;
  owner: string;
  widget: string;
  widgetId: string;
}

export interface MockMarketplace {
  id: string;
  items: MockListing[];
  payments: Record<string, number>;
}

export interface MockTransactionResult {
  effects: {
    created: Array<{
      objectId: string;
      objectType: string;
    }>;
  };
  digest: string;
}

// Mock data store
class MockDataStore {
  private widgets: MockWidget[] = [];
  private listings: MockListing[] = [];
  private marketplace: MockMarketplace;
  private currentUser: string = "";
  private packageId: string = "";
  private marketplaceId: string = "";

  constructor() {
    this.marketplace = {
      id: "0x123marketplace456",
      items: [],
      payments: {}
    };
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample widgets
    this.widgets = [
      {
        id: "0xwidget001",
        owner: "0xuser123",
        type: "widget::Widget"
      },
      {
        id: "0xwidget002", 
        owner: "0xuser456",
        type: "widget::Widget"
      },
      {
        id: "0xwidget003",
        owner: "0xuser123",
        type: "widget::Widget"
      }
    ];

    // Sample listings
    this.listings = [
      {
        listingId: "0xlisting001",
        askPrice: "1000000000", // 1 SUI in MIST
        owner: "0xuser456",
        widget: "0xwidget002",
        widgetId: "0xwidget002"
      },
      {
        listingId: "0xlisting002", 
        askPrice: "2500000000", // 2.5 SUI in MIST
        owner: "0xuser789",
        widget: "0xwidget004",
        widgetId: "0xwidget004"
      }
    ];

    this.marketplace.items = [...this.listings];
  }

  // Setters for configuration
  setCurrentUser(address: string) {
    this.currentUser = address;
  }

  setPackageId(packageId: string) {
    this.packageId = packageId;
  }

  setMarketplaceId(marketplaceId: string) {
    this.marketplaceId = marketplaceId;
  }

  // Mock blockchain operations
  async mintWidget(): Promise<MockTransactionResult> {
    const newWidgetId = `0xwidget${Date.now()}`;
    const newWidget: MockWidget = {
      id: newWidgetId,
      owner: this.currentUser,
      type: "widget::Widget"
    };
    
    this.widgets.push(newWidget);
    
    return {
      effects: {
        created: [{
          objectId: newWidgetId,
          objectType: "widget::Widget"
        }]
      },
      digest: `0xdigest${Date.now()}`
    };
  }

  async listWidget(widgetId: string, price: string): Promise<MockTransactionResult> {
    const widget = this.widgets.find(w => w.id === widgetId && w.owner === this.currentUser);
    if (!widget) {
      throw new Error("Widget not found or not owned by current user");
    }

    const newListingId = `0xlisting${Date.now()}`;
    const newListing: MockListing = {
      listingId: newListingId,
      askPrice: price,
      owner: this.currentUser,
      widget: widgetId,
      widgetId: widgetId
    };

    this.listings.push(newListing);
    this.marketplace.items.push(newListing);

    // Remove widget from user's owned widgets (it's now listed)
    this.widgets = this.widgets.filter(w => w.id !== widgetId);

    return {
      effects: {
        created: [{
          objectId: newListingId,
          objectType: "marketplace::Listing"
        }]
      },
      digest: `0xdigest${Date.now()}`
    };
  }

  async purchaseListing(listingId: string, amountSent: string): Promise<MockTransactionResult> {
    const listingIndex = this.listings.findIndex(l => l.listingId === listingId);
    if (listingIndex === -1) {
      throw new Error("Listing not found");
    }

    const listing = this.listings[listingIndex];
    if (listing.askPrice !== amountSent) {
      throw new Error("Amount sent does not match ask price");
    }

    // Transfer widget to current user
    const newWidget: MockWidget = {
      id: listing.widgetId,
      owner: this.currentUser,
      type: "widget::Widget"
    };
    this.widgets.push(newWidget);

    // Add payment to seller's balance
    if (!this.marketplace.payments[listing.owner]) {
      this.marketplace.payments[listing.owner] = 0;
    }
    this.marketplace.payments[listing.owner] += parseInt(amountSent);

    // Remove listing
    this.listings.splice(listingIndex, 1);
    this.marketplace.items = this.marketplace.items.filter(item => item.listingId !== listingId);

    return {
      effects: {
        created: [{
          objectId: listing.widgetId,
          objectType: "widget::Widget"
        }]
      },
      digest: `0xdigest${Date.now()}`
    };
  }

  async takeProfits(): Promise<MockTransactionResult> {
    const profits = this.marketplace.payments[this.currentUser] || 0;
    if (profits === 0) {
      throw new Error("No profits to take");
    }

    delete this.marketplace.payments[this.currentUser];

    return {
      effects: {
        created: [{
          objectId: `0xcoin${Date.now()}`,
          objectType: "0x2::coin::Coin<0x2::sui::SUI>"
        }]
      },
      digest: `0xdigest${Date.now()}`
    };
  }

  // Data getters
  getOwnedWidgets(): MockWidget[] {
    return this.widgets.filter(w => w.owner === this.currentUser);
  }

  getAllListings(): MockListing[] {
    return [...this.listings];
  }

  getMarketplaceInfo() {
    return {
      id: this.marketplaceId,
      totalListings: this.listings.length,
      totalWidgets: this.widgets.length
    };
  }

  getUserProfits(): number {
    return this.marketplace.payments[this.currentUser] || 0;
  }
}

// Export singleton instance
export const mockDataStore = new MockDataStore();
