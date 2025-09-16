import { RetirementAbroadInputs, RetirementAbroadResults, RetirementAbroadMetrics } from './types';

export function calculateRetirementAbroad(inputs: RetirementAbroadInputs): RetirementAbroadResults {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyRetirementIncome,
    targetCountry,
    includeHealthcare,
    healthcareCost,
    housingCost,
    costOfLivingAdjustment,
    expectedReturn,
    inflationRate,
    currencyExchangeRate,
    taxRate
  } = inputs;

  // Calculate years until retirement
  const yearsToRetirement = retirementAge - currentAge;

  // Calculate projected savings at retirement
  const projectedSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);

  // Calculate annual retirement income
  const annualRetirementIncome = monthlyRetirementIncome * 12;

  // Calculate healthcare costs
  const annualHealthcareCost = includeHealthcare ? healthcareCost * 12 : 0;

  // Calculate housing costs
  const annualHousingCost = housingCost * 12;

  // Calculate cost of living adjustment for target country
  const countryAdjustment = getCountryAdjustment(targetCountry);
  const adjustedAnnualIncome = annualRetirementIncome * (1 + costOfLivingAdjustment / 100) * countryAdjustment;

  // Calculate total annual expenses
  const totalAnnualExpenses = adjustedAnnualIncome + annualHealthcareCost + annualHousingCost;

  // Calculate net monthly income after taxes
  const netAnnualIncome = annualRetirementIncome * (1 - taxRate / 100);
  const netMonthlyIncome = netAnnualIncome / 12;

  // Calculate years of retirement funding
  const yearsOfRetirement = projectedSavings > 0 ? Math.log(totalAnnualExpenses / projectedSavings) / Math.log(1 + inflationRate / 100) : 0;

  // Calculate savings shortfall
  const requiredSavings = totalAnnualExpenses * (1 - Math.pow(1 + inflationRate / 100, -yearsOfRetirement)) / (inflationRate / 100);
  const savingsShortfall = Math.max(0, requiredSavings - projectedSavings);

  // Calculate monthly retirement cost
  const monthlyRetirementCost = totalAnnualExpenses / 12;

  // Determine retirement readiness
  const retirementReadiness = determineRetirementReadiness(projectedSavings, totalAnnualExpenses, yearsOfRetirement);

  return {
    totalRetirementSavings: projectedSavings,
    annualRetirementCost: totalAnnualExpenses,
    monthlyRetirementCost,
    yearsOfRetirement,
    savingsShortfall,
    healthcareCosts: annualHealthcareCost,
    housingCosts: annualHousingCost,
    totalAnnualExpenses,
    netMonthlyIncome,
    retirementReadiness
  };
}

function getCountryAdjustment(country: string): number {
  const adjustments: Record<string, number> = {
    'portugal': 0.7,
    'spain': 0.75,
    'mexico': 0.6,
    'panama': 0.65,
    'thailand': 0.5,
    'malaysia': 0.55,
    'costa_rica': 0.7,
    'ecuador': 0.45,
    'uruguay': 0.8,
    'chile': 0.75
  };
  return adjustments[country] || 1.0;
}

function determineRetirementReadiness(savings: number, expenses: number, years: number): string {
  if (savings >= expenses * years) {
    return 'Well-funded for retirement abroad';
  } else if (savings >= expenses * (years * 0.8)) {
    return 'Adequately funded - consider cost reductions';
  } else if (savings >= expenses * (years * 0.5)) {
    return 'Moderately funded - significant adjustments needed';
  } else {
    return 'Insufficient funding - delay retirement or reduce expenses significantly';
  }
}

export function calculateRetirementAbroadMetrics(
  inputs: RetirementAbroadInputs,
  results: RetirementAbroadResults
): RetirementAbroadMetrics {
  const { targetCountry } = inputs;

  // Calculate cost of living index (100 = US average)
  const costOfLivingIndex = getCostOfLivingIndex(targetCountry);

  // Determine healthcare quality
  const healthcareQuality = getHealthcareQuality(targetCountry);

  // Determine safety index
  const safetyIndex = getSafetyIndex(targetCountry);

  // Determine visa ease
  const visaEase = getVisaEase(targetCountry);

  // Calculate tax efficiency
  const taxEfficiency = results.netMonthlyIncome / (results.totalAnnualExpenses / 12) * 100;

  // Determine lifestyle quality
  const lifestyleQuality = determineLifestyleQuality(results.monthlyRetirementCost);

  return {
    costOfLivingIndex,
    healthcareQuality,
    safetyIndex,
    visaEase,
    taxEfficiency,
    lifestyleQuality
  };
}

function getCostOfLivingIndex(country: string): number {
  const indices: Record<string, number> = {
    'portugal': 75,
    'spain': 70,
    'mexico': 60,
    'panama': 65,
    'thailand': 50,
    'malaysia': 55,
    'costa_rica': 75,
    'ecuador': 45,
    'uruguay': 80,
    'chile': 70
  };
  return indices[country] || 100;
}

function getHealthcareQuality(country: string): 'low' | 'medium' | 'high' {
  const qualities: Record<string, 'low' | 'medium' | 'high'> = {
    'portugal': 'high',
    'spain': 'high',
    'mexico': 'medium',
    'panama': 'medium',
    'thailand': 'medium',
    'malaysia': 'high',
    'costa_rica': 'medium',
    'ecuador': 'low',
    'uruguay': 'high',
    'chile': 'high'
  };
  return qualities[country] || 'medium';
}

function getSafetyIndex(country: string): 'low' | 'medium' | 'high' {
  const indices: Record<string, 'low' | 'medium' | 'high'> = {
    'portugal': 'high',
    'spain': 'high',
    'mexico': 'medium',
    'panama': 'high',
    'thailand': 'high',
    'malaysia': 'high',
    'costa_rica': 'high',
    'ecuador': 'medium',
    'uruguay': 'high',
    'chile': 'high'
  };
  return indices[country] || 'medium';
}

function getVisaEase(country: string): 'difficult' | 'moderate' | 'easy' {
  const ease: Record<string, 'difficult' | 'moderate' | 'easy'> = {
    'portugal': 'moderate',
    'spain': 'moderate',
    'mexico': 'easy',
    'panama': 'easy',
    'thailand': 'easy',
    'malaysia': 'moderate',
    'costa_rica': 'easy',
    'ecuador': 'easy',
    'uruguay': 'moderate',
    'chile': 'moderate'
  };
  return ease[country] || 'moderate';
}

function determineLifestyleQuality(monthlyCost: number): 'basic' | 'comfortable' | 'luxury' {
  if (monthlyCost < 2000) return 'basic';
  if (monthlyCost < 4000) return 'comfortable';
  return 'luxury';
}

export function validateRetirementAbroadInputs(inputs: RetirementAbroadInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.retirementAge <= inputs.currentAge) {
    errors.push('Retirement age must be greater than current age');
  }

  if (inputs.currentSavings < 0) {
    errors.push('Current savings cannot be negative');
  }

  if (inputs.monthlyRetirementIncome < 0) {
    errors.push('Monthly retirement income cannot be negative');
  }

  if (inputs.healthcareCost < 0) {
    errors.push('Healthcare cost cannot be negative');
  }

  if (inputs.housingCost < 0) {
    errors.push('Housing cost cannot be negative');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (inputs.currencyExchangeRate <= 0) {
    errors.push('Currency exchange rate must be greater than 0');
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  return errors;
}