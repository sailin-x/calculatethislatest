export interface college_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface college_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface college_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface college_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
