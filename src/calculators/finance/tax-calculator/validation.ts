import { TaxInputs, TaxOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateTaxInputs(inputs: TaxInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Personal Information
  if (inputs.filingStatus && !['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household', 'qualifying-widow'].includes(inputs.filingStatus)) {
    errors.filingStatus = 'Invalid filing status';
  }

  if (inputs.taxYear && (inputs.taxYear < 2020 || inputs.taxYear > 2030)) {
    errors.taxYear = 'Tax year must be between 2020 and 2030';
  }

  if (inputs.dependents < 0 || inputs.dependents > 20) {
    errors.dependents = 'Number of dependents must be between 0 and 20';
  }

  // Income Validation
  if (inputs.wages < 0) {
    errors.wages = 'Wages cannot be negative';
  }

  if (inputs.selfEmploymentIncome < 0) {
    errors.selfEmploymentIncome = 'Self-employment income cannot be negative';
  }

  if (inputs.interestIncome < 0) {
    errors.interestIncome = 'Interest income cannot be negative';
  }

  if (inputs.dividendIncome < 0) {
    errors.dividendIncome = 'Dividend income cannot be negative';
  }

  if (inputs.capitalGains < 0) {
    errors.capitalGains = 'Capital gains cannot be negative';
  }

  if (inputs.rentalIncome < 0) {
    errors.rentalIncome = 'Rental income cannot be negative';
  }

  if (inputs.businessIncome < 0) {
    errors.businessIncome = 'Business income cannot be negative';
  }

  if (inputs.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  }

  // Deductions Validation
  if (inputs.standardDeduction < 0) {
    errors.standardDeduction = 'Standard deduction cannot be negative';
  }

  if (inputs.itemizedDeductions < 0) {
    errors.itemizedDeductions = 'Itemized deductions cannot be negative';
  }

  if (!inputs.useStandardDeduction) {
    if (inputs.stateLocalTaxes < 0) {
      errors.stateLocalTaxes = 'State and local taxes cannot be negative';
    }

    if (inputs.stateLocalTaxes > 10000) {
      errors.stateLocalTaxes = 'State and local taxes are limited to $10,000';
    }

    if (inputs.mortgageInterest < 0) {
      errors.mortgageInterest = 'Mortgage interest cannot be negative';
    }

    if (inputs.charitableContributions < 0) {
      errors.charitableContributions = 'Charitable contributions cannot be negative';
    }

    if (inputs.medicalExpenses < 0) {
      errors.medicalExpenses = 'Medical expenses cannot be negative';
    }

    if (inputs.otherItemizedDeductions < 0) {
      errors.otherItemizedDeductions = 'Other itemized deductions cannot be negative';
    }
  }

  // Credits Validation
  if (inputs.childTaxCredit < 0) {
    errors.childTaxCredit = 'Child tax credit cannot be negative';
  }

  if (inputs.earnedIncomeCredit < 0) {
    errors.earnedIncomeCredit = 'Earned income credit cannot be negative';
  }

  if (inputs.educationCredits < 0) {
    errors.educationCredits = 'Education credits cannot be negative';
  }

  if (inputs.retirementSavingsCredit < 0) {
    errors.retirementSavingsCredit = 'Retirement savings credit cannot be negative';
  }

  if (inputs.otherCredits < 0) {
    errors.otherCredits = 'Other credits cannot be negative';
  }

  // Payments Validation
  if (inputs.federalWithholding < 0) {
    errors.federalWithholding = 'Federal withholding cannot be negative';
  }

  if (inputs.estimatedTaxPayments < 0) {
    errors.estimatedTaxPayments = 'Estimated tax payments cannot be negative';
  }

  if (inputs.priorYearOverpayment < 0) {
    errors.priorYearOverpayment = 'Prior year overpayment cannot be negative';
  }

  if (inputs.otherPayments < 0) {
    errors.otherPayments = 'Other payments cannot be negative';
  }

  if (inputs.stateWithholding < 0) {
    errors.stateWithholding = 'State withholding cannot be negative';
  }

  // State Information
  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 15%';
  }

  // Retirement and HSA
  if (inputs.retirementContribution < 0) {
    errors.retirementContribution = 'Retirement contribution cannot be negative';
  }

  if (inputs.retirementContribution > 7000) {
    errors.retirementContribution = 'Retirement contribution exceeds maximum limit';
  }

  if (inputs.hsaContribution < 0) {
    errors.hsaContribution = 'HSA contribution cannot be negative';
  }

  if (inputs.hsaContribution > 4150) {
    errors.hsaContribution = 'HSA contribution exceeds maximum limit';
  }

  // Business Logic Validation
  const totalIncome = inputs.wages + inputs.selfEmploymentIncome + inputs.interestIncome + 
                     inputs.dividendIncome + inputs.capitalGains + inputs.rentalIncome + 
                     inputs.businessIncome + inputs.otherIncome;

  if (totalIncome > 10000000) {
    errors.totalIncome = 'Total income seems unusually high, please verify';
  }

  if (inputs.useStandardDeduction && inputs.itemizedDeductions > 0) {
    errors.deductionChoice = 'Cannot have itemized deductions when using standard deduction';
  }

  if (!inputs.useStandardDeduction && inputs.itemizedDeductions === 0) {
    errors.itemizedDeductions = 'Itemized deductions must be greater than 0 when not using standard deduction';
  }

  if (inputs.hasHSAAccount && inputs.hsaContribution === 0) {
    errors.hsaContribution = 'HSA contribution should be greater than 0 if you have an HSA account';
  }

  if (!inputs.hasHSAAccount && inputs.hsaContribution > 0) {
    errors.hsaContribution = 'Cannot contribute to HSA without an HSA account';
  }

  // Credit Eligibility Validation
  if (inputs.childTaxCredit > 0 && inputs.dependents === 0) {
    errors.childTaxCredit = 'Cannot claim child tax credit without dependents';
  }

  if (inputs.earnedIncomeCredit > 0 && totalIncome > 60000) {
    errors.earnedIncomeCredit = 'Earned income credit not available for high-income taxpayers';
  }

  if (inputs.retirementSavingsCredit > 0 && totalIncome > 40000) {
    errors.retirementSavingsCredit = 'Retirement savings credit not available for high-income taxpayers';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateTaxOutputs(outputs: TaxOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Metrics Validation
  if (outputs.metrics.totalIncome < 0) {
    errors.totalIncome = 'Total income cannot be negative';
  }

  if (outputs.metrics.adjustedGrossIncome < 0) {
    errors.adjustedGrossIncome = 'Adjusted gross income cannot be negative';
  }

  if (outputs.metrics.totalDeductions < 0) {
    errors.totalDeductions = 'Total deductions cannot be negative';
  }

  if (outputs.metrics.taxableIncome < 0) {
    errors.taxableIncome = 'Taxable income cannot be negative';
  }

  if (outputs.metrics.federalTax < 0) {
    errors.federalTax = 'Federal tax cannot be negative';
  }

  if (outputs.metrics.stateTax < 0) {
    errors.stateTax = 'State tax cannot be negative';
  }

  if (outputs.metrics.totalTax < 0) {
    errors.totalTax = 'Total tax cannot be negative';
  }

  if (outputs.metrics.totalCredits < 0) {
    errors.totalCredits = 'Total credits cannot be negative';
  }

  if (outputs.metrics.totalPayments < 0) {
    errors.totalPayments = 'Total payments cannot be negative';
  }

  if (outputs.metrics.effectiveTaxRate < 0 || outputs.metrics.effectiveTaxRate > 100) {
    errors.effectiveTaxRate = 'Effective tax rate must be between 0% and 100%';
  }

  if (outputs.metrics.marginalTaxRate < 0 || outputs.metrics.marginalTaxRate > 100) {
    errors.marginalTaxRate = 'Marginal tax rate must be between 0% and 100%';
  }

  // Business Logic Validation
  if (outputs.metrics.adjustedGrossIncome !== outputs.metrics.totalIncome) {
    errors.agiCalculation = 'Adjusted gross income should equal total income for this calculation';
  }

  if (outputs.metrics.taxableIncome > outputs.metrics.adjustedGrossIncome) {
    errors.taxableIncome = 'Taxable income cannot exceed adjusted gross income';
  }

  if (outputs.metrics.totalTax !== outputs.metrics.federalTax + outputs.metrics.stateTax) {
    errors.totalTax = 'Total tax should equal federal tax plus state tax';
  }

  if (Math.abs(outputs.metrics.effectiveTaxRate - (outputs.metrics.totalTax / outputs.metrics.totalIncome) * 100) > 0.01) {
    errors.effectiveTaxRate = 'Effective tax rate calculation appears incorrect';
  }

  // Tax Brackets Validation
  if (outputs.taxBrackets.length === 0) {
    errors.taxBrackets = 'Tax brackets array cannot be empty';
  }

  let totalBracketTax = 0;
  let totalBracketAmount = 0;

  for (const bracket of outputs.taxBrackets) {
    if (bracket.rate < 0 || bracket.rate > 100) {
      errors.taxBracketRate = 'Tax bracket rate must be between 0% and 100%';
    }

    if (bracket.min < 0) {
      errors.taxBracketMin = 'Tax bracket minimum cannot be negative';
    }

    if (bracket.max <= bracket.min) {
      errors.taxBracketMax = 'Tax bracket maximum must be greater than minimum';
    }

    if (bracket.amount < 0) {
      errors.taxBracketAmount = 'Tax bracket amount cannot be negative';
    }

    if (bracket.tax < 0) {
      errors.taxBracketTax = 'Tax bracket tax cannot be negative';
    }

    if (Math.abs(bracket.tax - bracket.amount * (bracket.rate / 100)) > 0.01) {
      errors.taxBracketCalculation = 'Tax bracket calculation appears incorrect';
    }

    totalBracketTax += bracket.tax;
    totalBracketAmount += bracket.amount;
  }

  if (Math.abs(totalBracketTax - outputs.metrics.federalTax) > 0.01) {
    errors.taxBracketTotal = 'Sum of tax bracket taxes should equal federal tax';
  }

  if (Math.abs(totalBracketAmount - outputs.metrics.taxableIncome) > 0.01) {
    errors.taxBracketAmount = 'Sum of tax bracket amounts should equal taxable income';
  }

  // Income Breakdown Validation
  if (outputs.incomeBreakdown.length === 0) {
    errors.incomeBreakdown = 'Income breakdown array cannot be empty';
  }

  let totalBreakdownAmount = 0;
  let totalBreakdownPercentage = 0;

  for (const breakdown of outputs.incomeBreakdown) {
    if (breakdown.amount < 0) {
      errors.incomeBreakdownAmount = 'Income breakdown amount cannot be negative';
    }

    if (breakdown.percentage < 0 || breakdown.percentage > 100) {
      errors.incomeBreakdownPercentage = 'Income breakdown percentage must be between 0% and 100%';
    }

    totalBreakdownAmount += breakdown.amount;
    totalBreakdownPercentage += breakdown.percentage;
  }

  if (Math.abs(totalBreakdownAmount - outputs.metrics.totalIncome) > 0.01) {
    errors.incomeBreakdownTotal = 'Sum of income breakdown amounts should equal total income';
  }

  if (Math.abs(totalBreakdownPercentage - 100) > 0.01) {
    errors.incomeBreakdownPercentage = 'Sum of income breakdown percentages should equal 100%';
  }

  // Deduction Breakdown Validation
  if (outputs.deductionBreakdown.length === 0) {
    errors.deductionBreakdown = 'Deduction breakdown array cannot be empty';
  }

  let totalDeductionAmount = 0;
  let totalDeductionPercentage = 0;

  for (const breakdown of outputs.deductionBreakdown) {
    if (breakdown.amount < 0) {
      errors.deductionBreakdownAmount = 'Deduction breakdown amount cannot be negative';
    }

    if (breakdown.percentage < 0 || breakdown.percentage > 100) {
      errors.deductionBreakdownPercentage = 'Deduction breakdown percentage must be between 0% and 100%';
    }

    totalDeductionAmount += breakdown.amount;
    totalDeductionPercentage += breakdown.percentage;
  }

  if (Math.abs(totalDeductionAmount - outputs.metrics.totalDeductions) > 0.01) {
    errors.deductionBreakdownTotal = 'Sum of deduction breakdown amounts should equal total deductions';
  }

  if (Math.abs(totalDeductionPercentage - 100) > 0.01) {
    errors.deductionBreakdownPercentage = 'Sum of deduction breakdown percentages should equal 100%';
  }

  // Tax Analysis Validation
  if (!['high', 'medium', 'low'].includes(outputs.taxAnalysis.taxEfficiency)) {
    errors.taxEfficiency = 'Tax efficiency must be high, medium, or low';
  }

  if (!['low', 'medium', 'high'].includes(outputs.taxAnalysis.taxBurden)) {
    errors.taxBurden = 'Tax burden must be low, medium, or high';
  }

  if (outputs.taxAnalysis.optimizationOpportunities.length === 0) {
    errors.optimizationOpportunities = 'Optimization opportunities array cannot be empty';
  }

  if (outputs.taxAnalysis.recommendations.length === 0) {
    errors.recommendations = 'Recommendations array cannot be empty';
  }

  // Tax Planning Validation
  if (outputs.taxPlanning.deductionStrategies.length === 0) {
    errors.deductionStrategies = 'Deduction strategies array cannot be empty';
  }

  if (outputs.taxPlanning.creditOpportunities.length === 0) {
    errors.creditOpportunities = 'Credit opportunities array cannot be empty';
  }

  if (outputs.taxPlanning.retirementPlanning.length === 0) {
    errors.retirementPlanning = 'Retirement planning array cannot be empty';
  }

  // Tax Planning Scenarios Validation
  if (outputs.taxPlanningScenarios.length === 0) {
    errors.taxPlanningScenarios = 'Tax planning scenarios array cannot be empty';
  }

  for (const scenario of outputs.taxPlanningScenarios) {
    if (scenario.taxableIncome < 0) {
      errors.scenarioTaxableIncome = 'Scenario taxable income cannot be negative';
    }

    if (scenario.federalTax < 0) {
      errors.scenarioFederalTax = 'Scenario federal tax cannot be negative';
    }

    if (scenario.stateTax < 0) {
      errors.scenarioStateTax = 'Scenario state tax cannot be negative';
    }

    if (scenario.totalTax < 0) {
      errors.scenarioTotalTax = 'Scenario total tax cannot be negative';
    }

    if (scenario.taxSavings < 0) {
      errors.scenarioTaxSavings = 'Scenario tax savings cannot be negative';
    }

    if (Math.abs(scenario.totalTax - scenario.federalTax - scenario.stateTax) > 0.01) {
      errors.scenarioTotalTax = 'Scenario total tax should equal federal tax plus state tax';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}