import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateIndustrialWarehouseProfitabilityInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.totalSquareFootage) {
    errors.push('Total square footage is required');
  } else if (typeof inputs.totalSquareFootage !== 'number' || inputs.totalSquareFootage <= 0) {
    errors.push('Total square footage must be a positive number');
  } else if (inputs.totalSquareFootage < 1000 || inputs.totalSquareFootage > 1000000) {
    errors.push('Total square footage must be between 1,000 and 1,000,000 sqft');
  }

  // Warehouse type validation
  if (inputs.warehouseType) {
    const validWarehouseTypes = ['distribution-center', 'fulfillment-center', 'cold-storage', 'bulk-storage', 'cross-dock', 'flex-space', 'manufacturing', 'logistics-hub'];
    if (!validWarehouseTypes.includes(inputs.warehouseType)) {
      errors.push('Invalid warehouse type');
    }
  }

  // Clear height validation
  if (inputs.clearHeight !== undefined) {
    if (typeof inputs.clearHeight !== 'number' || inputs.clearHeight <= 0) {
      errors.push('Clear height must be a positive number');
    } else if (inputs.clearHeight < 12 || inputs.clearHeight > 100) {
      errors.push('Clear height must be between 12 and 100 feet');
    }
  }

  // Loading docks validation
  if (inputs.loadingDocks !== undefined) {
    if (typeof inputs.loadingDocks !== 'number' || inputs.loadingDocks < 0) {
      errors.push('Loading docks must be a non-negative number');
    } else if (inputs.loadingDocks > 100) {
      errors.push('Loading docks must be 100 or less');
    }
  }

  // Parking spaces validation
  if (inputs.parkingSpaces !== undefined) {
    if (typeof inputs.parkingSpaces !== 'number' || inputs.parkingSpaces < 0) {
      errors.push('Parking spaces must be a non-negative number');
    } else if (inputs.parkingSpaces > 1000) {
      errors.push('Parking spaces must be 1,000 or less');
    }
  }

  // Office space validation
  if (inputs.officeSpace !== undefined) {
    if (typeof inputs.officeSpace !== 'number' || inputs.officeSpace < 0) {
      errors.push('Office space must be a non-negative number');
    } else if (inputs.officeSpace > 50000) {
      errors.push('Office space must be 50,000 sqft or less');
    }
  }

  // Land area validation
  if (inputs.landArea !== undefined) {
    if (typeof inputs.landArea !== 'number' || inputs.landArea <= 0) {
      errors.push('Land area must be a positive number');
    } else if (inputs.landArea < 1 || inputs.landArea > 1000) {
      errors.push('Land area must be between 1 and 1,000 acres');
    }
  }

  // Location type validation
  if (inputs.locationType) {
    const validLocationTypes = ['urban', 'suburban', 'rural', 'airport-proximity', 'port-proximity', 'highway-access', 'rail-access'];
    if (!validLocationTypes.includes(inputs.locationType)) {
      errors.push('Invalid location type');
    }
  }

  // Market type validation
  if (inputs.marketType) {
    const validMarketTypes = ['primary', 'secondary', 'tertiary', 'emerging', 'mature', 'declining'];
    if (!validMarketTypes.includes(inputs.marketType)) {
      errors.push('Invalid market type');
    }
  }

  // Competition level validation
  if (inputs.competitionLevel) {
    const validCompetitionLevels = ['low', 'medium', 'high', 'very-high'];
    if (!validCompetitionLevels.includes(inputs.competitionLevel)) {
      errors.push('Invalid competition level');
    }
  }

  // Demand growth validation
  if (inputs.demandGrowth) {
    const validDemandGrowths = ['declining', 'stable', 'growing', 'rapid-growth'];
    if (!validDemandGrowths.includes(inputs.demandGrowth)) {
      errors.push('Invalid demand growth');
    }
  }

  // Vacancy rate validation
  if (inputs.vacancyRate !== undefined) {
    if (typeof inputs.vacancyRate !== 'number' || inputs.vacancyRate < 0) {
      errors.push('Vacancy rate must be a non-negative number');
    } else if (inputs.vacancyRate > 100) {
      errors.push('Vacancy rate must be 100% or less');
    }
  }

  // Rental rate validation
  if (inputs.rentalRate !== undefined) {
    if (typeof inputs.rentalRate !== 'number' || inputs.rentalRate <= 0) {
      errors.push('Rental rate must be a positive number');
    } else if (inputs.rentalRate < 1 || inputs.rentalRate > 50) {
      errors.push('Rental rate must be between $1 and $50 per sqft/year');
    }
  }

  // Rental escalation validation
  if (inputs.rentalEscalation !== undefined) {
    if (typeof inputs.rentalEscalation !== 'number' || inputs.rentalEscalation < 0) {
      errors.push('Rental escalation must be a non-negative number');
    } else if (inputs.rentalEscalation > 20) {
      errors.push('Rental escalation must be 20% or less');
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

  // Land cost per acre validation
  if (inputs.landCostPerAcre !== undefined) {
    if (typeof inputs.landCostPerAcre !== 'number' || inputs.landCostPerAcre < 0) {
      errors.push('Land cost per acre must be a non-negative number');
    } else if (inputs.landCostPerAcre > 5000000) {
      errors.push('Land cost per acre must be $5,000,000 or less');
    }
  }

  // Construction cost validation
  if (inputs.constructionCost !== undefined) {
    if (typeof inputs.constructionCost !== 'number' || inputs.constructionCost <= 0) {
      errors.push('Construction cost must be a positive number');
    } else if (inputs.constructionCost < 20 || inputs.constructionCost > 300) {
      errors.push('Construction cost must be between $20 and $300 per sqft');
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

  // Soft cost percentage validation
  if (inputs.softCostPercentage !== undefined) {
    if (typeof inputs.softCostPercentage !== 'number' || inputs.softCostPercentage < 0) {
      errors.push('Soft cost percentage must be a non-negative number');
    } else if (inputs.softCostPercentage > 50) {
      errors.push('Soft cost percentage must be 50% or less');
    }
  }

  // Site work validation
  if (inputs.siteWork !== undefined) {
    if (typeof inputs.siteWork !== 'number' || inputs.siteWork < 0) {
      errors.push('Site work must be a non-negative number');
    } else if (inputs.siteWork > 20000000) {
      errors.push('Site work must be $20,000,000 or less');
    }
  }

  // Utility connection costs validation
  if (inputs.utilityConnectionCosts !== undefined) {
    if (typeof inputs.utilityConnectionCosts !== 'number' || inputs.utilityConnectionCosts < 0) {
      errors.push('Utility connection costs must be a non-negative number');
    } else if (inputs.utilityConnectionCosts > 5000000) {
      errors.push('Utility connection costs must be $5,000,000 or less');
    }
  }

  // Permits validation
  if (inputs.permits !== undefined) {
    if (typeof inputs.permits !== 'number' || inputs.permits < 0) {
      errors.push('Permits must be a non-negative number');
    } else if (inputs.permits > 2000000) {
      errors.push('Permits must be $2,000,000 or less');
    }
  }

  // Financing costs validation
  if (inputs.financingCosts !== undefined) {
    if (typeof inputs.financingCosts !== 'number' || inputs.financingCosts < 0) {
      errors.push('Financing costs must be a non-negative number');
    } else if (inputs.financingCosts > 10000000) {
      errors.push('Financing costs must be $10,000,000 or less');
    }
  }

  // Contingency validation
  if (inputs.contingency !== undefined) {
    if (typeof inputs.contingency !== 'number' || inputs.contingency < 0) {
      errors.push('Contingency must be a non-negative number');
    } else if (inputs.contingency > 50) {
      errors.push('Contingency must be 50% or less');
    }
  }

  // Operating expenses validation
  if (inputs.operatingExpenses !== undefined) {
    if (typeof inputs.operatingExpenses !== 'number' || inputs.operatingExpenses < 0) {
      errors.push('Operating expenses must be a non-negative number');
    } else if (inputs.operatingExpenses > 10) {
      errors.push('Operating expenses must be $10/sqft/year or less');
    }
  }

  // Property taxes validation
  if (inputs.propertyTaxes !== undefined) {
    if (typeof inputs.propertyTaxes !== 'number' || inputs.propertyTaxes < 0) {
      errors.push('Property taxes must be a non-negative number');
    } else if (inputs.propertyTaxes > 5) {
      errors.push('Property taxes must be $5/sqft/year or less');
    }
  }

  // Insurance validation
  if (inputs.insurance !== undefined) {
    if (typeof inputs.insurance !== 'number' || inputs.insurance < 0) {
      errors.push('Insurance must be a non-negative number');
    } else if (inputs.insurance > 2) {
      errors.push('Insurance must be $2/sqft/year or less');
    }
  }

  // Maintenance validation
  if (inputs.maintenance !== undefined) {
    if (typeof inputs.maintenance !== 'number' || inputs.maintenance < 0) {
      errors.push('Maintenance must be a non-negative number');
    } else if (inputs.maintenance > 3) {
      errors.push('Maintenance must be $3/sqft/year or less');
    }
  }

  // Annual utilities validation
  if (inputs.annualUtilities !== undefined) {
    if (typeof inputs.annualUtilities !== 'number' || inputs.annualUtilities < 0) {
      errors.push('Annual utilities must be a non-negative number');
    } else if (inputs.annualUtilities > 1) {
      errors.push('Annual utilities must be $1/sqft/year or less');
    }
  }

  // Management fees validation
  if (inputs.managementFees !== undefined) {
    if (typeof inputs.managementFees !== 'number' || inputs.managementFees < 0) {
      errors.push('Management fees must be a non-negative number');
    } else if (inputs.managementFees > 15) {
      errors.push('Management fees must be 15% or less');
    }
  }

  // Financing rate validation
  if (inputs.financingRate !== undefined) {
    if (typeof inputs.financingRate !== 'number' || inputs.financingRate < 0) {
      errors.push('Financing rate must be a non-negative number');
    } else if (inputs.financingRate > 20) {
      errors.push('Financing rate must be 20% or less');
    }
  }

  // Loan term validation
  if (inputs.loanTerm !== undefined) {
    if (typeof inputs.loanTerm !== 'number' || inputs.loanTerm <= 0) {
      errors.push('Loan term must be a positive number');
    } else if (inputs.loanTerm < 5 || inputs.loanTerm > 50) {
      errors.push('Loan term must be between 5 and 50 years');
    }
  }

  // Down payment validation
  if (inputs.downPayment !== undefined) {
    if (typeof inputs.downPayment !== 'number' || inputs.downPayment < 0) {
      errors.push('Down payment must be a non-negative number');
    } else if (inputs.downPayment > 100) {
      errors.push('Down payment must be 100% or less');
    }
  }

  // Tax rate validation
  if (inputs.taxRate !== undefined) {
    if (typeof inputs.taxRate !== 'number' || inputs.taxRate < 0) {
      errors.push('Tax rate must be a non-negative number');
    } else if (inputs.taxRate > 50) {
      errors.push('Tax rate must be 50% or less');
    }
  }

  // Depreciation period validation
  if (inputs.depreciationPeriod !== undefined) {
    if (typeof inputs.depreciationPeriod !== 'number' || inputs.depreciationPeriod <= 0) {
      errors.push('Depreciation period must be a positive number');
    } else if (inputs.depreciationPeriod < 5 || inputs.depreciationPeriod > 50) {
      errors.push('Depreciation period must be between 5 and 50 years');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < 0) {
      errors.push('Inflation rate must be a non-negative number');
    } else if (inputs.inflationRate > 20) {
      errors.push('Inflation rate must be 20% or less');
    }
  }

  // Exit year validation
  if (inputs.exitYear !== undefined) {
    if (typeof inputs.exitYear !== 'number' || inputs.exitYear <= 0) {
      errors.push('Exit year must be a positive number');
    } else if (inputs.exitYear < 1 || inputs.exitYear > 50) {
      errors.push('Exit year must be between 1 and 50 years');
    }
  }

  // Exit cap rate validation
  if (inputs.exitCapRate !== undefined) {
    if (typeof inputs.exitCapRate !== 'number' || inputs.exitCapRate <= 0) {
      errors.push('Exit cap rate must be a positive number');
    } else if (inputs.exitCapRate > 20) {
      errors.push('Exit cap rate must be 20% or less');
    }
  }

  // Market rent growth validation
  if (inputs.marketRentGrowth !== undefined) {
    if (typeof inputs.marketRentGrowth !== 'number' || inputs.marketRentGrowth < -10) {
      errors.push('Market rent growth must be -10% or greater');
    } else if (inputs.marketRentGrowth > 20) {
      errors.push('Market rent growth must be 20% or less');
    }
  }

  // Expense growth validation
  if (inputs.expenseGrowth !== undefined) {
    if (typeof inputs.expenseGrowth !== 'number' || inputs.expenseGrowth < -5) {
      errors.push('Expense growth must be -5% or greater');
    } else if (inputs.expenseGrowth > 15) {
      errors.push('Expense growth must be 15% or less');
    }
  }

  // Construction time validation
  if (inputs.constructionTime !== undefined) {
    if (typeof inputs.constructionTime !== 'number' || inputs.constructionTime <= 0) {
      errors.push('Construction time must be a positive number');
    } else if (inputs.constructionTime < 3 || inputs.constructionTime > 36) {
      errors.push('Construction time must be between 3 and 36 months');
    }
  }

  // Stabilization time validation
  if (inputs.stabilizationTime !== undefined) {
    if (typeof inputs.stabilizationTime !== 'number' || inputs.stabilizationTime < 0) {
      errors.push('Stabilization time must be a non-negative number');
    } else if (inputs.stabilizationTime > 24) {
      errors.push('Stabilization time must be 24 months or less');
    }
  }

  // Energy efficiency validation
  if (inputs.energyEfficiency) {
    const validEnergyEfficiencies = ['basic', 'standard', 'efficient', 'green', 'leed-certified'];
    if (!validEnergyEfficiencies.includes(inputs.energyEfficiency)) {
      errors.push('Invalid energy efficiency');
    }
  }

  // Accessibility validation
  if (inputs.accessibility) {
    const validAccessibilities = ['excellent', 'good', 'fair', 'poor'];
    if (!validAccessibilities.includes(inputs.accessibility)) {
      errors.push('Invalid accessibility');
    }
  }

  // Infrastructure validation
  if (inputs.infrastructure) {
    const validInfrastructures = ['excellent', 'good', 'fair', 'poor'];
    if (!validInfrastructures.includes(inputs.infrastructure)) {
      errors.push('Invalid infrastructure');
    }
  }

  // Workforce availability validation
  if (inputs.workforceAvailability) {
    const validWorkforceAvailabilities = ['excellent', 'good', 'fair', 'poor'];
    if (!validWorkforceAvailabilities.includes(inputs.workforceAvailability)) {
      errors.push('Invalid workforce availability');
    }
  }

  // Regulatory environment validation
  if (inputs.regulatoryEnvironment) {
    const validRegulatoryEnvironments = ['business-friendly', 'moderate', 'restrictive', 'very-restrictive'];
    if (!validRegulatoryEnvironments.includes(inputs.regulatoryEnvironment)) {
      errors.push('Invalid regulatory environment');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateIndustrialWarehouseProfitabilityInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalSquareFootage':
      if (!value) return 'Total square footage is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000 || value > 1000000) return 'Must be between 1,000 and 1,000,000 sqft';
      break;
    case 'warehouseType':
      if (value) {
        const validTypes = ['distribution-center', 'fulfillment-center', 'cold-storage', 'bulk-storage', 'cross-dock', 'flex-space', 'manufacturing', 'logistics-hub'];
        if (!validTypes.includes(value)) return 'Invalid warehouse type';
      }
      break;
    case 'clearHeight':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 12 || value > 100) return 'Must be between 12 and 100 feet';
      }
      break;
    case 'loadingDocks':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100) return 'Must be 100 or less';
      }
      break;
    case 'parkingSpaces':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 1000) return 'Must be 1,000 or less';
      }
      break;
    case 'officeSpace':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000) return 'Must be 50,000 sqft or less';
      }
      break;
    case 'landArea':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1 || value > 1000) return 'Must be between 1 and 1,000 acres';
      }
      break;
    case 'locationType':
      if (value) {
        const validTypes = ['urban', 'suburban', 'rural', 'airport-proximity', 'port-proximity', 'highway-access', 'rail-access'];
        if (!validTypes.includes(value)) return 'Invalid location type';
      }
      break;
    case 'marketType':
      if (value) {
        const validTypes = ['primary', 'secondary', 'tertiary', 'emerging', 'mature', 'declining'];
        if (!validTypes.includes(value)) return 'Invalid market type';
      }
      break;
    case 'competitionLevel':
      if (value) {
        const validLevels = ['low', 'medium', 'high', 'very-high'];
        if (!validLevels.includes(value)) return 'Invalid competition level';
      }
      break;
    case 'demandGrowth':
      if (value) {
        const validGrowths = ['declining', 'stable', 'growing', 'rapid-growth'];
        if (!validGrowths.includes(value)) return 'Invalid demand growth';
      }
      break;
    case 'vacancyRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100) return 'Must be 100% or less';
      }
      break;
    case 'rentalRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1 || value > 50) return 'Must be between $1 and $50 per sqft/year';
      }
      break;
    case 'rentalEscalation':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'landCost':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100000000) return 'Must be $100,000,000 or less';
      }
      break;
    case 'landCostPerAcre':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5000000) return 'Must be $5,000,000 or less';
      }
      break;
    case 'constructionCost':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 20 || value > 300) return 'Must be between $20 and $300 per sqft';
      }
      break;
    case 'softCosts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000000) return 'Must be $50,000,000 or less';
      }
      break;
    case 'softCostPercentage':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50) return 'Must be 50% or less';
      }
      break;
    case 'siteWork':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20000000) return 'Must be $20,000,000 or less';
      }
      break;
    case 'utilityConnectionCosts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5000000) return 'Must be $5,000,000 or less';
      }
      break;
    case 'permits':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 2000000) return 'Must be $2,000,000 or less';
      }
      break;
    case 'financingCosts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10000000) return 'Must be $10,000,000 or less';
      }
      break;
    case 'contingency':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50) return 'Must be 50% or less';
      }
      break;
    case 'operatingExpenses':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10) return 'Must be $10/sqft/year or less';
      }
      break;
    case 'propertyTaxes':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5) return 'Must be $5/sqft/year or less';
      }
      break;
    case 'insurance':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 2) return 'Must be $2/sqft/year or less';
      }
      break;
    case 'maintenance':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 3) return 'Must be $3/sqft/year or less';
      }
      break;
    case 'annualUtilities':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 1) return 'Must be $1/sqft/year or less';
      }
      break;
    case 'managementFees':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 15) return 'Must be 15% or less';
      }
      break;
    case 'financingRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'loanTerm':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 5 || value > 50) return 'Must be between 5 and 50 years';
      }
      break;
    case 'downPayment':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100) return 'Must be 100% or less';
      }
      break;
    case 'taxRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50) return 'Must be 50% or less';
      }
      break;
    case 'depreciationPeriod':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 5 || value > 50) return 'Must be between 5 and 50 years';
      }
      break;
    case 'inflationRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'exitYear':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1 || value > 50) return 'Must be between 1 and 50 years';
      }
      break;
    case 'exitCapRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'marketRentGrowth':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < -10) return 'Must be -10% or greater';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'expenseGrowth':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < -5) return 'Must be -5% or greater';
        if (value > 15) return 'Must be 15% or less';
      }
      break;
    case 'constructionTime':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 3 || value > 36) return 'Must be between 3 and 36 months';
      }
      break;
    case 'stabilizationTime':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 24) return 'Must be 24 months or less';
      }
      break;
    case 'energyEfficiency':
      if (value) {
        const validEfficiencies = ['basic', 'standard', 'efficient', 'green', 'leed-certified'];
        if (!validEfficiencies.includes(value)) return 'Invalid energy efficiency';
      }
      break;
    case 'accessibility':
      if (value) {
        const validAccessibilities = ['excellent', 'good', 'fair', 'poor'];
        if (!validAccessibilities.includes(value)) return 'Invalid accessibility';
      }
      break;
    case 'infrastructure':
      if (value) {
        const validInfrastructures = ['excellent', 'good', 'fair', 'poor'];
        if (!validInfrastructures.includes(value)) return 'Invalid infrastructure';
      }
      break;
    case 'workforceAvailability':
      if (value) {
        const validAvailabilities = ['excellent', 'good', 'fair', 'poor'];
        if (!validAvailabilities.includes(value)) return 'Invalid workforce availability';
      }
      break;
    case 'regulatoryEnvironment':
      if (value) {
        const validEnvironments = ['business-friendly', 'moderate', 'restrictive', 'very-restrictive'];
        if (!validEnvironments.includes(value)) return 'Invalid regulatory environment';
      }
      break;
  }
  return null;
}
