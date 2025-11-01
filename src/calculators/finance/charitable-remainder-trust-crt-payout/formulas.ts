import { CharitableRemainderTrustInputs, CharitableRemainderTrustMetrics, CharitableRemainderTrustAnalysis } from './types';

// Calculate initial tax deduction for CRT contribution
export function calculateInitialTaxDeduction(
  initialContribution: number,
  payoutRate: number,
  lifeExpectancy: number,
  charitableDeductionRate: number
): number {
  // CRT deduction = Contribution - Present Value of Annuity Interest
  // Simplified calculation: Deduction = Contribution * (1 - payoutRate/100 * lifeExpectancy / (lifeExpectancy + 1))
  const annuityFactor = payoutRate / 100 * lifeExpectancy / (lifeExpectancy + 1);
  const deduction = initialContribution * (1 - annuityFactor);
  return deduction * (charitableDeductionRate / 100);
}

// Calculate annual payout from CRT
export function calculateAnnualPayout(
  initialContribution: number,
  payoutRate: number,
  trustType: string
): number {
  if (trustType === 'charitable_remainder_annuity_trust') {
    // Fixed annuity payout
    return initialContribution * (payoutRate / 100);
  } else {
    // Unitrust payout - simplified, would need more complex calculation
    return initialContribution * (payoutRate / 100);
  }
}

// Calculate total payouts over trust duration
export function calculateTotalPayouts(
  annualPayout: number,
  trustDuration: number,
  expectedAnnualReturn: number,
  inflationRate: number,
  includeInflation: boolean
): number {
  let totalPayouts = 0;
  let currentPayout = annualPayout;

  for (let year = 0; year < trustDuration; year++) {
    totalPayouts += currentPayout;

    if (includeInflation) {
      currentPayout *= (1 + inflationRate / 100);
    }

    // For unitrust, payout may increase with trust value, but simplified here
  }

  return totalPayouts;
}

// Calculate remainder value going to charity
export function calculateRemainderValue(
  initialContribution: number,
  totalPayouts: number,
  expectedAnnualReturn: number,
  investmentFees: number,
  trustDuration: number,
  includeInvestmentFees: boolean
): number {
  let trustValue = initialContribution;

  for (let year = 0; year < trustDuration; year++) {
    const grossReturn = trustValue * (expectedAnnualReturn / 100);
    const fees = includeInvestmentFees ? trustValue * (investmentFees / 100) : 0;
    trustValue += grossReturn - fees;
  }

  return Math.max(0, trustValue - totalPayouts);
}

// Calculate tax savings from CRT strategy
export function calculateTaxSavings(
  initialTaxDeduction: number,
  currentTaxRate: number
): number {
  return initialTaxDeduction * (currentTaxRate / 100);
}

// Calculate effective tax rate after CRT benefits
export function calculateEffectiveTaxRate(
  initialContribution: number,
  taxSavings: number,
  netCostToDonor: number
): number {
  if (netCostToDonor <= 0) return 0;
  return ((initialContribution - taxSavings) / netCostToDonor) * 100;
}

// Calculate net cost to donor (actual economic cost)
export function calculateNetCostToDonor(
  initialContribution: number,
  taxSavings: number,
  totalPayouts: number
): number {
  return initialContribution - taxSavings - totalPayouts;
}

// Calculate trust growth over time
export function calculateTrustGrowth(
  initialContribution: number,
  expectedAnnualReturn: number,
  investmentFees: number,
  trustDuration: number,
  includeInvestmentFees: boolean
): number {
  let trustValue = initialContribution;
  let totalGrowth = 0;

  for (let year = 0; year < trustDuration; year++) {
    const grossReturn = trustValue * (expectedAnnualReturn / 100);
    const fees = includeInvestmentFees ? trustValue * (investmentFees / 100) : 0;
    const netReturn = grossReturn - fees;
    trustValue += netReturn;
    totalGrowth += netReturn;
  }

  return totalGrowth;
}

// Calculate annual cash flow to beneficiary
export function calculateAnnualCashFlow(
  annualPayout: number,
  ordinaryIncomeTaxRate: number,
  includeTaxAnalysis: boolean
): number {
  if (!includeTaxAnalysis) return annualPayout;

  // CRT payouts are taxed as ordinary income
  const taxAmount = annualPayout * (ordinaryIncomeTaxRate / 100);
  return annualPayout - taxAmount;
}

// Calculate total cash flow over trust duration
export function calculateTotalCashFlow(
  annualCashFlow: number,
  trustDuration: number,
  inflationRate: number,
  includeInflation: boolean
): number {
  let totalCashFlow = 0;
  let currentCashFlow = annualCashFlow;

  for (let year = 0; year < trustDuration; year++) {
    totalCashFlow += currentCashFlow;

    if (includeInflation) {
      currentCashFlow *= (1 + inflationRate / 100);
    }
  }

  return totalCashFlow;
}

// Calculate efficiency ratio (benefits vs. costs)
export function calculateEfficiencyRatio(
  totalCashFlow: number,
  taxSavings: number,
  netCostToDonor: number
): number {
  if (netCostToDonor <= 0) return 0;
  return (totalCashFlow + taxSavings) / netCostToDonor;
}

// Generate CRT analysis
export function generateCharitableRemainderTrustAnalysis(
  inputs: CharitableRemainderTrustInputs,
  metrics: CharitableRemainderTrustMetrics
): CharitableRemainderTrustAnalysis {
  const { payoutRate, expectedAnnualReturn, trustDuration, beneficiaryAge } = inputs;
  const { efficiencyRatio, effectiveTaxRate, netCostToDonor } = metrics;

  // Determine trust efficiency
  let trustEfficiency: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (efficiencyRatio > 1.5) trustEfficiency = 'excellent';
  else if (efficiencyRatio > 1.2) trustEfficiency = 'good';
  else if (efficiencyRatio > 1.0) trustEfficiency = 'fair';

  // Determine tax efficiency
  let taxEfficiency: 'high' | 'moderate' | 'low' = 'low';
  if (effectiveTaxRate < 20) taxEfficiency = 'high';
  else if (effectiveTaxRate < 30) taxEfficiency = 'moderate';

  // Determine cash flow efficiency
  let cashFlowEfficiency: 'high' | 'moderate' | 'low' = 'low';
  if (payoutRate >= 7) cashFlowEfficiency = 'high';
  else if (payoutRate >= 5) cashFlowEfficiency = 'moderate';

  // Generate recommendations
  const recommendations = [];
  if (trustEfficiency === 'poor') {
    recommendations.push('Consider adjusting payout rate or trust duration for better efficiency');
  }
  if (taxEfficiency === 'low') {
    recommendations.push('Review tax situation - CRT may not provide optimal tax benefits');
  }
  if (cashFlowEfficiency === 'low') {
    recommendations.push('Consider higher payout rate if cash flow is a priority');
  }
  if (beneficiaryAge >= 70) {
    recommendations.push('Consider Qualified Charitable Distribution (QCD) as alternative');
  }

  // Trust optimization
  const trustOptimization = [
    'Optimize payout rate based on income needs vs. tax benefits',
    'Consider unitrust for potential growth in payouts',
    'Balance trust duration with beneficiary life expectancy',
    'Select appropriate remainder beneficiary charity'
  ];

  // Tax strategy
  const taxStrategy = [
    'Maximize current year tax deduction',
    'Consider bunching charitable contributions',
    'Evaluate impact on required minimum distributions',
    'Plan for ordinary income taxation of payouts'
  ];

  // Risk factors
  const riskFactors = [];
  if (expectedAnnualReturn < 5) {
    riskFactors.push('Low expected returns may reduce trust growth and remainder');
  }
  if (trustDuration > 20) {
    riskFactors.push('Long trust duration increases investment risk');
  }
  if (payoutRate > 10) {
    riskFactors.push('High payout rate may deplete trust principal');
  }

  // Market risk
  const marketRisk = expectedAnnualReturn > 8 ?
    'Moderate market risk - diversified portfolio recommended' :
    'Conservative approach suitable for stability-focused investors';

  // Longevity risk
  const longevityRisk = 'Trust provides income for life of beneficiaries, reducing longevity risk';

  // Legal requirements
  const legalRequirements = [
    'Trust must be irrevocable',
    'Minimum 10% remainder to charity',
    'Payout rate between 5-50% annually',
    'Trust must qualify under IRC Section 664'
  ];

  // Tax compliance
  const taxCompliance = [
    'Annual trust tax return (Form 5227) required',
    'K-1 reporting to beneficiaries',
    'Charitable deduction subject to AGI limits',
    'Payouts taxed as ordinary income'
  ];

  // Reporting requirements
  const reportingRequirements = [
    'Form 5227 - Split-Interest Trust Information Return',
    'Schedule K-1 for beneficiary income',
    'Annual valuation of trust assets',
    'Charitable contribution substantiation'
  ];

  // Beneficiary benefits
  const beneficiaryBenefits = [
    'Guaranteed income stream for life',
    'Tax-efficient income generation',
    'Professional trust management',
    'Asset protection benefits'
  ];

  // Charitable impact
  const charitableImpact = [
    'Supports chosen charitable causes',
    'Potential for significant remainder gift',
    'Multi-generational charitable giving',
    'Tax-advantaged philanthropy'
  ];

  // Estate planning benefits
  const estatePlanningBenefits = [
    'Removes assets from taxable estate',
    'Provides income replacement',
    'Generational wealth transfer',
    'Philanthropic legacy'
  ];

  // Alternative strategy comparisons
  const vsOtherStrategies = [
    {
      strategy: 'Direct Charitable Donation',
      comparison: 'Immediate tax deduction vs. deferred CRT benefits',
      advantages: ['Immediate tax savings', 'Simpler structure', 'No ongoing management'],
      disadvantages: ['No income stream', 'Less estate planning flexibility']
    },
    {
      strategy: 'Retained Assets',
      comparison: 'Keep assets vs. CRT income stream',
      advantages: ['Full control of assets', 'No charitable commitment'],
      disadvantages: ['No tax benefits', 'Subject to estate taxes', 'Investment risk retained']
    },
    {
      strategy: 'Charitable Lead Trust',
      comparison: 'Charity first vs. charity last',
      advantages: ['Charity receives income first', 'Assets return to heirs'],
      disadvantages: ['No income to donor', 'More complex structure']
    }
  ];

  return {
    trustEfficiency,
    taxEfficiency,
    cashFlowEfficiency,
    recommendations,
    trustOptimization,
    taxStrategy,
    riskFactors,
    marketRisk,
    longevityRisk,
    legalRequirements,
    taxCompliance,
    reportingRequirements,
    beneficiaryBenefits,
    charitableImpact,
    estatePlanningBenefits,
    vsOtherStrategies
  };
}