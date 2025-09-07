import {
  CollegeCostInputs,
  CollegeCostMetrics,
  CollegeCostAnalysis,
  CollegeCostOutputs
} from './types';

// Helper function to calculate degree duration based on type
function getDegreeDuration(degreeType: string): number {
  const durations = {
    'associate': 2,
    'bachelor': 4,
    'masters': 6,
    'phd': 8,
    'professional': 8
  };
  return durations[degreeType as keyof typeof durations] || 4;
}

// Helper function to calculate base annual cost
function calculateBaseAnnualCost(inputs: CollegeCostInputs): number {
  const {
    annualTuition,
    annualRoomAndBoard,
    annualBooksAndSupplies,
    annualTransportation,
    annualPersonalExpenses,
    annualHealthInsurance
  } = inputs;

  return annualTuition + annualRoomAndBoard + annualBooksAndSupplies +
         annualTransportation + annualPersonalExpenses + annualHealthInsurance;
}

// Helper function to calculate total cost with inflation
function calculateInflatedCost(baseCost: number, inflationRate: number, years: number): number {
  if (inflationRate === 0) return baseCost * years;
  const inflationFactor = (1 + inflationRate / 100) ** years;
  return baseCost * ((inflationFactor - 1) / (inflationRate / 100));
}

// Helper function to calculate present value of future costs
function calculatePresentValue(futureAmount: number, discountRate: number, years: number): number {
  return futureAmount / ((1 + discountRate / 100) ** years);
}

// Helper function to calculate required savings
function calculateRequiredSavings(
  totalCost: number,
  currentSavings: number,
  yearsUntilCollege: number,
  investmentReturn: number,
  taxRate: number
): number {
  const futureValueNeeded = totalCost - currentSavings;
  if (futureValueNeeded <= 0) return 0;

  const monthlyRate = investmentReturn / 100 / 12;
  const numPayments = yearsUntilCollege * 12;

  if (monthlyRate === 0) {
    return (futureValueNeeded / numPayments) * (1 + taxRate / 100);
  }

  const monthlySavings = futureValueNeeded * (monthlyRate) /
    ((1 + monthlyRate) ** numPayments - 1);

  return monthlySavings * (1 + taxRate / 100);
}

// Helper function to calculate financial aid impact
function calculateAidImpact(inputs: CollegeCostInputs): { totalAid: number; netCost: number; aidPercentage: number } {
  const {
    expectedGrants,
    expectedScholarships,
    expectedWorkStudy,
    expectedStudentLoans,
    expectedParentLoans,
    expectedFamilyContribution
  } = inputs;

  const totalAid = expectedGrants + expectedScholarships + expectedWorkStudy +
                   expectedStudentLoans + expectedParentLoans + expectedFamilyContribution;

  const baseAnnualCost = calculateBaseAnnualCost(inputs);
  const netCost = Math.max(0, baseAnnualCost - totalAid);
  const aidPercentage = baseAnnualCost > 0 ? (totalAid / baseAnnualCost) * 100 : 0;

  return { totalAid, netCost, aidPercentage };
}

// Helper function to calculate scenario analysis
function calculateScenarios(
  baseCost: number,
  optimisticGrowth: number,
  pessimisticGrowth: number,
  probabilityOptimistic: number,
  probabilityPessimistic: number,
  years: number
): { optimistic: number; pessimistic: number; expected: number; volatility: number } {
  const optimisticCost = baseCost * ((1 + optimisticGrowth / 100) ** years);
  const pessimisticCost = baseCost * ((1 + pessimisticGrowth / 100) ** years);
  const probabilityBase = 1 - probabilityOptimistic - probabilityPessimistic;

  const expectedCost = optimisticCost * (probabilityOptimistic / 100) +
                      baseCost * (probabilityBase) +
                      pessimisticCost * (probabilityPessimistic / 100);

  const variance = (optimisticCost - expectedCost) ** 2 * (probabilityOptimistic / 100) +
                  (pessimisticCost - expectedCost) ** 2 * (probabilityPessimistic / 100) +
                  (baseCost - expectedCost) ** 2 * probabilityBase;

  const volatility = Math.sqrt(variance);

  return {
    optimistic: optimisticCost,
    pessimistic: pessimisticCost,
    expected: expectedCost,
    volatility
  };
}

// Helper function to assess affordability
function assessAffordability(netCost: number, familyIncome: number = 75000): string {
  const costToIncomeRatio = netCost / (familyIncome / 12); // Monthly cost vs monthly income

  if (costToIncomeRatio < 0.05) return 'Highly Affordable';
  if (costToIncomeRatio < 0.1) return 'Affordable';
  if (costToIncomeRatio < 0.15) return 'Manageable';
  if (costToIncomeRatio < 0.2) return 'Challenging';
  return 'Very Challenging';
}

// Main calculation function
export function calculateCollegeCost(inputs: CollegeCostInputs): CollegeCostOutputs {
  const {
    degreeType,
    inflationRate,
    yearsUntilCollege,
    planningHorizon,
    optimisticGrowth,
    pessimisticGrowth,
    probabilityOptimistic,
    probabilityPessimistic,
    includeSummerSchool,
    summerSchoolCost,
    includeStudyAbroad,
    studyAbroadCost,
    includeInternships,
    internshipEarnings
  } = inputs;

  // Calculate degree duration and total years
  const degreeDuration = getDegreeDuration(degreeType);
  const totalYears = Math.min(degreeDuration, planningHorizon);

  // Calculate base annual cost
  const baseAnnualCost = calculateBaseAnnualCost(inputs);

  // Add additional costs
  let adjustedAnnualCost = baseAnnualCost;
  if (includeSummerSchool) {
    adjustedAnnualCost += summerSchoolCost / 2; // Assuming summer school is half year
  }
  if (includeStudyAbroad) {
    adjustedAnnualCost += studyAbroadCost / totalYears; // Spread over degree
  }
  if (includeInternships) {
    adjustedAnnualCost -= internshipEarnings / 12; // Monthly internship earnings
  }

  // Calculate total costs with inflation
  const totalFourYearCost = calculateInflatedCost(adjustedAnnualCost, inflationRate, 4);
  const totalDegreeCost = calculateInflatedCost(adjustedAnnualCost, inflationRate, totalYears);

  // Calculate financial aid impact
  const { totalAid, netCost, aidPercentage } = calculateAidImpact(inputs);
  const netTotalCost = calculateInflatedCost(netCost, inflationRate, totalYears);

  // Calculate savings requirements
  const requiredMonthlySavings = calculateRequiredSavings(
    netTotalCost,
    0, // Assuming no current savings for planning
    yearsUntilCollege,
    inputs.investmentReturn,
    inputs.taxRate
  );

  const requiredAnnualSavings = requiredMonthlySavings * 12;

  // Calculate scenario analysis
  const scenarios = calculateScenarios(
    adjustedAnnualCost,
    optimisticGrowth,
    pessimisticGrowth,
    probabilityOptimistic,
    probabilityPessimistic,
    totalYears
  );

  // Calculate affordability
  const affordabilityRating = assessAffordability(netCost);

  // Generate analysis
  const analysis: CollegeCostAnalysis = {
    totalCost: totalDegreeCost,
    monthlySavingsRequired: requiredMonthlySavings,
    affordabilityAssessment: affordabilityRating as any,
    recommendation: netTotalCost > 100000 ? 'Increase Savings' :
                   aidPercentage < 50 ? 'Seek More Aid' :
                   'Proceed as Planned',

    keyCostDrivers: [
      'Tuition and fees',
      'Room and board',
      'Inflation impact',
      'Geographic location',
      'Degree program choice'
    ],

    savingsOpportunities: [
      '529 College Savings Plan',
      'UGMA/UTMA accounts',
      'Coverdell ESA',
      'Prepaid tuition plans',
      'Tax-advantaged investments'
    ],

    aidMaximizationStrategies: [
      'Complete FAFSA early',
      'Apply for institutional aid',
      'Consider work-study programs',
      'Explore private scholarships',
      'Appeal financial aid awards'
    ],

    riskFactors: [
      'Inflation uncertainty',
      'Investment market volatility',
      'Changes in financial aid policies',
      'Unexpected family circumstances',
      'Student performance and graduation timeline'
    ],

    costBreakdown: `$${baseAnnualCost.toLocaleString()} base annual cost inflated to $${totalDegreeCost.toLocaleString()} over ${totalYears} years`,
    inflationImpact: `${inflationRate}% annual inflation increases total cost by ${((totalDegreeCost / (baseAnnualCost * totalYears) - 1) * 100).toFixed(1)}%`,
    scenarioAnalysis: `Expected cost: $${scenarios.expected.toLocaleString()}, Range: $${scenarios.pessimistic.toLocaleString()} - $${scenarios.optimistic.toLocaleString()}`,

    savingsPlan: `Save $${requiredMonthlySavings.toLocaleString()} monthly for ${yearsUntilCollege} years at ${inputs.investmentReturn}% return`,
    investmentStrategy: 'Diversify across stocks, bonds, and cash equivalents',
    taxOptimization: 'Utilize tax-advantaged savings vehicles and maximize deductions',

    aidOptimization: `${aidPercentage.toFixed(1)}% of costs covered by aid. Focus on merit-based scholarships and grants.`,
    fundingGapAnalysis: `$${netTotalCost.toLocaleString()} funding gap requires ${(netTotalCost / totalDegreeCost * 100).toFixed(1)}% self-funding`,
    alternativeFunding: 'Consider income-share agreements, employer tuition assistance, and crowdfunding',

    costVolatility: `Cost volatility: ±${((scenarios.volatility / scenarios.expected) * 100).toFixed(1)}%`,
    marketRisk: 'Investment returns may vary significantly',
    inflationRisk: 'College cost inflation may exceed expectations',

    actionPlan: [
      'Establish dedicated college savings account',
      'Complete financial aid applications',
      'Research and compare college options',
      'Create detailed budget and savings plan',
      'Monitor progress annually'
    ],

    timeline: `Years ${yearsUntilCollege - 5} to ${yearsUntilCollege}: Accelerate savings. Year ${yearsUntilCollege}: Finalize college selection and aid.`,

    monitoringStrategy: [
      'Annual review of savings progress',
      'Monitor college cost inflation',
      'Track financial aid eligibility',
      'Adjust savings rate as needed',
      'Reevaluate college choices annually'
    ],

    costReductionStrategies: [
      'Attend in-state public college',
      'Consider community college first',
      'Live at home to reduce room and board',
      'Work part-time during school',
      'Apply for more scholarships and grants'
    ],

    savingsAcceleration: [
      'Increase savings rate temporarily',
      'Reduce discretionary spending',
      'Seek higher-paying employment',
      'Utilize windfalls for college fund',
      'Consider Roth IRA contributions'
    ],

    aidImprovement: [
      'Improve academic performance for merit aid',
      'Apply to colleges with generous aid',
      'Complete FAFSA and CSS Profile',
      'Appeal initial aid awards',
      'Research private scholarship opportunities'
    ],

    costBenchmarks: [
      {
        category: 'Annual Tuition',
        currentCost: inputs.annualTuition,
        nationalAverage: 35000,
        percentile: inputs.annualTuition > 50000 ? 90 : inputs.annualTuition > 35000 ? 75 : 50
      },
      {
        category: 'Room and Board',
        currentCost: inputs.annualRoomAndBoard,
        nationalAverage: 12000,
        percentile: inputs.annualRoomAndBoard > 15000 ? 80 : inputs.annualRoomAndBoard > 12000 ? 60 : 40
      }
    ],

    decisionSummary: `Total estimated cost: $${totalDegreeCost.toLocaleString()}. Monthly savings needed: $${requiredMonthlySavings.toLocaleString()}. ${aidPercentage.toFixed(1)}% funded by aid. ${affordabilityRating} affordability rating.`,

    contingencyPlans: [
      'Maintain emergency fund for unexpected costs',
      'Consider part-time work for student',
      'Have backup college options',
      'Plan for potential changes in family income',
      'Research loan forgiveness options'
    ],

    nextSteps: [
      'Open college savings account',
      'Research colleges and costs',
      'Complete financial aid applications',
      'Create detailed savings plan',
      'Schedule meeting with financial advisor'
    ]
  };

  return {
    totalFourYearCost,
    totalDegreeCost,
    requiredMonthlySavings,
    netTotalCost,
    analysis,
    annualAverageCost: totalDegreeCost / totalYears,
    totalAid,
    aidGap: netTotalCost,
    optimisticTotalCost: scenarios.optimistic,
    pessimisticTotalCost: scenarios.pessimistic,
    affordabilityRating
  };
}

// Validation function
export function validateCollegeCostInputs(inputs: CollegeCostInputs): string[] {
  const errors: string[] = [];

  if (!inputs.studentAge || inputs.studentAge < 14 || inputs.studentAge > 25) {
    errors.push('Student age must be between 14 and 25');
  }

  if (!inputs.yearsUntilCollege || inputs.yearsUntilCollege < 0 || inputs.yearsUntilCollege > 20) {
    errors.push('Years until college must be between 0 and 20');
  }

  if (!inputs.annualTuition || inputs.annualTuition < 0) {
    errors.push('Annual tuition cannot be negative');
  }

  if (!inputs.annualRoomAndBoard || inputs.annualRoomAndBoard < 0) {
    errors.push('Annual room and board cannot be negative');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.investmentReturn !== undefined && (inputs.investmentReturn < -10 || inputs.investmentReturn > 25)) {
    errors.push('Investment return must be between -10% and 25%');
  }

  if (!inputs.planningHorizon || inputs.planningHorizon < 1 || inputs.planningHorizon > 20) {
    errors.push('Planning horizon must be between 1 and 20 years');
  }

  if (inputs.probabilityOptimistic + inputs.probabilityPessimistic > 100) {
    errors.push('Combined optimistic and pessimistic probabilities cannot exceed 100%');
  }

  return errors;
}