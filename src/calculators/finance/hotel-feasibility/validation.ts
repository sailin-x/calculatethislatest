import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHotelFeasibilityInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.totalRooms) {
    errors.push('Total rooms is required');
  } else if (typeof inputs.totalRooms !== 'number' || inputs.totalRooms <= 0) {
    errors.push('Total rooms must be a positive number');
  } else if (inputs.totalRooms < 1 || inputs.totalRooms > 10000) {
    errors.push('Total rooms must be between 1 and 10,000');
  }

  // Room types validation
  if (inputs.roomTypes && !Array.isArray(inputs.roomTypes)) {
    errors.push('Room types must be an array');
  } else if (inputs.roomTypes) {
    const validRoomTypes = ['standard', 'deluxe', 'suite', 'presidential-suite', 'accessible', 'connecting'];
    for (const roomType of inputs.roomTypes) {
      if (!validRoomTypes.includes(roomType)) {
        errors.push(`Invalid room type: ${roomType}`);
      }
    }
  }

  // Average room size validation
  if (inputs.averageRoomSize !== undefined) {
    if (typeof inputs.averageRoomSize !== 'number' || inputs.averageRoomSize <= 0) {
      errors.push('Average room size must be a positive number');
    } else if (inputs.averageRoomSize < 100 || inputs.averageRoomSize > 2000) {
      errors.push('Average room size must be between 100 and 2,000 square feet');
    }
  }

  // Hotel type validation
  if (inputs.hotelType && !['budget', 'midscale', 'upscale', 'luxury', 'boutique', 'resort', 'business', 'airport', 'extended-stay'].includes(inputs.hotelType)) {
    errors.push('Invalid hotel type');
  }

  // Star rating validation
  if (inputs.starRating && !['1', '2', '3', '4', '5'].includes(inputs.starRating)) {
    errors.push('Invalid star rating');
  }

  // Location validation
  if (inputs.location && !['urban', 'suburban', 'airport', 'resort', 'highway', 'downtown', 'business-district'].includes(inputs.location)) {
    errors.push('Invalid location type');
  }

  // Market validation
  if (inputs.market && !['business', 'leisure', 'mixed', 'convention', 'airport', 'resort'].includes(inputs.market)) {
    errors.push('Invalid market type');
  }

  // Seasonality validation
  if (inputs.seasonality && !['low', 'moderate', 'high', 'extreme'].includes(inputs.seasonality)) {
    errors.push('Invalid seasonality factor');
  }

  // Competition level validation
  if (inputs.competitionLevel && !['low', 'medium', 'high', 'very-high'].includes(inputs.competitionLevel)) {
    errors.push('Invalid competition level');
  }

  // Market demand validation
  if (inputs.marketDemand && !['weak', 'moderate', 'strong', 'very-strong'].includes(inputs.marketDemand)) {
    errors.push('Invalid market demand');
  }

  // Occupancy rate validation
  if (inputs.occupancyRate !== undefined) {
    if (typeof inputs.occupancyRate !== 'number' || inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
      errors.push('Occupancy rate must be between 0 and 100');
    }
  }

  // Base ADR validation
  if (inputs.baseADR !== undefined) {
    if (typeof inputs.baseADR !== 'number' || inputs.baseADR <= 0) {
      errors.push('Base ADR must be a positive number');
    } else if (inputs.baseADR < 20 || inputs.baseADR > 2000) {
      errors.push('Base ADR must be between $20 and $2,000');
    }
  }

  // RevPAR validation
  if (inputs.revPAR !== undefined) {
    if (typeof inputs.revPAR !== 'number' || inputs.revPAR <= 0) {
      errors.push('RevPAR must be a positive number');
    } else if (inputs.revPAR < 10 || inputs.revPAR > 1500) {
      errors.push('RevPAR must be between $10 and $1,500');
    }
  }

  // Construction cost validation
  if (inputs.constructionCost !== undefined) {
    if (typeof inputs.constructionCost !== 'number' || inputs.constructionCost <= 0) {
      errors.push('Construction cost must be a positive number');
    } else if (inputs.constructionCost < 50000 || inputs.constructionCost > 1000000) {
      errors.push('Construction cost must be between $50,000 and $1,000,000 per room');
    }
  }

  // Land cost validation
  if (inputs.landCost !== undefined) {
    if (typeof inputs.landCost !== 'number' || inputs.landCost < 0) {
      errors.push('Land cost must be a non-negative number');
    } else if (inputs.landCost > 100000000) {
      errors.push('Land cost must be $100,000,000 or less');
    }
  }

  // Soft costs validation
  if (inputs.softCosts !== undefined) {
    if (typeof inputs.softCosts !== 'number' || inputs.softCosts < 0) {
      errors.push('Soft costs must be a non-negative number');
    } else if (inputs.softCosts > 50000000) {
      errors.push('Soft costs must be $50,000,000 or less');
    }
  }

  // Furniture cost validation
  if (inputs.furnitureCost !== undefined) {
    if (typeof inputs.furnitureCost !== 'number' || inputs.furnitureCost <= 0) {
      errors.push('Furniture cost must be a positive number');
    } else if (inputs.furnitureCost < 5000 || inputs.furnitureCost > 200000) {
      errors.push('Furniture cost must be between $5,000 and $200,000 per room');
    }
  }

  // Operating expenses validation
  if (inputs.operatingExpenses !== undefined) {
    if (typeof inputs.operatingExpenses !== 'number' || inputs.operatingExpenses <= 0) {
      errors.push('Operating expenses must be a positive number');
    } else if (inputs.operatingExpenses < 5000 || inputs.operatingExpenses > 100000) {
      errors.push('Operating expenses must be between $5,000 and $100,000 per room');
    }
  }

  // Labor costs validation
  if (inputs.laborCosts !== undefined) {
    if (typeof inputs.laborCosts !== 'number' || inputs.laborCosts <= 0) {
      errors.push('Labor costs must be a positive number');
    } else if (inputs.laborCosts < 10000 || inputs.laborCosts > 150000) {
      errors.push('Labor costs must be between $10,000 and $150,000 per room');
    }
  }

  // Utility costs validation
  if (inputs.utilityCosts !== undefined) {
    if (typeof inputs.utilityCosts !== 'number' || inputs.utilityCosts <= 0) {
      errors.push('Utility costs must be a positive number');
    } else if (inputs.utilityCosts < 1000 || inputs.utilityCosts > 30000) {
      errors.push('Utility costs must be between $1,000 and $30,000 per room');
    }
  }

  // Maintenance costs validation
  if (inputs.maintenanceCosts !== undefined) {
    if (typeof inputs.maintenanceCosts !== 'number' || inputs.maintenanceCosts <= 0) {
      errors.push('Maintenance costs must be a positive number');
    } else if (inputs.maintenanceCosts < 1000 || inputs.maintenanceCosts > 25000) {
      errors.push('Maintenance costs must be between $1,000 and $25,000 per room');
    }
  }

  // Insurance costs validation
  if (inputs.insuranceCosts !== undefined) {
    if (typeof inputs.insuranceCosts !== 'number' || inputs.insuranceCosts <= 0) {
      errors.push('Insurance costs must be a positive number');
    } else if (inputs.insuranceCosts < 500 || inputs.insuranceCosts > 15000) {
      errors.push('Insurance costs must be between $500 and $15,000 per room');
    }
  }

  // Property taxes validation
  if (inputs.propertyTaxes !== undefined) {
    if (typeof inputs.propertyTaxes !== 'number' || inputs.propertyTaxes <= 0) {
      errors.push('Property taxes must be a positive number');
    } else if (inputs.propertyTaxes < 500 || inputs.propertyTaxes > 20000) {
      errors.push('Property taxes must be between $500 and $20,000 per room');
    }
  }

  // Management fees validation
  if (inputs.managementFees !== undefined) {
    if (typeof inputs.managementFees !== 'number' || inputs.managementFees < 0 || inputs.managementFees > 10) {
      errors.push('Management fees must be between 0 and 10%');
    }
  }

  // Franchise fees validation
  if (inputs.franchiseFees !== undefined) {
    if (typeof inputs.franchiseFees !== 'number' || inputs.franchiseFees < 0 || inputs.franchiseFees > 15) {
      errors.push('Franchise fees must be between 0 and 15%');
    }
  }

  // Financing rate validation
  if (inputs.financingRate !== undefined) {
    if (typeof inputs.financingRate !== 'number' || inputs.financingRate < 0 || inputs.financingRate > 20) {
      errors.push('Financing rate must be between 0 and 20%');
    }
  }

  // Loan term validation
  if (inputs.loanTerm !== undefined) {
    if (typeof inputs.loanTerm !== 'number' || inputs.loanTerm <= 0) {
      errors.push('Loan term must be a positive number');
    } else if (inputs.loanTerm < 5 || inputs.loanTerm > 40) {
      errors.push('Loan term must be between 5 and 40 years');
    }
  }

  // Down payment validation
  if (inputs.downPayment !== undefined) {
    if (typeof inputs.downPayment !== 'number' || inputs.downPayment < 0 || inputs.downPayment > 50) {
      errors.push('Down payment must be between 0 and 50%');
    }
  }

  // Tax rate validation
  if (inputs.taxRate !== undefined) {
    if (typeof inputs.taxRate !== 'number' || inputs.taxRate < 0 || inputs.taxRate > 50) {
      errors.push('Tax rate must be between 0 and 50%');
    }
  }

  // Depreciation period validation
  if (inputs.depreciationPeriod !== undefined) {
    if (typeof inputs.depreciationPeriod !== 'number' || inputs.depreciationPeriod <= 0) {
      errors.push('Depreciation period must be a positive number');
    } else if (inputs.depreciationPeriod < 15 || inputs.depreciationPeriod > 50) {
      errors.push('Depreciation period must be between 15 and 50 years');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < -10 || inputs.inflationRate > 20) {
      errors.push('Inflation rate must be between -10 and 20%');
    }
  }

  // Revenue growth validation
  if (inputs.revenueGrowth !== undefined) {
    if (typeof inputs.revenueGrowth !== 'number' || inputs.revenueGrowth < -20 || inputs.revenueGrowth > 30) {
      errors.push('Revenue growth rate must be between -20 and 30%');
    }
  }

  // Expense growth validation
  if (inputs.expenseGrowth !== undefined) {
    if (typeof inputs.expenseGrowth !== 'number' || inputs.expenseGrowth < -10 || inputs.expenseGrowth > 20) {
      errors.push('Expense growth rate must be between -10 and 20%');
    }
  }

  // Exit year validation
  if (inputs.exitYear !== undefined) {
    if (typeof inputs.exitYear !== 'number' || inputs.exitYear <= 0) {
      errors.push('Exit year must be a positive number');
    } else if (inputs.exitYear < 3 || inputs.exitYear > 30) {
      errors.push('Exit year must be between 3 and 30 years');
    }
  }

  // Exit cap rate validation
  if (inputs.exitCapRate !== undefined) {
    if (typeof inputs.exitCapRate !== 'number' || inputs.exitCapRate <= 0) {
      errors.push('Exit cap rate must be a positive number');
    } else if (inputs.exitCapRate < 3 || inputs.exitCapRate > 15) {
      errors.push('Exit cap rate must be between 3 and 15%');
    }
  }

  // Additional revenue validation
  if (inputs.additionalRevenue && !Array.isArray(inputs.additionalRevenue)) {
    errors.push('Additional revenue sources must be an array');
  } else if (inputs.additionalRevenue) {
    const validSources = ['restaurant', 'bar', 'spa', 'fitness-center', 'conference-rooms', 'parking', 'shuttle-service', 'gift-shop', 'laundry-service', 'room-service'];
    for (const source of inputs.additionalRevenue) {
      if (!validSources.includes(source)) {
        errors.push(`Invalid additional revenue source: ${source}`);
      }
    }
  }

  // Amenities validation
  if (inputs.amenities && !Array.isArray(inputs.amenities)) {
    errors.push('Amenities must be an array');
  } else if (inputs.amenities) {
    const validAmenities = ['pool', 'gym', 'spa', 'restaurant', 'bar', 'concierge', 'valet-parking', 'free-wifi', 'business-center', 'meeting-rooms', 'event-space', 'shuttle-service', 'room-service', 'laundry-service', 'gift-shop'];
    for (const amenity of inputs.amenities) {
      if (!validAmenities.includes(amenity)) {
        errors.push(`Invalid amenity: ${amenity}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHotelFeasibilityInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalRooms':
      if (!value) return 'Total rooms is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1 || value > 10000) return 'Must be between 1 and 10,000';
      break;

    case 'hotelType':
      if (value && !['budget', 'midscale', 'upscale', 'luxury', 'boutique', 'resort', 'business', 'airport', 'extended-stay'].includes(value)) return 'Invalid hotel type';
      break;

    case 'starRating':
      if (value && !['1', '2', '3', '4', '5'].includes(value)) return 'Invalid star rating';
      break;

    case 'location':
      if (value && !['urban', 'suburban', 'airport', 'resort', 'highway', 'downtown', 'business-district'].includes(value)) return 'Invalid location type';
      break;

    case 'market':
      if (value && !['business', 'leisure', 'mixed', 'convention', 'airport', 'resort'].includes(value)) return 'Invalid market type';
      break;

    case 'seasonality':
      if (value && !['low', 'moderate', 'high', 'extreme'].includes(value)) return 'Invalid seasonality factor';
      break;

    case 'competitionLevel':
      if (value && !['low', 'medium', 'high', 'very-high'].includes(value)) return 'Invalid competition level';
      break;

    case 'marketDemand':
      if (value && !['weak', 'moderate', 'strong', 'very-strong'].includes(value)) return 'Invalid market demand';
      break;

    case 'occupancyRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) return 'Must be between 0 and 100';
      break;

    case 'baseADR':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 20 || value > 2000)) return 'Must be between $20 and $2,000';
      break;

    case 'revPAR':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 10 || value > 1500)) return 'Must be between $10 and $1,500';
      break;

    case 'constructionCost':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 50000 || value > 1000000)) return 'Must be between $50,000 and $1,000,000 per room';
      break;

    case 'landCost':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100000000) return 'Must be $100,000,000 or less';
      break;

    case 'softCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50000000) return 'Must be $50,000,000 or less';
      break;

    case 'furnitureCost':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 5000 || value > 200000)) return 'Must be between $5,000 and $200,000 per room';
      break;

    case 'operatingExpenses':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 5000 || value > 100000)) return 'Must be between $5,000 and $100,000 per room';
      break;

    case 'laborCosts':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 10000 || value > 150000)) return 'Must be between $10,000 and $150,000 per room';
      break;

    case 'utilityCosts':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 1000 || value > 30000)) return 'Must be between $1,000 and $30,000 per room';
      break;

    case 'maintenanceCosts':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 1000 || value > 25000)) return 'Must be between $1,000 and $25,000 per room';
      break;

    case 'insuranceCosts':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 500 || value > 15000)) return 'Must be between $500 and $15,000 per room';
      break;

    case 'propertyTaxes':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 500 || value > 20000)) return 'Must be between $500 and $20,000 per room';
      break;

    case 'managementFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 10)) return 'Must be between 0 and 10%';
      break;

    case 'franchiseFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 15)) return 'Must be between 0 and 15%';
      break;

    case 'financingRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) return 'Must be between 0 and 20%';
      break;

    case 'loanTerm':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 5 || value > 40)) return 'Must be between 5 and 40 years';
      break;

    case 'downPayment':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) return 'Must be between 0 and 50%';
      break;

    case 'taxRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) return 'Must be between 0 and 50%';
      break;

    case 'depreciationPeriod':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 15 || value > 50)) return 'Must be between 15 and 50 years';
      break;

    case 'inflationRate':
      if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 20)) return 'Must be between -10 and 20%';
      break;

    case 'revenueGrowth':
      if (value !== undefined && (typeof value !== 'number' || value < -20 || value > 30)) return 'Must be between -20 and 30%';
      break;

    case 'expenseGrowth':
      if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 20)) return 'Must be between -10 and 20%';
      break;

    case 'exitYear':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 3 || value > 30)) return 'Must be between 3 and 30 years';
      break;

    case 'exitCapRate':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 3 || value > 15)) return 'Must be between 3 and 15%';
      break;
  }

  return null;
}
