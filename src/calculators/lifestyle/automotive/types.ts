export interface AutomotiveCalculatorInputs {
  vehicleType: 'car' | 'truck' | 'suv' | 'motorcycle' | 'electric' | 'hybrid';
  purchasePrice: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
  tradeInValue: number;
  salesTax: number;
  registrationFee: number;
  annualMileage: number;
  fuelEfficiency: number;
  fuelPrice: number;
  insuranceCost: number;
  maintenanceCost: number;
  depreciationRate: number;
}

export interface AutomotiveCalculatorMetrics {
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  costPerMile: number;
  breakEvenPoint: number;
  depreciation: number;
  fuelCost: number;
  insuranceCost: number;
  maintenanceCost: number;
}

export interface AutomotiveCalculatorAnalysis {
  affordabilityRating: string;
  fuelEfficiency: string;
  totalOwnershipCost: string;
  recommendations: string[];
}

export interface AutomotiveCalculatorOutputs {
  monthlyPayment: number;
  totalCost: number;
  costPerMile: number;
  analysis: AutomotiveCalculatorAnalysis;
}
