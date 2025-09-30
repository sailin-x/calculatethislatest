export interface './finance/commercial-lease-buyout/commercial_lease_buyout';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-lease-buyout/commercial_lease_buyout';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-lease-buyout/commercial_lease_buyout';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-lease-buyout/commercial_lease_buyout';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
