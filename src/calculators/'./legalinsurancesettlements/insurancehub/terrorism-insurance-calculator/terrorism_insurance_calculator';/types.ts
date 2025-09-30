export interface './legalinsurancesettlements/insurancehub/terrorism-insurance-calculator/terrorism_insurance_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/terrorism-insurance-calculator/terrorism_insurance_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/terrorism-insurance-calculator/terrorism_insurance_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/terrorism-insurance-calculator/terrorism_insurance_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
