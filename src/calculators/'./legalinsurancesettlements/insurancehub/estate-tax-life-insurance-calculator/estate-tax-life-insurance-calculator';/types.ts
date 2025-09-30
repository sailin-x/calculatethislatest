export interface './legalinsurancesettlements/insurancehub/estate-tax-life-insurance-calculator/estate-tax-life-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/estate-tax-life-insurance-calculator/estate-tax-life-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/estate-tax-life-insurance-calculator/estate-tax-life-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/estate-tax-life-insurance-calculator/estate-tax-life-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
