import { InterestOnlyMortgageInputs, InterestOnlyMortgageOutputs, PaymentScheduleEntry } from './types';

export function calculateInterestOnlyMortgage(inputs: InterestOnlyMortgageInputs): InterestOnlyMortgageOutputs {
  // Calculate interest-only payment
  const monthlyRate = inputs.interestRate / 12;
  const interestOnlyPayment = inputs.loanAmount * monthlyRate;
  
  // Calculate principal and interest payment after interest-only period
  const remainingTerm = inputs.totalLoanTerm - inputs.interestOnlyPeriod;
  const totalPayments = remainingTerm * 12;
  const principalAndInterestPayment = inputs.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate total monthly payment
  const monthlyPropertyTaxes = inputs.propertyTaxes / 12;
  const monthlyInsurance = inputs.homeownersInsurance / 12;
  const monthlyPMI = inputs.privateMortgageInsurance / 12;
  const monthlyHOA = inputs.hoaFees / 12;
  const monthlyOtherExpenses = inputs.otherMonthlyExpenses / 12;
  
  const totalMonthlyPayment = interestOnlyPayment + monthlyPropertyTaxes + 
                             monthlyInsurance + monthlyPMI + monthlyHOA + monthlyOtherExpenses;
  
  // Calculate interest-only period analysis
  const interestOnlyPeriodPayments = inputs.interestOnlyPeriod * 12;
  const totalInterestPaidDuringIO = interestOnlyPayment * interestOnlyPeriodPayments;
  const remainingBalanceAfterIO = inputs.loanAmount; // No principal paid during IO period
  
  // Calculate full loan analysis
  const totalInterestPaid = calculateTotalInterestPaid(inputs);
  const totalPrincipalPaid = inputs.loanAmount;
  const totalPayments = totalInterestPaid + totalPrincipalPaid;
  const loanPayoffDate = calculateLoanPayoffDate(inputs);
  
  // Generate payment schedule
  const paymentSchedule = generatePaymentSchedule(inputs);
  
  // Comparison analysis
  const traditionalMortgageComparison = calculateTraditionalMortgageComparison(inputs);
  
  // Investment analysis
  const investmentAnalysis = calculateInvestmentAnalysis(inputs, traditionalMortgageComparison);
  
  // Risk analysis
  const riskFactors = identifyRiskFactors(inputs);
  const riskMitigationStrategies = generateRiskMitigationStrategies(inputs);
  
  // Refinancing analysis
  const refinancingAnalysis = calculateRefinancingAnalysis(inputs);
  
  // Tax implications
  const taxImplications = calculateTaxImplications(inputs, totalInterestPaid);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, investmentAnalysis, riskFactors);
  
  // Summary
  const summary = {
    totalLoanCost: totalPayments,
    monthlyPayment: totalMonthlyPayment,
    keyBenefits: [
      'Lower initial monthly payments',
      'Increased cash flow during interest-only period',
      'Potential for higher investment returns',
      'Tax deduction benefits'
    ],
    keyRisks: riskFactors.slice(0, 3),
    nextSteps: [
      'Evaluate investment opportunities for saved cash',
      'Plan for higher payments after interest-only period',
      'Consider refinancing options',
      'Monitor property value and market conditions'
    ]
  };
  
  return {
    interestOnlyPayment,
    principalAndInterestPayment,
    totalMonthlyPayment,
    totalAnnualPayment: totalMonthlyPayment * 12,
    interestOnlyPeriodPayments,
    totalInterestPaidDuringIO,
    remainingBalanceAfterIO,
    totalInterestPaid,
    totalPrincipalPaid,
    totalPayments,
    loanPayoffDate,
    paymentSchedule,
    traditionalMortgageComparison,
    investmentAnalysis,
    riskFactors,
    riskMitigationStrategies,
    refinancingAnalysis,
    taxImplications,
    recommendations,
    summary
  };
}

function calculateTotalInterestPaid(inputs: InterestOnlyMortgageInputs): number {
  const monthlyRate = inputs.interestRate / 12;
  
  // Interest paid during interest-only period
  const interestOnlyInterest = inputs.loanAmount * monthlyRate * inputs.interestOnlyPeriod * 12;
  
  // Interest paid during principal and interest period
  const remainingTerm = inputs.totalLoanTerm - inputs.interestOnlyPeriod;
  const totalPayments = remainingTerm * 12;
  const monthlyPayment = inputs.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const principalAndInterestInterest = (monthlyPayment * totalPayments) - inputs.loanAmount;
  
  return interestOnlyInterest + principalAndInterestInterest;
}

function calculateLoanPayoffDate(inputs: InterestOnlyMortgageInputs): string {
  const startDate = new Date();
  const payoffDate = new Date(startDate);
  payoffDate.setFullYear(payoffDate.getFullYear() + inputs.totalLoanTerm);
  return payoffDate.toISOString().split('T')[0];
}

function generatePaymentSchedule(inputs: InterestOnlyMortgageInputs): PaymentScheduleEntry[] {
  const schedule: PaymentScheduleEntry[] = [];
  const monthlyRate = inputs.interestRate / 12;
  const totalMonths = inputs.totalLoanTerm * 12;
  const interestOnlyMonths = inputs.interestOnlyPeriod * 12;
  
  let remainingBalance = inputs.loanAmount;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    const paymentDate = new Date();
    paymentDate.setMonth(paymentDate.getMonth() + month);
    
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = 0;
    
    if (month > interestOnlyMonths) {
      // Calculate P&I payment for remaining term
      const remainingTerm = totalMonths - month + 1;
      const monthlyPayment = remainingBalance * 
        (monthlyRate * Math.pow(1 + monthlyRate, remainingTerm)) / 
        (Math.pow(1 + monthlyRate, remainingTerm) - 1);
      principalPayment = monthlyPayment - interestPayment;
    }
    
    const totalPayment = interestPayment + principalPayment;
    remainingBalance -= principalPayment;
    cumulativeInterest += interestPayment;
    cumulativePrincipal += principalPayment;
    
    schedule.push({
      paymentNumber: month,
      paymentDate: paymentDate.toISOString().split('T')[0],
      interestPayment,
      principalPayment,
      totalPayment,
      remainingBalance,
      cumulativeInterest,
      cumulativePrincipal
    });
  }
  
  return schedule;
}

function calculateTraditionalMortgageComparison(inputs: InterestOnlyMortgageInputs): {
  traditionalPayment: number;
  interestOnlyPayment: number;
  paymentDifference: number;
  totalInterestDifference: number;
  breakEvenPoint: number;
} {
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.totalLoanTerm * 12;
  
  // Traditional mortgage payment
  const traditionalPayment = inputs.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Interest-only payment
  const interestOnlyPayment = inputs.loanAmount * monthlyRate;
  
  const paymentDifference = traditionalPayment - interestOnlyPayment;
  
  // Calculate total interest for traditional mortgage
  const traditionalTotalInterest = (traditionalPayment * totalPayments) - inputs.loanAmount;
  const interestOnlyTotalInterest = calculateTotalInterestPaid(inputs);
  const totalInterestDifference = interestOnlyTotalInterest - traditionalTotalInterest;
  
  // Break-even point (simplified calculation)
  const breakEvenPoint = Math.ceil(totalInterestDifference / paymentDifference);
  
  return {
    traditionalPayment,
    interestOnlyPayment,
    paymentDifference,
    totalInterestDifference,
    breakEvenPoint
  };
}

function calculateInvestmentAnalysis(inputs: InterestOnlyMortgageInputs, comparison: any): {
  monthlySavings: number;
  annualSavings: number;
  totalSavingsOverIO: number;
  potentialInvestmentReturn: number;
  netBenefit: number;
} {
  const monthlySavings = comparison.paymentDifference;
  const annualSavings = monthlySavings * 12;
  const totalSavingsOverIO = annualSavings * inputs.interestOnlyPeriod;
  
  // Calculate potential investment return
  const potentialInvestmentReturn = totalSavingsOverIO * (inputs.opportunityCost / 100);
  
  // Net benefit = investment return - additional interest cost
  const netBenefit = potentialInvestmentReturn - comparison.totalInterestDifference;
  
  return {
    monthlySavings,
    annualSavings,
    totalSavingsOverIO,
    potentialInvestmentReturn,
    netBenefit
  };
}

function identifyRiskFactors(inputs: InterestOnlyMortgageInputs): string[] {
  const factors: string[] = [];
  
  if (inputs.loanType === 'adjustable') {
    factors.push('Interest rate risk with adjustable rate');
  }
  
  if (inputs.interestOnlyPeriod > 10) {
    factors.push('Long interest-only period increases risk');
  }
  
  if (inputs.debtToIncomeRatio > 0.4) {
    factors.push('High debt-to-income ratio');
  }
  
  if (inputs.loanToValueRatio > 0.8) {
    factors.push('High loan-to-value ratio');
  }
  
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    factors.push('Lower credit score may limit refinancing options');
  }
  
  if (inputs.propertyType === 'investment') {
    factors.push('Investment property may have higher rates');
  }
  
  factors.push('Payment shock when interest-only period ends');
  factors.push('No principal reduction during interest-only period');
  
  return factors;
}

function generateRiskMitigationStrategies(inputs: InterestOnlyMortgageInputs): string[] {
  const strategies: string[] = [];
  
  strategies.push('Make voluntary principal payments when possible');
  strategies.push('Build emergency fund for payment increases');
  strategies.push('Monitor interest rates for refinancing opportunities');
  strategies.push('Consider shorter interest-only period');
  
  if (inputs.loanType === 'adjustable') {
    strategies.push('Consider rate caps and conversion options');
  }
  
  if (inputs.propertyType === 'investment') {
    strategies.push('Ensure adequate rental income coverage');
  }
  
  strategies.push('Plan for higher payments after interest-only period');
  strategies.push('Consider prepayment penalties before refinancing');
  
  return strategies;
}

function calculateRefinancingAnalysis(inputs: InterestOnlyMortgageInputs): {
  shouldRefinance: boolean;
  refinancePayment: number;
  paymentReduction: number;
  breakEvenMonths: number;
  totalSavings: number;
} {
  if (!inputs.refinanceAfterInterestOnly) {
    return {
      shouldRefinance: false,
      refinancePayment: 0,
      paymentReduction: 0,
      breakEvenMonths: 0,
      totalSavings: 0
    };
  }
  
  const monthlyRate = inputs.refinanceRate / 12;
  const totalPayments = inputs.refinanceTerm * 12;
  
  const refinancePayment = inputs.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const currentPayment = inputs.loanAmount * (inputs.interestRate / 12);
  const paymentReduction = currentPayment - refinancePayment;
  
  // Simplified break-even calculation (assuming $3000 closing costs)
  const closingCosts = 3000;
  const breakEvenMonths = Math.ceil(closingCosts / paymentReduction);
  
  const totalSavings = paymentReduction * 12 * inputs.refinanceTerm - closingCosts;
  
  return {
    shouldRefinance: totalSavings > 0,
    refinancePayment,
    paymentReduction,
    breakEvenMonths,
    totalSavings
  };
}

function calculateTaxImplications(inputs: InterestOnlyMortgageInputs, totalInterestPaid: number): {
  annualInterestDeduction: number;
  estimatedTaxSavings: number;
  netAfterTaxCost: number;
} {
  const annualInterestDeduction = inputs.loanAmount * inputs.interestRate;
  
  // Assume 25% tax bracket
  const taxRate = 0.25;
  const estimatedTaxSavings = annualInterestDeduction * taxRate;
  
  const netAfterTaxCost = annualInterestDeduction - estimatedTaxSavings;
  
  return {
    annualInterestDeduction,
    estimatedTaxSavings,
    netAfterTaxCost
  };
}

function generateRecommendations(inputs: InterestOnlyMortgageInputs, investmentAnalysis: any, riskFactors: string[]): {
  suitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable';
  keyRecommendations: string[];
  riskWarnings: string[];
  optimizationTips: string[];
} {
  let suitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable' = 'suitable';
  
  if (investmentAnalysis.netBenefit < 0 || riskFactors.length > 5) {
    suitability = 'not_suitable';
  } else if (investmentAnalysis.netBenefit < 10000 || riskFactors.length > 3) {
    suitability = 'marginal';
  } else if (investmentAnalysis.netBenefit > 50000 && riskFactors.length <= 2) {
    suitability = 'highly_suitable';
  }
  
  const keyRecommendations: string[] = [];
  const riskWarnings: string[] = [];
  const optimizationTips: string[] = [];
  
  if (investmentAnalysis.netBenefit > 0) {
    keyRecommendations.push('Interest-only mortgage may be beneficial for investment purposes');
  } else {
    keyRecommendations.push('Consider traditional mortgage for lower total cost');
  }
  
  if (inputs.interestOnlyPeriod > 10) {
    riskWarnings.push('Long interest-only period increases payment shock risk');
  }
  
  if (inputs.loanType === 'adjustable') {
    riskWarnings.push('Adjustable rate increases interest rate risk');
  }
  
  optimizationTips.push('Make voluntary principal payments when cash flow allows');
  optimizationTips.push('Monitor market conditions for refinancing opportunities');
  optimizationTips.push('Invest saved cash flow in higher-return investments');
  optimizationTips.push('Build emergency fund for payment increases');
  
  return {
    suitability,
    keyRecommendations,
    riskWarnings,
    optimizationTips
  };
}
