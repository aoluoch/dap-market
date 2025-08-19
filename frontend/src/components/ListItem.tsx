import React from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { toast } from "react-toastify";
import { blockchainService } from "../services/blockchainService";

interface ListItemProps {
  widgetToList: string;
  price: string;
  packageId: string;
  marketplaceId: string;
  afterListing: () => Promise<void>;
}

function ListItem({ widgetToList, price, packageId, marketplaceId, afterListing }: ListItemProps) {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const listItem = async () => {
    try {
      // Set up blockchain service configuration
      blockchainService.setPackageId(packageId);
      blockchainService.setMarketplaceId(marketplaceId);

      const output = await blockchainService.listWidget(widgetToList, price, signAndExecuteTransactionBlock);

      // iterate through to get ID of listing
      const createdObjects = output.effects.created;
      console.log("createdObjects:", createdObjects);

      if (afterListing) {
        await afterListing();
      }

      toast.success(`Listing created!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      alert("Failed to list item");
      console.log(e);
    }
  };

  return (
    <div>
      <button className="button" onClick={listItem}>
        list item
      </button>
    </div>
  );
}

export default ListItem;
