export interface './legalinsurancesettlements/insurancehub/commercial-fleet-insurance-premium-estimator/commercial_fleet_insurance_premium_estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/commercial-fleet-insurance-premium-estimator/commercial_fleet_insurance_premium_estimator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/commercial-fleet-insurance-premium-estimator/commercial_fleet_insurance_premium_estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/commercial-fleet-insurance-premium-estimator/commercial_fleet_insurance_premium_estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
