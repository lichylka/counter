import { create } from 'zustand';

interface PnL {
    year: string;
    income: number;
    expenses: number;
    balance: number;
    period: "Порічно" | "Поквартально" | "Помісячно";
}

interface PnLStore {
    pnls: PnL[];
    setPnLs: (pnls: PnL[]) => void;
    updatePnL: (year: string, field: keyof Omit<PnL, 'year'>, value: number) => void;
}

export const usePnLStore = create<PnLStore>((set) => ({
    pnls: [],
    setPnLs: (pnls) => set({ pnls }),
    updatePnL: (year, field, value) =>
        set((state) => ({
            pnls: state.pnls.map((pnl) =>
                pnl.year === year ? { ...pnl, [field]: value } : pnl
            ),
        })),
}));