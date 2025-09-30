export interface libel_slander_per_se_damages_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface libel_slander_per_se_damages_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface libel_slander_per_se_damages_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface libel_slander_per_se_damages_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
