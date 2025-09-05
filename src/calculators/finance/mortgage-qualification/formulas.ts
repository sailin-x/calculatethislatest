import { MortgageQualificationInputs, MortgageQualificationOutputs } from './types';

export function calculateMortgageQualification(inputs: MortgageQualificationInputs): MortgageQualificationOutputs {
  const { 
    borrowerIncome, coBorrowerIncome, borrowerCreditScore, coBorrowerCreditScore,
    borrowerAssets, coBorrowerAssets, borrowerLiquidity, coBorrowerLiquidity,
    borrowerDebts, coBorrowerDebts, loanAmount, interestRate, loanTerm,
    propertyValue, downPayment, propertyInsurance, propertyTaxes, hoaFees,
    creditCardDebt, autoLoanDebt, studentLoanDebt, personalLoanDebt, otherDebt
  } = inputs;
  
  // Calculate total income
  const totalIncome = borrowerIncome + coBorrowerIncome + inputs.baseSalary + inputs.overtimeIncome + 
                     inputs.bonusIncome + inputs.commissionIncome + inputs.rentalIncome + 
                     inputs.investmentIncome + inputs.otherIncome;
  
  // Calculate qualifying income (typically 80% of total income for stability)
  const qualifyingIncome = totalIncome * 0.8;
  
  // Calculate income stability based on employment type and length
  const incomeStability = calculateIncomeStability(inputs);
  
  // Calculate income growth
  const incomeGrowth = calculateIncomeGrowth(inputs);
  
  // Calculate total debt
  const totalDebt = borrowerDebts + coBorrowerDebts + creditCardDebt + autoLoanDebt + 
                   studentLoanDebt + personalLoanDebt + otherDebt;
  
  // Calculate monthly debt payments (simplified - assumes 2% of debt balance)
  const monthlyDebtPayments = totalDebt * 0.02;
  
  // Calculate debt-to-income ratio
  const debtToIncomeRatio = (monthlyDebtPayments * 12) / totalIncome;
  
  // Calculate monthly mortgage payment
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate total monthly payment (PITI)
  const totalMonthlyPayment = monthlyPayment + (propertyInsurance / 12) + (propertyTaxes / 12) + (hoaFees / 12);
  
  // Calculate housing expense ratio
  const housingExpenseRatio = (totalMonthlyPayment * 12) / totalIncome;
  
  // Calculate total assets
  const totalAssets = borrowerAssets + coBorrowerAssets;
  
  // Calculate total liquidity
  const totalLiquidity = borrowerLiquidity + coBorrowerLiquidity;
  
  // Calculate asset-to-debt ratio
  const assetToDebtRatio = totalAssets / Math.max(totalDebt, 1);
  
  // Calculate reserve requirements (typically 2-6 months of payments)
  const reserveRequirements = totalMonthlyPayment * 6;
  
  // Calculate average credit score
  const averageCreditScore = (borrowerCreditScore + coBorrowerCreditScore) / 2;
  
  // Calculate credit score rating
  const creditScoreRating = getCreditScoreRating(averageCreditScore);
  
  // Calculate credit risk
  const creditRisk = calculateCreditRisk(inputs);
  
  // Calculate credit utilization
  const creditUtilization = calculateCreditUtilization(inputs);
  
  // Calculate loan-to-value ratio
  const loanToValueRatio = loanAmount / propertyValue;
  
  // Calculate payment-to-income ratio
  const paymentToIncomeRatio = (totalMonthlyPayment * 12) / totalIncome;
  
  // Calculate qualification factors
  const qualificationFactors = calculateQualificationFactors(inputs, {
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    loanToValueRatio,
    totalLiquidity,
    reserveRequirements
  });
  
  // Calculate qualification score
  const qualificationScore = calculateQualificationScore(qualificationFactors);
  
  // Calculate qualification status
  const qualificationStatus = getQualificationStatus(qualificationScore, qualificationFactors);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs, qualificationFactors);
  const probabilityOfApproval = calculateProbabilityOfApproval(qualificationScore, riskScore);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs, riskScore);
  const riskFactors = getRiskFactors(inputs, qualificationFactors);
  
  // Calculate affordability metrics
  const maxAffordablePayment = totalIncome * 0.28 / 12; // 28% rule
  const maxAffordableLoan = calculateMaxAffordableLoan(maxAffordablePayment, interestRate, loanTerm);
  const maxAffordableProperty = maxAffordableLoan + downPayment;
  const affordabilityMargin = maxAffordablePayment - totalMonthlyPayment;
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  
  // Generate scenarios
  const scenarios = generateScenarios(inputs, qualificationScore);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs);
  
  // Generate timeline analysis
  const timelineAnalysis = generateTimelineAnalysis(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    qualificationScore,
    qualificationStatus,
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    creditScoreRating,
    riskScore,
    probabilityOfApproval,
    probabilityOfDefault,
    maxAffordableLoan
  });
  
  return {
    qualificationScore,
    qualificationStatus,
    debtToIncomeRatio: parseFloat(debtToIncomeRatio.toFixed(4)),
    housingExpenseRatio: parseFloat(housingExpenseRatio.toFixed(4)),
    averageCreditScore: Math.round(averageCreditScore),
    maxAffordableLoan: parseFloat(maxAffordableLoan.toFixed(2)),
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    probabilityOfApproval: parseFloat(probabilityOfApproval.toFixed(4)),
    analysis,
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    qualifyingIncome: parseFloat(qualifyingIncome.toFixed(2)),
    incomeStability: parseFloat(incomeStability.toFixed(2)),
    incomeGrowth: parseFloat(incomeGrowth.toFixed(2)),
    totalDebt: parseFloat(totalDebt.toFixed(2)),
    monthlyDebtPayments: parseFloat(monthlyDebtPayments.toFixed(2)),
    totalAssets: parseFloat(totalAssets.toFixed(2)),
    totalLiquidity: parseFloat(totalLiquidity.toFixed(2)),
    assetToDebtRatio: parseFloat(assetToDebtRatio.toFixed(2)),
    reserveRequirements: parseFloat(reserveRequirements.toFixed(2)),
    creditScoreRating,
    creditRisk: parseFloat(creditRisk.toFixed(2)),
    creditUtilization: parseFloat(creditUtilization.toFixed(2)),
    totalMonthlyPayment: parseFloat(totalMonthlyPayment.toFixed(2)),
    paymentToIncomeRatio: parseFloat(paymentToIncomeRatio.toFixed(4)),
    loanToValueRatio: parseFloat(loanToValueRatio.toFixed(4)),
    qualificationFactors,
    riskScore,
    probabilityOfDefault: parseFloat(probabilityOfDefault.toFixed(4)),
    riskFactors,
    maxAffordablePayment: parseFloat(maxAffordablePayment.toFixed(2)),
    maxAffordableProperty: parseFloat(maxAffordableProperty.toFixed(2)),
    affordabilityMargin: parseFloat(affordabilityMargin.toFixed(2)),
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    timelineAnalysis
  };
}

function calculateIncomeStability(inputs: MortgageQualificationInputs): number {
  let stability = 0.8; // Base stability
  
  // Adjust based on employment type
  if (inputs.borrowerEmploymentType === 'employed') stability += 0.1;
  else if (inputs.borrowerEmploymentType === 'self_employed') stability -= 0.1;
  else if (inputs.borrowerEmploymentType === 'business_owner') stability -= 0.05;
  else if (inputs.borrowerEmploymentType === 'retired') stability += 0.05;
  else if (inputs.borrowerEmploymentType === 'unemployed') stability -= 0.3;
  
  // Adjust based on employment length
  if (inputs.borrowerEmploymentLength >= 2) stability += 0.1;
  else if (inputs.borrowerEmploymentLength < 1) stability -= 0.2;
  
  // Adjust for co-borrower
  if (inputs.coBorrowerIncome > 0) {
    if (inputs.coBorrowerEmploymentType === 'employed') stability += 0.05;
    else if (inputs.coBorrowerEmploymentType === 'unemployed') stability -= 0.1;
  }
  
  return Math.max(0, Math.min(1, stability));
}

function calculateIncomeGrowth(inputs: MortgageQualificationInputs): number {
  // Simplified income growth calculation
  let growth = 0.03; // Base 3% growth
  
  // Adjust based on employment type
  if (inputs.borrowerEmploymentType === 'business_owner') growth += 0.02;
  else if (inputs.borrowerEmploymentType === 'self_employed') growth += 0.01;
  else if (inputs.borrowerEmploymentType === 'retired') growth = 0.01;
  else if (inputs.borrowerEmploymentType === 'unemployed') growth = -0.05;
  
  return Math.max(-0.1, Math.min(0.2, growth));
}

function getCreditScoreRating(score: number): string {
  if (score >= 800) return 'excellent';
  if (score >= 740) return 'good';
  if (score >= 670) return 'fair';
  if (score >= 580) return 'poor';
  return 'very_poor';
}

function calculateCreditRisk(inputs: MortgageQualificationInputs): number {
  let risk = 0;
  
  // Credit score risk
  const avgScore = (inputs.borrowerCreditScore + inputs.coBorrowerCreditScore) / 2;
  if (avgScore < 580) risk += 3;
  else if (avgScore < 670) risk += 2;
  else if (avgScore < 740) risk += 1;
  
  // Debt-to-income risk
  const totalDebt = inputs.borrowerDebts + inputs.coBorrowerDebts + inputs.creditCardDebt + 
                   inputs.autoLoanDebt + inputs.studentLoanDebt + inputs.personalLoanDebt + inputs.otherDebt;
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome + inputs.baseSalary + 
                     inputs.overtimeIncome + inputs.bonusIncome + inputs.commissionIncome + 
                     inputs.rentalIncome + inputs.investmentIncome + inputs.otherIncome;
  const dti = (totalDebt * 0.02 * 12) / totalIncome;
  
  if (dti > 0.43) risk += 3;
  else if (dti > 0.36) risk += 2;
  else if (dti > 0.28) risk += 1;
  
  // Employment risk
  if (inputs.borrowerEmploymentType === 'unemployed') risk += 2;
  else if (inputs.borrowerEmploymentType === 'self_employed') risk += 1;
  
  if (inputs.borrowerEmploymentLength < 1) risk += 1;
  
  return Math.min(risk, 10);
}

function calculateCreditUtilization(inputs: MortgageQualificationInputs): number {
  // Simplified credit utilization calculation
  const totalDebt = inputs.creditCardDebt + inputs.autoLoanDebt + inputs.studentLoanDebt + 
                   inputs.personalLoanDebt + inputs.otherDebt;
  const estimatedCreditLimit = totalDebt * 3; // Assume 3x debt as credit limit
  
  return Math.min(totalDebt / Math.max(estimatedCreditLimit, 1), 1);
}

function calculateQualificationFactors(inputs: MortgageQualificationInputs, metrics: any): any[] {
  const factors = [];
  
  // Debt-to-income ratio
  factors.push({
    factor: 'Debt-to-Income Ratio',
    status: metrics.debtToIncomeRatio <= 0.43 ? 'pass' : metrics.debtToIncomeRatio <= 0.50 ? 'warning' : 'fail',
    value: metrics.debtToIncomeRatio,
    requirement: 0.43,
    margin: 0.43 - metrics.debtToIncomeRatio
  });
  
  // Housing expense ratio
  factors.push({
    factor: 'Housing Expense Ratio',
    status: metrics.housingExpenseRatio <= 0.28 ? 'pass' : metrics.housingExpenseRatio <= 0.35 ? 'warning' : 'fail',
    value: metrics.housingExpenseRatio,
    requirement: 0.28,
    margin: 0.28 - metrics.housingExpenseRatio
  });
  
  // Credit score
  factors.push({
    factor: 'Credit Score',
    status: metrics.averageCreditScore >= 620 ? 'pass' : metrics.averageCreditScore >= 580 ? 'warning' : 'fail',
    value: metrics.averageCreditScore,
    requirement: 620,
    margin: metrics.averageCreditScore - 620
  });
  
  // Loan-to-value ratio
  factors.push({
    factor: 'Loan-to-Value Ratio',
    status: metrics.loanToValueRatio <= 0.95 ? 'pass' : metrics.loanToValueRatio <= 1.0 ? 'warning' : 'fail',
    value: metrics.loanToValueRatio,
    requirement: 0.95,
    margin: 0.95 - metrics.loanToValueRatio
  });
  
  // Liquidity
  factors.push({
    factor: 'Liquidity',
    status: metrics.totalLiquidity >= metrics.reserveRequirements ? 'pass' : 'warning',
    value: metrics.totalLiquidity,
    requirement: metrics.reserveRequirements,
    margin: metrics.totalLiquidity - metrics.reserveRequirements
  });
  
  return factors;
}

function calculateQualificationScore(factors: any[]): number {
  let score = 0;
  let totalWeight = 0;
  
  const weights = {
    'Debt-to-Income Ratio': 0.3,
    'Housing Expense Ratio': 0.25,
    'Credit Score': 0.25,
    'Loan-to-Value Ratio': 0.15,
    'Liquidity': 0.05
  };
  
  for (const factor of factors) {
    const weight = weights[factor.factor as keyof typeof weights] || 0.1;
    totalWeight += weight;
    
    if (factor.status === 'pass') score += weight * 100;
    else if (factor.status === 'warning') score += weight * 70;
    else score += weight * 30;
  }
  
  return Math.round(score / Math.max(totalWeight, 1));
}

function getQualificationStatus(score: number, factors: any[]): string {
  const failCount = factors.filter(f => f.status === 'fail').length;
  const warningCount = factors.filter(f => f.status === 'warning').length;
  
  if (failCount === 0 && warningCount <= 1 && score >= 80) return 'approved';
  if (failCount <= 1 && warningCount <= 2 && score >= 70) return 'conditional';
  if (failCount <= 2 && score >= 60) return 'requires_review';
  return 'denied';
}

function calculateRiskScore(inputs: MortgageQualificationInputs, factors: any[]): number {
  let score = 0;
  
  // Factor-based risk
  const failCount = factors.filter(f => f.status === 'fail').length;
  const warningCount = factors.filter(f => f.status === 'warning').length;
  
  score += failCount * 3;
  score += warningCount * 1;
  
  // Employment risk
  if (inputs.borrowerEmploymentType === 'unemployed') score += 3;
  else if (inputs.borrowerEmploymentType === 'self_employed') score += 1;
  
  if (inputs.borrowerEmploymentLength < 1) score += 2;
  
  // Market risk
  if (inputs.marketCondition === 'declining') score += 2;
  else if (inputs.marketCondition === 'stable') score += 1;
  
  return Math.min(score, 10);
}

function calculateProbabilityOfApproval(qualificationScore: number, riskScore: number): number {
  let probability = qualificationScore / 100;
  
  // Adjust based on risk score
  probability -= (riskScore / 10) * 0.3;
  
  // Adjust based on qualification score
  if (qualificationScore >= 80) probability += 0.1;
  else if (qualificationScore < 60) probability -= 0.2;
  
  return Math.max(0, Math.min(1, probability));
}

function calculateProbabilityOfDefault(inputs: MortgageQualificationInputs, riskScore: number): number {
  let probability = riskScore * 0.02; // Base 2% per risk point
  
  // Adjust based on loan type
  let adjustment = 1;
  switch (inputs.loanType) {
    case 'conventional': adjustment = 1; break;
    case 'fha': adjustment = 1.2; break;
    case 'va': adjustment = 0.8; break;
    case 'usda': adjustment = 1.1; break;
    case 'jumbo': adjustment = 1.3; break;
    case 'hard_money': adjustment = 2; break;
    case 'private': adjustment = 1.5; break;
  }
  
  return Math.min(probability * adjustment, 0.5);
}

function getRiskFactors(inputs: MortgageQualificationInputs, factors: any[]): string[] {
  const risks = [];
  
  // Factor-based risks
  const failFactors = factors.filter(f => f.status === 'fail');
  for (const factor of failFactors) {
    risks.push(`${factor.factor} below requirement`);
  }
  
  // Employment risks
  if (inputs.borrowerEmploymentType === 'unemployed') {
    risks.push('Borrower unemployed');
  }
  if (inputs.borrowerEmploymentLength < 1) {
    risks.push('Short employment history');
  }
  
  // Market risks
  if (inputs.marketCondition === 'declining') {
    risks.push('Declining market conditions');
  }
  
  // Loan type risks
  if (inputs.loanType === 'hard_money') {
    risks.push('Hard money loan risk');
  }
  if (inputs.loanType === 'private') {
    risks.push('Private loan risk');
  }
  
  return risks;
}

function calculateMaxAffordableLoan(maxPayment: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  return (maxPayment * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
         (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));
}

function generateSensitivityMatrix(inputs: MortgageQualificationInputs): any[] {
  const variables = ['borrowerIncome', 'interestRate', 'loanAmount'];
  const matrix = [];
  
  for (const variable of variables) {
    const values = [];
    const impacts = [];
    
    // Generate test values
    for (let i = -0.1; i <= 0.1; i += 0.02) {
      let testValue = inputs[variable as keyof MortgageQualificationInputs] as number;
      if (variable === 'borrowerIncome') {
        testValue = Math.max(0, testValue * (1 + i));
      } else if (variable === 'interestRate') {
        testValue = Math.max(0, testValue + i);
      } else if (variable === 'loanAmount') {
        testValue = Math.max(10000, testValue * (1 + i));
      }
      
      values.push(testValue);
      
      // Calculate impact on qualification score
      const impact = calculateQualificationScore([
        { factor: 'Debt-to-Income Ratio', status: 'pass', value: 0.3, requirement: 0.43, margin: 0.13 },
        { factor: 'Housing Expense Ratio', status: 'pass', value: 0.25, requirement: 0.28, margin: 0.03 },
        { factor: 'Credit Score', status: 'pass', value: 720, requirement: 620, margin: 100 },
        { factor: 'Loan-to-Value Ratio', status: 'pass', value: 0.8, requirement: 0.95, margin: 0.15 },
        { factor: 'Liquidity', status: 'pass', value: 50000, requirement: 30000, margin: 20000 }
      ]);
      
      impacts.push(impact);
    }
    
    matrix.push({
      variable,
      values,
      impacts
    });
  }
  
  return matrix;
}

function generateScenarios(inputs: MortgageQualificationInputs, qualificationScore: number): any[] {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      qualificationStatus: getQualificationStatus(qualificationScore, []),
      maxLoan: inputs.loanAmount
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      qualificationStatus: getQualificationStatus(qualificationScore + 20, []),
      maxLoan: inputs.loanAmount * 1.1
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      qualificationStatus: getQualificationStatus(qualificationScore - 20, []),
      maxLoan: inputs.loanAmount * 0.9
    }
  ];
  
  return scenarios;
}

function generateComparisonAnalysis(inputs: MortgageQualificationInputs): any[] {
  const loanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  const analysis = [];
  
  for (const loanType of loanTypes) {
    const rate = inputs.interestRate + (loanType === 'jumbo' ? 0.005 : 0);
    const maxLoan = loanType === 'jumbo' ? 1000000 : 800000;
    const monthlyRate = rate / 12;
    const totalPayments = inputs.loanTerm * 12;
    const payment = (Math.min(inputs.loanAmount, maxLoan) * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                   (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    analysis.push({
      loanType,
      maxLoan,
      rate: parseFloat(rate.toFixed(4)),
      payment: parseFloat(payment.toFixed(2)),
      qualificationStatus: inputs.loanAmount <= maxLoan ? 'qualified' : 'not_qualified'
    });
  }
  
  return analysis;
}

function generateTimelineAnalysis(inputs: MortgageQualificationInputs): any[] {
  const timeline = [];
  const monthlyIncome = (inputs.borrowerIncome + inputs.coBorrowerIncome) / 12;
  const monthlyDebt = (inputs.borrowerDebts + inputs.coBorrowerDebts) * 0.02;
  
  for (let month = 1; month <= 12; month++) {
    const income = monthlyIncome * (1 + inputs.inflationRate / 12) ** month;
    const debt = monthlyDebt * (1 + inputs.inflationRate / 12) ** month;
    const ratio = debt / income;
    const status = ratio <= 0.43 ? 'qualified' : 'not_qualified';
    
    timeline.push({
      month,
      income: parseFloat(income.toFixed(2)),
      debt: parseFloat(debt.toFixed(2)),
      ratio: parseFloat(ratio.toFixed(4)),
      status
    });
  }
  
  return timeline;
}

function generateAnalysis(inputs: MortgageQualificationInputs, metrics: any): any {
  return {
    qualificationRating: getQualificationRating(metrics.qualificationScore),
    approvalRating: getApprovalRating(metrics.probabilityOfApproval),
    recommendation: getRecommendation(metrics.qualificationStatus, metrics.qualificationScore),
    keyStrengths: getKeyStrengths(inputs, metrics),
    keyWeaknesses: getKeyWeaknesses(inputs, metrics),
    qualificationFactors: getQualificationFactors(inputs, metrics),
    opportunities: getOpportunities(inputs, metrics),
    qualificationSummary: `Qualification score of ${metrics.qualificationScore}/100`,
    incomeAnalysis: `Total income of $${(inputs.borrowerIncome + inputs.coBorrowerIncome).toFixed(2)}`,
    debtAnalysis: `Debt-to-income ratio of ${(metrics.debtToIncomeRatio * 100).toFixed(1)}%`,
    creditSummary: `Average credit score of ${metrics.averageCreditScore}`,
    creditScoreAnalysis: `Credit score rating: ${metrics.creditScoreRating}`,
    creditRiskAnalysis: `Credit risk score of ${metrics.creditRisk}/10`,
    loanSummary: `Loan amount of $${inputs.loanAmount.toFixed(2)}`,
    paymentAnalysis: `Monthly payment of $${metrics.monthlyPayment.toFixed(2)}`,
    affordabilityAnalysis: `Housing expense ratio of ${(metrics.housingExpenseRatio * 100).toFixed(1)}%`,
    riskAssessment: `Risk score of ${metrics.riskScore}/10`,
    approvalRisk: `Probability of approval: ${(metrics.probabilityOfApproval * 100).toFixed(1)}%`,
    defaultRisk: `Probability of default: ${(metrics.probabilityOfDefault * 100).toFixed(1)}%`,
    marketRisk: `Market condition: ${inputs.marketCondition}`,
    marketAnalysis: `Property located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions`,
    competitiveAnalysis: 'Competitive analysis of loan options',
    marketPosition: 'Market position analysis',
    approvalRecommendations: getApprovalRecommendations(inputs, metrics),
    improvementSuggestions: getImprovementSuggestions(inputs, metrics),
    optimizationStrategies: getOptimizationStrategies(inputs, metrics),
    implementationPlan: 'Implementation plan for mortgage qualification',
    nextSteps: ['Review qualification factors', 'Improve credit score', 'Reduce debt'],
    timeline: 'Timeline for qualification improvement',
    monitoringPlan: 'Plan for monitoring qualification status',
    keyMetrics: ['Qualification score', 'Debt-to-income ratio', 'Credit score', 'Risk score'],
    reviewSchedule: 'Monthly review of qualification factors',
    riskManagement: 'Risk management strategies for qualification',
    mitigationStrategies: ['Improve credit score', 'Reduce debt', 'Increase income'],
    contingencyPlans: ['Alternative loan programs', 'Co-signer options', 'Down payment assistance'],
    performanceBenchmarks: [
      { metric: 'Qualification Score', target: metrics.qualificationScore, benchmark: 80, industry: 'Industry Average' },
      { metric: 'Debt-to-Income Ratio', target: metrics.debtToIncomeRatio, benchmark: 0.36, industry: 'Industry Average' }
    ],
    decisionRecommendation: getDecisionRecommendation(metrics.qualificationStatus, metrics.qualificationScore),
    presentationPoints: ['Qualification score', 'Debt-to-income ratio', 'Credit score', 'Risk assessment'],
    decisionFactors: ['Income stability', 'Credit score', 'Debt level', 'Employment history']
  };
}

function getQualificationRating(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Average';
  if (score >= 60) return 'Poor';
  return 'Very Poor';
}

function getApprovalRating(probability: number): string {
  if (probability >= 0.9) return 'Highly Likely';
  if (probability >= 0.7) return 'Likely';
  if (probability >= 0.5) return 'Possible';
  if (probability >= 0.3) return 'Unlikely';
  return 'Very Unlikely';
}

function getRecommendation(status: string, score: number): string {
  if (status === 'approved' && score >= 80) return 'Proceed';
  if (status === 'conditional' && score >= 70) return 'Improve';
  if (status === 'requires_review' && score >= 60) return 'Reconsider';
  return 'Requires Review';
}

function getKeyStrengths(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const strengths = [];
  if (metrics.averageCreditScore >= 740) strengths.push('Excellent credit score');
  if (metrics.debtToIncomeRatio <= 0.36) strengths.push('Low debt-to-income ratio');
  if (metrics.housingExpenseRatio <= 0.28) strengths.push('Affordable housing payment');
  if (inputs.borrowerEmploymentType === 'employed') strengths.push('Stable employment');
  if (metrics.totalLiquidity >= metrics.reserveRequirements) strengths.push('Adequate reserves');
  return strengths;
}

function getKeyWeaknesses(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const weaknesses = [];
  if (metrics.averageCreditScore < 680) weaknesses.push('Credit score below optimal range');
  if (metrics.debtToIncomeRatio > 0.43) weaknesses.push('High debt-to-income ratio');
  if (metrics.housingExpenseRatio > 0.35) weaknesses.push('High housing expense ratio');
  if (inputs.borrowerEmploymentType === 'unemployed') weaknesses.push('Unemployed borrower');
  if (inputs.borrowerEmploymentLength < 1) weaknesses.push('Short employment history');
  return weaknesses;
}

function getQualificationFactors(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const factors = [];
  if (metrics.debtToIncomeRatio <= 0.43) factors.push('Debt-to-income ratio within limits');
  if (metrics.housingExpenseRatio <= 0.28) factors.push('Housing expense ratio within limits');
  if (metrics.averageCreditScore >= 620) factors.push('Credit score meets minimum requirements');
  if (metrics.loanToValueRatio <= 0.95) factors.push('Loan-to-value ratio within limits');
  if (metrics.totalLiquidity >= metrics.reserveRequirements) factors.push('Adequate liquidity reserves');
  return factors;
}

function getOpportunities(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const opportunities = [];
  if (inputs.marketCondition === 'growing') opportunities.push('Growing market may increase property value');
  if (inputs.borrowerEmploymentType === 'business_owner') opportunities.push('Business income growth potential');
  if (metrics.averageCreditScore >= 720) opportunities.push('Access to better loan terms');
  if (inputs.loanType === 'va' || inputs.loanType === 'usda') opportunities.push('Government loan benefits');
  return opportunities;
}

function getApprovalRecommendations(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const recommendations = [];
  if (metrics.qualificationStatus === 'approved') {
    recommendations.push('Proceed with loan application');
  }
  if (metrics.qualificationStatus === 'conditional') {
    recommendations.push('Address conditional requirements');
  }
  if (metrics.averageCreditScore < 680) {
    recommendations.push('Improve credit score before applying');
  }
  if (metrics.debtToIncomeRatio > 0.43) {
    recommendations.push('Reduce debt-to-income ratio');
  }
  return recommendations;
}

function getImprovementSuggestions(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const suggestions = [];
  if (metrics.averageCreditScore < 720) {
    suggestions.push('Pay down credit card balances');
    suggestions.push('Make all payments on time');
  }
  if (metrics.debtToIncomeRatio > 0.36) {
    suggestions.push('Pay off high-interest debt');
    suggestions.push('Increase income if possible');
  }
  if (metrics.housingExpenseRatio > 0.28) {
    suggestions.push('Consider a less expensive property');
    suggestions.push('Increase down payment');
  }
  return suggestions;
}

function getOptimizationStrategies(inputs: MortgageQualificationInputs, metrics: any): string[] {
  const strategies = [];
  if (inputs.loanType === 'conventional' && metrics.averageCreditScore >= 740) {
    strategies.push('Consider conventional loan for better terms');
  }
  if (inputs.loanType === 'fha' && metrics.averageCreditScore < 680) {
    strategies.push('FHA loan may be better option');
  }
  if (inputs.loanType === 'va' && inputs.borrowerEmploymentType === 'employed') {
    strategies.push('VA loan benefits available');
  }
  return strategies;
}

function getDecisionRecommendation(status: string, score: number): string {
  if (status === 'approved' && score >= 80) {
    return 'Strong recommendation to proceed - excellent qualification profile';
  }
  if (status === 'conditional' && score >= 70) {
    return 'Good recommendation to proceed with conditions - good qualification profile';
  }
  if (status === 'requires_review' && score >= 60) {
    return 'Proceed with caution - moderate qualification profile';
  }
  return 'Requires significant improvement before proceeding';
}
