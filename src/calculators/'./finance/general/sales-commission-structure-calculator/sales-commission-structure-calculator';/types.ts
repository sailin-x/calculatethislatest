export interface './finance/general/sales-commission-structure-calculator/sales-commission-structure-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/sales-commission-structure-calculator/sales-commission-structure-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/sales-commission-structure-calculator/sales-commission-structure-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/sales-commission-structure-calculator/sales-commission-structure-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
