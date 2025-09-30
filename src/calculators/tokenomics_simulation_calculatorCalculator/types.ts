export interface tokenomics_simulation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tokenomics_simulation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tokenomics_simulation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tokenomics_simulation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
