export interface rental_property_roiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rental_property_roiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rental_property_roiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rental_property_roiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
