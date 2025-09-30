export interface './legalinsurancesettlements/insurancehub/general-liability-insurance-calculator/general-liability-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/general-liability-insurance-calculator/general-liability-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/general-liability-insurance-calculator/general-liability-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/general-liability-insurance-calculator/general-liability-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
