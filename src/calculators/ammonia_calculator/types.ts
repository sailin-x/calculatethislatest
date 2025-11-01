export interface ammonia_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ammonia_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ammonia_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ammonia_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
