export interface './math/data-science-calculator/data-science-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/data-science-calculator/data-science-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/data-science-calculator/data-science-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/data-science-calculator/data-science-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
