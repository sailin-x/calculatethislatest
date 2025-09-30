export interface rothConversionTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rothConversionTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rothConversionTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rothConversionTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
