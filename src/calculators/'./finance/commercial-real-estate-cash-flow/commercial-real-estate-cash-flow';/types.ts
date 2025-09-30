export interface './finance/commercial-real-estate-cash-flow/commercial-real-estate-cash-flow';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-real-estate-cash-flow/commercial-real-estate-cash-flow';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-real-estate-cash-flow/commercial-real-estate-cash-flow';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-real-estate-cash-flow/commercial-real-estate-cash-flow';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
