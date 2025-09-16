import { FixedIndexAnnuityInputs, FixedIndexAnnuityResults } from './types';

/**
 * Calculate comprehensive fixed index annuity analysis
 */
export function calculateFixedIndexAnnuity(inputs: FixedIndexAnnuityInputs): FixedIndexAnnuityResults {
  const {
    initialInvestment,
    monthlyContribution,
    contributionPeriod,
    indexType,
    participationRate,
    capRate,
    floorRate,
    spreadRate,
    annuityPeriod,
    currentAge,
    withdrawalAge,
    annualFee,
    surrenderCharges,
    riderFees,
    payoutType,
    payoutPeriod,
    payoutPercentage,
    taxBracket,
    stateTaxRate,
    taxDeferred,
    inflationRate,
    marketVolatility,
    conservativeReturn,
    aggressiveReturn,
    gender,
    jointLifeExpectancy
  } = inputs;

  // Calculate annual projections
  const annualProjections = calculateAnnualProjections(inputs);

  // Calculate final account value
  const finalProjection = annualProjections[annualProjections.length - 1];
  const projectedValueAtWithdrawal = finalProjection.accountValue;

  // Calculate fees impact
  const totalFeesPaid = annualProjections.reduce((sum, year) => sum + year.fees, 0);
  const projectedValueAfterFees = projectedValueAtWithdrawal - totalFeesPaid;
  const feeImpactPercentage = (totalFeesPaid / projectedValueAtWithdrawal) * 100;

  // Calculate tax impact
  const taxLiability = taxDeferred ? 0 : projectedValueAfterFees * (taxBracket / 100);
  const projectedValueAfterTaxes = projectedValueAfterFees - taxLiability;

  // Calculate inflation adjustment
  const inflationFactor = Math.pow(1 + inflationRate / 100, annuityPeriod);
  const projectedValueAfterInflation = projectedValueAfterTaxes / inflationFactor;

  // Calculate payout analysis
  const payoutAnalysis = calculatePayoutAnalysis(inputs, projectedValueAfterTaxes);
  const { monthlyPayout, annualPayout, totalPayouts, payoutPeriodYears } = payoutAnalysis;

  // Calculate risk analysis
  const riskAnalysis = calculateRiskAnalysis(inputs, annualProjections);
  const { bestCaseValue, worstCaseValue, averageCaseValue, riskAdjustedValue } = riskAnalysis;

  // Calculate net return after fees
  const totalContributions = initialInvestment + (monthlyContribution * 12 * contributionPeriod);
  const netReturnAfterFees = ((projectedValueAfterFees - totalContributions) / totalContributions) * 100;

  // Calculate tax efficiency
  const afterTaxIncome = projectedValueAfterTaxes;
  const taxEfficiency = taxDeferred ? 100 : ((projectedValueAfterTaxes / projectedValueAtWithdrawal) * 100);

  // Calculate comparison analysis
  const comparisonAnalysis = calculateComparisonAnalysis(inputs, projectedValueAfterTaxes);
  const { vsTraditionalSavings, vsStocks, vsBonds, vsOtherAnnuities } = comparisonAnalysis;

  // Calculate surrender analysis
  const surrenderValues = calculateSurrenderValues(inputs, annualProjections);

  // Generate recommendations
  const recommendedStrategy = generateRecommendedStrategy(inputs);
  const riskLevel = determineRiskLevel(inputs);
  const suitabilityScore = calculateSuitabilityScore(inputs);
  const alternativeOptions = generateAlternativeOptions(inputs);

  return {
    projectedValueAtWithdrawal,
    projectedValueAfterFees,
    projectedValueAfterTaxes,
    projectedValueAfterInflation,
    annualProjections,
    monthlyPayout,
    annualPayout,
    totalPayouts,
    payoutPeriodYears,
    bestCaseValue,
    worstCaseValue,
    averageCaseValue,
    riskAdjustedValue,
    totalFeesPaid,
    feeImpactPercentage,
    netReturnAfterFees,
    taxLiability,
    afterTaxIncome,
    taxEfficiency,
    vsTraditionalSavings,
    vsStocks,
    vsBonds,
    vsOtherAnnuities,
    surrenderValues,
    recommendedStrategy,
    riskLevel,
    suitabilityScore,
    alternativeOptions
  };
}

/**
 * Calculate annual account projections
 */
function calculateAnnualProjections(inputs: FixedIndexAnnuityInputs): Array<{
  year: number;
  contributions: number;
  indexReturn: number;
  creditedInterest: number;
  fees: number;
  accountValue: number;
}> {
  const {
    initialInvestment,
    monthlyContribution,
    contributionPeriod,
    participationRate,
    capRate,
    floorRate,
    spreadRate,
    annualFee,
    riderFees,
    annuityPeriod
  } = inputs;

  const projections = [];
  let accountValue = initialInvestment;
  let cumulativeContributions = initialInvestment;

  for (let year = 1; year <= annuityPeriod; year++) {
    // Calculate contributions for this year
    const yearlyContributions = year <= contributionPeriod ? monthlyContribution * 12 : 0;
    cumulativeContributions += yearlyContributions;

    // Simulate index return (simplified - in reality would use historical data)
    const indexReturn = simulateIndexReturn(inputs, year);
    const participationReturn = indexReturn * (participationRate / 100);

    // Apply cap and floor
    let creditedReturn = participationReturn;
    if (capRate && creditedReturn > capRate / 100) {
      creditedReturn = capRate / 100;
    }
    if (floorRate && creditedReturn < floorRate / 100) {
      creditedReturn = floorRate / 100;
    }

    // Apply spread
    creditedReturn -= spreadRate / 100;
    creditedReturn = Math.max(0, creditedReturn); // Floor at 0

    // Calculate credited interest
    const creditedInterest = accountValue * creditedReturn;

    // Calculate fees
    const managementFees = accountValue * (annualFee / 100);
    const additionalFees = riderFees;
    const totalFees = managementFees + additionalFees;

    // Update account value
    accountValue += yearlyContributions + creditedInterest - totalFees;

    projections.push({
      year,
      contributions: yearlyContributions,
      indexReturn: indexReturn * 100,
      creditedInterest,
      fees: totalFees,
      accountValue
    });
  }

  return projections;
}

/**
 * Simulate index return for a given year
 */
function simulateIndexReturn(inputs: FixedIndexAnnuityInputs, year: number): number {
  const { indexType, marketVolatility, conservativeReturn, aggressiveReturn } = inputs;

  // Base return by index type
  let baseReturn: number;
  switch (indexType) {
    case 's-p-500':
      baseReturn = 0.10; // 10% average annual return
      break;
    case 'dow-jones':
      baseReturn = 0.09; // 9% average annual return
      break;
    case 'nasdaq':
      baseReturn = 0.12; // 12% average annual return
      break;
    case 'custom':
      baseReturn = (conservativeReturn + aggressiveReturn) / 2 / 100;
      break;
    default:
      baseReturn = 0.08;
  }

  // Add volatility (simplified random variation)
  const volatility = marketVolatility / 100;
  const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
  const returnVariation = baseReturn * volatility * randomFactor;

  return Math.max(-0.5, Math.min(0.5, baseReturn + returnVariation)); // Cap at -50% to +50%
}

/**
 * Calculate payout analysis
 */
function calculatePayoutAnalysis(inputs: FixedIndexAnnuityInputs, accountValue: number): {
  monthlyPayout: number;
  annualPayout: number;
  totalPayouts: number;
  payoutPeriodYears: number;
} {
  const { payoutType, payoutPeriod, payoutPercentage, withdrawalAge, gender, jointLifeExpectancy } = inputs;

  const payoutAmount = accountValue * (payoutPercentage / 100);

  let payoutPeriodYears: number;
  switch (payoutType) {
    case 'lifetime':
      payoutPeriodYears = calculateLifeExpectancy(withdrawalAge, gender);
      break;
    case 'joint-life':
      payoutPeriodYears = jointLifeExpectancy;
      break;
    case 'period-certain':
      payoutPeriodYears = payoutPeriod;
      break;
    case 'single-life':
    default:
      payoutPeriodYears = calculateLifeExpectancy(withdrawalAge, gender);
      break;
  }

  const annualPayout = payoutAmount / payoutPeriodYears;
  const monthlyPayout = annualPayout / 12;
  const totalPayouts = payoutAmount;

  return {
    monthlyPayout,
    annualPayout,
    totalPayouts,
    payoutPeriodYears
  };
}

/**
 * Calculate life expectancy (simplified)
 */
function calculateLifeExpectancy(age: number, gender: string): number {
  const baseExpectancy = gender === 'female' ? 87 : 84;
  return Math.max(1, baseExpectancy - age);
}

/**
 * Calculate risk analysis
 */
function calculateRiskAnalysis(inputs: FixedIndexAnnuityInputs, projections: any[]): {
  bestCaseValue: number;
  worstCaseValue: number;
  averageCaseValue: number;
  riskAdjustedValue: number;
} {
  const { conservativeReturn, aggressiveReturn, marketVolatility } = inputs;

  const finalValue = projections[projections.length - 1].accountValue;
  const volatility = marketVolatility / 100;

  // Simplified risk calculations
  const bestCaseValue = finalValue * (1 + volatility);
  const worstCaseValue = finalValue * (1 - volatility);
  const averageCaseValue = finalValue;

  // Risk-adjusted value using Sharpe-like ratio
  const riskAdjustment = (aggressiveReturn - conservativeReturn) / marketVolatility;
  const riskAdjustedValue = finalValue * (1 + riskAdjustment / 100);

  return {
    bestCaseValue,
    worstCaseValue,
    averageCaseValue,
    riskAdjustedValue
  };
}

/**
 * Calculate comparison analysis
 */
function calculateComparisonAnalysis(inputs: FixedIndexAnnuityInputs, annuityValue: number): {
  vsTraditionalSavings: number;
  vsStocks: number;
  vsBonds: number;
  vsOtherAnnuities: number;
} {
  const { initialInvestment, monthlyContribution, contributionPeriod, annuityPeriod, conservativeReturn, aggressiveReturn } = inputs;

  const totalContributions = initialInvestment + (monthlyContribution * 12 * contributionPeriod);

  // Traditional savings (conservative return)
  const traditionalValue = totalContributions * Math.pow(1 + conservativeReturn / 100, annuityPeriod);

  // Stock investment (aggressive return)
  const stockValue = totalContributions * Math.pow(1 + aggressiveReturn / 100, annuityPeriod);

  // Bond investment (moderate return)
  const bondReturn = (conservativeReturn + aggressiveReturn) / 2;
  const bondValue = totalContributions * Math.pow(1 + bondReturn / 100, annuityPeriod);

  // Other annuities (assume 20% lower return due to fees)
  const otherAnnuityValue = annuityValue * 1.25; // Adjust for comparison

  return {
    vsTraditionalSavings: annuityValue - traditionalValue,
    vsStocks: annuityValue - stockValue,
    vsBonds: annuityValue - bondValue,
    vsOtherAnnuities: annuityValue - otherAnnuityValue
  };
}

/**
 * Calculate surrender values
 */
function calculateSurrenderValues(inputs: FixedIndexAnnuityInputs, projections: any[]): Array<{
  year: number;
  surrenderCharge: number;
  availableValue: number;
}> {
  const { surrenderCharges } = inputs;

  return projections.map(projection => {
    const year = projection.year;
    const surrenderCharge = year <= surrenderCharges.length ? surrenderCharges[year - 1] : 0;
    const availableValue = projection.accountValue * (1 - surrenderCharge / 100);

    return {
      year,
      surrenderCharge,
      availableValue
    };
  });
}

/**
 * Generate recommended strategy
 */
function generateRecommendedStrategy(inputs: FixedIndexAnnuityInputs): string {
  const { currentAge, withdrawalAge, annuityPeriod } = inputs;

  if (currentAge < 50) {
    return 'Consider delaying purchase to allow for longer growth period and higher contributions';
  }

  if (withdrawalAge - currentAge > 20) {
    return 'Long time horizon supports indexed growth strategy with moderate risk';
  }

  if (inputs.participationRate < 50) {
    return 'Consider annuities with higher participation rates for better upside potential';
  }

  return 'Balanced approach suitable for retirement income with guaranteed minimums';
}

/**
 * Determine risk level
 */
function determineRiskLevel(inputs: FixedIndexAnnuityInputs): 'low' | 'medium' | 'high' {
  const { participationRate, capRate, floorRate, marketVolatility } = inputs;

  if (participationRate < 30 || (capRate && capRate < 5) || marketVolatility > 30) {
    return 'low';
  }

  if (participationRate > 70 && (!capRate || capRate > 10) && marketVolatility < 20) {
    return 'high';
  }

  return 'medium';
}

/**
 * Calculate suitability score
 */
function calculateSuitabilityScore(inputs: FixedIndexAnnuityInputs): number {
  const { currentAge, withdrawalAge, contributionPeriod, annuityPeriod } = inputs;

  let score = 50; // Base score

  // Age suitability
  if (currentAge >= 50 && currentAge <= 70) score += 20;
  else if (currentAge < 40) score -= 15;

  // Time horizon
  const timeToWithdrawal = withdrawalAge - currentAge;
  if (timeToWithdrawal >= 10) score += 15;
  else if (timeToWithdrawal < 5) score -= 10;

  // Contribution period
  if (contributionPeriod >= 10) score += 10;
  else if (contributionPeriod < 5) score -= 5;

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate alternative options
 */
function generateAlternativeOptions(inputs: FixedIndexAnnuityInputs): string[] {
  const options: string[] = [];

  if (inputs.participationRate < 50) {
    options.push('Variable annuity with direct market exposure');
  }

  if (inputs.annualFee > 2) {
    options.push('Low-cost index funds or ETFs');
  }

  if (inputs.currentAge < 50) {
    options.push('401(k) or IRA with tax advantages');
  }

  options.push('Diversified investment portfolio');
  options.push('Target-date retirement funds');

  return options;
}

/**
 * Validate fixed index annuity inputs
 */
export function validateFixedIndexAnnuityInputs(inputs: FixedIndexAnnuityInputs): string[] {
  const errors: string[] = [];

  if (inputs.initialInvestment < 0) {
    errors.push('Initial investment cannot be negative');
  }

  if (inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.contributionPeriod < 0 || inputs.contributionPeriod > 50) {
    errors.push('Contribution period must be between 0 and 50 years');
  }

  if (inputs.participationRate < 0 || inputs.participationRate > 200) {
    errors.push('Participation rate must be between 0% and 200%');
  }

  if (inputs.capRate && (inputs.capRate < 0 || inputs.capRate > 50)) {
    errors.push('Cap rate must be between 0% and 50%');
  }

  if (inputs.floorRate && (inputs.floorRate < -10 || inputs.floorRate > 10)) {
    errors.push('Floor rate must be between -10% and 10%');
  }

  if (inputs.spreadRate < 0 || inputs.spreadRate > 10) {
    errors.push('Spread rate must be between 0% and 10%');
  }

  if (inputs.annuityPeriod < 1 || inputs.annuityPeriod > 50) {
    errors.push('Annuity period must be between 1 and 50 years');
  }

  if (inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (inputs.withdrawalAge <= inputs.currentAge || inputs.withdrawalAge > 90) {
    errors.push('Withdrawal age must be greater than current age and less than or equal to 90');
  }

  if (inputs.annualFee < 0 || inputs.annualFee > 10) {
    errors.push('Annual fee must be between 0% and 10%');
  }

  if (inputs.payoutPercentage < 1 || inputs.payoutPercentage > 20) {
    errors.push('Payout percentage must be between 1% and 20%');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  if (inputs.inflationRate < 0 || inputs.inflationRate > 10) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.marketVolatility < 0 || inputs.marketVolatility > 100) {
    errors.push('Market volatility must be between 0% and 100%');
  }

  if (inputs.conservativeReturn < 0 || inputs.conservativeReturn > 20) {
    errors.push('Conservative return must be between 0% and 20%');
  }

  if (inputs.aggressiveReturn < 0 || inputs.aggressiveReturn > 50) {
    errors.push('Aggressive return must be between 0% and 50%');
  }

  return errors;
}