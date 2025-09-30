export interface digital_transformation_business_case_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface digital_transformation_business_case_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface digital_transformation_business_case_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface digital_transformation_business_case_calculatorOutputs {
  result: number;
  analysis: digital_transformation_business_case_calculatorAnalysis;
}
