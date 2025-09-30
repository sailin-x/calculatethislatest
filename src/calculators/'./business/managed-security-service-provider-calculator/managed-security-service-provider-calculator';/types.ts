export interface './business/managed-security-service-provider-calculator/managed-security-service-provider-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/managed-security-service-provider-calculator/managed-security-service-provider-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/managed-security-service-provider-calculator/managed-security-service-provider-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/managed-security-service-provider-calculator/managed-security-service-provider-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
