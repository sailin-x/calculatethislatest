export interface contract_breach_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface contract_breach_calculatorResults {
  result: number;
  analysis?: string;
}

export interface contract_breach_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface contract_breach_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
