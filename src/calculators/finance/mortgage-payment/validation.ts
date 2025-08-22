import { CalculatorInputs } from '../../../types/calculator';

export interface MortgagePaymentInputs extends CalculatorInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'arm';
  downPayment?: number;
  downPaymentPercent?: number;
  propertyValue?: number;
  propertyTax?: number;
  propertyTaxRate?: number;
  homeInsurance?: number;
  pmi?: number;
  hoaFees?: number;
  closingCosts?: number;
  armInitialRate?: number;
  armFixedPeriod?: number;
  armMargin?: number;
  armCap?: number;
  armLifetimeCap?: number;
  fhaUpfrontMIP?: number;
  fhaAnnualMIP?: number;
  vaFundingFee?: number;
  usdaGuaranteeFee?: number;
  includeTaxes?: boolean;
  includeInsurance?: boolean;
  includePMI?: boolean;
  includeHOA?: boolean;
  amortizationSchedule?: boolean;
  schedulePeriods?: number;
  extraPayment?: number;
  lumpSumPayment?: number;
  lumpSumMonth?: number;
  biweeklyPayment?: boolean;
  compareScenarios?: boolean;
}

export const validateMortgagePaymentInputs = (inputs: Partial<MortgagePaymentInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate < 0 || inputs.interestRate > 25) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda', 'jumbo', 'arm'].includes(inputs.loanType)) {
    errors.push('Valid loan type is required (conventional, fha, va, usda, jumbo, arm)');
  }

  // Loan amount validation
  if (inputs.loanAmount) {
    if (inputs.loanAmount < 1000) {
      errors.push('Loan amount must be at least $1,000');
    }
    if (inputs.loanAmount > 10000000) {
      errors.push('Loan amount cannot exceed $10,000,000');
    }
  }

  // Down payment validation
  if (inputs.downPayment !== undefined && inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPaymentPercent !== undefined) {
    if (inputs.downPaymentPercent < 0 || inputs.downPaymentPercent > 100) {
      errors.push('Down payment percentage must be between 0% and 100%');
    }
  }

  // Property value validation
  if (inputs.propertyValue !== undefined) {
    if (inputs.propertyValue <= 0) {
      errors.push('Property value must be greater than 0');
    }
    if (inputs.propertyValue > 10000000) {
      errors.push('Property value cannot exceed $10,000,000');
    }
  }

  // Property tax validation
  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  }

  if (inputs.propertyTaxRate !== undefined) {
    if (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 10) {
      errors.push('Property tax rate must be between 0% and 10%');
    }
  }

  // Insurance validation
  if (inputs.homeInsurance !== undefined && inputs.homeInsurance < 0) {
    errors.push('Home insurance cannot be negative');
  }

  if (inputs.pmi !== undefined) {
    if (inputs.pmi < 0 || inputs.pmi > 5) {
      errors.push('PMI rate must be between 0% and 5%');
    }
  }

  // HOA fees validation
  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees > 2000) {
    errors.push('HOA fees cannot exceed $2,000 per month');
  }

  // Closing costs validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts > 50000) {
    errors.push('Closing costs cannot exceed $50,000');
  }

  // ARM-specific validation
  if (inputs.loanType === 'arm') {
    if (inputs.armInitialRate !== undefined) {
      if (inputs.armInitialRate < 0.1 || inputs.armInitialRate > 25) {
        errors.push('ARM initial rate must be between 0.1% and 25%');
      }
    }

    if (inputs.armFixedPeriod !== undefined) {
      if (inputs.armFixedPeriod < 1 || inputs.armFixedPeriod > 30) {
        errors.push('ARM fixed period must be between 1 and 30 years');
      }
    }

    if (inputs.armMargin !== undefined) {
      if (inputs.armMargin < 0 || inputs.armMargin > 10) {
        errors.push('ARM margin must be between 0% and 10%');
      }
    }

    if (inputs.armCap !== undefined) {
      if (inputs.armCap < 0 || inputs.armCap > 10) {
        errors.push('ARM rate cap must be between 0% and 10%');
      }
    }

    if (inputs.armLifetimeCap !== undefined) {
      if (inputs.armLifetimeCap < 0 || inputs.armLifetimeCap > 15) {
        errors.push('ARM lifetime cap must be between 0% and 15%');
      }
    }
  }

  // FHA-specific validation
  if (inputs.loanType === 'fha') {
    if (inputs.fhaUpfrontMIP !== undefined) {
      if (inputs.fhaUpfrontMIP < 0 || inputs.fhaUpfrontMIP > 5) {
        errors.push('FHA upfront MIP must be between 0% and 5%');
      }
    }

    if (inputs.fhaAnnualMIP !== undefined) {
      if (inputs.fhaAnnualMIP < 0 || inputs.fhaAnnualMIP > 2) {
        errors.push('FHA annual MIP must be between 0% and 2%');
      }
    }
  }

  // VA-specific validation
  if (inputs.loanType === 'va') {
    if (inputs.vaFundingFee !== undefined) {
      if (inputs.vaFundingFee < 0 || inputs.vaFundingFee > 5) {
        errors.push('VA funding fee must be between 0% and 5%');
      }
    }
  }

  // USDA-specific validation
  if (inputs.loanType === 'usda') {
    if (inputs.usdaGuaranteeFee !== undefined) {
      if (inputs.usdaGuaranteeFee < 0 || inputs.usdaGuaranteeFee > 2) {
        errors.push('USDA guarantee fee must be between 0% and 2%');
      }
    }
  }

  // Amortization schedule validation
  if (inputs.schedulePeriods !== undefined) {
    if (inputs.schedulePeriods < 1 || inputs.schedulePeriods > 360) {
      errors.push('Schedule periods must be between 1 and 360');
    }
  }

  // Extra payment validation
  if (inputs.extraPayment !== undefined && inputs.extraPayment < 0) {
    errors.push('Extra payment cannot be negative');
  }

  if (inputs.extraPayment !== undefined && inputs.extraPayment > 10000) {
    errors.push('Extra payment cannot exceed $10,000 per month');
  }

  // Lump sum payment validation
  if (inputs.lumpSumPayment !== undefined && inputs.lumpSumPayment < 0) {
    errors.push('Lump sum payment cannot be negative');
  }

  if (inputs.lumpSumPayment !== undefined && inputs.lumpSumPayment > 1000000) {
    errors.push('Lump sum payment cannot exceed $1,000,000');
  }

  if (inputs.lumpSumMonth !== undefined) {
    if (inputs.lumpSumMonth < 1 || inputs.lumpSumMonth > 360) {
      errors.push('Lump sum month must be between 1 and 360');
    }
  }

  // Logical consistency validation
  if (inputs.propertyValue && inputs.loanAmount) {
    if (inputs.loanAmount > inputs.propertyValue) {
      errors.push('Loan amount cannot exceed property value');
    }
  }

  if (inputs.downPayment && inputs.propertyValue) {
    if (inputs.downPayment > inputs.propertyValue) {
      errors.push('Down payment cannot exceed property value');
    }
  }

  if (inputs.downPaymentPercent && inputs.downPaymentPercent > 100) {
    errors.push('Down payment percentage cannot exceed 100%');
  }

  if (inputs.loanType === 'arm' && inputs.armInitialRate && inputs.interestRate) {
    if (inputs.armInitialRate > inputs.interestRate) {
      errors.push('ARM initial rate should typically be lower than the comparison fixed rate');
    }
  }

  if (inputs.armLifetimeCap && inputs.armCap) {
    if (inputs.armLifetimeCap < inputs.armCap) {
      errors.push('ARM lifetime cap should be greater than or equal to the periodic cap');
    }
  }

  // Loan type specific validation
  if (inputs.loanType === 'jumbo' && inputs.loanAmount && inputs.loanAmount < 647200) {
    errors.push('Jumbo loans typically start at $647,200 (2022 conforming limit)');
  }

  if (inputs.loanType === 'fha' && inputs.loanAmount && inputs.loanAmount > 970800) {
    errors.push('FHA loan limits vary by county but typically max out around $970,800');
  }

  if (inputs.loanType === 'va' && inputs.loanAmount && inputs.loanAmount > 970800) {
    errors.push('VA loan limits vary by county but typically max out around $970,800');
  }

  if (inputs.loanType === 'usda' && inputs.loanAmount && inputs.loanAmount > 500000) {
    errors.push('USDA loans typically have lower limits, check your area for specific limits');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};