export interface './legal/incurred-but-not-reported-calculator/incurred-but-not-reported-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/incurred-but-not-reported-calculator/incurred-but-not-reported-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/incurred-but-not-reported-calculator/incurred-but-not-reported-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/incurred-but-not-reported-calculator/incurred-but-not-reported-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
