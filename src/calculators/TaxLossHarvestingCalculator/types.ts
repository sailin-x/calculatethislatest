export interface TaxLossHarvestingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface TaxLossHarvestingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface TaxLossHarvestingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface TaxLossHarvestingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
