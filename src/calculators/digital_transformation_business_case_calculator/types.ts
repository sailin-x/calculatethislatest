export interface digital_transformation_business_case_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface digital_transformation_business_case_calculatorResults {
  result: number;
  analysis?: string;
}

export interface digital_transformation_business_case_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface digital_transformation_business_case_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
