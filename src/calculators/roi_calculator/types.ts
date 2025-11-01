export interface roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
