export interface './businessmarketingoperations/businessoperationsfinancehub/managed-security-service-provider-mssp-vs-in-house-soc-calculator/managed-security-service-provider-mssp-vs-in-house-soc-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/managed-security-service-provider-mssp-vs-in-house-soc-calculator/managed-security-service-provider-mssp-vs-in-house-soc-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/managed-security-service-provider-mssp-vs-in-house-soc-calculator/managed-security-service-provider-mssp-vs-in-house-soc-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/managed-security-service-provider-mssp-vs-in-house-soc-calculator/managed-security-service-provider-mssp-vs-in-house-soc-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
