export interface './finance/capital-structure-optimization-calculator/capital-structure-optimization-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/capital-structure-optimization-calculator/capital-structure-optimization-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/capital-structure-optimization-calculator/capital-structure-optimization-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/capital-structure-optimization-calculator/capital-structure-optimization-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
