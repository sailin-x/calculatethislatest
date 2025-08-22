import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

export const validateMortgageAPRComparisonInputs = (inputs: Record<string, any>): ValidationRule[] => {
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

  // Loan Term validation
  rules.push(
    ValidationRuleFactory.createRule(
      'loanTerm',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 50,
      'Loan term must be between 1 and 50 years',
      inputs
    )
  );

  // Interest Rate validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `interestRate${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20,
        `Interest rate ${i} must be between 0% and 20%`,
        inputs
      )
    );
  }

  // Origination Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `originationFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000,
        `Origination fee ${i} must be between $0 and $100,000`,
        inputs
      )
    );
  }

  // Discount Points validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `discountPoints${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
        `Discount points ${i} must be between 0 and 10`,
        inputs
      )
    );
  }

  // Appraisal Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `appraisalFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
        `Appraisal fee ${i} must be between $0 and $10,000`,
        inputs
      )
    );
  }

  // Title Insurance validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `titleInsurance${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000,
        `Title insurance ${i} must be between $0 and $50,000`,
        inputs
      )
    );
  }

  // Escrow Fees validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `escrowFees${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
        `Escrow fees ${i} must be between $0 and $10,000`,
        inputs
      )
    );
  }

  // Credit Report Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `creditReportFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000,
        `Credit report fee ${i} must be between $0 and $1,000`,
        inputs
      )
    );
  }

  // Processing Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `processingFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
        `Processing fee ${i} must be between $0 and $5,000`,
        inputs
      )
    );
  }

  // Underwriting Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `underwritingFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5000,
        `Underwriting fee ${i} must be between $0 and $5,000`,
        inputs
      )
    );
  }

  // Document Preparation Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `documentPreparationFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 2000,
        `Document preparation fee ${i} must be between $0 and $2,000`,
        inputs
      )
    );
  }

  // Flood Certification Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `floodCertificationFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 500,
        `Flood certification fee ${i} must be between $0 and $500`,
        inputs
      )
    );
  }

  // Tax Service Fee validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `taxServiceFee${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000,
        `Tax service fee ${i} must be between $0 and $1,000`,
        inputs
      )
    );
  }

  // Prepaid Interest validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `prepaidInterest${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
        `Prepaid interest ${i} must be between $0 and $10,000`,
        inputs
      )
    );
  }

  // Prepaid Insurance validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `prepaidInsurance${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
        `Prepaid insurance ${i} must be between $0 and $10,000`,
        inputs
      )
    );
  }

  // Prepaid Taxes validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `prepaidTaxes${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20000,
        `Prepaid taxes ${i} must be between $0 and $20,000`,
        inputs
      )
    );
  }

  // Lender Credits validations for all 3 offers
  for (let i = 1; i <= 3; i++) {
    rules.push(
      ValidationRuleFactory.createRule(
        `lenderCredits${i}`,
        (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= -50000 && value <= 50000,
        `Lender credits ${i} must be between -$50,000 and $50,000`,
        inputs
      )
    );
  }

  // Cross-field validations
  rules.push(
    ValidationRuleFactory.createRule(
      'crossFieldValidation',
      (value: any, allInputs?: Record<string, any>) => {
        // Validate that at least one offer has reasonable terms
        const hasValidOffer = [1, 2, 3].some(i => {
          const rate = allInputs?.[`interestRate${i}`];
          const fees = allInputs?.[`originationFee${i}`];
          return rate && rate > 0 && rate < 20 && fees >= 0;
        });
        
        if (!hasValidOffer) {
          return false;
        }

        // Validate that loan amount is reasonable for the term
        const loanAmount = allInputs?.loanAmount;
        const loanTerm = allInputs?.loanTerm;
        
        if (loanAmount && loanTerm) {
          if (loanAmount > 5000000 && loanTerm > 30) {
            return false; // Very large loans typically have shorter terms
          }
        }

        return true;
      },
      'Please ensure at least one offer has valid terms and loan parameters are reasonable',
      inputs
    )
  );

  return rules;
};
