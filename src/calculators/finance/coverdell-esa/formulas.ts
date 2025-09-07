import {
  CoverdellESAInputs,
  CoverdellESAOutputs,
  CoverdellESAMetrics,
  CoverdellESAAnalysis
} from './types';

// Helper function to calculate compound growth
function calculateCompoundGrowth(principal: number, rate: number, time: number): number {
  return principal * Math.pow(1 + rate, time);
}

// Helper function to calculate future value of annuity
function calculateFutureValueAnnuity(payment: number, rate: number, periods: number): number {
  if (rate === 0) return payment * periods;
  return payment * ((Math.pow(1 + rate, periods) - 1) / rate);
}

// Helper function to calculate Coverdell ESA contribution limits
function calculateContributionLimits(inputs: CoverdellESAInputs): {
  maxAnnualContribution: number;
  remainingRoom: number;
  utilization: number;
} {
  const baseLimit = 2000; // 2024 limit
  const maxAnnualContribution = baseLimit * (inputs.useSpouseAccount ? 2 : 1);
  const currentContributions = inputs.annualContribution;
  const remainingRoom = Math.max(0, maxAnnualContribution - currentContributions);
  const utilization = (currentContributions / maxAnnualContribution) * 100;

  return {
    maxAnnualContribution,
    remainingRoom,
    utilization
  };
}

// Helper function to calculate tax benefits
function calculateTaxBenefits(inputs: CoverdellESAInputs, growth: number): {
  taxSavings: number;
  stateBenefits: number;
  totalAdvantages: number;
} {
  const taxSavings = growth * inputs.taxBracket;
  const stateBenefits = inputs.includeStateTaxBenefits ? taxSavings * inputs.stateTaxRate : 0;
  const totalAdvantages = taxSavings + stateBenefits;

  return {
    taxSavings,
    stateBenefits,
    totalAdvantages
  };
}

// Helper function to assess account health
function assessAccountHealth(contributionUtilization: number, yearsToEducation: number): string {
  if (contributionUtilization >= 80 && yearsToEducation >= 10) return 'Excellent';
  if (contributionUtilization >= 60 && yearsToEducation >= 7) return 'Good';
  if (contributionUtilization >= 40 && yearsToEducation >= 5) return 'Fair';
  if (contributionUtilization >= 20 || yearsToEducation >= 3) return 'Concerning';
  return 'Critical';
}

// Main calculation function
export function calculateCoverdellESA(inputs: CoverdellESAInputs): CoverdellESAOutputs {
  const {
    currentBalance,
    annualContribution,
    contributionFrequency,
    expectedReturnRate,
    yearsUntilEducation,
    expectedEducationCost,
    educationDuration,
    taxBracket,
    analysisPeriod
  } = inputs;

  // Calculate contribution limits
  const contributionLimits = calculateContributionLimits(inputs);

  // Calculate total contributions over time
  let totalContributions = currentBalance;
  let periodsPerYear = 1;

  switch (contributionFrequency) {
    case 'monthly':
      periodsPerYear = 12;
      break;
    case 'quarterly':
      periodsPerYear = 4;
      break;
    case 'annually':
      periodsPerYear = 1;
      break;
  }

  const periodicContribution = annualContribution / periodsPerYear;
  const totalPeriods = yearsUntilEducation * periodsPerYear;

  // Calculate future value of contributions
  const futureValueContributions = calculateFutureValueAnnuity(
    periodicContribution,
    expectedReturnRate / periodsPerYear,
    totalPeriods
  );

  // Calculate future value of current balance
  const futureValueCurrent = calculateCompoundGrowth(
    currentBalance,
    expectedReturnRate,
    yearsUntilEducation
  );

  // Total projected balance
  const projectedBalance = futureValueCurrent + futureValueContributions;
  const totalGrowth = projectedBalance - (currentBalance + annualContribution * yearsUntilEducation);

  // Calculate tax benefits
  const taxBenefits = calculateTaxBenefits(inputs, totalGrowth);

  // Calculate education funding potential
  const annualWithdrawal = projectedBalance / educationDuration;
  const educationFundingPotential = Math.min(projectedBalance, expectedEducationCost);
  const fundingGap = Math.max(0, expectedEducationCost - projectedBalance);

  // Generate withdrawal schedule
  const withdrawalSchedule = [];
  let remainingBalance = projectedBalance;

  for (let year = 1; year <= educationDuration; year++) {
    const withdrawalAmount = Math.min(remainingBalance / (educationDuration - year + 1), expectedEducationCost / educationDuration);
    remainingBalance -= withdrawalAmount;

    withdrawalSchedule.push({
      year: year,
      amount: withdrawalAmount,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }

  // Risk projections
  const conservativeReturn = expectedReturnRate * 0.7;
  const optimisticReturn = expectedReturnRate * 1.3;

  const conservativeProjection = calculateCompoundGrowth(
    currentBalance + annualContribution * yearsUntilEducation,
    conservativeReturn,
    yearsUntilEducation
  );

  const optimisticProjection = calculateCompoundGrowth(
    currentBalance + annualContribution * yearsUntilEducation,
    optimisticReturn,
    yearsUntilEducation
  );

  // Calculate probability of success (simplified)
  const requiredAmount = expectedEducationCost;
  const probabilityOfSuccess = Math.min(100, Math.max(0, (projectedBalance / requiredAmount) * 100));

  // Create metrics object
  const metrics: CoverdellESAMetrics = {
    totalContributions: currentBalance + annualContribution * yearsUntilEducation,
    remainingContributionRoom: contributionLimits.remainingRoom,
    maxAnnualContribution: contributionLimits.maxAnnualContribution,
    contributionLimitUtilization: contributionLimits.utilization,
    projectedBalance,
    totalGrowth,
    taxFreeGrowth: totalGrowth,
    taxSavings: taxBenefits.taxSavings,
    stateTaxBenefits: taxBenefits.stateBenefits,
    totalTaxAdvantages: taxBenefits.totalAdvantages,
    educationFundingPotential,
    fundingGap,
    withdrawalSchedule,
    conservativeProjection,
    optimisticProjection,
    probabilityOfSuccess
  };

  // Assess account health
  const accountHealth = assessAccountHealth(contributionLimits.utilization, yearsUntilEducation);

  // Create analysis object
  const analysis: CoverdellESAAnalysis = {
    accountHealth: accountHealth as any,
    recommendation: fundingGap > 0
      ? `Increase annual contributions by $${Math.round(fundingGap / yearsUntilEducation)} to meet education goals`
      : 'Current contribution strategy is on track to meet education funding needs',
    keyInsights: [
      `Projected balance: $${Math.round(projectedBalance).toLocaleString()}`,
      `Tax savings: $${Math.round(taxBenefits.taxSavings).toLocaleString()}`,
      `Education funding potential: $${Math.round(educationFundingPotential).toLocaleString()}`,
      `Contribution utilization: ${Math.round(contributionLimits.utilization)}%`
    ],

    optimalContributionStrategy: contributionLimits.utilization < 80
      ? 'Increase contributions to maximize tax benefits'
      : 'Current contribution level is optimal',

    contributionOptimization: [
      'Maximize annual contributions within IRS limits',
      'Consider spouse account for additional contributions',
      'Set up automatic contributions for consistency',
      'Review contribution limits annually'
    ],

    beneficiaryPlanning: inputs.beneficiaryAge < 18
      ? 'Beneficiary is eligible for full contribution period'
      : `Limited contribution time remaining - ${18 - inputs.beneficiaryAge} years`,

    taxStrategy: 'Utilize tax-free growth and withdrawals for qualified education expenses',

    stateBenefits: inputs.includeStateTaxBenefits
      ? 'State tax benefits included in calculations'
      : 'Consider state tax benefits for additional savings',

    taxDiversification: 'Combine with other tax-advantaged accounts for comprehensive planning',

    riskAssessment: probabilityOfSuccess > 80
      ? 'Low risk of funding shortfall'
      : probabilityOfSuccess > 60
      ? 'Moderate risk - consider increasing contributions'
      : 'High risk - significant adjustment needed',

    diversificationRecommendations: [
      'Diversify investments across asset classes',
      'Consider target-date funds for automatic rebalancing',
      'Review risk tolerance annually',
      'Monitor market conditions and adjust as needed'
    ],

    contingencyPlans: [
      'Increase contribution amounts if possible',
      'Consider additional savings vehicles',
      'Explore scholarship opportunities',
      'Plan for alternative funding sources'
    ],

    educationFundingStrategy: `Annual withdrawals of $${Math.round(annualWithdrawal).toLocaleString()} over ${educationDuration} years`,

    withdrawalOptimization: 'Time withdrawals to match education expense timing',

    alternativeFunding: [
      '529 College Savings Plans',
      'UTMA/UGMA accounts',
      'Education Savings Bonds',
      'Traditional savings accounts'
    ],

    immediateActions: [
      'Maximize current year contributions',
      'Set up automatic contribution schedule',
      'Review beneficiary designations',
      'Consult tax advisor for optimization'
    ],

    longTermStrategy: `Maintain consistent contributions for ${yearsUntilEducation} years with ${expectedReturnRate * 100}% expected return`,

    monitoringPlan: 'Review account annually and adjust contributions based on changing needs',

    recommendedResources: [
      'IRS Publication 970 (Tax Benefits for Education)',
      'Coverdell ESA contribution limit updates',
      'State education savings incentives',
      'Financial aid planning guides'
    ],

    nextSteps: [
      'Set up Coverdell ESA account if not already done',
      'Establish regular contribution schedule',
      'Select appropriate investment options',
      'Create comprehensive education savings plan'
    ]
  };

  return {
    metrics,
    analysis,
    projectedBalance,
    totalTaxSavings: taxBenefits.totalAdvantages,
    educationFundingPotential,
    recommendedAnnualContribution: Math.min(contributionLimits.maxAnnualContribution, annualContribution + (fundingGap > 0 ? fundingGap / yearsUntilEducation : 0))
  };
}

// Validation function
export function validateCoverdellESAInputs(inputs: CoverdellESAInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentBalance || inputs.currentBalance < 0) {
    errors.push('Current balance must be 0 or greater');
  }

  if (!inputs.annualContribution || inputs.annualContribution < 0) {
    errors.push('Annual contribution must be 0 or greater');
  }

  if (!inputs.beneficiaryAge || inputs.beneficiaryAge < 0 || inputs.beneficiaryAge > 30) {
    errors.push('Beneficiary age must be between 0 and 30');
  }

  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.yearsUntilEducation || inputs.yearsUntilEducation < 0 || inputs.yearsUntilEducation > 25) {
    errors.push('Years until education must be between 0 and 25');
  }

  if (!inputs.expectedEducationCost || inputs.expectedEducationCost <= 0) {
    errors.push('Expected education cost must be greater than 0');
  }

  if (!inputs.educationDuration || inputs.educationDuration < 1 || inputs.educationDuration > 8) {
    errors.push('Education duration must be between 1 and 8 years');
  }

  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  return errors;
}