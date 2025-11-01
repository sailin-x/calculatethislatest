export interface property_tax_appeal_savings_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface property_tax_appeal_savings_calculatorResults {
  result: number;
  analysis?: string;
}

export interface property_tax_appeal_savings_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface property_tax_appeal_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
