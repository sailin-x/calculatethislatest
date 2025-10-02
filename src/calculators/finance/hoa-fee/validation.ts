import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHOAFeeInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.monthlyHOAFee) {
    errors.push('Monthly HOA fee is required');
  } else if (typeof inputs.monthlyHOAFee !== 'number' || inputs.monthlyHOAFee < 0) {
    errors.push('Monthly HOA fee must be a non-negative number');
  } else if (inputs.monthlyHOAFee > 5000) {
    errors.push('Monthly HOA fee must be $5,000 or less');
  }

  // Property type validation
  if (inputs.propertyType && !['condo', 'townhouse', 'single-family', 'co-op', 'pud'].includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Square footage validation
  if (inputs.squareFootage !== undefined) {
    if (typeof inputs.squareFootage !== 'number' || inputs.squareFootage <= 0) {
      errors.push('Square footage must be a positive number');
    } else if (inputs.squareFootage < 100 || inputs.squareFootage > 10000) {
      errors.push('Square footage must be between 100 and 10,000 square feet');
    }
  }

  // Bedrooms validation
  if (inputs.bedrooms !== undefined) {
    if (typeof inputs.bedrooms !== 'number' || inputs.bedrooms < 0) {
      errors.push('Number of bedrooms must be a non-negative number');
    } else if (inputs.bedrooms > 10) {
      errors.push('Number of bedrooms must be 10 or less');
    }
  }

  // Bathrooms validation
  if (inputs.bathrooms !== undefined) {
    if (typeof inputs.bathrooms !== 'number' || inputs.bathrooms < 0) {
      errors.push('Number of bathrooms must be a non-negative number');
    } else if (inputs.bathrooms > 10) {
      errors.push('Number of bathrooms must be 10 or less');
    }
  }

  // Parking spaces validation
  if (inputs.parkingSpaces !== undefined) {
    if (typeof inputs.parkingSpaces !== 'number' || inputs.parkingSpaces < 0) {
      errors.push('Number of parking spaces must be a non-negative number');
    } else if (inputs.parkingSpaces > 10) {
      errors.push('Number of parking spaces must be 10 or less');
    }
  }

  // Amenities validation
  if (inputs.amenities && !Array.isArray(inputs.amenities)) {
    errors.push('Amenities must be an array');
  } else if (inputs.amenities) {
    const validAmenities = ['pool', 'gym', 'spa', 'tennis-court', 'basketball-court', 'playground', 'clubhouse', 'concierge', 'security', 'elevator', 'parking-garage', 'storage-unit', 'rooftop-deck', 'garden', 'bbq-area', 'dog-park', 'bike-storage', 'package-reception', 'valet-parking', 'shuttle-service'];
    for (const amenity of inputs.amenities) {
      if (!validAmenities.includes(amenity)) {
        errors.push(`Invalid amenity: ${amenity}`);
      }
    }
  }

  // Utilities included validation
  if (inputs.utilitiesIncluded && !Array.isArray(inputs.utilitiesIncluded)) {
    errors.push('Utilities included must be an array');
  } else if (inputs.utilitiesIncluded) {
    const validUtilities = ['water', 'sewer', 'trash', 'electricity', 'gas', 'internet', 'cable', 'heat', 'ac', 'none'];
    for (const utility of inputs.utilitiesIncluded) {
      if (!validUtilities.includes(utility)) {
        errors.push(`Invalid utility: ${utility}`);
      }
    }
  }

  // Maintenance included validation
  if (inputs.maintenanceIncluded && !Array.isArray(inputs.maintenanceIncluded)) {
    errors.push('Maintenance included must be an array');
  } else if (inputs.maintenanceIncluded) {
    const validMaintenance = ['exterior-painting', 'roof-repairs', 'landscaping', 'snow-removal', 'pest-control', 'window-cleaning', 'gutter-cleaning', 'exterior-lighting', 'sidewalk-repairs', 'none'];
    for (const maintenance of inputs.maintenanceIncluded) {
      if (!validMaintenance.includes(maintenance)) {
        errors.push(`Invalid maintenance service: ${maintenance}`);
      }
    }
  }

  // Insurance included validation
  if (inputs.insuranceIncluded && !Array.isArray(inputs.insuranceIncluded)) {
    errors.push('Insurance included must be an array');
  } else if (inputs.insuranceIncluded) {
    const validInsurance = ['building-insurance', 'liability-insurance', 'flood-insurance', 'earthquake-insurance', 'none'];
    for (const insurance of inputs.insuranceIncluded) {
      if (!validInsurance.includes(insurance)) {
        errors.push(`Invalid insurance type: ${insurance}`);
      }
    }
  }

  // Reserve fund validation
  if (inputs.reserveFund !== undefined) {
    if (typeof inputs.reserveFund !== 'number' || inputs.reserveFund < 0) {
      errors.push('Reserve fund must be a non-negative number');
    } else if (inputs.reserveFund > 1000) {
      errors.push('Reserve fund must be $1,000 or less per month');
    }
  }

  // Special assessment validation
  if (inputs.specialAssessment !== undefined) {
    if (typeof inputs.specialAssessment !== 'number' || inputs.specialAssessment < 0) {
      errors.push('Special assessment must be a non-negative number');
    } else if (inputs.specialAssessment > 5000) {
      errors.push('Special assessment must be $5,000 or less per month');
    }
  }

  // Late fees validation
  if (inputs.lateFees !== undefined) {
    if (typeof inputs.lateFees !== 'number' || inputs.lateFees < 0) {
      errors.push('Late fees must be a non-negative number');
    } else if (inputs.lateFees > 500) {
      errors.push('Late fees must be $500 or less');
    }
  }

  // Transfer fees validation
  if (inputs.transferFees !== undefined) {
    if (typeof inputs.transferFees !== 'number' || inputs.transferFees < 0) {
      errors.push('Transfer fees must be a non-negative number');
    } else if (inputs.transferFees > 10000) {
      errors.push('Transfer fees must be $10,000 or less');
    }
  }

  // Application fees validation
  if (inputs.applicationFees !== undefined) {
    if (typeof inputs.applicationFees !== 'number' || inputs.applicationFees < 0) {
      errors.push('Application fees must be a non-negative number');
    } else if (inputs.applicationFees > 2000) {
      errors.push('Application fees must be $2,000 or less');
    }
  }

  // Pet fees validation
  if (inputs.petFees !== undefined) {
    if (typeof inputs.petFees !== 'number' || inputs.petFees < 0) {
      errors.push('Pet fees must be a non-negative number');
    } else if (inputs.petFees > 500) {
      errors.push('Pet fees must be $500 or less per month');
    }
  }

  // Guest parking fees validation
  if (inputs.guestParkingFees !== undefined) {
    if (typeof inputs.guestParkingFees !== 'number' || inputs.guestParkingFees < 0) {
      errors.push('Guest parking fees must be a non-negative number');
    } else if (inputs.guestParkingFees > 100) {
      errors.push('Guest parking fees must be $100 or less per day');
    }
  }

  // Rental restrictions validation
  if (inputs.rentalRestrictions && !['none', 'minimum-lease', 'rental-cap', 'owner-occupancy-required', 'no-rentals'].includes(inputs.rentalRestrictions)) {
    errors.push('Invalid rental restrictions');
  }

  // Rental cap validation
  if (inputs.rentalCap !== undefined) {
    if (typeof inputs.rentalCap !== 'number' || inputs.rentalCap < 0 || inputs.rentalCap > 100) {
      errors.push('Rental cap must be between 0 and 100%');
    }
  }

  // Minimum lease validation
  if (inputs.minimumLease !== undefined) {
    if (typeof inputs.minimumLease !== 'number' || inputs.minimumLease <= 0) {
      errors.push('Minimum lease must be a positive number');
    } else if (inputs.minimumLease < 1 || inputs.minimumLease > 60) {
      errors.push('Minimum lease must be between 1 and 60 months');
    }
  }

  // HOA age validation
  if (inputs.hoaAge !== undefined) {
    if (typeof inputs.hoaAge !== 'number' || inputs.hoaAge < 0) {
      errors.push('HOA age must be a non-negative number');
    } else if (inputs.hoaAge > 100) {
      errors.push('HOA age must be 100 years or less');
    }
  }

  // Total units validation
  if (inputs.totalUnits !== undefined) {
    if (typeof inputs.totalUnits !== 'number' || inputs.totalUnits <= 0) {
      errors.push('Total units must be a positive number');
    } else if (inputs.totalUnits > 10000) {
      errors.push('Total units must be 10,000 or less');
    }
  }

  // Occupancy rate validation
  if (inputs.occupancyRate !== undefined) {
    if (typeof inputs.occupancyRate !== 'number' || inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
      errors.push('Occupancy rate must be between 0 and 100%');
    }
  }

  // Annual budget validation
  if (inputs.annualBudget !== undefined) {
    if (typeof inputs.annualBudget !== 'number' || inputs.annualBudget < 0) {
      errors.push('Annual budget must be a non-negative number');
    } else if (inputs.annualBudget > 10000000) {
      errors.push('Annual budget must be $10,000,000 or less');
    }
  }

  // Reserve fund balance validation
  if (inputs.reserveFundBalance !== undefined) {
    if (typeof inputs.reserveFundBalance !== 'number' || inputs.reserveFundBalance < 0) {
      errors.push('Reserve fund balance must be a non-negative number');
    } else if (inputs.reserveFundBalance > 10000000) {
      errors.push('Reserve fund balance must be $10,000,000 or less');
    }
  }

  // Debt obligations validation
  if (inputs.debtObligations !== undefined) {
    if (typeof inputs.debtObligations !== 'number' || inputs.debtObligations < 0) {
      errors.push('Debt obligations must be a non-negative number');
    } else if (inputs.debtObligations > 10000000) {
      errors.push('Debt obligations must be $10,000,000 or less');
    }
  }

  // Pending litigation validation
  if (inputs.pendingLitigation && !['none', 'minor', 'moderate', 'major'].includes(inputs.pendingLitigation)) {
    errors.push('Invalid pending litigation status');
  }

  // Management company validation
  if (inputs.managementCompany && !['self-managed', 'professional-management', 'hybrid'].includes(inputs.managementCompany)) {
    errors.push('Invalid management company type');
  }

  // Management fees validation
  if (inputs.managementFees !== undefined) {
    if (typeof inputs.managementFees !== 'number' || inputs.managementFees < 0) {
      errors.push('Management fees must be a non-negative number');
    } else if (inputs.managementFees > 10000) {
      errors.push('Management fees must be $10,000 or less per month');
    }
  }

  // Legal fees validation
  if (inputs.legalFees !== undefined) {
    if (typeof inputs.legalFees !== 'number' || inputs.legalFees < 0) {
      errors.push('Legal fees must be a non-negative number');
    } else if (inputs.legalFees > 5000) {
      errors.push('Legal fees must be $5,000 or less per month');
    }
  }

  // Accounting fees validation
  if (inputs.accountingFees !== undefined) {
    if (typeof inputs.accountingFees !== 'number' || inputs.accountingFees < 0) {
      errors.push('Accounting fees must be a non-negative number');
    } else if (inputs.accountingFees > 3000) {
      errors.push('Accounting fees must be $3,000 or less per month');
    }
  }

  // Insurance fees validation
  if (inputs.insuranceFees !== undefined) {
    if (typeof inputs.insuranceFees !== 'number' || inputs.insuranceFees < 0) {
      errors.push('Insurance fees must be a non-negative number');
    } else if (inputs.insuranceFees > 20000) {
      errors.push('Insurance fees must be $20,000 or less per month');
    }
  }

  // Utility costs validation
  if (inputs.utilityCosts !== undefined) {
    if (typeof inputs.utilityCosts !== 'number' || inputs.utilityCosts < 0) {
      errors.push('Utility costs must be a non-negative number');
    } else if (inputs.utilityCosts > 100000) {
      errors.push('Utility costs must be $100,000 or less per month');
    }
  }

  // Maintenance costs validation
  if (inputs.maintenanceCosts !== undefined) {
    if (typeof inputs.maintenanceCosts !== 'number' || inputs.maintenanceCosts < 0) {
      errors.push('Maintenance costs must be a non-negative number');
    } else if (inputs.maintenanceCosts > 100000) {
      errors.push('Maintenance costs must be $100,000 or less per month');
    }
  }

  // Landscaping costs validation
  if (inputs.landscapingCosts !== undefined) {
    if (typeof inputs.landscapingCosts !== 'number' || inputs.landscapingCosts < 0) {
      errors.push('Landscaping costs must be a non-negative number');
    } else if (inputs.landscapingCosts > 50000) {
      errors.push('Landscaping costs must be $50,000 or less per month');
    }
  }

  // Security costs validation
  if (inputs.securityCosts !== undefined) {
    if (typeof inputs.securityCosts !== 'number' || inputs.securityCosts < 0) {
      errors.push('Security costs must be a non-negative number');
    } else if (inputs.securityCosts > 50000) {
      errors.push('Security costs must be $50,000 or less per month');
    }
  }

  // Pool maintenance validation
  if (inputs.poolMaintenance !== undefined) {
    if (typeof inputs.poolMaintenance !== 'number' || inputs.poolMaintenance < 0) {
      errors.push('Pool maintenance must be a non-negative number');
    } else if (inputs.poolMaintenance > 20000) {
      errors.push('Pool maintenance must be $20,000 or less per month');
    }
  }

  // Elevator maintenance validation
  if (inputs.elevatorMaintenance !== undefined) {
    if (typeof inputs.elevatorMaintenance !== 'number' || inputs.elevatorMaintenance < 0) {
      errors.push('Elevator maintenance must be a non-negative number');
    } else if (inputs.elevatorMaintenance > 30000) {
      errors.push('Elevator maintenance must be $30,000 or less per month');
    }
  }

  // Parking maintenance validation
  if (inputs.parkingMaintenance !== undefined) {
    if (typeof inputs.parkingMaintenance !== 'number' || inputs.parkingMaintenance < 0) {
      errors.push('Parking maintenance must be a non-negative number');
    } else if (inputs.parkingMaintenance > 15000) {
      errors.push('Parking maintenance must be $15,000 or less per month');
    }
  }

  // Common area utilities validation
  if (inputs.commonAreaUtilities !== undefined) {
    if (typeof inputs.commonAreaUtilities !== 'number' || inputs.commonAreaUtilities < 0) {
      errors.push('Common area utilities must be a non-negative number');
    } else if (inputs.commonAreaUtilities > 20000) {
      errors.push('Common area utilities must be $20,000 or less per month');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < 0 || inputs.inflationRate > 20) {
      errors.push('Inflation rate must be between 0 and 20%');
    }
  }

  // Fee increase history validation
  if (inputs.feeIncreaseHistory && !['none', 'minimal', 'moderate', 'frequent', 'aggressive'].includes(inputs.feeIncreaseHistory)) {
    errors.push('Invalid fee increase history');
  }

  // Last fee increase validation
  if (inputs.lastFeeIncrease !== undefined) {
    if (typeof inputs.lastFeeIncrease !== 'number' || inputs.lastFeeIncrease < 0) {
      errors.push('Last fee increase must be a non-negative number');
    } else if (inputs.lastFeeIncrease > 20) {
      errors.push('Last fee increase must be 20 years or less');
    }
  }

  // Projected increase validation
  if (inputs.projectedIncrease !== undefined) {
    if (typeof inputs.projectedIncrease !== 'number' || inputs.projectedIncrease < 0 || inputs.projectedIncrease > 50) {
      errors.push('Projected increase must be between 0 and 50%');
    }
  }

  // Market comparison validation
  if (inputs.marketComparison && !['below-market', 'market-rate', 'above-market', 'premium'].includes(inputs.marketComparison)) {
    errors.push('Invalid market comparison');
  }

  // Competition level validation
  if (inputs.competitionLevel && !['low', 'medium', 'high', 'very-high'].includes(inputs.competitionLevel)) {
    errors.push('Invalid competition level');
  }

  // Location quality validation
  if (inputs.locationQuality && !['poor', 'fair', 'good', 'excellent', 'premium'].includes(inputs.locationQuality)) {
    errors.push('Invalid location quality');
  }

  // School district validation
  if (inputs.schoolDistrict && !['poor', 'fair', 'good', 'excellent'].includes(inputs.schoolDistrict)) {
    errors.push('Invalid school district quality');
  }

  // Crime rate validation
  if (inputs.crimeRate && !['high', 'medium', 'low', 'very-low'].includes(inputs.crimeRate)) {
    errors.push('Invalid crime rate');
  }

  // Public transportation validation
  if (inputs.publicTransportation && !['none', 'limited', 'good', 'excellent'].includes(inputs.publicTransportation)) {
    errors.push('Invalid public transportation access');
  }

  // Shopping access validation
  if (inputs.shoppingAccess && !['none', 'limited', 'good', 'excellent'].includes(inputs.shoppingAccess)) {
    errors.push('Invalid shopping access');
  }

  // Entertainment access validation
  if (inputs.entertainmentAccess && !['none', 'limited', 'good', 'excellent'].includes(inputs.entertainmentAccess)) {
    errors.push('Invalid entertainment access');
  }

  // Medical access validation
  if (inputs.medicalAccess && !['none', 'limited', 'good', 'excellent'].includes(inputs.medicalAccess)) {
    errors.push('Invalid medical access');
  }

  // Employment access validation
  if (inputs.employmentAccess && !['none', 'limited', 'good', 'excellent'].includes(inputs.employmentAccess)) {
    errors.push('Invalid employment access');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHOAFeeInput(field: string, value: any): string | null {
  switch (field) {
    case 'monthlyHOAFee':
      if (!value) return 'Monthly HOA fee is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5000) return 'Must be $5,000 or less';
      break;

    case 'propertyType':
      if (value && !['condo', 'townhouse', 'single-family', 'co-op', 'pud'].includes(value)) return 'Invalid property type';
      break;

    case 'squareFootage':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 100 || value > 10000)) return 'Must be between 100 and 10,000 square feet';
      break;

    case 'bedrooms':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10) return 'Must be 10 or less';
      break;

    case 'bathrooms':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10) return 'Must be 10 or less';
      break;

    case 'parkingSpaces':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10) return 'Must be 10 or less';
      break;

    case 'reserveFund':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 1000) return 'Must be $1,000 or less per month';
      break;

    case 'specialAssessment':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000) return 'Must be $5,000 or less per month';
      break;

    case 'petFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 500) return 'Must be $500 or less per month';
      break;

    case 'rentalCap':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) return 'Must be between 0 and 100%';
      break;

    case 'minimumLease':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 1 || value > 60)) return 'Must be between 1 and 60 months';
      break;

    case 'hoaAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100) return 'Must be 100 years or less';
      break;

    case 'totalUnits':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && value > 10000) return 'Must be 10,000 or less';
      break;

    case 'occupancyRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) return 'Must be between 0 and 100%';
      break;

    case 'annualBudget':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'reserveFundBalance':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'debtObligations':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'pendingLitigation':
      if (value && !['none', 'minor', 'moderate', 'major'].includes(value)) return 'Invalid pending litigation status';
      break;

    case 'managementCompany':
      if (value && !['self-managed', 'professional-management', 'hybrid'].includes(value)) return 'Invalid management company type';
      break;

    case 'managementFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000) return 'Must be $10,000 or less per month';
      break;

    case 'legalFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000) return 'Must be $5,000 or less per month';
      break;

    case 'accountingFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 3000) return 'Must be $3,000 or less per month';
      break;

    case 'insuranceFees':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 20000) return 'Must be $20,000 or less per month';
      break;

    case 'utilityCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100000) return 'Must be $100,000 or less per month';
      break;

    case 'maintenanceCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100000) return 'Must be $100,000 or less per month';
      break;

    case 'landscapingCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50000) return 'Must be $50,000 or less per month';
      break;

    case 'securityCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50000) return 'Must be $50,000 or less per month';
      break;

    case 'poolMaintenance':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 20000) return 'Must be $20,000 or less per month';
      break;

    case 'elevatorMaintenance':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 30000) return 'Must be $30,000 or less per month';
      break;

    case 'parkingMaintenance':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 15000) return 'Must be $15,000 or less per month';
      break;

    case 'commonAreaUtilities':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 20000) return 'Must be $20,000 or less per month';
      break;

    case 'inflationRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) return 'Must be between 0 and 20%';
      break;

    case 'feeIncreaseHistory':
      if (value && !['none', 'minimal', 'moderate', 'frequent', 'aggressive'].includes(value)) return 'Invalid fee increase history';
      break;

    case 'lastFeeIncrease':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 20) return 'Must be 20 years or less';
      break;

    case 'projectedIncrease':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) return 'Must be between 0 and 50%';
      break;

    case 'marketComparison':
      if (value && !['below-market', 'market-rate', 'above-market', 'premium'].includes(value)) return 'Invalid market comparison';
      break;

    case 'competitionLevel':
      if (value && !['low', 'medium', 'high', 'very-high'].includes(value)) return 'Invalid competition level';
      break;

    case 'locationQuality':
      if (value && !['poor', 'fair', 'good', 'excellent', 'premium'].includes(value)) return 'Invalid location quality';
      break;

    case 'schoolDistrict':
      if (value && !['poor', 'fair', 'good', 'excellent'].includes(value)) return 'Invalid school district quality';
      break;

    case 'crimeRate':
      if (value && !['high', 'medium', 'low', 'very-low'].includes(value)) return 'Invalid crime rate';
      break;

    case 'publicTransportation':
      if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) return 'Invalid public transportation access';
      break;

    case 'shoppingAccess':
      if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) return 'Invalid shopping access';
      break;

    case 'entertainmentAccess':
      if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) return 'Invalid entertainment access';
      break;

    case 'medicalAccess':
      if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) return 'Invalid medical access';
      break;

    case 'employmentAccess':
      if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) return 'Invalid employment access';
      break;
  }

  return null;
}
