export interface change_management_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface change_management_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface change_management_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface change_management_roi_calculatorOutputs {
  result: number;
  analysis: change_management_roi_calculatorAnalysis;
}
