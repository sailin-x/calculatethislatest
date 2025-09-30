export interface './business/industry-benchmarking-calculator/industry_benchmarking_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/industry-benchmarking-calculator/industry_benchmarking_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/industry-benchmarking-calculator/industry_benchmarking_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/industry-benchmarking-calculator/industry_benchmarking_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
