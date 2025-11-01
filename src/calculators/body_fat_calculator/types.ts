export interface body_fat_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface body_fat_calculatorResults {
  result: number;
  analysis?: string;
}

export interface body_fat_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface body_fat_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
