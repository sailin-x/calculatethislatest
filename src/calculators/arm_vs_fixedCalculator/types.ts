export interface arm_vs_fixedCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface arm_vs_fixedCalculatorResults {
  result: number;
  analysis?: string;
}

export interface arm_vs_fixedCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface arm_vs_fixedCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
