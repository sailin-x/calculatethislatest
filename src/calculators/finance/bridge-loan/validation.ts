import { ValidationResult } from '../../../types/calculator';

/**
 * Validate bridge loan calculator inputs
 */
export function validateBridgeLoanInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'currentHomeValue', 'currentMortgageBalance', 'newHomePrice', 'downPayment',
    'bridgeLoanAmount', 'bridgeLoanRate', 'bridgeLoanTerm', 'expectedSalePrice', 'expectedSaleTime'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Current home value validation
  if (inputs.currentHomeValue < 50000) {
    errors.push('Current home value must be at least $50,000');
  } else if (inputs.currentHomeValue > 10000000) {
    errors.push('Current home value cannot exceed $10 million');
  }

  // Current mortgage balance validation
  if (inputs.currentMortgageBalance < 0) {
    errors.push('Current mortgage balance cannot be negative');
  } else if (inputs.currentMortgageBalance > inputs.currentHomeValue) {
    errors.push('Current mortgage balance cannot exceed current home value');
  }

  // New home price validation
  if (inputs.newHomePrice < 50000) {
    errors.push('New home price must be at least $50,000');
  } else if (inputs.newHomePrice > 10000000) {
    errors.push('New home price cannot exceed $10 million');
  }

  // Down payment validation
  if (inputs.downPayment < 10000) {
    errors.push('Down payment must be at least $10,000');
  } else if (inputs.downPayment > inputs.newHomePrice) {
    errors.push('Down payment cannot exceed new home price');
  }

  // Bridge loan amount validation
  if (inputs.bridgeLoanAmount < 10000) {
    errors.push('Bridge loan amount must be at least $10,000');
  } else if (inputs.bridgeLoanAmount > 5000000) {
    errors.push('Bridge loan amount cannot exceed $5 million');
  }

  // Bridge loan rate validation
  if (inputs.bridgeLoanRate < 3) {
    errors.push('Bridge loan rate must be at least 3%');
  } else if (inputs.bridgeLoanRate > 15) {
    errors.push('Bridge loan rate cannot exceed 15%');
  }

  // Bridge loan term validation
  if (inputs.bridgeLoanTerm < 3) {
    errors.push('Bridge loan term must be at least 3 months');
  } else if (inputs.bridgeLoanTerm > 24) {
    errors.push('Bridge loan term cannot exceed 24 months');
  }

  // Expected sale price validation
  if (inputs.expectedSalePrice < 50000) {
    errors.push('Expected sale price must be at least $50,000');
  } else if (inputs.expectedSalePrice > 10000000) {
    errors.push('Expected sale price cannot exceed $10 million');
  }

  // Expected sale time validation
  if (inputs.expectedSaleTime < 1) {
    errors.push('Expected sale time must be at least 1 month');
  } else if (inputs.expectedSaleTime > 24) {
    errors.push('Expected sale time cannot exceed 24 months');
  }

  // Cross-field validation
  const availableEquity = inputs.currentHomeValue - inputs.currentMortgageBalance;
  if (inputs.bridgeLoanAmount > availableEquity) {
    errors.push('Bridge loan amount cannot exceed available equity');
  }

  const totalNeeded = inputs.newHomePrice - inputs.downPayment;
  if (inputs.bridgeLoanAmount < totalNeeded) {
    warnings.push('Bridge loan amount may not cover full purchase price');
  }

  // Sale timeline vs loan term validation
  if (inputs.expectedSaleTime > inputs.bridgeLoanTerm) {
    errors.push('Expected sale time cannot exceed bridge loan term');
  } else if (inputs.expectedSaleTime > inputs.bridgeLoanTerm * 0.8) {
    warnings.push('Sale timeline is very close to bridge loan term - consider longer term');
  }

  // Optional field validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 100000) {
    errors.push('Closing costs cannot exceed $100,000');
  }

  if (inputs.originationFee !== undefined && inputs.originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  } else if (inputs.originationFee > 5) {
    errors.push('Origination fee cannot exceed 5%');
  }

  if (inputs.monthlyRentalIncome !== undefined && inputs.monthlyRentalIncome < 0) {
    errors.push('Monthly rental income cannot be negative');
  } else if (inputs.monthlyRentalIncome > 50000) {
    errors.push('Monthly rental income cannot exceed $50,000');
  }

  if (inputs.monthlyRentalExpenses !== undefined && inputs.monthlyRentalExpenses < 0) {
    errors.push('Monthly rental expenses cannot be negative');
  } else if (inputs.monthlyRentalExpenses > 10000) {
    errors.push('Monthly rental expenses cannot exceed $10,000');
  }

  if (inputs.alternativeFinancingRate !== undefined && inputs.alternativeFinancingRate < 3) {
    errors.push('Alternative financing rate must be at least 3%');
  } else if (inputs.alternativeFinancingRate > 15) {
    errors.push('Alternative financing rate cannot exceed 15%');
  }

  // Business rule validation
  const equityUtilization = (inputs.bridgeLoanAmount / availableEquity) * 100;
  if (equityUtilization > 90) {
    warnings.push('Very high equity utilization (>90%) increases risk');
  } else if (equityUtilization > 80) {
    warnings.push('High equity utilization (>80%) may increase risk');
  }

  // Market value assumptions validation
  const priceDifference = Math.abs(inputs.expectedSalePrice - inputs.currentHomeValue) / inputs.currentHomeValue * 100;
  if (priceDifference > 20) {
    warnings.push('Expected sale price differs significantly from current value (>20%)');
  } else if (priceDifference > 10) {
    warnings.push('Expected sale price differs from current value (>10%)');
  }

  // Rental income validation
  if (inputs.monthlyRentalIncome > 0 && inputs.monthlyRentalExpenses > inputs.monthlyRentalIncome) {
    warnings.push('Rental expenses exceed rental income');
  }

  // Loan-to-value ratio validation
  const ltvRatio = (inputs.bridgeLoanAmount / inputs.currentHomeValue) * 100;
  if (ltvRatio > 80) {
    warnings.push('High loan-to-value ratio (>80%) may affect qualification');
  }

  // Debt-to-income ratio estimation
  const estimatedMonthlyPayment = estimateBridgeLoanPayment(inputs.bridgeLoanAmount, inputs.bridgeLoanRate, inputs.bridgeLoanTerm);
  const estimatedCurrentPayment = inputs.currentMortgageBalance * 0.005; // Rough estimate
  const totalMonthlyDebt = estimatedMonthlyPayment + estimatedCurrentPayment;
  const estimatedMonthlyIncome = 8333; // $100k annual income assumption
  const dtiRatio = (totalMonthlyDebt / estimatedMonthlyIncome) * 100;
  
  if (dtiRatio > 50) {
    warnings.push('Estimated debt-to-income ratio is very high (>50%)');
  } else if (dtiRatio > 43) {
    warnings.push('Estimated debt-to-income ratio exceeds recommended limit (>43%)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Estimate bridge loan monthly payment
 */
function estimateBridgeLoanPayment(loanAmount: number, annualRate: number, termMonths: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    return loanAmount / termMonths;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, termMonths);
  return loanAmount * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Validate bridge loan feasibility
 */
export function validateBridgeLoanFeasibility(
  currentHomeValue: number,
  currentMortgageBalance: number,
  bridgeLoanAmount: number,
  monthlyIncome: number,
  otherMonthlyDebt: number = 0
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Equity check
  const availableEquity = currentHomeValue - currentMortgageBalance;
  if (bridgeLoanAmount > availableEquity) {
    errors.push('Bridge loan amount exceeds available equity');
  }

  // Debt-to-income ratio check
  const estimatedBridgePayment = estimateBridgeLoanPayment(bridgeLoanAmount, 8.5, 12); // Assume 8.5% rate, 12-month term
  const estimatedCurrentPayment = currentMortgageBalance * 0.005; // Rough estimate
  const totalMonthlyDebt = estimatedBridgePayment + estimatedCurrentPayment + otherMonthlyDebt;
  const dtiRatio = (totalMonthlyDebt / monthlyIncome) * 100;

  if (dtiRatio > 50) {
    errors.push('Debt-to-income ratio exceeds 50% - bridge loan may not be feasible');
  } else if (dtiRatio > 43) {
    warnings.push('Debt-to-income ratio exceeds recommended 43% limit');
  }

  // Credit score considerations
  warnings.push('Bridge loans typically require excellent credit (720+) and substantial equity');

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate sale timeline assumptions
 */
export function validateSaleTimelineAssumptions(
  expectedSaleTime: number,
  bridgeLoanTerm: number,
  currentMarketConditions: string = 'normal'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Timeline validation
  if (expectedSaleTime > bridgeLoanTerm) {
    errors.push('Expected sale time cannot exceed bridge loan term');
  }

  // Market condition adjustments
  let adjustedSaleTime = expectedSaleTime;
  switch (currentMarketConditions.toLowerCase()) {
    case 'hot':
      adjustedSaleTime = expectedSaleTime * 0.7;
      break;
    case 'slow':
      adjustedSaleTime = expectedSaleTime * 1.5;
      warnings.push('Slow market conditions may extend sale timeline');
      break;
    case 'declining':
      adjustedSaleTime = expectedSaleTime * 2.0;
      warnings.push('Declining market conditions significantly increase sale timeline risk');
      break;
  }

  if (adjustedSaleTime > bridgeLoanTerm * 0.8) {
    warnings.push('Adjusted sale timeline may be too close to bridge loan term');
  }

  // Seasonality considerations
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 10 || currentMonth <= 2) {
    warnings.push('Winter months typically have slower real estate activity');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate rental income assumptions
 */
export function validateRentalIncomeAssumptions(
  currentHomeValue: number,
  monthlyRentalIncome: number,
  monthlyRentalExpenses: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rental income validation
  const annualRentalIncome = monthlyRentalIncome * 12;
  const grossRentMultiplier = currentHomeValue / annualRentalIncome;

  if (grossRentMultiplier < 8) {
    warnings.push('Rental income appears very high relative to property value');
  } else if (grossRentMultiplier > 25) {
    warnings.push('Rental income appears very low relative to property value');
  }

  // Cash flow validation
  const monthlyCashFlow = monthlyRentalIncome - monthlyRentalExpenses;
  if (monthlyCashFlow < 0) {
    warnings.push('Negative cash flow from rental property');
  } else if (monthlyCashFlow < monthlyRentalIncome * 0.3) {
    warnings.push('Low cash flow margin from rental property');
  }

  // Expense ratio validation
  const expenseRatio = (monthlyRentalExpenses / monthlyRentalIncome) * 100;
  if (expenseRatio > 70) {
    warnings.push('High expense ratio (>70%) reduces rental profitability');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
