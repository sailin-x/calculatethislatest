export interface car_payment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface car_payment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface car_payment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface car_payment_calculatorOutputs {
  result: number;
  analysis: car_payment_calculatorAnalysis;
}
