export interface propertyTaxProrationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface propertyTaxProrationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface propertyTaxProrationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface propertyTaxProrationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
