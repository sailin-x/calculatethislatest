export interface registerRothConversionTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRothConversionTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRothConversionTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRothConversionTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
