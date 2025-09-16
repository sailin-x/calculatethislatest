export interface AnnuityBuyoutInputs {
  // Current Annuity Information
  currentAnnuityValue: number;
  monthlyPayment: number;
  remainingPayments: number;
  interestRate: number;

  // Buyout Offer
  buyoutOffer: number;
  buyoutFees: number;
  buyoutTaxes: number;

  // Alternative Investment
  alternativeInvestmentRate: number;
  alternativeInvestmentFees: number;
  timeHorizon: number;

  // Personal Information
  age: number;
  taxBracket: number;
  riskTolerance: 'low' | 'medium' | 'high';

  // Analysis Options
  includeInflation: boolean;
  inflationRate: number;
  discountRate: number;
}

export interface AnnuityBuyoutResults {
  // Current Annuity Value
  presentValueOfRemainingPayments: number;
  totalValueReceived: number;
  netBuyoutValue: number;

  // Buyout Analysis
  buyoutVsPresentValue: number;
  buyoutEfficiency: number;
  breakEvenPeriod: number;

  // Alternative Investment Analysis
  alternativeInvestmentValue: number;
  alternativeVsBuyout: number;
  riskAdjustedReturn: number;

  // Tax Analysis
  taxSavings: number;
  afterTaxBuyoutValue: number;
  afterTaxAlternativeValue: number;

  // Recommendations
  recommendation: string;
  confidenceLevel: string;
  nextSteps: string[];
  warnings: string[];
}