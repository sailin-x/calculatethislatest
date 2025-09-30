export interface mortgage_closing_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_closing_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_closing_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_closing_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
