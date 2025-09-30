export interface registerRothIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRothIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRothIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRothIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
