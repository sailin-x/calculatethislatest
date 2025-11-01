export interface peer_to_peer_lending_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface peer_to_peer_lending_calculatorResults {
  result: number;
  analysis?: string;
}

export interface peer_to_peer_lending_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface peer_to_peer_lending_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
