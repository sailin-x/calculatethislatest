export interface rights_offering_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface rights_offering_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface rights_offering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface rights_offering_calculatorOutputs {
  result: number;
  analysis: rights_offering_calculatorAnalysis;
}
