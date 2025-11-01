export interface ConvertibleBondPricingInputs {
  faceValue: number;
  couponRate: number;
  maturityYears: number;
  conversionRatio: number;
  currentStockPrice: number;
  riskFreeRate: number;
  creditSpread: number;
  dividendYield: number;
  volatility: number;
  conversionPremium?: number;
  callPrice?: number;
  putPrice?: number;
  marketPrice?: number;
  timeToMaturity?: number;
}

export interface ConvertibleBondPricingOutputs {
  straightBondValue: number;
  conversionValue: number;
  theoreticalValue: number;
  parityPrice: number;
  conversionPremium: number;
  conversionPremiumPercentage: number;
  breakevenStockPrice: number;
  currentYield: number;
  yieldToMaturity: number;
  yieldToCall: number;
  yieldToPut: number;
  duration: number;
  convexity: number;
  delta: number;
  gamma: number;
  vega: number;
  rho: number;
  creditRisk: number;
  interestRateRisk: number;
  equityRisk: number;
}