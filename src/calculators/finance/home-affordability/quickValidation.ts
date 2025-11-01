import { HomeAffordabilityInputs } from './types';

export function validateAnnualIncome(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Annual income must be greater than 0';
  }
  if (value < 20000) {
    return 'Annual income seems unusually low';
  }
  return null;
}

export function validateMonthlyIncome(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Monthly income must be greater than 0';
  }
  if (allInputs.annualIncome) {
    const calculatedMonthly = allInputs.annualIncome / 12;
    const difference = Math.abs(value - calculatedMonthly) / calculatedMonthly;
    if (difference > 0.1) {
      return 'Monthly income differs significantly from annual income / 12';
    }
  }
  return null;
}

export function validateCreditScore(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value < 300 || value > 850) {
    return 'Credit score must be between 300 and 850';
  }
  if (value < 650) {
    return 'Credit score below 650 may affect loan terms';
  }
  return null;
}

export function validateEmploymentType(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value) {
    return 'Employment type is required';
  }
  const validTypes = ['employed', 'self_employed', 'retired', 'unemployed'];
  if (!validTypes.includes(value)) {
    return 'Invalid employment type';
  }
  return null;
}

export function validateEmploymentLength(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Employment length must be 0 or greater';
  }
  if (value > 50) {
    return 'Employment length cannot exceed 50 years';
  }
  if (value < 2) {
    return 'Short employment history may affect loan approval';
  }
  return null;
}

export function validateDownPayment(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Down payment must be 0 or greater';
  }
  return null;
}

export function validateDownPaymentPercentage(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Down payment percentage must be 0 or greater';
  }
  if (value > 100) {
    return 'Down payment percentage cannot exceed 100%';
  }
  if (value < 20) {
    return 'Down payment less than 20% may require PMI';
  }
  return null;
}

export function validateMonthlyDebtPayments(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Monthly debt payments must be 0 or greater';
  }
  if (allInputs.monthlyIncome && value > allInputs.monthlyIncome * 0.5) {
    return 'Monthly debt payments exceed 50% of monthly income';
  }
  return null;
}

export function validateAnnualDebtPayments(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Annual debt payments must be 0 or greater';
  }
  if (allInputs.monthlyDebtPayments) {
    const calculatedAnnual = allInputs.monthlyDebtPayments * 12;
    const difference = Math.abs(value - calculatedAnnual) / calculatedAnnual;
    if (difference > 0.1) {
      return 'Annual debt payments differ significantly from monthly × 12';
    }
  }
  return null;
}

export function validateDebtToIncomeRatio(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'DebtToIncome ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'DebtToIncome ratio cannot exceed 100%';
  }
  if (value > 50) {
    return 'High DebtToIncome ratio may affect loan approval';
  }
  return null;
}

export function validateFrontEndRatio(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Front-end ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'Front-end ratio cannot exceed 100%';
  }
  return null;
}

export function validateBackEndRatio(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Back-end ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'Back-end ratio cannot exceed 100%';
  }
  return null;
}

export function validateLiquidAssets(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Liquid assets must be 0 or greater';
  }
  if (allInputs.emergencyFund && value < allInputs.emergencyFund) {
    return 'Liquid assets are less than recommended emergency fund';
  }
  return null;
}

export function validateRetirementSavings(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Retirement savings must be 0 or greater';
  }
  return null;
}

export function validateOtherAssets(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Other assets must be 0 or greater';
  }
  return null;
}

export function validateTotalAssets(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Total assets must be 0 or greater';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Interest rate must be greater than 0';
  }
  if (value > 15) {
    return 'Interest rate cannot exceed 15%';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Loan term must be greater than 0';
  }
  if (value > 50) {
    return 'Loan term cannot exceed 50 years';
  }
  return null;
}

export function validatePropertyTaxRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property tax rate must be 0 or greater';
  }
  if (value > 5) {
    return 'Property tax rate cannot exceed 5%';
  }
  return null;
}

export function validateHomeownersInsuranceRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Homeowners insurance rate must be 0 or greater';
  }
  if (value > 2) {
    return 'Homeowners insurance rate cannot exceed 2%';
  }
  return null;
}

export function validatePmiRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'PMI rate must be 0 or greater';
  }
  if (value > 2) {
    return 'PMI rate cannot exceed 2%';
  }
  return null;
}

export function validateHoaFees(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'HOA fees must be 0 or greater';
  }
  return null;
}

export function validatePropertyLocation(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property location is required';
  }
  if (value.trim().length < 5) {
    return 'Property location seems too short';
  }
  return null;
}

export function validateMarketCondition(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value) {
    return 'Market condition is required';
  }
  const validConditions = ['hot', 'stable', 'buyer_market', 'declining'];
  if (!validConditions.includes(value)) {
    return 'Invalid market condition';
  }
  return null;
}

export function validateMedianHomePrice(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Median home price must be greater than 0';
  }
  if (allInputs.annualIncome) {
    const priceToIncomeRatio = value / allInputs.annualIncome;
    if (priceToIncomeRatio > 5) {
      return 'High PriceToIncome ratio may indicate affordability challenges';
    }
  }
  return null;
}

export function validateAverageDaysOnMarket(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Average days on market must be greater than 0';
  }
  if (value > 365) {
    return 'Average days on market cannot exceed 365';
  }
  return null;
}

export function validateLoanType(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value) {
    return 'Loan type is required';
  }
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validTypes.includes(value)) {
    return 'Invalid loan type';
  }
  return null;
}

export function validateMaxLTV(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value <= 0) {
    return 'Max LTV must be greater than 0';
  }
  if (value > 100) {
    return 'Max LTV cannot exceed 100%';
  }
  return null;
}

export function validateMaxDTI(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value <= 0) {
    return 'Max DTI must be greater than 0';
  }
  if (value > 60) {
    return 'Max DTI cannot exceed 60%';
  }
  return null;
}

export function validateMaxFrontEndRatio(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value <= 0) {
    return 'Max front-end ratio must be greater than 0';
  }
  if (value > 50) {
    return 'Max front-end ratio cannot exceed 50%';
  }
  return null;
}

export function validateClosingCosts(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Closing costs must be 0 or greater';
  }
  return null;
}

export function validateMovingCosts(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Moving costs must be 0 or greater';
  }
  return null;
}

export function validateEmergencyFund(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Emergency fund must be 0 or greater';
  }
  return null;
}

export function validateMaintenanceReserve(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Maintenance reserve must be 0 or greater';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 30) {
    return 'Analysis period cannot exceed 30 years';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined) {
    return 'Inflation rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Inflation rate must be between -5% and 15%';
  }
  return null;
}

export function validateIncomeGrowthRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined) {
    return 'Income growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Income growth rate must be between -10% and 20%';
  }
  return null;
}

export function validatePropertyAppreciationRate(value: number, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined) {
    return 'Property appreciation rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Property appreciation rate must be between -10% and 20%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: HomeAffordabilityInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs: HomeAffordabilityInputs): string | null {
  if (value === undefined) {
    return 'Include charts field is required';
  }
  return null;
}
