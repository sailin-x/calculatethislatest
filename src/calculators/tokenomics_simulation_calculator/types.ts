export interface tokenomics_simulation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tokenomics_simulation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface tokenomics_simulation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tokenomics_simulation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
