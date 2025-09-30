export interface './business/customer-lifetime-value/customer-lifetime-value';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/customer-lifetime-value/customer-lifetime-value';Results {
  result: number;
  analysis?: string;
}

export interface './business/customer-lifetime-value/customer-lifetime-value';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/customer-lifetime-value/customer-lifetime-value';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
