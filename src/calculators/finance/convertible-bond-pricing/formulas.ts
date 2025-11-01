import { ConvertibleBondPricingInputs, ConvertibleBondPricingOutputs } from './types';

// Calculate straight bond value using discounted cash flow
export function calculateStraightBondValue(inputs: ConvertibleBondPricingInputs): number {
  const { faceValue, couponRate, maturityYears, riskFreeRate, creditSpread } = inputs;
  const annualCoupon = faceValue * couponRate;
  const discountRate = riskFreeRate + creditSpread;
  const timeToMaturity = inputs.timeToMaturity || maturityYears;

  if (timeToMaturity <= 0) return faceValue;

  // Present value of coupons
  let pvCoupons = 0;
  for (let t = 1; t <= Math.floor(timeToMaturity); t++) {
    pvCoupons += annualCoupon / Math.pow(1 + discountRate, t);
  }

  // Present value of face value
  const pvFaceValue = faceValue / Math.pow(1 + discountRate, timeToMaturity);

  return pvCoupons + pvFaceValue;
}

// Calculate conversion value
export function calculateConversionValue(inputs: ConvertibleBondPricingInputs): number {
  return inputs.conversionRatio * inputs.currentStockPrice;
}

// Calculate parity price (theoretical conversion price)
export function calculateParityPrice(inputs: ConvertibleBondPricingInputs): number {
  return inputs.faceValue / inputs.conversionRatio;
}

// Calculate conversion premium
export function calculateConversionPremium(inputs: ConvertibleBondPricingInputs): number {
  const conversionValue = calculateConversionValue(inputs);
  const straightBondValue = calculateStraightBondValue(inputs);
  return Math.max(0, conversionValue - straightBondValue);
}

// Calculate conversion premium percentage
export function calculateConversionPremiumPercentage(inputs: ConvertibleBondPricingInputs): number {
  const conversionPremium = calculateConversionPremium(inputs);
  const straightBondValue = calculateStraightBondValue(inputs);
  return straightBondValue > 0 ? (conversionPremium / straightBondValue) * 100 : 0;
}

// Calculate breakeven stock price for conversion
export function calculateBreakevenStockPrice(inputs: ConvertibleBondPricingInputs): number {
  const marketPrice = inputs.marketPrice || calculateTheoreticalValue(inputs);
  return marketPrice / inputs.conversionRatio;
}

// Calculate theoretical value (maximum of straight bond value and conversion value)
export function calculateTheoreticalValue(inputs: ConvertibleBondPricingInputs): number {
  const straightBondValue = calculateStraightBondValue(inputs);
  const conversionValue = calculateConversionValue(inputs);
  return Math.max(straightBondValue, conversionValue);
}

// Calculate current yield
export function calculateCurrentYield(inputs: ConvertibleBondPricingInputs): number {
  const marketPrice = inputs.marketPrice || calculateTheoreticalValue(inputs);
  return marketPrice > 0 ? (inputs.faceValue * inputs.couponRate / marketPrice) * 100 : 0;
}

// Calculate yield to maturity approximation
export function calculateYieldToMaturity(inputs: ConvertibleBondPricingInputs): number {
  const marketPrice = inputs.marketPrice || calculateTheoreticalValue(inputs);
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  if (timeToMaturity <= 0 || marketPrice <= 0) return 0;

  // Simplified YTM calculation using approximation
  const annualCoupon = inputs.faceValue * inputs.couponRate;
  const ytm = ((annualCoupon + (inputs.faceValue - marketPrice) / timeToMaturity)) /
               ((inputs.faceValue + marketPrice) / 2)) * 100;

  return ytm;
}

// Calculate yield to call
export function calculateYieldToCall(inputs: ConvertibleBondPricingInputs): number {
  if (!inputs.callPrice) return 0;

  const marketPrice = inputs.marketPrice || calculateTheoreticalValue(inputs);
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  if (timeToMaturity <= 0 || marketPrice <= 0) return 0;

  // Simplified YTC calculation
  const annualCoupon = inputs.faceValue * inputs.couponRate;
  const ytc = ((annualCoupon + (inputs.callPrice - marketPrice) / timeToMaturity)) /
               ((inputs.callPrice + marketPrice) / 2)) * 100;

  return ytc;
}

// Calculate yield to put
export function calculateYieldToPut(inputs: ConvertibleBondPricingInputs): number {
  if (!inputs.putPrice) return 0;

  const marketPrice = inputs.marketPrice || calculateTheoreticalValue(inputs);
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  if (timeToMaturity <= 0 || marketPrice <= 0) return 0;

  // Simplified YTP calculation
  const annualCoupon = inputs.faceValue * inputs.couponRate;
  const ytp = ((annualCoupon + (inputs.putPrice - marketPrice) / timeToMaturity)) /
               ((inputs.putPrice + marketPrice) / 2)) * 100;

  return ytp;
}

// Calculate duration approximation
export function calculateDuration(inputs: ConvertibleBondPricingInputs): number {
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;
  const ytm = calculateYieldToMaturity(inputs) / 100;

  if (ytm <= 0) return timeToMaturity;

  // Modified duration approximation
  return timeToMaturity / (1 + ytm / 2);
}

// Calculate convexity approximation
export function calculateConvexity(inputs: ConvertibleBondPricingInputs): number {
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;
  const ytm = calculateYieldToMaturity(inputs) / 100;

  if (ytm <= 0) return 0;

  // Convexity approximation
  return (timeToMaturity * (timeToMaturity + 1)) / Math.pow(1 + ytm / 2, 2);
}

// Calculate delta (sensitivity to stock price)
export function calculateDelta(inputs: ConvertibleBondPricingInputs): number {
  const conversionValue = calculateConversionValue(inputs);
  const theoreticalValue = calculateTheoreticalValue(inputs);

  if (theoreticalValue <= 0) return 0;

  // Delta is approximately the conversion ratio when in-the-money
  return conversionValue >= theoreticalValue ? inputs.conversionRatio : 0;
}

// Calculate gamma (rate of change of delta)
export function calculateGamma(inputs: ConvertibleBondPricingInputs): number {
  // Simplified gamma calculation
  const volatility = inputs.volatility;
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  if (timeToMaturity <= 0 || volatility <= 0) return 0;

  return inputs.conversionRatio * volatility * Math.sqrt(timeToMaturity);
}

// Calculate vega (sensitivity to volatility)
export function calculateVega(inputs: ConvertibleBondPricingInputs): number {
  const theoreticalValue = calculateTheoreticalValue(inputs);
  const volatility = inputs.volatility;
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  if (theoreticalValue <= 0 || timeToMaturity <= 0) return 0;

  // Simplified vega calculation
  return theoreticalValue * volatility * Math.sqrt(timeToMaturity) * 0.01;
}

// Calculate rho (sensitivity to interest rates)
export function calculateRho(inputs: ConvertibleBondPricingInputs): number {
  const duration = calculateDuration(inputs);
  const theoreticalValue = calculateTheoreticalValue(inputs);

  if (theoreticalValue <= 0) return 0;

  return -duration * theoreticalValue * 0.01;
}

// Calculate credit risk
export function calculateCreditRisk(inputs: ConvertibleBondPricingInputs): number {
  const creditSpread = inputs.creditSpread;
  const timeToMaturity = inputs.timeToMaturity || inputs.maturityYears;

  // Simplified credit risk measure
  return creditSpread * Math.sqrt(timeToMaturity);
}

// Calculate interest rate risk
export function calculateInterestRateRisk(inputs: ConvertibleBondPricingInputs): number {
  return calculateDuration(inputs);
}

// Calculate equity risk
export function calculateEquityRisk(inputs: ConvertibleBondPricingInputs): number {
  const delta = calculateDelta(inputs);
  const volatility = inputs.volatility;

  return delta * volatility;
}

// Main convertible bond pricing calculation function
export function calculateConvertibleBondPricing(inputs: ConvertibleBondPricingInputs): ConvertibleBondPricingOutputs {
  const straightBondValue = calculateStraightBondValue(inputs);
  const conversionValue = calculateConversionValue(inputs);
  const theoreticalValue = calculateTheoreticalValue(inputs);
  const parityPrice = calculateParityPrice(inputs);
  const conversionPremium = calculateConversionPremium(inputs);
  const conversionPremiumPercentage = calculateConversionPremiumPercentage(inputs);
  const breakevenStockPrice = calculateBreakevenStockPrice(inputs);
  const currentYield = calculateCurrentYield(inputs);
  const yieldToMaturity = calculateYieldToMaturity(inputs);
  const yieldToCall = calculateYieldToCall(inputs);
  const yieldToPut = calculateYieldToPut(inputs);
  const duration = calculateDuration(inputs);
  const convexity = calculateConvexity(inputs);
  const delta = calculateDelta(inputs);
  const gamma = calculateGamma(inputs);
  const vega = calculateVega(inputs);
  const rho = calculateRho(inputs);
  const creditRisk = calculateCreditRisk(inputs);
  const interestRateRisk = calculateInterestRateRisk(inputs);
  const equityRisk = calculateEquityRisk(inputs);

  return {
    straightBondValue,
    conversionValue,
    theoreticalValue,
    parityPrice,
    conversionPremium,
    conversionPremiumPercentage,
    breakevenStockPrice,
    currentYield,
    yieldToMaturity,
    yieldToCall,
    yieldToPut,
    duration,
    convexity,
    delta,
    gamma,
    vega,
    rho,
    creditRisk,
    interestRateRisk,
    equityRisk
  };
}