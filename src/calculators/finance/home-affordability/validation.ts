import { HomeAffordabilityInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHomeAffordabilityInputs(inputs: HomeAffordabilityInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Borrower Information Validation
  if (!inputs.annualIncome || inputs.annualIncome <= 0) {
    errors.push('Annual income must be greater than 0');
  }

  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push('Monthly income must be greater than 0');
  }

  if (inputs.annualIncome && inputs.monthlyIncome) {
    const calculatedMonthly = inputs.annualIncome / 12;
    const difference = Math.abs(inputs.monthlyIncome - calculatedMonthly) / calculatedMonthly;
    if (difference > 0.1) {
      warnings.push('Monthly income differs significantly from annual income / 12');
    }
  }

  if (!inputs.creditScore || inputs.creditScore < 300 || inputs.creditScore > 850) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (!inputs.employmentType) {
    errors.push('Employment type is required');
  }

  if (inputs.employmentLength === undefined || inputs.employmentLength < 0) {
    errors.push('Employment length must be 0 or greater');
  }

  if (inputs.employmentLength > 50) {
    errors.push('Employment length cannot exceed 50 years');
  }

  // Financial Information Validation
  if (inputs.downPayment === undefined || inputs.downPayment < 0) {
    errors.push('Down payment must be 0 or greater');
  }

  if (inputs.downPaymentPercentage === undefined || inputs.downPaymentPercentage < 0) {
    errors.push('Down payment percentage must be 0 or greater');
  }

  if (inputs.downPaymentPercentage > 100) {
    errors.push('Down payment percentage cannot exceed 100%');
  }

  if (inputs.monthlyDebtPayments === undefined || inputs.monthlyDebtPayments < 0) {
    errors.push('Monthly debt payments must be 0 or greater');
  }

  if (inputs.annualDebtPayments === undefined || inputs.annualDebtPayments < 0) {
    errors.push('Annual debt payments must be 0 or greater');
  }

  if (inputs.monthlyDebtPayments && inputs.annualDebtPayments) {
    const calculatedAnnual = inputs.monthlyDebtPayments * 12;
    const difference = Math.abs(inputs.annualDebtPayments - calculatedAnnual) / calculatedAnnual;
    if (difference > 0.1) {
      warnings.push('Annual debt payments differ significantly from monthly × 12');
    }
  }

  if (inputs.debtToIncomeRatio === undefined || inputs.debtToIncomeRatio < 0) {
    errors.push('DebtToIncome ratio must be 0 or greater');
  }

  if (inputs.debtToIncomeRatio > 100) {
    errors.push('DebtToIncome ratio cannot exceed 100%');
  }

  if (inputs.frontEndRatio === undefined || inputs.frontEndRatio < 0) {
    errors.push('Front-end ratio must be 0 or greater');
  }

  if (inputs.frontEndRatio > 100) {
    errors.push('Front-end ratio cannot exceed 100%');
  }

  if (inputs.backEndRatio === undefined || inputs.backEndRatio < 0) {
    errors.push('Back-end ratio must be 0 or greater');
  }

  if (inputs.backEndRatio > 100) {
    errors.push('Back-end ratio cannot exceed 100%');
  }

  // Assets and Savings Validation
  if (inputs.liquidAssets === undefined || inputs.liquidAssets < 0) {
    errors.push('Liquid assets must be 0 or greater');
  }

  if (inputs.retirementSavings === undefined || inputs.retirementSavings < 0) {
    errors.push('Retirement savings must be 0 or greater');
  }

  if (inputs.otherAssets === undefined || inputs.otherAssets < 0) {
    errors.push('Other assets must be 0 or greater');
  }

  if (inputs.totalAssets === undefined || inputs.totalAssets < 0) {
    errors.push('Total assets must be 0 or greater');
  }

  // Market Information Validation
  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.push('Interest rate must be greater than 0');
  }

  if (inputs.interestRate > 15) {
    errors.push('Interest rate cannot exceed 15%');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (inputs.loanTerm > 50) {
    errors.push('Loan term cannot exceed 50 years');
  }

  if (inputs.propertyTaxRate === undefined || inputs.propertyTaxRate < 0) {
    errors.push('Property tax rate must be 0 or greater');
  }

  if (inputs.propertyTaxRate > 5) {
    errors.push('Property tax rate cannot exceed 5%');
  }

  if (inputs.homeownersInsuranceRate === undefined || inputs.homeownersInsuranceRate < 0) {
    errors.push('Homeowners insurance rate must be 0 or greater');
  }

  if (inputs.homeownersInsuranceRate > 2) {
    errors.push('Homeowners insurance rate cannot exceed 2%');
  }

  if (inputs.pmiRate === undefined || inputs.pmiRate < 0) {
    errors.push('PMI rate must be 0 or greater');
  }

  if (inputs.pmiRate > 2) {
    errors.push('PMI rate cannot exceed 2%');
  }

  if (inputs.hoaFees === undefined || inputs.hoaFees < 0) {
    errors.push('HOA fees must be 0 or greater');
  }

  // Location Information Validation
  if (!inputs.propertyLocation || inputs.propertyLocation.trim().length === 0) {
    errors.push('Property location is required');
  }

  if (!inputs.marketCondition) {
    errors.push('Market condition is required');
  }

  if (!inputs.medianHomePrice || inputs.medianHomePrice <= 0) {
    errors.push('Median home price must be greater than 0');
  }

  if (!inputs.averageDaysOnMarket || inputs.averageDaysOnMarket <= 0) {
    errors.push('Average days on market must be greater than 0');
  }

  if (inputs.averageDaysOnMarket > 365) {
    errors.push('Average days on market cannot exceed 365');
  }

  // Loan Information Validation
  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }

  if (inputs.maxLTV === undefined || inputs.maxLTV <= 0) {
    errors.push('Max LTV must be greater than 0');
  }

  if (inputs.maxLTV > 100) {
    errors.push('Max LTV cannot exceed 100%');
  }

  if (inputs.maxDTI === undefined || inputs.maxDTI <= 0) {
    errors.push('Max DTI must be greater than 0');
  }

  if (inputs.maxDTI > 60) {
    errors.push('Max DTI cannot exceed 60%');
  }

  if (inputs.maxFrontEndRatio === undefined || inputs.maxFrontEndRatio <= 0) {
    errors.push('Max front-end ratio must be greater than 0');
  }

  if (inputs.maxFrontEndRatio > 50) {
    errors.push('Max front-end ratio cannot exceed 50%');
  }

  // Additional Costs Validation
  if (inputs.closingCosts === undefined || inputs.closingCosts < 0) {
    errors.push('Closing costs must be 0 or greater');
  }

  if (inputs.movingCosts === undefined || inputs.movingCosts < 0) {
    errors.push('Moving costs must be 0 or greater');
  }

  if (inputs.emergencyFund === undefined || inputs.emergencyFund < 0) {
    errors.push('Emergency fund must be 0 or greater');
  }

  if (inputs.maintenanceReserve === undefined || inputs.maintenanceReserve < 0) {
    errors.push('Maintenance reserve must be 0 or greater');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 30) {
    errors.push('Analysis period cannot exceed 30 years');
  }

  if (inputs.inflationRate === undefined) {
    errors.push('Inflation rate is required');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.incomeGrowthRate === undefined) {
    errors.push('Income growth rate is required');
  }

  if (inputs.incomeGrowthRate < -10 || inputs.incomeGrowthRate > 20) {
    errors.push('Income growth rate must be between -10% and 20%');
  }

  if (inputs.propertyAppreciationRate === undefined) {
    errors.push('Property appreciation rate is required');
  }

  if (inputs.propertyAppreciationRate < -10 || inputs.propertyAppreciationRate > 20) {
    errors.push('Property appreciation rate must be between -10% and 20%');
  }

  // Reporting Preferences Validation
  if (!inputs.currency) {
    errors.push('Currency is required');
  }

  if (!inputs.displayFormat) {
    errors.push('Display format is required');
  }

  if (inputs.includeCharts === undefined) {
    errors.push('Include charts field is required');
  }

  // Business Logic Validation
  if (inputs.annualIncome && inputs.monthlyDebtPayments) {
    const monthlyIncome = inputs.annualIncome / 12;
    const dtiRatio = (inputs.monthlyDebtPayments / monthlyIncome) * 100;
    if (dtiRatio > 50) {
      warnings.push('High DebtToIncome ratio may affect loan approval');
    }
  }

  if (inputs.downPaymentPercentage && inputs.downPaymentPercentage < 20) {
    warnings.push('Down payment less than 20% may require PMI');
  }

  if (inputs.creditScore && inputs.creditScore < 650) {
    warnings.push('Credit score below 650 may affect loan terms');
  }

  if (inputs.employmentType === 'unemployed') {
    warnings.push('Unemployment may affect loan approval');
  }

  if (inputs.employmentLength && inputs.employmentLength < 2) {
    warnings.push('Short employment history may affect loan approval');
  }

  if (inputs.liquidAssets && inputs.emergencyFund && inputs.liquidAssets < inputs.emergencyFund) {
    warnings.push('Liquid assets are less than recommended emergency fund');
  }

  if (inputs.medianHomePrice && inputs.annualIncome) {
    const priceToIncomeRatio = inputs.medianHomePrice / inputs.annualIncome;
    if (priceToIncomeRatio > 5) {
      warnings.push('High PriceToIncome ratio may indicate affordability challenges');
    }
  }

  if (inputs.marketCondition === 'hot') {
    warnings.push('Hot market conditions may increase competition and prices');
  }

  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market may affect property values');
  }

  // Cross-field Validation
  if (inputs.downPayment && inputs.downPaymentPercentage && inputs.medianHomePrice) {
    const calculatedDownPayment = (inputs.medianHomePrice * inputs.downPaymentPercentage) / 100;
    const difference = Math.abs(inputs.downPayment - calculatedDownPayment) / calculatedDownPayment;
    if (difference > 0.2) {
      warnings.push('Down payment amount differs significantly from percentage calculation');
    }
  }

  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.maxFrontEndRatio) {
    const maxHousingPayment = inputs.monthlyIncome * (inputs.maxFrontEndRatio / 100);
    const totalDebt = inputs.monthlyDebtPayments + maxHousingPayment;
    const totalDTI = (totalDebt / inputs.monthlyIncome) * 100;
    if (totalDTI > inputs.maxDTI) {
      warnings.push('Total DebtToIncome ratio exceeds maximum allowed');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function quickValidateHomeAffordabilityInput(field: string, value: any): string | null {
  switch (field) {
    case 'annualIncome':
      if (!value) return 'Annual income is required';
      if (typeof value !== 'number') return 'Annual income must be a number';
      if (value < 10000 || value > 10000000) return 'Annual income must be between $10,000 and $10,000,000';
      break;

    case 'monthlyIncome':
      if (value && typeof value !== 'number') return 'Monthly income must be a number';
      if (value && (value < 833 || value > 833333)) return 'Monthly income must be between $833 and $833,333';
      break;

    case 'downPayment':
      if (!value) return 'Down payment is required';
      if (typeof value !== 'number') return 'Down payment must be a number';
      if (value < 0 || value > 10000000) return 'Down payment must be between $0 and $10,000,000';
      break;

    case 'downPaymentPercent':
      if (value && typeof value !== 'number') return 'Down payment percentage must be a number';
      if (value && (value < 0 || value > 100)) return 'Down payment percentage must be between 0% and 100%';
      break;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number') return 'Interest rate must be a number';
      if (value < 1 || value > 20) return 'Interest rate must be between 1% and 20%';
      break;

    case 'loanTerm':
      if (!value) return 'Loan term is required';
      if (typeof value !== 'number') return 'Loan term must be a number';
      if (value < 1 || value > 50) return 'Loan term must be between 1 and 50 years';
      break;

    case 'monthlyDebtPayments':
      if (value && typeof value !== 'number') return 'Monthly debt payments must be a number';
      if (value && (value < 0 || value > 100000)) return 'Monthly debt payments must be between $0 and $100,000';
      break;

    case 'creditScore':
      if (value && typeof value !== 'number') return 'Credit score must be a number';
      if (value && (value < 300 || value > 850)) return 'Credit score must be between 300 and 850';
      break;

    case 'loanType':
      if (!value) return 'Loan type is required';
      const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
      if (!validLoanTypes.includes(value)) return 'Invalid loan type. Must be one of: conventional, fha, va, usda';
      break;

    case 'propertyType':
      if (value) {
        const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'];
        if (!validPropertyTypes.includes(value)) return 'Invalid property type. Must be one of: single-family, condo, townhouse, multi-family, manufactured';
      }
      break;

    case 'occupancyType':
      if (value) {
        const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
        if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property';
      }
      break;

    case 'location':
      if (value) {
        const validLocations = ['urban', 'suburban', 'rural'];
        if (!validLocations.includes(value)) return 'Invalid location. Must be one of: urban, suburban, rural';
      }
      break;

    case 'marketType':
      if (value) {
        const validMarketTypes = ['hot', 'stable', 'declining'];
        if (!validMarketTypes.includes(value)) return 'Invalid market type. Must be one of: hot, stable, declining';
      }
      break;
  }

  return null;
}

