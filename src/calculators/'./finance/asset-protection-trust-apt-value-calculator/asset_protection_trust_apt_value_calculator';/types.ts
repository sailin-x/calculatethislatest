export interface './finance/asset-protection-trust-apt-value-calculator/asset_protection_trust_apt_value_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/asset-protection-trust-apt-value-calculator/asset_protection_trust_apt_value_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/asset-protection-trust-apt-value-calculator/asset_protection_trust_apt_value_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/asset-protection-trust-apt-value-calculator/asset_protection_trust_apt_value_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
