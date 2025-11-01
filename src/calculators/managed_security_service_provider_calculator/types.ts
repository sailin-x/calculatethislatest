export interface managed_security_service_provider_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface managed_security_service_provider_calculatorResults {
  result: number;
  analysis?: string;
}

export interface managed_security_service_provider_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface managed_security_service_provider_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
