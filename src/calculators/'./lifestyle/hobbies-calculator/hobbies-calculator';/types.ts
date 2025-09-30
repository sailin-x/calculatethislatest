export interface './lifestyle/hobbies-calculator/hobbies-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/hobbies-calculator/hobbies-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/hobbies-calculator/hobbies-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/hobbies-calculator/hobbies-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
