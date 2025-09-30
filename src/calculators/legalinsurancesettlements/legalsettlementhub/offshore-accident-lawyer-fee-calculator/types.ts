export interface offshore_accident_lawyer_fee_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface offshore_accident_lawyer_fee_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface offshore_accident_lawyer_fee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface offshore_accident_lawyer_fee_calculatorOutputs {
  result: number;
  analysis: offshore_accident_lawyer_fee_calculatorAnalysis;
}
