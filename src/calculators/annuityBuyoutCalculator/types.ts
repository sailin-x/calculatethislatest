export interface annuityBuyoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface annuityBuyoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface annuityBuyoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface annuityBuyoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
