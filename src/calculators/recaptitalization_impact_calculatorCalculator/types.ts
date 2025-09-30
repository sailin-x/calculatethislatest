export interface recaptitalization_impact_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface recaptitalization_impact_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface recaptitalization_impact_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface recaptitalization_impact_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
