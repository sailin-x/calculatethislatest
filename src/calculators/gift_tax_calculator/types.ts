export interface gift_tax_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gift_tax_calculatorResults {
  result: number;
  analysis?: string;
}

export interface gift_tax_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gift_tax_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
