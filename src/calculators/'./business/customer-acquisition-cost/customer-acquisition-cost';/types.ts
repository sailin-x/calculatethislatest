export interface './business/customer-acquisition-cost/customer-acquisition-cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/customer-acquisition-cost/customer-acquisition-cost';Results {
  result: number;
  analysis?: string;
}

export interface './business/customer-acquisition-cost/customer-acquisition-cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/customer-acquisition-cost/customer-acquisition-cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
