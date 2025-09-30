export interface registerGPUMiningProfitabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerGPUMiningProfitabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerGPUMiningProfitabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerGPUMiningProfitabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
