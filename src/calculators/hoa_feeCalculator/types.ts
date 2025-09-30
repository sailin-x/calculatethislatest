export interface hoa_feeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hoa_feeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hoa_feeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hoa_feeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
