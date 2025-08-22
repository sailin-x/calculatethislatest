import { PMICancellationInputs } from './validation';

export interface PMICancellationResult {
  currentLTV: number;
  cancellationLTV: number;
  monthsToCancellation: number;
  cancellationDate: string;
  pmiSavings: {
    monthlySavings: number;
    annualSavings: number;
    totalSavings: number;
    immediateSavings: number;
  };
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  equityAnalysis: {
    currentEquity: number;
    currentEquityPercentage: number;
    equityNeeded: number;
    equityGap: number;
    projectedEquity: number;
    projectedEquityDate: string;
  };
  paymentAnalysis: {
    currentPayment: number;
    paymentAfterCancellation: number;
    paymentReduction: number;
    paymentReductionPercentage: number;
  };
  refinanceAnalysis: {
    refinanceSavings: number;
    refinanceBreakEven: number;
    refinanceRecommendation: string;
    newPayment: number;
    paymentDifference: number;
  };
  cancellationOptions: string[];
  recommendations: string[];
  timelineAnalysis: {
    automaticCancellationDate: string;
    requestCancellationDate: string;
    keyMilestones: string[];
  };
  costBenefitAnalysis: {
    cancellationCosts: number;
    totalBenefits: number;
    netBenefit: number;
    benefitCostRatio: number;
    recommendation: string;
  };
}

export const calculatePMICancellation = (inputs: PMICancellationInputs): PMICancellationResult => {
  // Basic calculations
  const originalLoanAmount = inputs.originalLoanAmount || 0;
  const currentLoanBalance = inputs.currentLoanBalance || 0;
  const originalPropertyValue = inputs.originalPropertyValue || 0;
  const currentPropertyValue = inputs.currentPropertyValue || originalPropertyValue;
  const pmiRate = inputs.pmiRate || 0;
  const monthlyPMI = inputs.monthlyPMI || (currentLoanBalance * (pmiRate / 100) / 12);
  const loanType = inputs.loanType || 'conventional';
  const loanStartDate = new Date(inputs.loanStartDate || new Date());
  const propertyAppreciation = inputs.propertyAppreciation || 3.0;
  const additionalPayments = inputs.additionalPayments || 0;
  const lumpSumPayment = inputs.lumpSumPayment || 0;
  const cancellationMethod = inputs.cancellationMethod || 'automatic';
  const appraisalCost = inputs.appraisalCost || 500;
  const refinanceCosts = inputs.refinanceCosts || 0;
  const newInterestRate = inputs.newInterestRate || 0;
  const interestRate = inputs.interestRate || 4.5;
  const loanTerm = inputs.loanTerm || 30;

  // Calculate current LTV
  const currentLTV = (currentLoanBalance / currentPropertyValue) * 100;

  // Determine cancellation LTV based on method and loan type
  let cancellationLTV = 80; // Default for conventional loans
  if (loanType === 'fha') {
    cancellationLTV = 78; // FHA requires 78% LTV
  } else if (loanType === 'usda' || loanType === 'va') {
    cancellationLTV = 80; // USDA and VA loans
  } else {
    // Conventional loan - depends on cancellation method
    switch (cancellationMethod) {
      case 'automatic':
        cancellationLTV = 78;
        break;
      case 'request':
        cancellationLTV = 80;
        break;
      case 'automatic_78':
        cancellationLTV = 78;
        break;
      case 'request_75':
        cancellationLTV = 75;
        break;
      default:
        cancellationLTV = 80;
    }
  }

  // Calculate equity analysis
  const currentEquity = currentPropertyValue - currentLoanBalance;
  const currentEquityPercentage = (currentEquity / currentPropertyValue) * 100;
  const equityNeeded = currentPropertyValue * (cancellationLTV / 100);
  const equityGap = currentLoanBalance - equityNeeded;

  // Calculate months to cancellation
  let monthsToCancellation = 0;
  let projectedEquity = currentEquity;
  let projectedPropertyValue = currentPropertyValue;
  let projectedLoanBalance = currentLoanBalance;
  let projectedEquityDate = '';

  if (currentLTV > cancellationLTV) {
    // Need to reduce LTV to cancellation threshold
    const targetLoanBalance = currentPropertyValue * (cancellationLTV / 100);
    const principalReductionNeeded = currentLoanBalance - targetLoanBalance;
    
    // Calculate monthly principal reduction
    const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(
      currentLoanBalance,
      interestRate,
      loanTerm * 12 - getMonthsSinceLoanStart(loanStartDate)
    );
    
    const totalMonthlyPrincipalReduction = monthlyPrincipalPayment + additionalPayments;
    
    if (totalMonthlyPrincipalReduction > 0) {
      monthsToCancellation = Math.ceil(principalReductionNeeded / totalMonthlyPrincipalReduction);
    }

    // Project equity and property value
    const monthsWithAppreciation = Math.min(monthsToCancellation, 12 * 30); // Max 30 years
    projectedPropertyValue = currentPropertyValue * Math.pow(1 + propertyAppreciation / 100, monthsWithAppreciation / 12);
    projectedLoanBalance = Math.max(0, currentLoanBalance - (totalMonthlyPrincipalReduction * monthsToCancellation));
    projectedEquity = projectedPropertyValue - projectedLoanBalance;
    
    // Calculate projected date
    const projectedDate = new Date(loanStartDate);
    projectedDate.setMonth(projectedDate.getMonth() + monthsToCancellation);
    projectedEquityDate = projectedDate.toLocaleDateString();
  }

  // Calculate cancellation date
  const cancellationDate = new Date(loanStartDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);

  // Calculate PMI savings
  const monthlySavings = monthlyPMI;
  const annualSavings = monthlySavings * 12;
  const remainingMonths = Math.max(0, (loanTerm * 12) - getMonthsSinceLoanStart(loanStartDate));
  const totalSavings = monthlySavings * Math.min(remainingMonths, monthsToCancellation);
  const immediateSavings = currentLTV <= cancellationLTV ? monthlySavings : 0;

  // Calculate break-even analysis
  const cancellationCosts = appraisalCost + (lumpSumPayment || 0);
  const breakEvenMonths = cancellationCosts > 0 ? Math.ceil(cancellationCosts / monthlySavings) : 0;

  // Payment analysis
  const currentPayment = (inputs.monthlyPayment || 0) + monthlyPMI;
  const paymentAfterCancellation = inputs.monthlyPayment || 0;
  const paymentReduction = currentPayment - paymentAfterCancellation;
  const paymentReductionPercentage = currentPayment > 0 ? (paymentReduction / currentPayment) * 100 : 0;

  // Refinance analysis
  let refinanceSavings = 0;
  let refinanceBreakEven = 0;
  let refinanceRecommendation = 'Not recommended';
  let newPayment = 0;
  let paymentDifference = 0;

  if (inputs.includeRefinance && newInterestRate > 0 && newInterestRate < interestRate) {
    const newMonthlyPayment = calculateMonthlyPayment(currentLoanBalance, newInterestRate, loanTerm);
    newPayment = newMonthlyPayment;
    paymentDifference = currentPayment - newPayment;
    refinanceSavings = paymentDifference * 12;
    refinanceBreakEven = refinanceCosts > 0 ? Math.ceil(refinanceCosts / paymentDifference) : 0;
    
    if (refinanceBreakEven < 24) {
      refinanceRecommendation = 'Strongly recommended';
    } else if (refinanceBreakEven < 60) {
      refinanceRecommendation = 'Recommended';
    } else {
      refinanceRecommendation = 'Not recommended - long break-even period';
    }
  }

  // Generate cancellation options
  const cancellationOptions: string[] = [];
  
  if (currentLTV <= 80) {
    cancellationOptions.push('Request PMI cancellation (80% LTV)');
  }
  
  if (currentLTV <= 78) {
    cancellationOptions.push('Automatic PMI cancellation (78% LTV)');
  }
  
  if (currentLTV <= 75) {
    cancellationOptions.push('Request PMI cancellation (75% LTV)');
  }
  
  if (lumpSumPayment > 0 && (currentLoanBalance - lumpSumPayment) / currentPropertyValue <= cancellationLTV / 100) {
    cancellationOptions.push('Lump sum payment to reach cancellation threshold');
  }
  
  if (additionalPayments > 0) {
    cancellationOptions.push('Additional monthly payments to accelerate cancellation');
  }
  
  if (inputs.includeRefinance && newInterestRate > 0 && newInterestRate < interestRate) {
    cancellationOptions.push('Refinance to eliminate PMI');
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (currentLTV <= cancellationLTV) {
    recommendations.push('PMI can be cancelled immediately - contact your lender');
  } else if (monthsToCancellation <= 12) {
    recommendations.push('PMI can be cancelled within 1 year - consider waiting');
  } else if (monthsToCancellation <= 24) {
    recommendations.push('PMI can be cancelled within 2 years - consider additional payments');
  } else {
    recommendations.push('PMI cancellation is several years away - consider refinancing or additional payments');
  }

  if (breakEvenMonths <= 6) {
    recommendations.push('Cancellation costs will be recovered quickly');
  } else if (breakEvenMonths <= 12) {
    recommendations.push('Cancellation costs will be recovered within 1 year');
  } else {
    recommendations.push('Consider the long-term benefits vs. cancellation costs');
  }

  if (lumpSumPayment > 0 && lumpSumPayment <= currentEquity * 0.1) {
    recommendations.push('Small lump sum payment could accelerate PMI cancellation');
  }

  if (additionalPayments > 0 && additionalPayments <= monthlySavings * 0.5) {
    recommendations.push('Additional payments could significantly reduce time to cancellation');
  }

  if (refinanceBreakEven <= 24 && newInterestRate < interestRate) {
    recommendations.push('Refinancing could be beneficial for eliminating PMI');
  }

  // Timeline analysis
  const automaticCancellationDate = new Date(loanStartDate);
  automaticCancellationDate.setMonth(automaticCancellationDate.getMonth() + monthsToCancellation);
  
  const requestCancellationDate = new Date(loanStartDate);
  requestCancellationDate.setMonth(requestCancellationDate.getMonth() + Math.max(0, monthsToCancellation - 6));

  const keyMilestones = [
    `Current LTV: ${currentLTV.toFixed(1)}%`,
    `Target LTV: ${cancellationLTV}%`,
    `Equity needed: $${equityGap.toLocaleString()}`,
    `Months to cancellation: ${monthsToCancellation}`,
    `Estimated cancellation date: ${cancellationDate.toLocaleDateString()}`,
    `Monthly savings: $${monthlySavings.toFixed(2)}`,
    `Annual savings: $${annualSavings.toFixed(2)}`
  ];

  // Cost-benefit analysis
  const totalBenefits = totalSavings;
  const netBenefit = totalBenefits - cancellationCosts;
  const benefitCostRatio = cancellationCosts > 0 ? totalBenefits / cancellationCosts : 0;
  
  let costBenefitRecommendation = 'Not recommended';
  if (benefitCostRatio > 5) {
    costBenefitRecommendation = 'Highly recommended';
  } else if (benefitCostRatio > 2) {
    costBenefitRecommendation = 'Recommended';
  } else if (benefitCostRatio > 1) {
    costBenefitRecommendation = 'Consider if long-term benefits are important';
  }

  return {
    currentLTV,
    cancellationLTV,
    monthsToCancellation,
    cancellationDate: cancellationDate.toLocaleDateString(),
    pmiSavings: {
      monthlySavings,
      annualSavings,
      totalSavings,
      immediateSavings
    },
    monthlySavings,
    annualSavings,
    totalSavings,
    breakEvenMonths,
    equityAnalysis: {
      currentEquity,
      currentEquityPercentage,
      equityNeeded,
      equityGap,
      projectedEquity,
      projectedEquityDate
    },
    paymentAnalysis: {
      currentPayment,
      paymentAfterCancellation,
      paymentReduction,
      paymentReductionPercentage
    },
    refinanceAnalysis: {
      refinanceSavings,
      refinanceBreakEven,
      refinanceRecommendation,
      newPayment,
      paymentDifference
    },
    cancellationOptions,
    recommendations,
    timelineAnalysis: {
      automaticCancellationDate: automaticCancellationDate.toLocaleDateString(),
      requestCancellationDate: requestCancellationDate.toLocaleDateString(),
      keyMilestones
    },
    costBenefitAnalysis: {
      cancellationCosts,
      totalBenefits,
      netBenefit,
      benefitCostRatio,
      recommendation: costBenefitRecommendation
    }
  };
};

// Helper functions
function calculateMonthlyPayment(principal: number, annualRate: number, totalMonths: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / totalMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

function calculateMonthlyPrincipalPayment(principal: number, annualRate: number, remainingMonths: number): number {
  const totalPayment = calculateMonthlyPayment(principal, annualRate, remainingMonths);
  const monthlyInterest = principal * (annualRate / 100 / 12);
  return totalPayment - monthlyInterest;
}

function getMonthsSinceLoanStart(loanStartDate: Date): number {
  const now = new Date();
  const monthsDiff = (now.getFullYear() - loanStartDate.getFullYear()) * 12 + (now.getMonth() - loanStartDate.getMonth());
  return Math.max(0, monthsDiff);
}

export const generatePMICancellationAnalysis = (inputs: PMICancellationInputs, outputs: PMICancellationResult): string => {
  const analysis = `# PMI Cancellation Analysis

## Summary
**Current LTV:** ${outputs.currentLTV.toFixed(1)}%
**Cancellation LTV:** ${outputs.cancellationLTV}%
**Months to Cancellation:** ${outputs.monthsToCancellation}
**Cancellation Date:** ${outputs.cancellationDate}
**Monthly Savings:** $${outputs.monthlySavings.toFixed(2)}

## Key Metrics
- **Original Loan Amount:** $${inputs.originalLoanAmount.toLocaleString()}
- **Current Loan Balance:** $${inputs.currentLoanBalance.toLocaleString()}
- **Original Property Value:** $${inputs.originalPropertyValue.toLocaleString()}
- **Current Property Value:** $${(inputs.currentPropertyValue || inputs.originalPropertyValue).toLocaleString()}
- **PMI Rate:** ${inputs.pmiRate}%
- **Loan Type:** ${inputs.loanType}

## Equity Analysis
- **Current Equity:** $${outputs.equityAnalysis.currentEquity.toLocaleString()}
- **Current Equity Percentage:** ${outputs.equityAnalysis.currentEquityPercentage.toFixed(1)}%
- **Equity Needed for Cancellation:** $${outputs.equityAnalysis.equityNeeded.toLocaleString()}
- **Equity Gap:** $${outputs.equityAnalysis.equityGap.toLocaleString()}
- **Projected Equity:** $${outputs.equityAnalysis.projectedEquity.toLocaleString()}
- **Projected Equity Date:** ${outputs.equityAnalysis.projectedEquityDate}

## PMI Savings
- **Monthly Savings:** $${outputs.pmiSavings.monthlySavings.toFixed(2)}
- **Annual Savings:** $${outputs.pmiSavings.annualSavings.toFixed(2)}
- **Total Savings:** $${outputs.pmiSavings.totalSavings.toFixed(2)}
- **Immediate Savings:** $${outputs.pmiSavings.immediateSavings.toFixed(2)}

## Payment Analysis
- **Current Payment:** $${outputs.paymentAnalysis.currentPayment.toFixed(2)}
- **Payment After Cancellation:** $${outputs.paymentAnalysis.paymentAfterCancellation.toFixed(2)}
- **Payment Reduction:** $${outputs.paymentAnalysis.paymentReduction.toFixed(2)}
- **Payment Reduction Percentage:** ${outputs.paymentAnalysis.paymentReductionPercentage.toFixed(1)}%

## Break-Even Analysis
- **Cancellation Costs:** $${outputs.costBenefitAnalysis.cancellationCosts.toFixed(2)}
- **Break-Even Months:** ${outputs.breakEvenMonths}
- **Total Benefits:** $${outputs.costBenefitAnalysis.totalBenefits.toFixed(2)}
- **Net Benefit:** $${outputs.costBenefitAnalysis.netBenefit.toFixed(2)}
- **Benefit-Cost Ratio:** ${outputs.costBenefitAnalysis.benefitCostRatio.toFixed(2)}

## Refinance Analysis
- **Refinance Savings:** $${outputs.refinanceAnalysis.refinanceSavings.toFixed(2)}
- **Refinance Break-Even:** ${outputs.refinanceAnalysis.refinanceBreakEven} months
- **Refinance Recommendation:** ${outputs.refinanceAnalysis.refinanceRecommendation}
- **New Payment:** $${outputs.refinanceAnalysis.newPayment.toFixed(2)}
- **Payment Difference:** $${outputs.refinanceAnalysis.paymentDifference.toFixed(2)}

## Available Cancellation Options
${outputs.cancellationOptions.map(option => `- ${option}`).join('\n')}

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Timeline Analysis
- **Automatic Cancellation Date:** ${outputs.timelineAnalysis.automaticCancellationDate}
- **Request Cancellation Date:** ${outputs.timelineAnalysis.requestCancellationDate}

### Key Milestones
${outputs.timelineAnalysis.keyMilestones.map(milestone => `- ${milestone}`).join('\n')}

## Cost-Benefit Analysis
- **Cancellation Costs:** $${outputs.costBenefitAnalysis.cancellationCosts.toFixed(2)}
- **Total Benefits:** $${outputs.costBenefitAnalysis.totalBenefits.toFixed(2)}
- **Net Benefit:** $${outputs.costBenefitAnalysis.netBenefit.toFixed(2)}
- **Benefit-Cost Ratio:** ${outputs.costBenefitAnalysis.benefitCostRatio.toFixed(2)}
- **Recommendation:** ${outputs.costBenefitAnalysis.recommendation}

## Loan Details
- **Loan Start Date:** ${inputs.loanStartDate}
- **Interest Rate:** ${inputs.interestRate}%
- **Loan Term:** ${inputs.loanTerm} years
- **Property Appreciation:** ${inputs.propertyAppreciation}%
- **Additional Payments:** $${inputs.additionalPayments || 0}
- **Lump Sum Payment:** $${inputs.lumpSumPayment || 0}

## Cancellation Method Details
- **Method:** ${inputs.cancellationMethod}
- **Appraisal Cost:** $${inputs.appraisalCost || 0}
- **Refinance Costs:** $${inputs.refinanceCosts || 0}
- **New Interest Rate:** ${inputs.newInterestRate || 'N/A'}%

---
*This analysis provides a comprehensive view of PMI cancellation potential and savings. Always consult with your lender for specific cancellation requirements and procedures.*`;

  return analysis;
};