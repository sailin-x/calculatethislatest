export interface tax_loss_harvesting_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tax_loss_harvesting_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tax_loss_harvesting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tax_loss_harvesting_calculatorOutputs {
  result: number;
  analysis: tax_loss_harvesting_calculatorAnalysis;
}
