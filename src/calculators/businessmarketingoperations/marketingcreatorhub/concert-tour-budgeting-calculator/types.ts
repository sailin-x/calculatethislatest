export interface concert_tour_budgeting_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface concert_tour_budgeting_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface concert_tour_budgeting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface concert_tour_budgeting_calculatorOutputs {
  result: number;
  analysis: concert_tour_budgeting_calculatorAnalysis;
}
