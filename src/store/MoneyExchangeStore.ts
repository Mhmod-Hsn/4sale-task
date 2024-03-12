import { create } from 'zustand';

type FormState = {
	amount: string;
	from: string;
	to: string;

	setAmount: (amount: string) => void;
	setFrom: (from: string) => void;
	setTo: (to: string) => void;

	swap: () => void;
	reset: () => void;
};

const initialState = {
	amount: '',
	from: '',
	to: '',
};

export const useMoneyExchangeStore = create<FormState>((set, get) => ({
	...initialState,

	setAmount: (amount: string) => set({ amount }),
	setFrom: (from: string) => set({ from }),
	setTo: (to: string) => set({ to }),

	swap: () => set({ from: get().to, to: get().from }),

	reset: () => set(initialState),
}));
