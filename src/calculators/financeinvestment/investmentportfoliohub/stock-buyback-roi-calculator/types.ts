export interface stock_buyback_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stock_buyback_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stock_buyback_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stock_buyback_roi_calculatorOutputs {
  result: number;
  analysis: stock_buyback_roi_calculatorAnalysis;
}
