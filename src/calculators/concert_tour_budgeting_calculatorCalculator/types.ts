export interface concert_tour_budgeting_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface concert_tour_budgeting_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface concert_tour_budgeting_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface concert_tour_budgeting_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
