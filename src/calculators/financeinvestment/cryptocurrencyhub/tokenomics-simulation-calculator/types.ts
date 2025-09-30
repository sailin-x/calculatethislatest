export interface tokenomics_simulation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tokenomics_simulation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tokenomics_simulation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tokenomics_simulation_calculatorOutputs {
  result: number;
  analysis: tokenomics_simulation_calculatorAnalysis;
}
