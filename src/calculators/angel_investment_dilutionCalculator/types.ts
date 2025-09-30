export interface angel_investment_dilutionCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface angel_investment_dilutionCalculatorResults {
  result: number;
  analysis?: string;
}

export interface angel_investment_dilutionCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface angel_investment_dilutionCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
