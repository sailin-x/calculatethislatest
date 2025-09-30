export interface litigation_finance_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface litigation_finance_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface litigation_finance_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface litigation_finance_roi_calculatorOutputs {
  result: number;
  analysis: litigation_finance_roi_calculatorAnalysis;
}
