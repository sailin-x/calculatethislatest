export interface './career/developer-salary/developer-salary';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './career/developer-salary/developer-salary';Results {
  result: number;
  analysis?: string;
}

export interface './career/developer-salary/developer-salary';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './career/developer-salary/developer-salary';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
