export interface alkalinity_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface alkalinity_calculatorResults {
  result: number;
  analysis?: string;
}

export interface alkalinity_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface alkalinity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
