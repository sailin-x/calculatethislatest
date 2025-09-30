export interface stop_loss_insurance_premium_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stop_loss_insurance_premium_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stop_loss_insurance_premium_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stop_loss_insurance_premium_calculatorOutputs {
  result: number;
  analysis: stop_loss_insurance_premium_calculatorAnalysis;
}
