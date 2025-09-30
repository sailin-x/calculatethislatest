export interface registerTitleInsuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerTitleInsuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerTitleInsuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerTitleInsuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
