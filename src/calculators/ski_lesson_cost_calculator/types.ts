export interface ski_lesson_cost_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ski_lesson_cost_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ski_lesson_cost_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ski_lesson_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
