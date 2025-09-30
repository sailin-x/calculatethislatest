export interface './business/it-outsourcing-vs-in-house-calculator/it-outsourcing-vs-in-house-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/it-outsourcing-vs-in-house-calculator/it-outsourcing-vs-in-house-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/it-outsourcing-vs-in-house-calculator/it-outsourcing-vs-in-house-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/it-outsourcing-vs-in-house-calculator/it-outsourcing-vs-in-house-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
