import { ILITInputs, ILITResults, ILITMetrics } from './types';

export function calculateILIT(inputs: ILITInputs): ILITResults {
  const {
    trustValue,
    annualPremium,
    deathBenefit,
    trustDuration,
    discountRate,
    inflationRate,
    taxRate,
    administrativeCosts,
    numberOfBeneficiaries,
    trustType,
    includeCrummeyPowers,
    stateOfResidence
  } = inputs;

  // Calculate present value of future premiums
  const presentValuePremiums = calculatePresentValuePremiums(annualPremium, trustDuration, discountRate);

  // Calculate future value of trust
  const futureValue = calculateFutureValue(trustValue, deathBenefit, trustDuration, discountRate);

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(deathBenefit, taxRate, trustType);

  // Calculate administrative costs
  const administrativeCostTotal = administrativeCosts * trustDuration;

  // Calculate net benefit
  const netBenefit = futureValue + taxSavings - presentValuePremiums - administrativeCostTotal;

  // Calculate beneficiary share
  const beneficiaryShare = netBenefit / numberOfBeneficiaries;

  // Calculate effective yield
  const effectiveYield = calculateEffectiveYield(netBenefit, presentValuePremiums, trustDuration);

  // Calculate break-even period
  const breakEvenPeriod = calculateBreakEvenPeriod(presentValuePremiums, annualPremium, administrativeCosts);

  // Risk assessment
  const riskAssessment = assessRisk(trustType, includeCrummeyPowers, stateOfResidence);

  return {
    presentValue: presentValuePremiums,
    futureValue,
    taxSavings,
    netBenefit,
    beneficiaryShare,
    administrativeCostTotal,
    effectiveYield,
    breakEvenPeriod,
    riskAssessment
  };
}

function calculatePresentValuePremiums(annualPremium: number, duration: number, discountRate: number): number {
  const rate = discountRate / 100;
  let presentValue = 0;

  for (let year = 1; year <= duration; year++) {
    presentValue += annualPremium / Math.pow(1 + rate, year);
  }

  return presentValue;
}

function calculateFutureValue(trustValue: number, deathBenefit: number, duration: number, discountRate: number): number {
  const rate = discountRate / 100;
  return (trustValue + deathBenefit) * Math.pow(1 + rate, duration);
}

function calculateTaxSavings(deathBenefit: number, taxRate: number, trustType: string): number {
  // ILITs generally avoid estate taxes
  if (trustType === 'life-insurance') {
    return deathBenefit * (taxRate / 100) * 0.9; // 90% tax savings
  } else if (trustType === 'charitable-remainder') {
    return deathBenefit * (taxRate / 100) * 0.95; // 95% tax savings
  }
  return deathBenefit * (taxRate / 100) * 0.85; // 85% for grantor trusts
}

function calculateEffectiveYield(netBenefit: number, presentValuePremiums: number, duration: number): number {
  if (presentValuePremiums <= 0 || duration <= 0) return 0;

  const ratio = (netBenefit + presentValuePremiums) / presentValuePremiums;
  return Math.pow(ratio, 1 / duration) - 1;
}

function calculateBreakEvenPeriod(presentValuePremiums: number, annualPremium: number, adminCosts: number): number {
  const totalCost = presentValuePremiums + adminCosts;
  if (annualPremium <= 0) return 0;

  return Math.ceil(totalCost / annualPremium);
}

function assessRisk(trustType: string, hasCrummeyPowers: boolean, state: string): string {
  let riskLevel = 'Low';

  if (trustType === 'grantor') {
    riskLevel = 'Medium';
  }

  if (!hasCrummeyPowers) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
  }

  // State-specific risks
  const highRiskStates = ['New York', 'Massachusetts', 'Connecticut'];
  if (highRiskStates.includes(state)) {
    riskLevel = 'High';
  }

  return riskLevel;
}

export function calculateILITMetrics(inputs: ILITInputs, results: ILITResults): ILITMetrics {
  const { trustValue, deathBenefit, trustType } = inputs;
  const { netBenefit, taxSavings } = results;

  // Calculate trust efficiency
  const totalValue = trustValue + deathBenefit;
  const trustEfficiency = totalValue > 0 ? (netBenefit / totalValue) * 100 : 0;

  // Calculate tax optimization score
  const taxOptimizationScore = totalValue > 0 ? (taxSavings / totalValue) * 100 : 0;

  // Calculate beneficiary protection
  const beneficiaryProtection = trustType === 'life-insurance' ? 95 : trustType === 'charitable-remainder' ? 90 : 85;

  // Determine estate planning benefit
  let estatePlanningBenefit: 'low' | 'medium' | 'high' = 'medium';
  if (taxOptimizationScore > 30) estatePlanningBenefit = 'high';
  else if (taxOptimizationScore < 15) estatePlanningBenefit = 'low';

  return {
    trustEfficiency,
    taxOptimizationScore,
    beneficiaryProtection,
    estatePlanningBenefit
  };
}

export function validateILITInputs(inputs: ILITInputs): string[] {
  const errors: string[] = [];

  if (inputs.trustValue < 0) {
    errors.push('Trust value cannot be negative');
  }

  if (inputs.annualPremium <= 0) {
    errors.push('Annual premium must be greater than $0');
  }

  if (inputs.deathBenefit <= 0) {
    errors.push('Death benefit must be greater than $0');
  }

  if (inputs.trustDuration <= 0 || inputs.trustDuration > 100) {
    errors.push('Trust duration must be between 1 and 100 years');
  }

  if (inputs.discountRate < -10 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between -10% and 20%');
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.numberOfBeneficiaries <= 0) {
    errors.push('Number of beneficiaries must be at least 1');
  }

  return errors;
}