export interface registerTimberlandInvestmentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerTimberlandInvestmentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerTimberlandInvestmentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerTimberlandInvestmentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
