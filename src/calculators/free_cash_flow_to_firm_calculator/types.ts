export interface free_cash_flow_to_firm_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface free_cash_flow_to_firm_calculatorResults {
  result: number;
  analysis?: string;
}

export interface free_cash_flow_to_firm_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface free_cash_flow_to_firm_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
