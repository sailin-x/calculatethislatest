export interface cam_girl_revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cam_girl_revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cam_girl_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cam_girl_revenue_calculatorOutputs {
  result: number;
  analysis: cam_girl_revenue_calculatorAnalysis;
}
