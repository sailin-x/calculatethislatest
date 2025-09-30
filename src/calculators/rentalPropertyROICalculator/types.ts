export interface rentalPropertyROICalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rentalPropertyROICalculatorResults {
  result: number;
  analysis?: string;
}

export interface rentalPropertyROICalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rentalPropertyROICalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
