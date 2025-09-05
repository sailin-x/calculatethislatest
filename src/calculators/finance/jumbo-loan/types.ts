export interface JumboLoanInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // years
  loanType: 'fixed' | 'adjustable' | 'hybrid';
  downPayment: number;
  loanToValueRatio: number;
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'primary_residence' | 'second_home' | 'investment';
  propertyState: string;
  propertyCounty: string;
  
  // Borrower Information
  creditScore: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  debtToIncomeRatio: number;
  annualIncome: number;
  employmentType: 'w2' | 'self_employed' | 'business_owner' | 'retired';
  employmentLength: number; // years
  
  // Financial Information
  liquidAssets: number;
  reserves: number; // months of payments
  otherProperties: number;
  existingDebt: number;
  
  // Jumbo Loan Specifics
  conformingLimit: number; // FHFA limit for the area
  jumboAmount: number; // amount above conforming limit
  jumboPremium: number; // additional rate for jumbo portion
  
  // Additional Costs
  propertyTaxes: number; // annual
  homeownersInsurance: number; // annual
  privateMortgageInsurance: number; // annual
  hoaFees: number; // annual
  otherMonthlyExpenses: number; // annual
  
  // Loan Features
  interestOnlyOption: boolean;
  interestOnlyPeriod: number; // years
  prepaymentPenalty: boolean;
  prepaymentPenaltyPeriod: number; // years
  rateLockPeriod: number; // days
  
  // Qualification Requirements
  minimumCreditScore: number;
  maximumDTI: number;
  minimumReserves: number; // months
  maximumLTV: number;
  
  // Market Conditions
  marketConditions: 'favorable' | 'neutral' | 'challenging';
  rateEnvironment: 'low' | 'moderate' | 'high' | 'rising';
  competitionLevel: 'low' | 'moderate' | 'high';
}

export interface JumboLoanOutputs {
  // Payment Analysis
  monthlyPayment: number;
  annualPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPrincipal: number;
  
  // Jumbo Loan Analysis
  conformingPortion: number;
  jumboPortion: number;
  jumboPremiumCost: number;
  blendedRate: number;
  
  // Qualification Analysis
  qualificationStatus: 'qualified' | 'marginal' | 'not_qualified';
  qualificationFactors: string[];
  qualificationRecommendations: string[];
  
  // Cost Analysis
  totalLoanCost: number;
  costPerThousand: number;
  effectiveRate: number;
  breakEvenPoint: number; // months
  
  // Comparison Analysis
  conformingLoanComparison: {
    conformingPayment: number;
    jumboPayment: number;
    paymentDifference: number;
    totalCostDifference: number;
    breakEvenMonths: number;
  };
  
  // Risk Assessment
  riskFactors: string[];
  riskMitigationStrategies: string[];
  overallRiskScore: number; // 1-100 scale
  
  // Alternative Options
  alternativeOptions: {
    conformingLoan: {
      maxAmount: number;
      payment: number;
      totalCost: number;
      pros: string[];
      cons: string[];
    };
    piggybackLoan: {
      firstMortgage: number;
      secondMortgage: number;
      combinedPayment: number;
      totalCost: number;
      pros: string[];
      cons: string[];
    };
    portfolioLoan: {
      payment: number;
      totalCost: number;
      pros: string[];
      cons: string[];
    };
  };
  
  // Refinancing Analysis
  refinancingAnalysis: {
    shouldConsiderRefinancing: boolean;
    refinanceTriggers: string[];
    refinanceBenefits: string[];
    refinanceCosts: number;
  };
  
  // Tax Implications
  taxImplications: {
    annualInterestDeduction: number;
    estimatedTaxSavings: number;
    netAfterTaxCost: number;
    taxBenefitRatio: number;
  };
  
  // Recommendations
  recommendations: {
    loanSuitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable';
    keyRecommendations: string[];
    optimizationStrategies: string[];
    riskWarnings: string[];
  };
  
  // Summary
  summary: {
    totalLoanAmount: number;
    monthlyPayment: number;
    totalLoanCost: number;
    keyBenefits: string[];
    keyRisks: string[];
    nextSteps: string[];
  };
}