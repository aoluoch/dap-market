import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { mockDataStore, MockTransactionResult } from "./mockData";

// Configuration for mock mode
export const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true' || false;

// Types for service responses
export interface ServiceTransactionResult {
  effects: {
    created?: Array<{
      objectId: string;
      objectType?: string;
    }>;
  };
  digest?: string;
}

export interface WidgetInfo {
  id: string;
  owner: string;
  type: string;
}

export interface ListingInfo {
  listingId: string;
  askPrice: string;
  owner: string;
  widget: string;
}

// Blockchain service class
class BlockchainService {
  private suiClient: SuiClient;
  private currentUser: string = "";
  private packageId: string = "";
  private marketplaceId: string = "";

  constructor() {
    this.suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });
  }

  // Configuration methods
  setCurrentUser(address: string) {
    this.currentUser = address;
    if (MOCK_MODE) {
      mockDataStore.setCurrentUser(address);
    }
  }

  setPackageId(packageId: string) {
    this.packageId = packageId;
    if (MOCK_MODE) {
      mockDataStore.setPackageId(packageId);
    }
  }

  setMarketplaceId(marketplaceId: string) {
    this.marketplaceId = marketplaceId;
    if (MOCK_MODE) {
      mockDataStore.setMarketplaceId(marketplaceId);
    }
  }

  // Widget operations
  async mintWidget(signAndExecuteTransactionBlock: any): Promise<ServiceTransactionResult> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await mockDataStore.mintWidget();
    }

    // Real blockchain implementation
    const txb = new TransactionBlock();
    txb.moveCall({
      target: `${this.packageId}::widget::mint`,
    });

    const output = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return output;
  }

  async listWidget(
    widgetId: string, 
    price: string, 
    signAndExecuteTransactionBlock: any
  ): Promise<ServiceTransactionResult> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await mockDataStore.listWidget(widgetId, price);
    }

    // Real blockchain implementation
    const txb = new TransactionBlock();
    txb.moveCall({
      target: `${this.packageId}::marketplace::list`,
      typeArguments: [`${this.packageId}::widget::Widget`, "0x2::sui::SUI"],
      arguments: [txb.object(this.marketplaceId), txb.object(widgetId), txb.pure(price)],
    });

    const output = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return output;
  }

  async purchaseListing(
    listingId: string, 
    amountSent: string, 
    signAndExecuteTransactionBlock: any
  ): Promise<ServiceTransactionResult> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return await mockDataStore.purchaseListing(listingId, amountSent);
    }

    // Real blockchain implementation
    const txb = new TransactionBlock();
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(amountSent)]);

    txb.moveCall({
      target: `${this.packageId}::marketplace::buy_and_take`,
      typeArguments: [`${this.packageId}::widget::Widget`, "0x2::sui::SUI"],
      arguments: [txb.object(this.marketplaceId), txb.pure(listingId), coin],
    });

    const output = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return output;
  }

  async takeProfits(signAndExecuteTransactionBlock: any): Promise<ServiceTransactionResult> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await mockDataStore.takeProfits();
    }

    // Real blockchain implementation
    const txb = new TransactionBlock();
    txb.moveCall({
      target: `${this.packageId}::marketplace::take_profits_and_keep`,
      typeArguments: ["0x2::sui::SUI"],
      arguments: [txb.object(this.marketplaceId)],
    });

    const output = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return output;
  }

  // Data retrieval methods
  async getOwnedWidgets(): Promise<string[]> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const widgets = mockDataStore.getOwnedWidgets();
      return widgets.map(w => w.id);
    }

    // Real blockchain implementation
    const objects = await this.suiClient.getOwnedObjects({ owner: this.currentUser });
    const widgets = [];

    for (let i = 0; i < objects.data.length; i++) {
      const currentObjectId = objects.data[i].data?.objectId;
      if (!currentObjectId) continue;

      const objectInfo = await this.suiClient.getObject({
        id: currentObjectId,
        options: { showContent: true },
      });

      if (objectInfo.data?.content?.type === `${this.packageId}::widget::Widget`) {
        const widgetObjectId = (objectInfo.data.content as any).fields.id.id;
        widgets.push(widgetObjectId);
      }
    }

    return widgets;
  }

  async getListingInformation(): Promise<string[][]> {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      const listings = mockDataStore.getAllListings();
      
      return listings.map(listing => [
        `listingId: ${listing.listingId}`,
        `askPrice: ${listing.askPrice}`,
        `owner: ${listing.owner}`,
        `widget: ${listing.widgetId}`
      ]);
    }

    // Real blockchain implementation
    const marketplaceObject = await this.suiClient.getObject({
      id: this.marketplaceId,
      options: { showContent: true },
    });

    const marketplaceItemsId = (marketplaceObject.data?.content as any)?.fields.items.fields.id.id;
    const marketplaceItems = await this.suiClient.getDynamicFields({ parentId: marketplaceItemsId });

    const listingIds = marketplaceItems.data.map(item => item.objectId);
    const output = [];

    for (let i = 0; i < listingIds.length; i++) {
      const currentListing = [];
      const listingObject = await this.suiClient.getObject({
        id: listingIds[i],
        options: { showContent: true },
      });

      const fields = (listingObject.data?.content as any)?.fields;
      currentListing.push(`listingId: ${listingIds[i]}`);
      currentListing.push(`askPrice: ${fields.value.fields.ask}`);
      currentListing.push(`owner: ${fields.value.fields.owner}`);
      currentListing.push(`widget: ${fields.name}`);
      output.push(currentListing);
    }

    return output;
  }
}

// Export singleton instance
export const blockchainService = new BlockchainService();
