export interface './legal/flood-risk-zonal-pricing-calculator/flood_risk_zonal_pricing_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/flood-risk-zonal-pricing-calculator/flood_risk_zonal_pricing_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/flood-risk-zonal-pricing-calculator/flood_risk_zonal_pricing_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/flood-risk-zonal-pricing-calculator/flood_risk_zonal_pricing_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
