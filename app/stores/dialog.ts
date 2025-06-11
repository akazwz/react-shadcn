import { create } from "zustand";

interface DialogState {
	authDialogOpen: boolean;
	setAuthDialogOpen: (authDialogOpen: boolean) => void;
	priceDialogOpen: boolean;
	setPriceDialogOpen: (priceDialogOpen: boolean) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
	authDialogOpen: false,
	setAuthDialogOpen: (authDialogOpen) => set({ authDialogOpen }),
	priceDialogOpen: false,
	setPriceDialogOpen: (priceDialogOpen) => set({ priceDialogOpen }),
}));
