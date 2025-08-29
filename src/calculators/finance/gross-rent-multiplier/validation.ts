import { GrossRentMultiplierInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateGrossRentMultiplierInputs(inputs: GrossRentMultiplierInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (!inputs.lotSize || inputs.lotSize <= 0) {
    errors.push('Lot size must be greater than 0');
  }

  if (!inputs.yearBuilt || inputs.yearBuilt < 1800 || inputs.yearBuilt > 2030) {
    errors.push('Year built must be between 1800 and 2030');
  }

  if (!inputs.propertyCondition) {
    errors.push('Property condition is required');
  }

  if (!inputs.bedrooms || inputs.bedrooms < 0) {
    errors.push('Number of bedrooms must be 0 or greater');
  }

  if (!inputs.bathrooms || inputs.bathrooms < 0) {
    errors.push('Number of bathrooms must be 0 or greater');
  }

  // Financial Information Validation
  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }

  if (!inputs.marketValue || inputs.marketValue <= 0) {
    errors.push('Market value must be greater than 0');
  }

  if (!inputs.annualGrossRent || inputs.annualGrossRent <= 0) {
    errors.push('Annual gross rent must be greater than 0');
  }

  if (!inputs.monthlyGrossRent || inputs.monthlyGrossRent <= 0) {
    errors.push('Monthly gross rent must be greater than 0');
  }

  if (inputs.annualGrossRent && inputs.monthlyGrossRent) {
    const expectedMonthly = inputs.annualGrossRent / 12;
    const difference = Math.abs(inputs.monthlyGrossRent - expectedMonthly) / expectedMonthly;
    if (difference > 0.1) {
      warnings.push('Monthly gross rent differs significantly from annual gross rent / 12');
    }
  }

  if (inputs.annualOperatingExpenses === undefined || inputs.annualOperatingExpenses < 0) {
    errors.push('Annual operating expenses must be 0 or greater');
  }

  if (inputs.monthlyOperatingExpenses === undefined || inputs.monthlyOperatingExpenses < 0) {
    errors.push('Monthly operating expenses must be 0 or greater');
  }

  if (inputs.annualNetOperatingIncome === undefined || inputs.annualNetOperatingIncome < 0) {
    errors.push('Annual net operating income must be 0 or greater');
  }

  if (inputs.monthlyNetOperatingIncome === undefined || inputs.monthlyNetOperatingIncome < 0) {
    errors.push('Monthly net operating income must be 0 or greater');
  }

  // Rent Information Validation
  if (!inputs.numberOfUnits || inputs.numberOfUnits <= 0) {
    errors.push('Number of units must be greater than 0');
  }

  if (inputs.vacancyRate === undefined || inputs.vacancyRate < 0) {
    errors.push('Vacancy rate must be 0 or greater');
  }

  if (inputs.vacancyRate > 100) {
    errors.push('Vacancy rate cannot exceed 100%');
  }

  if (inputs.collectionLoss === undefined || inputs.collectionLoss < 0) {
    errors.push('Collection loss must be 0 or greater');
  }

  if (inputs.collectionLoss > 20) {
    errors.push('Collection loss cannot exceed 20%');
  }

  if (!inputs.effectiveGrossIncome || inputs.effectiveGrossIncome <= 0) {
    errors.push('Effective gross income must be greater than 0');
  }

  // Expense Breakdown Validation
  if (inputs.propertyTaxes === undefined || inputs.propertyTaxes < 0) {
    errors.push('Property taxes must be 0 or greater');
  }

  if (inputs.insurance === undefined || inputs.insurance < 0) {
    errors.push('Insurance costs must be 0 or greater');
  }

  if (inputs.utilities === undefined || inputs.utilities < 0) {
    errors.push('Utility costs must be 0 or greater');
  }

  if (inputs.maintenance === undefined || inputs.maintenance < 0) {
    errors.push('Maintenance costs must be 0 or greater');
  }

  if (inputs.propertyManagement === undefined || inputs.propertyManagement < 0) {
    errors.push('Property management fees must be 0 or greater');
  }

  if (inputs.repairs === undefined || inputs.repairs < 0) {
    errors.push('Repair costs must be 0 or greater');
  }

  if (inputs.landscaping === undefined || inputs.landscaping < 0) {
    errors.push('Landscaping costs must be 0 or greater');
  }

  if (inputs.pestControl === undefined || inputs.pestControl < 0) {
    errors.push('Pest control costs must be 0 or greater');
  }

  if (inputs.otherExpenses === undefined || inputs.otherExpenses < 0) {
    errors.push('Other expenses must be 0 or greater');
  }

  // Market Information Validation
  if (!inputs.marketGRM || inputs.marketGRM <= 0) {
    errors.push('Market GRM must be greater than 0');
  }

  if (inputs.marketGRM > 50) {
    errors.push('Market GRM cannot exceed 50');
  }

  if (!inputs.marketCapRate || inputs.marketCapRate <= 0) {
    errors.push('Market cap rate must be greater than 0');
  }

  if (inputs.marketCapRate > 20) {
    errors.push('Market cap rate cannot exceed 20%');
  }

  if (!inputs.marketRent || inputs.marketRent <= 0) {
    errors.push('Market rent must be greater than 0');
  }

  // Location Information Validation
  if (!inputs.city || inputs.city.trim().length === 0) {
    errors.push('City is required');
  }

  if (!inputs.state || inputs.state.trim().length === 0) {
    errors.push('State is required');
  }

  if (!inputs.zipCode || inputs.zipCode.trim().length === 0) {
    errors.push('ZIP code is required');
  }

  if (!inputs.neighborhood || inputs.neighborhood.trim().length === 0) {
    errors.push('Neighborhood is required');
  }

  if (!inputs.marketType) {
    errors.push('Market type is required');
  }

  if (!inputs.marketTrend) {
    errors.push('Market trend is required');
  }

  // Property Features Validation
  if (inputs.parkingSpaces === undefined || inputs.parkingSpaces < 0) {
    errors.push('Parking spaces must be 0 or greater');
  }

  if (inputs.parkingSpaces > 1000) {
    errors.push('Parking spaces cannot exceed 1000');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 30) {
    errors.push('Analysis period cannot exceed 30 years');
  }

  if (inputs.rentGrowthRate === undefined) {
    errors.push('Rent growth rate is required');
  }

  if (inputs.rentGrowthRate < -10 || inputs.rentGrowthRate > 20) {
    errors.push('Rent growth rate must be between -10% and 20%');
  }

  if (inputs.expenseGrowthRate === undefined) {
    errors.push('Expense growth rate is required');
  }

  if (inputs.expenseGrowthRate < -5 || inputs.expenseGrowthRate > 15) {
    errors.push('Expense growth rate must be between -5% and 15%');
  }

  if (inputs.appreciationRate === undefined) {
    errors.push('Appreciation rate is required');
  }

  if (inputs.appreciationRate < -10 || inputs.appreciationRate > 20) {
    errors.push('Appreciation rate must be between -10% and 20%');
  }

  if (!inputs.discountRate || inputs.discountRate <= 0) {
    errors.push('Discount rate must be greater than 0');
  }

  if (inputs.discountRate > 30) {
    errors.push('Discount rate cannot exceed 30%');
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
  if (inputs.annualGrossRent && inputs.annualOperatingExpenses && inputs.annualGrossRent <= inputs.annualOperatingExpenses) {
    warnings.push('Annual gross rent is less than or equal to annual operating expenses, which may indicate a poor investment');
  }

  if (inputs.marketValue && inputs.annualGrossRent) {
    const grm = inputs.marketValue / inputs.annualGrossRent;
    if (grm > inputs.marketGRM * 1.5) {
      warnings.push('Property GRM is significantly higher than market GRM');
    }
    if (grm < inputs.marketGRM * 0.5) {
      warnings.push('Property GRM is significantly lower than market GRM');
    }
  }

  if (inputs.vacancyRate > 15) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  if (inputs.collectionLoss > 5) {
    warnings.push('High collection loss may indicate tenant quality issues');
  }

  if (inputs.marketType === 'declining') {
    warnings.push('Declining market may impact investment performance');
  }

  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_work') {
    warnings.push('Poor property condition may require significant investment');
  }

  // Cross-field Validation
  if (inputs.annualGrossRent && inputs.monthlyGrossRent) {
    const expectedAnnual = inputs.monthlyGrossRent * 12;
    const difference = Math.abs(inputs.annualGrossRent - expectedAnnual) / expectedAnnual;
    if (difference > 0.1) {
      warnings.push('Annual and monthly gross rent values are inconsistent');
    }
  }

  if (inputs.annualOperatingExpenses && inputs.monthlyOperatingExpenses) {
    const expectedAnnual = inputs.monthlyOperatingExpenses * 12;
    const difference = Math.abs(inputs.annualOperatingExpenses - expectedAnnual) / expectedAnnual;
    if (difference > 0.1) {
      warnings.push('Annual and monthly operating expenses are inconsistent');
    }
  }

  if (inputs.annualNetOperatingIncome && inputs.monthlyNetOperatingIncome) {
    const expectedAnnual = inputs.monthlyNetOperatingIncome * 12;
    const difference = Math.abs(inputs.annualNetOperatingIncome - expectedAnnual) / expectedAnnual;
    if (difference > 0.1) {
      warnings.push('Annual and monthly net operating income are inconsistent');
    }
  }

  if (inputs.effectiveGrossIncome && inputs.annualGrossRent) {
    const expectedEffective = inputs.annualGrossRent * (1 - inputs.vacancyRate / 100) * (1 - inputs.collectionLoss / 100);
    const difference = Math.abs(inputs.effectiveGrossIncome - expectedEffective) / expectedEffective;
    if (difference > 0.1) {
      warnings.push('Effective gross income differs from calculated value based on vacancy and collection loss');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
