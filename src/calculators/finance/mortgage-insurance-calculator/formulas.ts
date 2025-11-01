import { MortgageInsuranceInputs, MortgageInsuranceOutputs } from './types';

// Calculate PMI requirement and rate
export function calculatePmiRequirement(inputs: MortgageInsuranceInputs): { required: boolean; rate: number; cancellationLtv: number } {
  const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;

  let required = false;
  let rate = 0;
  let cancellationLtv = 78; // Default cancellation LTV

  // Conventional loan PMI requirements
  if (inputs.loanType === 'conventional') {
    if (downPaymentPercent < 20) {
      required = true;
      // PMI rate based on credit score and LTV
      if (inputs.creditScore >= 760) {
        rate = ltv >= 95 ? 0.55 : ltv >= 90 ? 0.32 : 0.22;
      } else if (inputs.creditScore >= 700) {
        rate = ltv >= 95 ? 0.75 : ltv >= 90 ? 0.42 : 0.32;
      } else if (inputs.creditScore >= 680) {
        rate = ltv >= 95 ? 0.95 : ltv >= 90 ? 0.52 : 0.42;
      } else {
        rate = ltv >= 95 ? 1.15 : ltv >= 90 ? 0.72 : 0.52;
      }
    }
  }

  // FHA loans always require MIP (Mortgage Insurance Premium)
  if (inputs.loanType === 'fha') {
    required = true;
    rate = downPaymentPercent >= 10 ? 0.55 : 0.80; // Annual MIP rate
    cancellationLtv = 78;
  }

  // VA loans have funding fee instead of traditional MI
  if (inputs.loanType === 'va') {
    required = true;
    // VA funding fee based on down payment and service history
    rate = downPaymentPercent >= 10 ? 1.4 : 2.3; // One-time funding fee percentage
    cancellationLtv = 0; // VA loans don't have ongoing MI
  }

  return { required, rate, cancellationLtv };
}

// Calculate MI (Mortgage Insurance) for FHA/VA loans
export function calculateMiRequirement(inputs: MortgageInsuranceInputs): { required: boolean; rate: number } {
  let required = false;
  let rate = 0;

  if (inputs.loanType === 'fha') {
    required = true;
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
    rate = downPaymentPercent >= 10 ? 0.55 : 0.80; // Annual MIP rate
  }

  if (inputs.loanType === 'va') {
    required = true;
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
    // VA funding fee (one-time payment)
    rate = downPaymentPercent >= 10 ? 1.4 : 2.3;
  }

  return { required, rate };
}

// Calculate homeowners insurance premium
export function calculateHomeownersInsurance(inputs: MortgageInsuranceInputs): number {
  // Base rate per $1000 of dwelling coverage
  let baseRate = 0.35; // $0.35 per $1000

  // Adjust for location risk factors
  if (inputs.floodZone === 'V' || inputs.floodZone === 'A') {
    baseRate *= 1.5; // High flood risk
  }

  if (inputs.windstormCoverage) {
    baseRate *= 1.3; // Windstorm prone area
  }

  if (inputs.earthquakeCoverage) {
    baseRate *= 1.2; // Earthquake zone
  }

  // Adjust for property value
  const dwellingCoverage = inputs.insuranceCoverage.dwelling;
  const annualPremium = (dwellingCoverage / 1000) * baseRate;

  // Add liability coverage
  const liabilityPremium = inputs.insuranceCoverage.liability / 100;

  // Add other coverages
  let additionalPremium = 0;
  if (inputs.moldCoverage) additionalPremium += 50;
  if (inputs.identityTheftCoverage) additionalPremium += 25;

  return annualPremium + liabilityPremium + additionalPremium;
}

// Calculate total insurance costs
export function calculateInsuranceCosts(inputs: MortgageInsuranceInputs): {
  pmiMonthly: number;
  pmiTotal: number;
  miMonthly: number;
  miTotal: number;
  homeownersMonthly: number;
  homeownersAnnual: number;
} {
  const pmi = calculatePmiRequirement(inputs);
  const mi = calculateMiRequirement(inputs);
  const homeownersAnnual = calculateHomeownersInsurance(inputs);

  const loanAmount = inputs.loanAmount;
  const loanTermMonths = inputs.loanTerm * 12;

  const pmiMonthly = pmi.required ? (loanAmount * pmi.rate / 100 / 12) : 0;
  const pmiTotal = pmiMonthly * loanTermMonths;

  const miMonthly = mi.required ? (loanAmount * mi.rate / 100 / 12) : 0;
  const miTotal = miMonthly * loanTermMonths;

  const homeownersMonthly = homeownersAnnual / 12;

  return {
    pmiMonthly,
    pmiTotal,
    miMonthly,
    miTotal,
    homeownersMonthly,
    homeownersAnnual
  };
}

// Generate insurance breakdown
export function generateInsuranceBreakdown(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs['insuranceBreakdown'] {
  const costs = calculateInsuranceCosts(inputs);

  return [
    {
      category: 'Private Mortgage Insurance (PMI)',
      monthlyCost: costs.pmiMonthly,
      annualCost: costs.pmiMonthly * 12,
      description: 'Required for conventional loans with <20% down payment'
    },
    {
      category: 'Mortgage Insurance Premium (MIP)',
      monthlyCost: costs.miMonthly,
      annualCost: costs.miMonthly * 12,
      description: 'Required for FHA loans, annual premium'
    },
    {
      category: 'Homeowners Insurance',
      monthlyCost: costs.homeownersMonthly,
      annualCost: costs.homeownersAnnual,
      description: 'Property, liability, and additional coverages'
    }
  ];
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs['riskAssessment'] {
  const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
  const dti = (inputs.monthlyDebts / inputs.monthlyIncome) * 100;

  // PMI Risk Assessment
  let pmiRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (ltv > 90) pmiRisk = 'High';
  else if (ltv > 80) pmiRisk = 'Medium';

  // MI Risk Assessment
  let miRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.loanType === 'fha' && inputs.creditScore < 620) miRisk = 'High';
  else if (inputs.loanType === 'va' && inputs.borrowerAge < 25) miRisk = 'Medium';

  // Overall Risk
  const riskFactors = [
    inputs.creditScore < 620 ? 3 : inputs.creditScore < 680 ? 2 : 1,
    ltv > 90 ? 3 : ltv > 80 ? 2 : 1,
    dti > 43 ? 3 : dti > 36 ? 2 : 1,
    inputs.latePayments > 2 ? 3 : inputs.latePayments > 0 ? 2 : 1,
    inputs.bankruptcyHistory || inputs.foreclosureHistory ? 3 : 1
  ];

  const averageRisk = riskFactors.reduce((sum, risk) => sum + risk, 0) / riskFactors.length;
  let overallRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (averageRisk > 2.5) overallRisk = 'High';
  else if (averageRisk > 1.5) overallRisk = 'Medium';

  // Generate recommendations
  const recommendations: string[] = [];
  if (overallRisk === 'High') {
    recommendations.push('Consider improving credit score before applying');
    recommendations.push('Save for larger down payment to reduce LTV');
    recommendations.push('Pay down existing debts to improve DTI ratio');
  }
  if (pmiRisk === 'High') {
    recommendations.push('PMI can be expensive - consider 20% down payment');
  }
  if (miRisk === 'High') {
    recommendations.push('FHA loans have stricter requirements - consider conventional loan');
  }

  return {
    overallRisk,
    pmiRisk,
    miRisk,
    recommendations
  };
}

// Generate cost comparison scenarios
export function generateCostComparison(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs['costComparison'] {
  const baseCosts = calculateInsuranceCosts(inputs);

  const scenarios = [
    {
      name: 'Current Scenario',
      pmiRate: calculatePmiRequirement(inputs).rate,
      miRate: calculateMiRequirement(inputs).rate
    },
    {
      name: '20% Down Payment',
      pmiRate: 0, // No PMI with 20% down
      miRate: calculateMiRequirement(inputs).rate
    },
    {
      name: 'Improved Credit (760+)',
      pmiRate: Math.max(0, calculatePmiRequirement({ ...inputs, creditScore: 780 }).rate * 0.7),
      miRate: calculateMiRequirement(inputs).rate
    }
  ];

  return scenarios.map(scenario => {
    const monthlyInsurance = (inputs.loanAmount * scenario.pmiRate / 100 / 12) +
                           (inputs.loanAmount * scenario.miRate / 100 / 12) +
                           (baseCosts.homeownersAnnual / 12);

    const totalCost = monthlyInsurance * inputs.loanTerm * 12;
    const baseTotal = (baseCosts.pmiTotal + baseCosts.miTotal + baseCosts.homeownersAnnual);
    const savings = baseTotal - totalCost;

    return {
      scenario: scenario.name,
      monthlyPayment: monthlyInsurance,
      totalCost,
      savings
    };
  });
}

// Analyze insurance coverage adequacy
export function analyzeCoverageAdequacy(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs['coverageAnalysis'] {
  const totalCoverage = inputs.insuranceCoverage.dwelling +
                       inputs.insuranceCoverage.personalProperty +
                       inputs.insuranceCoverage.liability;

  const recommendedCoverage = inputs.propertyValue * 1.25; // 125% of property value
  const coverageGap = Math.max(0, recommendedCoverage - totalCoverage);
  const adequateCoverage = coverageGap === 0;

  const suggestions: string[] = [];
  if (!adequateCoverage) {
    suggestions.push(`Increase dwelling coverage by $${coverageGap.toLocaleString()} to meet 125% of property value`);
  }
  if (inputs.insuranceCoverage.liability < 300000) {
    suggestions.push('Consider increasing liability coverage to at least $300,000');
  }
  if (!inputs.floodZone || inputs.floodZone === 'X') {
    suggestions.push('Flood insurance may be required based on location');
  }

  return {
    adequateCoverage,
    recommendedCoverage,
    coverageGap,
    suggestions
  };
}

// Main calculation function
export function calculateMortgageInsurance(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs {
  const pmi = calculatePmiRequirement(inputs);
  const mi = calculateMiRequirement(inputs);
  const costs = calculateInsuranceCosts(inputs);

  const insuranceBreakdown = generateInsuranceBreakdown(inputs);
  const riskAssessment = calculateRiskAssessment(inputs);
  const costComparison = generateCostComparison(inputs);
  const coverageAnalysis = analyzeCoverageAdequacy(inputs);

  return {
    pmiRequired: pmi.required,
    pmiRate: pmi.rate,
    pmiMonthly: costs.pmiMonthly,
    pmiTotal: costs.pmiTotal,
    pmiCancellationLtv: pmi.cancellationLtv,
    miRequired: mi.required,
    miRate: mi.rate,
    miMonthly: costs.miMonthly,
    miTotal: costs.miTotal,
    totalInsuranceMonthly: costs.pmiMonthly + costs.miMonthly + costs.homeownersMonthly,
    totalInsuranceAnnual: costs.pmiMonthly * 12 + costs.miMonthly * 12 + costs.homeownersAnnual,
    insuranceBreakdown,
    riskAssessment,
    costComparison,
    coverageAnalysis
  };
}