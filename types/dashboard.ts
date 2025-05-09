export interface Project {
  id: string;
  name: string;
  status: "active" | "archived";
  planStart: string;
  planEnd: string;
  salesStart: string;
  description: string;
  lastUpdated: string;
}

export interface FinancialOverview {
  income: number;
  expenses: number;
  profit: number;
}

export interface Document {
  name: string;
  type: "pdf" | "xlsx" | "docx";
}