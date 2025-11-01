import { MortgageQualificationInputs, MortgageQualificationOutputs } from './types';

// Calculate debt-to-income ratio
export function calculateDebtToIncomeRatio(monthlyDebts: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;
  return (monthlyDebts / monthlyIncome) * 100;
}

// Calculate front-end ratio (housing expenses only)
export function calculateFrontEndRatio(housingPayment: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;
  return (housingPayment / monthlyIncome) * 100;
}

// Calculate back-end ratio (all debts)
export function calculateBackEndRatio(totalDebts: number, monthlyIncome: number): number {
  return calculateDebtToIncomeRatio(totalDebts, monthlyIncome);
}

// Calculate loan-to-value ratio
export function calculateLoanToValueRatio(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanAmount / propertyValue) * 100;
}

// Calculate maximum loan amount based on income and ratios
export function calculateMaximumLoanAmount(
  monthlyIncome: number,
  monthlyDebts: number,
  interestRate: number,
  loanTerm: number,
  loanType: string,
  propertyValue: number
): number {
  // Get maximum DTI ratio based on loan type and credit
  const maxDTI = getMaxDTIRatio(loanType);

  // Calculate maximum housing payment
  const maxHousingPayment = (monthlyIncome * maxDTI / 100) - monthlyDebts;
  if (maxHousingPayment <= 0) return 0;

  // Calculate loan amount from payment
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  if (monthlyRate === 0) return maxHousingPayment * numPayments;

  const loanAmount = maxHousingPayment * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;

  // Cap at property value
  return Math.min(loanAmount, propertyValue);
}

// Get maximum DTI ratio based on loan type
function getMaxDTIRatio(loanType: string): number {
  switch (loanType) {
    case 'conventional': return 43;
    case 'fha': return 43;
    case 'va': return 41;
    case 'usda': return 41;
    case 'jumbo': return 45;
    default: return 43;
  }
}

// Calculate pre-qualification amount
export function calculatePreQualificationAmount(
  monthlyIncome: number,
  monthlyDebts: number,
  downPayment: number,
  creditScore: number,
  loanType: string
): number {
  const maxDTI = getMaxDTIRatio(loanType);
  const maxMonthlyPayment = (monthlyIncome * maxDTI / 100) - monthlyDebts;

  if (maxMonthlyPayment <= 0) return 0;

  // Conservative estimate: assume 7% interest rate, 30-year term
  const monthlyRate = 0.07 / 12;
  const numPayments = 30 * 12;

  const loanAmount = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;

  return Math.max(0, loanAmount + downPayment);
}

// Calculate qualification status
export function calculateQualificationStatus(
  dti: number,
  creditScore: number,
  loanToValue: number,
  employmentLength: number,
  bankruptcyHistory: boolean,
  foreclosureHistory: boolean
): 'Strong' | 'Good' | 'Fair' | 'Poor' | 'Not Qualified' {
  let score = 0;

  // DTI scoring
  if (dti <= 36) score += 25;
  else if (dti <= 41) score += 20;
  else if (dti <= 43) score += 15;
  else if (dti <= 50) score += 5;

  // Credit score scoring
  if (creditScore >= 760) score += 25;
  else if (creditScore >= 700) score += 20;
  else if (creditScore >= 680) score += 15;
  else if (creditScore >= 620) score += 10;
  else if (creditScore >= 580) score += 5;

  // LTV scoring
  if (loanToValue <= 80) score += 20;
  else if (loanToValue <= 90) score += 15;
  else if (loanToValue <= 95) score += 10;
  else if (loanToValue <= 97) score += 5;

  // Employment stability
  if (employmentLength >= 24) score += 15;
  else if (employmentLength >= 12) score += 10;
  else if (employmentLength >= 6) score += 5;

  // Credit history penalties
  if (bankruptcyHistory) score -= 20;
  if (foreclosureHistory) score -= 15;

  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 35) return 'Poor';
  return 'Not Qualified';
}

// Calculate affordability analysis
export function calculateAffordabilityAnalysis(
  monthlyIncome: number,
  monthlyExpenses: number,
  estimatedPayment: number
): MortgageQualificationOutputs['affordabilityAnalysis'] {
  const totalExpenses = monthlyExpenses + estimatedPayment;
  const monthlySurplus = monthlyIncome - totalExpenses;
  const annualSurplus = monthlySurplus * 12;

  let housingAffordability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  const housingRatio = (estimatedPayment / monthlyIncome) * 100;

  if (housingRatio <= 25) housingAffordability = 'Excellent';
  else if (housingRatio <= 30) housingAffordability = 'Good';
  else if (housingRatio <= 35) housingAffordability = 'Fair';
  else housingAffordability = 'Poor';

  let overallAffordability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  const totalRatio = (totalExpenses / monthlyIncome) * 100;

  if (totalRatio <= 36) overallAffordability = 'Excellent';
  else if (totalRatio <= 43) overallAffordability = 'Good';
  else if (totalRatio <= 50) overallAffordability = 'Fair';
  else overallAffordability = 'Poor';

  return {
    housingAffordability,
    overallAffordability,
    monthlySurplus,
    annualSurplus
  };
}

// Calculate credit analysis
export function calculateCreditAnalysis(
  creditScore: number,
  latePayments: number,
  bankruptcyHistory: boolean,
  foreclosureHistory: boolean
): MortgageQualificationOutputs['creditAnalysis'] {
  let creditScoreRating: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';

  if (creditScore >= 800) creditScoreRating = 'Excellent';
  else if (creditScore >= 740) creditScoreRating = 'Very Good';
  else if (creditScore >= 670) creditScoreRating = 'Good';
  else if (creditScore >= 580) creditScoreRating = 'Fair';
  else creditScoreRating = 'Poor';

  const riskFactors: string[] = [];
  const improvementSuggestions: string[] = [];

  if (latePayments > 0) {
    riskFactors.push(`${latePayments} late payment(s) in last 2 years`);
    improvementSuggestions.push('Pay all bills on time for 7-12 months');
  }

  if (bankruptcyHistory) {
    riskFactors.push('Bankruptcy in credit history');
    improvementSuggestions.push('Wait 4 years after Chapter 7, 2 years after Chapter 13');
  }

  if (foreclosureHistory) {
    riskFactors.push('Foreclosure in credit history');
    improvementSuggestions.push('Wait 4 years after foreclosure');
  }

  if (creditScore < 620) {
    improvementSuggestions.push('Focus on paying down credit card balances');
    improvementSuggestions.push('Dispute any errors on credit report');
  }

  return {
    creditScoreRating,
    riskFactors,
    improvementSuggestions
  };
}

// Calculate income analysis
export function calculateIncomeAnalysis(
  inputs: MortgageQualificationInputs
): MortgageQualificationOutputs['incomeAnalysis'] {
  const baseIncome = inputs.monthlyIncome;
  const spouseIncome = inputs.spouseIncome || 0;
  const rentalIncome = inputs.rentalIncome || 0;
  const alimonyIncome = inputs.alimonyIncome || 0;
  const childSupportIncome = inputs.childSupportIncome || 0;
  const commissionIncome = inputs.commissionIncome || 0;
  const bonusIncome = inputs.bonusIncome || 0;
  const overtimeIncome = inputs.overtimeIncome || 0;
  const otherIncome = inputs.otherIncome || 0;

  const totalMonthlyIncome = baseIncome + spouseIncome + rentalIncome + alimonyIncome +
                           childSupportIncome + commissionIncome + bonusIncome +
                           overtimeIncome + otherIncome;

  let incomeStability: 'High' | 'Medium' | 'Low';
  if (inputs.employmentLength >= 24 && inputs.employmentType === 'employed') {
    incomeStability = 'High';
  } else if (inputs.employmentLength >= 12) {
    incomeStability = 'Medium';
  } else {
    incomeStability = 'Low';
  }

  const incomeSources: string[] = [];
  if (baseIncome > 0) incomeSources.push('Primary employment');
  if (spouseIncome > 0) incomeSources.push('Spouse income');
  if (rentalIncome > 0) incomeSources.push('Rental income');
  if (commissionIncome > 0) incomeSources.push('Commission income');
  if (bonusIncome > 0) incomeSources.push('Bonus income');
  if (overtimeIncome > 0) incomeSources.push('Overtime income');

  const incomeVerification: string[] = [];
  if (inputs.employmentType === 'employed') {
    incomeVerification.push('Pay stubs (last 30 days)');
    incomeVerification.push('W-2 forms (last 2 years)');
  }
  if (rentalIncome > 0) {
    incomeVerification.push('Rental income documentation');
    incomeVerification.push('Tax returns (last 2 years)');
  }

  return {
    totalMonthlyIncome,
    incomeStability,
    incomeSources,
    incomeVerification
  };
}

// Calculate debt analysis
export function calculateDebtAnalysis(
  inputs: MortgageQualificationInputs
): MortgageQualificationOutputs['debtAnalysis'] {
  const housingDebts = (inputs.monthlyRent || 0) + (inputs.hoaFees || 0) +
                      (inputs.propertyTaxes || 0) / 12 + (inputs.homeownersInsurance || 0) / 12;

  const consumerDebts = inputs.debts.creditCards + inputs.debts.personalLoans;

  const installmentDebts = inputs.debts.carLoans + inputs.debts.studentLoans + inputs.debts.other;

  const totalMonthlyDebts = housingDebts + consumerDebts + installmentDebts + inputs.monthlyDebts;

  const debtToIncomeRatio = calculateDebtToIncomeRatio(totalMonthlyDebts, inputs.monthlyIncome);

  const debtComposition = {
    housing: housingDebts,
    consumer: consumerDebts,
    installment: installmentDebts
  };

  const debtReductionSuggestions: string[] = [];

  if (consumerDebts > inputs.monthlyIncome * 0.1) {
    debtReductionSuggestions.push('Pay down credit card balances below 30% of limits');
  }

  if (installmentDebts > inputs.monthlyIncome * 0.15) {
    debtReductionSuggestions.push('Consider debt consolidation options');
  }

  return {
    totalMonthlyDebts,
    debtToIncomeRatio,
    debtComposition,
    debtReductionSuggestions
  };
}

// Calculate asset analysis
export function calculateAssetAnalysis(
  inputs: MortgageQualificationInputs,
  downPayment: number
): MortgageQualificationOutputs['assetAnalysis'] {
  const totalAssets = inputs.assets.checking + inputs.assets.savings +
                     inputs.assets.investments + inputs.assets.retirement +
                     inputs.assets.other;

  const liquidAssets = inputs.assets.checking + inputs.assets.savings;

  const downPaymentCoverage = (liquidAssets / downPayment) * 100;

  // Reserve requirements: 2-6 months of housing payment
  const estimatedHousingPayment = inputs.monthlyIncome * 0.28; // Conservative estimate
  const reserveRequirements = estimatedHousingPayment * 6; // 6 months

  let assetSufficiency: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  if (liquidAssets >= reserveRequirements * 1.5) assetSufficiency = 'Excellent';
  else if (liquidAssets >= reserveRequirements) assetSufficiency = 'Good';
  else if (liquidAssets >= reserveRequirements * 0.5) assetSufficiency = 'Fair';
  else assetSufficiency = 'Poor';

  return {
    totalAssets,
    liquidAssets,
    downPaymentCoverage,
    reserveRequirements,
    assetSufficiency
  };
}

// Generate loan options
export function generateLoanOptions(
  inputs: MortgageQualificationInputs,
  maxLoanAmount: number
): MortgageQualificationOutputs['loanOptions'] {
  const conventional = {
    qualified: inputs.creditScore >= 620 && maxLoanAmount >= 50000,
    maxLoanAmount: Math.min(maxLoanAmount, inputs.propertyValue * 0.97),
    requiredDownPayment: Math.max(inputs.propertyValue * 0.03, 0),
    estimatedRate: inputs.creditScore >= 740 ? 6.25 : inputs.creditScore >= 680 ? 6.75 : 7.25
  };

  const fha = {
    qualified: inputs.creditScore >= 580 && maxLoanAmount >= 50000,
    maxLoanAmount: Math.min(maxLoanAmount, inputs.propertyValue * 0.965),
    requiredDownPayment: Math.max(inputs.propertyValue * 0.035, 0),
    estimatedRate: conventional.estimatedRate + 0.25
  };

  const va = {
    qualified: maxLoanAmount >= 50000, // VA eligibility would need veteran status check
    maxLoanAmount: Math.min(maxLoanAmount, inputs.propertyValue),
    requiredDownPayment: 0,
    estimatedRate: conventional.estimatedRate - 0.25
  };

  const usda = {
    qualified: maxLoanAmount >= 50000 && inputs.propertyValue <= 300000, // Rural area requirement
    maxLoanAmount: Math.min(maxLoanAmount, inputs.propertyValue * 0.9),
    requiredDownPayment: Math.max(inputs.propertyValue * 0.1, 0),
    estimatedRate: conventional.estimatedRate + 0.5
  };

  return { conventional, fha, va, usda };
}

// Generate improvement strategies
export function generateImprovementStrategies(
  inputs: MortgageQualificationInputs
): MortgageQualificationOutputs['improvementStrategies'] {
  const shortTerm: string[] = [];
  const mediumTerm: string[] = [];
  const longTerm: string[] = [];

  // Short-term improvements (3-6 months)
  if (inputs.creditScore < 740) {
    shortTerm.push('Pay down credit card balances');
    shortTerm.push('Pay bills on time');
  }

  if (inputs.monthlyDebts > inputs.monthlyIncome * 0.36) {
    shortTerm.push('Reduce monthly debt payments');
  }

  // Medium-term improvements (6-12 months)
  if (inputs.employmentLength < 24) {
    mediumTerm.push('Build employment stability');
  }

  if (inputs.assets.savings < inputs.monthlyIncome * 6) {
    mediumTerm.push('Build emergency savings');
  }

  // Long-term improvements (1-2 years)
  if (inputs.bankruptcyHistory || inputs.foreclosureHistory) {
    longTerm.push('Rebuild credit history');
  }

  const expectedImpact = {
    creditScoreImprovement: inputs.latePayments > 0 ? 50 : inputs.creditScore < 680 ? 100 : 20,
    additionalLoanAmount: inputs.monthlyIncome * 12 * 0.05, // 5% of annual income
    lowerInterestRate: inputs.creditScore < 680 ? 0.75 : 0.25
  };

  return {
    shortTerm,
    mediumTerm,
    longTerm,
    expectedImpact
  };
}

// Generate next steps
export function generateNextSteps(
  qualificationStatus: string,
  creditScore: number,
  dti: number
): string[] {
  const steps: string[] = [];

  if (qualificationStatus === 'Strong' || qualificationStatus === 'Good') {
    steps.push('Get pre-approved by multiple lenders');
    steps.push('Shop for the best interest rates');
    steps.push('Start house hunting');
  } else if (qualificationStatus === 'Fair') {
    steps.push('Work on improving credit score');
    steps.push('Save more for down payment');
    steps.push('Consider FHA loan options');
  } else {
    steps.push('Focus on debt reduction');
    steps.push('Build emergency savings');
    steps.push('Consider credit counseling');
  }

  steps.push('Get credit reports and scores');
  steps.push('Gather financial documents');
  steps.push('Consult with mortgage professional');

  return steps;
}

// Calculate risk assessment
export function calculateRiskAssessment(
  inputs: MortgageQualificationInputs,
  qualificationStatus: string
): MortgageQualificationOutputs['riskAssessment'] {
  const riskFactors: string[] = [];
  const mitigationStrategies: string[] = [];

  if (inputs.creditScore < 620) {
    riskFactors.push('Low credit score');
    mitigationStrategies.push('Improve credit score before applying');
  }

  if (calculateDebtToIncomeRatio(inputs.monthlyDebts, inputs.monthlyIncome) > 43) {
    riskFactors.push('High debt-to-income ratio');
    mitigationStrategies.push('Pay down debts to reduce DTI');
  }

  if (inputs.employmentLength < 12) {
    riskFactors.push('Limited employment history');
    mitigationStrategies.push('Build longer employment history');
  }

  if (inputs.bankruptcyHistory || inputs.foreclosureHistory) {
    riskFactors.push('Adverse credit history');
    mitigationStrategies.push('Wait required period after credit events');
  }

  let overallRisk: 'Low' | 'Medium' | 'High';
  if (qualificationStatus === 'Strong') overallRisk = 'Low';
  else if (qualificationStatus === 'Good' || qualificationStatus === 'Fair') overallRisk = 'Medium';
  else overallRisk = 'High';

  return {
    overallRisk,
    riskFactors,
    mitigationStrategies
  };
}

// Main calculation function
export function calculateMortgageQualification(inputs: MortgageQualificationInputs): MortgageQualificationOutputs {
  const incomeAnalysis = calculateIncomeAnalysis(inputs);
  const debtAnalysis = calculateDebtAnalysis(inputs);

  const dti = debtAnalysis.debtToIncomeRatio;
  const ltv = calculateLoanToValueRatio(inputs.propertyValue - inputs.downPayment, inputs.propertyValue);

  const qualificationStatus = calculateQualificationStatus(
    dti,
    inputs.creditScore,
    ltv,
    inputs.employmentLength,
    inputs.bankruptcyHistory,
    inputs.foreclosureHistory
  );

  const maximumLoanAmount = calculateMaximumLoanAmount(
    incomeAnalysis.totalMonthlyIncome,
    debtAnalysis.totalMonthlyDebts,
    inputs.interestRate,
    inputs.loanTerm,
    inputs.loanType,
    inputs.propertyValue
  );

  const preQualificationAmount = calculatePreQualificationAmount(
    incomeAnalysis.totalMonthlyIncome,
    debtAnalysis.totalMonthlyDebts,
    inputs.downPayment,
    inputs.creditScore,
    inputs.loanType
  );

  const minimumDownPayment = Math.max(inputs.propertyValue * 0.03, 0); // 3% minimum

  // Estimate monthly payment for affordability analysis
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  const estimatedMonthlyPayment = maximumLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                 (Math.pow(1 + monthlyRate, numPayments) - 1);

  const frontEndRatio = calculateFrontEndRatio(estimatedMonthlyPayment, incomeAnalysis.totalMonthlyIncome);
  const backEndRatio = calculateBackEndRatio(debtAnalysis.totalMonthlyDebts + estimatedMonthlyPayment, incomeAnalysis.totalMonthlyIncome);

  const totalMonthlyExpenses = (inputs.childCareExpenses || 0) + (inputs.educationExpenses || 0) +
                              (inputs.medicalExpenses || 0) + (inputs.transportationExpenses || 0) +
                              (inputs.foodExpenses || 0) + (inputs.utilitiesExpenses || 0) +
                              (inputs.entertainmentExpenses || 0) + (inputs.otherExpenses || 0);

  const affordabilityAnalysis = calculateAffordabilityAnalysis(
    incomeAnalysis.totalMonthlyIncome,
    totalMonthlyExpenses,
    estimatedMonthlyPayment
  );

  const creditAnalysis = calculateCreditAnalysis(
    inputs.creditScore,
    inputs.latePayments,
    inputs.bankruptcyHistory,
    inputs.foreclosureHistory
  );

  const assetAnalysis = calculateAssetAnalysis(inputs, inputs.downPayment);

  const loanOptions = generateLoanOptions(inputs, maximumLoanAmount);

  const improvementStrategies = generateImprovementStrategies(inputs);

  const nextSteps = generateNextSteps(qualificationStatus, inputs.creditScore, dti);

  const riskAssessment = calculateRiskAssessment(inputs, qualificationStatus);

  return {
    preQualificationAmount,
    debtToIncomeRatio: dti,
    frontEndRatio,
    backEndRatio,
    loanToValueRatio: ltv,
    qualificationStatus,
    maximumLoanAmount,
    minimumDownPayment,
    estimatedMonthlyPayment,
    affordabilityAnalysis,
    creditAnalysis,
    incomeAnalysis,
    debtAnalysis,
    assetAnalysis,
    loanOptions,
    improvementStrategies,
    nextSteps,
    riskAssessment
  };
}