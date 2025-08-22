import { MortgageRefinanceInputs } from './validation';

export interface RefinanceResult {
  refinanceDecision: string;
  monthlySavings: number;
  totalInterestSavings: number;
  breakEvenMonths: number;
  newMonthlyPayment: number;
  newLoanAmount: number;
  loanToValueRatio: number;
  refinanceValue: number;
  recommendations: string[];
  costBreakdown: {
    refinanceCosts: number;
    monthlySavings: number;
    totalSavings: number;
    taxSavings: number;
    investmentOpportunity: number;
    netValue: number;
  };
  amortizationComparison: {
    currentLoan: {
      remainingBalance: number;
      remainingPayments: number;
      totalInterestRemaining: number;
    };
    newLoan: {
      monthlyPayment: number;
      totalInterest: number;
      totalPayments: number;
    };
    savings: {
      monthly: number;
      total: number;
      interest: number;
    };
  };
  taxAnalysis: {
    currentInterestDeduction: number;
    newInterestDeduction: number;
    taxSavings: number;
    effectiveRate: number;
  };
  investmentAnalysis: {
    monthlyInvestmentValue: number;
    totalInvestmentValue: number;
    opportunityCost: number;
    recommendation: string;
  };
  riskAssessment: {
    rateRisk: string;
    creditRisk: string;
    propertyValueRisk: string;
    overallRisk: 'low' | 'medium' | 'high';
    considerations: string[];
  };
}

export const calculateMortgageRefinance = (inputs: MortgageRefinanceInputs): RefinanceResult => {
  const {
    currentLoanAmount,
    currentRate,
    currentTerm,
    currentMonthlyPayment,
    newRate,
    newTerm,
    refinanceCosts,
    cashOutAmount = 0,
    propertyValue,
    remainingPayments,
    taxRate = 0,
    refinanceType,
    loanType,
    creditScore,
    debtToIncomeRatio,
    includePMI = false,
    pmiRate = 0,
    includePropertyTax = true,
    propertyTax = 0,
    includeHomeInsurance = true,
    homeInsurance = 0,
    includeHOA = false,
    hoaFees = 0,
    breakEvenPeriod = 5,
    includeAmortization = true,
    includeTaxSavings = true,
    includeInvestmentComparison = true,
    investmentReturn = 7
  } = inputs;

  // Calculate new loan amount
  const newLoanAmount = currentLoanAmount + cashOutAmount;

  // Calculate monthly payments
  const currentMonthlyRate = currentRate / 100 / 12;
  const newMonthlyRate = newRate / 100 / 12;
  const newTotalPayments = newTerm * 12;

  // Calculate new monthly P&I payment
  const newMonthlyPIPayment = newLoanAmount * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalPayments)) / 
                             (Math.pow(1 + newMonthlyRate, newTotalPayments) - 1);

  // Calculate total new monthly payment
  const newMonthlyPayment = newMonthlyPIPayment +
    (includePMI ? (newLoanAmount * pmiRate / 100 / 12) : 0) +
    (includePropertyTax ? propertyTax / 12 : 0) +
    (includeHomeInsurance ? homeInsurance / 12 : 0) +
    (includeHOA ? hoaFees : 0);

  // Calculate monthly savings
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

  // Calculate total interest savings
  const currentTotalInterest = (currentMonthlyPayment * (remainingPayments || currentTerm * 12)) - currentLoanAmount;
  const newTotalInterest = (newMonthlyPIPayment * newTotalPayments) - newLoanAmount;
  const totalInterestSavings = currentTotalInterest - newTotalInterest;

  // Calculate break-even months
  const breakEvenMonths = monthlySavings > 0 ? refinanceCosts / monthlySavings : Infinity;

  // Calculate loan-to-value ratio
  const loanToValueRatio = (newLoanAmount / propertyValue) * 100;

  // Calculate refinance value
  const refinanceValue = (monthlySavings * 12 * breakEvenPeriod) - refinanceCosts;

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (monthlySavings > 0 && breakEvenMonths < 24) {
    recommendations.push('Refinancing appears favorable - break-even in less than 2 years');
  } else if (monthlySavings > 0 && breakEvenMonths < 60) {
    recommendations.push('Refinancing may be beneficial - break-even in less than 5 years');
  } else if (monthlySavings <= 0) {
    recommendations.push('Refinancing does not provide monthly savings - consider other options');
  }
  
  if (loanToValueRatio > 80) {
    recommendations.push('Consider PMI costs in your analysis');
  }
  
  if (newTerm > currentTerm) {
    recommendations.push('Extending loan term may increase total interest costs');
  }
  
  if (cashOutAmount > 0) {
    recommendations.push('Cash-out refinance increases total debt - ensure funds are used wisely');
  }

  // Cost breakdown
  const costBreakdown = {
    refinanceCosts,
    monthlySavings: monthlySavings * 12,
    totalSavings: (monthlySavings * 12 * breakEvenPeriod) + totalInterestSavings,
    taxSavings: 0, // Will be calculated below
    investmentOpportunity: 0, // Will be calculated below
    netValue: refinanceValue
  };

  // Amortization comparison
  const amortizationComparison = {
    currentLoan: {
      remainingBalance: currentLoanAmount,
      remainingPayments: remainingPayments || currentTerm * 12,
      totalInterestRemaining: currentTotalInterest
    },
    newLoan: {
      monthlyPayment: newMonthlyPIPayment,
      totalInterest: newTotalInterest,
      totalPayments: newTotalPayments
    },
    savings: {
      monthly: monthlySavings,
      total: (monthlySavings * 12 * breakEvenPeriod),
      interest: totalInterestSavings
    }
  };

  // Tax analysis
  let taxAnalysis = {
    currentInterestDeduction: 0,
    newInterestDeduction: 0,
    taxSavings: 0,
    effectiveRate: newRate
  };

  if (includeTaxSavings && taxRate > 0) {
    const currentAnnualInterest = currentTotalInterest / (remainingPayments || currentTerm * 12) * 12;
    const newAnnualInterest = newTotalInterest / newTotalPayments * 12;
    
    taxAnalysis = {
      currentInterestDeduction: currentAnnualInterest * (taxRate / 100),
      newInterestDeduction: newAnnualInterest * (taxRate / 100),
      taxSavings: (currentAnnualInterest - newAnnualInterest) * (taxRate / 100),
      effectiveRate: newRate * (1 - taxRate / 100)
    };
    
    costBreakdown.taxSavings = taxAnalysis.taxSavings * breakEvenPeriod;
  }

  // Investment analysis
  let investmentAnalysis = {
    monthlyInvestmentValue: 0,
    totalInvestmentValue: 0,
    opportunityCost: 0,
    recommendation: 'Consider refinancing for monthly savings'
  };

  if (includeInvestmentComparison && monthlySavings > 0) {
    const monthlyInvestmentRate = investmentReturn / 100 / 12;
    const totalInvestmentValue = monthlySavings * 
      (Math.pow(1 + monthlyInvestmentRate, breakEvenPeriod * 12) - 1) / monthlyInvestmentRate;
    
    investmentAnalysis = {
      monthlyInvestmentValue: monthlySavings,
      totalInvestmentValue,
      opportunityCost: totalInvestmentValue - refinanceCosts,
      recommendation: totalInvestmentValue > refinanceCosts ? 
        'Consider investing monthly savings instead' : 
        'Refinancing provides better value than investing'
    };
    
    costBreakdown.investmentOpportunity = totalInvestmentValue;
  }

  // Risk assessment
  const riskAssessment = {
    rateRisk: newRate < currentRate ? 'Low - Rate reduction provides protection' : 'High - Rate increase increases costs',
    creditRisk: creditScore && creditScore < 680 ? 'Medium - Lower credit may affect rates' : 'Low - Good credit profile',
    propertyValueRisk: loanToValueRatio > 90 ? 'High - High LTV increases risk' : 'Low - Adequate equity',
    overallRisk: 'low' as 'low' | 'medium' | 'high',
    considerations: []
  };

  // Determine overall risk
  if (loanToValueRatio > 90 || (creditScore && creditScore < 620)) {
    riskAssessment.overallRisk = 'high';
  } else if (loanToValueRatio > 80 || (creditScore && creditScore < 680)) {
    riskAssessment.overallRisk = 'medium';
  }

  // Add risk considerations
  if (loanToValueRatio > 80) {
    riskAssessment.considerations.push('High LTV may require PMI');
  }
  if (newTerm > currentTerm) {
    riskAssessment.considerations.push('Extended loan term increases total interest');
  }
  if (cashOutAmount > 0) {
    riskAssessment.considerations.push('Cash-out increases total debt burden');
  }
  if (breakEvenMonths > 60) {
    riskAssessment.considerations.push('Long break-even period increases risk');
  }

  // Determine refinance decision
  let refinanceDecision = 'DO NOT REFINANCE';
  
  if (monthlySavings > 0 && breakEvenMonths < 60 && riskAssessment.overallRisk !== 'high') {
    refinanceDecision = 'REFINANCE';
  } else if (monthlySavings > 0 && breakEvenMonths < 24) {
    refinanceDecision = 'STRONGLY CONSIDER REFINANCING';
  } else if (monthlySavings <= 0) {
    refinanceDecision = 'DO NOT REFINANCE - No monthly savings';
  } else if (breakEvenMonths > 60) {
    refinanceDecision = 'DO NOT REFINANCE - Long break-even period';
  }

  return {
    refinanceDecision,
    monthlySavings,
    totalInterestSavings,
    breakEvenMonths,
    newMonthlyPayment,
    newLoanAmount,
    loanToValueRatio,
    refinanceValue,
    recommendations,
    costBreakdown,
    amortizationComparison,
    taxAnalysis,
    investmentAnalysis,
    riskAssessment
  };
};

export const generateMortgageRefinanceAnalysis = (inputs: MortgageRefinanceInputs, outputs: RefinanceResult): string => {
  const { currentRate, newRate, currentLoanAmount, propertyValue, refinanceType } = inputs;
  const { refinanceDecision, monthlySavings, totalInterestSavings, breakEvenMonths, loanToValueRatio, refinanceValue } = outputs;

  let analysis = `## Mortgage Refinance Analysis\n\n`;

  // Refinance Decision
  analysis += `### Refinance Decision\n`;
  analysis += `**Recommendation:** ${refinanceDecision === 'REFINANCE' ? '✅ REFINANCE' : 
    refinanceDecision === 'STRONGLY CONSIDER REFINANCING' ? '✅ STRONGLY CONSIDER REFINANCING' : '❌ DO NOT REFINANCE'}\n\n`;

  // Rate Comparison
  analysis += `### Rate Comparison\n`;
  analysis += `- **Current Rate:** ${currentRate.toFixed(3)}%\n`;
  analysis += `- **New Rate:** ${newRate.toFixed(3)}%\n`;
  analysis += `- **Rate Difference:** ${(newRate - currentRate).toFixed(3)}%\n`;
  analysis += `- **Refinance Type:** ${refinanceType.replace('-', ' ').toUpperCase()}\n\n`;

  // Financial Impact
  analysis += `### Financial Impact\n`;
  analysis += `- **Monthly Savings:** $${Math.abs(monthlySavings).toFixed(2)} ${monthlySavings > 0 ? '(savings)' : '(cost)'}\n`;
  analysis += `- **Total Interest Savings:** $${Math.abs(totalInterestSavings).toLocaleString()} ${totalInterestSavings > 0 ? '(savings)' : '(cost)'}\n`;
  analysis += `- **Break-Even Months:** ${breakEvenMonths === Infinity ? 'Never' : breakEvenMonths.toFixed(0)} months\n`;
  analysis += `- **Refinance Value:** $${refinanceValue.toLocaleString()}\n`;
  analysis += `- **New LTV Ratio:** ${loanToValueRatio.toFixed(1)}%\n\n`;

  // Loan Details
  analysis += `### Loan Details\n`;
  analysis += `- **Current Loan Balance:** $${currentLoanAmount.toLocaleString()}\n`;
  analysis += `- **Property Value:** $${propertyValue.toLocaleString()}\n`;
  analysis += `- **New Loan Amount:** $${outputs.newLoanAmount.toLocaleString()}\n`;
  analysis += `- **New Monthly Payment:** $${outputs.newMonthlyPayment.toFixed(2)}\n\n`;

  // Recommendations
  if (outputs.recommendations.length > 0) {
    analysis += `### Recommendations\n`;
    outputs.recommendations.forEach((rec, index) => {
      analysis += `${index + 1}. ${rec}\n`;
    });
    analysis += `\n`;
  }

  // Risk Assessment
  analysis += `### Risk Assessment\n`;
  analysis += `- **Overall Risk:** ${outputs.riskAssessment.overallRisk.toUpperCase()}\n`;
  analysis += `- **Rate Risk:** ${outputs.riskAssessment.rateRisk}\n`;
  analysis += `- **Credit Risk:** ${outputs.riskAssessment.creditRisk}\n`;
  analysis += `- **Property Value Risk:** ${outputs.riskAssessment.propertyValueRisk}\n\n`;

  // Risk Considerations
  if (outputs.riskAssessment.considerations.length > 0) {
    analysis += `### Risk Considerations\n`;
    outputs.riskAssessment.considerations.forEach(consideration => {
      analysis += `- ⚠️ ${consideration}\n`;
    });
    analysis += `\n`;
  }

  // Tax Analysis
  if (outputs.taxAnalysis.taxSavings > 0) {
    analysis += `### Tax Analysis\n`;
    analysis += `- **Annual Tax Savings:** $${outputs.taxAnalysis.taxSavings.toFixed(2)}\n`;
    analysis += `- **Effective Rate:** ${outputs.taxAnalysis.effectiveRate.toFixed(3)}%\n`;
    analysis += `- **Tax Savings Over ${inputs.breakEvenPeriod || 5} Years:** $${outputs.costBreakdown.taxSavings.toFixed(2)}\n\n`;
  }

  // Investment Comparison
  if (outputs.investmentAnalysis.totalInvestmentValue > 0) {
    analysis += `### Investment Comparison\n`;
    analysis += `- **Investment Value:** $${outputs.investmentAnalysis.totalInvestmentValue.toLocaleString()}\n`;
    analysis += `- **Opportunity Cost:** $${outputs.investmentAnalysis.opportunityCost.toLocaleString()}\n`;
    analysis += `- **Recommendation:** ${outputs.investmentAnalysis.recommendation}\n`;
  }

  return analysis;
};