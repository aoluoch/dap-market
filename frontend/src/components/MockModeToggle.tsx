import React from "react";
import { MOCK_MODE } from "../services/blockchainService";

interface MockModeToggleProps {
  onMockDataLoad?: () => void;
}

function MockModeToggle({ onMockDataLoad }: MockModeToggleProps) {
  const handleLoadMockData = () => {
    if (onMockDataLoad) {
      onMockDataLoad();
    }
  };

  return (
    <div style={{ 
      padding: "10px", 
      backgroundColor: MOCK_MODE ? "#e8f5e8" : "#f5f5f5", 
      border: "1px solid #ccc", 
      borderRadius: "5px",
      marginBottom: "10px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontWeight: "bold" }}>
          Mode: {MOCK_MODE ? "🟢 Mock Data" : "🔴 Live Blockchain"}
        </span>
        {MOCK_MODE && (
          <button 
            className="button" 
            onClick={handleLoadMockData}
            style={{ fontSize: "12px", padding: "5px 10px" }}
          >
            Load Mock Data
          </button>
        )}
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
        {MOCK_MODE 
          ? "Using simulated data - no real blockchain transactions will be made"
          : "Connected to Sui devnet - real transactions will be executed"
        }
      </div>
      {MOCK_MODE && (
        <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>
          To switch to live mode, set VITE_MOCK_MODE=false in .env file
        </div>
      )}
    </div>
  );
}

export default MockModeToggle;
