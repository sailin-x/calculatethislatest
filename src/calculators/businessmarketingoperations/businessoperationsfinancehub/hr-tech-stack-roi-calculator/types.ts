export interface hr_tech_stack_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface hr_tech_stack_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface hr_tech_stack_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface hr_tech_stack_roi_calculatorOutputs {
  result: number;
  analysis: hr_tech_stack_roi_calculatorAnalysis;
}
