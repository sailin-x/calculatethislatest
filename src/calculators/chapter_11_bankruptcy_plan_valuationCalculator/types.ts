export interface chapter_11_bankruptcy_plan_valuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface chapter_11_bankruptcy_plan_valuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface chapter_11_bankruptcy_plan_valuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface chapter_11_bankruptcy_plan_valuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
