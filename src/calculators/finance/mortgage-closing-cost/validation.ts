import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

export const validateMortgageClosingCostInputs = (inputs: Record<string, any>): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  // Loan Amount validation
  rules.push(
    ValidationRuleFactory.createRule(
      'loanAmount',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 10000 && value <= 10000000,
      'Loan amount must be between $10,000 and $10,000,000',
      inputs
    )
  );

  // Home Price validation
  rules.push(
    ValidationRuleFactory.createRule(
      'homePrice',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 10000 && value <= 10000000,
      'Home price must be between $10,000 and $10,000,000',
      inputs
    )
  );

  // Down Payment validation
  rules.push(
    ValidationRuleFactory.createRule(
      'downPayment',
      (value: any, allInputs?: Record<string, any>) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return allInputs?.homePrice ? value <= allInputs.homePrice : true;
      },
      'Down payment must be a valid number and cannot exceed home price',
      inputs
    )
  );

  // Interest Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'interestRate',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20,
      'Interest rate must be between 0% and 20%',
      inputs
    )
  );

  // Loan Term validation
  rules.push(
    ValidationRuleFactory.createRule(
      'loanTerm',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 50,
      'Loan term must be between 1 and 50 years',
      inputs
    )
  );

  // Origination Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'originationFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000,
      'Origination fee must be between $0 and $100,000',
      inputs
    )
  );

  // Discount Points validation
  rules.push(
    ValidationRuleFactory.createRule(
      'discountPoints',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
      'Discount points must be between 0 and 10',
      inputs
    )
  );

  // Appraisal Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'appraisalFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
      'Appraisal fee must be between $0 and $10,000',
      inputs
    )
  );

  // Credit Report Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'creditReportFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000,
      'Credit report fee must be between $0 and $1,000',
      inputs
    )
  );

  // Flood Certification Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'floodCertificationFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 500,
      'Flood certification fee must be between $0 and $500',
      inputs
    )
  );

  // Tax Service Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'taxServiceFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000,
      'Tax service fee must be between $0 and $1,000',
      inputs
    )
  );

  // Processing Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'processingFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
      'Processing fee must be between $0 and $5,000',
      inputs
    )
  );

  // Underwriting Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'underwritingFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
      'Underwriting fee must be between $0 and $5,000',
      inputs
    )
  );

  // Document Preparation Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'documentPreparationFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 2000,
      'Document preparation fee must be between $0 and $2,000',
      inputs
    )
  );

  // Title Insurance validation
  rules.push(
    ValidationRuleFactory.createRule(
      'titleInsurance',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000,
      'Title insurance must be between $0 and $50,000',
      inputs
    )
  );

  // Title Search Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'titleSearchFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 2000,
      'Title search fee must be between $0 and $2,000',
      inputs
    )
  );

  // Title Endorsements validation
  rules.push(
    ValidationRuleFactory.createRule(
      'titleEndorsements',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
      'Title endorsements must be between $0 and $5,000',
      inputs
    )
  );

  // Escrow Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'escrowFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
      'Escrow fee must be between $0 and $10,000',
      inputs
    )
  );

  // Attorney Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'attorneyFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
      'Attorney fee must be between $0 and $5,000',
      inputs
    )
  );

  // Survey Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'surveyFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 2000,
      'Survey fee must be between $0 and $2,000',
      inputs
    )
  );

  // Pest Inspection Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'pestInspectionFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 500,
      'Pest inspection fee must be between $0 and $500',
      inputs
    )
  );

  // Home Inspection Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'homeInspectionFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000,
      'Home inspection fee must be between $0 and $1,000',
      inputs
    )
  );

  // Recording Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'recordingFee',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 500,
      'Recording fee must be between $0 and $500',
      inputs
    )
  );

  // Transfer Tax validation
  rules.push(
    ValidationRuleFactory.createRule(
      'transferTax',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000,
      'Transfer tax must be between $0 and $50,000',
      inputs
    )
  );

  // Property Tax Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'propertyTaxRate',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
      'Property tax rate must be between 0% and 10%',
      inputs
    )
  );

  // Property Tax Months validation
  rules.push(
    ValidationRuleFactory.createRule(
      'propertyTaxMonths',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 12,
      'Property tax months must be between 0 and 12',
      inputs
    )
  );

  // Homeowners Insurance Annual validation
  rules.push(
    ValidationRuleFactory.createRule(
      'homeownersInsuranceAnnual',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
      'Homeowners insurance annual must be between $0 and $10,000',
      inputs
    )
  );

  // Insurance Months validation
  rules.push(
    ValidationRuleFactory.createRule(
      'insuranceMonths',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 12,
      'Insurance months must be between 0 and 12',
      inputs
    )
  );

  // Mortgage Insurance Type validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mortgageInsuranceType',
      (value: any, allInputs?: Record<string, any>) => {
        if (!value || typeof value !== 'string') {
          return false;
        }
        const validTypes = ['none', 'pmi', 'mip', 'usda', 'va'];
        return validTypes.includes(value);
      },
      'Invalid mortgage insurance type',
      inputs
    )
  );

  // Mortgage Insurance Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mortgageInsuranceRate',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5,
      'Mortgage insurance rate must be between 0% and 5%',
      inputs
    )
  );

  // Lender Credits validation
  rules.push(
    ValidationRuleFactory.createRule(
      'lenderCredits',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= -50000 && value <= 50000,
      'Lender credits must be between -$50,000 and $50,000',
      inputs
    )
  );

  // Seller Credits validation
  rules.push(
    ValidationRuleFactory.createRule(
      'sellerCredits',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000,
      'Seller credits must be between $0 and $100,000',
      inputs
    )
  );

  // Closing Date validation
  rules.push(
    ValidationRuleFactory.createRule(
      'closingDate',
      (value: any, allInputs?: Record<string, any>) => {
        if (!value || typeof value !== 'string') {
          return false;
        }
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      'Invalid closing date format',
      inputs
    )
  );

  // First Payment Date validation
  rules.push(
    ValidationRuleFactory.createRule(
      'firstPaymentDate',
      (value: any, allInputs?: Record<string, any>) => {
        if (!value || typeof value !== 'string') {
          return false;
        }
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return false;
        }
        if (allInputs?.closingDate) {
          const closingDate = new Date(allInputs.closingDate);
          return date > closingDate;
        }
        return true;
      },
      'First payment date must be after closing date',
      inputs
    )
  );

  // Cross-field validations
  rules.push(
    ValidationRuleFactory.createRule(
      'crossFieldValidation',
      (value: any, allInputs?: Record<string, any>) => {
        // Validate loan amount doesn't exceed home price
        if (allInputs?.loanAmount && allInputs?.homePrice) {
          if (allInputs.loanAmount > allInputs.homePrice) {
            return false;
          }
        }

        // Validate down payment + loan amount = home price (approximately)
        if (allInputs?.downPayment && allInputs?.loanAmount && allInputs?.homePrice) {
          const total = allInputs.downPayment + allInputs.loanAmount;
          const difference = Math.abs(total - allInputs.homePrice);
          if (difference > allInputs.homePrice * 0.01) { // Allow 1% difference
            return false;
          }
        }

        // Validate closing date is in the future
        if (allInputs?.closingDate) {
          const closingDate = new Date(allInputs.closingDate);
          const today = new Date();
          if (closingDate <= today) {
            return false;
          }
        }

        // Validate first payment date is after closing date
        if (allInputs?.closingDate && allInputs?.firstPaymentDate) {
          const closingDate = new Date(allInputs.closingDate);
          const firstPaymentDate = new Date(allInputs.firstPaymentDate);
          if (firstPaymentDate <= closingDate) {
            return false;
          }
        }

        return true;
      },
      'Cross-field validation failed. Please check loan amounts, dates, and payment relationships.',
      inputs
    )
  );

  return rules;
};
