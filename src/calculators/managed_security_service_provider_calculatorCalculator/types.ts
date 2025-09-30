export interface managed_security_service_provider_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface managed_security_service_provider_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface managed_security_service_provider_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface managed_security_service_provider_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
