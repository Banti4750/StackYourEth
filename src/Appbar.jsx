import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { disconnect } from "wagmi/actions";

const Appbar = () => {
  const { address } = useAccount();

  const appbarStyles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      //   backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    connectButton: {
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007AFF",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
  };

  return (
    <div style={appbarStyles.container}>
      <div style={appbarStyles.logo}>Stackify</div>
      <div style={appbarStyles.buttonContainer}>
        {!address ? <Connect /> : <DisConnect />}
      </div>
    </div>
  );
};

export default Appbar;

function Connect() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.id} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

function DisConnect() {
  const { disconnect } = useDisconnect();

  return (
    <div>
      <button onClick={() => disconnect()}>Disconnect wallet</button>
    </div>
  );
}
