export interface comparable_company_analysis_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface comparable_company_analysis_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface comparable_company_analysis_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface comparable_company_analysis_calculatorOutputs {
  result: number;
  analysis: comparable_company_analysis_calculatorAnalysis;
}
