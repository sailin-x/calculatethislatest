export interface real_estate_investmentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_investmentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_investmentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_investmentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
