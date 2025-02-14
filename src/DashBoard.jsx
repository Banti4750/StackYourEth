import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { ABI } from "./abi";
import { formatEther, parseEther } from "viem";

const CONTRACT_ADDRESS = "0xed4E92BD886f24eAc4DDBD15763Be94759F7F1cF";

export function Dashboard() {
  const { address } = useAccount();
  const { writeContract, isLoading: isStacking } = useWriteContract();

  const handleUNStack = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      const amountInWei = parseEther("0.0001"); // 0.1 ETH
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "unstake",
        args: [amountInWei],
        value: amountInWei,
      });
    } catch (e) {
      console.error("Error UNstacking:", error);
      alert(`UNStaking failed: ${error.message}`);
    }
  };

  const handleStack = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      // Using parseEther to convert 0.1 ETH to Wei
      const amountInWei = parseEther("0.0001"); // 0.1 ETH

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "stake",
        args: [amountInWei],
        value: amountInWei,
      });
    } catch (error) {
      console.error("Error stacking:", error);
      alert(`Staking failed: ${error.message}`);
    }
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const buttonStyle = {
    backgroundColor: isStacking ? "#cccccc" : "#4CAF50",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "4px",
    cursor: isStacking ? "not-allowed" : "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  };

  const walletStyle = {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <div style={walletStyle}>
        {address ? (
          <>
            Connected Wallet: {address.slice(0, 6)}...{address.slice(-4)}
          </>
        ) : (
          "Please connect your wallet"
        )}
      </div>
      <button
        onClick={handleStack}
        style={buttonStyle}
        disabled={!address || isStacking}
      >
        {isStacking ? "Stacking..." : "Stack 0.1 ETH"}
      </button>

      <button onClick={handleUNStack} style={buttonStyle} disabled={!address}>
        {isStacking ? "UNStacking..." : "UNStack 0.1 ETH"}
      </button>
      {address && <ShowStack address={address} />}
    </div>
  );
}

function ShowStack({ address }) {
  const {
    data: balance,
    isError,
    isLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "balance",
    args: [address],
    watch: true,
  });

  const balanceStyle = {
    fontSize: "18px",
    padding: "15px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  if (isLoading) return <div>Loading balance...</div>;
  if (isError) return <div>Error fetching balance</div>;

  const formattedBalance = balance ? formatEther(balance) : "0";

  return <div style={balanceStyle}>You have staked {formattedBalance} ETH</div>;
}
