export interface './finance/free-cash-flow-to-equity-calculator/free_cash_flow_to_equity_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/free-cash-flow-to-equity-calculator/free_cash_flow_to_equity_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/free-cash-flow-to-equity-calculator/free_cash_flow_to_equity_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/free-cash-flow-to-equity-calculator/free_cash_flow_to_equity_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
