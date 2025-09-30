export interface './legalinsurancesettlements/insurancehub/life-insurance-needs-calculator/life_insurance_needs_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/life-insurance-needs-calculator/life_insurance_needs_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/life-insurance-needs-calculator/life_insurance_needs_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/life-insurance-needs-calculator/life_insurance_needs_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
