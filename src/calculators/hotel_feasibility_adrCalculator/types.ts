export interface hotel_feasibility_adrCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hotel_feasibility_adrCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hotel_feasibility_adrCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hotel_feasibility_adrCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
