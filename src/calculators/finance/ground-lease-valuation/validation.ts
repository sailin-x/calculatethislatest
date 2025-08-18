import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateGroundLeaseInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.landValue) {
    errors.push('Land value is required');
  }
  if (!inputs.leaseTerm) {
    errors.push('Lease term is required');
  }
  if (!inputs.annualRent) {
    errors.push('Annual rent is required');
  }
  if (!inputs.rentEscalation) {
    errors.push('Rent escalation rate is required');
  }
  if (!inputs.discountRate) {
    errors.push('Discount rate is required');
  }
  if (!inputs.landAppreciation) {
    errors.push('Land appreciation rate is required');
  }
  if (!inputs.leaseType) {
    errors.push('Lease type is required');
  }
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }
  if (!inputs.location) {
    errors.push('Location is required');
  }
  if (!inputs.marketType) {
    errors.push('Market type is required');
  }

  // Data type validation
  if (inputs.landValue && typeof inputs.landValue !== 'number') {
    errors.push('Land value must be a number');
  }
  if (inputs.leaseTerm && typeof inputs.leaseTerm !== 'number') {
    errors.push('Lease term must be a number');
  }
  if (inputs.annualRent && typeof inputs.annualRent !== 'number') {
    errors.push('Annual rent must be a number');
  }
  if (inputs.rentEscalation && typeof inputs.rentEscalation !== 'number') {
    errors.push('Rent escalation rate must be a number');
  }
  if (inputs.discountRate && typeof inputs.discountRate !== 'number') {
    errors.push('Discount rate must be a number');
  }
  if (inputs.landAppreciation && typeof inputs.landAppreciation !== 'number') {
    errors.push('Land appreciation rate must be a number');
  }
  if (inputs.reversionaryValue && typeof inputs.reversionaryValue !== 'number') {
    errors.push('Reversionary value must be a number');
  }
  if (inputs.operatingExpenses && typeof inputs.operatingExpenses !== 'number') {
    errors.push('Operating expenses must be a number');
  }
  if (inputs.propertyTaxes && typeof inputs.propertyTaxes !== 'number') {
    errors.push('Property taxes must be a number');
  }
  if (inputs.insurance && typeof inputs.insurance !== 'number') {
    errors.push('Insurance costs must be a number');
  }
  if (inputs.maintenance && typeof inputs.maintenance !== 'number') {
    errors.push('Maintenance costs must be a number');
  }
  if (inputs.managementFees && typeof inputs.managementFees !== 'number') {
    errors.push('Management fees must be a number');
  }
  if (inputs.vacancyRate && typeof inputs.vacancyRate !== 'number') {
    errors.push('Vacancy rate must be a number');
  }
  if (inputs.collectionLoss && typeof inputs.collectionLoss !== 'number') {
    errors.push('Collection loss rate must be a number');
  }
  if (inputs.inflationRate && typeof inputs.inflationRate !== 'number') {
    errors.push('Inflation rate must be a number');
  }
  if (inputs.taxRate && typeof inputs.taxRate !== 'number') {
    errors.push('Tax rate must be a number');
  }
  if (inputs.riskScore && typeof inputs.riskScore !== 'number') {
    errors.push('Risk score must be a number');
  }

  // Range validation
  if (inputs.landValue && (inputs.landValue < 10000 || inputs.landValue > 100000000)) {
    errors.push('Land value must be between $10,000 and $100,000,000');
  }
  if (inputs.leaseTerm && (inputs.leaseTerm < 1 || inputs.leaseTerm > 999)) {
    errors.push('Lease term must be between 1 and 999 years');
  }
  if (inputs.annualRent && (inputs.annualRent < 1000 || inputs.annualRent > 10000000)) {
    errors.push('Annual rent must be between $1,000 and $10,000,000');
  }
  if (inputs.rentEscalation && (inputs.rentEscalation < 0 || inputs.rentEscalation > 20)) {
    errors.push('Rent escalation rate must be between 0% and 20%');
  }
  if (inputs.discountRate && (inputs.discountRate < 1 || inputs.discountRate > 25)) {
    errors.push('Discount rate must be between 1% and 25%');
  }
  if (inputs.landAppreciation && (inputs.landAppreciation < -10 || inputs.landAppreciation > 15)) {
    errors.push('Land appreciation rate must be between -10% and 15%');
  }
  if (inputs.reversionaryValue && (inputs.reversionaryValue < 0 || inputs.reversionaryValue > 100000000)) {
    errors.push('Reversionary value must be between $0 and $100,000,000');
  }
  if (inputs.operatingExpenses && (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 1000000)) {
    errors.push('Operating expenses must be between $0 and $1,000,000');
  }
  if (inputs.propertyTaxes && (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 1000000)) {
    errors.push('Property taxes must be between $0 and $1,000,000');
  }
  if (inputs.insurance && (inputs.insurance < 0 || inputs.insurance > 100000)) {
    errors.push('Insurance costs must be between $0 and $100,000');
  }
  if (inputs.maintenance && (inputs.maintenance < 0 || inputs.maintenance > 100000)) {
    errors.push('Maintenance costs must be between $0 and $100,000');
  }
  if (inputs.managementFees && (inputs.managementFees < 0 || inputs.managementFees > 100000)) {
    errors.push('Management fees must be between $0 and $100,000');
  }
  if (inputs.vacancyRate && (inputs.vacancyRate < 0 || inputs.vacancyRate > 50)) {
    errors.push('Vacancy rate must be between 0% and 50%');
  }
  if (inputs.collectionLoss && (inputs.collectionLoss < 0 || inputs.collectionLoss > 20)) {
    errors.push('Collection loss rate must be between 0% and 20%');
  }
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }
  if (inputs.riskScore && (inputs.riskScore < 1 || inputs.riskScore > 10)) {
    errors.push('Risk score must be between 1 and 10');
  }

  // Logical validation
  if (inputs.annualRent && inputs.landValue && inputs.annualRent > inputs.landValue) {
    errors.push('Annual rent cannot exceed land value');
  }
  if (inputs.reversionaryValue && inputs.landValue && inputs.reversionaryValue < inputs.landValue * 0.1) {
    errors.push('Reversionary value seems too low relative to land value');
  }
  if (inputs.reversionaryValue && inputs.landValue && inputs.reversionaryValue > inputs.landValue * 10) {
    errors.push('Reversionary value seems too high relative to land value');
  }
  if (inputs.discountRate && inputs.rentEscalation && inputs.discountRate <= inputs.rentEscalation) {
    errors.push('Discount rate should be higher than rent escalation rate for valid calculations');
  }
  if (inputs.landAppreciation && inputs.rentEscalation && inputs.landAppreciation > inputs.rentEscalation * 2) {
    errors.push('Land appreciation rate seems unusually high relative to rent escalation');
  }

  // Enum validation
  const validLeaseTypes = ['net', 'gross', 'triple-net', 'percentage'];
  if (inputs.leaseType && !validLeaseTypes.includes(inputs.leaseType)) {
    errors.push('Invalid lease type. Must be one of: net, gross, triple-net, percentage');
  }

  const validPropertyTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'agricultural'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type. Must be one of: residential, commercial, industrial, mixed-use, agricultural');
  }

  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Invalid location. Must be one of: urban, suburban, rural, coastal, mountain');
  }

  const validMarketTypes = ['hot', 'stable', 'declining', 'emerging'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type. Must be one of: hot, stable, declining, emerging');
  }

  const validTenantCredits = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'unknown'];
  if (inputs.tenantCredit && !validTenantCredits.includes(inputs.tenantCredit)) {
    errors.push('Invalid tenant credit rating. Must be one of: AAA, AA, A, BBB, BB, B, CCC, unknown');
  }

  const validPaymentFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (inputs.paymentFrequency && !validPaymentFrequencies.includes(inputs.paymentFrequency)) {
    errors.push('Invalid payment frequency. Must be one of: monthly, quarterly, semi-annually, annually');
  }

  const validMarketLiquidity = ['high', 'medium', 'low'];
  if (inputs.marketLiquidity && !validMarketLiquidity.includes(inputs.marketLiquidity)) {
    errors.push('Invalid market liquidity. Must be one of: high, medium, low');
  }

  // Date validation
  if (inputs.leaseStartDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(inputs.leaseStartDate)) {
      errors.push('Lease start date must be in YYYY-MM-DD format');
    } else {
      const date = new Date(inputs.leaseStartDate);
      if (isNaN(date.getTime())) {
        errors.push('Invalid lease start date');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateGroundLeaseInput(field: string, value: any): string | null {
  switch (field) {
    case 'landValue':
      if (!value) return 'Land value is required';
      if (typeof value !== 'number') return 'Land value must be a number';
      if (value < 10000 || value > 100000000) return 'Land value must be between $10,000 and $100,000,000';
      return null;

    case 'leaseTerm':
      if (!value) return 'Lease term is required';
      if (typeof value !== 'number') return 'Lease term must be a number';
      if (value < 1 || value > 999) return 'Lease term must be between 1 and 999 years';
      return null;

    case 'annualRent':
      if (!value) return 'Annual rent is required';
      if (typeof value !== 'number') return 'Annual rent must be a number';
      if (value < 1000 || value > 10000000) return 'Annual rent must be between $1,000 and $10,000,000';
      return null;

    case 'rentEscalation':
      if (!value) return 'Rent escalation rate is required';
      if (typeof value !== 'number') return 'Rent escalation rate must be a number';
      if (value < 0 || value > 20) return 'Rent escalation rate must be between 0% and 20%';
      return null;

    case 'discountRate':
      if (!value) return 'Discount rate is required';
      if (typeof value !== 'number') return 'Discount rate must be a number';
      if (value < 1 || value > 25) return 'Discount rate must be between 1% and 25%';
      return null;

    case 'landAppreciation':
      if (!value) return 'Land appreciation rate is required';
      if (typeof value !== 'number') return 'Land appreciation rate must be a number';
      if (value < -10 || value > 15) return 'Land appreciation rate must be between -10% and 15%';
      return null;

    case 'reversionaryValue':
      if (value && typeof value !== 'number') return 'Reversionary value must be a number';
      if (value && (value < 0 || value > 100000000)) return 'Reversionary value must be between $0 and $100,000,000';
      return null;

    case 'leaseType':
      if (!value) return 'Lease type is required';
      const validLeaseTypes = ['net', 'gross', 'triple-net', 'percentage'];
      if (!validLeaseTypes.includes(value)) return 'Invalid lease type';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'agricultural'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'location':
      if (!value) return 'Location is required';
      const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
      if (!validLocations.includes(value)) return 'Invalid location';
      return null;

    case 'marketType':
      if (!value) return 'Market type is required';
      const validMarketTypes = ['hot', 'stable', 'declining', 'emerging'];
      if (!validMarketTypes.includes(value)) return 'Invalid market type';
      return null;

    case 'tenantCredit':
      if (value) {
        const validTenantCredits = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'unknown'];
        if (!validTenantCredits.includes(value)) return 'Invalid tenant credit rating';
      }
      return null;

    case 'paymentFrequency':
      if (value) {
        const validPaymentFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
        if (!validPaymentFrequencies.includes(value)) return 'Invalid payment frequency';
      }
      return null;

    case 'marketLiquidity':
      if (value) {
        const validMarketLiquidity = ['high', 'medium', 'low'];
        if (!validMarketLiquidity.includes(value)) return 'Invalid market liquidity';
      }
      return null;

    case 'operatingExpenses':
      if (value && typeof value !== 'number') return 'Operating expenses must be a number';
      if (value && (value < 0 || value > 1000000)) return 'Operating expenses must be between $0 and $1,000,000';
      return null;

    case 'propertyTaxes':
      if (value && typeof value !== 'number') return 'Property taxes must be a number';
      if (value && (value < 0 || value > 1000000)) return 'Property taxes must be between $0 and $1,000,000';
      return null;

    case 'insurance':
      if (value && typeof value !== 'number') return 'Insurance costs must be a number';
      if (value && (value < 0 || value > 100000)) return 'Insurance costs must be between $0 and $100,000';
      return null;

    case 'maintenance':
      if (value && typeof value !== 'number') return 'Maintenance costs must be a number';
      if (value && (value < 0 || value > 100000)) return 'Maintenance costs must be between $0 and $100,000';
      return null;

    case 'managementFees':
      if (value && typeof value !== 'number') return 'Management fees must be a number';
      if (value && (value < 0 || value > 100000)) return 'Management fees must be between $0 and $100,000';
      return null;

    case 'vacancyRate':
      if (value && typeof value !== 'number') return 'Vacancy rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Vacancy rate must be between 0% and 50%';
      return null;

    case 'collectionLoss':
      if (value && typeof value !== 'number') return 'Collection loss rate must be a number';
      if (value && (value < 0 || value > 20)) return 'Collection loss rate must be between 0% and 20%';
      return null;

    case 'inflationRate':
      if (value && typeof value !== 'number') return 'Inflation rate must be a number';
      if (value && (value < -5 || value > 15)) return 'Inflation rate must be between -5% and 15%';
      return null;

    case 'taxRate':
      if (value && typeof value !== 'number') return 'Tax rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Tax rate must be between 0% and 50%';
      return null;

    case 'riskScore':
      if (value && typeof value !== 'number') return 'Risk score must be a number';
      if (value && (value < 1 || value > 10)) return 'Risk score must be between 1 and 10';
      return null;

    case 'leaseStartDate':
      if (value) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) return 'Lease start date must be in YYYY-MM-DD format';
        const date = new Date(value);
        if (isNaN(date.getTime())) return 'Invalid lease start date';
      }
      return null;

    default:
      return null;
  }
}
