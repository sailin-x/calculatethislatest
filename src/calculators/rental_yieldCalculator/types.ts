export interface rental_yieldCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rental_yieldCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rental_yieldCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rental_yieldCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
