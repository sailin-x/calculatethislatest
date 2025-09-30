export interface './finance/expense-tracker-calculator/expense-tracker-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/expense-tracker-calculator/expense-tracker-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/expense-tracker-calculator/expense-tracker-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/expense-tracker-calculator/expense-tracker-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
