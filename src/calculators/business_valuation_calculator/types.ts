export interface business_valuation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface business_valuation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface business_valuation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface business_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
