export interface distressed_debt_investing_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface distressed_debt_investing_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface distressed_debt_investing_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface distressed_debt_investing_roi_calculatorOutputs {
  result: number;
  analysis: distressed_debt_investing_roi_calculatorAnalysis;
}
