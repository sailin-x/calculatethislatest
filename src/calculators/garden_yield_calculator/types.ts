export interface garden_yield_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface garden_yield_calculatorResults {
  result: number;
  analysis?: string;
}

export interface garden_yield_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface garden_yield_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
