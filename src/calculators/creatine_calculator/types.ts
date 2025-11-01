export interface creatine_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface creatine_calculatorResults {
  result: number;
  analysis?: string;
}

export interface creatine_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface creatine_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
