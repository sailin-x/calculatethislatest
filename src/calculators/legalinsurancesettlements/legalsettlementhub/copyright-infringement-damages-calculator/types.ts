export interface copyright_infringement_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface copyright_infringement_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface copyright_infringement_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface copyright_infringement_damages_calculatorOutputs {
  result: number;
  analysis: copyright_infringement_damages_calculatorAnalysis;
}
