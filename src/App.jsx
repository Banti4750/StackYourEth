import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Appbar from "./Appbar";
import { Dashboard } from "./DashBoard";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Appbar />
          <Dashboard />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
