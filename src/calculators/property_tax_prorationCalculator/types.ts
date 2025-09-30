export interface property_tax_prorationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface property_tax_prorationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface property_tax_prorationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface property_tax_prorationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
