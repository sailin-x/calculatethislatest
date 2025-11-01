export interface concert_tour_budgeting_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface concert_tour_budgeting_calculatorResults {
  result: number;
  analysis?: string;
}

export interface concert_tour_budgeting_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface concert_tour_budgeting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
