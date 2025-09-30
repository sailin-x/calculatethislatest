export interface masternode_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface masternode_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface masternode_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface masternode_roi_calculatorOutputs {
  result: number;
  analysis: masternode_roi_calculatorAnalysis;
}
