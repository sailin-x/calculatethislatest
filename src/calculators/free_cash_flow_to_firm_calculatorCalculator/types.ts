export interface free_cash_flow_to_firm_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface free_cash_flow_to_firm_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface free_cash_flow_to_firm_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface free_cash_flow_to_firm_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
