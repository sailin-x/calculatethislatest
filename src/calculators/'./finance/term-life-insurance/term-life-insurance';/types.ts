export interface './finance/term-life-insurance/term-life-insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/term-life-insurance/term-life-insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/term-life-insurance/term-life-insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/term-life-insurance/term-life-insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
