export interface AutoLoanCalculatorInputs {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  loanTermYears: number;
  interestRate: number;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  currentMileage: number;
  fuelEfficiency: number; // MPG
  annualMileage: number;
  fuelPricePerGallon: number;
  extendedWarrantyCost: number;
  extendedWarrantyYears: number;
  salesTaxRate: number;
  otherFees: number;
  creditScore: number;
}

export interface VehicleDepreciationData {
  year: number;
  value: number;
  depreciation: number;
  depreciationRate: number;
}

export interface FuelCostAnalysis {
  monthlyFuelCost: number;
  annualFuelCost: number;
  totalFuelCostOverLoan: number;
  fuelCostSavingsVsAverage: number;
}

export interface TradeInAnalysis {
  currentTradeInValue: number;
  projectedTradeInValue: number;
  tradeInLoss: number;
  tradeInLossPercentage: number;
}

export interface WarrantyAnalysis {
  monthlyWarrantyCost: number;
  totalWarrantyCost: number;
  warrantyValue: number;
  netWarrantyCost: number;
}

export interface AutoLoanCalculatorOutputs {
  loanAmount: number;
  monthlyPayment: number;
  totalLoanPayments: number;
  totalInterestPaid: number;
  totalCost: number;
  effectiveInterestRate: number;
  vehicleDepreciationSchedule: VehicleDepreciationData[];
  fuelCostAnalysis: FuelCostAnalysis;
  tradeInAnalysis: TradeInAnalysis;
  warrantyAnalysis: WarrantyAnalysis;
  breakEvenPoint: number; // months
  totalOwnershipCost: number;
  costPerMile: number;
}
