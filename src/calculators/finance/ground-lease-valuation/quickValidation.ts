import { GroundLeaseValuationInputs } from './types';

export function validatePropertyAddress(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.trim().length < 5) {
    return 'Property address must be at least 5 characters long';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Property type is required';
  }
  const validTypes = ['commercial', 'residential', 'industrial', 'retail', 'office', 'mixed_use'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type';
  }
  return null;
}

export function validatePropertySize(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Property size must be greater than 0';
  }
  if (value > 10000000) {
    return 'Property size cannot exceed 10,000,000 sq ft';
  }
  return null;
}

export function validateLandSize(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Land size must be greater than 0';
  }
  if (value > 10000) {
    return 'Land size cannot exceed 10,000 acres';
  }
  return null;
}

export function validateZoning(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Zoning classification is required';
  }
  return null;
}

export function validateCurrentUse(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Current use is required';
  }
  return null;
}

export function validateHighestBestUse(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Highest and best use is required';
  }
  return null;
}

export function validateLeaseType(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Lease type is required';
  }
  const validTypes = ['ground_lease', 'land_lease', 'master_lease', 'sublease'];
  if (!validTypes.includes(value)) {
    return 'Invalid lease type';
  }
  return null;
}

export function validateLeaseStartDate(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Lease start date is required';
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return 'Invalid lease start date format';
  }
  return null;
}

export function validateLeaseEndDate(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Lease end date is required';
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return 'Invalid lease end date format';
  }
  
  if (allInputs.leaseStartDate) {
    const startDate = new Date(allInputs.leaseStartDate);
    if (date <= startDate) {
      return 'Lease end date must be after lease start date';
    }
  }
  return null;
}

export function validateLeaseTerm(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Lease term must be greater than 0';
  }
  if (value > 99) {
    return 'Lease term cannot exceed 99 years';
  }
  return null;
}

export function validateRemainingTerm(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Remaining term must be 0 or greater';
  }
  if (allInputs.leaseTerm && value > allInputs.leaseTerm) {
    return 'Remaining term cannot exceed total lease term';
  }
  return null;
}

export function validateRenewalOptions(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Renewal options must be 0 or greater';
  }
  if (value > 10) {
    return 'Renewal options cannot exceed 10';
  }
  return null;
}

export function validateRenewalTerm(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Renewal term must be greater than 0';
  }
  if (value > 20) {
    return 'Renewal term cannot exceed 20 years';
  }
  return null;
}

export function validateCurrentRent(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Current annual rent must be greater than 0';
  }
  if (value > 10000000) {
    return 'Current annual rent cannot exceed $10,000,000';
  }
  return null;
}

export function validateRentEscalation(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Rent escalation rate must be 0 or greater';
  }
  if (value > 50) {
    return 'Rent escalation rate cannot exceed 50%';
  }
  return null;
}

export function validateRentEscalationFrequency(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Rent escalation frequency is required';
  }
  const validFrequencies = ['annual', 'biennial', 'quinquennial', 'decennial'];
  if (!validFrequencies.includes(value)) {
    return 'Invalid rent escalation frequency';
  }
  return null;
}

export function validateRentReviewFrequency(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value <= 0) {
    return 'Rent review frequency must be greater than 0';
  }
  if (value > 20) {
    return 'Rent review frequency cannot exceed 20 years';
  }
  return null;
}

export function validateRentReviewMethod(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Rent review method is required';
  }
  const validMethods = ['market', 'cpi', 'fixed', 'hybrid'];
  if (!validMethods.includes(value)) {
    return 'Invalid rent review method';
  }
  return null;
}

export function validateOperatingExpenses(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Operating expenses must be 0 or greater';
  }
  if (value > 1000000) {
    return 'Operating expenses cannot exceed $1,000,000';
  }
  return null;
}

export function validatePropertyTaxes(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property taxes must be 0 or greater';
  }
  if (value > 1000000) {
    return 'Property taxes cannot exceed $1,000,000';
  }
  return null;
}

export function validateInsurance(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Insurance costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Insurance costs cannot exceed $100,000';
  }
  return null;
}

export function validateMaintenance(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Maintenance costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Maintenance costs cannot exceed $100,000';
  }
  return null;
}

export function validateUtilities(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Utility costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Utility costs cannot exceed $100,000';
  }
  return null;
}

export function validateManagementFees(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Management fees must be 0 or greater';
  }
  if (value > 100000) {
    return 'Management fees cannot exceed $100,000';
  }
  return null;
}

export function validateMarketRent(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Market rent must be greater than 0';
  }
  if (value > 1000) {
    return 'Market rent cannot exceed $1,000 per sq ft/year';
  }
  return null;
}

export function validateMarketCapRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Market cap rate must be greater than 0';
  }
  if (value > 20) {
    return 'Market cap rate cannot exceed 20%';
  }
  return null;
}

export function validateMarketDiscountRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Market discount rate must be greater than 0';
  }
  if (value > 30) {
    return 'Market discount rate cannot exceed 30%';
  }
  return null;
}

export function validateMarketGrowthRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined) {
    return 'Market growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Market growth rate must be between -10% and 20%';
  }
  return null;
}

export function validateBuildingValue(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Building value must be 0 or greater';
  }
  if (value > 100000000) {
    return 'Building value cannot exceed $100,000,000';
  }
  return null;
}

export function validateBuildingAge(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Building age must be 0 or greater';
  }
  if (value > 100) {
    return 'Building age cannot exceed 100 years';
  }
  return null;
}

export function validateBuildingCondition(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Building condition is required';
  }
  const validConditions = ['excellent', 'good', 'fair', 'poor'];
  if (!validConditions.includes(value)) {
    return 'Invalid building condition';
  }
  return null;
}

export function validateRemainingEconomicLife(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Remaining economic life must be 0 or greater';
  }
  if (value > 100) {
    return 'Remaining economic life cannot exceed 100 years';
  }
  return null;
}

export function validateDepreciationRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Depreciation rate must be 0 or greater';
  }
  if (value > 10) {
    return 'Depreciation rate cannot exceed 10%';
  }
  return null;
}

export function validateTenantCredit(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Tenant credit rating is required';
  }
  const validRatings = ['aaa', 'aa', 'a', 'bbb', 'bb', 'b', 'ccc', 'default'];
  if (!validRatings.includes(value)) {
    return 'Invalid tenant credit rating';
  }
  return null;
}

export function validateLeaseSecurity(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Lease security is required';
  }
  const validSecurities = ['guaranteed', 'secured', 'unsecured', 'subordinated'];
  if (!validSecurities.includes(value)) {
    return 'Invalid lease security';
  }
  return null;
}

export function validateMarketRisk(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Market risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid market risk level';
  }
  return null;
}

export function validateRedevelopmentRisk(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Redevelopment risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid redevelopment risk level';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 50) {
    return 'Analysis period cannot exceed 50 years';
  }
  return null;
}

export function validateTerminalCapRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Terminal cap rate must be greater than 0';
  }
  if (value > 20) {
    return 'Terminal cap rate cannot exceed 20%';
  }
  return null;
}

export function validateReversionValue(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Reversion value must be 0 or greater';
  }
  if (value > 100000000) {
    return 'Reversion value cannot exceed $100,000,000';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value || value <= 0) {
    return 'Discount rate must be greater than 0';
  }
  if (value > 30) {
    return 'Discount rate cannot exceed 30%';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs: GroundLeaseValuationInputs): string | null {
  if (value === undefined) {
    return 'Inflation rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Inflation rate must be between -5% and 15%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: GroundLeaseValuationInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'basis-points'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}
