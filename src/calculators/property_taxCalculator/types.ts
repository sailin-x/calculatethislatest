export interface property_taxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface property_taxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface property_taxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface property_taxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
