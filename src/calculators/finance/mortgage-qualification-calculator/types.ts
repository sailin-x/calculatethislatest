export interface MortgageQualificationInputs {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  creditScore: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  propertyValue: number;
  loanTerm: number;
  interestRate: number;
  monthlyIncome: number;
  employmentType: 'employed' | 'self_employed' | 'retired' | 'unemployed';
  employmentLength: number; // months
  bankruptcyHistory: boolean;
  foreclosureHistory: boolean;
  latePayments: number;
  giftFunds: number;
  coSigner: boolean;
  coSignerIncome?: number;
  coSignerCreditScore?: number;
  rentalIncome?: number;
  alimonyIncome?: number;
  childSupportIncome?: number;
  commissionIncome?: number;
  bonusIncome?: number;
  overtimeIncome?: number;
  otherIncome?: number;
  monthlyRent?: number;
  hoaFees?: number;
  propertyTaxes?: number;
  homeownersInsurance?: number;
  floodInsurance?: number;
  mortgageInsurance?: number;
  childCareExpenses?: number;
  educationExpenses?: number;
  medicalExpenses?: number;
  transportationExpenses?: number;
  foodExpenses?: number;
  utilitiesExpenses?: number;
  entertainmentExpenses?: number;
  otherExpenses?: number;
  numberOfDependents: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  spouseIncome?: number;
  spouseDebts?: number;
  assets: {
    checking: number;
    savings: number;
    investments: number;
    retirement: number;
    other: number;
  };
  debts: {
    creditCards: number;
    carLoans: number;
    studentLoans: number;
    personalLoans: number;
    other: number;
  };
}

export interface MortgageQualificationOutputs {
  preQualificationAmount: number;
  debtToIncomeRatio: number;
  frontEndRatio: number;
  backEndRatio: number;
  loanToValueRatio: number;
  qualificationStatus: 'Strong' | 'Good' | 'Fair' | 'Poor' | 'Not Qualified';
  maximumLoanAmount: number;
  minimumDownPayment: number;
  estimatedMonthlyPayment: number;
  affordabilityAnalysis: {
    housingAffordability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    overallAffordability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    monthlySurplus: number;
    annualSurplus: number;
  };
  creditAnalysis: {
    creditScoreRating: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
    riskFactors: string[];
    improvementSuggestions: string[];
  };
  incomeAnalysis: {
    totalMonthlyIncome: number;
    incomeStability: 'High' | 'Medium' | 'Low';
    incomeSources: string[];
    incomeVerification: string[];
  };
  debtAnalysis: {
    totalMonthlyDebts: number;
    debtToIncomeRatio: number;
    debtComposition: {
      housing: number;
      consumer: number;
      installment: number;
    };
    debtReductionSuggestions: string[];
  };
  assetAnalysis: {
    totalAssets: number;
    liquidAssets: number;
    downPaymentCoverage: number;
    reserveRequirements: number;
    assetSufficiency: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  loanOptions: {
    conventional: {
      qualified: boolean;
      maxLoanAmount: number;
      requiredDownPayment: number;
      estimatedRate: number;
    };
    fha: {
      qualified: boolean;
      maxLoanAmount: number;
      requiredDownPayment: number;
      estimatedRate: number;
    };
    va: {
      qualified: boolean;
      maxLoanAmount: number;
      requiredDownPayment: number;
      estimatedRate: number;
    };
    usda: {
      qualified: boolean;
      maxLoanAmount: number;
      requiredDownPayment: number;
      estimatedRate: number;
    };
  };
  improvementStrategies: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
    expectedImpact: {
      creditScoreImprovement: number;
      additionalLoanAmount: number;
      lowerInterestRate: number;
    };
  };
  nextSteps: string[];
  riskAssessment: {
    overallRisk: 'Low' | 'Medium' | 'High';
    riskFactors: string[];
    mitigationStrategies: string[];
  };
}