export interface construction_accident_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface construction_accident_calculatorResults {
  result: number;
  analysis?: string;
}

export interface construction_accident_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface construction_accident_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
