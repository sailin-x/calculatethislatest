import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateLoanToValueRatioInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  } else if (typeof inputs.propertyValue !== 'number' || inputs.propertyValue <= 0) {
    errors.push('Property value must be a positive number');
  } else if (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }

  if (!inputs.loanAmount) {
    errors.push('Loan amount is required');
  } else if (typeof inputs.loanAmount !== 'number' || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be a positive number');
  } else if (inputs.loanAmount < 1000 || inputs.loanAmount > 10000000) {
    errors.push('Loan amount must be between $1,000 and $10,000,000');
  }

  // Optional field validation
  if (inputs.downPayment !== undefined) {
    if (typeof inputs.downPayment !== 'number' || inputs.downPayment < 0) {
      errors.push('Down payment must be a non-negative number');
    } else if (inputs.downPayment > 5000000) {
      errors.push('Down payment must be $5,000,000 or less');
    }
  }

  if (inputs.maxLtvRatio !== undefined) {
    if (typeof inputs.maxLtvRatio !== 'number' || inputs.maxLtvRatio <= 0) {
      errors.push('Maximum LTV ratio must be a positive number');
    } else if (inputs.maxLtvRatio < 50 || inputs.maxLtvRatio > 100) {
      errors.push('Maximum LTV ratio must be between 50% and 100%');
    }
  }

  if (inputs.creditScore !== undefined) {
    if (typeof inputs.creditScore !== 'number' || inputs.creditScore <= 0) {
      errors.push('Credit score must be a positive number');
    } else if (inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push('Credit score must be between 300 and 850');
    }
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    if (typeof inputs.debtToIncomeRatio !== 'number' || inputs.debtToIncomeRatio < 0) {
      errors.push('Debt-to-income ratio must be a non-negative number');
    } else if (inputs.debtToIncomeRatio > 100) {
      errors.push('Debt-to-income ratio must be 100% or less');
    }
  }

  if (inputs.propertyAge !== undefined) {
    if (typeof inputs.propertyAge !== 'number' || inputs.propertyAge < 0) {
      errors.push('Property age must be a non-negative number');
    } else if (inputs.propertyAge > 200) {
      errors.push('Property age must be 200 years or less');
    }
  }

  // Enum validation
  const validPropertyTypes = ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial', 'Investment', 'Vacation Home', 'Manufactured Home', 'Land', 'Mixed-Use'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
  }

  const validOccupancyTypes = ['Primary Residence', 'Secondary Home', 'Investment Property', 'Vacation Rental', 'Commercial Use'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push(`Occupancy type must be one of: ${validOccupancyTypes.join(', ')}`);
  }

  const validLoanTypes = ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Portfolio', 'Hard Money', 'Bridge Loan', 'Construction Loan', 'HELOC'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push(`Loan type must be one of: ${validLoanTypes.join(', ')}`);
  }

  const validLoanPurposes = ['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction', 'Renovation', 'Investment', 'Bridge Financing'];
  if (inputs.loanPurpose && !validLoanPurposes.includes(inputs.loanPurpose)) {
    errors.push(`Loan purpose must be one of: ${validLoanPurposes.join(', ')}`);
  }

  const validPropertyLocations = ['Urban', 'Suburban', 'Rural', 'Downtown', 'Residential Area', 'Commercial District', 'Industrial Zone', 'Coastal', 'Mountain', 'Desert'];
  if (inputs.propertyLocation && !validPropertyLocations.includes(inputs.propertyLocation)) {
    errors.push(`Property location must be one of: ${validPropertyLocations.join(', ')}`);
  }

  const validMarketConditions = ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'];
  if (inputs.marketCondition && !validMarketConditions.includes(inputs.marketCondition)) {
    errors.push(`Market condition must be one of: ${validMarketConditions.join(', ')}`);
  }

  const validLenderTypes = ['Commercial Bank', 'Credit Union', 'Mortgage Banker', 'Mortgage Broker', 'Private Lender', 'Hard Money Lender', 'Government Agency', 'Regional Bank', 'National Bank', 'Online Lender'];
  if (inputs.lenderType && !validLenderTypes.includes(inputs.lenderType)) {
    errors.push(`Lender type must be one of: ${validLenderTypes.join(', ')}`);
  }

  const validAppraisalTypes = ['Full Appraisal', 'Drive-By Appraisal', 'Desktop Appraisal', 'Automated Valuation Model (AVM)', 'Broker Price Opinion (BPO)', 'No Appraisal Required'];
  if (inputs.appraisalType && !validAppraisalTypes.includes(inputs.appraisalType)) {
    errors.push(`Appraisal type must be one of: ${validAppraisalTypes.join(', ')}`);
  }

  const validPropertyConditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Needs Renovation', 'New Construction'];
  if (inputs.propertyCondition && !validPropertyConditions.includes(inputs.propertyCondition)) {
    errors.push(`Property condition must be one of: ${validPropertyConditions.join(', ')}`);
  }

  const validZoningRestrictions = ['None', 'Minor', 'Moderate', 'Significant', 'Non-Conforming Use', 'Pending Zoning Change'];
  if (inputs.zoningRestrictions && !validZoningRestrictions.includes(inputs.zoningRestrictions)) {
    errors.push(`Zoning restrictions must be one of: ${validZoningRestrictions.join(', ')}`);
  }

  const validEnvironmentalIssues = ['None', 'Minor', 'Moderate', 'Significant', 'Unknown', 'Remediation Required'];
  if (inputs.environmentalIssues && !validEnvironmentalIssues.includes(inputs.environmentalIssues)) {
    errors.push(`Environmental issues must be one of: ${validEnvironmentalIssues.join(', ')}`);
  }

  const validTitleIssues = ['Clear Title', 'Minor Issues', 'Moderate Issues', 'Significant Issues', 'Clouded Title', 'Pending Resolution'];
  if (inputs.titleIssues && !validTitleIssues.includes(inputs.titleIssues)) {
    errors.push(`Title issues must be one of: ${validTitleIssues.join(', ')}`);
  }

  const validInsuranceRequirements = ['Standard', 'Flood Insurance Required', 'Earthquake Insurance Required', 'Wind Insurance Required', 'Additional Coverage Required', 'No Insurance Required'];
  if (inputs.insuranceRequired && !validInsuranceRequirements.includes(inputs.insuranceRequired)) {
    errors.push(`Insurance required must be one of: ${validInsuranceRequirements.join(', ')}`);
  }

  // Logical consistency validation
  if (inputs.propertyValue && inputs.loanAmount && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.propertyValue && inputs.downPayment && inputs.loanAmount) {
    const totalFinancing = inputs.loanAmount + inputs.downPayment;
    if (totalFinancing > inputs.propertyValue) {
      errors.push('Total financing (loan amount + down payment) cannot exceed property value');
    }
  }

  if (inputs.propertyValue && inputs.loanAmount) {
    const calculatedLtv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (calculatedLtv > 100) {
      errors.push('Calculated LTV ratio cannot exceed 100%');
    }
  }

  // Loan type specific validation
  if (inputs.loanType === 'FHA' && inputs.maxLtvRatio && inputs.maxLtvRatio > 96.5) {
    errors.push('FHA loans cannot exceed 96.5% LTV ratio');
  }

  if (inputs.loanType === 'VA' && inputs.maxLtvRatio && inputs.maxLtvRatio > 100) {
    errors.push('VA loans cannot exceed 100% LTV ratio');
  }

  if (inputs.loanType === 'USDA' && inputs.maxLtvRatio && inputs.maxLtvRatio > 100) {
    errors.push('USDA loans cannot exceed 100% LTV ratio');
  }

  if (inputs.loanType === 'Conventional' && inputs.maxLtvRatio && inputs.maxLtvRatio > 97) {
    errors.push('Conventional loans typically cannot exceed 97% LTV ratio');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateLoanToValueRatioInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 10000000) return 'Must be between $10,000 and $10,000,000';
      break;

    case 'loanAmount':
      if (!value) return 'Loan amount is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000 || value > 10000000) return 'Must be between $1,000 and $10,000,000';
      break;

    case 'downPayment':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'maxLtvRatio':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 50 || value > 100)) return 'Must be between 50% and 100%';
      break;

    case 'creditScore':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'debtToIncomeRatio':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100) return 'Must be 100% or less';
      break;

    case 'propertyAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 200) return 'Must be 200 years or less';
      break;

    case 'propertyType':
      if (value && !['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial', 'Investment', 'Vacation Home', 'Manufactured Home', 'Land', 'Mixed-Use'].includes(value)) {
        return 'Invalid property type';
      }
      break;

    case 'occupancyType':
      if (value && !['Primary Residence', 'Secondary Home', 'Investment Property', 'Vacation Rental', 'Commercial Use'].includes(value)) {
        return 'Invalid occupancy type';
      }
      break;

    case 'loanType':
      if (value && !['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Portfolio', 'Hard Money', 'Bridge Loan', 'Construction Loan', 'HELOC'].includes(value)) {
        return 'Invalid loan type';
      }
      break;

    case 'loanPurpose':
      if (value && !['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction', 'Renovation', 'Investment', 'Bridge Financing'].includes(value)) {
        return 'Invalid loan purpose';
      }
      break;

    case 'propertyLocation':
      if (value && !['Urban', 'Suburban', 'Rural', 'Downtown', 'Residential Area', 'Commercial District', 'Industrial Zone', 'Coastal', 'Mountain', 'Desert'].includes(value)) {
        return 'Invalid property location';
      }
      break;

    case 'marketCondition':
      if (value && !['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'].includes(value)) {
        return 'Invalid market condition';
      }
      break;

    case 'lenderType':
      if (value && !['Commercial Bank', 'Credit Union', 'Mortgage Banker', 'Mortgage Broker', 'Private Lender', 'Hard Money Lender', 'Government Agency', 'Regional Bank', 'National Bank', 'Online Lender'].includes(value)) {
        return 'Invalid lender type';
      }
      break;

    case 'appraisalType':
      if (value && !['Full Appraisal', 'Drive-By Appraisal', 'Desktop Appraisal', 'Automated Valuation Model (AVM)', 'Broker Price Opinion (BPO)', 'No Appraisal Required'].includes(value)) {
        return 'Invalid appraisal type';
      }
      break;

    case 'propertyCondition':
      if (value && !['Excellent', 'Good', 'Fair', 'Poor', 'Needs Renovation', 'New Construction'].includes(value)) {
        return 'Invalid property condition';
      }
      break;

    case 'zoningRestrictions':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Non-Conforming Use', 'Pending Zoning Change'].includes(value)) {
        return 'Invalid zoning restrictions';
      }
      break;

    case 'environmentalIssues':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Unknown', 'Remediation Required'].includes(value)) {
        return 'Invalid environmental issues';
      }
      break;

    case 'titleIssues':
      if (value && !['Clear Title', 'Minor Issues', 'Moderate Issues', 'Significant Issues', 'Clouded Title', 'Pending Resolution'].includes(value)) {
        return 'Invalid title issues';
      }
      break;

    case 'insuranceRequired':
      if (value && !['Standard', 'Flood Insurance Required', 'Earthquake Insurance Required', 'Wind Insurance Required', 'Additional Coverage Required', 'No Insurance Required'].includes(value)) {
        return 'Invalid insurance required';
      }
      break;
  }

  return null;
}
