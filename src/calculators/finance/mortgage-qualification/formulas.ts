import { MortgageQualificationInputs, MortgageQualificationOutputs, MortgageQualificationAnalysis } from './types';

export function calculateMortgageQualification(inputs: MortgageQualificationInputs): MortgageQualificationOutputs {
  // Calculate total income
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  const qualifyingIncome = calculateQualifyingIncome(inputs);
  const incomeStability = calculateIncomeStability(inputs);
  const incomeGrowth = calculateIncomeGrowth(inputs);
  
  // Calculate total debt and monthly payments
  const totalDebt = inputs.borrowerDebts + inputs.coBorrowerDebts + 
                   inputs.creditCardDebt + inputs.autoLoanDebt + 
                   inputs.studentLoanDebt + inputs.personalLoanDebt + inputs.otherDebt;
  const monthlyDebtPayments = calculateMonthlyDebtPayments(inputs);
  
  // Calculate monthly mortgage payment
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const totalMonthlyPayment = monthlyPayment + (inputs.propertyInsurance / 12) + (inputs.propertyTaxes / 12) + 
                             inputs.hoaFees + (inputs.floodInsurance / 12) + (inputs.mortgageInsurance / 12);
  
  // Calculate ratios
  const debtToIncomeRatio = ((monthlyDebtPayments + totalMonthlyPayment) / (qualifyingIncome / 12)) * 100;
  const housingExpenseRatio = (totalMonthlyPayment / (qualifyingIncome / 12)) * 100;
  const paymentToIncomeRatio = (totalMonthlyPayment / (qualifyingIncome / 12)) * 100;
  const loanToValueRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  
  // Calculate assets and liquidity
  const totalAssets = inputs.borrowerAssets + inputs.coBorrowerAssets;
  const totalLiquidity = inputs.borrowerLiquidity + inputs.coBorrowerLiquidity;
  const assetToDebtRatio = totalAssets / totalDebt;
  const reserveRequirements = calculateReserveRequirements(inputs);
  
  // Calculate credit analysis
  const averageCreditScore = calculateAverageCreditScore(inputs);
  const creditScoreRating = getCreditScoreRating(averageCreditScore);
  const creditRisk = calculateCreditRisk(inputs);
  const creditUtilization = calculateCreditUtilization(inputs);
  
  // Calculate qualification score and status
  const qualificationScore = calculateQualificationScore(inputs, {
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    loanToValueRatio,
    assetToDebtRatio,
    incomeStability
  });
  
  const qualificationStatus = determineQualificationStatus(qualificationScore, inputs);
  const probabilityOfApproval = calculateProbabilityOfApproval(qualificationScore, inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs, qualificationScore);
  
  // Calculate maximum affordable amounts
  const maxAffordablePayment = (qualifyingIncome / 12) * (inputs.maxHousingExpenseRatio / 100);
  const maxAffordableLoan = calculateMaxAffordableLoan(inputs, maxAffordablePayment);
  const maxAffordableProperty = maxAffordableLoan / (1 - (inputs.minDownPayment / 100));
  const affordabilityMargin = maxAffordablePayment - totalMonthlyPayment;
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs, qualificationScore);
  const riskFactors = identifyRiskFactors(inputs, qualificationScore);
  
  // Generate qualification factors
  const qualificationFactors = generateQualificationFactors(inputs, {
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    loanToValueRatio,
    assetToDebtRatio,
    incomeStability
  });
  
  // Generate analysis
  const analysis = generateQualificationAnalysis(inputs, {
    qualificationScore,
    qualificationStatus,
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    loanToValueRatio,
    assetToDebtRatio,
    incomeStability,
    probabilityOfApproval,
    probabilityOfDefault,
    riskScore,
    riskFactors
  });
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, qualificationScore);
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs, qualificationScore);
  
  // Generate scenarios
  const scenarios = generateScenarioAnalysis(inputs, qualificationScore);
  
  // Generate timeline analysis
  const timelineAnalysis = generateTimelineAnalysis(inputs, qualificationScore);
  
  return {
    // Core Metrics
    qualificationScore,
    qualificationStatus,
    debtToIncomeRatio,
    housingExpenseRatio,
    averageCreditScore,
    maxAffordableLoan,
    monthlyPayment,
    probabilityOfApproval,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    totalIncome,
    qualifyingIncome,
    incomeStability,
    incomeGrowth,
    totalDebt,
    monthlyDebtPayments,
    totalAssets,
    totalLiquidity,
    assetToDebtRatio,
    reserveRequirements,
    creditScoreRating,
    creditRisk,
    creditUtilization,
    totalMonthlyPayment,
    paymentToIncomeRatio,
    loanToValueRatio,
    qualificationFactors,
    riskScore,
    probabilityOfDefault,
    riskFactors,
    maxAffordablePayment,
    maxAffordableProperty,
    affordabilityMargin,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    timelineAnalysis,
  };
}

function calculateQualifyingIncome(inputs: MortgageQualificationInputs): number {
  let qualifyingIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  
  // Add additional income sources with appropriate adjustments
  qualifyingIncome += inputs.baseSalary * 0.9; // 90% of base salary typically qualifies
  qualifyingIncome += inputs.overtimeIncome * 0.8; // 80% of overtime income
  qualifyingIncome += inputs.bonusIncome * 0.7; // 70% of bonus income
  qualifyingIncome += inputs.commissionIncome * 0.8; // 80% of commission income
  qualifyingIncome += inputs.rentalIncome * 0.75; // 75% of rental income (after vacancy allowance)
  qualifyingIncome += inputs.investmentIncome * 0.8; // 80% of investment income
  qualifyingIncome += inputs.otherIncome * 0.7; // 70% of other income
  
  // Adjust for employment type
  if (inputs.borrowerEmploymentType === 'self_employed') {
    qualifyingIncome *= 0.8; // Self-employed income typically requires 2 years history
  }
  
  if (inputs.coBorrowerEmploymentType === 'self_employed') {
    qualifyingIncome *= 0.9; // Co-borrower self-employment adjustment
  }
  
  return qualifyingIncome;
}

function calculateIncomeStability(inputs: MortgageQualificationInputs): number {
  let stability = 100;
  
  // Employment length impact
  if (inputs.borrowerEmploymentLength < 2) stability -= 20;
  else if (inputs.borrowerEmploymentLength < 5) stability -= 10;
  
  if (inputs.coBorrowerEmploymentLength < 2) stability -= 10;
  else if (inputs.coBorrowerEmploymentLength < 5) stability -= 5;
  
  // Employment type impact
  if (inputs.borrowerEmploymentType === 'self_employed') stability -= 15;
  if (inputs.borrowerEmploymentType === 'unemployed') stability -= 50;
  
  if (inputs.coBorrowerEmploymentType === 'self_employed') stability -= 10;
  if (inputs.coBorrowerEmploymentType === 'unemployed') stability -= 25;
  
  // Income diversity impact
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  const baseIncomeRatio = inputs.baseSalary / totalIncome;
  if (baseIncomeRatio < 0.7) stability -= 10; // Less stable if base salary is low
  
  return Math.max(0, stability);
}

function calculateIncomeGrowth(inputs: MortgageQualificationInputs): number {
  // Estimate income growth based on employment type and market conditions
  let growthRate = 2.5; // Base growth rate
  
  if (inputs.borrowerEmploymentType === 'business_owner') growthRate += 2;
  if (inputs.borrowerEmploymentType === 'employed') growthRate += 1;
  if (inputs.marketCondition === 'growing') growthRate += 1;
  if (inputs.marketCondition === 'hot') growthRate += 2;
  
  return growthRate;
}

function calculateMonthlyDebtPayments(inputs: MortgageQualificationInputs): number {
  let monthlyPayments = 0;
  
  // Estimate monthly payments for different debt types
  monthlyPayments += inputs.creditCardDebt * 0.03; // 3% minimum payment
  monthlyPayments += inputs.autoLoanDebt / 60; // 5-year auto loan
  monthlyPayments += inputs.studentLoanDebt / 120; // 10-year student loan
  monthlyPayments += inputs.personalLoanDebt / 36; // 3-year personal loan
  monthlyPayments += inputs.otherDebt / 48; // 4-year other debt
  
  // Add existing debt payments
  monthlyPayments += inputs.borrowerDebts / 12;
  monthlyPayments += inputs.coBorrowerDebts / 12;
  
  return monthlyPayments;
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateReserveRequirements(inputs: MortgageQualificationInputs): number {
  // Reserve requirements vary by loan type and down payment
  let reserveMonths = 2; // Base requirement
  
  if (inputs.loanType === 'jumbo') reserveMonths = 6;
  else if (inputs.loanType === 'fha') reserveMonths = 1;
  else if (inputs.loanType === 'va') reserveMonths = 0;
  
  if (inputs.downPaymentPercentage < 20) reserveMonths += 2;
  
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  return monthlyPayment * reserveMonths;
}

function calculateAverageCreditScore(inputs: MortgageQualificationInputs): number {
  if (inputs.coBorrowerCreditScore > 0) {
    return (inputs.borrowerCreditScore + inputs.coBorrowerCreditScore) / 2;
  }
  return inputs.borrowerCreditScore;
}

function getCreditScoreRating(score: number): string {
  if (score >= 800) return 'excellent';
  if (score >= 740) return 'very_good';
  if (score >= 670) return 'good';
  if (score >= 580) return 'fair';
  if (score >= 300) return 'poor';
  return 'very_poor';
}

function calculateCreditRisk(inputs: MortgageQualificationInputs): number {
  let risk = 50; // Base risk score
  
  // Credit score impact
  const avgScore = calculateAverageCreditScore(inputs);
  if (avgScore < 580) risk += 30;
  else if (avgScore < 670) risk += 20;
  else if (avgScore < 740) risk += 10;
  else if (avgScore >= 800) risk -= 20;
  
  // Debt utilization impact
  const totalDebt = inputs.creditCardDebt + inputs.autoLoanDebt + inputs.studentLoanDebt + 
                   inputs.personalLoanDebt + inputs.otherDebt + inputs.borrowerDebts + inputs.coBorrowerDebts;
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  const debtRatio = totalDebt / totalIncome;
  
  if (debtRatio > 0.5) risk += 25;
  else if (debtRatio > 0.3) risk += 15;
  else if (debtRatio > 0.2) risk += 10;
  else if (debtRatio < 0.1) risk -= 10;
  
  return Math.max(0, Math.min(100, risk));
}

function calculateCreditUtilization(inputs: MortgageQualificationInputs): number {
  // Estimate credit utilization based on debt levels
  const totalDebt = inputs.creditCardDebt + inputs.autoLoanDebt + inputs.studentLoanDebt + 
                   inputs.personalLoanDebt + inputs.otherDebt;
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  
  return (totalDebt / totalIncome) * 100;
}

function calculateQualificationScore(inputs: MortgageQualificationInputs, metrics: any): number {
  let score = 100; // Start with perfect score
  
  // Debt-to-Income ratio impact (40% weight)
  const dtiWeight = 0.4;
  const dtiScore = Math.max(0, 100 - (metrics.debtToIncomeRatio - inputs.maxDebtToIncomeRatio) * 2);
  score = score * (1 - dtiWeight) + dtiScore * dtiWeight;
  
  // Housing expense ratio impact (25% weight)
  const housingWeight = 0.25;
  const housingScore = Math.max(0, 100 - (metrics.housingExpenseRatio - inputs.maxHousingExpenseRatio) * 2);
  score = score * (1 - housingWeight) + housingScore * housingWeight;
  
  // Credit score impact (20% weight)
  const creditWeight = 0.2;
  const creditScore = Math.max(0, Math.min(100, (metrics.averageCreditScore - 300) / 5));
  score = score * (1 - creditWeight) + creditScore * creditWeight;
  
  // Loan-to-Value ratio impact (10% weight)
  const ltvWeight = 0.1;
  const ltvScore = Math.max(0, 100 - (metrics.loanToValueRatio - 80) * 2);
  score = score * (1 - ltvWeight) + ltvScore * ltvWeight;
  
  // Asset-to-Debt ratio impact (5% weight)
  const assetWeight = 0.05;
  const assetScore = Math.min(100, metrics.assetToDebtRatio * 20);
  score = score * (1 - assetWeight) + assetScore * assetWeight;
  
  return Math.max(0, Math.min(100, score));
}

function determineQualificationStatus(score: number, inputs: MortgageQualificationInputs): string {
  if (score >= 85) return 'approved';
  if (score >= 70) return 'conditional';
  if (score >= 50) return 'requires_review';
  return 'denied';
}

function calculateProbabilityOfApproval(score: number, inputs: MortgageQualificationInputs): number {
  // Base probability on qualification score
  let probability = score;
  
  // Adjust for loan type requirements
  if (inputs.loanType === 'conventional' && score < 70) probability -= 10;
  if (inputs.loanType === 'fha' && score < 60) probability -= 5;
  if (inputs.loanType === 'va' && score < 65) probability -= 5;
  if (inputs.loanType === 'jumbo' && score < 80) probability -= 15;
  
  // Adjust for market conditions
  if (inputs.marketCondition === 'hot') probability += 5;
  if (inputs.marketCondition === 'declining') probability -= 10;
  
  return Math.max(0, Math.min(100, probability));
}

function calculateProbabilityOfDefault(inputs: MortgageQualificationInputs, qualificationScore: number): number {
  let defaultProbability = 5; // Base 5% default probability
  
  // Adjust based on qualification score
  if (qualificationScore < 50) defaultProbability += 15;
  else if (qualificationScore < 70) defaultProbability += 10;
  else if (qualificationScore < 85) defaultProbability += 5;
  else defaultProbability -= 2;
  
  // Adjust based on loan-to-value ratio
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltvRatio > 90) defaultProbability += 8;
  else if (ltvRatio > 80) defaultProbability += 5;
  else if (ltvRatio < 60) defaultProbability -= 3;
  
  // Adjust based on credit score
  const avgScore = calculateAverageCreditScore(inputs);
  if (avgScore < 580) defaultProbability += 12;
  else if (avgScore < 670) defaultProbability += 8;
  else if (avgScore < 740) defaultProbability += 4;
  else if (avgScore >= 800) defaultProbability -= 3;
  
  return Math.max(0, Math.min(100, defaultProbability));
}

function calculateMaxAffordableLoan(inputs: MortgageQualificationInputs, maxPayment: number): number {
  // Calculate maximum loan amount based on maximum affordable payment
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  if (monthlyRate === 0) {
    return maxPayment * totalPayments;
  }
  
  // Subtract taxes and insurance from max payment
  const taxesAndInsurance = (inputs.propertyInsurance + inputs.propertyTaxes) / 12 + 
                           inputs.hoaFees + (inputs.floodInsurance + inputs.mortgageInsurance) / 12;
  const maxPrincipalAndInterest = maxPayment - taxesAndInsurance;
  
  if (maxPrincipalAndInterest <= 0) return 0;
  
  return maxPrincipalAndInterest * (Math.pow(1 + monthlyRate, totalPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));
}

function calculateRiskScore(inputs: MortgageQualificationInputs, qualificationScore: number): number {
  let riskScore = 50; // Base risk score
  
  // Qualification score impact
  if (qualificationScore < 50) riskScore += 30;
  else if (qualificationScore < 70) riskScore += 20;
  else if (qualificationScore < 85) riskScore += 10;
  else riskScore -= 10;
  
  // Employment stability impact
  if (inputs.borrowerEmploymentType === 'unemployed') riskScore += 25;
  else if (inputs.borrowerEmploymentType === 'self_employed') riskScore += 15;
  
  // Loan type impact
  if (inputs.loanType === 'jumbo') riskScore += 10;
  if (inputs.loanType === 'hard_money') riskScore += 20;
  
  // Down payment impact
  if (inputs.downPaymentPercentage < 10) riskScore += 15;
  else if (inputs.downPaymentPercentage < 20) riskScore += 10;
  else if (inputs.downPaymentPercentage > 40) riskScore -= 10;
  
  return Math.max(0, Math.min(100, riskScore));
}

function identifyRiskFactors(inputs: MortgageQualificationInputs, qualificationScore: number): string[] {
  const riskFactors: string[] = [];
  
  if (qualificationScore < 70) riskFactors.push('Low qualification score');
  if (inputs.borrowerEmploymentType === 'unemployed') riskFactors.push('Unemployed borrower');
  if (inputs.borrowerEmploymentLength < 2) riskFactors.push('Short employment history');
  if (inputs.downPaymentPercentage < 20) riskFactors.push('Low down payment');
  if (inputs.loanType === 'jumbo') riskFactors.push('Jumbo loan requirements');
  if (inputs.loanType === 'hard_money') riskFactors.push('Hard money loan risk');
  
  const avgScore = calculateAverageCreditScore(inputs);
  if (avgScore < 670) riskFactors.push('Low credit score');
  
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltvRatio > 90) riskFactors.push('High loan-to-value ratio');
  
  return riskFactors;
}

function generateQualificationFactors(inputs: MortgageQualificationInputs, metrics: any): any[] {
  const factors = [
    {
      factor: 'Debt-to-Income Ratio',
      status: metrics.debtToIncomeRatio <= inputs.maxDebtToIncomeRatio ? 'pass' : 'fail',
      value: metrics.debtToIncomeRatio,
      requirement: inputs.maxDebtToIncomeRatio,
      margin: inputs.maxDebtToIncomeRatio - metrics.debtToIncomeRatio
    },
    {
      factor: 'Housing Expense Ratio',
      status: metrics.housingExpenseRatio <= inputs.maxHousingExpenseRatio ? 'pass' : 'fail',
      value: metrics.housingExpenseRatio,
      requirement: inputs.maxHousingExpenseRatio,
      margin: inputs.maxHousingExpenseRatio - metrics.housingExpenseRatio
    },
    {
      factor: 'Credit Score',
      status: metrics.averageCreditScore >= inputs.minCreditScore ? 'pass' : 'fail',
      value: metrics.averageCreditScore,
      requirement: inputs.minCreditScore,
      margin: metrics.averageCreditScore - inputs.minCreditScore
    },
    {
      factor: 'Down Payment',
      status: inputs.downPaymentPercentage >= inputs.minDownPayment ? 'pass' : 'fail',
      value: inputs.downPaymentPercentage,
      requirement: inputs.minDownPayment,
      margin: inputs.downPaymentPercentage - inputs.minDownPayment
    },
    {
      factor: 'Loan Amount',
      status: inputs.loanAmount <= inputs.maxLoanAmount ? 'pass' : 'fail',
      value: inputs.loanAmount,
      requirement: inputs.maxLoanAmount,
      margin: inputs.maxLoanAmount - inputs.loanAmount
    }
  ];
  
  return factors;
}

function generateQualificationAnalysis(inputs: MortgageQualificationInputs, metrics: any): MortgageQualificationAnalysis {
  // Determine ratings
  let qualificationRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let approvalRating: 'Highly Likely' | 'Likely' | 'Possible' | 'Unlikely' | 'Very Unlikely' = 'Possible';
  let recommendation: 'Proceed' | 'Improve' | 'Reconsider' | 'Requires Review' = 'Requires Review';
  
  if (metrics.qualificationScore >= 85) {
    qualificationRating = 'Excellent';
    approvalRating = 'Highly Likely';
    recommendation = 'Proceed';
  } else if (metrics.qualificationScore >= 70) {
    qualificationRating = 'Good';
    approvalRating = 'Likely';
    recommendation = 'Proceed';
  } else if (metrics.qualificationScore >= 50) {
    qualificationRating = 'Average';
    approvalRating = 'Possible';
    recommendation = 'Improve';
  } else if (metrics.qualificationScore >= 30) {
    qualificationRating = 'Poor';
    approvalRating = 'Unlikely';
    recommendation = 'Reconsider';
  } else {
    qualificationRating = 'Very Poor';
    approvalRating = 'Very Unlikely';
    recommendation = 'Reconsider';
  }
  
  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];
  const qualificationFactors: string[] = [];
  const opportunities: string[] = [];
  
  if (metrics.debtToIncomeRatio < inputs.maxDebtToIncomeRatio * 0.8) keyStrengths.push('Strong debt-to-income ratio');
  if (metrics.housingExpenseRatio < inputs.maxHousingExpenseRatio * 0.8) keyStrengths.push('Low housing expense ratio');
  if (metrics.averageCreditScore >= 740) keyStrengths.push('Excellent credit score');
  if (inputs.downPaymentPercentage >= 20) keyStrengths.push('Strong down payment');
  if (metrics.assetToDebtRatio > 2) keyStrengths.push('Strong asset position');
  
  if (metrics.debtToIncomeRatio > inputs.maxDebtToIncomeRatio) keyWeaknesses.push('High debt-to-income ratio');
  if (metrics.housingExpenseRatio > inputs.maxHousingExpenseRatio) keyWeaknesses.push('High housing expense ratio');
  if (metrics.averageCreditScore < 670) keyWeaknesses.push('Low credit score');
  if (inputs.downPaymentPercentage < 20) keyWeaknesses.push('Low down payment');
  if (inputs.borrowerEmploymentType === 'unemployed') keyWeaknesses.push('Unemployed borrower');
  
  if (metrics.qualificationScore >= 70) qualificationFactors.push('Meets most qualification requirements');
  if (metrics.probabilityOfApproval > 70) qualificationFactors.push('High probability of approval');
  if (metrics.riskScore < 40) qualificationFactors.push('Low risk profile');
  
  if (inputs.downPaymentPercentage < 20) opportunities.push('Increase down payment to reduce PMI');
  if (metrics.averageCreditScore < 740) opportunities.push('Improve credit score for better rates');
  if (metrics.debtToIncomeRatio > inputs.maxDebtToIncomeRatio * 0.9) opportunities.push('Reduce debt to improve qualification');
  
  return {
    qualificationRating,
    approvalRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    qualificationFactors,
    opportunities,
    qualificationSummary: `Qualification score of ${metrics.qualificationScore.toFixed(1)}% with ${metrics.probabilityOfApproval.toFixed(1)}% probability of approval.`,
    incomeAnalysis: `Total qualifying income of ${formatCurrency(metrics.qualifyingIncome)} with ${metrics.incomeStability.toFixed(1)}% stability rating.`,
    debtAnalysis: `Debt-to-income ratio of ${metrics.debtToIncomeRatio.toFixed(1)}% with ${formatCurrency(metrics.monthlyDebtPayments)} monthly debt payments.`,
    creditSummary: `Average credit score of ${metrics.averageCreditScore} (${metrics.creditScoreRating}) with ${metrics.creditRisk.toFixed(1)}% risk rating.`,
    creditScoreAnalysis: `Credit score of ${metrics.averageCreditScore} is ${metrics.averageCreditScore >= 740 ? 'excellent' : metrics.averageCreditScore >= 670 ? 'good' : 'fair'}.`,
    creditRiskAnalysis: `Credit risk assessment shows ${metrics.creditRisk.toFixed(1)}% risk with ${metrics.creditUtilization.toFixed(1)}% utilization.`,
    loanSummary: `Loan amount of ${formatCurrency(inputs.loanAmount)} at ${inputs.interestRate}% for ${inputs.loanTerm} years.`,
    paymentAnalysis: `Monthly payment of ${formatCurrency(metrics.monthlyPayment)} with total housing expense of ${formatCurrency(metrics.totalMonthlyPayment)}.`,
    affordabilityAnalysis: `Maximum affordable loan of ${formatCurrency(metrics.maxAffordableLoan)} with ${formatCurrency(metrics.affordabilityMargin)} margin.`,
    riskAssessment: `Overall risk score of ${metrics.riskScore.toFixed(1)}% with ${metrics.probabilityOfDefault.toFixed(1)}% default probability.`,
    approvalRisk: `Approval risk is ${metrics.probabilityOfApproval > 80 ? 'low' : metrics.probabilityOfApproval > 60 ? 'moderate' : 'high'}.`,
    defaultRisk: `Default risk is ${metrics.probabilityOfDefault < 5 ? 'low' : metrics.probabilityOfDefault < 10 ? 'moderate' : 'high'}.`,
    marketRisk: `Market risk is ${inputs.marketCondition === 'stable' ? 'low' : inputs.marketCondition === 'growing' ? 'moderate' : 'high'}.`,
    marketAnalysis: `Current market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% growth rate.`,
    competitiveAnalysis: `Loan terms are ${metrics.qualificationScore >= 80 ? 'competitive' : 'average'} for current market conditions.`,
    marketPosition: `Borrower profile is ${metrics.qualificationScore >= 80 ? 'strong' : metrics.qualificationScore >= 60 ? 'average' : 'weak'} in current market.`,
    approvalRecommendations: [
      'Ensure all documentation is complete and accurate',
      'Maintain current employment and income stability',
      'Avoid taking on additional debt before closing',
      'Keep credit utilization low during the process'
    ],
    improvementSuggestions: [
      'Increase down payment to reduce loan amount',
      'Pay down existing debt to improve DTI ratio',
      'Improve credit score for better rates',
      'Consider a co-borrower if qualification is marginal'
    ],
    optimizationStrategies: [
      'Shop multiple lenders for best rates',
      'Consider different loan programs',
      'Negotiate closing costs and fees',
      'Lock in rate when terms are favorable'
    ],
    implementationPlan: 'Proceed with loan application if qualification score is above 70%.',
    nextSteps: [
      'Submit complete loan application',
      'Provide all required documentation',
      'Respond promptly to lender requests',
      'Maintain financial stability during process'
    ],
    timeline: 'Typical loan approval process takes 30-45 days.',
    monitoringPlan: 'Monitor credit score and avoid new debt during loan process.',
    keyMetrics: [
      'Qualification score',
      'Debt-to-income ratio',
      'Credit score',
      'Down payment percentage'
    ],
    reviewSchedule: 'Review qualification status weekly during loan process.',
    riskManagement: 'Maintain emergency fund and avoid financial changes during process.',
    mitigationStrategies: [
      'Keep employment stable during loan process',
      'Avoid new credit applications',
      'Maintain current debt levels',
      'Prepare for potential rate changes'
    ],
    contingencyPlans: [
      'Have backup lender options',
      'Consider different loan programs',
      'Prepare for potential delays',
      'Have additional down payment available'
    ],
    performanceBenchmarks: [
      {
        metric: 'Qualification Score',
        target: 80,
        benchmark: metrics.qualificationScore,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'DTI Ratio',
        target: 36,
        benchmark: metrics.debtToIncomeRatio,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'Credit Score',
        target: 740,
        benchmark: metrics.averageCreditScore,
        industry: 'Mortgage Lending'
      }
    ],
    decisionRecommendation: recommendation === 'Proceed' ? 'Proceed with loan application' : 
                            recommendation === 'Improve' ? 'Improve qualification factors before applying' :
                            recommendation === 'Reconsider' ? 'Reconsider loan amount or terms' : 'Requires additional review',
    presentationPoints: [
      `Qualification score: ${metrics.qualificationScore.toFixed(1)}%`,
      `DTI ratio: ${metrics.debtToIncomeRatio.toFixed(1)}%`,
      `Credit score: ${metrics.averageCreditScore}`,
      `Probability of approval: ${metrics.probabilityOfApproval.toFixed(1)}%`
    ],
    decisionFactors: [
      'Qualification score and approval probability',
      'Current debt levels and income stability',
      'Credit score and payment history',
      'Down payment amount and loan terms'
    ],
  };
}

function generateComparisonAnalysis(inputs: MortgageQualificationInputs, qualificationScore: number): any[] {
  const loanTypes = [
    { type: 'Conventional', rate: inputs.interestRate, maxDTI: 43, minCredit: 620 },
    { type: 'FHA', rate: inputs.interestRate + 0.5, maxDTI: 43, minCredit: 580 },
    { type: 'VA', rate: inputs.interestRate - 0.25, maxDTI: 41, minCredit: 620 },
    { type: 'USDA', rate: inputs.interestRate + 0.25, maxDTI: 41, minCredit: 640 },
    { type: 'Jumbo', rate: inputs.interestRate + 0.75, maxDTI: 38, minCredit: 700 }
  ];
  
  return loanTypes.map(loanType => {
    const adjustedScore = qualificationScore;
    let status = 'approved';
    if (adjustedScore < 70) status = 'conditional';
    if (adjustedScore < 50) status = 'denied';
    
    const maxLoan = calculateMaxAffordableLoan({ ...inputs, interestRate: loanType.rate }, 
      (inputs.borrowerIncome + inputs.coBorrowerIncome) / 12 * (loanType.maxDTI / 100));
    
    const payment = calculateMonthlyPayment(maxLoan, loanType.rate, inputs.loanTerm);
    
    return {
      loanType: loanType.type,
      maxLoan,
      rate: loanType.rate,
      payment,
      qualificationStatus: status
    };
  });
}

function generateSensitivityMatrix(inputs: MortgageQualificationInputs, qualificationScore: number): any[] {
  const variables = [
    { name: 'Interest Rate', field: 'interestRate', base: inputs.interestRate, range: [-1, -0.5, 0, 0.5, 1] },
    { name: 'Income', field: 'borrowerIncome', base: inputs.borrowerIncome, range: [-10000, -5000, 0, 5000, 10000] },
    { name: 'Credit Score', field: 'borrowerCreditScore', base: inputs.borrowerCreditScore, range: [-50, -25, 0, 25, 50] },
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const testInputs = { ...inputs };
      if (variable.field === 'interestRate') {
        testInputs.interestRate = variable.base + change;
      } else if (variable.field === 'borrowerIncome') {
        testInputs.borrowerIncome = variable.base + change;
      } else if (variable.field === 'borrowerCreditScore') {
        testInputs.borrowerCreditScore = variable.base + change;
      }
      
      const testResults = calculateMortgageQualification(testInputs);
      return testResults.qualificationScore;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts,
    };
  });
}

function generateScenarioAnalysis(inputs: MortgageQualificationInputs, qualificationScore: number): any[] {
  const scenarios = [
    {
      scenario: 'Conservative',
      probability: 0.25,
      incomeChange: -0.1,
      rateChange: 0.5,
      creditChange: -20
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      incomeChange: 0,
      rateChange: 0,
      creditChange: 0
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      incomeChange: 0.1,
      rateChange: -0.25,
      creditChange: 20
    }
  ];
  
  return scenarios.map(scenario => {
    const testInputs = { ...inputs };
    testInputs.borrowerIncome *= (1 + scenario.incomeChange);
    testInputs.interestRate += scenario.rateChange;
    testInputs.borrowerCreditScore += scenario.creditChange;
    
    const testResults = calculateMortgageQualification(testInputs);
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability,
      qualificationStatus: testResults.qualificationStatus,
      maxLoan: testResults.maxAffordableLoan,
      qualificationScore: testResults.qualificationScore
    };
  });
}

function generateTimelineAnalysis(inputs: MortgageQualificationInputs, qualificationScore: number): any[] {
  const timeline = [];
  const startDate = new Date();
  
  for (let i = 1; i <= 12; i++) { // 12 months
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);
    
    // Simulate potential changes over time
    const incomeGrowth = inputs.marketGrowthRate / 12;
    const newIncome = (inputs.borrowerIncome + inputs.coBorrowerIncome) * Math.pow(1 + incomeGrowth / 100, i);
    const newDTI = ((calculateMonthlyDebtPayments(inputs) + calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm)) / (newIncome / 12)) * 100;
    
    timeline.push({
      month: i,
      date: paymentDate.toISOString().split('T')[0],
      income: newIncome,
      debt: calculateMonthlyDebtPayments(inputs),
      ratio: newDTI,
      status: newDTI <= inputs.maxDebtToIncomeRatio ? 'Qualified' : 'At Risk'
    });
  }
  
  return timeline;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}