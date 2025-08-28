// Quick validation functions for individual inputs with allInputs parameter

export function validateTargetRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Target revenue must be greater than zero';
  }
  if (value > 1000000000000) {
    return 'Target revenue seems unrealistically high';
  }
  return null;
}

export function validateTargetEBITDA(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Target EBITDA cannot be negative';
  }
  if (allInputs?.targetRevenue && value > allInputs.targetRevenue * 0.8) {
    return 'EBITDA margin over 80% seems unrealistic';
  }
  return null;
}

export function validateTargetNetIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (allInputs?.targetEBITDA && value > allInputs.targetEBITDA) {
    return 'Net income cannot exceed EBITDA';
  }
  return null;
}

export function validateTargetSharesOutstanding(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Shares outstanding must be greater than zero';
  }
  if (value > 50000000000) {
    return 'Shares outstanding seems unrealistically high';
  }
  return null;
}

export function validateTargetSharePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Share price must be greater than zero';
  }
  if (value > 10000) {
    return 'Share price seems unrealistically high';
  }
  return null;
}

export function validateTargetDebt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Debt cannot be negative';
  }
  return null;
}

export function validateTargetCash(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Cash cannot be negative';
  }
  return null;
}

export function validateAcquirerRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Acquirer revenue must be greater than zero';
  }
  if (value > 1000000000000) {
    return 'Acquirer revenue seems unrealistically high';
  }
  return null;
}

export function validateAcquirerEBITDA(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Acquirer EBITDA cannot be negative';
  }
  if (allInputs?.acquirerRevenue && value > allInputs.acquirerRevenue * 0.8) {
    return 'EBITDA margin over 80% seems unrealistic';
  }
  return null;
}

export function validateAcquirerNetIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (allInputs?.acquirerEBITDA && value > allInputs.acquirerEBITDA) {
    return 'Net income cannot exceed EBITDA';
  }
  return null;
}

export function validateAcquirerSharesOutstanding(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Shares outstanding must be greater than zero';
  }
  if (value > 50000000000) {
    return 'Shares outstanding seems unrealistically high';
  }
  return null;
}

export function validateAcquirerSharePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Share price must be greater than zero';
  }
  if (value > 10000) {
    return 'Share price seems unrealistically high';
  }
  return null;
}

export function validateAcquirerDebt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Debt cannot be negative';
  }
  return null;
}

export function validateAcquirerCash(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Cash cannot be negative';
  }
  return null;
}

export function validatePurchasePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Purchase price must be greater than zero';
  }
  
  // Check against target market cap if available
  if (allInputs?.targetSharesOutstanding && allInputs?.targetSharePrice) {
    const targetMarketCap = allInputs.targetSharesOutstanding * allInputs.targetSharePrice;
    if (value < targetMarketCap * 0.8) {
      return 'Purchase price seems too low (less than 80% of market value)';
    }
    if (value > targetMarketCap * 3) {
      return 'Purchase price seems excessive (over 3x market value)';
    }
  }
  
  return null;
}

export function validateCashPortion(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0 || value > 100) {
    return 'Cash portion must be between 0% and 100%';
  }
  
  // Check if cash + stock = 100%
  if (allInputs?.stockPortion && Math.abs(value + allInputs.stockPortion - 100) > 0.01) {
    return 'Cash and stock portions must sum to 100%';
  }
  
  return null;
}

export function validateStockPortion(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0 || value > 100) {
    return 'Stock portion must be between 0% and 100%';
  }
  
  // Check if cash + stock = 100%
  if (allInputs?.cashPortion && Math.abs(value + allInputs.cashPortion - 100) > 0.01) {
    return 'Cash and stock portions must sum to 100%';
  }
  
  return null;
}

export function validateDebtFinancing(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Debt financing cannot be negative';
  }
  
  // Check leverage reasonableness
  if (allInputs?.acquirerEBITDA && allInputs?.targetEBITDA) {
    const totalEBITDA = allInputs.acquirerEBITDA + allInputs.targetEBITDA;
    if (totalEBITDA > 0 && value / totalEBITDA > 6) {
      return 'New debt financing creates excessive leverage (>6x EBITDA)';
    }
  }
  
  return null;
}

export function validateTransactionCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Transaction costs cannot be negative';
  }
  
  if (allInputs?.purchasePrice && value > allInputs.purchasePrice * 0.1) {
    return 'Transaction costs seem excessive (over 10% of purchase price)';
  }
  
  return null;
}

export function validateIntegrationCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Integration costs cannot be negative';
  }
  
  if (allInputs?.purchasePrice && value > allInputs.purchasePrice * 0.2) {
    return 'Integration costs seem excessive (over 20% of purchase price)';
  }
  
  return null;
}

export function validateSynergiesRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Revenue synergies cannot be negative';
  }
  
  if (allInputs?.targetRevenue && value > allInputs.targetRevenue * 0.3) {
    return 'Revenue synergies seem excessive (over 30% of target revenue)';
  }
  
  return null;
}

export function validateSynergiesCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Cost synergies cannot be negative';
  }
  
  if (allInputs?.targetRevenue && value > allInputs.targetRevenue * 0.4) {
    return 'Cost synergies seem excessive (over 40% of target revenue)';
  }
  
  return null;
}

export function validateSynergyRampPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Synergy ramp period must be greater than zero';
  }
  if (value > 10) {
    return 'Synergy ramp period over 10 years seems unrealistic';
  }
  return null;
}

export function validateDebtInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Interest rate cannot be negative';
  }
  if (value > 25) {
    return 'Interest rate over 25% seems unrealistic for M&A financing';
  }
  return null;
}

export function validateTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Tax rate cannot be negative';
  }
  if (value > 50) {
    return 'Tax rate over 50% seems unrealistic';
  }
  return null;
}

export function validateAnalysisYears(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 3) {
    return 'Analysis period should be at least 3 years';
  }
  if (value > 10) {
    return 'Analysis period over 10 years reduces accuracy';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 5) {
    return 'Discount rate below 5% seems unrealistic';
  }
  if (value > 20) {
    return 'Discount rate over 20% seems excessive';
  }
  return null;
}

export function validateTerminalGrowthRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Terminal growth rate cannot be negative';
  }
  if (value > 10) {
    return 'Terminal growth rate over 10% seems unrealistic';
  }
  if (allInputs?.discountRate && value >= allInputs.discountRate) {
    return 'Terminal growth rate should be less than discount rate';
  }
  return null;
}

export function validateControlPremium(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Control premium cannot be negative';
  }
  if (value > 100) {
    return 'Control premium over 100% seems excessive';
  }
  return null;
}

export function validateMarketMultiple(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Market multiple must be greater than zero';
  }
  if (value > 50) {
    return 'Market multiple over 50x seems unrealistic';
  }
  return null;
}

export function validateRevenueAttrition(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Revenue attrition cannot be negative';
  }
  if (value > 50) {
    return 'Revenue attrition over 50% seems excessive';
  }
  return null;
}

export function validateCostInflation(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Cost inflation cannot be negative';
  }
  if (value > 15) {
    return 'Cost inflation over 15% seems excessive';
  }
  return null;
}

export function validateIndustryGrowthRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -10) {
    return 'Industry decline over 10% seems extreme';
  }
  if (value > 25) {
    return 'Industry growth over 25% seems unrealistic';
  }
  return null;
}

export function validateExecutionRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0 || value > 100) {
    return 'Execution risk must be between 0% and 100%';
  }
  return null;
}

export function validateSensitivityRange(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 5) {
    return 'Sensitivity range should be at least 5%';
  }
  if (value > 50) {
    return 'Sensitivity range over 50% reduces usefulness';
  }
  return null;
}

export function validateRegulatoryApprovalTime(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) {
    return 'Regulatory approval time must be at least 1 month';
  }
  if (value > 36) {
    return 'Regulatory approval time over 36 months seems excessive';
  }
  return null;
}

export function validateBreakupFee(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Breakup fee cannot be negative';
  }
  
  if (allInputs?.purchasePrice && value > allInputs.purchasePrice * 0.1) {
    return 'Breakup fee over 10% of purchase price seems excessive';
  }
  
  return null;
}

export function validateDealType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['merger', 'acquisition', 'tender-offer', 'management-buyout'];
  if (!validTypes.includes(value)) {
    return 'Invalid deal type selected';
  }
  return null;
}

export function validatePaymentMethod(value: string, allInputs?: Record<string, any>): string | null {
  const validMethods = ['cash', 'stock', 'mixed'];
  if (!validMethods.includes(value)) {
    return 'Invalid payment method selected';
  }
  
  // Validate consistency with cash/stock portions
  if (value === 'cash' && allInputs?.cashPortion !== 100) {
    return 'Cash payment method requires 100% cash portion';
  }
  if (value === 'stock' && allInputs?.stockPortion !== 100) {
    return 'Stock payment method requires 100% stock portion';
  }
  if (value === 'mixed' && (allInputs?.cashPortion === 100 || allInputs?.stockPortion === 100)) {
    return 'Mixed payment method requires both cash and stock portions';
  }
  
  return null;
}
