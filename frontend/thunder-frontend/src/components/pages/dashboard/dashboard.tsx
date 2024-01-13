import useWalletStore from "@/store/wallet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const wallet = useWalletStore();
  const navigate = useNavigate();

  const clearState = () => {
    wallet.address = undefined;
    navigate("/");
  };

  if (wallet.address) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Wallet address: {wallet.address}</p>
        <Button onClick={clearState}>Clear</Button>
      </div>
    );
  } else {
    navigate("/");
  }
}
