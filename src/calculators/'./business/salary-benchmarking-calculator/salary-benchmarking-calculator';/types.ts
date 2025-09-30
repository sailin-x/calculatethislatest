export interface './business/salary-benchmarking-calculator/salary-benchmarking-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/salary-benchmarking-calculator/salary-benchmarking-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/salary-benchmarking-calculator/salary-benchmarking-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/salary-benchmarking-calculator/salary-benchmarking-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
