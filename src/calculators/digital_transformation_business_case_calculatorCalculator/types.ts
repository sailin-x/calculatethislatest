export interface digital_transformation_business_case_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface digital_transformation_business_case_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface digital_transformation_business_case_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface digital_transformation_business_case_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
