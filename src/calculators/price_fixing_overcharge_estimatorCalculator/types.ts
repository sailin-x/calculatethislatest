export interface price_fixing_overcharge_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface price_fixing_overcharge_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface price_fixing_overcharge_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface price_fixing_overcharge_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
