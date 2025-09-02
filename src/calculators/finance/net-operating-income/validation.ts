import { NetOperatingIncomeInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateNetOperatingIncomeInputs(inputs: NetOperatingIncomeInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (inputs.propertyValue > 100000000) {
    errors.propertyValue = 'Property value cannot exceed $100,000,000';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 1000000) {
    errors.propertySize = 'Property size cannot exceed 1,000,000 sq ft';
  }

  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  }
  if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  // Income Information Validation
  if (!inputs.grossRentalIncome || inputs.grossRentalIncome < 0) {
    errors.grossRentalIncome = 'Gross rental income must be greater than or equal to 0';
  }
  if (inputs.grossRentalIncome > 10000000) {
    errors.grossRentalIncome = 'Gross rental income cannot exceed $10,000,000';
  }

  if (inputs.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  }
  if (inputs.otherIncome > 1000000) {
    errors.otherIncome = 'Other income cannot exceed $1,000,000';
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) {
    errors.vacancyRate = 'Vacancy rate must be between 0% and 100%';
  }

  if (inputs.creditLossRate < 0 || inputs.creditLossRate > 100) {
    errors.creditLossRate = 'Credit loss rate must be between 0% and 100%';
  }

  if (inputs.lateFeeIncome < 0) {
    errors.lateFeeIncome = 'Late fee income cannot be negative';
  }
  if (inputs.lateFeeIncome > 100000) {
    errors.lateFeeIncome = 'Late fee income cannot exceed $100,000';
  }

  if (inputs.parkingIncome < 0) {
    errors.parkingIncome = 'Parking income cannot be negative';
  }
  if (inputs.parkingIncome > 500000) {
    errors.parkingIncome = 'Parking income cannot exceed $500,000';
  }

  if (inputs.storageIncome < 0) {
    errors.storageIncome = 'Storage income cannot be negative';
  }
  if (inputs.storageIncome > 200000) {
    errors.storageIncome = 'Storage income cannot exceed $200,000';
  }

  if (inputs.laundryIncome < 0) {
    errors.laundryIncome = 'Laundry income cannot be negative';
  }
  if (inputs.laundryIncome > 100000) {
    errors.laundryIncome = 'Laundry income cannot exceed $100,000';
  }

  if (inputs.vendingIncome < 0) {
    errors.vendingIncome = 'Vending income cannot be negative';
  }
  if (inputs.vendingIncome > 50000) {
    errors.vendingIncome = 'Vending income cannot exceed $50,000';
  }

  if (inputs.advertisingIncome < 0) {
    errors.advertisingIncome = 'Advertising income cannot be negative';
  }
  if (inputs.advertisingIncome > 100000) {
    errors.advertisingIncome = 'Advertising income cannot exceed $100,000';
  }

  if (inputs.utilityReimbursement < 0) {
    errors.utilityReimbursement = 'Utility reimbursement cannot be negative';
  }
  if (inputs.utilityReimbursement > 500000) {
    errors.utilityReimbursement = 'Utility reimbursement cannot exceed $500,000';
  }

  if (inputs.petFees < 0) {
    errors.petFees = 'Pet fees cannot be negative';
  }
  if (inputs.petFees > 50000) {
    errors.petFees = 'Pet fees cannot exceed $50,000';
  }

  if (inputs.applicationFees < 0) {
    errors.applicationFees = 'Application fees cannot be negative';
  }
  if (inputs.applicationFees > 25000) {
    errors.applicationFees = 'Application fees cannot exceed $25,000';
  }

  if (inputs.leaseTerminationFees < 0) {
    errors.leaseTerminationFees = 'Lease termination fees cannot be negative';
  }
  if (inputs.leaseTerminationFees > 50000) {
    errors.leaseTerminationFees = 'Lease termination fees cannot exceed $50,000';
  }

  if (inputs.otherMiscellaneousIncome < 0) {
    errors.otherMiscellaneousIncome = 'Other miscellaneous income cannot be negative';
  }
  if (inputs.otherMiscellaneousIncome > 100000) {
    errors.otherMiscellaneousIncome = 'Other miscellaneous income cannot exceed $100,000';
  }

  // Operating Expenses Validation
  if (inputs.propertyManagementFees < 0) {
    errors.propertyManagementFees = 'Property management fees cannot be negative';
  }
  if (inputs.propertyManagementFees > 500000) {
    errors.propertyManagementFees = 'Property management fees cannot exceed $500,000';
  }

  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  }
  if (inputs.propertyTaxes > 2000000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $2,000,000';
  }

  if (inputs.propertyInsurance < 0) {
    errors.propertyInsurance = 'Property insurance cannot be negative';
  }
  if (inputs.propertyInsurance > 500000) {
    errors.propertyInsurance = 'Property insurance cannot exceed $500,000';
  }

  if (inputs.utilities < 0) {
    errors.utilities = 'Utilities cannot be negative';
  }
  if (inputs.utilities > 1000000) {
    errors.utilities = 'Utilities cannot exceed $1,000,000';
  }

  if (inputs.maintenanceAndRepairs < 0) {
    errors.maintenanceAndRepairs = 'Maintenance and repairs cannot be negative';
  }
  if (inputs.maintenanceAndRepairs > 500000) {
    errors.maintenanceAndRepairs = 'Maintenance and repairs cannot exceed $500,000';
  }

  if (inputs.landscaping < 0) {
    errors.landscaping = 'Landscaping cannot be negative';
  }
  if (inputs.landscaping > 100000) {
    errors.landscaping = 'Landscaping cannot exceed $100,000';
  }

  if (inputs.janitorial < 0) {
    errors.janitorial = 'Janitorial cannot be negative';
  }
  if (inputs.janitorial > 200000) {
    errors.janitorial = 'Janitorial cannot exceed $200,000';
  }

  if (inputs.security < 0) {
    errors.security = 'Security cannot be negative';
  }
  if (inputs.security > 150000) {
    errors.security = 'Security cannot exceed $150,000';
  }

  if (inputs.pestControl < 0) {
    errors.pestControl = 'Pest control cannot be negative';
  }
  if (inputs.pestControl > 50000) {
    errors.pestControl = 'Pest control cannot exceed $50,000';
  }

  if (inputs.trashRemoval < 0) {
    errors.trashRemoval = 'Trash removal cannot be negative';
  }
  if (inputs.trashRemoval > 100000) {
    errors.trashRemoval = 'Trash removal cannot exceed $100,000';
  }

  if (inputs.snowRemoval < 0) {
    errors.snowRemoval = 'Snow removal cannot be negative';
  }
  if (inputs.snowRemoval > 50000) {
    errors.snowRemoval = 'Snow removal cannot exceed $50,000';
  }

  if (inputs.advertising < 0) {
    errors.advertising = 'Advertising cannot be negative';
  }
  if (inputs.advertising > 100000) {
    errors.advertising = 'Advertising cannot exceed $100,000';
  }

  if (inputs.legalFees < 0) {
    errors.legalFees = 'Legal fees cannot be negative';
  }
  if (inputs.legalFees > 100000) {
    errors.legalFees = 'Legal fees cannot exceed $100,000';
  }

  if (inputs.accountingFees < 0) {
    errors.accountingFees = 'Accounting fees cannot be negative';
  }
  if (inputs.accountingFees > 100000) {
    errors.accountingFees = 'Accounting fees cannot exceed $100,000';
  }

  if (inputs.professionalServices < 0) {
    errors.professionalServices = 'Professional services cannot be negative';
  }
  if (inputs.professionalServices > 100000) {
    errors.professionalServices = 'Professional services cannot exceed $100,000';
  }

  if (inputs.licensesAndPermits < 0) {
    errors.licensesAndPermits = 'Licenses and permits cannot be negative';
  }
  if (inputs.licensesAndPermits > 50000) {
    errors.licensesAndPermits = 'Licenses and permits cannot exceed $50,000';
  }

  if (inputs.supplies < 0) {
    errors.supplies = 'Supplies cannot be negative';
  }
  if (inputs.supplies > 50000) {
    errors.supplies = 'Supplies cannot exceed $50,000';
  }

  if (inputs.equipmentRental < 0) {
    errors.equipmentRental = 'Equipment rental cannot be negative';
  }
  if (inputs.equipmentRental > 50000) {
    errors.equipmentRental = 'Equipment rental cannot exceed $50,000';
  }

  if (inputs.contractServices < 0) {
    errors.contractServices = 'Contract services cannot be negative';
  }
  if (inputs.contractServices > 100000) {
    errors.contractServices = 'Contract services cannot exceed $100,000';
  }

  if (inputs.otherOperatingExpenses < 0) {
    errors.otherOperatingExpenses = 'Other operating expenses cannot be negative';
  }
  if (inputs.otherOperatingExpenses > 100000) {
    errors.otherOperatingExpenses = 'Other operating expenses cannot exceed $100,000';
  }

  // Capital Expenditures Validation
  if (inputs.roofReplacement < 0) {
    errors.roofReplacement = 'Roof replacement cannot be negative';
  }
  if (inputs.roofReplacement > 500000) {
    errors.roofReplacement = 'Roof replacement cannot exceed $500,000';
  }

  if (inputs.hvacReplacement < 0) {
    errors.hvacReplacement = 'HVAC replacement cannot be negative';
  }
  if (inputs.hvacReplacement > 300000) {
    errors.hvacReplacement = 'HVAC replacement cannot exceed $300,000';
  }

  if (inputs.plumbingReplacement < 0) {
    errors.plumbingReplacement = 'Plumbing replacement cannot be negative';
  }
  if (inputs.plumbingReplacement > 200000) {
    errors.plumbingReplacement = 'Plumbing replacement cannot exceed $200,000';
  }

  if (inputs.electricalReplacement < 0) {
    errors.electricalReplacement = 'Electrical replacement cannot be negative';
  }
  if (inputs.electricalReplacement > 150000) {
    errors.electricalReplacement = 'Electrical replacement cannot exceed $150,000';
  }

  if (inputs.flooringReplacement < 0) {
    errors.flooringReplacement = 'Flooring replacement cannot be negative';
  }
  if (inputs.flooringReplacement > 200000) {
    errors.flooringReplacement = 'Flooring replacement cannot exceed $200,000';
  }

  if (inputs.painting < 0) {
    errors.painting = 'Painting cannot be negative';
  }
  if (inputs.painting > 100000) {
    errors.painting = 'Painting cannot exceed $100,000';
  }

  if (inputs.applianceReplacement < 0) {
    errors.applianceReplacement = 'Appliance replacement cannot be negative';
  }
  if (inputs.applianceReplacement > 100000) {
    errors.applianceReplacement = 'Appliance replacement cannot exceed $100,000';
  }

  if (inputs.structuralRepairs < 0) {
    errors.structuralRepairs = 'Structural repairs cannot be negative';
  }
  if (inputs.structuralRepairs > 500000) {
    errors.structuralRepairs = 'Structural repairs cannot exceed $500,000';
  }

  if (inputs.otherCapitalExpenditures < 0) {
    errors.otherCapitalExpenditures = 'Other capital expenditures cannot be negative';
  }
  if (inputs.otherCapitalExpenditures > 200000) {
    errors.otherCapitalExpenditures = 'Other capital expenditures cannot exceed $200,000';
  }

  // Market Information Validation
  if (inputs.marketGrowthRate < -20 || inputs.marketGrowthRate > 50) {
    errors.marketGrowthRate = 'Market growth rate must be between -20% and 50%';
  }

  if (inputs.comparableNOI < 0) {
    errors.comparableNOI = 'Comparable NOI cannot be negative';
  }
  if (inputs.comparableNOI > 10000000) {
    errors.comparableNOI = 'Comparable NOI cannot exceed $10,000,000';
  }

  if (inputs.comparableCapRate < 0 || inputs.comparableCapRate > 50) {
    errors.comparableCapRate = 'Comparable cap rate must be between 0% and 50%';
  }

  // Analysis Parameters Validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.analysisPeriod = 'Analysis period must be between 1 and 50 years';
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 30) {
    errors.inflationRate = 'Inflation rate must be between -10% and 30%';
  }

  if (inputs.expenseGrowthRate < -10 || inputs.expenseGrowthRate > 30) {
    errors.expenseGrowthRate = 'Expense growth rate must be between -10% and 30%';
  }

  if (inputs.incomeGrowthRate < -10 || inputs.incomeGrowthRate > 30) {
    errors.incomeGrowthRate = 'Income growth rate must be between -10% and 30%';
  }

  if (inputs.vacancyTrend < -20 || inputs.vacancyTrend > 20) {
    errors.vacancyTrend = 'Vacancy trend must be between -20% and 20%';
  }

  // Property Type Validation
  const validPropertyTypes = ['residential', 'commercial', 'industrial', 'retail', 'office', 'multifamily', 'hotel', 'warehouse', 'land', 'other'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }

  // Property Class Validation
  const validPropertyClasses = ['class_a', 'class_b', 'class_c', 'class_d'];
  if (!validPropertyClasses.includes(inputs.propertyClass)) {
    errors.propertyClass = 'Invalid property class';
  }

  // Property Condition Validation
  const validPropertyConditions = ['excellent', 'good', 'fair', 'poor'];
  if (!validPropertyConditions.includes(inputs.propertyCondition)) {
    errors.propertyCondition = 'Invalid property condition';
  }

  // Market Location Validation
  const validMarketLocations = ['urban', 'suburban', 'rural'];
  if (!validMarketLocations.includes(inputs.marketLocation)) {
    errors.marketLocation = 'Invalid market location';
  }

  // Market Condition Validation
  const validMarketConditions = ['growing', 'stable', 'declining'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.marketCondition = 'Invalid market condition';
  }

  // Currency Validation
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  // Display Format Validation
  const validDisplayFormats = ['currency', 'percentage', 'number'];
  if (!validDisplayFormats.includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Boolean Validation
  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be a boolean value';
  }

  // Business Logic Validations
  const totalGrossIncome = (
    inputs.grossRentalIncome +
    inputs.otherIncome +
    inputs.lateFeeIncome +
    inputs.parkingIncome +
    inputs.storageIncome +
    inputs.laundryIncome +
    inputs.vendingIncome +
    inputs.advertisingIncome +
    inputs.utilityReimbursement +
    inputs.petFees +
    inputs.applicationFees +
    inputs.leaseTerminationFees +
    inputs.otherMiscellaneousIncome
  );

  if (totalGrossIncome <= 0) {
    errors.grossRentalIncome = 'Total gross income must be greater than 0';
  }

  const totalOperatingExpenses = (
    inputs.propertyManagementFees +
    inputs.propertyTaxes +
    inputs.propertyInsurance +
    inputs.utilities +
    inputs.maintenanceAndRepairs +
    inputs.landscaping +
    inputs.janitorial +
    inputs.security +
    inputs.pestControl +
    inputs.trashRemoval +
    inputs.snowRemoval +
    inputs.advertising +
    inputs.legalFees +
    inputs.accountingFees +
    inputs.professionalServices +
    inputs.licensesAndPermits +
    inputs.supplies +
    inputs.equipmentRental +
    inputs.contractServices +
    inputs.otherOperatingExpenses
  );

  if (totalOperatingExpenses > totalGrossIncome) {
    errors.propertyTaxes = 'Total operating expenses cannot exceed total gross income';
  }

  // Property value vs income validation
  if (totalGrossIncome > inputs.propertyValue * 0.5) {
    errors.grossRentalIncome = 'Gross rental income seems unusually high relative to property value';
  }

  // Vacancy and credit loss validation
  if (inputs.vacancyRate + inputs.creditLossRate > 50) {
    errors.vacancyRate = 'Combined vacancy and credit loss rates cannot exceed 50%';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateNetOperatingIncomeOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Core NOI Validation
  if (typeof outputs.netOperatingIncome !== 'number' || isNaN(outputs.netOperatingIncome)) {
    errors.netOperatingIncome = 'Net operating income must be a valid number';
  }

  if (typeof outputs.noiMargin !== 'number' || isNaN(outputs.noiMargin)) {
    errors.noiMargin = 'NOI margin must be a valid number';
  }

  if (outputs.noiMargin < 0 || outputs.noiMargin > 100) {
    errors.noiMargin = 'NOI margin must be between 0% and 100%';
  }

  if (typeof outputs.noiPerSquareFoot !== 'number' || isNaN(outputs.noiPerSquareFoot)) {
    errors.noiPerSquareFoot = 'NOI per square foot must be a valid number';
  }

  if (typeof outputs.noiPerUnit !== 'number' || isNaN(outputs.noiPerUnit)) {
    errors.noiPerUnit = 'NOI per unit must be a valid number';
  }

  // Income Validation
  if (typeof outputs.totalGrossIncome !== 'number' || isNaN(outputs.totalGrossIncome)) {
    errors.totalGrossIncome = 'Total gross income must be a valid number';
  }

  if (outputs.totalGrossIncome < 0) {
    errors.totalGrossIncome = 'Total gross income cannot be negative';
  }

  if (typeof outputs.effectiveGrossIncome !== 'number' || isNaN(outputs.effectiveGrossIncome)) {
    errors.effectiveGrossIncome = 'Effective gross income must be a valid number';
  }

  if (outputs.effectiveGrossIncome < 0) {
    errors.effectiveGrossIncome = 'Effective gross income cannot be negative';
  }

  if (outputs.effectiveGrossIncome > outputs.totalGrossIncome) {
    errors.effectiveGrossIncome = 'Effective gross income cannot exceed total gross income';
  }

  // Expense Validation
  if (typeof outputs.totalOperatingExpenses !== 'number' || isNaN(outputs.totalOperatingExpenses)) {
    errors.totalOperatingExpenses = 'Total operating expenses must be a valid number';
  }

  if (outputs.totalOperatingExpenses < 0) {
    errors.totalOperatingExpenses = 'Total operating expenses cannot be negative';
  }

  if (typeof outputs.totalCapitalExpenditures !== 'number' || isNaN(outputs.totalCapitalExpenditures)) {
    errors.totalCapitalExpenditures = 'Total capital expenditures must be a valid number';
  }

  if (outputs.totalCapitalExpenditures < 0) {
    errors.totalCapitalExpenditures = 'Total capital expenditures cannot be negative';
  }

  // Performance Ratios Validation
  if (typeof outputs.expenseRatio !== 'number' || isNaN(outputs.expenseRatio)) {
    errors.expenseRatio = 'Expense ratio must be a valid number';
  }

  if (outputs.expenseRatio < 0 || outputs.expenseRatio > 100) {
    errors.expenseRatio = 'Expense ratio must be between 0% and 100%';
  }

  if (typeof outputs.operatingEfficiency !== 'number' || isNaN(outputs.operatingEfficiency)) {
    errors.operatingEfficiency = 'Operating efficiency must be a valid number';
  }

  if (outputs.operatingEfficiency < 0 || outputs.operatingEfficiency > 100) {
    errors.operatingEfficiency = 'Operating efficiency must be between 0% and 100%';
  }

  // Analysis Validation
  if (outputs.analysis && typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis must be an object';
  }

  if (outputs.analysis && (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string')) {
    errors.analysis = 'Analysis must include a recommendation string';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}