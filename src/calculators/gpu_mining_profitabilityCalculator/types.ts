export interface gpu_mining_profitabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gpu_mining_profitabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface gpu_mining_profitabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gpu_mining_profitabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
