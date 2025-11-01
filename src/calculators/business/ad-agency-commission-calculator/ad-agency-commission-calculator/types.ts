export interface AdAgencyCommission-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface AdAgencyCommission-calculatorResults {
  result: number;
  analysis?: string;
}

export interface AdAgencyCommission-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface AdAgencyCommission-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
