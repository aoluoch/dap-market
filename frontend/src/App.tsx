// react libraries
import React, { useState } from "react";
import "./App.css";

// components
import MintNewWidget from "./components/MintNewWidget";
import ListItem from "./components/ListItem";
import PurchaseListing from "./components/PurchaseListing";
import TakeProfits from "./components/TakeProfits";
import MockModeToggle from "./components/MockModeToggle";

// toastify libraries
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// sui libraries
import { WalletKitProvider, ConnectButton } from "@mysten/wallet-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

// services
import { blockchainService, MOCK_MODE } from "./services/blockchainService";

// Types
interface ListingInfo {
  listingId: string;
  askPrice: string;
  owner: string;
  widget: string;
}

function App() {
  const [marketplaceId, setMarketplaceId] = useState<string>(
    MOCK_MODE ? (import.meta.env.VITE_DEFAULT_MARKETPLACE_ID || "0x123marketplace456") : ""
  );
  const [packageId, setPackageId] = useState<string>(
    MOCK_MODE ? (import.meta.env.VITE_DEFAULT_PACKAGE_ID || "0x123package456") : ""
  );
  const [idsEntered, setIdsEntered] = useState<boolean>(MOCK_MODE);
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [ownedWidgets, setOwnedWidgets] = useState<string[]>([]);
  const [widgetToList, setWidgetToList] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [itemToPurchase, setItemToPurchase] = useState<string>("");
  const [listingInfo, setListingInfo] = useState<string[][]>([]);
  const [amountSent, setAmountSent] = useState<string>("");

  // Initialize blockchain service with default values in mock mode
  React.useEffect(() => {
    if (MOCK_MODE && packageId && marketplaceId) {
      blockchainService.setPackageId(packageId);
      blockchainService.setMarketplaceId(marketplaceId);
    }
  }, [packageId, marketplaceId]);

  const handleMarketplaceIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarketplaceId(event.target.value);
  };

  const handlePackageIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPackageId(event.target.value);
  };

  const handleSubmit = () => {
    if (marketplaceId.trim() !== "" && packageId.trim() !== "") {
      setIdsEntered(true);
      // Configure blockchain service with IDs
      blockchainService.setPackageId(packageId);
      blockchainService.setMarketplaceId(marketplaceId);
    } else {
      alert("Please enter your PackageID and MarketplaceID");
    }
  };

  const handleWidgetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidgetToList(event.target.value);
  };

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleItemToPurchaseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemToPurchase(event.target.value);
  };

  const handleAmountSentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSent(event.target.value);
  };

  const getOwnedWidgets = async () => {
    try {
      const widgets = await blockchainService.getOwnedWidgets();
      setOwnedWidgets(widgets);

      toast.success(`Successfully refreshed owned widgets!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      alert("Failed to refresh");
      console.log(e);
    }
  };

  const afterListing = async () => {
    await getOwnedWidgets();
  };

  const afterPurchase = async () => {
    await getListingInformation();
    await getOwnedWidgets();
  };

  const handleLoadMockData = async () => {
    if (MOCK_MODE) {
      await getOwnedWidgets();
      await getListingInformation();
    }
  };

  const afterMintingWidget = async () => {
    await getOwnedWidgets();
  };

  const getListingInformation = async () => {
    try {
      const output = await blockchainService.getListingInformation();
      setListingInfo(output);

      toast.success(`Successfully refreshed listings!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } catch (e) {
      alert("Failed to get listing information");
      console.log(e);
    }
  };

  return (
    <WalletKitProvider>
      <ToastContainer />
      <MockModeToggle onMockDataLoad={handleLoadMockData} />
      {!idsEntered ? (
        <div className="centered">
          <input type="text" value={packageId} onChange={handlePackageIdInput} placeholder="Enter PackageId" />
          <input type="text" value={marketplaceId} onChange={handleMarketplaceIdInput} placeholder="Enter MarketplaceId" />
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div class="header">
            <div class="column header-left title">MarketplaceId: {marketplaceId}</div>
            <div class="header-right"><ConnectButton /></div>
          </div>
          <div class="row" id="second-row">
            <div class="column">
              <img src="marketplace-banner.png" alt="Banner" className="banner-image"></img>
            </div>
            <div class="column">
              <div class="sub-row">
                <MintNewWidget setAccountAddress={setAccountAddress} packageId={packageId} afterMintingWidget={afterMintingWidget} />
              </div>
              <div class="sub-row">
                <button className="button" onClick={getOwnedWidgets}>
                  get owned widgets
                </button>
              </div>

              <div class="sub-row">
                <div class="input-container">
                  <div class="column1">
                    <ListItem
                      widgetToList={widgetToList}
                      price={price}
                      packageId={packageId}
                      marketplaceId={marketplaceId}
                      afterListing={afterListing}
                    />
                  </div>
                  <div class="column column2">
                    <div class="row row1">
                      <input type="text" value={widgetToList} onChange={handleWidgetInput} placeholder="input widgetId" />
                    </div>
                    <div class="row row2">
                      <input type="number" value={price} onChange={handlePriceInput} placeholder="input price" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="sub-row">
                <button className="button" onClick={getListingInformation}>
                  get listings
                </button>
              </div>

              <div class="sub-row">
                <div class="input-container">
                  <div class="column column1">
                    <PurchaseListing
                      itemToPurchase={itemToPurchase}
                      amountSent={amountSent}
                      packageId={packageId}
                      marketplaceId={marketplaceId}
                      afterPurchase={afterPurchase}
                    />
                  </div>
                  <div class="column column2">
                    <div class="row row1">
                      <input type="text" value={itemToPurchase} onChange={handleItemToPurchaseInput} placeholder="input itemId" />
                    </div>
                    <div class="row row2">
                      <input type="number" value={amountSent} onChange={handleAmountSentInput} placeholder="input amount" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="sub-row">
                <TakeProfits packageId={packageId} marketplaceId={marketplaceId} />
              </div>
            </div>
          </div>
          <div class="row" id="third-row">
            <div class="column">
              <div class="title">Listings:</div>
              <div className="listing-info text">
                <ul>
                  {listingInfo &&
                    listingInfo.map((listing, idx) => {
                      return (
                        <li>
                          Item {idx}
                          <ul>
                            {listing.map((info, infoIdx) => {
                              return <li>{info}</li>;
                            })}
                          </ul>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <div class="column">
              <div className="title">Currently owned widgets:</div>
              <div className="text">
                <ul>
                  {ownedWidgets &&
                    ownedWidgets.map((widget, idx) => {
                      return <li>{widget}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </WalletKitProvider>
  );
}

export default App;
