export interface './finance/commercial-lease-buyout/commercial-lease-buyout';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-lease-buyout/commercial-lease-buyout';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-lease-buyout/commercial-lease-buyout';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-lease-buyout/commercial-lease-buyout';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
