export interface RetirementAbroadInputs {
  currentAnnualIncome: number;
  currentAnnualExpenses: number;
  targetCountry: string;
  currentCountry: string;
  yearsToRetirement: number;
  expectedInflationRate: number;
  expectedInvestmentReturn: number;
  currentSavings: number;
  monthlyRetirementContribution: number;
  costOfLivingAdjustment: number;
  healthcareCosts: number;
  housingCosts: number;
  transportationCosts: number;
  foodCosts: number;
  entertainmentCosts: number;
  taxRate: number;
  exchangeRate: number;
}

export interface RetirementAbroadOutputs {
  totalSavingsAtRetirement: number;
  annualRetirementIncome: number;
  annualRetirementExpenses: number;
  retirementGap: number;
  monthlyShortfall: number;
  yearsSavingsWillLast: number;
  requiredMonthlyContribution: number;
  costOfLivingComparison: number;
  purchasingPowerParity: number;
  taxSavings: number;
  feasibilityScore: number;
}