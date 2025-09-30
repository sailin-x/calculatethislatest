export interface registerUSDALoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerUSDALoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerUSDALoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerUSDALoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
