import { MortgagePaymentInputs } from './validation';

export interface PaymentResult {
  monthlyPayment: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  loanToValue: number;
  downPaymentAmount: number;
  downPaymentPercentage: number;
  amortizationSchedule: AmortizationEntry[];
  paymentBreakdown: PaymentBreakdown;
  scenarioComparison: ScenarioComparison;
  affordabilityAnalysis: AffordabilityAnalysis;
  costAnalysis: CostAnalysis;
}

export interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  endingBalance: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
}

export interface PaymentBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaFees: number;
  totalPayment: number;
  breakdownPercentages: {
    principalAndInterest: number;
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoaFees: number;
  };
}

export interface ScenarioComparison {
  scenarios: PaymentScenario[];
  bestScenario: string;
  costComparison: CostComparison;
  paymentComparison: PaymentComparison;
}

export interface PaymentScenario {
  name: string;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  yearsToPayoff: number;
  description: string;
}

export interface CostComparison {
  lowestPayment: string;
  lowestInterest: string;
  lowestTotalCost: string;
  costDifferences: {
    [key: string]: number;
  };
}

export interface PaymentComparison {
  lowestPayment: string;
  highestPayment: string;
  paymentRange: number;
  averagePayment: number;
}

export interface AffordabilityAnalysis {
  frontEndRatio: number;
  backEndRatio: number;
  affordabilityStatus: string;
  recommendedIncome: number;
  maximumLoanAmount: number;
  debtToIncomeAnalysis: {
    currentDTI: number;
    recommendedDTI: number;
    status: string;
  };
}

export interface CostAnalysis {
  totalLoanCost: number;
  interestCost: number;
  insuranceCost: number;
  taxCost: number;
  feeCost: number;
  costBreakdown: {
    principal: number;
    interest: number;
    taxes: number;
    insurance: number;
    pmi: number;
    hoa: number;
    closingCosts: number;
  };
  costEfficiency: string;
  savingsOpportunities: string[];
}

export const calculateMortgagePayment = (inputs: MortgagePaymentInputs): PaymentResult => {
  // Calculate effective loan amount and down payment
  const effectiveLoanAmount = calculateEffectiveLoanAmount(inputs);
  const downPaymentInfo = calculateDownPayment(inputs);
  
  // Calculate monthly payment (principal and interest)
  const monthlyPayment = calculateMonthlyPayment(effectiveLoanAmount, inputs.interestRate, inputs.loanTerm);
  
  // Calculate additional costs
  const propertyTax = calculatePropertyTax(inputs);
  const homeInsurance = calculateHomeInsurance(inputs);
  const pmi = calculatePMI(inputs, effectiveLoanAmount);
  const hoaFees = inputs.hoaFees || 0;
  
  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPayment + propertyTax + homeInsurance + pmi + hoaFees;
  
  // Calculate total interest and cost
  const totalInterest = calculateTotalInterest(monthlyPayment, inputs.loanTerm, effectiveLoanAmount);
  const totalCost = effectiveLoanAmount + totalInterest + (propertyTax * inputs.loanTerm * 12) + 
                   (homeInsurance * inputs.loanTerm * 12) + (pmi * inputs.loanTerm * 12) + 
                   (hoaFees * inputs.loanTerm * 12) + (inputs.closingCosts || 0);
  
  // Calculate loan-to-value ratio
  const loanToValue = inputs.propertyValue ? (effectiveLoanAmount / inputs.propertyValue) * 100 : 0;
  
  // Generate amortization schedule
  const amortizationSchedule = generateAmortizationSchedule(inputs, effectiveLoanAmount, monthlyPayment);
  
  // Calculate payment breakdown
  const paymentBreakdown = calculatePaymentBreakdown(monthlyPayment, propertyTax, homeInsurance, pmi, hoaFees);
  
  // Generate scenario comparison
  const scenarioComparison = generateScenarioComparison(inputs, effectiveLoanAmount);
  
  // Calculate affordability analysis
  const affordabilityAnalysis = calculateAffordabilityAnalysis(inputs, totalMonthlyPayment, effectiveLoanAmount);
  
  // Calculate cost analysis
  const costAnalysis = calculateCostAnalysis(inputs, effectiveLoanAmount, totalInterest, propertyTax, homeInsurance, pmi, hoaFees);
  
  return {
    monthlyPayment,
    totalMonthlyPayment,
    totalInterest,
    totalCost,
    loanToValue,
    downPaymentAmount: downPaymentInfo.amount,
    downPaymentPercentage: downPaymentInfo.percentage,
    amortizationSchedule,
    paymentBreakdown,
    scenarioComparison,
    affordabilityAnalysis,
    costAnalysis
  };
};

const calculateEffectiveLoanAmount = (inputs: MortgagePaymentInputs): number => {
  let baseAmount = inputs.loanAmount;
  
  // Add loan-specific fees
  switch (inputs.loanType) {
    case 'fha':
      const fhaUpfrontMIP = inputs.fhaUpfrontMIP || 1.75;
      baseAmount += (baseAmount * fhaUpfrontMIP) / 100;
      break;
    case 'va':
      const vaFundingFee = inputs.vaFundingFee || 2.3;
      baseAmount += (baseAmount * vaFundingFee) / 100;
      break;
    case 'usda':
      const usdaGuaranteeFee = inputs.usdaGuaranteeFee || 1;
      baseAmount += (baseAmount * usdaGuaranteeFee) / 100;
      break;
  }
  
  return baseAmount;
};

const calculateDownPayment = (inputs: MortgagePaymentInputs): { amount: number; percentage: number } => {
  let amount = inputs.downPayment || 0;
  let percentage = inputs.downPaymentPercent || 0;
  
  if (inputs.propertyValue) {
    if (amount > 0 && percentage === 0) {
      percentage = (amount / inputs.propertyValue) * 100;
    } else if (percentage > 0 && amount === 0) {
      amount = (inputs.propertyValue * percentage) / 100;
    }
  }
  
  return { amount, percentage };
};

const calculateMonthlyPayment = (loanAmount: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

const calculatePropertyTax = (inputs: MortgagePaymentInputs): number => {
  if (!inputs.includeTaxes) return 0;
  
  if (inputs.propertyTax) {
    return inputs.propertyTax / 12;
  }
  
  if (inputs.propertyTaxRate && inputs.propertyValue) {
    return (inputs.propertyValue * inputs.propertyTaxRate / 100) / 12;
  }
  
  return 0;
};

const calculateHomeInsurance = (inputs: MortgagePaymentInputs): number => {
  if (!inputs.includeInsurance) return 0;
  
  if (inputs.homeInsurance) {
    return inputs.homeInsurance / 12;
  }
  
  // Default insurance rate (0.5% of property value)
  if (inputs.propertyValue) {
    return (inputs.propertyValue * 0.005) / 12;
  }
  
  return 0;
};

const calculatePMI = (inputs: MortgagePaymentInputs, loanAmount: number): number => {
  if (!inputs.includePMI) return 0;
  
  const ltv = inputs.propertyValue ? (loanAmount / inputs.propertyValue) * 100 : 0;
  
  if (ltv <= 80) return 0;
  
  const pmiRate = inputs.pmi || getDefaultPMIRate(ltv);
  return (loanAmount * pmiRate / 100) / 12;
};

const getDefaultPMIRate = (ltv: number): number => {
  if (ltv <= 85) return 0.3;
  if (ltv <= 90) return 0.5;
  if (ltv <= 95) return 0.8;
  return 1.0;
};

const calculateTotalInterest = (monthlyPayment: number, years: number, loanAmount: number): number => {
  const totalPayments = monthlyPayment * years * 12;
  return totalPayments - loanAmount;
};

const generateAmortizationSchedule = (inputs: MortgagePaymentInputs, loanAmount: number, monthlyPayment: number): AmortizationEntry[] => {
  if (!inputs.amortizationSchedule) return [];
  
  const schedule: AmortizationEntry[] = [];
  const periods = inputs.schedulePeriods || 12;
  const monthlyRate = inputs.interestRate / 100 / 12;
  let balance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  const startDate = new Date();
  
  for (let i = 1; i <= Math.min(periods, inputs.loanTerm * 12); i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    // Apply extra payments if specified
    let extraPrincipal = 0;
    if (inputs.extraPayment) {
      extraPrincipal = inputs.extraPayment;
    }
    
    // Apply lump sum payment if specified
    if (inputs.lumpSumPayment && inputs.lumpSumMonth === i) {
      extraPrincipal += inputs.lumpSumPayment;
    }
    
    const totalPrincipalPayment = principalPayment + extraPrincipal;
    balance = Math.max(0, balance - totalPrincipalPayment);
    
    totalInterestPaid += interestPayment;
    totalPrincipalPaid += totalPrincipalPayment;
    
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);
    
    schedule.push({
      paymentNumber: i,
      paymentDate: paymentDate.toISOString().split('T')[0],
      beginningBalance: balance + totalPrincipalPayment,
      monthlyPayment: monthlyPayment + extraPrincipal,
      principalPayment: totalPrincipalPayment,
      interestPayment: interestPayment,
      endingBalance: balance,
      totalInterestPaid: totalInterestPaid,
      totalPrincipalPaid: totalPrincipalPaid
    });
    
    if (balance <= 0) break;
  }
  
  return schedule;
};

const calculatePaymentBreakdown = (monthlyPayment: number, propertyTax: number, homeInsurance: number, pmi: number, hoaFees: number): PaymentBreakdown => {
  const totalPayment = monthlyPayment + propertyTax + homeInsurance + pmi + hoaFees;
  
  return {
    principalAndInterest: monthlyPayment,
    propertyTax: propertyTax,
    homeInsurance: homeInsurance,
    pmi: pmi,
    hoaFees: hoaFees,
    totalPayment: totalPayment,
    breakdownPercentages: {
      principalAndInterest: totalPayment > 0 ? (monthlyPayment / totalPayment) * 100 : 0,
      propertyTax: totalPayment > 0 ? (propertyTax / totalPayment) * 100 : 0,
      homeInsurance: totalPayment > 0 ? (homeInsurance / totalPayment) * 100 : 0,
      pmi: totalPayment > 0 ? (pmi / totalPayment) * 100 : 0,
      hoaFees: totalPayment > 0 ? (hoaFees / totalPayment) * 100 : 0
    }
  };
};

const generateScenarioComparison = (inputs: MortgagePaymentInputs, loanAmount: number): ScenarioComparison => {
  if (!inputs.compareScenarios) {
    return {
      scenarios: [],
      bestScenario: '',
      costComparison: { lowestPayment: '', lowestInterest: '', lowestTotalCost: '', costDifferences: {} },
      paymentComparison: { lowestPayment: '', highestPayment: '', paymentRange: 0, averagePayment: 0 }
    };
  }
  
  const scenarios: PaymentScenario[] = [];
  
  // Current scenario
  const currentPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);
  const currentInterest = calculateTotalInterest(currentPayment, inputs.loanTerm, loanAmount);
  scenarios.push({
    name: 'Current Terms',
    monthlyPayment: currentPayment,
    totalInterest: currentInterest,
    totalCost: loanAmount + currentInterest,
    yearsToPayoff: inputs.loanTerm,
    description: `${inputs.loanTerm}-year fixed at ${inputs.interestRate}%`
  });
  
  // 15-year scenario
  if (inputs.loanTerm > 15) {
    const payment15 = calculateMonthlyPayment(loanAmount, inputs.interestRate, 15);
    const interest15 = calculateTotalInterest(payment15, 15, loanAmount);
    scenarios.push({
      name: '15-Year Fixed',
      monthlyPayment: payment15,
      totalInterest: interest15,
      totalCost: loanAmount + interest15,
      yearsToPayoff: 15,
      description: '15-year fixed at same rate'
    });
  }
  
  // Lower rate scenario
  const lowerRate = Math.max(0.1, inputs.interestRate - 1);
  const paymentLower = calculateMonthlyPayment(loanAmount, lowerRate, inputs.loanTerm);
  const interestLower = calculateTotalInterest(paymentLower, inputs.loanTerm, loanAmount);
  scenarios.push({
    name: 'Lower Rate',
    monthlyPayment: paymentLower,
    totalInterest: interestLower,
    totalCost: loanAmount + interestLower,
    yearsToPayoff: inputs.loanTerm,
    description: `${inputs.loanTerm}-year fixed at ${lowerRate}%`
  });
  
  // ARM scenario
  if (inputs.loanType === 'arm' && inputs.armInitialRate) {
    const paymentARM = calculateMonthlyPayment(loanAmount, inputs.armInitialRate, inputs.loanTerm);
    const interestARM = calculateTotalInterest(paymentARM, inputs.loanTerm, loanAmount);
    scenarios.push({
      name: 'ARM',
      monthlyPayment: paymentARM,
      totalInterest: interestARM,
      totalCost: loanAmount + interestARM,
      yearsToPayoff: inputs.loanTerm,
      description: `${inputs.armFixedPeriod || 5}/${inputs.loanTerm} ARM at ${inputs.armInitialRate}%`
    });
  }
  
  // Find best scenarios
  const lowestPayment = scenarios.reduce((a, b) => a.monthlyPayment < b.monthlyPayment ? a : b);
  const lowestInterest = scenarios.reduce((a, b) => a.totalInterest < b.totalInterest ? a : b);
  const lowestTotalCost = scenarios.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  
  // Calculate cost differences
  const costDifferences: { [key: string]: number } = {};
  scenarios.forEach(scenario => {
    costDifferences[scenario.name] = scenario.totalCost - lowestTotalCost.totalCost;
  });
  
  // Calculate payment comparison
  const payments = scenarios.map(s => s.monthlyPayment);
  const paymentRange = Math.max(...payments) - Math.min(...payments);
  const averagePayment = payments.reduce((a, b) => a + b, 0) / payments.length;
  
  return {
    scenarios,
    bestScenario: lowestTotalCost.name,
    costComparison: {
      lowestPayment: lowestPayment.name,
      lowestInterest: lowestInterest.name,
      lowestTotalCost: lowestTotalCost.name,
      costDifferences
    },
    paymentComparison: {
      lowestPayment: lowestPayment.name,
      highestPayment: scenarios.reduce((a, b) => a.monthlyPayment > b.monthlyPayment ? a : b).name,
      paymentRange,
      averagePayment
    }
  };
};

const calculateAffordabilityAnalysis = (inputs: MortgagePaymentInputs, totalMonthlyPayment: number, loanAmount: number): AffordabilityAnalysis => {
  // Assume annual income of $100,000 for analysis (can be made configurable)
  const assumedIncome = 100000;
  const monthlyIncome = assumedIncome / 12;
  
  const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
  const backEndRatio = ((totalMonthlyPayment + (assumedIncome * 0.1 / 12)) / monthlyIncome) * 100;
  
  let affordabilityStatus = 'Affordable';
  if (frontEndRatio > 28) affordabilityStatus = 'Barely Affordable';
  if (frontEndRatio > 35) affordabilityStatus = 'Not Affordable';
  
  const recommendedIncome = (totalMonthlyPayment * 12) / 0.28;
  const maximumLoanAmount = calculateMaximumLoanAmount(inputs.interestRate, inputs.loanTerm, recommendedIncome * 0.28 / 12);
  
  const currentDTI = backEndRatio;
  const recommendedDTI = 36;
  let dtiStatus = 'Good';
  if (currentDTI > 43) dtiStatus = 'Poor';
  else if (currentDTI > 36) dtiStatus = 'Fair';
  
  return {
    frontEndRatio,
    backEndRatio,
    affordabilityStatus,
    recommendedIncome,
    maximumLoanAmount,
    debtToIncomeAnalysis: {
      currentDTI: currentDTI,
      recommendedDTI: recommendedDTI,
      status: dtiStatus
    }
  };
};

const calculateMaximumLoanAmount = (rate: number, years: number, monthlyPayment: number): number => {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return monthlyPayment * numberOfPayments;
  }
  
  return monthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
         (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
};

const calculateCostAnalysis = (inputs: MortgagePaymentInputs, loanAmount: number, totalInterest: number, propertyTax: number, homeInsurance: number, pmi: number, hoaFees: number): CostAnalysis => {
  const totalLoanCost = loanAmount + totalInterest;
  const insuranceCost = (homeInsurance + pmi) * inputs.loanTerm * 12;
  const taxCost = propertyTax * inputs.loanTerm * 12;
  const feeCost = (hoaFees * inputs.loanTerm * 12) + (inputs.closingCosts || 0);
  
  const costBreakdown = {
    principal: loanAmount,
    interest: totalInterest,
    taxes: taxCost,
    insurance: insuranceCost,
    pmi: pmi * inputs.loanTerm * 12,
    hoa: hoaFees * inputs.loanTerm * 12,
    closingCosts: inputs.closingCosts || 0
  };
  
  const totalCost = totalLoanCost + insuranceCost + taxCost + feeCost;
  const costEfficiency = totalCost / loanAmount < 1.5 ? 'Excellent' : 
                        totalCost / loanAmount < 2.0 ? 'Good' : 
                        totalCost / loanAmount < 2.5 ? 'Fair' : 'Poor';
  
  const savingsOpportunities: string[] = [];
  if (pmi > 0) savingsOpportunities.push('Consider larger down payment to avoid PMI');
  if (inputs.interestRate > 5) savingsOpportunities.push('Shop around for lower interest rates');
  if (hoaFees > 300) savingsOpportunities.push('Consider properties with lower HOA fees');
  if (inputs.closingCosts && inputs.closingCosts > 10000) savingsOpportunities.push('Negotiate closing costs with lender');
  
  return {
    totalLoanCost,
    interestCost: totalInterest,
    insuranceCost,
    taxCost,
    feeCost,
    costBreakdown,
    costEfficiency,
    savingsOpportunities
  };
};

export const generateMortgagePaymentAnalysis = (inputs: MortgagePaymentInputs, outputs: PaymentResult): string => {
  const report = `
# Mortgage Payment Analysis Report

## Summary
- **Loan Amount:** $${inputs.loanAmount.toLocaleString()}
- **Interest Rate:** ${inputs.interestRate}%
- **Loan Term:** ${inputs.loanTerm} years
- **Monthly Payment (P&I):** $${outputs.monthlyPayment.toLocaleString()}
- **Total Monthly Payment:** $${outputs.totalMonthlyPayment.toLocaleString()}

## Payment Breakdown
- **Principal & Interest:** $${outputs.paymentBreakdown.principalAndInterest.toLocaleString()} (${outputs.paymentBreakdown.breakdownPercentages.principalAndInterest.toFixed(1)}%)
- **Property Tax:** $${outputs.paymentBreakdown.propertyTax.toLocaleString()} (${outputs.paymentBreakdown.breakdownPercentages.propertyTax.toFixed(1)}%)
- **Home Insurance:** $${outputs.paymentBreakdown.homeInsurance.toLocaleString()} (${outputs.paymentBreakdown.breakdownPercentages.homeInsurance.toFixed(1)}%)
- **PMI:** $${outputs.paymentBreakdown.pmi.toLocaleString()} (${outputs.paymentBreakdown.breakdownPercentages.pmi.toFixed(1)}%)
- **HOA Fees:** $${outputs.paymentBreakdown.hoaFees.toLocaleString()} (${outputs.paymentBreakdown.breakdownPercentages.hoaFees.toFixed(1)}%)

## Cost Analysis
- **Total Interest Paid:** $${outputs.totalInterest.toLocaleString()}
- **Total Cost:** $${outputs.totalCost.toLocaleString()}
- **Cost Efficiency:** ${outputs.costAnalysis.costEfficiency}

## Affordability Analysis
- **Front-End Ratio:** ${outputs.affordabilityAnalysis.frontEndRatio.toFixed(1)}%
- **Back-End Ratio:** ${outputs.affordabilityAnalysis.backEndRatio.toFixed(1)}%
- **Affordability Status:** ${outputs.affordabilityAnalysis.affordabilityStatus}
- **Recommended Annual Income:** $${outputs.affordabilityAnalysis.recommendedIncome.toLocaleString()}

## Loan Details
- **Loan-to-Value Ratio:** ${outputs.loanToValue.toFixed(1)}%
- **Down Payment Amount:** $${outputs.downPaymentAmount.toLocaleString()}
- **Down Payment Percentage:** ${outputs.downPaymentPercentage.toFixed(1)}%

## Scenario Comparison
${outputs.scenarioComparison.scenarios.map(scenario => 
  `- **${scenario.name}:** $${scenario.monthlyPayment.toLocaleString()}/month, $${scenario.totalInterest.toLocaleString()} total interest`
).join('\n')}

## Recommendations
${outputs.costAnalysis.savingsOpportunities.map(opportunity => `- ${opportunity}`).join('\n')}

## Next Steps
1. Review the amortization schedule to understand payment progression
2. Consider refinancing options if rates improve
3. Evaluate additional payment strategies to reduce total interest
4. Assess property tax and insurance costs in your area
5. Compare with other loan products and lenders
`;

  return report.trim();
};