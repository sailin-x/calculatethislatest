export interface './business/bill-of-materials-calculator/bill_of_materials_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/bill-of-materials-calculator/bill_of_materials_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/bill-of-materials-calculator/bill_of_materials_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/bill-of-materials-calculator/bill_of_materials_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
