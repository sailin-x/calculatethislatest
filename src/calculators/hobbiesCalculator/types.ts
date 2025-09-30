export interface hobbiesCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hobbiesCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hobbiesCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hobbiesCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
