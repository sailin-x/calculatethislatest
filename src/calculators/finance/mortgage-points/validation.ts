import { CalculatorInputs } from '../../../types/calculator';

export interface MortgagePointsInputs extends CalculatorInputs {
  loanAmount: number;
  originalRate: number;
  reducedRate: number;
  loanTerm: number;
  pointsCost?: number;
  pointsPercentage?: number;
  closingCosts?: number;
  propertyTax?: number;
  homeInsurance?: number;
  pmi?: number;
  hoaFees?: number;
  taxRate?: number;
  investmentReturn?: number;
  inflationRate?: number;
  plannedOwnership?: number;
  refinanceLikelihood?: 'low' | 'medium' | 'high';
  includeTaxBenefits?: boolean;
  includeOpportunityCost?: boolean;
  compareScenarios?: boolean;
  analysisPeriod?: number;
  pointsOptions?: string[];
}

export const validateMortgagePointsInputs = (inputs: Partial<MortgagePointsInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  }

  if (!inputs.originalRate || inputs.originalRate < 0 || inputs.originalRate > 25) {
    errors.push('Original interest rate must be between 0% and 25%');
  }

  if (!inputs.reducedRate || inputs.reducedRate < 0 || inputs.reducedRate > 25) {
    errors.push('Reduced interest rate must be between 0% and 25%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
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

  // Interest rate validation
  if (inputs.originalRate && inputs.reducedRate) {
    if (inputs.reducedRate >= inputs.originalRate) {
      errors.push('Reduced rate must be lower than original rate');
    }
    
    const rateDifference = inputs.originalRate - inputs.reducedRate;
    if (rateDifference > 5) {
      errors.push('Rate reduction cannot exceed 5 percentage points');
    }
  }

  // Points cost validation
  if (inputs.pointsCost !== undefined && inputs.pointsCost < 0) {
    errors.push('Points cost cannot be negative');
  }

  if (inputs.pointsCost !== undefined && inputs.pointsCost > 100000) {
    errors.push('Points cost cannot exceed $100,000');
  }

  if (inputs.pointsPercentage !== undefined) {
    if (inputs.pointsPercentage < 0 || inputs.pointsPercentage > 10) {
      errors.push('Points percentage must be between 0% and 10%');
    }
  }

  // Closing costs validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts > 50000) {
    errors.push('Closing costs cannot exceed $50,000');
  }

  // Property tax validation
  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  }

  if (inputs.propertyTax !== undefined && inputs.propertyTax > 100000) {
    errors.push('Property tax cannot exceed $100,000');
  }

  // Insurance validation
  if (inputs.homeInsurance !== undefined && inputs.homeInsurance < 0) {
    errors.push('Home insurance cannot be negative');
  }

  if (inputs.homeInsurance !== undefined && inputs.homeInsurance > 10000) {
    errors.push('Home insurance cannot exceed $10,000');
  }

  // PMI validation
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

  // Tax rate validation
  if (inputs.taxRate !== undefined) {
    if (inputs.taxRate < 0 || inputs.taxRate > 50) {
      errors.push('Tax rate must be between 0% and 50%');
    }
  }

  // Investment return validation
  if (inputs.investmentReturn !== undefined) {
    if (inputs.investmentReturn < 0 || inputs.investmentReturn > 20) {
      errors.push('Investment return rate must be between 0% and 20%');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0 || inputs.inflationRate > 10) {
      errors.push('Inflation rate must be between 0% and 10%');
    }
  }

  // Planned ownership validation
  if (inputs.plannedOwnership !== undefined) {
    if (inputs.plannedOwnership < 1 || inputs.plannedOwnership > 50) {
      errors.push('Planned ownership period must be between 1 and 50 years');
    }
  }

  // Refinance likelihood validation
  if (inputs.refinanceLikelihood !== undefined) {
    if (!['low', 'medium', 'high'].includes(inputs.refinanceLikelihood)) {
      errors.push('Refinance likelihood must be low, medium, or high');
    }
  }

  // Analysis period validation
  if (inputs.analysisPeriod !== undefined) {
    if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
      errors.push('Analysis period must be between 1 and 50 years');
    }
  }

  // Points options validation
  if (inputs.pointsOptions !== undefined) {
    if (!Array.isArray(inputs.pointsOptions)) {
      errors.push('Points options must be an array');
    } else {
      const validOptions = ['0', '0.5', '1', '1.5', '2', '2.5', '3'];
      inputs.pointsOptions.forEach(option => {
        if (!validOptions.includes(option)) {
          errors.push(`Invalid points option: ${option}. Valid options are: ${validOptions.join(', ')}`);
        }
      });
    }
  }

  // Logical consistency validation
  if (inputs.loanAmount && inputs.pointsPercentage) {
    const calculatedPointsCost = (inputs.loanAmount * inputs.pointsPercentage) / 100;
    if (inputs.pointsCost && Math.abs(calculatedPointsCost - inputs.pointsCost) > 100) {
      errors.push('Points cost and points percentage are inconsistent');
    }
  }

  if (inputs.plannedOwnership && inputs.loanTerm) {
    if (inputs.plannedOwnership > inputs.loanTerm) {
      errors.push('Planned ownership period cannot exceed loan term');
    }
  }

  if (inputs.analysisPeriod && inputs.loanTerm) {
    if (inputs.analysisPeriod > inputs.loanTerm) {
      errors.push('Analysis period cannot exceed loan term');
    }
  }

  // Rate reduction validation
  if (inputs.originalRate && inputs.reducedRate) {
    const rateReduction = inputs.originalRate - inputs.reducedRate;
    const estimatedPoints = rateReduction / 0.25; // Typical rate reduction per point
    
    if (estimatedPoints > 10) {
      errors.push('Rate reduction suggests more than 10 points, which is unusually high');
    }
    
    if (estimatedPoints < 0) {
      errors.push('Rate reduction cannot be negative');
    }
  }

  // Points cost reasonableness check
  if (inputs.loanAmount && inputs.pointsCost) {
    const pointsPercentage = (inputs.pointsCost / inputs.loanAmount) * 100;
    if (pointsPercentage > 10) {
      errors.push('Points cost exceeds 10% of loan amount, which is unusually high');
    }
  }

  // Tax benefits validation
  if (inputs.includeTaxBenefits && inputs.taxRate === undefined) {
    errors.push('Tax rate is required when including tax benefits');
  }

  // Opportunity cost validation
  if (inputs.includeOpportunityCost && inputs.investmentReturn === undefined) {
    errors.push('Investment return rate is required when including opportunity cost');
  }

  // Scenario comparison validation
  if (inputs.compareScenarios && (!inputs.pointsOptions || inputs.pointsOptions.length < 2)) {
    errors.push('At least 2 points options are required for scenario comparison');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};