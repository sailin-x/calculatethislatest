export interface marine_cargo_insurance_premium_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface marine_cargo_insurance_premium_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface marine_cargo_insurance_premium_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface marine_cargo_insurance_premium_calculatorOutputs {
  result: number;
  analysis: marine_cargo_insurance_premium_calculatorAnalysis;
}
