export interface addiction_rehab_cost_financing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface addiction_rehab_cost_financing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface addiction_rehab_cost_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface addiction_rehab_cost_financing_calculatorOutputs {
  result: number;
  analysis: addiction_rehab_cost_financing_calculatorAnalysis;
}
