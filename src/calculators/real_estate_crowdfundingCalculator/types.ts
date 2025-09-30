export interface real_estate_crowdfundingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_crowdfundingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_crowdfundingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_crowdfundingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
