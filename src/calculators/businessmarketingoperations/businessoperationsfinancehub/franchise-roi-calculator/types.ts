export interface franchise_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface franchise_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface franchise_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface franchise_roi_calculatorOutputs {
  result: number;
  analysis: franchise_roi_calculatorAnalysis;
}
