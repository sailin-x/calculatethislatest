export interface MortgageVsRentInputs {
  // Property details
  propertyValue: number;
  downPayment: number;
  loanTerm: number; // years
  interestRate: number;

  // Rent details
  monthlyRent: number;
  annualRentIncrease: number; // percentage

  // Ownership costs
  annualPropertyTaxes: number;
  annualHomeownersInsurance: number;
  monthlyHOAFees: number;
  annualMaintenance: number; // percentage of property value
  closingCosts: number;

  // Investment details
  expectedHomeAppreciation: number; // annual percentage
  alternativeInvestmentReturn: number; // annual percentage for rent savings
  marginalTaxRate: number; // for tax deductions

  // Time horizon
  analysisPeriod: number; // years

  // Additional factors
  oneTimeMovingCosts: number;
  rentDeposit: number;
  mortgagePoints: number;
  mortgageOriginationFees: number;
}

export interface MortgageVsRentOutputs {
  // Monthly cash flow comparison
  monthlyOwnershipCost: number;
  monthlyRentCost: number;
  monthlyCashFlowDifference: number;

  // Total cost comparison
  totalOwnershipCost: number;
  totalRentCost: number;
  netCostDifference: number;

  // Equity and investment comparison
  homeEquityBuilt: number;
  investmentFromRentSavings: number;
  netWealthDifference: number;

  // Break-even analysis
  breakEvenYears: number;
  breakEvenMonths: number;

  // Financial metrics
  netPresentValue: number;
  internalRateOfReturn: number;
  ownershipVsRentRatio: number;

  // Tax benefits
  annualTaxSavings: number;
  totalTaxSavings: number;

  // Sensitivity analysis
  sensitivityAnalysis: {
    appreciationChange: number; // percentage point change
    impact: number; // dollar impact
    recommendation: string;
  }[];

  // Scenario analysis
  conservativeScenario: {
    netCost: number;
    recommendation: string;
  };
  expectedScenario: {
    netCost: number;
    recommendation: string;
  };
  optimisticScenario: {
    netCost: number;
    recommendation: string;
  };

  // Recommendations
  primaryRecommendation: 'Buy' | 'Rent' | 'Depends on circumstances';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyFactors: string[];
  alternativeConsiderations: string[];

  // Detailed breakdowns
  yearlyBreakdown: {
    year: number;
    ownershipCost: number;
    rentCost: number;
    equityBuilt: number;
    investmentGrowth: number;
    netPosition: number;
  }[];

  costComparison: {
    category: string;
    ownership: number;
    renting: number;
    difference: number;
  }[];
}