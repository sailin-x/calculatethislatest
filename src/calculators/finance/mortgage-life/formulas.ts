export interface MortgageLifeInputs {
  mortgageBalance: number;
  propertyValue: number;
  monthlyPayment: number;
  age: number;
  healthStatus: string;
  smoker: string;
  occupation: string;
  familyIncome: number;
  dependents: number;
  existingLifeInsurance?: number;
  otherDebts?: number;
  funeralExpenses?: number;
  coverageType: string;
  termLength: string;
}

export interface CoverageBreakdown {
  year: number;
  coverageAmount: number;
  monthlyPremium: number;
  annualPremium: number;
  cumulativeCost: number;
}

export interface MortgageLifeOutputs {
  recommendedCoverage: number;
  monthlyPremium: number;
  annualPremium: number;
  totalCost: number;
  coverageBreakdown: CoverageBreakdown[];
  affordabilityAnalysis: number;
  coverageGap: number;
  recommendations: string[];
}

/**
 * Calculate mortgage life insurance coverage and costs
 */
export function calculateMortgageLifeInsurance(inputs: MortgageLifeInputs): MortgageLifeOutputs {
  const {
    mortgageBalance,
    propertyValue,
    monthlyPayment,
    age,
    healthStatus,
    smoker,
    occupation,
    familyIncome,
    dependents,
    existingLifeInsurance = 0,
    otherDebts = 0,
    funeralExpenses = 15000,
    coverageType,
    termLength
  } = inputs;

  // Calculate recommended coverage amount
  const recommendedCoverage = calculateRecommendedCoverage(inputs);
  
  // Calculate premiums based on risk factors
  const basePremium = calculateBasePremium(recommendedCoverage, age, termLength);
  const riskMultiplier = calculateRiskMultiplier(healthStatus, smoker, occupation);
  const monthlyPremium = basePremium * riskMultiplier;
  const annualPremium = monthlyPremium * 12;
  const totalCost = annualPremium * parseInt(termLength);

  // Generate coverage breakdown
  const coverageBreakdown = generateCoverageBreakdown(inputs, recommendedCoverage, monthlyPremium);

  // Calculate affordability analysis
  const affordabilityAnalysis = (annualPremium / familyIncome) * 100;

  // Calculate coverage gap
  const totalNeeds = recommendedCoverage + otherDebts + funeralExpenses;
  const coverageGap = Math.max(0, totalNeeds - existingLifeInsurance);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, recommendedCoverage, monthlyPremium, coverageGap);

  return {
    recommendedCoverage,
    monthlyPremium,
    annualPremium,
    totalCost,
    coverageBreakdown,
    affordabilityAnalysis,
    coverageGap,
    recommendations
  };
}

/**
 * Analyze total coverage needs
 */
export function analyzeCoverageNeeds(inputs: MortgageLifeInputs): {
  totalNeeds: number;
  mortgageProtection: number;
  debtProtection: number;
  incomeReplacement: number;
  finalExpenses: number;
  existingCoverage: number;
  coverageGap: number;
} {
  const {
    mortgageBalance,
    familyIncome,
    dependents,
    existingLifeInsurance = 0,
    otherDebts = 0,
    funeralExpenses = 15000
  } = inputs;

  // Calculate different types of protection needs
  const mortgageProtection = mortgageBalance;
  const debtProtection = otherDebts;
  const incomeReplacement = calculateIncomeReplacement(familyIncome, dependents);
  const finalExpenses = funeralExpenses;

  const totalNeeds = mortgageProtection + debtProtection + incomeReplacement + finalExpenses;
  const coverageGap = Math.max(0, totalNeeds - existingLifeInsurance);

  return {
    totalNeeds,
    mortgageProtection,
    debtProtection,
    incomeReplacement,
    finalExpenses,
    existingCoverage: existingLifeInsurance,
    coverageGap
  };
}

/**
 * Calculate insurance premiums
 */
export function calculatePremiums(inputs: MortgageLifeInputs): {
  basePremium: number;
  riskMultiplier: number;
  finalPremium: number;
  riskFactors: string[];
} {
  const { mortgageBalance, age, healthStatus, smoker, occupation, termLength } = inputs;

  const basePremium = calculateBasePremium(mortgageBalance, age, termLength);
  const riskMultiplier = calculateRiskMultiplier(healthStatus, smoker, occupation);
  const finalPremium = basePremium * riskMultiplier;

  const riskFactors = identifyRiskFactors(healthStatus, smoker, occupation);

  return {
    basePremium,
    riskMultiplier,
    finalPremium,
    riskFactors
  };
}

/**
 * Calculate recommended coverage amount
 */
function calculateRecommendedCoverage(inputs: MortgageLifeInputs): number {
  const { mortgageBalance, coverageType, familyIncome, dependents, otherDebts = 0, funeralExpenses = 15000 } = inputs;

  switch (coverageType) {
    case 'decreasing':
      // Decreasing term matches mortgage balance
      return mortgageBalance;
    
    case 'level':
      // Level term provides fixed coverage
      return mortgageBalance;
    
    case 'family':
      // Family income protection includes income replacement
      const incomeReplacement = calculateIncomeReplacement(familyIncome, dependents);
      return mortgageBalance + incomeReplacement;
    
    default:
      return mortgageBalance;
  }
}

/**
 * Calculate income replacement needs
 */
function calculateIncomeReplacement(annualIncome: number, dependents: number): number {
  // Standard rule: 10x annual income for income replacement
  const baseReplacement = annualIncome * 10;
  
  // Adjust for number of dependents
  const dependentMultiplier = Math.max(1, dependents * 0.5);
  
  return baseReplacement * dependentMultiplier;
}

/**
 * Calculate base premium rate
 */
function calculateBasePremium(coverageAmount: number, age: number, termLength: string): number {
  // Base rate per $1000 of coverage (simplified calculation)
  const baseRatePerThousand = getBaseRatePerThousand(age, termLength);
  
  return (coverageAmount / 1000) * baseRatePerThousand;
}

/**
 * Get base rate per $1000 of coverage
 */
function getBaseRatePerThousand(age: number, termLength: string): number {
  // Simplified rate table (in real life, these would be actuarial tables)
  const termYears = parseInt(termLength);
  
  if (age < 30) {
    return termYears <= 15 ? 0.5 : 0.8;
  } else if (age < 40) {
    return termYears <= 15 ? 0.8 : 1.2;
  } else if (age < 50) {
    return termYears <= 15 ? 1.5 : 2.5;
  } else if (age < 60) {
    return termYears <= 15 ? 3.0 : 5.0;
  } else {
    return termYears <= 15 ? 6.0 : 10.0;
  }
}

/**
 * Calculate risk multiplier based on health and lifestyle factors
 */
function calculateRiskMultiplier(healthStatus: string, smoker: string, occupation: string): number {
  let multiplier = 1.0;

  // Health status adjustments
  switch (healthStatus) {
    case 'excellent':
      multiplier *= 0.8;
      break;
    case 'good':
      multiplier *= 1.0;
      break;
    case 'fair':
      multiplier *= 1.5;
      break;
    case 'poor':
      multiplier *= 2.5;
      break;
  }

  // Smoking status adjustments
  switch (smoker) {
    case 'non-smoker':
      multiplier *= 1.0;
      break;
    case 'former-smoker':
      multiplier *= 1.2;
      break;
    case 'smoker':
      multiplier *= 2.0;
      break;
  }

  // Occupation risk adjustments
  switch (occupation) {
    case 'low':
      multiplier *= 1.0;
      break;
    case 'medium':
      multiplier *= 1.3;
      break;
    case 'high':
      multiplier *= 1.8;
      break;
  }

  return multiplier;
}

/**
 * Identify risk factors affecting premiums
 */
function identifyRiskFactors(healthStatus: string, smoker: string, occupation: string): string[] {
  const factors: string[] = [];

  if (healthStatus === 'fair' || healthStatus === 'poor') {
    factors.push('Health status may affect premium rates');
  }

  if (smoker === 'smoker') {
    factors.push('Smoking significantly increases premium rates');
  } else if (smoker === 'former-smoker') {
    factors.push('Former smoking status may affect rates');
  }

  if (occupation === 'high') {
    factors.push('High-risk occupation increases premium rates');
  } else if (occupation === 'medium') {
    factors.push('Medium-risk occupation may affect rates');
  }

  return factors;
}

/**
 * Generate year-by-year coverage breakdown
 */
function generateCoverageBreakdown(
  inputs: MortgageLifeInputs,
  initialCoverage: number,
  monthlyPremium: number
): CoverageBreakdown[] {
  const { coverageType, termLength } = inputs;
  const termYears = parseInt(termLength);
  const breakdown: CoverageBreakdown[] = [];

  for (let year = 1; year <= termYears; year++) {
    let coverageAmount = initialCoverage;

    // Adjust coverage for decreasing term
    if (coverageType === 'decreasing') {
      // Simplified decreasing calculation (in reality, this would follow mortgage amortization)
      coverageAmount = initialCoverage * (1 - (year - 1) / termYears);
    }

    const annualPremium = monthlyPremium * 12;
    const cumulativeCost = annualPremium * year;

    breakdown.push({
      year,
      coverageAmount: Math.max(0, coverageAmount),
      monthlyPremium,
      annualPremium,
      cumulativeCost
    });
  }

  return breakdown;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  inputs: MortgageLifeInputs,
  recommendedCoverage: number,
  monthlyPremium: number,
  coverageGap: number
): string[] {
  const recommendations: string[] = [];
  const { familyIncome, dependents, existingLifeInsurance = 0, coverageType } = inputs;

  // Coverage recommendations
  if (coverageGap > 0) {
    recommendations.push(`Consider additional coverage of $${coverageGap.toLocaleString()} to fully protect your family.`);
  }

  if (existingLifeInsurance === 0) {
    recommendations.push('You have no existing life insurance. Consider a comprehensive life insurance policy.');
  }

  // Affordability recommendations
  const premiumPercentage = (monthlyPremium * 12 / familyIncome) * 100;
  if (premiumPercentage > 1) {
    recommendations.push('Insurance premiums represent a significant portion of your income. Consider shopping around for better rates.');
  }

  // Coverage type recommendations
  if (coverageType === 'decreasing' && dependents > 0) {
    recommendations.push('Consider level term insurance to provide consistent protection for your family.');
  }

  if (dependents > 0) {
    recommendations.push('With dependents, consider additional coverage beyond mortgage protection.');
  }

  // Health and lifestyle recommendations
  if (inputs.smoker === 'smoker') {
    recommendations.push('Quitting smoking could significantly reduce your insurance premiums.');
  }

  if (inputs.healthStatus === 'fair' || inputs.healthStatus === 'poor') {
    recommendations.push('Improving your health status could help reduce insurance premiums.');
  }

  return recommendations;
}

/**
 * Calculate cost-benefit analysis
 */
export function calculateCostBenefitAnalysis(inputs: MortgageLifeInputs): {
  totalPremiums: number;
  coverageValue: number;
  benefitRatio: number;
  yearsToBreakEven: number;
} {
  const { termLength } = inputs;
  const termYears = parseInt(termLength);
  
  const result = calculateMortgageLifeInsurance(inputs);
  const totalPremiums = result.totalCost;
  const coverageValue = result.recommendedCoverage;
  
  const benefitRatio = coverageValue / totalPremiums;
  const yearsToBreakEven = totalPremiums / (result.annualPremium * 12);

  return {
    totalPremiums,
    coverageValue,
    benefitRatio,
    yearsToBreakEven
  };
}

/**
 * Compare different coverage options
 */
export function compareCoverageOptions(inputs: MortgageLifeInputs): {
  decreasing: MortgageLifeOutputs;
  level: MortgageLifeOutputs;
  family: MortgageLifeOutputs;
} {
  const decreasingInputs = { ...inputs, coverageType: 'decreasing' };
  const levelInputs = { ...inputs, coverageType: 'level' };
  const familyInputs = { ...inputs, coverageType: 'family' };

  return {
    decreasing: calculateMortgageLifeInsurance(decreasingInputs),
    level: calculateMortgageLifeInsurance(levelInputs),
    family: calculateMortgageLifeInsurance(familyInputs)
  };
}

/**
 * Calculate inflation-adjusted coverage needs
 */
export function calculateInflationAdjustedNeeds(
  inputs: MortgageLifeInputs,
  inflationRate: number = 2.5
): {
  currentNeeds: number;
  futureNeeds: number;
  inflationAdjustment: number;
} {
  const { termLength } = inputs;
  const termYears = parseInt(termLength);
  
  const currentNeeds = calculateRecommendedCoverage(inputs);
  const inflationAdjustment = Math.pow(1 + inflationRate / 100, termYears);
  const futureNeeds = currentNeeds * inflationAdjustment;

  return {
    currentNeeds,
    futureNeeds,
    inflationAdjustment
  };
}