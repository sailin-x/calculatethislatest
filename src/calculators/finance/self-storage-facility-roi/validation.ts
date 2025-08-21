import { ValidationRuleFactory } from '../../../utils/ValidationRuleFactory';
import { SelfStorageFacilityROIInputs } from './SelfStorageFacilityROICalculator';

export function validateSelfStorageFacilityROIInputs(inputs: SelfStorageFacilityROIInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  ruleFactory
    .required('propertyValue', inputs.propertyValue, 'Property value is required')
    .required('purchasePrice', inputs.purchasePrice, 'Purchase price is required')
    .required('squareFootage', inputs.squareFootage, 'Square footage is required')
    .required('unitCount', inputs.unitCount, 'Unit count is required')
    .required('averageUnitSize', inputs.averageUnitSize, 'Average unit size is required')
    .required('propertyAge', inputs.propertyAge, 'Property age is required')
    .required('propertyType', inputs.propertyType, 'Property type is required')
    .required('downPayment', inputs.downPayment, 'Down payment is required')
    .required('interestRate', inputs.interestRate, 'Interest rate is required')
    .required('loanTerm', inputs.loanTerm, 'Loan term is required')
    .required('closingCosts', inputs.closingCosts, 'Closing costs are required')
    .required('averageOccupancyRate', inputs.averageOccupancyRate, 'Average occupancy rate is required')
    .required('averageRentPerSqFt', inputs.averageRentPerSqFt, 'Average rent per sq ft is required')
    .required('propertyTaxes', inputs.propertyTaxes, 'Property taxes are required')
    .required('insurance', inputs.insurance, 'Insurance costs are required')
    .required('utilities', inputs.utilities, 'Utility costs are required')
    .required('maintenance', inputs.maintenance, 'Maintenance costs are required')
    .required('managementFees', inputs.managementFees, 'Management fees are required')
    .required('marketing', inputs.marketing, 'Marketing costs are required')
    .required('administrative', inputs.administrative, 'Administrative costs are required')
    .required('security', inputs.security, 'Security costs are required')
    .required('landscaping', inputs.landscaping, 'Landscaping costs are required')
    .required('pestControl', inputs.pestControl, 'Pest control costs are required')
    .required('trashRemoval', inputs.trashRemoval, 'Trash removal costs are required')
    .required('marketGrowthRate', inputs.marketGrowthRate, 'Market growth rate is required')
    .required('rentGrowthRate', inputs.rentGrowthRate, 'Rent growth rate is required')
    .required('expenseGrowthRate', inputs.expenseGrowthRate, 'Expense growth rate is required')
    .required('vacancyRate', inputs.vacancyRate, 'Vacancy rate is required')
    .required('holdingPeriod', inputs.holdingPeriod, 'Holding period is required')
    .required('exitCapRate', inputs.exitCapRate, 'Exit cap rate is required')
    .required('appreciationRate', inputs.appreciationRate, 'Appreciation rate is required')
    .required('locationQuality', inputs.locationQuality, 'Location quality is required')
    .required('competitionLevel', inputs.competitionLevel, 'Competition level is required')
    .required('economicConditions', inputs.economicConditions, 'Economic conditions are required')
    .required('regulatoryEnvironment', inputs.regulatoryEnvironment, 'Regulatory environment is required');

  // Property value validations
  ruleFactory
    .min('propertyValue', inputs.propertyValue, 100000, 'Property value must be at least $100,000')
    .max('propertyValue', inputs.propertyValue, 100000000, 'Property value cannot exceed $100,000,000')
    .positive('propertyValue', inputs.propertyValue, 'Property value must be positive');

  // Purchase price validations
  ruleFactory
    .min('purchasePrice', inputs.purchasePrice, 100000, 'Purchase price must be at least $100,000')
    .max('purchasePrice', inputs.purchasePrice, 100000000, 'Purchase price cannot exceed $100,000,000')
    .positive('purchasePrice', inputs.purchasePrice, 'Purchase price must be positive');

  // Square footage validations
  ruleFactory
    .min('squareFootage', inputs.squareFootage, 1000, 'Square footage must be at least 1,000 sq ft')
    .max('squareFootage', inputs.squareFootage, 1000000, 'Square footage cannot exceed 1,000,000 sq ft')
    .positive('squareFootage', inputs.squareFootage, 'Square footage must be positive');

  // Unit count validations
  ruleFactory
    .min('unitCount', inputs.unitCount, 10, 'Unit count must be at least 10')
    .max('unitCount', inputs.unitCount, 10000, 'Unit count cannot exceed 10,000')
    .positive('unitCount', inputs.unitCount, 'Unit count must be positive');

  // Average unit size validations
  ruleFactory
    .min('averageUnitSize', inputs.averageUnitSize, 5, 'Average unit size must be at least 5 sq ft')
    .max('averageUnitSize', inputs.averageUnitSize, 1000, 'Average unit size cannot exceed 1,000 sq ft')
    .positive('averageUnitSize', inputs.averageUnitSize, 'Average unit size must be positive');

  // Property age validations
  ruleFactory
    .min('propertyAge', inputs.propertyAge, 0, 'Property age cannot be negative')
    .max('propertyAge', inputs.propertyAge, 50, 'Property age cannot exceed 50 years');

  // Financial validations
  ruleFactory
    .min('downPayment', inputs.downPayment, 0, 'Down payment cannot be negative')
    .max('downPayment', inputs.downPayment, inputs.purchasePrice, 'Down payment cannot exceed purchase price')
    .min('interestRate', inputs.interestRate, 0, 'Interest rate cannot be negative')
    .max('interestRate', inputs.interestRate, 20, 'Interest rate cannot exceed 20%')
    .min('loanTerm', inputs.loanTerm, 1, 'Loan term must be at least 1 year')
    .max('loanTerm', inputs.loanTerm, 30, 'Loan term cannot exceed 30 years')
    .min('closingCosts', inputs.closingCosts, 0, 'Closing costs cannot be negative')
    .max('closingCosts', inputs.closingCosts, 1000000, 'Closing costs cannot exceed $1,000,000');

  // Revenue validations
  ruleFactory
    .min('averageOccupancyRate', inputs.averageOccupancyRate, 0, 'Occupancy rate cannot be negative')
    .max('averageOccupancyRate', inputs.averageOccupancyRate, 100, 'Occupancy rate cannot exceed 100%')
    .min('averageRentPerSqFt', inputs.averageRentPerSqFt, 0.1, 'Rent per sq ft must be at least $0.10')
    .max('averageRentPerSqFt', inputs.averageRentPerSqFt, 10, 'Rent per sq ft cannot exceed $10.00')
    .positive('averageRentPerSqFt', inputs.averageRentPerSqFt, 'Rent per sq ft must be positive');

  // Optional revenue validations
  if (inputs.lateFees !== undefined) {
    ruleFactory
      .min('lateFees', inputs.lateFees, 0, 'Late fees cannot be negative')
      .max('lateFees', inputs.lateFees, 10000, 'Late fees cannot exceed $10,000 per month');
  }

  if (inputs.insuranceSales !== undefined) {
    ruleFactory
      .min('insuranceSales', inputs.insuranceSales, 0, 'Insurance sales cannot be negative')
      .max('insuranceSales', inputs.insuranceSales, 10000, 'Insurance sales cannot exceed $10,000 per month');
  }

  if (inputs.packingSupplySales !== undefined) {
    ruleFactory
      .min('packingSupplySales', inputs.packingSupplySales, 0, 'Packing supply sales cannot be negative')
      .max('packingSupplySales', inputs.packingSupplySales, 10000, 'Packing supply sales cannot exceed $10,000 per month');
  }

  if (inputs.otherAncillaryIncome !== undefined) {
    ruleFactory
      .min('otherAncillaryIncome', inputs.otherAncillaryIncome, 0, 'Other ancillary income cannot be negative')
      .max('otherAncillaryIncome', inputs.otherAncillaryIncome, 10000, 'Other ancillary income cannot exceed $10,000 per month');
  }

  // Expense validations
  ruleFactory
    .min('propertyTaxes', inputs.propertyTaxes, 0, 'Property taxes cannot be negative')
    .max('propertyTaxes', inputs.propertyTaxes, 1000000, 'Property taxes cannot exceed $1,000,000')
    .min('insurance', inputs.insurance, 0, 'Insurance costs cannot be negative')
    .max('insurance', inputs.insurance, 1000000, 'Insurance costs cannot exceed $1,000,000')
    .min('utilities', inputs.utilities, 0, 'Utility costs cannot be negative')
    .max('utilities', inputs.utilities, 1000000, 'Utility costs cannot exceed $1,000,000')
    .min('maintenance', inputs.maintenance, 0, 'Maintenance costs cannot be negative')
    .max('maintenance', inputs.maintenance, 1000000, 'Maintenance costs cannot exceed $1,000,000')
    .min('managementFees', inputs.managementFees, 0, 'Management fees cannot be negative')
    .max('managementFees', inputs.managementFees, 1000000, 'Management fees cannot exceed $1,000,000')
    .min('marketing', inputs.marketing, 0, 'Marketing costs cannot be negative')
    .max('marketing', inputs.marketing, 1000000, 'Marketing costs cannot exceed $1,000,000')
    .min('administrative', inputs.administrative, 0, 'Administrative costs cannot be negative')
    .max('administrative', inputs.administrative, 1000000, 'Administrative costs cannot exceed $1,000,000')
    .min('security', inputs.security, 0, 'Security costs cannot be negative')
    .max('security', inputs.security, 1000000, 'Security costs cannot exceed $1,000,000')
    .min('landscaping', inputs.landscaping, 0, 'Landscaping costs cannot be negative')
    .max('landscaping', inputs.landscaping, 1000000, 'Landscaping costs cannot exceed $1,000,000')
    .min('pestControl', inputs.pestControl, 0, 'Pest control costs cannot be negative')
    .max('pestControl', inputs.pestControl, 1000000, 'Pest control costs cannot exceed $1,000,000')
    .min('trashRemoval', inputs.trashRemoval, 0, 'Trash removal costs cannot be negative')
    .max('trashRemoval', inputs.trashRemoval, 1000000, 'Trash removal costs cannot exceed $1,000,000');

  // Market factor validations
  ruleFactory
    .min('marketGrowthRate', inputs.marketGrowthRate, -10, 'Market growth rate cannot be less than -10%')
    .max('marketGrowthRate', inputs.marketGrowthRate, 20, 'Market growth rate cannot exceed 20%')
    .min('rentGrowthRate', inputs.rentGrowthRate, -5, 'Rent growth rate cannot be less than -5%')
    .max('rentGrowthRate', inputs.rentGrowthRate, 15, 'Rent growth rate cannot exceed 15%')
    .min('expenseGrowthRate', inputs.expenseGrowthRate, 0, 'Expense growth rate cannot be negative')
    .max('expenseGrowthRate', inputs.expenseGrowthRate, 10, 'Expense growth rate cannot exceed 10%')
    .min('vacancyRate', inputs.vacancyRate, 0, 'Vacancy rate cannot be negative')
    .max('vacancyRate', inputs.vacancyRate, 50, 'Vacancy rate cannot exceed 50%');

  // Investment timeline validations
  ruleFactory
    .min('holdingPeriod', inputs.holdingPeriod, 1, 'Holding period must be at least 1 year')
    .max('holdingPeriod', inputs.holdingPeriod, 30, 'Holding period cannot exceed 30 years')
    .min('exitCapRate', inputs.exitCapRate, 2, 'Exit cap rate must be at least 2%')
    .max('exitCapRate', inputs.exitCapRate, 15, 'Exit cap rate cannot exceed 15%')
    .min('appreciationRate', inputs.appreciationRate, -5, 'Appreciation rate cannot be less than -5%')
    .max('appreciationRate', inputs.appreciationRate, 10, 'Appreciation rate cannot exceed 10%');

  // Business logic validations
  const totalExpenses = inputs.propertyTaxes + inputs.insurance + inputs.utilities + 
                       inputs.maintenance + inputs.managementFees + inputs.marketing + 
                       inputs.administrative + inputs.security + inputs.landscaping + 
                       inputs.pestControl + inputs.trashRemoval;
  
  const estimatedRevenue = inputs.squareFootage * inputs.averageRentPerSqFt * 12 * (inputs.averageOccupancyRate / 100);
  const expenseRatio = (totalExpenses / estimatedRevenue) * 100;

  if (expenseRatio > 80) {
    errors.push('Total operating expenses appear too high relative to revenue (expense ratio > 80%)');
  }

  if (inputs.downPayment < inputs.purchasePrice * 0.15) {
    errors.push('Down payment should be at least 15% of purchase price for commercial properties');
  }

  if (inputs.downPayment > inputs.purchasePrice * 0.5) {
    errors.push('Down payment should not exceed 50% of purchase price');
  }

  const loanAmount = inputs.purchasePrice - inputs.downPayment;
  if (loanAmount > inputs.propertyValue * 0.75) {
    errors.push('Loan amount should not exceed 75% of property value');
  }

  if (inputs.averageOccupancyRate < 50) {
    errors.push('Occupancy rate below 50% indicates significant operational issues');
  }

  if (inputs.averageOccupancyRate > 98) {
    errors.push('Occupancy rate above 98% may indicate underpricing or capacity constraints');
  }

  if (inputs.averageRentPerSqFt < 0.5) {
    errors.push('Rent per sq ft below $0.50 may indicate underpricing or poor location');
  }

  if (inputs.averageRentPerSqFt > 5) {
    errors.push('Rent per sq ft above $5.00 may indicate overpricing or premium location');
  }

  // Property type specific validations
  if (inputs.propertyType === 'climate-controlled' && inputs.averageRentPerSqFt < 1.0) {
    errors.push('Climate-controlled facilities typically command higher rents (minimum $1.00/sq ft)');
  }

  if (inputs.propertyType === 'outdoor' && inputs.averageRentPerSqFt > 2.0) {
    errors.push('Outdoor facilities typically have lower rents (maximum $2.00/sq ft)');
  }

  // Market condition validations
  if (inputs.locationQuality === 'tertiary' && inputs.averageRentPerSqFt > 1.5) {
    errors.push('Tertiary locations typically have lower rents');
  }

  if (inputs.competitionLevel === 'high' && inputs.averageOccupancyRate > 90) {
    errors.push('High competition typically results in lower occupancy rates');
  }

  if (inputs.economicConditions === 'declining' && inputs.rentGrowthRate > 3) {
    errors.push('Rent growth rate seems optimistic for declining economic conditions');
  }

  // Growth rate consistency validations
  if (inputs.rentGrowthRate > inputs.marketGrowthRate + 2) {
    errors.push('Rent growth rate significantly higher than market growth rate may be unrealistic');
  }

  if (inputs.expenseGrowthRate > inputs.rentGrowthRate + 1) {
    errors.push('Expense growth rate higher than rent growth rate may impact profitability');
  }

  // Cap rate validations
  if (inputs.exitCapRate < inputs.marketGrowthRate) {
    errors.push('Exit cap rate should typically be higher than market growth rate');
  }

  if (inputs.exitCapRate > 12) {
    errors.push('Exit cap rate above 12% may indicate high-risk property or market');
  }

  // Holding period validations
  if (inputs.holdingPeriod < 5) {
    errors.push('Holding period less than 5 years may not allow for market cycles');
  }

  if (inputs.holdingPeriod > inputs.loanTerm) {
    errors.push('Holding period should not exceed loan term');
  }

  // Unit size consistency validation
  const calculatedAverageUnitSize = inputs.squareFootage / inputs.unitCount;
  const sizeDifference = Math.abs(calculatedAverageUnitSize - inputs.averageUnitSize);
  if (sizeDifference > calculatedAverageUnitSize * 0.3) {
    errors.push('Average unit size seems inconsistent with total square footage and unit count');
  }

  // Collect all validation errors
  errors.push(...ruleFactory.getErrors());

  return errors;
}