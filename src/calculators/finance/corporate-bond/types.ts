export interface CorporateBondInputs {
  faceValue: number;
  couponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  yieldToMaturity: number;
  couponFrequency: number;
  creditRating: string;
  taxRate: number;
  marketRiskPremium: number;
  beta: number;
  riskFreeRate: number;
}

export interface CorporateBondOutputs {
  currentYield: number;
  yieldToMaturity: number;
  duration: number;
  modifiedDuration: number;
  convexity: number;
  bondPrice: number;
  accruedInterest: number;
  totalValue: number;
  macaulayDuration: number;
  effectiveDuration: number;
  creditSpread: number;
  afterTaxYield: number;
  realYield: number;
  breakEvenYield: number;
  totalReturn: number;
  annualizedReturn: number;
  riskAdjustedReturn: number;
  sharpeRatio: number;
  creditRiskPremium: number;
  liquidityPremium: number;
  defaultProbability: number;
  recoveryRate: number;
  expectedLoss: number;
  valueAtRisk: number;
  creditRatingEquivalent: string;
  investmentGrade: boolean;
  junkBond: boolean;
  covenantQuality: string;
  seniorityLevel: string;
  collateralQuality: string;
  diversificationBenefit: number;
  correlationWithMarket: number;
  betaAdjustedYield: number;
  inflationAdjustedYield: number;
  purchasingPowerReturn: number;
  taxEfficiency: number;
  afterTaxRealYield: number;
  breakevenInflationRate: number;
  durationGap: number;
  convexityAdjustment: number;
  optionAdjustedSpread: number;
  zSpread: number;
  gSpread: number;
  iSpread: number;
  assetSwapSpread: number;
  basisPointValue: number;
  priceValueOfBasisPoint: number;
  dollarDuration: number;
  dollarConvexity: number;
  keyRateDuration: number[];
  scenarioAnalysis: {
    rateUp100bps: number;
    rateDown100bps: number;
    rateUp200bps: number;
    rateDown200bps: number;
  };
  stressTestResults: {
    severeRecession: number;
    mildRecession: number;
    normalConditions: number;
    strongGrowth: number;
    hyperinflation: number;
  };
  monteCarloSimulation: {
    meanReturn: number;
    standardDeviation: number;
    var95: number;
    var99: number;
    expectedShortfall: number;
    probabilityOfLoss: number;
  };
  sensitivityAnalysis: {
    yieldSensitivity: number;
    creditSpreadSensitivity: number;
    liquiditySensitivity: number;
    inflationSensitivity: number;
  };
  comparativeAnalysis: {
    vsTreasury: number;
    vsCorporateIndex: number;
    vsPeerGroup: number;
    vsHighYield: number;
  };
  riskMetrics: {
    totalRisk: number;
    systematicRisk: number;
    unsystematicRisk: number;
    creditRisk: number;
    interestRateRisk: number;
    liquidityRisk: number;
    inflationRisk: number;
    currencyRisk: number;
    sovereignRisk: number;
  };
  performanceMetrics: {
    totalReturnYtd: number;
    totalReturn1yr: number;
    totalReturn3yr: number;
    totalReturn5yr: number;
    annualizedReturn1yr: number;
    annualizedReturn3yr: number;
    annualizedReturn5yr: number;
    sharpeRatio1yr: number;
    sharpeRatio3yr: number;
    sharpeRatio5yr: number;
    maxDrawdown: number;
    volatility: number;
    alpha: number;
    beta: number;
    rSquared: number;
    informationRatio: number;
    trackingError: number;
  };
  cashFlowAnalysis: {
    nextCouponPayment: number;
    nextCouponDate: string;
    couponSchedule: Array<{ date: string; amount: number }>;
    principalPayment: number;
    principalPaymentDate: string;
    totalCashFlows: number;
    averageCashFlow: number;
    cashFlowDuration: number;
    cashFlowConvexity: number;
  };
  taxAnalysis: {
    taxableEquivalentYield: number;
    taxAdvantagedYield: number;
    taxEfficiencyRatio: number;
    afterTaxDuration: number;
    taxLossHarvesting: number;
    municipalBondEquivalent: number;
  };
  regulatoryCompliance: {
    secCompliance: boolean;
    finraCompliance: boolean;
    investmentCompanyAct: boolean;
    erisaCompliance: boolean;
    doddFrankCompliance: boolean;
    volckerRuleCompliance: boolean;
  };
  environmentalMetrics: {
    carbonFootprint: number;
    esgScore: number;
    sustainabilityRating: string;
    greenBond: boolean;
    socialBond: boolean;
    sustainabilityBond: boolean;
  };
}