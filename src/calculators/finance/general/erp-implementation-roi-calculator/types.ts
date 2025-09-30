export interface erp_implementation_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface erp_implementation_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface erp_implementation_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface erp_implementation_roi_calculatorOutputs {
  result: number;
  analysis: erp_implementation_roi_calculatorAnalysis;
}
