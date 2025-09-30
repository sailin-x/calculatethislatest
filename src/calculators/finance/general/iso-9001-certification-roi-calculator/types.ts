export interface iso_9001_certification_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface iso_9001_certification_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface iso_9001_certification_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface iso_9001_certification_roi_calculatorOutputs {
  result: number;
  analysis: iso_9001_certification_roi_calculatorAnalysis;
}
