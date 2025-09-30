export interface business_risk_assessment_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface business_risk_assessment_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface business_risk_assessment_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface business_risk_assessment_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
