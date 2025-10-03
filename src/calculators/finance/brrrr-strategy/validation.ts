import { ValidationResult } from '../../../types/calculator';

/**
 * Validate BRRRR strategy calculator inputs
 */
export function validateBRRRRStrategyInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'purchasePrice', 'downPayment', 'purchaseLoanRate', 'purchaseLoanTerm',
    'rehabCost', 'rehabTime', 'afterRepairValue', 'monthlyRent', 'monthlyExpenses',
    'refinanceRate', 'refinanceTerm', 'refinanceLTV'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Purchase price validation
  if (inputs.purchasePrice < 50000) {
    errors.push('Purchase price must be at least $50,000');
  } else if (inputs.purchasePrice > 5000000) {
    errors.push('Purchase price cannot exceed $5 million');
  }

  // Down payment validation
  if (inputs.downPayment < 5000) {
    errors.push('Down payment must be at least $5,000');
  } else if (inputs.downPayment > inputs.purchasePrice) {
    errors.push('Down payment cannot exceed purchase price');
  }

  // Purchase loan rate validation
  if (inputs.purchaseLoanRate < 3) {
    errors.push('Purchase loan rate must be at least 3%');
  } else if (inputs.purchaseLoanRate > 15) {
    errors.push('Purchase loan rate cannot exceed 15%');
  }

  // Purchase loan term validation
  if (inputs.purchaseLoanTerm < 15) {
    errors.push('Purchase loan term must be at least 15 years');
  } else if (inputs.purchaseLoanTerm > 30) {
    errors.push('Purchase loan term cannot exceed 30 years');
  }

  // Rehab cost validation
  if (inputs.rehabCost < 0) {
    errors.push('Rehab cost cannot be negative');
  } else if (inputs.rehabCost > 500000) {
    errors.push('Rehab cost cannot exceed $500,000');
  }

  // Rehab time validation
  if (inputs.rehabTime < 1) {
    errors.push('Rehab time must be at least 1 month');
  } else if (inputs.rehabTime > 24) {
    errors.push('Rehab time cannot exceed 24 months');
  }

  // After repair value validation
  if (inputs.afterRepairValue < 50000) {
    errors.push('After repair value must be at least $50,000');
  } else if (inputs.afterRepairValue > 5000000) {
    errors.push('After repair value cannot exceed $5 million');
  }

  // Monthly rent validation
  if (inputs.monthlyRent < 500) {
    errors.push('Monthly rent must be at least $500');
  } else if (inputs.monthlyRent > 10000) {
    errors.push('Monthly rent cannot exceed $10,000');
  }

  // Monthly expenses validation
  if (inputs.monthlyExpenses < 0) {
    errors.push('Monthly expenses cannot be negative');
  } else if (inputs.monthlyExpenses > 5000) {
    errors.push('Monthly expenses cannot exceed $5,000');
  }

  // Refinance rate validation
  if (inputs.refinanceRate < 3) {
    errors.push('Refinance rate must be at least 3%');
  } else if (inputs.refinanceRate > 12) {
    errors.push('Refinance rate cannot exceed 12%');
  }

  // Refinance term validation
  if (inputs.refinanceTerm < 15) {
    errors.push('Refinance term must be at least 15 years');
  } else if (inputs.refinanceTerm > 30) {
    errors.push('Refinance term cannot exceed 30 years');
  }

  // Refinance LTV validation
  if (inputs.refinanceLTV < 60) {
    errors.push('Refinance LTV must be at least 60%');
  } else if (inputs.refinanceLTV > 85) {
    errors.push('Refinance LTV cannot exceed 85%');
  }

  // Cross-field validation
  const downPaymentPercent = (inputs.downPayment / inputs.purchasePrice) * 100;
  if (downPaymentPercent < 10) {
    warnings.push('Down payment less than 10% may affect loan qualification');
  }

  const rehabToPurchaseRatio = (inputs.rehabCost / inputs.purchasePrice) * 100;
  if (rehabToPurchaseRatio > 50) {
    warnings.push('Rehab costs exceed 50% of purchase price - consider feasibility');
  }

  const arvRatio = inputs.afterRepairValue / inputs.purchasePrice;
  if (arvRatio < 1.1) {
    warnings.push('Low ARV increase may not justify rehab costs');
  } else if (arvRatio > 2.5) {
    warnings.push('Very high ARV increase may be unrealistic');
  }

  // Optional field validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 100000) {
    errors.push('Closing costs cannot exceed $100,000');
  }

  if (inputs.vacancyRate !== undefined && inputs.vacancyRate < 0) {
    errors.push('Vacancy rate cannot be negative');
  } else if (inputs.vacancyRate > 20) {
    errors.push('Vacancy rate cannot exceed 20%');
  }

  if (inputs.propertyManagement !== undefined && inputs.propertyManagement < 0) {
    errors.push('Property management fee cannot be negative');
  } else if (inputs.propertyManagement > 15) {
    errors.push('Property management fee cannot exceed 15%');
  }

  if (inputs.appreciationRate !== undefined && inputs.appreciationRate < -5) {
    errors.push('Appreciation rate cannot be less than -5%');
  } else if (inputs.appreciationRate > 10) {
    errors.push('Appreciation rate cannot exceed 10%');
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate < 0) {
    errors.push('Inflation rate cannot be negative');
  } else if (inputs.inflationRate > 10) {
    errors.push('Inflation rate cannot exceed 10%');
  }

  // Business rule validation
  const totalInvestment = inputs.downPayment + inputs.rehabCost + (inputs.closingCosts || 0);
  if (totalInvestment > 200000) {
    warnings.push('High total investment may limit scalability');
  }

  // Rent-to-value ratio validation
  const annualRent = inputs.monthlyRent * 12;
  const rentToValueRatio = (annualRent / inputs.afterRepairValue) * 100;
  if (rentToValueRatio < 6) {
    warnings.push('Low rent-to-value ratio may indicate poor cash flow');
  } else if (rentToValueRatio > 15) {
    warnings.push('Very high rent-to-value ratio may be unrealistic');
  }

  // Cash flow validation
  const estimatedMonthlyPayment = estimateRefinancePayment(inputs.afterRepairValue, inputs.refinanceLTV, inputs.refinanceRate, inputs.refinanceTerm);
  const estimatedMonthlyCashFlow = inputs.monthlyRent - inputs.monthlyExpenses - estimatedMonthlyPayment;
  
  if (estimatedMonthlyCashFlow < 0) {
    warnings.push('Projected negative monthly cash flow');
  } else if (estimatedMonthlyCashFlow < 200) {
    warnings.push('Low projected monthly cash flow');
  }

  // Refinance feasibility validation
  const refinanceLoanAmount = inputs.afterRepairValue * (inputs.refinanceLTV / 100);
  const purchaseLoanAmount = inputs.purchasePrice - inputs.downPayment;
  const estimatedRemainingBalance = estimateRemainingBalance(purchaseLoanAmount, inputs.purchaseLoanRate, inputs.purchaseLoanTerm, inputs.rehabTime);
  
  if (refinanceLoanAmount <= estimatedRemainingBalance) {
    errors.push('Refinance loan amount must exceed remaining balance on original loan');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Estimate refinance monthly payment
 */
function estimateRefinancePayment(propertyValue: number, ltv: number, rate: number, term: number): number {
  const loanAmount = propertyValue * (ltv / 100);
  const monthlyRate = rate / 100 / 12;
  const totalPayments = term * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, totalPayments);
  return loanAmount * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Estimate remaining balance on original loan
 */
function estimateRemainingBalance(principal: number, annualRate: number, termYears: number, paymentsMade: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  const monthlyPayment = estimateRefinancePayment(principal, 100, annualRate, termYears);
  
  if (monthlyRate === 0) {
    return principal - (monthlyPayment * paymentsMade);
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, paymentsMade);
  return principal * rateFactor - monthlyPayment * (rateFactor - 1) / monthlyRate;
}

/**
 * Validate BRRRR strategy feasibility
 */
export function validateBRRRRFeasibility(
  purchasePrice: number,
  downPayment: number,
  rehabCost: number,
  afterRepairValue: number,
  monthlyRent: number,
  monthlyExpenses: number,
  refinanceLTV: number,
  refinanceRate: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Total investment check
  const totalInvestment = downPayment + rehabCost;
  if (totalInvestment > 100000) {
    warnings.push('High investment requirement may limit scalability');
  }

  // ARV to purchase price ratio
  const arvRatio = afterRepairValue / purchasePrice;
  if (arvRatio < 1.15) {
    warnings.push('Low ARV increase may not justify rehab costs');
  }

  // Cash flow check
  const refinanceLoanAmount = afterRepairValue * (refinanceLTV / 100);
  const refinanceMonthlyPayment = estimateRefinancePayment(afterRepairValue, refinanceLTV, refinanceRate, 30);
  const monthlyCashFlow = monthlyRent - monthlyExpenses - refinanceMonthlyPayment;
  
  if (monthlyCashFlow < 0) {
    errors.push('Projected negative cash flow makes BRRRR unfeasible');
  } else if (monthlyCashFlow < 100) {
    warnings.push('Very low cash flow may not justify investment');
  }

  // Cash-on-cash return check
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  
  if (cashOnCashReturn < 6) {
    warnings.push('Low cash-on-cash return may not justify investment');
  }

  // Equity extraction check
  const purchaseLoanAmount = purchasePrice - downPayment;
  const refinanceProceeds = refinanceLoanAmount - purchaseLoanAmount;
  const equityExtracted = (refinanceProceeds / totalInvestment) * 100;
  
  if (equityExtracted < 50) {
    warnings.push('Low equity extraction may limit portfolio growth');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate market assumptions
 */
export function validateMarketAssumptions(
  purchasePrice: number,
  afterRepairValue: number,
  monthlyRent: number,
  appreciationRate: number,
  marketType: string = 'normal'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ARV assumptions
  const arvIncrease = ((afterRepairValue - purchasePrice) / purchasePrice) * 100;
  
  switch (marketType.toLowerCase()) {
    case 'hot':
      if (arvIncrease < 20) {
        warnings.push('Hot market may support higher ARV increases');
      }
      break;
    case 'slow':
      if (arvIncrease > 30) {
        warnings.push('Slow market may not support high ARV increases');
      }
      break;
    case 'declining':
      if (arvIncrease > 20) {
        warnings.push('Declining market may not support ARV increases');
      }
      break;
  }

  // Rent assumptions
  const annualRent = monthlyRent * 12;
  const rentToValueRatio = (annualRent / afterRepairValue) * 100;
  
  if (rentToValueRatio < 6) {
    warnings.push('Low rent-to-value ratio may indicate overvaluation');
  } else if (rentToValueRatio > 12) {
    warnings.push('High rent-to-value ratio may be unsustainable');
  }

  // Appreciation assumptions
  if (appreciationRate > 5) {
    warnings.push('High appreciation rate may not be sustainable long-term');
  } else if (appreciationRate < 0) {
    warnings.push('Negative appreciation may affect long-term returns');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate financing assumptions
 */
export function validateFinancingAssumptions(
  purchaseLoanRate: number,
  refinanceRate: number,
  refinanceLTV: number,
  creditScore: number = 720
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rate spread validation
  const rateSpread = purchaseLoanRate - refinanceRate;
  if (rateSpread < 0.5) {
    warnings.push('Small rate spread may not justify refinance costs');
  } else if (rateSpread > 3) {
    warnings.push('Large rate spread may indicate unrealistic assumptions');
  }

  // LTV validation
  if (refinanceLTV > 80) {
    warnings.push('High LTV may require PMI or affect qualification');
  }

  // Credit score considerations
  if (creditScore < 680) {
    warnings.push('Lower credit score may affect refinance qualification');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
