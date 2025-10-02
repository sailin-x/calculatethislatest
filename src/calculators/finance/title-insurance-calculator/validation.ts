import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Title insurance validation rules
 */
export const titleInsuranceValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyValue', 'Property value is required'),
  ValidationRuleFactory.required('purchasePrice', 'Purchase price is required'),
  ValidationRuleFactory.required('settlementDate', 'Settlement date is required'),

  // Property and financial validations
  ValidationRuleFactory.range('propertyValue', 10000, 100000000, 'Property value must be between $10,000 and $100,000,000'),
  ValidationRuleFactory.range('purchasePrice', 10000, 100000000, 'Purchase price must be between $10,000 and $100,000,000'),
  ValidationRuleFactory.range('loanAmount', 0, 100000000, 'Loan amount must be between $0 and $100,000,000'),

  // Title insurance rate validations
  ValidationRuleFactory.range('ownersTitleInsuranceRate', 0, 5, 'Owner\'s title insurance rate must be between 0% and 5%'),
  ValidationRuleFactory.range('lendersTitleInsuranceRate', 0, 2, 'Lender\'s title insurance rate must be between 0% and 2%'),

  // Fee validations
  ValidationRuleFactory.range('titleSearchFee', 0, 2000, 'Title search fee must be between $0 and $2,000'),
  ValidationRuleFactory.range('titleExaminationFee', 0, 1500, 'Title examination fee must be between $0 and $1,500'),
  ValidationRuleFactory.range('documentPreparationFee', 0, 1000, 'Document preparation fee must be between $0 and $1,000'),
  ValidationRuleFactory.range('notaryFee', 0, 500, 'Notary fee must be between $0 and $500'),
  ValidationRuleFactory.range('recordingFee', 0, 2000, 'Recording fee must be between $0 and $2,000'),

  // Tax and rate validations
  ValidationRuleFactory.range('transferTaxRate', 0, 5, 'Transfer tax rate must be between 0% and 5%'),

  // Additional cost validations
  ValidationRuleFactory.businessRule(
    'endorsementCost',
    (endorsementCost, allInputs) => {
      if (!allInputs?.includeEndorsements) return true;
      return endorsementCost >= 0 && endorsementCost <= 5000;
    },
    'Endorsement cost must be between $0 and $5,000 when endorsements are included'
  ),

  ValidationRuleFactory.businessRule(
    'curativeCost',
    (curativeCost, allInputs) => {
      if (!allInputs?.includeTitleCurative) return true;
      return curativeCost >= 0 && curativeCost <= 10000;
    },
    'Curative cost must be between $0 and $10,000 when title curative is included'
  ),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'loanAmount',
    (loanAmount, allInputs) => {
      if (!allInputs?.purchasePrice) return true;
      return loanAmount <= allInputs.purchasePrice;
    },
    'Loan amount cannot exceed purchase price'
  ),

  ValidationRuleFactory.businessRule(
    'purchasePrice',
    (purchasePrice, allInputs) => {
      if (!allInputs?.propertyValue) return true;
      // Purchase price should be reasonable relative to property value
      const ratio = purchasePrice / allInputs.propertyValue;
      return ratio >= 0.5 && ratio <= 2.0;
    },
    'Purchase price seems unreasonable relative to property value'
  ),

  ValidationRuleFactory.businessRule(
    'ownersTitleInsuranceRate',
    (ownersTitleInsuranceRate, allInputs) => {
      // Typical owner's title insurance rates
      return ownersTitleInsuranceRate >= 0.1 && ownersTitleInsuranceRate <= 1.0;
    },
    'Owner\'s title insurance rate seems outside typical range (0.1% to 1.0%)'
  ),

  ValidationRuleFactory.businessRule(
    'lendersTitleInsuranceRate',
    (lendersTitleInsuranceRate, allInputs) => {
      if (!allInputs?.isCashPurchase && allInputs?.loanAmount > 0) {
        // Typical lender's title insurance rates
        return lendersTitleInsuranceRate >= 0.1 && lendersTitleInsuranceRate <= 0.8;
      }
      return true;
    },
    'Lender\'s title insurance rate seems outside typical range (0.1% to 0.8%)'
  ),

  ValidationRuleFactory.businessRule(
    'transferTaxRate',
    (transferTaxRate, allInputs) => {
      // Transfer tax rates vary by location
      return transferTaxRate >= 0 && transferTaxRate <= 3.0;
    },
    'Transfer tax rate seems outside typical range (0% to 3.0%)'
  ),

  ValidationRuleFactory.businessRule(
    'recordingFee',
    (recordingFee, allInputs) => {
      if (!allInputs?.propertyValue) return true;
      // Recording fee should be reasonable relative to property value
      const feeRatio = recordingFee / allInputs.propertyValue;
      return feeRatio <= 0.01; // Max 1% of property value
    },
    'Recording fee seems unreasonably high relative to property value'
  ),

  ValidationRuleFactory.businessRule(
    'settlementDate',
    (settlementDate) => {
      const date = new Date(settlementDate);
      const today = new Date();
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(today.getFullYear() + 1);

      return date >= today && date <= oneYearFromNow;
    },
    'Settlement date should be between today and one year from now'
  ),

  // Transaction type validations
  ValidationRuleFactory.businessRule(
    'isRefinance',
    (isRefinance, allInputs) => {
      if (isRefinance && allInputs?.isCashPurchase) {
        return false;
      }
      return true;
    },
    'Cannot be both refinance and cash purchase'
  ),

  ValidationRuleFactory.businessRule(
    'loanAmount',
    (loanAmount, allInputs) => {
      if (allInputs?.isCashPurchase && loanAmount > 0) {
        return false;
      }
      return true;
    },
    'Loan amount should be $0 for cash purchases'
  )
];

/**
 * Get validation rules for title insurance calculator
 */
export function getTitleInsuranceValidationRules(): ValidationRule[] {
  return titleInsuranceValidationRules;
}