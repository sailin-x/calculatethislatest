export interface './math/database-calculator/database-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/database-calculator/database-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/database-calculator/database-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/database-calculator/database-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
