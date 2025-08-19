import React from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { toast } from "react-toastify";
import { blockchainService } from "../services/blockchainService";

interface TakeProfitsProps {
  packageId: string;
  marketplaceId: string;
}

function TakeProfits({ packageId, marketplaceId }: TakeProfitsProps) {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const takeProfits = async () => {
    try {
      // Set up blockchain service configuration
      blockchainService.setPackageId(packageId);
      blockchainService.setMarketplaceId(marketplaceId);

      const output = await blockchainService.takeProfits(signAndExecuteTransactionBlock);
      console.log("output:", output);

      toast.success(`Successfully took profits!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      console.log(e);
      alert("Failed to take profits");
    }
  };
  return (
    <div>
      <button className="button" onClick={takeProfits}>
        take profits
      </button>
    </div>
  );
}

export default TakeProfits;
