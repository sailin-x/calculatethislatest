export interface './business/customer-acquisition-cost/customer_acquisition_cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/customer-acquisition-cost/customer_acquisition_cost';Results {
  result: number;
  analysis?: string;
}

export interface './business/customer-acquisition-cost/customer_acquisition_cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/customer-acquisition-cost/customer_acquisition_cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
