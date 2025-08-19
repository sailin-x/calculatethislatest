export interface MortgageQualificationInputs {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  downPayment: number;
  creditScore: number;
  interestRate: number;
  loanTerm: string;
  propertyTaxRate?: number;
  homeownersInsurance?: number;
  pmiRate?: number;
  loanType: string;
  dtiRatio?: number;
  frontEndRatio?: number;
  reserves?: number;
  employmentType?: string;
  incomeStability?: number;
}

export interface QualificationFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  score: number;
  description: string;
  recommendation: string;
}

export interface QualificationScenario {
  scenario: string;
  maxLoanAmount: number;
  maxHomePrice: number;
  monthlyPayment: number;
  dtiRatio: number;
  frontEndRatio: number;
  qualificationScore: number;
}

export interface MortgageQualificationOutputs {
  maxLoanAmount: number;
  maxHomePrice: number;
  monthlyPayment: number;
  dtiRatio: number;
  frontEndRatio: number;
  qualificationScore: number;
  qualificationFactors: QualificationFactor[];
  recommendations: string;
}

/**
 * Calculate mortgage qualification for different loan types
 */
export function calculateMortgageQualification(inputs: MortgageQualificationInputs): MortgageQualificationOutputs {
  const {
    grossMonthlyIncome,
    monthlyDebts,
    downPayment,
    creditScore,
    interestRate,
    loanTerm,
    propertyTaxRate = 1.2,
    homeownersInsurance = 1200,
    pmiRate = 0.5,
    loanType,
    dtiRatio: maxDtiRatio = 43,
    frontEndRatio: maxFrontEndRatio = 28,
    reserves = 6,
    employmentType = 'w2',
    incomeStability = 3
  } = inputs;

  // Calculate monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = parseInt(loanTerm) * 12;

  // Calculate maximum monthly payment based on DTI ratio
  const maxMonthlyPaymentByDti = (grossMonthlyIncome * (maxDtiRatio / 100)) - monthlyDebts;
  
  // Calculate maximum monthly payment based on front-end ratio
  const maxMonthlyPaymentByFrontEnd = grossMonthlyIncome * (maxFrontEndRatio / 100);

  // Use the lower of the two limits
  const maxMonthlyPayment = Math.min(maxMonthlyPaymentByDti, maxMonthlyPaymentByFrontEnd);

  // Calculate maximum loan amount using payment formula
  const maxLoanAmount = calculateMaxLoanAmount(
    maxMonthlyPayment,
    monthlyRate,
    totalMonths,
    propertyTaxRate,
    homeownersInsurance,
    pmiRate,
    downPayment
  );

  // Calculate actual monthly payment for the max loan amount
  const monthlyPayment = calculateMonthlyPayment(
    maxLoanAmount,
    monthlyRate,
    totalMonths,
    propertyTaxRate,
    homeownersInsurance,
    pmiRate
  );

  // Calculate ratios
  const actualDtiRatio = ((monthlyPayment + monthlyDebts) / grossMonthlyIncome) * 100;
  const actualFrontEndRatio = (monthlyPayment / grossMonthlyIncome) * 100;

  // Calculate qualification score
  const qualificationScore = calculateQualificationScore(
    inputs,
    actualDtiRatio,
    actualFrontEndRatio,
    maxLoanAmount
  );

  // Analyze qualification factors
  const qualificationFactors = analyzeQualificationFactors(inputs, actualDtiRatio, actualFrontEndRatio);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, qualificationFactors, actualDtiRatio, actualFrontEndRatio);

  return {
    maxLoanAmount,
    maxHomePrice: maxLoanAmount + downPayment,
    monthlyPayment,
    dtiRatio: actualDtiRatio,
    frontEndRatio: actualFrontEndRatio,
    qualificationScore,
    qualificationFactors,
    recommendations
  };
}

/**
 * Calculate maximum loan amount based on monthly payment
 */
function calculateMaxLoanAmount(
  maxMonthlyPayment: number,
  monthlyRate: number,
  totalMonths: number,
  propertyTaxRate: number,
  homeownersInsurance: number,
  pmiRate: number,
  downPayment: number
): number {
  // Calculate monthly property tax and insurance
  const monthlyPropertyTax = (propertyTaxRate / 100) / 12; // Convert annual rate to monthly
  const monthlyInsurance = homeownersInsurance / 12;
  
  // Calculate monthly PMI (if applicable)
  const monthlyPmi = pmiRate > 0 ? (pmiRate / 100) / 12 : 0;
  
  // Calculate maximum principal and interest payment
  const maxPandI = maxMonthlyPayment - monthlyPropertyTax - monthlyInsurance - monthlyPmi;
  
  // Calculate maximum loan amount using mortgage payment formula
  if (monthlyRate === 0) {
    return maxPandI * totalMonths;
  }
  
  const maxLoanAmount = maxPandI * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
  
  return Math.max(0, maxLoanAmount);
}

/**
 * Calculate monthly mortgage payment (PITI)
 */
function calculateMonthlyPayment(
  loanAmount: number,
  monthlyRate: number,
  totalMonths: number,
  propertyTaxRate: number,
  homeownersInsurance: number,
  pmiRate: number
): number {
  // Calculate principal and interest payment
  let monthlyPandI: number;
  if (monthlyRate === 0) {
    monthlyPandI = loanAmount / totalMonths;
  } else {
    monthlyPandI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }
  
  // Calculate monthly property tax and insurance
  const monthlyPropertyTax = (loanAmount * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeownersInsurance / 12;
  
  // Calculate monthly PMI (if applicable)
  const monthlyPmi = pmiRate > 0 ? (loanAmount * (pmiRate / 100)) / 12 : 0;
  
  return monthlyPandI + monthlyPropertyTax + monthlyInsurance + monthlyPmi;
}

/**
 * Calculate qualification score (0-100)
 */
function calculateQualificationScore(
  inputs: MortgageQualificationInputs,
  dtiRatio: number,
  frontEndRatio: number,
  maxLoanAmount: number
): number {
  let score = 100;
  
  // Credit score impact (0-30 points)
  const creditScoreImpact = calculateCreditScoreImpact(inputs.creditScore);
  score += creditScoreImpact;
  
  // DTI ratio impact (0-25 points)
  const dtiImpact = calculateDtiImpact(dtiRatio);
  score += dtiImpact;
  
  // Front-end ratio impact (0-20 points)
  const frontEndImpact = calculateFrontEndImpact(frontEndRatio);
  score += frontEndImpact;
  
  // Down payment impact (0-15 points)
  const downPaymentImpact = calculateDownPaymentImpact(inputs.downPayment, maxLoanAmount);
  score += downPaymentImpact;
  
  // Employment stability impact (0-10 points)
  const employmentImpact = calculateEmploymentImpact(inputs.employmentType, inputs.incomeStability);
  score += employmentImpact;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate credit score impact on qualification
 */
function calculateCreditScoreImpact(creditScore: number): number {
  if (creditScore >= 800) return 30;
  if (creditScore >= 750) return 25;
  if (creditScore >= 700) return 20;
  if (creditScore >= 650) return 10;
  if (creditScore >= 600) return 0;
  return -20;
}

/**
 * Calculate DTI ratio impact on qualification
 */
function calculateDtiImpact(dtiRatio: number): number {
  if (dtiRatio <= 28) return 25;
  if (dtiRatio <= 36) return 20;
  if (dtiRatio <= 43) return 10;
  if (dtiRatio <= 50) return 0;
  return -25;
}

/**
 * Calculate front-end ratio impact on qualification
 */
function calculateFrontEndImpact(frontEndRatio: number): number {
  if (frontEndRatio <= 20) return 20;
  if (frontEndRatio <= 25) return 15;
  if (frontEndRatio <= 28) return 10;
  if (frontEndRatio <= 31) return 5;
  return -10;
}

/**
 * Calculate down payment impact on qualification
 */
function calculateDownPaymentImpact(downPayment: number, maxLoanAmount: number): number {
  const downPaymentPercentage = (downPayment / (maxLoanAmount + downPayment)) * 100;
  
  if (downPaymentPercentage >= 20) return 15;
  if (downPaymentPercentage >= 15) return 10;
  if (downPaymentPercentage >= 10) return 5;
  if (downPaymentPercentage >= 5) return 0;
  return -5;
}

/**
 * Calculate employment stability impact on qualification
 */
function calculateEmploymentImpact(employmentType?: string, incomeStability?: number): number {
  if (!employmentType || !incomeStability) return 0;
  
  let baseScore = 0;
  
  switch (employmentType) {
    case 'w2':
      baseScore = 10;
      break;
    case 'self-employed':
      baseScore = 5;
      break;
    case 'business-owner':
      baseScore = 3;
      break;
    case 'retired':
      baseScore = 8;
      break;
    default:
      baseScore = 5;
  }
  
  if (incomeStability >= 5) return baseScore;
  if (incomeStability >= 3) return baseScore - 2;
  if (incomeStability >= 1) return baseScore - 5;
  return baseScore - 10;
}

/**
 * Analyze qualification factors
 */
export function analyzeQualificationFactors(
  inputs: MortgageQualificationInputs,
  dtiRatio: number,
  frontEndRatio: number
): QualificationFactor[] {
  const factors: QualificationFactor[] = [];
  
  // Credit score analysis
  const creditScoreImpact = calculateCreditScoreImpact(inputs.creditScore);
  factors.push({
    factor: 'Credit Score',
    impact: creditScoreImpact >= 0 ? 'positive' : 'negative',
    score: creditScoreImpact,
    description: `Credit score of ${inputs.creditScore} is ${creditScoreImpact >= 0 ? 'good' : 'below average'}`,
    recommendation: creditScoreImpact < 0 ? 'Work on improving your credit score by paying bills on time and reducing debt' : 'Your credit score is in good standing'
  });
  
  // DTI ratio analysis
  const dtiImpact = calculateDtiImpact(dtiRatio);
  factors.push({
    factor: 'Debt-to-Income Ratio',
    impact: dtiImpact >= 0 ? 'positive' : 'negative',
    score: dtiImpact,
    description: `DTI ratio of ${dtiRatio.toFixed(1)}% is ${dtiRatio <= 43 ? 'acceptable' : 'too high'}`,
    recommendation: dtiRatio > 43 ? 'Consider paying down existing debts to improve your DTI ratio' : 'Your DTI ratio is within acceptable limits'
  });
  
  // Front-end ratio analysis
  const frontEndImpact = calculateFrontEndImpact(frontEndRatio);
  factors.push({
    factor: 'Front-End Ratio',
    impact: frontEndImpact >= 0 ? 'positive' : 'negative',
    score: frontEndImpact,
    description: `Front-end ratio of ${frontEndRatio.toFixed(1)}% is ${frontEndRatio <= 28 ? 'good' : 'high'}`,
    recommendation: frontEndRatio > 28 ? 'Consider a less expensive home or larger down payment' : 'Your housing expense ratio is manageable'
  });
  
  // Down payment analysis
  const downPaymentPercentage = (inputs.downPayment / (inputs.downPayment + 300000)) * 100; // Estimate
  const downPaymentImpact = calculateDownPaymentImpact(inputs.downPayment, 300000);
  factors.push({
    factor: 'Down Payment',
    impact: downPaymentImpact >= 0 ? 'positive' : 'negative',
    score: downPaymentImpact,
    description: `Down payment of ${downPaymentPercentage.toFixed(1)}% is ${downPaymentPercentage >= 20 ? 'excellent' : 'could be improved'}`,
    recommendation: downPaymentPercentage < 20 ? 'Consider saving more for a larger down payment to avoid PMI' : 'Your down payment is substantial'
  });
  
  // Employment stability analysis
  const employmentImpact = calculateEmploymentImpact(inputs.employmentType, inputs.incomeStability);
  factors.push({
    factor: 'Employment Stability',
    impact: employmentImpact >= 0 ? 'positive' : 'negative',
    score: employmentImpact,
    description: `${inputs.employmentType || 'Unknown'} employment with ${inputs.incomeStability || 0} years stability`,
    recommendation: (inputs.incomeStability || 0) < 2 ? 'Consider waiting to establish longer employment history' : 'Your employment history is stable'
  });
  
  return factors;
}

/**
 * Calculate different qualification scenarios
 */
export function calculateQualificationScenarios(inputs: MortgageQualificationInputs): {
  scenarios: QualificationScenario[];
  bestScenario: QualificationScenario;
  worstScenario: QualificationScenario;
} {
  const scenarios: QualificationScenario[] = [];
  
  // Current scenario
  const current = calculateMortgageQualification(inputs);
  scenarios.push({
    scenario: 'Current Situation',
    maxLoanAmount: current.maxLoanAmount,
    maxHomePrice: current.maxHomePrice,
    monthlyPayment: current.monthlyPayment,
    dtiRatio: current.dtiRatio,
    frontEndRatio: current.frontEndRatio,
    qualificationScore: current.qualificationScore
  });
  
  // Improved credit score scenario
  const improvedCredit = calculateMortgageQualification({
    ...inputs,
    creditScore: Math.min(850, inputs.creditScore + 50)
  });
  scenarios.push({
    scenario: 'Improved Credit Score',
    maxLoanAmount: improvedCredit.maxLoanAmount,
    maxHomePrice: improvedCredit.maxHomePrice,
    monthlyPayment: improvedCredit.monthlyPayment,
    dtiRatio: improvedCredit.dtiRatio,
    frontEndRatio: improvedCredit.frontEndRatio,
    qualificationScore: improvedCredit.qualificationScore
  });
  
  // Reduced debt scenario
  const reducedDebt = calculateMortgageQualification({
    ...inputs,
    monthlyDebts: Math.max(0, inputs.monthlyDebts - 200)
  });
  scenarios.push({
    scenario: 'Reduced Monthly Debts',
    maxLoanAmount: reducedDebt.maxLoanAmount,
    maxHomePrice: reducedDebt.maxHomePrice,
    monthlyPayment: reducedDebt.monthlyPayment,
    dtiRatio: reducedDebt.dtiRatio,
    frontEndRatio: reducedDebt.frontEndRatio,
    qualificationScore: reducedDebt.qualificationScore
  });
  
  // Larger down payment scenario
  const largerDownPayment = calculateMortgageQualification({
    ...inputs,
    downPayment: inputs.downPayment + 20000
  });
  scenarios.push({
    scenario: 'Larger Down Payment',
    maxLoanAmount: largerDownPayment.maxLoanAmount,
    maxHomePrice: largerDownPayment.maxHomePrice,
    monthlyPayment: largerDownPayment.monthlyPayment,
    dtiRatio: largerDownPayment.dtiRatio,
    frontEndRatio: largerDownPayment.frontEndRatio,
    qualificationScore: largerDownPayment.qualificationScore
  });
  
  // Lower interest rate scenario
  const lowerRate = calculateMortgageQualification({
    ...inputs,
    interestRate: Math.max(0.1, inputs.interestRate - 0.5)
  });
  scenarios.push({
    scenario: 'Lower Interest Rate',
    maxLoanAmount: lowerRate.maxLoanAmount,
    maxHomePrice: lowerRate.maxHomePrice,
    monthlyPayment: lowerRate.monthlyPayment,
    dtiRatio: lowerRate.dtiRatio,
    frontEndRatio: lowerRate.frontEndRatio,
    qualificationScore: lowerRate.qualificationScore
  });
  
  // Sort by qualification score
  scenarios.sort((a, b) => b.qualificationScore - a.qualificationScore);
  
  return {
    scenarios,
    bestScenario: scenarios[0],
    worstScenario: scenarios[scenarios.length - 1]
  };
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  inputs: MortgageQualificationInputs,
  factors: QualificationFactor[],
  dtiRatio: number,
  frontEndRatio: number
): string {
  let recommendations = `## Mortgage Qualification Recommendations\n\n`;
  
  // Overall assessment
  const negativeFactors = factors.filter(f => f.impact === 'negative');
  const positiveFactors = factors.filter(f => f.impact === 'positive');
  
  if (negativeFactors.length === 0) {
    recommendations += `### Excellent Qualification Profile\n`;
    recommendations += `Your financial profile is strong for mortgage qualification. All factors are positive.\n\n`;
  } else if (negativeFactors.length <= 2) {
    recommendations += `### Good Qualification Profile\n`;
    recommendations += `Your qualification profile is generally good with ${negativeFactors.length} area(s) for improvement.\n\n`;
  } else {
    recommendations += `### Needs Improvement\n`;
    recommendations += `Your qualification profile has ${negativeFactors.length} areas that need attention before applying for a mortgage.\n\n`;
  }
  
  // Specific recommendations for negative factors
  if (negativeFactors.length > 0) {
    recommendations += `### Priority Improvements\n\n`;
    negativeFactors.forEach(factor => {
      recommendations += `**${factor.factor}:** ${factor.recommendation}\n\n`;
    });
  }
  
  // Loan type recommendations
  recommendations += `### Loan Type Recommendations\n\n`;
  switch (inputs.loanType) {
    case 'conventional':
      if (inputs.creditScore < 700) {
        recommendations += `- **Consider FHA:** Your credit score may qualify you for an FHA loan with lower requirements\n`;
      }
      if ((inputs.downPayment / (inputs.downPayment + 300000)) * 100 < 20) {
        recommendations += `- **Save for 20% down:** Avoid PMI by saving for a larger down payment\n`;
      }
      break;
    case 'fha':
      if (inputs.creditScore >= 700 && (inputs.downPayment / (inputs.downPayment + 300000)) * 100 >= 20) {
        recommendations += `- **Consider Conventional:** You may qualify for a conventional loan with better terms\n`;
      }
      break;
    case 'va':
      recommendations += `- **VA Benefits:** Ensure you're maximizing your VA loan benefits\n`;
      break;
    case 'usda':
      recommendations += `- **USDA Eligibility:** Verify the property is in a USDA-eligible area\n`;
      break;
  }
  
  // General recommendations
  recommendations += `### General Recommendations\n\n`;
  recommendations += `- **Maintain good credit:** Continue paying bills on time and keep credit utilization low\n`;
  recommendations += `- **Reduce debt:** Pay down existing debts to improve your DTI ratio\n`;
  recommendations += `- **Save more:** Increase your down payment to reduce monthly payments\n`;
  recommendations += `- **Shop around:** Compare rates from multiple lenders\n`;
  recommendations += `- **Get pre-approved:** Obtain a pre-approval letter before house hunting\n`;
  
  return recommendations;
}