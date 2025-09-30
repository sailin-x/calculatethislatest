export interface farmland_investment_roiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface farmland_investment_roiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface farmland_investment_roiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface farmland_investment_roiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
