export interface RentersInsuranceInputs {
  monthlyRent: number;
  annualRentIncrease: number;
  coverageYears: number;
  personalPropertyValue: number;
  liabilityCoverage: number;
  deductibleAmount: number;
  insurancePremium: number;
  inflationRate: number;
  discountRate: number;
  replacementCostCoverage: boolean;
  additionalLivingExpenses: boolean;
  aleCoverageDays: number;
  aleDailyRate: number;
}

export interface RentersInsuranceResults {
  totalInsuranceCost: number;
  averageAnnualPremium: number;
  totalRentPaid: number;
  totalRentIncrease: number;
  netPresentValue: number;
  insuranceCostPercentage: number;
  monthlyInsuranceCost: number;
  annualInsuranceCost: number;
  totalLiabilityCoverage: number;
  totalPersonalPropertyCoverage: number;
  aleCoverageAmount: number;
  costPerThousandCoverage: number;
  breakEvenPoint: number;
  returnOnInsurance: number;
}