export interface commercial_real_estateCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_real_estateCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_real_estateCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_real_estateCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
