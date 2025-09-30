export interface sponsorship_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sponsorship_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sponsorship_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sponsorship_roi_calculatorOutputs {
  result: number;
  analysis: sponsorship_roi_calculatorAnalysis;
}
