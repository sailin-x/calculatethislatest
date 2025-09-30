export interface ai_prompt_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ai_prompt_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ai_prompt_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ai_prompt_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
