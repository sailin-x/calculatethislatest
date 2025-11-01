export interface scientific_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface scientific_calculatorResults {
  result: number;
  analysis?: string;
}

export interface scientific_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface scientific_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
