export interface aiPromptCostCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface aiPromptCostCalculatorResults {
  result: number;
  analysis?: string;
}

export interface aiPromptCostCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface aiPromptCostCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
