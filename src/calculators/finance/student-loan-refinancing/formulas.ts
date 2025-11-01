import { StudentLoanRefinancingInputs, StudentLoanRefinancingOutputs, StudentLoanRefinancingMetrics, StudentLoanRefinancingAnalysis } from './types';

// Calculate new monthly payment for refinanced loan
export function calculateNewMonthlyPayment(
  loanBalance: number,
  newInterestRate: number,
  newTermMonths: number
): number {
  const monthlyRate = newInterestRate / 100 / 12;
  if (monthlyRate === 0) return loanBalance / newTermMonths;
  return loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, newTermMonths)) /
         (Math.pow(1 + monthlyRate, newTermMonths) - 1);
}

// Calculate total interest paid over the life of the loan
export function calculateTotalInterest(
  loanBalance: number,
  monthlyPayment: number,
  termMonths: number
): number {
  return (monthlyPayment * termMonths) - loanBalance;
}

// Calculate break-even point in months
export function calculateBreakEvenMonths(
  currentMonthlyPayment: number,
  newMonthlyPayment: number,
  closingCosts: number
): number {
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  if (monthlySavings <= 0) return Infinity;
  return Math.ceil(closingCosts / monthlySavings);
}

// Calculate eligibility score based on credit and income factors
export function calculateEligibilityScore(inputs: StudentLoanRefinancingInputs): number {
  let score = 0;

  // Credit score component (0-40 points)
  if (inputs.creditScore >= 750) score += 40;
  else if (inputs.creditScore >= 700) score += 30;
  else if (inputs.creditScore >= 650) score += 20;
  else if (inputs.creditScore >= 600) score += 10;

  // Cosigner boost
  if (inputs.cosignerAvailable && inputs.cosignerCreditScore) {
    if (inputs.cosignerCreditScore >= 750) score += 10;
    else if (inputs.cosignerCreditScore >= 700) score += 5;
  }

  // Income stability (0-30 points)
  if (inputs.employmentStatus === 'employed') score += 30;
  else if (inputs.employmentStatus === 'self_employed') score += 20;
  else if (inputs.employmentStatus === 'retired') score += 15;

  // DTI ratio (0-30 points)
  if (inputs.debtToIncomeRatio <= 36) score += 30;
  else if (inputs.debtToIncomeRatio <= 43) score += 20;
  else if (inputs.debtToIncomeRatio <= 50) score += 10;

  return Math.min(score, 100);
}

// Assess refinance risk level
export function assessRefinanceRisk(inputs: StudentLoanRefinancingInputs): 'Low' | 'Medium' | 'High' {
  let riskScore = 0;

  if (inputs.creditScore < 650) riskScore += 3;
  if (inputs.debtToIncomeRatio > 43) riskScore += 2;
  if (inputs.employmentStatus === 'unemployed') riskScore += 3;
  if (!inputs.cosignerAvailable && inputs.creditScore < 700) riskScore += 2;
  if (inputs.loanType === 'private') riskScore += 1;

  if (riskScore >= 5) return 'High';
  if (riskScore >= 3) return 'Medium';
  return 'Low';
}

// Main calculation function
export function calculateStudentLoanRefinancing(inputs: StudentLoanRefinancingInputs): StudentLoanRefinancingOutputs {
  const targetRate = inputs.targetInterestRate || Math.max(3.5, inputs.currentInterestRate - 2);
  const targetTermMonths = (inputs.targetTermYears || inputs.remainingTermMonths / 12) * 12;

  const newMonthlyPayment = calculateNewMonthlyPayment(
    inputs.currentLoanBalance,
    targetRate,
    targetTermMonths
  );

  const currentTotalInterest = calculateTotalInterest(
    inputs.currentLoanBalance,
    inputs.currentMonthlyPayment,
    inputs.remainingTermMonths
  );

  const newTotalInterest = calculateTotalInterest(
    inputs.currentLoanBalance,
    newMonthlyPayment,
    targetTermMonths
  );

  const totalInterestSaved = currentTotalInterest - newTotalInterest;
  const totalSavings = (inputs.currentMonthlyPayment - newMonthlyPayment) * Math.min(inputs.remainingTermMonths, targetTermMonths) - (inputs.closingCosts || 0);

  const breakEvenMonths = calculateBreakEvenMonths(
    inputs.currentMonthlyPayment,
    newMonthlyPayment,
    inputs.closingCosts || 0
  );

  const newTotalPayments = newMonthlyPayment * targetTermMonths;
  const eligibilityScore = calculateEligibilityScore(inputs);
  const riskAssessment = assessRefinanceRisk(inputs);

  const monthlyIncome = inputs.monthlyIncome || inputs.annualIncome / 12;
  const paymentToIncomeRatio = (newMonthlyPayment / monthlyIncome) * 100;

  const monthlyDebts = inputs.monthlyDebts || (inputs.annualIncome * inputs.debtToIncomeRatio / 100 / 12);
  const newDTI = ((monthlyDebts - inputs.currentMonthlyPayment + newMonthlyPayment) / monthlyIncome) * 100;

  const recommendedRefinance = totalSavings > 0 && breakEvenMonths < Math.min(inputs.remainingTermMonths, targetTermMonths) && eligibilityScore >= 60;

  return {
    newMonthlyPayment,
    totalSavings,
    breakEvenMonths,
    totalInterestSaved,
    newTotalPayments,
    newTotalInterest,
    paymentToIncomeRatio,
    debtToIncomeRatio: newDTI,
    eligibilityScore,
    recommendedRefinance,
    riskAssessment
  };
}

// Generate analysis and recommendations
export function generateStudentLoanRefinancingAnalysis(
  inputs: StudentLoanRefinancingInputs,
  outputs: StudentLoanRefinancingOutputs
): StudentLoanRefinancingAnalysis {
  let recommendation = '';
  let riskLevel: 'Low' | 'Medium' | 'High' = outputs.riskAssessment;

  if (outputs.recommendedRefinance) {
    recommendation = `Refinancing recommended. You could save $${outputs.totalSavings.toFixed(2)} over the life of the loan with a break-even period of ${outputs.breakEvenMonths} months.`;
  } else if (outputs.totalSavings <= 0) {
    recommendation = 'Refinancing not recommended. The costs outweigh the potential savings.';
  } else if (outputs.breakEvenMonths >= inputs.remainingTermMonths) {
    recommendation = 'Refinancing not recommended. Break-even period exceeds remaining loan term.';
  } else {
    recommendation = 'Consider waiting for better rates or improving credit score before refinancing.';
  }

  if (outputs.eligibilityScore < 60) {
    recommendation += ' Consider getting a cosigner or improving credit score to qualify for better rates.';
  }

  return { recommendation, riskLevel };
}

// Calculate result for metrics
export function calculateResult(inputs: StudentLoanRefinancingInputs): number {
  const outputs = calculateStudentLoanRefinancing(inputs);
  return outputs.totalSavings;
}

// Generate metrics
export function generateMetrics(inputs: StudentLoanRefinancingInputs): StudentLoanRefinancingMetrics {
  return {
    result: calculateResult(inputs)
  };
}

// Generate analysis
export function generateAnalysis(inputs: StudentLoanRefinancingInputs): StudentLoanRefinancingAnalysis {
  const outputs = calculateStudentLoanRefinancing(inputs);
  return generateStudentLoanRefinancingAnalysis(inputs, outputs);
}