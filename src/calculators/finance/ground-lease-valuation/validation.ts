import { GroundLeaseValuationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateGroundLeaseValuationInputs(inputs: GroundLeaseValuationInputs): ValidationResult {
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

  if (!inputs.landSize || inputs.landSize <= 0) {
    errors.push('Land size must be greater than 0');
  }

  if (!inputs.zoning || inputs.zoning.trim().length === 0) {
    errors.push('Zoning classification is required');
  }

  if (!inputs.currentUse || inputs.currentUse.trim().length === 0) {
    errors.push('Current use is required');
  }

  if (!inputs.highestBestUse || inputs.highestBestUse.trim().length === 0) {
    errors.push('Highest and best use is required');
  }

  // Lease Information Validation
  if (!inputs.leaseType) {
    errors.push('Lease type is required');
  }

  if (!inputs.leaseStartDate) {
    errors.push('Lease start date is required');
  } else {
    const startDate = new Date(inputs.leaseStartDate);
    if (isNaN(startDate.getTime())) {
      errors.push('Invalid lease start date format');
    }
  }

  if (!inputs.leaseEndDate) {
    errors.push('Lease end date is required');
  } else {
    const endDate = new Date(inputs.leaseEndDate);
    if (isNaN(endDate.getTime())) {
      errors.push('Invalid lease end date format');
    }
  }

  if (inputs.leaseStartDate && inputs.leaseEndDate) {
    const startDate = new Date(inputs.leaseStartDate);
    const endDate = new Date(inputs.leaseEndDate);
    if (endDate <= startDate) {
      errors.push('Lease end date must be after lease start date');
    }
  }

  if (!inputs.leaseTerm || inputs.leaseTerm <= 0) {
    errors.push('Lease term must be greater than 0');
  }

  if (inputs.leaseTerm && inputs.leaseTerm > 99) {
    errors.push('Lease term cannot exceed 99 years');
  }

  if (inputs.remainingTerm === undefined || inputs.remainingTerm < 0) {
    errors.push('Remaining term must be 0 or greater');
  }

  if (inputs.remainingTerm > inputs.leaseTerm) {
    errors.push('Remaining term cannot exceed total lease term');
  }

  if (inputs.renewalOptions === undefined || inputs.renewalOptions < 0) {
    errors.push('Renewal options must be 0 or greater');
  }

  if (inputs.renewalOptions > 10) {
    errors.push('Renewal options cannot exceed 10');
  }

  if (!inputs.renewalTerm || inputs.renewalTerm <= 0) {
    errors.push('Renewal term must be greater than 0');
  }

  if (inputs.renewalTerm > 20) {
    errors.push('Renewal term cannot exceed 20 years');
  }

  // Financial Information Validation
  if (!inputs.currentRent || inputs.currentRent <= 0) {
    errors.push('Current annual rent must be greater than 0');
  }

  if (inputs.rentEscalation === undefined || inputs.rentEscalation < 0) {
    errors.push('Rent escalation rate must be 0 or greater');
  }

  if (inputs.rentEscalation > 50) {
    errors.push('Rent escalation rate cannot exceed 50%');
  }

  if (!inputs.rentEscalationFrequency) {
    errors.push('Rent escalation frequency is required');
  }

  if (inputs.rentReviewFrequency === undefined || inputs.rentReviewFrequency <= 0) {
    errors.push('Rent review frequency must be greater than 0');
  }

  if (inputs.rentReviewFrequency > 20) {
    errors.push('Rent review frequency cannot exceed 20 years');
  }

  if (!inputs.rentReviewMethod) {
    errors.push('Rent review method is required');
  }

  // Operating Information Validation
  if (inputs.operatingExpenses === undefined || inputs.operatingExpenses < 0) {
    errors.push('Operating expenses must be 0 or greater');
  }

  if (inputs.propertyTaxes === undefined || inputs.propertyTaxes < 0) {
    errors.push('Property taxes must be 0 or greater');
  }

  if (inputs.insurance === undefined || inputs.insurance < 0) {
    errors.push('Insurance costs must be 0 or greater');
  }

  if (inputs.maintenance === undefined || inputs.maintenance < 0) {
    errors.push('Maintenance costs must be 0 or greater');
  }

  if (inputs.utilities === undefined || inputs.utilities < 0) {
    errors.push('Utility costs must be 0 or greater');
  }

  if (inputs.managementFees === undefined || inputs.managementFees < 0) {
    errors.push('Management fees must be 0 or greater');
  }

  // Market Information Validation
  if (!inputs.marketRent || inputs.marketRent <= 0) {
    errors.push('Market rent must be greater than 0');
  }

  if (!inputs.marketCapRate || inputs.marketCapRate <= 0) {
    errors.push('Market cap rate must be greater than 0');
  }

  if (inputs.marketCapRate > 20) {
    errors.push('Market cap rate cannot exceed 20%');
  }

  if (!inputs.marketDiscountRate || inputs.marketDiscountRate <= 0) {
    errors.push('Market discount rate must be greater than 0');
  }

  if (inputs.marketDiscountRate > 30) {
    errors.push('Market discount rate cannot exceed 30%');
  }

  if (inputs.marketGrowthRate === undefined) {
    errors.push('Market growth rate is required');
  }

  if (inputs.marketGrowthRate < -10 || inputs.marketGrowthRate > 20) {
    errors.push('Market growth rate must be between -10% and 20%');
  }

  // Comparable Sales Validation
  if (inputs.comparableSales && inputs.comparableSales.length > 0) {
    inputs.comparableSales.forEach((comp, index) => {
      if (!comp.address || comp.address.trim().length === 0) {
        errors.push(`Comparable sale ${index + 1}: Address is required`);
      }
      if (!comp.salePrice || comp.salePrice <= 0) {
        errors.push(`Comparable sale ${index + 1}: Sale price must be greater than 0`);
      }
      if (!comp.saleDate) {
        errors.push(`Comparable sale ${index + 1}: Sale date is required`);
      } else {
        const saleDate = new Date(comp.saleDate);
        if (isNaN(saleDate.getTime())) {
          errors.push(`Comparable sale ${index + 1}: Invalid sale date format`);
        }
      }
      if (comp.capRate === undefined || comp.capRate <= 0) {
        errors.push(`Comparable sale ${index + 1}: Cap rate must be greater than 0`);
      }
      if (!comp.size || comp.size <= 0) {
        errors.push(`Comparable sale ${index + 1}: Size must be greater than 0`);
      }
    });
  }

  // Improvements Validation
  if (inputs.buildingValue === undefined || inputs.buildingValue < 0) {
    errors.push('Building value must be 0 or greater');
  }

  if (inputs.buildingAge === undefined || inputs.buildingAge < 0) {
    errors.push('Building age must be 0 or greater');
  }

  if (inputs.buildingAge > 100) {
    errors.push('Building age cannot exceed 100 years');
  }

  if (!inputs.buildingCondition) {
    errors.push('Building condition is required');
  }

  if (inputs.remainingEconomicLife === undefined || inputs.remainingEconomicLife < 0) {
    errors.push('Remaining economic life must be 0 or greater');
  }

  if (inputs.remainingEconomicLife > 100) {
    errors.push('Remaining economic life cannot exceed 100 years');
  }

  if (inputs.depreciationRate === undefined || inputs.depreciationRate < 0) {
    errors.push('Depreciation rate must be 0 or greater');
  }

  if (inputs.depreciationRate > 10) {
    errors.push('Depreciation rate cannot exceed 10%');
  }

  // Risk Factors Validation
  if (!inputs.tenantCredit) {
    errors.push('Tenant credit rating is required');
  }

  if (!inputs.leaseSecurity) {
    errors.push('Lease security is required');
  }

  if (!inputs.marketRisk) {
    errors.push('Market risk is required');
  }

  if (!inputs.redevelopmentRisk) {
    errors.push('Redevelopment risk is required');
  }

  // Legal and Regulatory Validation
  if (inputs.zoningRestrictions === undefined) {
    errors.push('Zoning restrictions field is required');
  }

  if (inputs.environmentalIssues === undefined) {
    errors.push('Environmental issues field is required');
  }

  if (inputs.titleIssues === undefined) {
    errors.push('Title issues field is required');
  }

  if (inputs.easements === undefined) {
    errors.push('Easements field is required');
  }

  if (inputs.restrictions && inputs.restrictions.length > 0) {
    inputs.restrictions.forEach((restriction, index) => {
      if (!restriction || restriction.trim().length === 0) {
        errors.push(`Restriction ${index + 1}: Description is required`);
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 50) {
    errors.push('Analysis period cannot exceed 50 years');
  }

  if (!inputs.terminalCapRate || inputs.terminalCapRate <= 0) {
    errors.push('Terminal cap rate must be greater than 0');
  }

  if (inputs.terminalCapRate > 20) {
    errors.push('Terminal cap rate cannot exceed 20%');
  }

  if (inputs.reversionValue === undefined || inputs.reversionValue < 0) {
    errors.push('Reversion value must be 0 or greater');
  }

  if (!inputs.discountRate || inputs.discountRate <= 0) {
    errors.push('Discount rate must be greater than 0');
  }

  if (inputs.discountRate > 30) {
    errors.push('Discount rate cannot exceed 30%');
  }

  if (inputs.inflationRate === undefined) {
    errors.push('Inflation rate is required');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
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
  if (inputs.currentRent && inputs.operatingExpenses && inputs.currentRent <= inputs.operatingExpenses) {
    warnings.push('Current rent is less than or equal to operating expenses, which may indicate a poor investment');
  }

  if (inputs.marketCapRate && inputs.marketDiscountRate && inputs.marketCapRate >= inputs.marketDiscountRate) {
    warnings.push('Market cap rate should typically be lower than market discount rate');
  }

  if (inputs.rentEscalation && inputs.inflationRate && inputs.rentEscalation < inputs.inflationRate) {
    warnings.push('Rent escalation rate is lower than inflation rate, which may erode real returns');
  }

  if (inputs.buildingAge && inputs.remainingEconomicLife && inputs.buildingAge + inputs.remainingEconomicLife > 100) {
    warnings.push('Combined building age and remaining economic life exceeds typical building lifespan');
  }

  if (inputs.tenantCredit && ['ccc', 'default'].includes(inputs.tenantCredit)) {
    warnings.push('Tenant has poor credit rating, indicating high default risk');
  }

  if (inputs.leaseSecurity === 'subordinated') {
    warnings.push('Subordinated lease security indicates higher risk');
  }

  if (inputs.marketRisk === 'high') {
    warnings.push('High market risk may impact investment performance');
  }

  if (inputs.redevelopmentRisk === 'high') {
    warnings.push('High redevelopment risk may affect long-term value');
  }

  if (inputs.environmentalIssues) {
    warnings.push('Environmental issues may require remediation and affect property value');
  }

  if (inputs.titleIssues) {
    warnings.push('Title issues may affect property ownership and value');
  }

  // Cross-field Validation
  if (inputs.leaseTerm && inputs.remainingTerm && inputs.remainingTerm > inputs.leaseTerm) {
    errors.push('Remaining term cannot exceed total lease term');
  }

  if (inputs.analysisPeriod && inputs.remainingTerm && inputs.analysisPeriod > inputs.remainingTerm) {
    warnings.push('Analysis period exceeds remaining lease term');
  }

  if (inputs.marketRent && inputs.propertySize && inputs.currentRent) {
    const marketRentTotal = inputs.marketRent * inputs.propertySize;
    const rentDifference = Math.abs(inputs.currentRent - marketRentTotal) / marketRentTotal;
    if (rentDifference > 0.5) {
      warnings.push('Current rent differs significantly from market rent');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
