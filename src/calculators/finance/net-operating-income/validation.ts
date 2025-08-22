import { CalculatorInputs } from '../../../types/calculator';

export interface NetOperatingIncomeInputs extends CalculatorInputs {
  // Income inputs
  grossRentalIncome: number;
  otherIncome?: number;
  vacancyLoss?: number;
  concessions?: number;
  
  // Required expense inputs
  propertyTax: number;
  insurance: number;
  
  // Optional expense inputs
  utilities?: number;
  maintenance?: number;
  propertyManagement?: number;
  landscaping?: number;
  janitorial?: number;
  security?: number;
  advertising?: number;
  legal?: number;
  accounting?: number;
  licenses?: number;
  supplies?: number;
  trash?: number;
  snowRemoval?: number;
  pool?: number;
  elevator?: number;
  parking?: number;
  roofing?: number;
  hvac?: number;
  pestControl?: number;
  reserves?: number;
  hoaFees?: number;
  
  // Property details
  propertyValue?: number;
  numberOfUnits?: number;
  propertySize?: number;
  
  // Analysis options
  analysisPeriod?: number;
  includeCapRate?: boolean;
  includeExpenseRatio?: boolean;
  includeBreakdown?: boolean;
}

export const validateNetOperatingIncomeInputs = (inputs: Partial<NetOperatingIncomeInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.grossRentalIncome || inputs.grossRentalIncome <= 0) {
    errors.push('Gross rental income is required and must be greater than 0');
  }

  if (!inputs.propertyTax || inputs.propertyTax < 0) {
    errors.push('Property tax is required and must be 0 or greater');
  }

  if (!inputs.insurance || inputs.insurance < 0) {
    errors.push('Insurance is required and must be 0 or greater');
  }

  // Range validation for income
  if (inputs.grossRentalIncome && (inputs.grossRentalIncome < 1000 || inputs.grossRentalIncome > 10000000)) {
    errors.push('Gross rental income must be between $1,000 and $10,000,000');
  }

  if (inputs.otherIncome && inputs.otherIncome < 0) {
    errors.push('Other income cannot be negative');
  }

  if (inputs.vacancyLoss && inputs.vacancyLoss < 0) {
    errors.push('Vacancy loss cannot be negative');
  }

  if (inputs.concessions && inputs.concessions < 0) {
    errors.push('Rent concessions cannot be negative');
  }

  // Range validation for expenses
  if (inputs.propertyTax && (inputs.propertyTax < 0 || inputs.propertyTax > 1000000)) {
    errors.push('Property tax must be between $0 and $1,000,000');
  }

  if (inputs.insurance && (inputs.insurance < 0 || inputs.insurance > 500000)) {
    errors.push('Insurance must be between $0 and $500,000');
  }

  if (inputs.utilities && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  }

  if (inputs.maintenance && inputs.maintenance < 0) {
    errors.push('Maintenance costs cannot be negative');
  }

  if (inputs.propertyManagement && inputs.propertyManagement < 0) {
    errors.push('Property management fees cannot be negative');
  }

  if (inputs.landscaping && inputs.landscaping < 0) {
    errors.push('Landscaping costs cannot be negative');
  }

  if (inputs.janitorial && inputs.janitorial < 0) {
    errors.push('Janitorial costs cannot be negative');
  }

  if (inputs.security && inputs.security < 0) {
    errors.push('Security costs cannot be negative');
  }

  if (inputs.advertising && inputs.advertising < 0) {
    errors.push('Advertising costs cannot be negative');
  }

  if (inputs.legal && inputs.legal < 0) {
    errors.push('Legal costs cannot be negative');
  }

  if (inputs.accounting && inputs.accounting < 0) {
    errors.push('Accounting costs cannot be negative');
  }

  if (inputs.licenses && inputs.licenses < 0) {
    errors.push('License costs cannot be negative');
  }

  if (inputs.supplies && inputs.supplies < 0) {
    errors.push('Supply costs cannot be negative');
  }

  if (inputs.trash && inputs.trash < 0) {
    errors.push('Trash removal costs cannot be negative');
  }

  if (inputs.snowRemoval && inputs.snowRemoval < 0) {
    errors.push('Snow removal costs cannot be negative');
  }

  if (inputs.pool && inputs.pool < 0) {
    errors.push('Pool maintenance costs cannot be negative');
  }

  if (inputs.elevator && inputs.elevator < 0) {
    errors.push('Elevator maintenance costs cannot be negative');
  }

  if (inputs.parking && inputs.parking < 0) {
    errors.push('Parking maintenance costs cannot be negative');
  }

  if (inputs.roofing && inputs.roofing < 0) {
    errors.push('Roofing costs cannot be negative');
  }

  if (inputs.hvac && inputs.hvac < 0) {
    errors.push('HVAC maintenance costs cannot be negative');
  }

  if (inputs.pestControl && inputs.pestControl < 0) {
    errors.push('Pest control costs cannot be negative');
  }

  if (inputs.reserves && inputs.reserves < 0) {
    errors.push('Reserve contributions cannot be negative');
  }

  if (inputs.hoaFees && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  // Property details validation
  if (inputs.propertyValue && inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (inputs.numberOfUnits && (inputs.numberOfUnits <= 0 || inputs.numberOfUnits > 10000)) {
    errors.push('Number of units must be between 1 and 10,000');
  }

  if (inputs.propertySize && (inputs.propertySize <= 0 || inputs.propertySize > 10000000)) {
    errors.push('Property size must be between 1 and 10,000,000 square feet');
  }

  if (inputs.analysisPeriod && (inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 50)) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  // Logical validation
  if (inputs.grossRentalIncome && inputs.vacancyLoss && inputs.vacancyLoss > inputs.grossRentalIncome) {
    errors.push('Vacancy loss cannot exceed gross rental income');
  }

  if (inputs.grossRentalIncome && inputs.concessions && inputs.concessions > inputs.grossRentalIncome) {
    errors.push('Rent concessions cannot exceed gross rental income');
  }

  if (inputs.vacancyLoss && inputs.concessions && inputs.grossRentalIncome) {
    const totalDeductions = inputs.vacancyLoss + inputs.concessions;
    if (totalDeductions > inputs.grossRentalIncome) {
      errors.push('Total deductions (vacancy + concessions) cannot exceed gross rental income');
    }
  }

  // Expense ratio validation
  if (inputs.grossRentalIncome && inputs.propertyTax && inputs.insurance) {
    const totalRequiredExpenses = inputs.propertyTax + inputs.insurance;
    const expenseRatio = (totalRequiredExpenses / inputs.grossRentalIncome) * 100;
    
    if (expenseRatio > 100) {
      errors.push('Required expenses (tax + insurance) cannot exceed 100% of gross rental income');
    }
  }

  // Property management fee validation
  if (inputs.grossRentalIncome && inputs.propertyManagement) {
    const managementRatio = (inputs.propertyManagement / inputs.grossRentalIncome) * 100;
    if (managementRatio > 20) {
      errors.push('Property management fees should not exceed 20% of gross rental income');
    }
  }

  // Cap rate validation
  if (inputs.propertyValue && inputs.propertyValue > 0) {
    const estimatedNOI = (inputs.grossRentalIncome || 0) - (inputs.propertyTax || 0) - (inputs.insurance || 0);
    const estimatedCapRate = (estimatedNOI / inputs.propertyValue) * 100;
    
    if (estimatedCapRate > 25) {
      errors.push('Estimated cap rate is unusually high (>25%) - please verify inputs');
    }
    
    if (estimatedCapRate < 0) {
      errors.push('Estimated cap rate is negative - please verify expense inputs');
    }
  }

  // Unit-based validation
  if (inputs.numberOfUnits && inputs.numberOfUnits > 0) {
    if (inputs.grossRentalIncome) {
      const incomePerUnit = inputs.grossRentalIncome / inputs.numberOfUnits;
      if (incomePerUnit < 100) {
        errors.push('Income per unit is unusually low (<$100) - please verify inputs');
      }
    }
    
    if (inputs.propertyTax) {
      const taxPerUnit = inputs.propertyTax / inputs.numberOfUnits;
      if (taxPerUnit > 50000) {
        errors.push('Property tax per unit is unusually high (>$50,000) - please verify inputs');
      }
    }
  }

  // Size-based validation
  if (inputs.propertySize && inputs.propertySize > 0) {
    if (inputs.grossRentalIncome) {
      const incomePerSqFt = inputs.grossRentalIncome / inputs.propertySize;
      if (incomePerSqFt > 1000) {
        errors.push('Income per square foot is unusually high (>$1,000) - please verify inputs');
      }
    }
    
    if (inputs.propertyTax) {
      const taxPerSqFt = inputs.propertyTax / inputs.propertySize;
      if (taxPerSqFt > 100) {
        errors.push('Property tax per square foot is unusually high (>$100) - please verify inputs');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};