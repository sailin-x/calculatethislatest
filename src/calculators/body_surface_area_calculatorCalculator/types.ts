export interface body_surface_area_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface body_surface_area_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface body_surface_area_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface body_surface_area_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
