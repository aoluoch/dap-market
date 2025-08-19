import { useWalletKit } from "@mysten/wallet-kit";
import { toast } from "react-toastify";
import { blockchainService } from "../services/blockchainService";

interface PurchaseListingProps {
  itemToPurchase: string;
  amountSent: string;
  packageId: string;
  marketplaceId: string;
  afterPurchase: () => Promise<void>;
}

function PurchaseListing({ itemToPurchase, amountSent, packageId, marketplaceId, afterPurchase }: PurchaseListingProps) {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const purchaseListing = async () => {
    try {
      // Set up blockchain service configuration
      blockchainService.setPackageId(packageId);
      blockchainService.setMarketplaceId(marketplaceId);

      const output = await blockchainService.purchaseListing(itemToPurchase, amountSent, signAndExecuteTransactionBlock);
      console.log("output:", output);

      if (afterPurchase) {
        await afterPurchase();
      }

      toast.success(`Successfully purchased!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      console.log(e);
      alert("Failed to purchase listing");
    }
  };
  return (
    <div>
      <button className="button" onClick={purchaseListing}>
        purchase item
      </button>
    </div>
  );
}

export default PurchaseListing;
