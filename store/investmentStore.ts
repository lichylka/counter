import { create } from 'zustand';

interface Investment {
    year: string;
    income: number;
    expenses: number;
    balance: number;
    period: "Порічно" | "Поквартально" | "Помісячно";
}

interface InvestmentStore {
    investments: Investment[];
    setInvestments: (investments: Investment[]) => void;
    updateInvestment: (year: string, field: keyof Omit<Investment, 'year'>, value: number) => void;
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
    investments: [],
    setInvestments: (investments) => set({ investments }),
    updateInvestment: (year, field, value) =>
        set((state) => ({
            investments: state.investments.map((inv) =>
                inv.year === year ? { ...inv, [field]: value } : inv
            ),
        })),
}));