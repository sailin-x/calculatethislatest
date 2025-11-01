export interface industry_benchmarking_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface industry_benchmarking_calculatorResults {
  result: number;
  analysis?: string;
}

export interface industry_benchmarking_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface industry_benchmarking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
