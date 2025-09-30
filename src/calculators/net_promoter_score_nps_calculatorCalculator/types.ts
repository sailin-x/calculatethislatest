export interface net_promoter_score_nps_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface net_promoter_score_nps_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface net_promoter_score_nps_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface net_promoter_score_nps_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
