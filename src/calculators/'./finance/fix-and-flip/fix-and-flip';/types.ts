export interface './finance/fix-and-flip/fix-and-flip';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/fix-and-flip/fix-and-flip';Results {
  result: number;
  analysis?: string;
}

export interface './finance/fix-and-flip/fix-and-flip';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/fix-and-flip/fix-and-flip';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
