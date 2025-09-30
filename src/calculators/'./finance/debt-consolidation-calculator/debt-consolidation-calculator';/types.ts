export interface './finance/debt-consolidation-calculator/debt-consolidation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-consolidation-calculator/debt-consolidation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-consolidation-calculator/debt-consolidation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-consolidation-calculator/debt-consolidation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
