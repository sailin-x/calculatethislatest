export interface RentVsBuyInputs {
  // Renting costs
  monthlyRent: number;
  annualRentIncrease: number;
  rentersInsurance: number;
  securityDeposit: number;

  // Buying costs
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;
  maintenanceCost: number;
  closingCosts: number;

  // Investment assumptions
  expectedAppreciation: number;
  investmentReturn: number;
  analysisPeriod: number;
  marginalTaxRate: number;
}

export interface RentVsBuyResults {
  // Renting scenario
  totalRentingCost: number;
  monthlyRentingCost: number;
  annualRentingCost: number;

  // Buying scenario
  totalBuyingCost: number;
  monthlyBuyingCost: number;
  annualBuyingCost: number;
  totalMortgagePayment: number;
  totalEquityBuilt: number;
  totalAppreciation: number;

  // Comparison
  costDifference: number;
  breakEvenYears: number;
  rentVsBuyRatio: number;
  netAdvantage: string;
  recommendation: string;

  // Investment analysis
  opportunityCost: number;
  netWorthDifference: number;
  roiDifference: number;
}