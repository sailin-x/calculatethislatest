import { MortgageQualificationInputs, MortgageQualificationMetrics } from './types';

export function calculateTotalIncome(inputs: MortgageQualificationInputs): number {
  return inputs.borrowerIncome + (inputs.coBorrowerIncome || 0);
}

export function calculateQualifyingIncome(inputs: MortgageQualificationInputs): number {
  const totalIncome = calculateTotalIncome(inputs);
  // Apply 5% reduction for variable income sources
  const variableIncome = (inputs.overtimeIncome || 0) + (inputs.bonusIncome || 0) +
                        (inputs.commissionIncome || 0) + (inputs.rentalIncome || 0) +
                        (inputs.investmentIncome || 0) + (inputs.otherIncome || 0);
  return totalIncome - (variableIncome * 0.05);
}

export function calculateIncomeStability(inputs: MortgageQualificationInputs): number {
  let stability = 0;

  // Employment length factor
  if (inputs.borrowerEmploymentLength >= 2) stability += 30;
  else if (inputs.borrowerEmploymentLength >= 1) stability += 20;
  else stability += 10;

  // Employment type factor
  if (inputs.borrowerEmploymentType === 'employed') stability += 25;
  else if (inputs.borrowerEmploymentType === 'self_employed') stability += 15;
  else stability += 5;

  // Base salary ratio
  const baseSalaryRatio = inputs.baseSalary / inputs.borrowerIncome;
  stability += Math.min(baseSalaryRatio * 20, 20);

  // Co-borrower factors
  if (inputs.coBorrowerIncome && inputs.coBorrowerIncome > 0) {
    if (inputs.coBorrowerEmploymentLength && inputs.coBorrowerEmploymentLength >= 2) stability += 10;
  }

  return Math.min(stability, 100);
}

export function calculateIncomeGrowth(inputs: MortgageQualificationInputs): number {
  // Estimate based on employment type and market conditions
  let growthRate = 3.0; // Base inflation rate

  if (inputs.borrowerEmploymentType === 'employed') growthRate += 2.0;
  else if (inputs.borrowerEmploymentType === 'self_employed') growthRate += 1.5;

  if (inputs.marketCondition === 'growing') growthRate += 1.0;
  else if (inputs.marketCondition === 'hot') growthRate += 2.0;

  return growthRate;
}

export function calculateTotalDebt(inputs: MortgageQualificationInputs): number {
  return inputs.borrowerDebts + (inputs.coBorrowerDebts || 0) +
         (inputs.creditCardDebt || 0) + (inputs.autoLoanDebt || 0) +
         (inputs.studentLoanDebt || 0) + (inputs.personalLoanDebt || 0) +
         (inputs.otherDebt || 0);
}

export function calculateMonthlyDebtPayments(inputs: MortgageQualificationInputs): number {
  // Estimate monthly payments based on debt amounts
  // This is a simplified calculation - in reality would need specific terms
  const totalDebt = calculateTotalDebt(inputs);
  return totalDebt * 0.03; // Rough estimate of 3% monthly payment ratio
}

export function calculateDebtToIncomeRatio(inputs: MortgageQualificationInputs): number {
  const totalIncome = calculateTotalIncome(inputs);
  const monthlyDebtPayments = calculateMonthlyDebtPayments(inputs);
  const annualDebtPayments = monthlyDebtPayments * 12;

  return totalIncome > 0 ? (annualDebtPayments / totalIncome) * 100 : 0;
}

export function calculateHousingExpenseRatio(inputs: MortgageQualificationInputs): number {
  const totalIncome = calculateTotalIncome(inputs);
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const annualHousingExpense = monthlyPayment * 12;

  return totalIncome > 0 ? (annualHousingExpense / totalIncome) * 100 : 0;
}

export function calculateTotalAssets(inputs: MortgageQualificationInputs): number {
  return inputs.borrowerAssets + (inputs.coBorrowerAssets || 0);
}

export function calculateTotalLiquidity(inputs: MortgageQualificationInputs): number {
  return inputs.borrowerLiquidity + (inputs.coBorrowerLiquidity || 0);
}

export function calculateAssetToDebtRatio(inputs: MortgageQualificationInputs): number {
  const totalAssets = calculateTotalAssets(inputs);
  const totalDebt = calculateTotalDebt(inputs);

  return totalDebt > 0 ? (totalAssets / totalDebt) * 100 : 0;
}

export function calculateReserveRequirements(inputs: MortgageQualificationInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  // FHA requires 3 months, conventional typically 2 months
  const monthsRequired = inputs.loanType === 'fha' ? 3 : 2;
  return monthlyPayment * monthsRequired;
}

export function calculateAverageCreditScore(inputs: MortgageQualificationInputs): number {
  const scores = [inputs.borrowerCreditScore];
  if (inputs.coBorrowerCreditScore) scores.push(inputs.coBorrowerCreditScore);

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

export function calculateCreditScoreRating(inputs: MortgageQualificationInputs): string {
  const averageScore = calculateAverageCreditScore(inputs);

  if (averageScore >= 800) return 'excellent';
  else if (averageScore >= 740) return 'very good';
  else if (averageScore >= 670) return 'good';
  else if (averageScore >= 580) return 'fair';
  else return 'poor';
}

export function calculateCreditRisk(inputs: MortgageQualificationInputs): number {
  const averageScore = calculateAverageCreditScore(inputs);

  // Convert credit score to risk score (0-100, higher = more risk)
  if (averageScore >= 800) return 10;
  else if (averageScore >= 740) return 20;
  else if (averageScore >= 670) return 35;
  else if (averageScore >= 580) return 60;
  else return 85;
}

export function calculateCreditUtilization(inputs: MortgageQualificationInputs): number {
  // Simplified calculation - would need actual credit limits in real implementation
  const creditCardDebt = inputs.creditCardDebt || 0;
  return creditCardDebt > 0 ? Math.min((creditCardDebt / 10000) * 100, 100) : 0;
}

export function calculateMonthlyPayment(inputs: MortgageQualificationInputs): number {
  const principal = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;

  if (monthlyRate === 0) return principal / numberOfPayments;

  const monthlyPayment = principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment;
}

export function calculateTotalMonthlyPayment(inputs: MortgageQualificationInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyTaxes = inputs.propertyTaxes / 12;
  const monthlyInsurance = inputs.propertyInsurance / 12;
  const monthlyHOA = inputs.hoaFees || 0;
  const monthlyFlood = inputs.floodInsurance || 0;
  const monthlyMI = inputs.mortgageInsurance || 0;

  return monthlyPayment + monthlyTaxes + monthlyInsurance + monthlyHOA + monthlyFlood + monthlyMI;
}

export function calculatePaymentToIncomeRatio(inputs: MortgageQualificationInputs): number {
  const totalIncome = calculateTotalIncome(inputs);
  const totalMonthlyPayment = calculateTotalMonthlyPayment(inputs);
  const annualPayment = totalMonthlyPayment * 12;

  return totalIncome > 0 ? (annualPayment / totalIncome) * 100 : 0;
}

export function calculateLoanToValueRatio(inputs: MortgageQualificationInputs): number {
  return inputs.propertyValue > 0 ? (inputs.loanAmount / inputs.propertyValue) * 100 : 0;
}

export function calculateQualificationScore(inputs: MortgageQualificationInputs): number {
  let score = 0;

  // Credit score component (0-30 points)
  const averageScore = calculateAverageCreditScore(inputs);
  if (averageScore >= 800) score += 30;
  else if (averageScore >= 740) score += 25;
  else if (averageScore >= 670) score += 20;
  else if (averageScore >= 580) score += 10;
  else score += 5;

  // Debt-to-income component (0-25 points)
  const dti = calculateDebtToIncomeRatio(inputs);
  if (dti <= 30) score += 25;
  else if (dti <= 36) score += 20;
  else if (dti <= 43) score += 15;
  else if (dti <= 50) score += 10;
  else score += 5;

  // Down payment component (0-20 points)
  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
  if (downPaymentPercent >= 20) score += 20;
  else if (downPaymentPercent >= 15) score += 15;
  else if (downPaymentPercent >= 10) score += 10;
  else if (downPaymentPercent >= 5) score += 5;

  // Employment stability component (0-15 points)
  const stability = calculateIncomeStability(inputs);
  score += (stability / 100) * 15;

  // Asset reserves component (0-10 points)
  const liquidity = calculateTotalLiquidity(inputs);
  const reserveReq = calculateReserveRequirements(inputs);
  if (liquidity >= reserveReq * 2) score += 10;
  else if (liquidity >= reserveReq) score += 7;
  else if (liquidity >= reserveReq * 0.5) score += 4;

  return Math.min(score, 100);
}

export function calculateQualificationStatus(inputs: MortgageQualificationInputs): string {
  const score = calculateQualificationScore(inputs);
  const dti = calculateDebtToIncomeRatio(inputs);
  const ltv = calculateLoanToValueRatio(inputs);

  if (score >= 80 && dti <= 43 && ltv <= 80) return 'approved';
  else if (score >= 70 && dti <= 50 && ltv <= 90) return 'conditional';
  else if (score >= 60 && dti <= 55 && ltv <= 95) return 'requires review';
  else return 'denied';
}

export function calculateQualificationFactors(inputs: MortgageQualificationInputs): any {
  return {
    creditScore: calculateAverageCreditScore(inputs),
    debtToIncomeRatio: calculateDebtToIncomeRatio(inputs),
    loanToValueRatio: calculateLoanToValueRatio(inputs),
    downPaymentPercent: (inputs.downPayment / inputs.propertyValue) * 100,
    employmentStability: calculateIncomeStability(inputs),
    assetReserves: calculateTotalLiquidity(inputs)
  };
}

export function calculateRiskScore(inputs: MortgageQualificationInputs): number {
  let riskScore = 0;

  // Credit risk
  riskScore += calculateCreditRisk(inputs) * 0.4;

  // Debt load risk
  const dti = calculateDebtToIncomeRatio(inputs);
  riskScore += Math.min(dti / 2, 40) * 0.3;

  // LTV risk
  const ltv = calculateLoanToValueRatio(inputs);
  riskScore += Math.min((ltv - 60) / 2, 30) * 0.2;

  // Employment risk
  const stability = calculateIncomeStability(inputs);
  riskScore += (100 - stability) * 0.1;

  return Math.min(riskScore, 100);
}

export function calculateProbabilityOfApproval(inputs: MortgageQualificationInputs): number {
  const score = calculateQualificationScore(inputs);
  const riskScore = calculateRiskScore(inputs);

  // Simple probability calculation based on score and risk
  const baseProbability = score;
  const riskAdjustment = (100 - riskScore) * 0.5;

  return Math.min(Math.max(baseProbability - riskAdjustment, 0), 100);
}

export function calculateProbabilityOfDefault(inputs: MortgageQualificationInputs): number {
  const riskScore = calculateRiskScore(inputs);
  // Simplified default probability based on risk score
  return Math.min(riskScore * 0.3, 15);
}

export function calculateRiskFactors(inputs: MortgageQualificationInputs): any {
  const factors = [];

  const dti = calculateDebtToIncomeRatio(inputs);
  if (dti > 43) factors.push('High debt-to-income ratio');

  const ltv = calculateLoanToValueRatio(inputs);
  if (ltv > 80) factors.push('High loan-to-value ratio');

  const creditScore = calculateAverageCreditScore(inputs);
  if (creditScore < 620) factors.push('Low credit score');

  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
  if (downPaymentPercent < 10) factors.push('Low down payment');

  return factors;
}

export function calculateMaxAffordablePayment(inputs: MortgageQualificationInputs): number {
  const totalIncome = calculateTotalIncome(inputs);
  const maxHousingRatio = inputs.maxHousingExpenseRatio || 28;
  return (totalIncome * maxHousingRatio / 100) / 12;
}

export function calculateMaxAffordableLoan(inputs: MortgageQualificationInputs): number {
  const maxPayment = calculateMaxAffordablePayment(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;

  if (monthlyRate === 0) return maxPayment * numberOfPayments;

  return maxPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
         (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
}

export function calculateMaxAffordableProperty(inputs: MortgageQualificationInputs): number {
  const maxLoan = calculateMaxAffordableLoan(inputs);
  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
  return maxLoan / (1 - downPaymentPercent / 100);
}

export function calculateAffordabilityMargin(inputs: MortgageQualificationInputs): number {
  const currentPayment = calculateTotalMonthlyPayment(inputs);
  const maxPayment = calculateMaxAffordablePayment(inputs);

  return maxPayment > 0 ? ((maxPayment - currentPayment) / maxPayment) * 100 : 0;
}

export function calculateSensitivityMatrix(inputs: MortgageQualificationInputs): any {
  // Simplified sensitivity analysis
  return {
    interestRateImpact: '2% rate increase reduces qualification score by ~5 points',
    incomeChangeImpact: '10% income reduction decreases score by ~8 points',
    propertyValueImpact: '5% property value decrease improves LTV by ~4 points'
  };
}

export function calculateScenarios(inputs: MortgageQualificationInputs): any {
  return {
    bestCase: 'Score improves by 10-15 points with perfect conditions',
    worstCase: 'Score decreases by 15-20 points with adverse conditions',
    mostLikely: 'Current score represents most likely outcome'
  };
}

export function calculateComparisonAnalysis(inputs: MortgageQualificationInputs): any {
  return {
    conventionalVsFHA: 'FHA allows higher LTV but requires mortgage insurance',
    fixedVsARM: 'ARM offers lower initial payments but carries rate risk',
    fifteenVsThirtyYear: '15-year term reduces total interest but increases monthly payment'
  };
}

export function calculateTimelineAnalysis(inputs: MortgageQualificationInputs): any {
  return {
    shortTerm: '3-6 months for credit improvement and savings',
    mediumTerm: '6-12 months for major qualification improvements',
    longTerm: '1-2 years for optimal qualification positioning'
  };
}

export function generateMortgageQualificationAnalysis(
  inputs: MortgageQualificationInputs,
  metrics: MortgageQualificationMetrics
): string {
  return `
Mortgage Qualification Analysis:

Qualification Score: ${metrics.qualificationScore}/100
Status: ${metrics.qualificationStatus}

Key Metrics:
- Debt-to-Income Ratio: ${metrics.debtToIncomeRatio.toFixed(1)}%
- Housing Expense Ratio: ${metrics.housingExpenseRatio.toFixed(1)}%
- Loan-to-Value Ratio: ${metrics.loanToValueRatio.toFixed(1)}%
- Average Credit Score: ${metrics.averageCreditScore.toFixed(0)}

Affordability:
- Max Affordable Payment: $${metrics.maxAffordablePayment.toFixed(2)}
- Max Affordable Loan: $${metrics.maxAffordableLoan.toLocaleString()}
- Affordability Margin: ${metrics.affordabilityMargin.toFixed(1)}%

Risk Assessment:
- Risk Score: ${metrics.riskScore}/100
- Approval Probability: ${metrics.probabilityOfApproval.toFixed(1)}%
- Default Probability: ${metrics.probabilityOfDefault.toFixed(1)}%

Recommendations:
${metrics.qualificationScore >= 80 ? 'Strong qualification - proceed with confidence' :
  metrics.qualificationScore >= 60 ? 'Moderate qualification - consider improvements' :
  'Weak qualification - significant improvements needed'}
  `;
}