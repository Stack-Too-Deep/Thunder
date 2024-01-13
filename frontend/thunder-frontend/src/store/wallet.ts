import { create } from "zustand";

interface WalletState {
    address: string | undefined;
}

const useWalletStore = create<WalletState>()(() => ({
    address: undefined,
}));

export default useWalletStore

