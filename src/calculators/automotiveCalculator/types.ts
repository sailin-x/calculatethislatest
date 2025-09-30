export interface automotiveCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface automotiveCalculatorResults {
  result: number;
  analysis?: string;
}

export interface automotiveCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface automotiveCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
