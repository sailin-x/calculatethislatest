export interface impermanent_loss_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface impermanent_loss_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface impermanent_loss_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface impermanent_loss_calculatorOutputs {
  result: number;
  analysis: impermanent_loss_calculatorAnalysis;
}
