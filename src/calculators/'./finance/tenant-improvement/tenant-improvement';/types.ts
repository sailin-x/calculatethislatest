export interface './finance/tenant-improvement/tenant-improvement';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/tenant-improvement/tenant-improvement';Results {
  result: number;
  analysis?: string;
}

export interface './finance/tenant-improvement/tenant-improvement';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/tenant-improvement/tenant-improvement';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
