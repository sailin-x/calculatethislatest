export interface HotelFeasibilityADRCalculatorInputs {
  propertyAddress: string;
  hotelBrand: string;
  marketLocation: string;
  numberOfRooms: number;
  constructionCostPerRoom: number;
  landCost: number;
  operatingCostsPerRoom: number;
  expectedADR: number;
  expectedOccupancyRate: number;
  financingRate: number;
  loanToValueRatio: number;
  analysisPeriod: number;
  inflationRate: number;
  discountRate: number;
}

export interface HotelFeasibilityADRCalculatorOutputs {
  totalInvestment: number;
  annualRevenue: number;
  annualOperatingCosts: number;
  annualNetIncome: number;
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
  feasibilityScore: number;
  recommendation: string;
}
