export interface data_governance_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface data_governance_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface data_governance_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface data_governance_roi_calculatorOutputs {
  result: number;
  analysis: data_governance_roi_calculatorAnalysis;
}
