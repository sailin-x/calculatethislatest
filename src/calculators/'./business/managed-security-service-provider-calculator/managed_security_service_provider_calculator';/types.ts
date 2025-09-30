export interface './business/managed-security-service-provider-calculator/managed_security_service_provider_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/managed-security-service-provider-calculator/managed_security_service_provider_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/managed-security-service-provider-calculator/managed_security_service_provider_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/managed-security-service-provider-calculator/managed_security_service_provider_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
