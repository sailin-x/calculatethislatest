export interface commercial_lease_buyoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_lease_buyoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_lease_buyoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_lease_buyoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
