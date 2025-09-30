export interface public_private_partnership_p3_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface public_private_partnership_p3_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface public_private_partnership_p3_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface public_private_partnership_p3_roi_calculatorOutputs {
  result: number;
  analysis: public_private_partnership_p3_roi_calculatorAnalysis;
}
