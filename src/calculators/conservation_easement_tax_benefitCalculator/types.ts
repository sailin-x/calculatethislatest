export interface conservation_easement_tax_benefitCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface conservation_easement_tax_benefitCalculatorResults {
  result: number;
  analysis?: string;
}

export interface conservation_easement_tax_benefitCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface conservation_easement_tax_benefitCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
