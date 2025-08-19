import { useEffect } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { toast } from "react-toastify";
import { blockchainService } from "../services/blockchainService";

interface MintNewWidgetProps {
  setAccountAddress: (address: string) => void;
  packageId: string;
  afterMintingWidget: () => Promise<void>;
}

function MintNewWidget({ setAccountAddress, packageId, afterMintingWidget }: MintNewWidgetProps) {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();

  useEffect(() => {
    if (currentAccount?.address) {
      setAccountAddress(currentAccount.address);
      blockchainService.setCurrentUser(currentAccount.address);
      blockchainService.setPackageId(packageId);
    }
  }, [currentAccount, setAccountAddress, packageId]);

  const mintNewWidget = async () => {
    try {
      const output = await blockchainService.mintWidget(signAndExecuteTransactionBlock);
      console.log("output from minting widget:", output);

      if (afterMintingWidget) {
        await afterMintingWidget();
      }

      toast.success("Successfully minted widget!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      alert("Failed to create widget item");
      console.log(e);
    }
  };

  return (
    <div>
      <button className="button" onClick={mintNewWidget}>
        mint new widget
      </button>
    </div>
  );
}

export default MintNewWidget;
