export interface MortgageLifeInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyValue: number;
  borrowerAge: number;
  borrowerLifeExpectancy: number;
  spouseAge?: number;
  spouseLifeExpectancy?: number;
  monthlyPayment: number;
  propertyAppreciationRate: number;
  inflationRate: number;
  discountRate: number;
  analysisPeriod: number;
  includeSpouse: boolean;
  lifeInsuranceCoverage?: number;
  estatePlanningConsiderations: boolean;
  childrenCount: number;
  childrenAges: number[];
  collegeFundNeeded: number;
  retirementSavings: number;
  otherDebts: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface MortgageLifeOutputs {
  loanPayoffAge: number;
  loanPayoffYear: number;
  totalPayments: number;
  totalInterest: number;
  remainingBalanceAtDeath: number;
  equityAtDeath: number;
  lifeInsuranceRecommendation: {
    recommendedCoverage: number;
    monthlyPremium: number;
    annualPremium: number;
    rationale: string;
  };
  estateImpact: {
    heirsReceive: number;
    mortgageDebt: number;
    netInheritance: number;
    recommendations: string[];
  };
  survivorScenarios: {
    borrowerDiesFirst: {
      survivingSpouseIncome: number;
      survivingSpouseExpenses: number;
      mortgageStress: 'Low' | 'Medium' | 'High';
      recommendations: string[];
    };
    spouseDiesFirst: {
      survivingBorrowerIncome: number;
      survivingBorrowerExpenses: number;
      mortgageStress: 'Low' | 'Medium' | 'High';
      recommendations: string[];
    };
  };
  longTermProjections: {
    year: number;
    age: number;
    loanBalance: number;
    propertyValue: number;
    equity: number;
    cumulativePayments: number;
  }[];
  riskAnalysis: {
    longevityRisk: 'Low' | 'Medium' | 'High';
    marketRisk: 'Low' | 'Medium' | 'High';
    inflationRisk: 'Low' | 'Medium' | 'High';
    overallRisk: 'Low' | 'Medium' | 'High';
    mitigationStrategies: string[];
  };
  financialPlanning: {
    recommendedActions: string[];
    insuranceNeeds: string[];
    estatePlanning: string[];
    priorityOrder: string[];
  };
}