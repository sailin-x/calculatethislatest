export interface './legal/commercial-fleet-insurance-calculator/commercial-fleet-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/commercial-fleet-insurance-calculator/commercial-fleet-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/commercial-fleet-insurance-calculator/commercial-fleet-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/commercial-fleet-insurance-calculator/commercial-fleet-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
