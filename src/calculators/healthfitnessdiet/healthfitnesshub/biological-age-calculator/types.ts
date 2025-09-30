export interface biological_age_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface biological_age_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface biological_age_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface biological_age_calculatorOutputs {
  result: number;
  analysis: biological_age_calculatorAnalysis;
}
