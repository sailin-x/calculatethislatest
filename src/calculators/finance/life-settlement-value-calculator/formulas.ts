import { LifeSettlementInputs, LifeSettlementResults, LifeSettlementMetrics } from './types';

export function calculateLifeSettlement(inputs: LifeSettlementInputs): LifeSettlementResults {
  const {
    currentAge,
    lifeExpectancy,
    deathBenefit,
    annualPremium,
    policyType,
    healthStatus,
    settlementOffer,
    discountRate,
    inflationRate,
    taxRate,
    settlementCosts,
    remainingTerm
  } = inputs;

  // Calculate present value of future premiums
  const presentValueOfPremiums = calculatePresentValuePremiums(annualPremium, remainingTerm, discountRate);

  // Calculate net settlement value
  const netSettlementValue = settlementOffer - settlementCosts;

  // Calculate break-even period
  const breakEvenPeriod = calculateBreakEven(annualPremium, netSettlementValue);

  // Calculate internal rate of return
  const internalRateOfReturn = calculateIRR(netSettlementValue, presentValueOfPremiums, remainingTerm);

  // Calculate settlement efficiency
  const settlementEfficiency = calculateSettlementEfficiency(settlementOffer, deathBenefit, presentValueOfPremiums);

  // Calculate tax liability
  const taxLiability = calculateTaxLiability(netSettlementValue, taxRate);

  // Calculate net after-tax value
  const netAfterTaxValue = netSettlementValue - taxLiability;

  // Calculate monthly income if invested
  const monthlyIncome = calculateMonthlyIncome(netAfterTaxValue, lifeExpectancy - currentAge);

  // Risk assessment
  const riskAssessment = assessSettlementRisk(healthStatus, lifeExpectancy - currentAge, policyType);

  return {
    netSettlementValue,
    breakEvenPeriod,
    internalRateOfReturn,
    presentValueOfPremiums,
    settlementEfficiency,
    taxLiability,
    netAfterTaxValue,
    monthlyIncome,
    riskAssessment
  };
}

function calculatePresentValuePremiums(annualPremium: number, remainingTerm: number, discountRate: number): number {
  const rate = discountRate / 100;
  let presentValue = 0;

  for (let year = 1; year <= remainingTerm; year++) {
    presentValue += annualPremium / Math.pow(1 + rate, year);
  }

  return presentValue;
}

function calculateBreakEven(annualPremium: number, netSettlementValue: number): number {
  if (annualPremium <= 0) return 0;
  return Math.ceil(netSettlementValue / annualPremium);
}

function calculateIRR(netSettlementValue: number, presentValuePremiums: number, remainingTerm: number): number {
  if (presentValuePremiums <= 0 || remainingTerm <= 0) return 0;

  // Simplified IRR calculation
  const ratio = (netSettlementValue + presentValuePremiums) / presentValuePremiums;
  return Math.pow(ratio, 1 / remainingTerm) - 1;
}

function calculateSettlementEfficiency(settlementOffer: number, deathBenefit: number, presentValuePremiums: number): number {
  const maxEfficiency = Math.min(settlementOffer, deathBenefit) / (presentValuePremiums || 1);
  return Math.min(maxEfficiency * 100, 100);
}

function calculateTaxLiability(netSettlementValue: number, taxRate: number): number {
  // Life settlement proceeds are generally tax-free, but some portion may be taxable
  return netSettlementValue * (taxRate / 100) * 0.2; // Assume 20% taxable portion
}

function calculateMonthlyIncome(netAfterTaxValue: number, yearsRemaining: number): number {
  if (yearsRemaining <= 0) return 0;

  // Assume 4% safe withdrawal rate
  const annualIncome = netAfterTaxValue * 0.04;
  return annualIncome / 12;
}

function assessSettlementRisk(healthStatus: string, yearsRemaining: number, policyType: string): string {
  let riskLevel = 'Low';

  if (healthStatus === 'poor') {
    riskLevel = 'High';
  } else if (healthStatus === 'fair') {
    riskLevel = 'Medium';
  }

  if (yearsRemaining < 5) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
  }

  if (policyType === 'term') {
    riskLevel = 'High'; // Term policies have higher settlement risk
  }

  return riskLevel;
}

export function calculateLifeSettlementMetrics(inputs: LifeSettlementInputs, results: LifeSettlementResults): LifeSettlementMetrics {
  const { settlementOffer, annualPremium, remainingTerm, healthStatus, lifeExpectancy, currentAge } = inputs;
  const { netSettlementValue, presentValueOfPremiums } = results;

  // Calculate settlement viability
  const settlementViability = (netSettlementValue / (presentValueOfPremiums || 1)) * 100;

  // Calculate premium savings
  const totalPremiumsPaid = annualPremium * (remainingTerm || 1);
  const premiumSavings = totalPremiumsPaid - (presentValueOfPremiums || 0);

  // Determine longevity risk
  const yearsRemaining = lifeExpectancy - currentAge;
  let longevityRisk: 'low' | 'medium' | 'high' = 'low';
  if (yearsRemaining < 10) longevityRisk = 'high';
  else if (yearsRemaining < 20) longevityRisk = 'medium';

  // Determine financial benefit
  let financialBenefit: 'low' | 'medium' | 'high' = 'low';
  if (settlementViability > 150) financialBenefit = 'high';
  else if (settlementViability > 100) financialBenefit = 'medium';

  return {
    settlementViability,
    premiumSavings,
    longevityRisk,
    financialBenefit
  };
}

export function validateLifeSettlementInputs(inputs: LifeSettlementInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.lifeExpectancy <= inputs.currentAge) {
    errors.push('Life expectancy must be greater than current age');
  }

  if (inputs.deathBenefit <= 0) {
    errors.push('Death benefit must be greater than $0');
  }

  if (inputs.annualPremium < 0) {
    errors.push('Annual premium cannot be negative');
  }

  if (inputs.settlementOffer <= 0) {
    errors.push('Settlement offer must be greater than $0');
  }

  if (inputs.discountRate < -10 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between -10% and 20%');
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.remainingTerm <= 0) {
    errors.push('Remaining term must be greater than 0');
  }

  return errors;
}