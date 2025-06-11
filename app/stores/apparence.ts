import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApparenceState {
	language: string;
	setLanguage: (language: string) => void;
}

export const useApparenceStore = create<ApparenceState>()(
	persist(
		(set) => ({
			language: "browser",
			setLanguage: (language) => set({ language }),
		}),
		{ name: "apparence" },
	),
);
