export interface body_surface_area_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface body_surface_area_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface body_surface_area_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface body_surface_area_calculatorOutputs {
  result: number;
  analysis: body_surface_area_calculatorAnalysis;
}
