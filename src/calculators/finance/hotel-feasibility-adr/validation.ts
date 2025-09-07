import { HotelFeasibilityADRInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHotelFeasibilityADRInputs(inputs: HotelFeasibilityADRInputs): ValidationResult {
  const errors: string[] = [];

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be a positive number');
  } else if (inputs.propertySize < 10000 || inputs.propertySize > 1000000) {
    errors.push('Property size must be between 10,000 and 1,000,000 sq ft');
  }

  if (!inputs.numberOfRooms || inputs.numberOfRooms <= 0) {
    errors.push('Number of rooms must be a positive number');
  } else if (inputs.numberOfRooms < 10 || inputs.numberOfRooms > 1000) {
    errors.push('Number of rooms must be between 10 and 1,000');
  }

  if (!inputs.hotelClass || !['budget', 'economy', 'midscale', 'upscale', 'luxury', 'boutique'].includes(inputs.hotelClass)) {
    errors.push('Valid hotel class is required');
  }

  if (!inputs.hotelBrand || inputs.hotelBrand.trim().length === 0) {
    errors.push('Hotel brand is required');
  }

  if (inputs.propertyAge === undefined || inputs.propertyAge < 0) {
    errors.push('Property age must be a non-negative number');
  } else if (inputs.propertyAge > 100) {
    errors.push('Property age must be 100 years or less');
  }

  if (inputs.lastRenovation === undefined || inputs.lastRenovation < 0) {
    errors.push('Last renovation must be a non-negative number');
  } else if (inputs.lastRenovation > 50) {
    errors.push('Last renovation must be 50 years or less');
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketType || !['urban', 'suburban', 'airport', 'resort', 'business', 'leisure'].includes(inputs.marketType)) {
    errors.push('Valid market type is required');
  }

  if (!inputs.marketDemand || !['low', 'medium', 'high', 'very_high'].includes(inputs.marketDemand)) {
    errors.push('Valid market demand is required');
  }

  if (!inputs.marketSupply || !['low', 'medium', 'high', 'very_high'].includes(inputs.marketSupply)) {
    errors.push('Valid market supply is required');
  }

  if (inputs.marketGrowthRate === undefined || inputs.marketGrowthRate < -10 || inputs.marketGrowthRate > 20) {
    errors.push('Market growth rate must be between -10% and 20%');
  }

  if (inputs.seasonalityFactor === undefined || inputs.seasonalityFactor < 0.5 || inputs.seasonalityFactor > 2.0) {
    errors.push('Seasonality factor must be between 0.5 and 2.0');
  }

  // Financial Information Validation
  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be a positive number');
  } else if (inputs.purchasePrice < 1000000 || inputs.purchasePrice > 100000000) {
    errors.push('Purchase price must be between $1,000,000 and $100,000,000');
  }

  if (inputs.acquisitionCosts === undefined || inputs.acquisitionCosts < 0) {
    errors.push('Acquisition costs must be a non-negative number');
  } else if (inputs.acquisitionCosts > 10000000) {
    errors.push('Acquisition costs must be $10,000,000 or less');
  }

  if (inputs.renovationCosts === undefined || inputs.renovationCosts < 0) {
    errors.push('Renovation costs must be a non-negative number');
  } else if (inputs.renovationCosts > 20000000) {
    errors.push('Renovation costs must be $20,000,000 or less');
  }

  if (inputs.workingCapital === undefined || inputs.workingCapital < 0) {
    errors.push('Working capital must be a non-negative number');
  } else if (inputs.workingCapital > 5000000) {
    errors.push('Working capital must be $5,000,000 or less');
  }

  if (!inputs.totalInvestment || inputs.totalInvestment <= 0) {
    errors.push('Total investment must be a positive number');
  } else if (inputs.totalInvestment < 1000000 || inputs.totalInvestment > 100000000) {
    errors.push('Total investment must be between $1,000,000 and $100,000,000');
  }

  // Operating Information Validation
  if (!inputs.averageDailyRate || inputs.averageDailyRate <= 0) {
    errors.push('Average daily rate must be a positive number');
  } else if (inputs.averageDailyRate < 50 || inputs.averageDailyRate > 2000) {
    errors.push('Average daily rate must be between $50 and $2,000');
  }

  if (!inputs.occupancyRate || inputs.occupancyRate <= 0) {
    errors.push('Occupancy rate must be a positive number');
  } else if (inputs.occupancyRate < 20 || inputs.occupancyRate > 95) {
    errors.push('Occupancy rate must be between 20% and 95%');
  }

  if (!inputs.revenuePerAvailableRoom || inputs.revenuePerAvailableRoom <= 0) {
    errors.push('RevPAR must be a positive number');
  } else if (inputs.revenuePerAvailableRoom < 20 || inputs.revenuePerAvailableRoom > 1000) {
    errors.push('RevPAR must be between $20 and $1,000');
  }

  if (!inputs.averageLengthOfStay || inputs.averageLengthOfStay <= 0) {
    errors.push('Average length of stay must be a positive number');
  } else if (inputs.averageLengthOfStay < 1 || inputs.averageLengthOfStay > 30) {
    errors.push('Average length of stay must be between 1 and 30 nights');
  }

  if (!inputs.operatingDaysPerYear || inputs.operatingDaysPerYear < 300 || inputs.operatingDaysPerYear > 365) {
    errors.push('Operating days per year must be between 300 and 365');
  }

  // Revenue Validation
  if (!inputs.roomRevenue || inputs.roomRevenue < 0) {
    errors.push('Room revenue must be a non-negative number');
  } else if (inputs.roomRevenue > 50000000) {
    errors.push('Room revenue must be $50,000,000 or less');
  }

  if (inputs.foodAndBeverageRevenue === undefined || inputs.foodAndBeverageRevenue < 0) {
    errors.push('Food & beverage revenue must be a non-negative number');
  } else if (inputs.foodAndBeverageRevenue > 20000000) {
    errors.push('Food & beverage revenue must be $20,000,000 or less');
  }

  if (inputs.ancillaryRevenue === undefined || inputs.ancillaryRevenue < 0) {
    errors.push('Ancillary revenue must be a non-negative number');
  } else if (inputs.ancillaryRevenue > 10000000) {
    errors.push('Ancillary revenue must be $10,000,000 or less');
  }

  if (inputs.otherRevenue === undefined || inputs.otherRevenue < 0) {
    errors.push('Other revenue must be a non-negative number');
  } else if (inputs.otherRevenue > 5000000) {
    errors.push('Other revenue must be $5,000,000 or less');
  }

  if (!inputs.totalRevenue || inputs.totalRevenue < 0) {
    errors.push('Total revenue must be a non-negative number');
  } else if (inputs.totalRevenue > 100000000) {
    errors.push('Total revenue must be $100,000,000 or less');
  }

  // Operating Expenses Validation
  if (!inputs.laborCosts || inputs.laborCosts < 0) {
    errors.push('Labor costs must be a non-negative number');
  } else if (inputs.laborCosts > 20000000) {
    errors.push('Labor costs must be $20,000,000 or less');
  }

  if (inputs.utilities === undefined || inputs.utilities < 0) {
    errors.push('Utilities must be a non-negative number');
  } else if (inputs.utilities > 2000000) {
    errors.push('Utilities must be $2,000,000 or less');
  }

  if (inputs.maintenance === undefined || inputs.maintenance < 0) {
    errors.push('Maintenance must be a non-negative number');
  } else if (inputs.maintenance > 2000000) {
    errors.push('Maintenance must be $2,000,000 or less');
  }

  if (inputs.insurance === undefined || inputs.insurance < 0) {
    errors.push('Insurance must be a non-negative number');
  } else if (inputs.insurance > 500000) {
    errors.push('Insurance must be $500,000 or less');
  }

  if (inputs.propertyTaxes === undefined || inputs.propertyTaxes < 0) {
    errors.push('Property taxes must be a non-negative number');
  } else if (inputs.propertyTaxes > 1000000) {
    errors.push('Property taxes must be $1,000,000 or less');
  }

  if (inputs.managementFees === undefined || inputs.managementFees < 0) {
    errors.push('Management fees must be a non-negative number');
  } else if (inputs.managementFees > 2000000) {
    errors.push('Management fees must be $2,000,000 or less');
  }

  if (inputs.marketing === undefined || inputs.marketing < 0) {
    errors.push('Marketing must be a non-negative number');
  } else if (inputs.marketing > 1000000) {
    errors.push('Marketing must be $1,000,000 or less');
  }

  if (inputs.administrative === undefined || inputs.administrative < 0) {
    errors.push('Administrative must be a non-negative number');
  } else if (inputs.administrative > 1000000) {
    errors.push('Administrative must be $1,000,000 or less');
  }

  if (inputs.otherExpenses === undefined || inputs.otherExpenses < 0) {
    errors.push('Other expenses must be a non-negative number');
  } else if (inputs.otherExpenses > 1000000) {
    errors.push('Other expenses must be $1,000,000 or less');
  }

  if (!inputs.totalOperatingExpenses || inputs.totalOperatingExpenses < 0) {
    errors.push('Total operating expenses must be a non-negative number');
  } else if (inputs.totalOperatingExpenses > 50000000) {
    errors.push('Total operating expenses must be $50,000,000 or less');
  }

  // Staffing Validation
  if (!inputs.fullTimeEmployees || inputs.fullTimeEmployees < 0) {
    errors.push('Full-time employees must be a non-negative number');
  } else if (inputs.fullTimeEmployees > 500) {
    errors.push('Full-time employees must be 500 or less');
  }

  if (inputs.partTimeEmployees === undefined || inputs.partTimeEmployees < 0) {
    errors.push('Part-time employees must be a non-negative number');
  } else if (inputs.partTimeEmployees > 200) {
    errors.push('Part-time employees must be 200 or less');
  }

  if (!inputs.averageWage || inputs.averageWage < 0) {
    errors.push('Average wage must be a non-negative number');
  } else if (inputs.averageWage > 50) {
    errors.push('Average wage must be $50/hour or less');
  }

  if (inputs.benefitsPercentage === undefined || inputs.benefitsPercentage < 0 || inputs.benefitsPercentage > 50) {
    errors.push('Benefits percentage must be between 0% and 50%');
  }

  // Risk Factors Validation
  if (!inputs.marketRisk || !['low', 'medium', 'high'].includes(inputs.marketRisk)) {
    errors.push('Valid market risk is required');
  }

  if (!inputs.operationalRisk || !['low', 'medium', 'high'].includes(inputs.operationalRisk)) {
    errors.push('Valid operational risk is required');
  }

  if (!inputs.financialRisk || !['low', 'medium', 'high'].includes(inputs.financialRisk)) {
    errors.push('Valid financial risk is required');
  }

  if (!inputs.regulatoryRisk || !['low', 'medium', 'high'].includes(inputs.regulatoryRisk)) {
    errors.push('Valid regulatory risk is required');
  }

  // Financing Validation
  if (inputs.loanAmount === undefined || inputs.loanAmount < 0) {
    errors.push('Loan amount must be a non-negative number');
  } else if (inputs.loanAmount > 100000000) {
    errors.push('Loan amount must be $100,000,000 or less');
  }

  if (!inputs.interestRate || inputs.interestRate < 0 || inputs.interestRate > 15) {
    errors.push('Interest rate must be between 0% and 15%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 0 || inputs.loanTerm > 30) {
    errors.push('Loan term must be between 0 and 30 years');
  }

  if (inputs.downPayment === undefined || inputs.downPayment < 0) {
    errors.push('Down payment must be a non-negative number');
  } else if (inputs.downPayment > 100000000) {
    errors.push('Down payment must be $100,000,000 or less');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 5 || inputs.analysisPeriod > 20) {
    errors.push('Analysis period must be between 5 and 20 years');
  }

  if (inputs.inflationRate === undefined || inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (!inputs.discountRate || inputs.discountRate < 5 || inputs.discountRate > 25) {
    errors.push('Discount rate must be between 5% and 25%');
  }

  if (inputs.taxRate === undefined || inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHotelFeasibilityADRInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyAddress':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Property address is required';
      break;

    case 'propertySize':
      if (value === undefined || value === null) return 'Property size is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 1000000) return 'Must be between 10,000 and 1,000,000 sq ft';
      break;

    case 'numberOfRooms':
      if (value === undefined || value === null) return 'Number of rooms is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10 || value > 1000) return 'Must be between 10 and 1,000';
      break;

    case 'hotelClass':
      if (!value) return 'Hotel class is required';
      if (!['budget', 'economy', 'midscale', 'upscale', 'luxury', 'boutique'].includes(value)) return 'Invalid hotel class';
      break;

    case 'hotelBrand':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Hotel brand is required';
      break;

    case 'propertyAge':
      if (value === undefined || value === null) return 'Property age is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 100) return 'Must be 100 years or less';
      break;

    case 'lastRenovation':
      if (value === undefined || value === null) return 'Last renovation is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50) return 'Must be 50 years or less';
      break;

    case 'marketLocation':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Market location is required';
      break;

    case 'marketType':
      if (!value) return 'Market type is required';
      if (!['urban', 'suburban', 'airport', 'resort', 'business', 'leisure'].includes(value)) return 'Invalid market type';
      break;

    case 'marketDemand':
      if (!value) return 'Market demand is required';
      if (!['low', 'medium', 'high', 'very_high'].includes(value)) return 'Invalid market demand';
      break;

    case 'marketSupply':
      if (!value) return 'Market supply is required';
      if (!['low', 'medium', 'high', 'very_high'].includes(value)) return 'Invalid market supply';
      break;

    case 'marketGrowthRate':
      if (value === undefined || value === null) return 'Market growth rate is required';
      if (typeof value !== 'number' || value < -10 || value > 20) return 'Must be between -10% and 20%';
      break;

    case 'seasonalityFactor':
      if (value === undefined || value === null) return 'Seasonality factor is required';
      if (typeof value !== 'number' || value < 0.5 || value > 2.0) return 'Must be between 0.5 and 2.0';
      break;

    case 'purchasePrice':
      if (value === undefined || value === null) return 'Purchase price is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000000 || value > 100000000) return 'Must be between $1,000,000 and $100,000,000';
      break;

    case 'acquisitionCosts':
      if (value === undefined || value === null) return 'Acquisition costs is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'renovationCosts':
      if (value === undefined || value === null) return 'Renovation costs is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 20000000) return 'Must be $20,000,000 or less';
      break;

    case 'workingCapital':
      if (value === undefined || value === null) return 'Working capital is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'totalInvestment':
      if (value === undefined || value === null) return 'Total investment is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000000 || value > 100000000) return 'Must be between $1,000,000 and $100,000,000';
      break;

    case 'averageDailyRate':
      if (value === undefined || value === null) return 'Average daily rate is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50 || value > 2000) return 'Must be between $50 and $2,000';
      break;

    case 'occupancyRate':
      if (value === undefined || value === null) return 'Occupancy rate is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 20 || value > 95) return 'Must be between 20% and 95%';
      break;

    case 'revenuePerAvailableRoom':
      if (value === undefined || value === null) return 'RevPAR is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 20 || value > 1000) return 'Must be between $20 and $1,000';
      break;

    case 'averageLengthOfStay':
      if (value === undefined || value === null) return 'Average length of stay is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1 || value > 30) return 'Must be between 1 and 30 nights';
      break;

    case 'operatingDaysPerYear':
      if (value === undefined || value === null) return 'Operating days per year is required';
      if (typeof value !== 'number' || value < 300 || value > 365) return 'Must be between 300 and 365';
      break;

    case 'roomRevenue':
      if (value === undefined || value === null) return 'Room revenue is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50000000) return 'Must be $50,000,000 or less';
      break;

    case 'foodAndBeverageRevenue':
      if (value === undefined || value === null) return 'Food & beverage revenue is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 20000000) return 'Must be $20,000,000 or less';
      break;

    case 'ancillaryRevenue':
      if (value === undefined || value === null) return 'Ancillary revenue is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'otherRevenue':
      if (value === undefined || value === null) return 'Other revenue is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'totalRevenue':
      if (value === undefined || value === null) return 'Total revenue is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 100000000) return 'Must be $100,000,000 or less';
      break;

    case 'laborCosts':
      if (value === undefined || value === null) return 'Labor costs is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 20000000) return 'Must be $20,000,000 or less';
      break;

    case 'utilities':
      if (value === undefined || value === null) return 'Utilities is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 2000000) return 'Must be $2,000,000 or less';
      break;

    case 'maintenance':
      if (value === undefined || value === null) return 'Maintenance is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 2000000) return 'Must be $2,000,000 or less';
      break;

    case 'insurance':
      if (value === undefined || value === null) return 'Insurance is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 500000) return 'Must be $500,000 or less';
      break;

    case 'propertyTaxes':
      if (value === undefined || value === null) return 'Property taxes is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'managementFees':
      if (value === undefined || value === null) return 'Management fees is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 2000000) return 'Must be $2,000,000 or less';
      break;

    case 'marketing':
      if (value === undefined || value === null) return 'Marketing is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'administrative':
      if (value === undefined || value === null) return 'Administrative is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'otherExpenses':
      if (value === undefined || value === null) return 'Other expenses is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'totalOperatingExpenses':
      if (value === undefined || value === null) return 'Total operating expenses is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50000000) return 'Must be $50,000,000 or less';
      break;

    case 'fullTimeEmployees':
      if (value === undefined || value === null) return 'Full-time employees is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 500) return 'Must be 500 or less';
      break;

    case 'partTimeEmployees':
      if (value === undefined || value === null) return 'Part-time employees is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 200) return 'Must be 200 or less';
      break;

    case 'averageWage':
      if (value === undefined || value === null) return 'Average wage is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50) return 'Must be $50/hour or less';
      break;

    case 'benefitsPercentage':
      if (value === undefined || value === null) return 'Benefits percentage is required';
      if (typeof value !== 'number' || value < 0 || value > 50) return 'Must be between 0% and 50%';
      break;

    case 'marketRisk':
      if (!value) return 'Market risk is required';
      if (!['low', 'medium', 'high'].includes(value)) return 'Invalid market risk';
      break;

    case 'operationalRisk':
      if (!value) return 'Operational risk is required';
      if (!['low', 'medium', 'high'].includes(value)) return 'Invalid operational risk';
      break;

    case 'financialRisk':
      if (!value) return 'Financial risk is required';
      if (!['low', 'medium', 'high'].includes(value)) return 'Invalid financial risk';
      break;

    case 'regulatoryRisk':
      if (!value) return 'Regulatory risk is required';
      if (!['low', 'medium', 'high'].includes(value)) return 'Invalid regulatory risk';
      break;

    case 'loanAmount':
      if (value === undefined || value === null) return 'Loan amount is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 100000000) return 'Must be $100,000,000 or less';
      break;

    case 'interestRate':
      if (value === undefined || value === null) return 'Interest rate is required';
      if (typeof value !== 'number' || value < 0 || value > 15) return 'Must be between 0% and 15%';
      break;

    case 'loanTerm':
      if (value === undefined || value === null) return 'Loan term is required';
      if (typeof value !== 'number' || value < 0 || value > 30) return 'Must be between 0 and 30 years';
      break;

    case 'downPayment':
      if (value === undefined || value === null) return 'Down payment is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 100000000) return 'Must be $100,000,000 or less';
      break;

    case 'analysisPeriod':
      if (value === undefined || value === null) return 'Analysis period is required';
      if (typeof value !== 'number' || value < 5 || value > 20) return 'Must be between 5 and 20 years';
      break;

    case 'inflationRate':
      if (value === undefined || value === null) return 'Inflation rate is required';
      if (typeof value !== 'number' || value < -5 || value > 15) return 'Must be between -5% and 15%';
      break;

    case 'discountRate':
      if (value === undefined || value === null) return 'Discount rate is required';
      if (typeof value !== 'number' || value < 5 || value > 25) return 'Must be between 5% and 25%';
      break;

    case 'taxRate':
      if (value === undefined || value === null) return 'Tax rate is required';
      if (typeof value !== 'number' || value < 0 || value > 50) return 'Must be between 0% and 50%';
      break;
  }

  return null;
}