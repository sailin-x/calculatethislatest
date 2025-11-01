export interface bariatric_surgery_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bariatric_surgery_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bariatric_surgery_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bariatric_surgery_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
