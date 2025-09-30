export interface './legalinsurancesettlements/insurancehub/premium-deficiency-reserve-pdr-calculator/premium_deficiency_reserve_pdr_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/premium-deficiency-reserve-pdr-calculator/premium_deficiency_reserve_pdr_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/premium-deficiency-reserve-pdr-calculator/premium_deficiency_reserve_pdr_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/premium-deficiency-reserve-pdr-calculator/premium_deficiency_reserve_pdr_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
