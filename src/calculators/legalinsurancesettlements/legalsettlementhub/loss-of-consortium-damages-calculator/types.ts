export interface loss_of_consortium_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface loss_of_consortium_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface loss_of_consortium_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface loss_of_consortium_damages_calculatorOutputs {
  result: number;
  analysis: loss_of_consortium_damages_calculatorAnalysis;
}
