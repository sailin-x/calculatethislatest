import { TaxInputs, TaxOutputs, TaxMetrics, TaxBracket, IncomeBreakdown, DeductionBreakdown, TaxAnalysis, TaxPlanning, TaxPlanningScenario } from './types';

export function calculateTax(inputs: TaxInputs): TaxOutputs {
  // Calculate key metrics
  const metrics = calculateTaxMetrics(inputs);

  // Generate tax brackets
  const taxBrackets = generateTaxBrackets(inputs, metrics);

  // Generate income breakdown
  const incomeBreakdown = generateIncomeBreakdown(inputs, metrics);

  // Generate deduction breakdown
  const deductionBreakdown = generateDeductionBreakdown(inputs, metrics);

  // Generate tax analysis
  const taxAnalysis = generateTaxAnalysis(inputs, metrics);

  // Generate tax planning
  const taxPlanning = generateTaxPlanning(inputs, metrics);

  // Generate tax planning scenarios
  const taxPlanningScenarios = generateTaxPlanningScenarios(inputs, metrics);

  return {
    metrics,
    taxBrackets,
    incomeBreakdown,
    deductionBreakdown,
    taxAnalysis,
    taxPlanning,
    taxPlanningScenarios
  };
}

export function calculateTaxMetrics(inputs: TaxInputs): TaxMetrics {
  // Calculate total income
  const totalIncome = inputs.wages + inputs.selfEmploymentIncome + inputs.interestIncome + 
                     inputs.dividendIncome + inputs.capitalGains + inputs.rentalIncome + 
                     inputs.businessIncome + inputs.otherIncome;

  // Calculate adjusted gross income (AGI)
  const adjustedGrossIncome = totalIncome;

  // Calculate deductions
  const totalDeductions = inputs.useStandardDeduction ? inputs.standardDeduction : inputs.itemizedDeductions;

  // Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

  // Calculate federal tax
  const federalTax = calculateFederalTax(taxableIncome, inputs.filingStatus, inputs.taxYear);

  // Calculate state tax
  const stateTax = calculateStateTax(taxableIncome, inputs.stateTaxRate);

  // Calculate total tax
  const totalTax = federalTax + stateTax;

  // Calculate credits
  const totalCredits = inputs.childTaxCredit + inputs.earnedIncomeCredit + 
                      inputs.educationCredits + inputs.retirementSavingsCredit + inputs.otherCredits;

  // Calculate payments
  const totalPayments = inputs.federalWithholding + inputs.estimatedTaxPayments + 
                       inputs.priorYearOverpayment + inputs.otherPayments + inputs.stateWithholding;

  // Calculate tax due or refund
  const taxDue = totalTax - totalCredits - totalPayments;

  // Calculate effective tax rate
  const effectiveTaxRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

  // Calculate marginal tax rate
  const marginalTaxRate = calculateMarginalTaxRate(taxableIncome, inputs.filingStatus, inputs.taxYear);

  return {
    totalIncome,
    adjustedGrossIncome,
    totalDeductions,
    taxableIncome,
    federalTax,
    stateTax,
    totalTax,
    totalCredits,
    totalPayments,
    taxDue,
    effectiveTaxRate,
    marginalTaxRate
  };
}

function generateTaxBrackets(inputs: TaxInputs, metrics: TaxMetrics): TaxBracket[] {
  const brackets = getTaxBrackets(inputs.filingStatus, inputs.taxYear);
  const taxBrackets: TaxBracket[] = [];
  let remainingIncome = metrics.taxableIncome;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const previousMax = i > 0 ? brackets[i - 1].max : 0;
    const bracketAmount = Math.min(remainingIncome, bracket.max - previousMax);
    
    if (bracketAmount > 0) {
      const tax = bracketAmount * bracket.rate;
      taxBrackets.push({
        rate: bracket.rate * 100,
        min: previousMax,
        max: bracket.max,
        amount: bracketAmount,
        tax
      });
      remainingIncome -= bracketAmount;
    }
    
    if (remainingIncome <= 0) break;
  }

  return taxBrackets;
}

function generateIncomeBreakdown(inputs: TaxInputs, metrics: TaxMetrics): IncomeBreakdown[] {
  const breakdown: IncomeBreakdown[] = [];

  if (inputs.wages > 0) {
    breakdown.push({
      category: 'Wages and Salaries',
      amount: inputs.wages,
      percentage: (inputs.wages / metrics.totalIncome) * 100,
      description: 'Employment income subject to withholding'
    });
  }

  if (inputs.selfEmploymentIncome > 0) {
    breakdown.push({
      category: 'Self-Employment Income',
      amount: inputs.selfEmploymentIncome,
      percentage: (inputs.selfEmploymentIncome / metrics.totalIncome) * 100,
      description: 'Business income subject to self-employment tax'
    });
  }

  if (inputs.interestIncome > 0) {
    breakdown.push({
      category: 'Interest Income',
      amount: inputs.interestIncome,
      percentage: (inputs.interestIncome / metrics.totalIncome) * 100,
      description: 'Interest from savings, bonds, and other investments'
    });
  }

  if (inputs.dividendIncome > 0) {
    breakdown.push({
      category: 'Dividend Income',
      amount: inputs.dividendIncome,
      percentage: (inputs.dividendIncome / metrics.totalIncome) * 100,
      description: 'Dividends from stocks and mutual funds'
    });
  }

  if (inputs.capitalGains > 0) {
    breakdown.push({
      category: 'Capital Gains',
      amount: inputs.capitalGains,
      percentage: (inputs.capitalGains / metrics.totalIncome) * 100,
      description: 'Gains from sale of investments or property'
    });
  }

  if (inputs.rentalIncome > 0) {
    breakdown.push({
      category: 'Rental Income',
      amount: inputs.rentalIncome,
      percentage: (inputs.rentalIncome / metrics.totalIncome) * 100,
      description: 'Income from rental properties'
    });
  }

  if (inputs.businessIncome > 0) {
    breakdown.push({
      category: 'Business Income',
      amount: inputs.businessIncome,
      percentage: (inputs.businessIncome / metrics.totalIncome) * 100,
      description: 'Income from business activities'
    });
  }

  if (inputs.otherIncome > 0) {
    breakdown.push({
      category: 'Other Income',
      amount: inputs.otherIncome,
      percentage: (inputs.otherIncome / metrics.totalIncome) * 100,
      description: 'Other miscellaneous income'
    });
  }

  return breakdown;
}

function generateDeductionBreakdown(inputs: TaxInputs, metrics: TaxMetrics): DeductionBreakdown[] {
  const breakdown: DeductionBreakdown[] = [];

  if (inputs.useStandardDeduction) {
    breakdown.push({
      category: 'Standard Deduction',
      amount: inputs.standardDeduction,
      percentage: 100,
      description: 'Standard deduction based on filing status'
    });
  } else {
    if (inputs.stateLocalTaxes > 0) {
      breakdown.push({
        category: 'State and Local Taxes',
        amount: inputs.stateLocalTaxes,
        percentage: (inputs.stateLocalTaxes / metrics.totalDeductions) * 100,
        description: 'State and local income and property taxes (limited to $10,000)'
      });
    }

    if (inputs.mortgageInterest > 0) {
      breakdown.push({
        category: 'Mortgage Interest',
        amount: inputs.mortgageInterest,
        percentage: (inputs.mortgageInterest / metrics.totalDeductions) * 100,
        description: 'Home mortgage interest deduction'
      });
    }

    if (inputs.charitableContributions > 0) {
      breakdown.push({
        category: 'Charitable Contributions',
        amount: inputs.charitableContributions,
        percentage: (inputs.charitableContributions / metrics.totalDeductions) * 100,
        description: 'Charitable donations to qualified organizations'
      });
    }

    if (inputs.medicalExpenses > 0) {
      breakdown.push({
        category: 'Medical Expenses',
        amount: inputs.medicalExpenses,
        percentage: (inputs.medicalExpenses / metrics.totalDeductions) * 100,
        description: 'Medical expenses exceeding 7.5% of AGI'
      });
    }

    if (inputs.otherItemizedDeductions > 0) {
      breakdown.push({
        category: 'Other Itemized Deductions',
        amount: inputs.otherItemizedDeductions,
        percentage: (inputs.otherItemizedDeductions / metrics.totalDeductions) * 100,
        description: 'Other miscellaneous itemized deductions'
      });
    }
  }

  return breakdown;
}

function generateTaxAnalysis(inputs: TaxInputs, metrics: TaxMetrics): TaxAnalysis {
  // Determine tax efficiency
  let taxEfficiency: 'high' | 'medium' | 'low';
  if (metrics.effectiveTaxRate <= 15) {
    taxEfficiency = 'high';
  } else if (metrics.effectiveTaxRate <= 25) {
    taxEfficiency = 'medium';
  } else {
    taxEfficiency = 'low';
  }

  // Determine tax burden
  let taxBurden: 'low' | 'medium' | 'high';
  if (metrics.effectiveTaxRate <= 20) {
    taxBurden = 'low';
  } else if (metrics.effectiveTaxRate <= 30) {
    taxBurden = 'medium';
  } else {
    taxBurden = 'high';
  }

  // Generate optimization opportunities
  const optimizationOpportunities: string[] = [];
  
  if (inputs.useStandardDeduction && inputs.itemizedDeductions > inputs.standardDeduction) {
    optimizationOpportunities.push('Consider itemizing deductions instead of using standard deduction');
  }

  if (inputs.retirementContribution < 6000) {
    optimizationOpportunities.push('Increase retirement contributions to reduce taxable income');
  }

  if (inputs.hsaContribution < 3650) {
    optimizationOpportunities.push('Consider contributing to an HSA for additional tax savings');
  }

  if (inputs.charitableContributions === 0) {
    optimizationOpportunities.push('Consider charitable contributions for additional deductions');
  }

  if (metrics.effectiveTaxRate > 25) {
    optimizationOpportunities.push('Consider tax-loss harvesting to offset capital gains');
  }

  // Generate recommendations
  const recommendations: string[] = [];
  
  recommendations.push('Review withholding to ensure proper tax payments throughout the year');
  recommendations.push('Consider estimated tax payments if you have significant non-wage income');
  recommendations.push('Keep detailed records of all deductions and credits');
  recommendations.push('Consult with a tax professional for complex situations');

  if (metrics.taxDue > 1000) {
    recommendations.push('Increase withholding or estimated payments to avoid penalties');
  }

  if (Math.abs(metrics.taxDue) > 2000) {
    recommendations.push('Adjust withholding to get closer to zero tax due/refund');
  }

  return {
    taxEfficiency,
    taxBurden,
    optimizationOpportunities,
    recommendations
  };
}

function generateTaxPlanning(inputs: TaxInputs, metrics: TaxMetrics): TaxPlanning {
  // Generate deduction strategies
  const deductionStrategies: string[] = [];
  
  if (inputs.useStandardDeduction) {
    deductionStrategies.push('Bunch itemized deductions in alternating years to exceed standard deduction');
    deductionStrategies.push('Consider prepaying state and local taxes before year-end');
    deductionStrategies.push('Make charitable contributions in high-income years');
  }

  if (inputs.retirementContribution < 6000) {
    deductionStrategies.push('Maximize traditional IRA or 401(k) contributions');
    deductionStrategies.push('Consider catch-up contributions if over age 50');
  }

  if (inputs.selfEmploymentIncome > 0) {
    deductionStrategies.push('Deduct business expenses to reduce self-employment income');
    deductionStrategies.push('Consider establishing a retirement plan for the business');
  }

  // Generate credit opportunities
  const creditOpportunities: string[] = [];
  
  if (inputs.dependents > 0) {
    creditOpportunities.push('Claim Child Tax Credit for qualifying dependents');
    creditOpportunities.push('Consider Child and Dependent Care Credit for work-related expenses');
  }

  if (inputs.wages < 50000) {
    creditOpportunities.push('Check eligibility for Earned Income Tax Credit');
  }

  if (inputs.educationCredits === 0) {
    creditOpportunities.push('Consider education credits for qualified education expenses');
  }

  if (inputs.retirementContribution > 0 && inputs.wages < 40000) {
    creditOpportunities.push('Check eligibility for Retirement Savings Contributions Credit');
  }

  // Generate retirement planning
  const retirementPlanning: string[] = [];
  
  retirementPlanning.push('Contribute to traditional retirement accounts to reduce current tax liability');
  retirementPlanning.push('Consider Roth accounts for tax-free withdrawals in retirement');
  retirementPlanning.push('Plan for required minimum distributions after age 72');
  retirementPlanning.push('Coordinate Social Security benefits with other retirement income');

  return {
    deductionStrategies,
    creditOpportunities,
    retirementPlanning
  };
}

function generateTaxPlanningScenarios(inputs: TaxInputs, metrics: TaxMetrics): TaxPlanningScenario[] {
  const scenarios: TaxPlanningScenario[] = [];

  // Current scenario
  scenarios.push({
    name: 'Current Situation',
    taxableIncome: metrics.taxableIncome,
    federalTax: metrics.federalTax,
    stateTax: metrics.stateTax,
    totalTax: metrics.totalTax,
    taxSavings: 0
  });

  // Increased retirement contribution scenario
  const additionalRetirementContribution = Math.min(6000 - inputs.retirementContribution, 2000);
  if (additionalRetirementContribution > 0) {
    const newTaxableIncome = metrics.taxableIncome - additionalRetirementContribution;
    const newFederalTax = calculateFederalTax(newTaxableIncome, inputs.filingStatus, inputs.taxYear);
    const newStateTax = calculateStateTax(newTaxableIncome, inputs.stateTaxRate);
    const newTotalTax = newFederalTax + newStateTax;
    const taxSavings = metrics.totalTax - newTotalTax;

    scenarios.push({
      name: `Increase Retirement Contribution by ${formatCurrency(additionalRetirementContribution)}`,
      taxableIncome: newTaxableIncome,
      federalTax: newFederalTax,
      stateTax: newStateTax,
      totalTax: newTotalTax,
      taxSavings
    });
  }

  // Itemized deductions scenario
  if (inputs.useStandardDeduction && inputs.itemizedDeductions > inputs.standardDeduction) {
    const newTaxableIncome = metrics.taxableIncome - (inputs.itemizedDeductions - inputs.standardDeduction);
    const newFederalTax = calculateFederalTax(newTaxableIncome, inputs.filingStatus, inputs.taxYear);
    const newStateTax = calculateStateTax(newTaxableIncome, inputs.stateTaxRate);
    const newTotalTax = newFederalTax + newStateTax;
    const taxSavings = metrics.totalTax - newTotalTax;

    scenarios.push({
      name: 'Use Itemized Deductions',
      taxableIncome: newTaxableIncome,
      federalTax: newFederalTax,
      stateTax: newStateTax,
      totalTax: newTotalTax,
      taxSavings
    });
  }

  // HSA contribution scenario
  if (inputs.hasHSAAccount && inputs.hsaContribution < 3650) {
    const additionalHSAContribution = Math.min(3650 - inputs.hsaContribution, 1000);
    const newTaxableIncome = metrics.taxableIncome - additionalHSAContribution;
    const newFederalTax = calculateFederalTax(newTaxableIncome, inputs.filingStatus, inputs.taxYear);
    const newStateTax = calculateStateTax(newTaxableIncome, inputs.stateTaxRate);
    const newTotalTax = newFederalTax + newStateTax;
    const taxSavings = metrics.totalTax - newTotalTax;

    scenarios.push({
      name: `Increase HSA Contribution by ${formatCurrency(additionalHSAContribution)}`,
      taxableIncome: newTaxableIncome,
      federalTax: newFederalTax,
      stateTax: newStateTax,
      totalTax: newTotalTax,
      taxSavings
    });
  }

  return scenarios;
}

// Helper functions
function calculateFederalTax(taxableIncome: number, filingStatus: string, taxYear: number): number {
  const brackets = getTaxBrackets(filingStatus, taxYear);
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const previousMax = i > 0 ? brackets[i - 1].max : 0;
    const bracketAmount = Math.min(remainingIncome, bracket.max - previousMax);
    
    if (bracketAmount > 0) {
      tax += bracketAmount * bracket.rate;
      remainingIncome -= bracketAmount;
    }
    
    if (remainingIncome <= 0) break;
  }

  return tax;
}

function calculateStateTax(taxableIncome: number, stateTaxRate: number): number {
  return taxableIncome * (stateTaxRate / 100);
}

function calculateMarginalTaxRate(taxableIncome: number, filingStatus: string, taxYear: number): number {
  const brackets = getTaxBrackets(filingStatus, taxYear);
  
  for (let i = 0; i < brackets.length; i++) {
    if (taxableIncome <= brackets[i].max) {
      return brackets[i].rate * 100;
    }
  }
  
  return brackets[brackets.length - 1].rate * 100;
}

function getTaxBrackets(filingStatus: string, taxYear: number): Array<{rate: number, max: number}> {
  // 2024 tax brackets
  if (taxYear === 2024) {
    if (filingStatus === 'single') {
      return [
        { rate: 0.10, max: 11600 },
        { rate: 0.12, max: 47150 },
        { rate: 0.22, max: 100525 },
        { rate: 0.24, max: 191950 },
        { rate: 0.32, max: 243725 },
        { rate: 0.35, max: 609350 },
        { rate: 0.37, max: Infinity }
      ];
    } else if (filingStatus === 'married-filing-jointly') {
      return [
        { rate: 0.10, max: 23200 },
        { rate: 0.12, max: 94300 },
        { rate: 0.22, max: 201050 },
        { rate: 0.24, max: 383900 },
        { rate: 0.32, max: 487450 },
        { rate: 0.35, max: 731200 },
        { rate: 0.37, max: Infinity }
      ];
    } else if (filingStatus === 'head-of-household') {
      return [
        { rate: 0.10, max: 16550 },
        { rate: 0.12, max: 63100 },
        { rate: 0.22, max: 100500 },
        { rate: 0.24, max: 191950 },
        { rate: 0.32, max: 243725 },
        { rate: 0.35, max: 609350 },
        { rate: 0.37, max: Infinity }
      ];
    }
  }

  // Default to single filing status
  return [
    { rate: 0.10, max: 11600 },
    { rate: 0.12, max: 47150 },
    { rate: 0.22, max: 100525 },
    { rate: 0.24, max: 191950 },
    { rate: 0.32, max: 243725 },
    { rate: 0.35, max: 609350 },
    { rate: 0.37, max: Infinity }
  ];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}