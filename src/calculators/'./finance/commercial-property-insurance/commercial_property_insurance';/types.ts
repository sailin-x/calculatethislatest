export interface './finance/commercial-property-insurance/commercial_property_insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-property-insurance/commercial_property_insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-property-insurance/commercial_property_insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-property-insurance/commercial_property_insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
