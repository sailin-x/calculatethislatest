export interface realEstateDevelopmentProFormaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface realEstateDevelopmentProFormaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface realEstateDevelopmentProFormaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface realEstateDevelopmentProFormaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
