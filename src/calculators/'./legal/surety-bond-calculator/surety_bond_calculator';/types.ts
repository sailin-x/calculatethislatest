export interface './legal/surety-bond-calculator/surety_bond_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/surety-bond-calculator/surety_bond_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/surety-bond-calculator/surety_bond_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/surety-bond-calculator/surety_bond_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
