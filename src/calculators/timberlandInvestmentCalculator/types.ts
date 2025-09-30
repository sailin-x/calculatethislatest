export interface timberlandInvestmentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface timberlandInvestmentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface timberlandInvestmentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface timberlandInvestmentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
