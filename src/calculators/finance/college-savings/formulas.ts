import {
  CollegeSavingsInputs,
  CollegeSavingsOutputs,
  CollegeSavingsMetrics,
  CollegeSavingsAnalysis
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

// Helper function to calculate present value
function calculatePresentValue(futureValue: number, rate: number, periods: number): number {
  return futureValue / Math.pow(1 + rate, periods);
}

// Helper function to calculate tax benefits for 529 plans
function calculate529TaxBenefits(contributions: number, growth: number, taxBracket: number): number {
  // 529 plans offer tax-free growth and tax-free withdrawals for qualified education expenses
  return (growth + contributions) * taxBracket; // Tax savings on growth
}

// Helper function to calculate Coverdell ESA benefits
function calculateCoverdellBenefits(contributions: number, growth: number, taxBracket: number): number {
  // Coverdell ESAs offer tax-free growth and tax-free withdrawals
  return growth * taxBracket; // Tax savings on growth
}

// Helper function to assess savings readiness
function assessSavingsReadiness(savingsRatio: number): string {
  if (savingsRatio >= 0.8) return 'Excellent';
  if (savingsRatio >= 0.6) return 'Good';
  if (savingsRatio >= 0.4) return 'Fair';
  if (savingsRatio >= 0.2) return 'Concerning';
  return 'Critical';
}

// Main calculation function
export function calculateCollegeSavings(inputs: CollegeSavingsInputs): CollegeSavingsOutputs {
  const {
    childAge,
    yearsUntilCollege,
    currentSavings,
    monthlyContribution,
    annualContribution,
    oneTimeContributions,
    expectedReturnRate,
    inflationRate,
    expectedCollegeCost,
    yearsInCollege,
    costIncreaseRate,
    taxBracket,
    use529Plan,
    useCoverdellESA,
    expectedFinancialAid,
    expectedScholarships,
    analysisPeriod
  } = inputs;

  // Calculate total years for analysis
  const totalYears = yearsUntilCollege + yearsInCollege;

  // Calculate regular contributions
  const totalMonthlyContributions = monthlyContribution * 12 * yearsUntilCollege;
  const totalAnnualContributions = annualContribution * yearsUntilCollege;
  const totalRegularContributions = totalMonthlyContributions + totalAnnualContributions;

  // Calculate future value of current savings
  const futureValueCurrentSavings = calculateCompoundGrowth(
    currentSavings,
    expectedReturnRate,
    yearsUntilCollege
  );

  // Calculate future value of regular contributions
  const monthlyFutureValue = calculateFutureValueAnnuity(
    monthlyContribution,
    expectedReturnRate / 12,
    yearsUntilCollege * 12
  );

  const annualFutureValue = calculateFutureValueAnnuity(
    annualContribution,
    expectedReturnRate,
    yearsUntilCollege
  );

  // Calculate future value of one-time contributions
  const oneTimeFutureValue = calculateCompoundGrowth(
    oneTimeContributions,
    expectedReturnRate,
    yearsUntilCollege
  );

  // Total savings at college start
  const totalSavingsAtCollege = futureValueCurrentSavings + monthlyFutureValue +
                                annualFutureValue + oneTimeFutureValue;

  // Calculate projected college cost
  const projectedCollegeCost = expectedCollegeCost * Math.pow(1 + costIncreaseRate, yearsUntilCollege);

  // Calculate inflation-adjusted cost
  const inflationAdjustedCost = expectedCollegeCost * Math.pow(1 + inflationRate, yearsUntilCollege);

  // Calculate net cost after aid
  const totalAid = expectedFinancialAid + expectedScholarships;
  const netCostAfterAid = Math.max(0, projectedCollegeCost - totalAid);

  // Calculate savings gap
  const savingsGap = Math.max(0, netCostAfterAid - totalSavingsAtCollege);

  // Calculate tax benefits
  const investmentGrowth = totalSavingsAtCollege - (currentSavings + totalRegularContributions + oneTimeContributions);
  let taxSavings = 0;

  if (use529Plan) {
    taxSavings += calculate529TaxBenefits(totalRegularContributions + oneTimeContributions, investmentGrowth, taxBracket);
  }

  if (useCoverdellESA) {
    taxSavings += calculateCoverdellBenefits(totalRegularContributions + oneTimeContributions, investmentGrowth, taxBracket);
  }

  // Calculate risk projections
  const conservativeReturn = expectedReturnRate * 0.7;
  const optimisticReturn = expectedReturnRate * 1.3;

  const conservativeProjection = calculateCompoundGrowth(
    currentSavings + totalRegularContributions + oneTimeContributions,
    conservativeReturn,
    yearsUntilCollege
  );

  const optimisticProjection = calculateCompoundGrowth(
    currentSavings + totalRegularContributions + oneTimeContributions,
    optimisticReturn,
    yearsUntilCollege
  );

  // Calculate probability of success (simplified)
  const requiredAmount = netCostAfterAid;
  const projectedAmount = totalSavingsAtCollege;
  const probabilityOfSuccess = Math.min(100, Math.max(0, (projectedAmount / requiredAmount) * 100));

  // Calculate savings milestones
  const savingsMilestones = [];
  for (let year = 1; year <= yearsUntilCollege; year++) {
    const cumulativeSavings = calculateCompoundGrowth(
      currentSavings + (monthlyContribution * 12 + annualContribution) * year + oneTimeContributions,
      expectedReturnRate,
      year
    );

    const targetAmount = (expectedCollegeCost * Math.pow(1 + costIncreaseRate, year)) / yearsUntilCollege * year;

    savingsMilestones.push({
      year,
      cumulativeSavings,
      targetAmount
    });
  }

  // Create metrics object
  const metrics: CollegeSavingsMetrics = {
    totalSavingsAtCollege,
    monthlySavingsNeeded: savingsGap > 0 ? savingsGap / (yearsUntilCollege * 12) : 0,
    annualSavingsNeeded: savingsGap > 0 ? savingsGap / yearsUntilCollege : 0,
    totalContributions: totalRegularContributions + oneTimeContributions,
    totalInvestmentGrowth: investmentGrowth,
    projectedCollegeCost,
    inflationAdjustedCost,
    netCostAfterAid,
    savingsGap,
    fundingShortfall: savingsGap,
    additionalMonthlyNeeded: savingsGap > 0 ? savingsGap / (yearsUntilCollege * 12) : 0,
    taxSavings,
    stateTaxBenefits: taxSavings * 0.5, // Estimated state benefits
    totalTaxAdvantages: taxSavings,
    conservativeProjection,
    optimisticProjection,
    probabilityOfSuccess,
    savingsMilestones
  };

  // Calculate savings ratio for readiness assessment
  const savingsRatio = totalSavingsAtCollege / netCostAfterAid;
  const savingsReadiness = assessSavingsReadiness(savingsRatio);

  // Create analysis object
  const analysis: CollegeSavingsAnalysis = {
    savingsReadiness: savingsReadiness as any,
    recommendation: savingsGap > 0
      ? `Increase monthly contributions by $${Math.round(metrics.additionalMonthlyNeeded)} to meet savings goal`
      : 'Current savings plan is on track to meet college costs',
    keyInsights: [
      `Projected savings: $${Math.round(totalSavingsAtCollege).toLocaleString()}`,
      `Projected college cost: $${Math.round(projectedCollegeCost).toLocaleString()}`,
      `Savings gap: $${Math.round(savingsGap).toLocaleString()}`,
      `Tax savings: $${Math.round(taxSavings).toLocaleString()}`
    ],

    optimalContributionStrategy: monthlyContribution > 0
      ? 'Continue current monthly contribution strategy'
      : 'Establish regular monthly contributions for compound growth',

    investmentRecommendations: [
      'Diversify across stocks, bonds, and cash equivalents',
      'Consider target-date funds for automatic rebalancing',
      'Review and adjust investment mix annually',
      'Consider professional financial advice for complex situations'
    ],

    taxOptimization: use529Plan || useCoverdellESA
      ? 'Currently utilizing tax-advantaged savings vehicles'
      : 'Consider 529 plans or Coverdell ESAs for tax benefits',

    riskAssessment: probabilityOfSuccess > 80
      ? 'Low risk of not meeting savings goals'
      : probabilityOfSuccess > 60
      ? 'Moderate risk - consider increasing contributions'
      : 'High risk - significant adjustment needed',

    contingencyPlans: [
      'Increase monthly contributions if possible',
      'Consider part-time work for student',
      'Explore additional scholarship opportunities',
      'Consider community college for first two years'
    ],

    sensitivityAnalysis: `Conservative projection: $${Math.round(conservativeProjection).toLocaleString()}, Optimistic: $${Math.round(optimisticProjection).toLocaleString()}`,

    immediateActions: [
      'Set up automatic monthly contributions',
      'Review and optimize investment allocation',
      'Research tax-advantaged savings options',
      'Create detailed savings timeline'
    ],

    longTermStrategy: `Maintain consistent contributions for ${yearsUntilCollege} years with ${expectedReturnRate * 100}% expected return`,

    monitoringPlan: 'Review savings progress quarterly and adjust contributions as needed',

    recommendedResources: [
      'College Board savings calculator',
      'IRS Publication 970 (Tax Benefits for Education)',
      'State education savings plan websites',
      'Financial aid counseling services'
    ],

    nextSteps: [
      'Establish regular contribution schedule',
      'Set up tax-advantaged savings accounts',
      'Research college cost trends',
      'Create comprehensive savings plan'
    ]
  };

  // Calculate years to goal
  const yearsToGoal = savingsGap > 0
    ? Math.log(netCostAfterAid / (currentSavings + totalRegularContributions + oneTimeContributions)) / Math.log(1 + expectedReturnRate)
    : 0;

  return {
    metrics,
    analysis,
    totalProjectedSavings: totalSavingsAtCollege,
    projectedShortfall: savingsGap,
    recommendedMonthlyContribution: metrics.additionalMonthlyNeeded,
    yearsToGoal: Math.max(0, yearsToGoal)
  };
}

// Validation function
export function validateCollegeSavingsInputs(inputs: CollegeSavingsInputs): string[] {
  const errors: string[] = [];

  if (!inputs.childAge || inputs.childAge < 0 || inputs.childAge > 18) {
    errors.push('Child age must be between 0 and 18');
  }

  if (!inputs.yearsUntilCollege || inputs.yearsUntilCollege < 0 || inputs.yearsUntilCollege > 20) {
    errors.push('Years until college must be between 0 and 20');
  }

  if (inputs.currentSavings !== undefined && inputs.currentSavings < 0) {
    errors.push('Current savings cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.expectedCollegeCost || inputs.expectedCollegeCost <= 0) {
    errors.push('Expected college cost must be greater than 0');
  }

  if (!inputs.yearsInCollege || inputs.yearsInCollege < 2 || inputs.yearsInCollege > 8) {
    errors.push('Years in college must be between 2 and 8');
  }

  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  return errors;
}