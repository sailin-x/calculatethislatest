export interface mezzanine_financingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mezzanine_financingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mezzanine_financingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mezzanine_financingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
