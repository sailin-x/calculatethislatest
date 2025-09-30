export interface './math/scientific';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/scientific';Results {
  result: number;
  analysis?: string;
}

export interface './math/scientific';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/scientific';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
