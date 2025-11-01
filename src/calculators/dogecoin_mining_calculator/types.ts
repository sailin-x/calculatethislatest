export interface dogecoin_mining_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dogecoin_mining_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dogecoin_mining_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dogecoin_mining_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
