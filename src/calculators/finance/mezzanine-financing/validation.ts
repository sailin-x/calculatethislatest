import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

export const validateMezzanineFinancingInputs = (inputs: Record<string, any>): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  // Project Value validation
  rules.push(
    ValidationRuleFactory.createRule(
      'projectValue',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 100000 && value <= 1000000000,
      'Project value must be between $100,000 and $1,000,000,000',
      inputs
    )
  );

  // Senior Loan Amount validation
  rules.push(
    ValidationRuleFactory.createRule(
      'seniorLoanAmount',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return inputs.projectValue ? value <= inputs.projectValue : true;
      },
      'Senior loan amount must be a valid number and cannot exceed project value',
      inputs
    )
  );

  // Mezzanine Loan Amount validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineLoanAmount',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return inputs.projectValue ? value <= inputs.projectValue : true;
      },
      'Mezzanine loan amount must be a valid number and cannot exceed project value',
      inputs
    )
  );

  // Equity Contribution validation
  rules.push(
    ValidationRuleFactory.createRule(
      'equityContribution',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0,
      'Equity contribution must be a valid non-negative number',
      inputs
    )
  );

  // Senior Loan Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'seniorLoanRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20,
      'Senior loan rate must be between 0% and 20%',
      inputs
    )
  );

  // Mezzanine Loan Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineLoanRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 30,
      'Mezzanine loan rate must be between 0% and 30%',
      inputs
    )
  );

  // Senior Loan Term validation
  rules.push(
    ValidationRuleFactory.createRule(
      'seniorLoanTerm',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 50,
      'Senior loan term must be between 1 and 50 years',
      inputs
    )
  );

  // Mezzanine Loan Term validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineLoanTerm',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 20,
      'Mezzanine loan term must be between 1 and 20 years',
      inputs
    )
  );

  // Project Timeline validation
  rules.push(
    ValidationRuleFactory.createRule(
      'projectTimeline',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 6 && value <= 60,
      'Project timeline must be between 6 and 60 months',
      inputs
    )
  );

  // Expected Exit Value validation
  rules.push(
    ValidationRuleFactory.createRule(
      'expectedExitValue',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0,
      'Expected exit value must be a valid non-negative number',
      inputs
    )
  );

  // Exit Timeline validation
  rules.push(
    ValidationRuleFactory.createRule(
      'exitTimeline',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 12 && value <= 120,
      'Exit timeline must be between 12 and 120 months',
      inputs
    )
  );

  // Mezzanine Fees validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineFees',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000,
      'Mezzanine fees must be between $0 and $1,000,000',
      inputs
    )
  );

  // Mezzanine Equity Kicker validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineEquityKicker',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50,
      'Mezzanine equity kicker must be between 0% and 50%',
      inputs
    )
  );

  // Operating Expenses validation
  rules.push(
    ValidationRuleFactory.createRule(
      'operatingExpenses',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000,
      'Operating expenses must be between $0 and $10,000,000',
      inputs
    )
  );

  // Vacancy Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'vacancyRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50,
      'Vacancy rate must be between 0% and 50%',
      inputs
    )
  );

  // Property Tax Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'propertyTaxRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
      'Property tax rate must be between 0% and 10%',
      inputs
    )
  );

  // Insurance Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'insuranceRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5,
      'Insurance rate must be between 0% and 5%',
      inputs
    )
  );

  // Management Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'managementFee',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 15,
      'Management fee must be between 0% and 15%',
      inputs
    )
  );

  // Mezzanine LTV validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineLTV',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100,
      'Mezzanine LTV must be between 0% and 100%',
      inputs
    )
  );

  // Senior LTV validation
  rules.push(
    ValidationRuleFactory.createRule(
      'seniorLTV',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100,
      'Senior LTV must be between 0% and 100%',
      inputs
    )
  );

  // Mezzanine DSCR validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineDSCR',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 3,
      'Mezzanine DSCR must be between 1.0 and 3.0',
      inputs
    )
  );

  // Senior DSCR validation
  rules.push(
    ValidationRuleFactory.createRule(
      'seniorDSCR',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 3,
      'Senior DSCR must be between 1.0 and 3.0',
      inputs
    )
  );

  // Mezzanine Prepayment Penalty validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzaninePrepaymentPenalty',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
      'Mezzanine prepayment penalty must be between 0% and 10%',
      inputs
    )
  );

  // Mezzanine Origination Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineOriginationFee',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10,
      'Mezzanine origination fee must be between 0% and 10%',
      inputs
    )
  );

  // Mezzanine Exit Fee validation
  rules.push(
    ValidationRuleFactory.createRule(
      'mezzanineExitFee',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5,
      'Mezzanine exit fee must be between 0% and 5%',
      inputs
    )
  );

  // Cross-field validations
  rules.push(
    ValidationRuleFactory.createRule(
      'crossFieldValidation',
      () => {
        // Validate total debt doesn't exceed project value
        if (inputs.seniorLoanAmount && inputs.mezzanineLoanAmount && inputs.projectValue) {
          const totalDebt = inputs.seniorLoanAmount + inputs.mezzanineLoanAmount;
          if (totalDebt > inputs.projectValue) {
            return false;
          }
        }

        // Validate total capitalization
        if (inputs.seniorLoanAmount && inputs.mezzanineLoanAmount && inputs.equityContribution) {
          const totalCap = inputs.seniorLoanAmount + inputs.mezzanineLoanAmount + inputs.equityContribution;
          if (totalCap <= 0) {
            return false;
          }
        }

        // Validate mezzanine rate is higher than senior rate
        if (inputs.mezzanineLoanRate && inputs.seniorLoanRate) {
          if (inputs.mezzanineLoanRate <= inputs.seniorLoanRate) {
            return false;
          }
        }

        // Validate mezzanine term is shorter than senior term
        if (inputs.mezzanineLoanTerm && inputs.seniorLoanTerm) {
          if (inputs.mezzanineLoanTerm >= inputs.seniorLoanTerm) {
            return false;
          }
        }

        return true;
      },
      'Cross-field validation failed. Please check debt amounts, rates, and terms.',
      inputs
    )
  );

  return rules;
};
