export interface mezzanine_financing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface mezzanine_financing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface mezzanine_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface mezzanine_financing_calculatorOutputs {
  result: number;
  analysis: mezzanine_financing_calculatorAnalysis;
}
