export interface industrial_robotics_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface industrial_robotics_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface industrial_robotics_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface industrial_robotics_roi_calculatorOutputs {
  result: number;
  analysis: industrial_robotics_roi_calculatorAnalysis;
}
