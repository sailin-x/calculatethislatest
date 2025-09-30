export interface asset-protection-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface asset-protection-calculatorResults {
  result: number;
  analysis?: string;
}

export interface asset-protection-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface asset-protection-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
