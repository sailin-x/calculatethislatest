export interface './finance/bareboat-charter/bareboat_charter';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/bareboat-charter/bareboat_charter';Results {
  result: number;
  analysis?: string;
}

export interface './finance/bareboat-charter/bareboat_charter';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/bareboat-charter/bareboat_charter';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
