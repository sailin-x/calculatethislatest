export interface dental_implant_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dental_implant_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dental_implant_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dental_implant_roi_calculatorOutputs {
  result: number;
  analysis: dental_implant_roi_calculatorAnalysis;
}
