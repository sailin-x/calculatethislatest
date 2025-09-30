export interface real_estate_investment_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_investment_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_investment_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_investment_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
