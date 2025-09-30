export interface peer_to_peer_lending_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface peer_to_peer_lending_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface peer_to_peer_lending_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface peer_to_peer_lending_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
