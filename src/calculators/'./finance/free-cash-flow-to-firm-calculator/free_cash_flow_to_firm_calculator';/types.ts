export interface './finance/free-cash-flow-to-firm-calculator/free_cash_flow_to_firm_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/free-cash-flow-to-firm-calculator/free_cash_flow_to_firm_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/free-cash-flow-to-firm-calculator/free_cash_flow_to_firm_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/free-cash-flow-to-firm-calculator/free_cash_flow_to_firm_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
