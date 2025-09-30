export interface './legal/term-vs-universal-life-calculator/term-vs-universal-life-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/term-vs-universal-life-calculator/term-vs-universal-life-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/term-vs-universal-life-calculator/term-vs-universal-life-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/term-vs-universal-life-calculator/term-vs-universal-life-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
