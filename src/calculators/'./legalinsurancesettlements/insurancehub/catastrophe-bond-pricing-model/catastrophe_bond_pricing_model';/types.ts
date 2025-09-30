export interface './legalinsurancesettlements/insurancehub/catastrophe-bond-pricing-model/catastrophe_bond_pricing_model';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/catastrophe-bond-pricing-model/catastrophe_bond_pricing_model';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/catastrophe-bond-pricing-model/catastrophe_bond_pricing_model';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/catastrophe-bond-pricing-model/catastrophe_bond_pricing_model';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
