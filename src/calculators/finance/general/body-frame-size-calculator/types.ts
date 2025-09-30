export interface body_frame_size_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface body_frame_size_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface body_frame_size_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface body_frame_size_calculatorOutputs {
  result: number;
  analysis: body_frame_size_calculatorAnalysis;
}
