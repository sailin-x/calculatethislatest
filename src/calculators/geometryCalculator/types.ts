export interface geometryCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface geometryCalculatorResults {
  result: number;
  analysis?: string;
}

export interface geometryCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface geometryCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
