export interface umbrella_insurance_coverage_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface umbrella_insurance_coverage_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface umbrella_insurance_coverage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface umbrella_insurance_coverage_calculatorOutputs {
  result: number;
  analysis: umbrella_insurance_coverage_calculatorAnalysis;
}
