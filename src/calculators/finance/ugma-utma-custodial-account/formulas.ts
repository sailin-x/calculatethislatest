import { UGMACustodialAccountInputs, UGMACustodialAccountMetrics, UGMACustodialAccountAnalysis } from './types';

// Current annual gift tax exclusion (2024)
const ANNUAL_GIFT_TAX_EXCLUSION = 18000;

// Lifetime gift tax exemption (2024)
const LIFETIME_GIFT_TAX_EXEMPTION = 13200000;

// Federal capital gains tax rates
const CAPITAL_GAINS_RATES = {
  shortTerm: 0.37, // Top federal rate
  longTerm: [
    { threshold: 47025, rate: 0.00 },
    { threshold: 518900, rate: 0.15 },
    { threshold: Infinity, rate: 0.20 }
  ]
};

// State tax rates (simplified - would need state-specific lookup)
const STATE_TAX_RATES: Record<string, number> = {
  'CA': 0.133,
  'NY': 0.109,
  'TX': 0.00,
  'FL': 0.00,
  // Add more states as needed
};

// Custodial account transfer ages
const TRANSFER_AGES = {
  UGMA: 18,
  UTMA: 21
};

export function calculateFutureValue(inputs: UGMACustodialAccountInputs): number {
  const { initialContribution, annualContribution, contributionFrequency, expectedReturnRate, inflationRate, childAge } = inputs;

  const yearsToTransfer = TRANSFER_AGES[inputs.custodialAccountType] - childAge;
  if (yearsToTransfer <= 0) return initialContribution;

  const monthlyRate = expectedReturnRate / 100 / 12;
  const inflationAdjustedRate = monthlyRate - (inflationRate / 100 / 12);

  let futureValue = initialContribution * Math.pow(1 + inflationAdjustedRate, yearsToTransfer * 12);

  const contributionsPerYear = contributionFrequency === 'monthly' ? 12 :
                              contributionFrequency === 'quarterly' ? 4 : 1;

  const contributionAmount = annualContribution / contributionsPerYear;

  for (let year = 0; year < yearsToTransfer; year++) {
    for (let period = 0; period < contributionsPerYear; period++) {
      const monthsRemaining = (yearsToTransfer - year) * 12 - period * (12 / contributionsPerYear);
      futureValue += contributionAmount * Math.pow(1 + inflationAdjustedRate, monthsRemaining);
    }
  }

  return futureValue;
}

export function calculateTotalContributions(inputs: UGMACustodialAccountInputs): number {
  const { initialContribution, annualContribution, childAge } = inputs;
  const yearsToTransfer = TRANSFER_AGES[inputs.custodialAccountType] - childAge;

  if (yearsToTransfer <= 0) return initialContribution;

  return initialContribution + (annualContribution * yearsToTransfer);
}

export function calculateTaxLiability(inputs: UGMACustodialAccountInputs, futureValue: number): number {
  const totalContributions = calculateTotalContributions(inputs);
  const capitalGains = futureValue - totalContributions;

  if (capitalGains <= 0) return 0;

  // Assume long-term capital gains (held >1 year)
  let taxRate = 0;
  for (const bracket of CAPITAL_GAINS_RATES.longTerm) {
    if (capitalGains <= bracket.threshold) {
      taxRate = bracket.rate;
      break;
    }
  }

  const federalTax = capitalGains * taxRate;
  const stateTax = capitalGains * (STATE_TAX_RATES[inputs.state] || 0);

  return federalTax + stateTax;
}

export function calculateGiftTaxImpact(inputs: UGMACustodialAccountInputs): number {
  const { annualContribution, giftTaxExclusionUsed } = inputs;
  const availableExclusion = ANNUAL_GIFT_TAX_EXCLUSION - giftTaxExclusionUsed;

  if (annualContribution <= availableExclusion) return 0;

  const excess = annualContribution - availableExclusion;
  return excess * 0.40; // 40% gift tax rate
}

export function calculateCustodialAccountValue(inputs: UGMACustodialAccountInputs): number {
  return calculateFutureValue(inputs) - calculateTaxLiability(inputs, calculateFutureValue(inputs));
}

export function calculateAnnualTaxSavings(inputs: UGMACustodialAccountInputs): number {
  // Tax savings from using custodial account vs. parent's tax rate
  const parentTaxRate = 0.32; // Assume 32% effective tax rate
  const futureValue = calculateFutureValue(inputs);
  const totalContributions = calculateTotalContributions(inputs);
  const capitalGains = futureValue - totalContributions;

  return capitalGains * (parentTaxRate - CAPITAL_GAINS_RATES.longTerm[0].rate);
}

export function calculateTransferAge(inputs: UGMACustodialAccountInputs): number {
  return TRANSFER_AGES[inputs.custodialAccountType];
}

export function calculateTransferValue(inputs: UGMACustodialAccountInputs): number {
  return calculateCustodialAccountValue(inputs);
}

export function calculateResult(inputs: UGMACustodialAccountInputs): number {
  return calculateCustodialAccountValue(inputs);
}

export function generateAnalysis(inputs: UGMACustodialAccountInputs, metrics: UGMACustodialAccountMetrics): UGMACustodialAccountAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.expectedReturnRate > 10) riskLevel = 'High';
  else if (inputs.expectedReturnRate > 7) riskLevel = 'Medium';

  const taxEfficiency = (metrics.netValue / (metrics.totalContributions + metrics.totalEarnings)) * 100;
  const growthPotential = inputs.expectedReturnRate - inputs.inflationRate;

  let recommendation = '';
  if (taxEfficiency > 80) {
    recommendation = 'Excellent tax efficiency. Consider maximizing annual contributions within gift tax limits.';
  } else if (taxEfficiency > 60) {
    recommendation = 'Good tax efficiency. Monitor market conditions and consider tax-loss harvesting.';
  } else {
    recommendation = 'Review investment strategy. Consider more tax-efficient investments or consult a tax advisor.';
  }

  return { recommendation, riskLevel, taxEfficiency, growthPotential };
}