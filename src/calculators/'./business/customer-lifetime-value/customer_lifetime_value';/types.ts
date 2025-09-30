export interface './business/customer-lifetime-value/customer_lifetime_value';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/customer-lifetime-value/customer_lifetime_value';Results {
  result: number;
  analysis?: string;
}

export interface './business/customer-lifetime-value/customer_lifetime_value';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/customer-lifetime-value/customer_lifetime_value';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
