interface CashOutRefinanceMetrics {
  currentEquity: number;
  newMonthlyPayment: number;
  paymentDifference: number;
  netCashReceived: number;
  newLoanToValue: number;
  totalInterestPaid: number;
  breakEvenMonths: number;
  monthlySavings: number;
  annualSavings: number;
  investmentOpportunity: number;
  afterTaxCost: number;
}

interface RefinanceAnalysis {
  refinanceGrade: string;
  riskAssessment: string;
  recommendations: string;
}

/**
 * Calculate comprehensive cash-out refinance metrics
 */
export function calculateCashOutRefinance(inputs: Record<string, any>): CashOutRefinanceMetrics {
  const {
    currentHomeValue,
    currentLoanBalance,
    currentInterestRate,
    currentMonthlyPayment,
    currentLoanTerm,
    newLoanAmount,
    newInterestRate,
    newLoanTerm,
    closingCosts = 0,
    cashOutAmount = 0,
    propertyTax = 0,
    insurance = 0,
    pmi = 0,
    hoaFees = 0,
    investmentReturn = 7.0,
    taxRate = 22.0
  } = inputs;

  // Calculate current equity
  const currentEquity = currentHomeValue - currentLoanBalance;

  // Calculate new monthly payment
  const monthlyInterestRate = newInterestRate / 100 / 12;
  const totalPayments = newLoanTerm * 12;
  const newMonthlyPayment = newLoanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Calculate payment difference
  const paymentDifference = newMonthlyPayment - currentMonthlyPayment;

  // Calculate net cash received
  const netCashReceived = cashOutAmount - closingCosts;

  // Calculate new loan-to-value ratio
  const newLoanToValue = (newLoanAmount / currentHomeValue) * 100;

  // Calculate total interest paid over new loan term
  const totalPaymentsValue = newMonthlyPayment * totalPayments;
  const totalInterestPaid = totalPaymentsValue - newLoanAmount;

  // Calculate break-even analysis
  const monthlySavings = Math.max(0, currentMonthlyPayment - newMonthlyPayment);
  const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : 0;

  // Calculate annual savings
  const annualSavings = monthlySavings * 12;

  // Calculate investment opportunity
  const investmentOpportunity = netCashReceived * (investmentReturn / 100);

  // Calculate after-tax cost
  const monthlyInterestPayment = newMonthlyPayment - (newLoanAmount / totalPayments);
  const taxSavings = monthlyInterestPayment * (taxRate / 100);
  const afterTaxCost = newMonthlyPayment - taxSavings;

  return {
    currentEquity,
    newMonthlyPayment,
    paymentDifference,
    netCashReceived,
    newLoanToValue,
    totalInterestPaid,
    breakEvenMonths,
    monthlySavings,
    annualSavings,
    investmentOpportunity,
    afterTaxCost
  };
}

/**
 * Generate comprehensive refinance analysis
 */
export function generateRefinanceAnalysis(inputs: Record<string, any>, refinanceMetrics: CashOutRefinanceMetrics): RefinanceAnalysis {
  const refinanceGrade = generateRefinanceGrade(inputs, refinanceMetrics);
  const riskAssessment = generateRiskAssessment(inputs, refinanceMetrics);
  const recommendations = generateRecommendations(inputs, refinanceMetrics);

  return {
    refinanceGrade,
    riskAssessment,
    recommendations
  };
}

/**
 * Generate refinance grade assessment
 */
function generateRefinanceGrade(inputs: Record<string, any>, refinanceMetrics: CashOutRefinanceMetrics): string {
  const { monthlySavings, breakEvenMonths, newLoanToValue, paymentDifference } = refinanceMetrics;
  const { newInterestRate, currentInterestRate } = inputs;

  let grade = '';

  // Rate reduction assessment
  if (newInterestRate < currentInterestRate) {
    if (monthlySavings > 100) {
      grade = 'A+ - Excellent refinance with significant rate reduction and savings';
    } else if (monthlySavings > 50) {
      grade = 'A - Good refinance with rate reduction and savings';
    } else {
      grade = 'B+ - Rate reduction but minimal savings';
    }
  } else if (newInterestRate <= currentInterestRate + 0.5) {
    if (refinanceMetrics.netCashReceived > 50000) {
      grade = 'B - Acceptable refinance for cash-out needs';
    } else {
      grade = 'C+ - Higher rate but provides cash access';
    }
  } else {
    grade = 'C - Higher rate refinance, consider alternatives';
  }

  // Break-even assessment
  if (breakEvenMonths > 0 && breakEvenMonths < 24) {
    grade += ' (Fast break-even)';
  } else if (breakEvenMonths > 60) {
    grade += ' (Long break-even period)';
  }

  // Loan-to-value assessment
  if (newLoanToValue <= 70) {
    grade += ' (Low LTV)';
  } else if (newLoanToValue > 85) {
    grade += ' (High LTV)';
  }

  // Cash-out assessment
  if (refinanceMetrics.netCashReceived > 100000) {
    grade += ' (Large cash-out)';
  } else if (refinanceMetrics.netCashReceived > 0) {
    grade += ' (Moderate cash-out)';
  }

  return grade;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, refinanceMetrics: CashOutRefinanceMetrics): string {
  const risks: string[] = [];

  // Payment increase risk
  if (refinanceMetrics.paymentDifference > 0) {
    risks.push('Higher monthly payment increases financial burden');
  }

  // Loan-to-value risk
  if (refinanceMetrics.newLoanToValue > 80) {
    risks.push('High loan-to-value ratio increases default risk');
  }

  // Interest rate risk
  if (inputs.newInterestRate > inputs.currentInterestRate + 1) {
    risks.push('Significantly higher interest rate increases total cost');
  }

  // Break-even risk
  if (refinanceMetrics.breakEvenMonths > 60) {
    risks.push('Long break-even period increases risk of not recouping costs');
  }

  // Cash-out risk
  if (refinanceMetrics.netCashReceived > 100000) {
    risks.push('Large cash-out amount increases total debt burden');
  }

  // Market risk
  if (refinanceMetrics.newLoanToValue > 85) {
    risks.push('High LTV makes property vulnerable to market declines');
  }

  // Investment risk
  if (inputs.investmentReturn > 10) {
    risks.push('High expected investment return may be unrealistic');
  }

  // Term extension risk
  if (inputs.newLoanTerm > inputs.currentLoanTerm + 5) {
    risks.push('Significantly longer loan term increases total interest paid');
  }

  if (risks.length === 0) {
    risks.push('Standard refinance risks apply');
  }

  return `Risk Assessment: ${risks.join(', ')}. Monitor interest rates, property values, and financial goals.`;
}

/**
 * Generate refinance recommendations
 */
function generateRecommendations(inputs: Record<string, any>, refinanceMetrics: CashOutRefinanceMetrics): string {
  const recommendations: string[] = [];

  // Rate reduction recommendations
  if (inputs.newInterestRate < inputs.currentInterestRate) {
    if (refinanceMetrics.monthlySavings > 100) {
      recommendations.push('Strong rate reduction - proceed with refinance');
    } else {
      recommendations.push('Consider if rate reduction justifies closing costs');
    }
  }

  // Break-even recommendations
  if (refinanceMetrics.breakEvenMonths > 0 && refinanceMetrics.breakEvenMonths < 24) {
    recommendations.push('Fast break-even period makes refinance attractive');
  } else if (refinanceMetrics.breakEvenMonths > 60) {
    recommendations.push('Consider alternatives due to long break-even period');
  }

  // Cash-out recommendations
  if (refinanceMetrics.netCashReceived > 0) {
    if (refinanceMetrics.netCashReceived > 100000) {
      recommendations.push('Large cash-out - ensure funds are used wisely');
    } else {
      recommendations.push('Moderate cash-out - consider investment opportunities');
    }
  }

  // Loan-to-value recommendations
  if (refinanceMetrics.newLoanToValue > 80) {
    recommendations.push('High LTV - consider additional principal payments');
  } else if (refinanceMetrics.newLoanToValue <= 70) {
    recommendations.push('Low LTV provides good equity cushion');
  }

  // Investment recommendations
  if (refinanceMetrics.investmentOpportunity > refinanceMetrics.paymentDifference * 12) {
    recommendations.push('Investment opportunity exceeds payment increase');
  }

  // Term recommendations
  if (inputs.newLoanTerm > inputs.currentLoanTerm + 5) {
    recommendations.push('Consider shorter term to reduce total interest');
  }

  // Alternative recommendations
  if (inputs.newInterestRate > inputs.currentInterestRate + 1) {
    recommendations.push('Consider home equity loan or HELOC as alternatives');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring interest rates and market conditions');
    recommendations.push('Consult with mortgage professional for personalized advice');
  }

  return `Recommendations: ${recommendations.join('. ')}. Regular review of financial goals recommended.`;
}
