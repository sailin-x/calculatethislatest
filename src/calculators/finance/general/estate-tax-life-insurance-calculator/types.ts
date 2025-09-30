export interface estate_tax_life_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface estate_tax_life_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface estate_tax_life_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface estate_tax_life_insurance_calculatorOutputs {
  result: number;
  analysis: estate_tax_life_insurance_calculatorAnalysis;
}
