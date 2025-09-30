export interface car_loan_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface car_loan_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface car_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface car_loan_calculatorOutputs {
  result: number;
  analysis: car_loan_calculatorAnalysis;
}
