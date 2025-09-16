import { AnnuityBuyoutInputs, AnnuityBuyoutResults } from './types';

/**
 * Calculate annuity buyout analysis
 */
export function calculateAnnuityBuyout(inputs: AnnuityBuyoutInputs): AnnuityBuyoutResults {
  const {
    currentAnnuityValue,
    monthlyPayment,
    remainingPayments,
    interestRate,
    buyoutOffer,
    buyoutFees,
    buyoutTaxes,
    alternativeInvestmentRate,
    alternativeInvestmentFees,
    timeHorizon,
    age,
    taxBracket,
    riskTolerance,
    includeInflation,
    inflationRate,
    discountRate
  } = inputs;

  // Calculate present value of remaining annuity payments
  const presentValueOfRemainingPayments = calculatePresentValue(
    monthlyPayment,
    remainingPayments,
    interestRate / 100 / 12,
    includeInflation ? inflationRate / 100 : 0
  );

  // Calculate total value received from annuity
  const totalValueReceived = currentAnnuityValue + (monthlyPayment * remainingPayments);

  // Calculate net buyout value after fees and taxes
  const netBuyoutValue = buyoutOffer - buyoutFees - buyoutTaxes;

  // Calculate buyout vs present value comparison
  const buyoutVsPresentValue = netBuyoutValue - presentValueOfRemainingPayments;
  const buyoutEfficiency = presentValueOfRemainingPayments > 0 ?
    (netBuyoutValue / presentValueOfRemainingPayments) * 100 : 0;

  // Calculate break-even period
  const breakEvenPeriod = calculateBreakEvenPeriod(
    netBuyoutValue,
    presentValueOfRemainingPayments,
    monthlyPayment
  );

  // Calculate alternative investment value
  const alternativeInvestmentValue = calculateAlternativeInvestmentValue(
    netBuyoutValue,
    alternativeInvestmentRate / 100,
    timeHorizon,
    alternativeInvestmentFees
  );

  // Calculate alternative vs buyout comparison
  const alternativeVsBuyout = alternativeInvestmentValue - totalValueReceived;

  // Calculate risk-adjusted return
  const riskAdjustedReturn = calculateRiskAdjustedReturn(
    alternativeInvestmentValue,
    netBuyoutValue,
    riskTolerance,
    timeHorizon
  );

  // Calculate tax analysis
  const taxSavings = buyoutTaxes * (taxBracket / 100);
  const afterTaxBuyoutValue = netBuyoutValue - taxSavings;
  const afterTaxAlternativeValue = alternativeInvestmentValue * (1 - taxBracket / 100);

  // Generate recommendations
  const recommendation = generateRecommendation(inputs, buyoutVsPresentValue, alternativeVsBuyout);
  const confidenceLevel = generateConfidenceLevel(inputs, buyoutEfficiency);
  const nextSteps = generateNextSteps(inputs, recommendation);
  const warnings = generateWarnings(inputs, age, timeHorizon);

  return {
    presentValueOfRemainingPayments,
    totalValueReceived,
    netBuyoutValue,
    buyoutVsPresentValue,
    buyoutEfficiency,
    breakEvenPeriod,
    alternativeInvestmentValue,
    alternativeVsBuyout,
    riskAdjustedReturn,
    taxSavings,
    afterTaxBuyoutValue,
    afterTaxAlternativeValue,
    recommendation,
    confidenceLevel,
    nextSteps,
    warnings
  };
}

/**
 * Calculate present value of annuity payments
 */
function calculatePresentValue(
  monthlyPayment: number,
  remainingPayments: number,
  monthlyRate: number,
  inflationRate: number = 0
): number {
  if (monthlyPayment <= 0 || remainingPayments <= 0) return 0;

  const adjustedRate = monthlyRate - inflationRate;
  if (adjustedRate === 0) {
    return monthlyPayment * remainingPayments;
  }

  const presentValue = monthlyPayment * (1 - Math.pow(1 + adjustedRate, -remainingPayments)) / adjustedRate;
  return presentValue;
}

/**
 * Calculate break-even period for buyout
 */
function calculateBreakEvenPeriod(
  netBuyoutValue: number,
  presentValue: number,
  monthlyPayment: number
): number {
  if (monthlyPayment <= 0) return 0;

  const difference = netBuyoutValue - presentValue;
  if (difference >= 0) return 0; // Already profitable

  return Math.ceil(Math.abs(difference) / monthlyPayment);
}

/**
 * Calculate alternative investment value
 */
function calculateAlternativeInvestmentValue(
  principal: number,
  annualRate: number,
  years: number,
  fees: number
): number {
  if (principal <= 0 || years <= 0) return principal;

  const monthlyRate = annualRate / 12;
  const months = years * 12;
  const netPrincipal = principal - fees;

  const futureValue = netPrincipal * Math.pow(1 + monthlyRate, months);
  return futureValue;
}

/**
 * Calculate risk-adjusted return
 */
function calculateRiskAdjustedReturn(
  futureValue: number,
  principal: number,
  riskTolerance: string,
  timeHorizon: number
): number {
  if (principal <= 0) return 0;

  const totalReturn = (futureValue - principal) / principal * 100;

  // Adjust for risk tolerance
  let riskAdjustment = 1;
  switch (riskTolerance) {
    case 'low':
      riskAdjustment = 0.7;
      break;
    case 'medium':
      riskAdjustment = 0.85;
      break;
    case 'high':
      riskAdjustment = 1.0;
      break;
  }

  // Adjust for time horizon (longer horizons reduce risk)
  const timeAdjustment = Math.min(timeHorizon / 10, 1);

  return totalReturn * riskAdjustment * timeAdjustment;
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: AnnuityBuyoutInputs,
  buyoutVsPresentValue: number,
  alternativeVsBuyout: number
): string {
  const { age, timeHorizon, riskTolerance } = inputs;

  if (buyoutVsPresentValue > 0 && alternativeVsBuyout > 0) {
    return 'Strong recommendation to accept the buyout offer. The offer exceeds the present value of remaining payments and alternative investments show better returns.';
  } else if (buyoutVsPresentValue > 0) {
    return 'Accept the buyout offer. While alternative investments may not show better returns, the offer still exceeds the present value of remaining payments.';
  } else if (alternativeVsBuyout > 0) {
    return 'Consider rejecting the buyout and pursuing alternative investments. The potential returns from alternative investments exceed the buyout offer.';
  } else {
    return 'Carefully evaluate the buyout offer. Neither option shows clear financial advantage. Consider consulting a financial advisor.';
  }
}

/**
 * Generate confidence level
 */
function generateConfidenceLevel(inputs: AnnuityBuyoutInputs, buyoutEfficiency: number): string {
  const { timeHorizon, riskTolerance } = inputs;

  if (timeHorizon >= 10 && riskTolerance === 'medium') {
    return 'High confidence - Long time horizon and moderate risk tolerance support the analysis.';
  } else if (timeHorizon >= 5) {
    return 'Medium confidence - Moderate time horizon provides reasonable analysis reliability.';
  } else {
    return 'Low confidence - Short time horizon increases uncertainty in long-term projections.';
  }
}

/**
 * Generate next steps
 */
function generateNextSteps(inputs: AnnuityBuyoutInputs, recommendation: string): string[] {
  const steps: string[] = [];

  if (recommendation.includes('accept')) {
    steps.push('Review buyout contract terms and conditions');
    steps.push('Consult with tax advisor about tax implications');
    steps.push('Verify all fees and costs are clearly disclosed');
    steps.push('Consider how to invest the lump sum proceeds');
  } else if (recommendation.includes('reject')) {
    steps.push('Research alternative investment options');
    steps.push('Consult with financial advisor about investment strategy');
    steps.push('Review annuity contract terms for any penalties');
    steps.push('Consider negotiating better terms with annuity provider');
  } else {
    steps.push('Gather more detailed information about investment options');
    steps.push('Consult with multiple financial advisors');
    steps.push('Request more detailed buyout offer terms');
    steps.push('Consider waiting to see if offer improves');
  }

  steps.push('Document all assumptions and analysis for future reference');
  return steps;
}

/**
 * Generate warnings
 */
function generateWarnings(inputs: AnnuityBuyoutInputs, age: number, timeHorizon: number): string[] {
  const warnings: string[] = [];

  if (age >= 70) {
    warnings.push('Age consideration: At age 70+, consider required minimum distributions and tax implications.');
  }

  if (timeHorizon < 5) {
    warnings.push('Short time horizon: Analysis uncertainty increases with shorter investment periods.');
  }

  if (inputs.riskTolerance === 'low' && inputs.alternativeInvestmentRate > 8) {
    warnings.push('Risk mismatch: High-return alternative investments may not align with low risk tolerance.');
  }

  if (inputs.buyoutTaxes > inputs.buyoutOffer * 0.3) {
    warnings.push('High tax burden: Tax amount represents more than 30% of buyout offer.');
  }

  if (inputs.alternativeInvestmentFees > inputs.buyoutOffer * 0.05) {
    warnings.push('High fees: Alternative investment fees exceed 5% of buyout amount.');
  }

  return warnings;
}

/**
 * Validate annuity buyout inputs
 */
export function validateAnnuityBuyoutInputs(inputs: AnnuityBuyoutInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAnnuityValue <= 0) {
    errors.push('Current annuity value must be greater than 0');
  }

  if (inputs.monthlyPayment <= 0) {
    errors.push('Monthly payment must be greater than 0');
  }

  if (inputs.remainingPayments <= 0) {
    errors.push('Remaining payments must be greater than 0');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.buyoutOffer <= 0) {
    errors.push('Buyout offer must be greater than 0');
  }

  if (inputs.buyoutFees < 0) {
    errors.push('Buyout fees cannot be negative');
  }

  if (inputs.buyoutTaxes < 0) {
    errors.push('Buyout taxes cannot be negative');
  }

  if (inputs.alternativeInvestmentRate < 0 || inputs.alternativeInvestmentRate > 30) {
    errors.push('Alternative investment rate must be between 0% and 30%');
  }

  if (inputs.alternativeInvestmentFees < 0) {
    errors.push('Alternative investment fees cannot be negative');
  }

  if (inputs.timeHorizon <= 0 || inputs.timeHorizon > 50) {
    errors.push('Time horizon must be between 1 and 50 years');
  }

  if (inputs.age < 18 || inputs.age > 120) {
    errors.push('Age must be between 18 and 120');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.includeInflation && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  return errors;
}