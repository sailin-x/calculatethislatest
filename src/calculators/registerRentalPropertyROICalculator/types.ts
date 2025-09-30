export interface registerRentalPropertyROICalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRentalPropertyROICalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRentalPropertyROICalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRentalPropertyROICalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
