export interface car_accident_pain_suffering_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface car_accident_pain_suffering_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface car_accident_pain_suffering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface car_accident_pain_suffering_calculatorOutputs {
  result: number;
  analysis: car_accident_pain_suffering_calculatorAnalysis;
}
