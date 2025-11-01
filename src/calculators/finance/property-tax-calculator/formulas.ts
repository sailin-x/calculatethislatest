import { PropertyTaxInputs, PropertyTaxOutputs } from './types';

// Calculate basic property tax
export function calculatePropertyTax(inputs: PropertyTaxInputs): {
  annualPropertyTax: number;
  monthlyPropertyTax: number;
  quarterlyPropertyTax: number;
  semiAnnualPropertyTax: number;
} {
  // Determine taxable value based on calculation method
  let taxableValue: number;
  switch (inputs.taxCalculationMethod) {
    case 'Assessed Value':
      taxableValue = inputs.assessedValue;
      break;
    case 'Market Value':
      taxableValue = inputs.propertyValue;
      break;
    case 'Appraised Value':
      taxableValue = inputs.assessedValue; // Assuming assessed value is the appraised value
      break;
    default:
      taxableValue = inputs.assessedValue;
  }

  // Apply assessment ratio if provided
  if (inputs.assessmentRatio && inputs.assessmentRatio < 100) {
    taxableValue = inputs.propertyValue * (inputs.assessmentRatio / 100);
  }

  // Calculate total exemptions
  const totalExemptions = inputs.homesteadExemption +
                         inputs.seniorExemption +
                         inputs.disabilityExemption +
                         inputs.veteranExemption +
                         inputs.otherExemptions;

  // Apply exemptions
  const finalTaxableValue = Math.max(0, taxableValue - totalExemptions);

  // Calculate base tax
  const baseTax = finalTaxableValue * (inputs.taxRate / 100);

  // Add special district taxes
  const totalDistrictTaxes = inputs.schoolDistrictTax +
                           inputs.fireDistrictTax +
                           inputs.libraryDistrictTax +
                           inputs.otherDistrictTaxes;

  const annualPropertyTax = baseTax + totalDistrictTaxes;

  return {
    annualPropertyTax,
    monthlyPropertyTax: annualPropertyTax / 12,
    quarterlyPropertyTax: annualPropertyTax / 4,
    semiAnnualPropertyTax: annualPropertyTax / 2
  };
}

// Calculate assessment details
export function calculateAssessmentDetails(inputs: PropertyTaxInputs): {
  taxableValue: number;
  assessedValueUsed: number;
  totalExemptions: number;
  exemptionSavings: number;
} {
  let assessedValueUsed: number;
  switch (inputs.taxCalculationMethod) {
    case 'Assessed Value':
      assessedValueUsed = inputs.assessedValue;
      break;
    case 'Market Value':
      assessedValueUsed = inputs.propertyValue;
      break;
    case 'Appraised Value':
      assessedValueUsed = inputs.assessedValue;
      break;
    default:
      assessedValueUsed = inputs.assessedValue;
  }

  if (inputs.assessmentRatio && inputs.assessmentRatio < 100) {
    assessedValueUsed = inputs.propertyValue * (inputs.assessmentRatio / 100);
  }

  const totalExemptions = inputs.homesteadExemption +
                         inputs.seniorExemption +
                         inputs.disabilityExemption +
                         inputs.veteranExemption +
                         inputs.otherExemptions;

  const taxableValue = Math.max(0, assessedValueUsed - totalExemptions);
  const exemptionSavings = totalExemptions * (inputs.taxRate / 100);

  return {
    taxableValue,
    assessedValueUsed,
    totalExemptions,
    exemptionSavings
  };
}

// Calculate tax relief
export function calculateTaxRelief(inputs: PropertyTaxInputs): {
  eligibleExemptions: string[];
  totalTaxRelief: number;
  circuitBreakerSavings: number;
  propertyTaxReliefSavings: number;
  taxDeferralAmount: number;
} {
  const eligibleExemptions: string[] = [];

  // Determine eligibility for various exemptions
  if (inputs.homesteadExemption > 0) eligibleExemptions.push('Homestead Exemption');
  if (inputs.seniorExemption > 0) eligibleExemptions.push('Senior Exemption');
  if (inputs.disabilityExemption > 0) eligibleExemptions.push('Disability Exemption');
  if (inputs.veteranExemption > 0) eligibleExemptions.push('Veteran Exemption');

  // Additional eligibility checks
  if (inputs.ageOfHomeowner >= 65) eligibleExemptions.push('Senior Citizen Relief');
  if (inputs.disabilityStatus) eligibleExemptions.push('Disability Relief');
  if (inputs.veteranStatus) eligibleExemptions.push('Veteran Relief');

  // Calculate circuit breaker savings (simplified)
  let circuitBreakerSavings = 0;
  if (inputs.circuitBreakerProgram && inputs.householdIncome > 0) {
    const taxBurden = calculatePropertyTax(inputs).annualPropertyTax / inputs.householdIncome;
    if (taxBurden > 0.05) { // 5% threshold
      circuitBreakerSavings = calculatePropertyTax(inputs).annualPropertyTax * 0.5; // 50% relief
    }
  }

  // Property tax relief (simplified)
  let propertyTaxReliefSavings = 0;
  if (inputs.propertyTaxRelief && inputs.householdIncome < 50000) {
    propertyTaxReliefSavings = calculatePropertyTax(inputs).annualPropertyTax * 0.3; // 30% relief
  }

  // Tax deferral (simplified)
  let taxDeferralAmount = 0;
  if (inputs.taxDeferralProgram && inputs.ageOfHomeowner >= 65) {
    taxDeferralAmount = calculatePropertyTax(inputs).annualPropertyTax * 0.8; // 80% deferral
  }

  const totalTaxRelief = circuitBreakerSavings + propertyTaxReliefSavings + taxDeferralAmount;

  return {
    eligibleExemptions,
    totalTaxRelief,
    circuitBreakerSavings,
    propertyTaxReliefSavings,
    taxDeferralAmount
  };
}

// Calculate appeal analysis
export function calculateAppealAnalysis(inputs: PropertyTaxInputs): {
  appealPotentialSavings: number;
  appealSuccessProbability: number;
  recommendedAppealValue: number;
  appealCostBenefit: number;
} {
  let appealPotentialSavings = 0;
  let appealSuccessProbability = 0;
  let recommendedAppealValue = inputs.assessedValue;

  if (inputs.appealFiled && inputs.appraisedValueAppeal) {
    const currentTax = calculatePropertyTax(inputs).annualPropertyTax;
    const appealedValue = inputs.appraisedValueAppeal;
    const appealedTax = appealedValue * (inputs.taxRate / 100);

    appealPotentialSavings = currentTax - appealedTax;
    appealSuccessProbability = 0.6; // 60% success rate assumption
    recommendedAppealValue = appealedValue;
  } else {
    // Estimate potential over-assessment
    const marketValue = inputs.propertyValue;
    const assessedValue = inputs.assessedValue;
    const overAssessmentRatio = (assessedValue - marketValue) / marketValue;

    if (overAssessmentRatio > 0.1) { // More than 10% over-assessed
      appealPotentialSavings = assessedValue * (inputs.taxRate / 100) * overAssessmentRatio;
      appealSuccessProbability = 0.7; // Higher success probability for significant over-assessment
      recommendedAppealValue = marketValue * 1.05; // Recommend 5% above market for negotiation
    }
  }

  // Appeal cost-benefit analysis (simplified)
  const appealCosts = 500; // Average appeal costs
  const appealCostBenefit = appealPotentialSavings > appealCosts ?
    (appealPotentialSavings - appealCosts) / appealCosts : -1;

  return {
    appealPotentialSavings,
    appealSuccessProbability,
    recommendedAppealValue,
    appealCostBenefit
  };
}

// Calculate comparison analysis
export function calculateComparisonAnalysis(inputs: PropertyTaxInputs): {
  vsAverageTaxRate: number;
  vsMedianTaxRate: number;
  percentileRanking: number;
  localComparison: { lowerThan: number; higherThan: number };
} {
  const currentTaxRate = inputs.taxRate;
  const vsAverageTaxRate = currentTaxRate - inputs.averageTaxRate;
  const vsMedianTaxRate = currentTaxRate - inputs.medianTaxRate;

  // Estimate percentile ranking (simplified)
  let percentileRanking = 50; // Default to median
  if (currentTaxRate < inputs.localTaxRateRange.low) {
    percentileRanking = 25;
  } else if (currentTaxRate > inputs.localTaxRateRange.high) {
    percentileRanking = 75;
  }

  // Local comparison (simplified assumption)
  const lowerThan = percentileRanking;
  const higherThan = 100 - percentileRanking;

  return {
    vsAverageTaxRate,
    vsMedianTaxRate,
    percentileRanking,
    localComparison: { lowerThan, higherThan }
  };
}

// Calculate tax burden analysis
export function calculateTaxBurdenAnalysis(inputs: PropertyTaxInputs): {
  taxBurdenRatio: number;
  taxBurdenCategory: PropertyTaxOutputs['taxBurdenCategory'];
  affordabilityIndex: number;
} {
  const annualTax = calculatePropertyTax(inputs).annualPropertyTax;
  const taxBurdenRatio = (annualTax / inputs.propertyValue) * 100;

  let taxBurdenCategory: PropertyTaxOutputs['taxBurdenCategory'] = 'Moderate';
  if (taxBurdenRatio < 0.5) taxBurdenCategory = 'Low';
  else if (taxBurdenRatio > 1.5) taxBurdenCategory = 'High';
  else if (taxBurdenRatio > 2.0) taxBurdenCategory = 'Very High';

  // Affordability index (simplified)
  const affordabilityIndex = inputs.householdIncome > 0 ?
    (annualTax / inputs.householdIncome) * 100 : 0;

  return {
    taxBurdenRatio,
    taxBurdenCategory,
    affordabilityIndex
  };
}

// Calculate projections
export function calculateProjections(inputs: PropertyTaxInputs): {
  projectedTax5Years: number;
  projectedTax10Years: number;
  projectedTaxIncrease: number;
  taxIncreaseRate: number;
} {
  const currentTax = calculatePropertyTax(inputs).annualPropertyTax;

  // Calculate growth factors
  const valueGrowthFactor = 1 + (inputs.expectedValueChange / 100);
  const rateGrowthFactor = 1 + (inputs.expectedRateChange / 100);

  const projectedTax5Years = currentTax * Math.pow(valueGrowthFactor * rateGrowthFactor, 5);
  const projectedTax10Years = currentTax * Math.pow(valueGrowthFactor * rateGrowthFactor, 10);

  const projectedTaxIncrease = projectedTax5Years - currentTax;
  const taxIncreaseRate = inputs.expectedValueChange + inputs.expectedRateChange;

  return {
    projectedTax5Years,
    projectedTax10Years,
    projectedTaxIncrease,
    taxIncreaseRate
  };
}

// Calculate payment analysis
export function calculatePaymentAnalysis(inputs: PropertyTaxInputs): {
  totalPaidThisYear: number;
  remainingBalance: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
} {
  const annualTax = calculatePropertyTax(inputs).annualPropertyTax;
  const totalPaidThisYear = inputs.paymentHistory?.reduce((sum, payment) =>
    payment.status === 'Paid' ? sum + payment.amount : sum, 0) || 0;

  const remainingBalance = annualTax - totalPaidThisYear;

  // Calculate next payment (simplified)
  let nextPaymentDate = '';
  let nextPaymentAmount = 0;

  switch (inputs.paymentFrequency) {
    case 'Annual':
      nextPaymentDate = inputs.paymentDueDate;
      nextPaymentAmount = remainingBalance;
      break;
    case 'Semi-Annual':
      nextPaymentDate = new Date(inputs.paymentDueDate) > new Date() ?
        inputs.paymentDueDate : new Date(new Date(inputs.paymentDueDate).getTime() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      nextPaymentAmount = remainingBalance / 2;
      break;
    case 'Quarterly':
      nextPaymentDate = new Date(inputs.paymentDueDate) > new Date() ?
        inputs.paymentDueDate : new Date(new Date(inputs.paymentDueDate).getTime() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      nextPaymentAmount = remainingBalance / 4;
      break;
    case 'Monthly':
      nextPaymentDate = new Date(inputs.paymentDueDate) > new Date() ?
        inputs.paymentDueDate : new Date(new Date(inputs.paymentDueDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      nextPaymentAmount = remainingBalance / 12;
      break;
  }

  return {
    totalPaidThisYear,
    remainingBalance,
    nextPaymentDate,
    nextPaymentAmount
  };
}

// Calculate savings opportunities
export function calculateSavingsOpportunities(inputs: PropertyTaxInputs): {
  potentialAnnualSavings: number;
  potentialMonthlySavings: number;
  breakEvenPeriodMonths: number;
} {
  const appealSavings = calculateAppealAnalysis(inputs).appealPotentialSavings;
  const reliefSavings = calculateTaxRelief(inputs).totalTaxRelief;

  const potentialAnnualSavings = appealSavings + reliefSavings;
  const potentialMonthlySavings = potentialAnnualSavings / 12;

  // Break-even period for appeal costs
  const appealCosts = 500;
  const breakEvenPeriodMonths = appealSavings > 0 ?
    Math.ceil((appealCosts / appealSavings) * 12) : 0;

  return {
    potentialAnnualSavings,
    potentialMonthlySavings,
    breakEvenPeriodMonths
  };
}

// Calculate tax efficiency
export function calculateTaxEfficiency(inputs: PropertyTaxInputs): {
  effectiveTaxRate: number;
  taxEfficiencyScore: number;
  taxOptimizationTips: string[];
} {
  const annualTax = calculatePropertyTax(inputs).annualPropertyTax;
  const effectiveTaxRate = (annualTax / inputs.propertyValue) * 100;

  // Tax efficiency score (0-100, higher is better)
  let taxEfficiencyScore = 100;
  if (effectiveTaxRate > 2) taxEfficiencyScore -= 30;
  else if (effectiveTaxRate > 1.5) taxEfficiencyScore -= 15;

  // Comparison to market
  if (inputs.averageTaxRate > 0) {
    const marketComparison = effectiveTaxRate - inputs.averageTaxRate;
    if (marketComparison > 0.5) taxEfficiencyScore -= 20;
    else if (marketComparison < -0.5) taxEfficiencyScore += 10;
  }

  const taxOptimizationTips: string[] = [];

  if (calculateAppealAnalysis(inputs).appealPotentialSavings > 500) {
    taxOptimizationTips.push('Consider appealing your property assessment');
  }

  if (calculateTaxRelief(inputs).eligibleExemptions.length > 0) {
    taxOptimizationTips.push('Apply for available tax exemptions');
  }

  if (inputs.propertyType === 'Residential' && inputs.householdIncome < 75000) {
    taxOptimizationTips.push('Check eligibility for property tax relief programs');
  }

  return {
    effectiveTaxRate,
    taxEfficiencyScore,
    taxOptimizationTips
  };
}

// Generate recommendations
export function generateRecommendations(inputs: PropertyTaxInputs): {
  recommendedActions: string[];
  priorityActions: string[];
  longTermStrategy: string[];
} {
  const recommendedActions: string[] = [];
  const priorityActions: string[] = [];
  const longTermStrategy: string[] = [];

  const appealAnalysis = calculateAppealAnalysis(inputs);
  const reliefAnalysis = calculateTaxRelief(inputs);
  const savingsAnalysis = calculateSavingsOpportunities(inputs);

  // Priority actions
  if (appealAnalysis.appealPotentialSavings > 1000) {
    priorityActions.push('File a property tax appeal immediately');
  }

  if (reliefAnalysis.eligibleExemptions.length > 0 && !inputs.circuitBreakerProgram) {
    priorityActions.push('Apply for available tax relief programs');
  }

  if (savingsAnalysis.potentialAnnualSavings > 500) {
    priorityActions.push('Implement tax-saving strategies');
  }

  // Recommended actions
  recommendedActions.push('Keep detailed records of all tax payments');
  recommendedActions.push('Monitor property value changes annually');
  recommendedActions.push('Review exemption eligibility yearly');

  if (inputs.projectionYears > 0) {
    recommendedActions.push('Plan for future tax increases');
  }

  // Long-term strategy
  longTermStrategy.push('Build equity to reduce tax burden over time');
  longTermStrategy.push('Consider tax-efficient property improvements');
  longTermStrategy.push('Monitor local tax rate changes');

  if (calculateTaxBurdenAnalysis(inputs).taxBurdenCategory === 'High') {
    longTermStrategy.push('Consider relocating to area with lower tax rates');
  }

  return {
    recommendedActions,
    priorityActions,
    longTermStrategy
  };
}

// Main calculation function
export function calculatePropertyTaxAnalysis(inputs: PropertyTaxInputs): PropertyTaxOutputs {
  const basicTax = calculatePropertyTax(inputs);
  const assessment = calculateAssessmentDetails(inputs);
  const relief = calculateTaxRelief(inputs);
  const appeal = calculateAppealAnalysis(inputs);
  const comparison = calculateComparisonAnalysis(inputs);
  const burden = calculateTaxBurdenAnalysis(inputs);
  const projections = calculateProjections(inputs);
  const payment = calculatePaymentAnalysis(inputs);
  const savings = calculateSavingsOpportunities(inputs);
  const efficiency = calculateTaxEfficiency(inputs);
  const recommendations = generateRecommendations(inputs);

  // Additional calculations
  const baseTaxAmount = assessment.taxableValue * (inputs.taxRate / 100);
  const schoolDistrictTaxAmount = inputs.propertyValue * (inputs.schoolDistrictTax / 100);
  const fireDistrictTaxAmount = inputs.propertyValue * (inputs.fireDistrictTax / 100);
  const libraryDistrictTaxAmount = inputs.propertyValue * (inputs.libraryDistrictTax / 100);
  const otherDistrictTaxAmount = inputs.propertyValue * (inputs.otherDistrictTaxes / 100);

  // Assessment analysis
  const assessmentAccuracy = inputs.propertyValue > 0 ?
    (inputs.assessedValue / inputs.propertyValue) * 100 : 100;
  const overAssessmentAmount = Math.max(0, inputs.assessedValue - inputs.propertyValue);
  const underAssessmentAmount = Math.max(0, inputs.propertyValue - inputs.assessedValue);

  // Market analysis
  const marketTaxRate = inputs.averageTaxRate;
  const marketAdjustmentNeeded = inputs.taxRate - marketTaxRate;

  let marketComparison: PropertyTaxOutputs['marketComparison'] = 'At Market';
  if (marketAdjustmentNeeded > 0.2) marketComparison = 'Above Market';
  else if (marketAdjustmentNeeded < -0.2) marketComparison = 'Below Market';

  // Tax history analysis
  const taxHistory = [inputs.threeYearsAgoTax, inputs.twoYearsAgoTax, inputs.previousYearTax, basicTax.annualPropertyTax];
  const validHistory = taxHistory.filter(tax => tax > 0);
  const averageAnnualIncrease = validHistory.length > 1 ?
    ((validHistory[validHistory.length - 1] - validHistory[0]) / validHistory[0]) * 100 / (validHistory.length - 1) : 0;

  let taxTrend: PropertyTaxOutputs['taxTrend'] = 'Stable';
  if (averageAnnualIncrease > 5) taxTrend = 'Increasing';
  else if (averageAnnualIncrease < -5) taxTrend = 'Decreasing';

  // Risk assessment
  let taxRiskLevel: PropertyTaxOutputs['taxRiskLevel'] = 'Low';
  const riskFactors: string[] = [];

  if (burden.taxBurdenRatio > 2) {
    taxRiskLevel = 'High';
    riskFactors.push('High tax burden ratio');
  } else if (burden.taxBurdenRatio > 1.5) {
    taxRiskLevel = 'Medium';
    riskFactors.push('Moderate tax burden ratio');
  }

  if (appeal.appealPotentialSavings > 2000) {
    riskFactors.push('Potential over-assessment');
  }

  if (projections.taxIncreaseRate > 10) {
    riskFactors.push('High projected tax increases');
  }

  // Educational content
  const taxFacts = [
    'Property taxes are typically the largest tax expense for homeowners',
    'Assessment values should reflect fair market value',
    'Many states offer tax relief for seniors, veterans, and low-income homeowners',
    'Appealing assessments can significantly reduce tax bills'
  ];

  const exemptionTips = [
    'Apply for homestead exemption if you haven\'t already',
    'Check eligibility for senior, disability, and veteran exemptions',
    'Some states offer circuit breaker programs for high tax burdens',
    'Document all exemption applications and approvals'
  ];

  const appealTips = [
    'Gather comparable sales data to support your appeal',
    'Hire a professional appraiser for complex cases',
    'File appeals within the deadline (usually 30-60 days after assessment)',
    'Be prepared to present evidence at hearing'
  ];

  // Cost analysis
  const totalTaxCost = basicTax.annualPropertyTax;
  const taxAsPercentageOfIncome = inputs.householdIncome > 0 ?
    (totalTaxCost / inputs.householdIncome) * 100 : 0;

  // Assume property details for per unit calculations (simplified)
  const taxPerSquareFoot = inputs.propertyValue > 0 ? totalTaxCost / 2500 : 0; // Assume 2500 sq ft
  const taxPerBedroom = totalTaxCost / 3; // Assume 3 bedrooms

  // Benchmarking (simplified)
  const neighborhoodAverageTax = inputs.averageTaxRate * inputs.propertyValue / 100;
  const cityAverageTax = neighborhoodAverageTax * 0.95; // Slight variation
  const stateAverageTax = neighborhoodAverageTax * 0.9; // More variation

  // Future value impact
  const taxImpactOnPropertyValue = totalTaxCost * 15; // Rule of thumb: taxes = 1/15 of property value
  let taxEfficiencyRating: PropertyTaxOutputs['taxEfficiencyRating'] = 'C';
  if (efficiency.taxEfficiencyScore > 80) taxEfficiencyRating = 'A';
  else if (efficiency.taxEfficiencyScore > 60) taxEfficiencyRating = 'B';
  else if (efficiency.taxEfficiencyScore < 40) taxEfficiencyRating = 'D';
  else if (efficiency.taxEfficiencyScore < 20) taxEfficiencyRating = 'F';

  // Cash flow analysis (simplified)
  const afterTaxCashFlow = inputs.householdIncome - totalTaxCost - 20000; // Assume other expenses
  const taxAdjustedROI = inputs.propertyValue > 0 ? (afterTaxCashFlow / inputs.propertyValue) * 100 : 0;
  const taxLeverageEffect = totalTaxCost * 0.3; // Assume 30% tax deductibility

  return {
    ...basicTax,
    ...assessment,
    baseTaxAmount,
    schoolDistrictTaxAmount,
    fireDistrictTaxAmount,
    libraryDistrictTaxAmount,
    otherDistrictTaxAmount,
    ...relief,
    ...appeal,
    ...comparison,
    ...burden,
    ...projections,
    ...payment,
    ...savings,
    ...efficiency,
    assessmentAccuracy,
    overAssessmentAmount,
    underAssessmentAmount,
    assessmentAppealRecommendation: appeal.appealPotentialSavings > 500 ?
      'Strong recommendation to appeal' : 'Monitor assessment changes',
    marketTaxRate,
    marketComparison,
    marketAdjustmentNeeded,
    stateTaxLaws: ['Property taxes vary by state and locality'],
    stateExemptions: relief.eligibleExemptions,
    stateReliefPrograms: inputs.circuitBreakerProgram ? ['Circuit Breaker Program'] : [],
    localTaxAuthorities: ['County Assessor', 'Local Tax Authority'],
    localAssessmentProcess: ['Annual assessment', 'Notice of assessment mailed'],
    localAppealProcess: ['File appeal within 30 days', 'Attend hearing'],
    paymentOptions: ['Online payment', 'Mail payment', 'In-person payment'],
    paymentDeadlines: ['Vary by jurisdiction'],
    penaltyInformation: ['Late fees may apply'],
    lienStatus: 'None',
    lienAmount: 0,
    lienPriority: 0,
    taxTrend,
    averageAnnualIncrease,
    taxVolatility: Math.abs(averageAnnualIncrease),
    ...recommendations,
    taxRiskLevel,
    riskFactors,
    mitigationStrategies: recommendations.recommendedActions,
    taxFacts,
    exemptionTips,
    appealTips,
    totalTaxCost,
    taxAsPercentageOfIncome,
    taxPerSquareFoot,
    taxPerBedroom,
    neighborhoodAverageTax,
    cityAverageTax,
    stateAverageTax,
    taxImpactOnPropertyValue,
    taxEfficiencyRating,
    afterTaxCashFlow,
    taxAdjustedROI,
    taxLeverageEffect
  };
}