import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

export function validateMortgageEquityInputs(): ValidationRule[] {
  return [
    ValidationRuleFactory.createRule(
      'homeValue',
      'Home value is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 10000 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'originalPurchasePrice',
      'Original purchase price is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 10000 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'purchaseDate',
      'Purchase date is required',
      (value: any, allInputs?: Record<string, any>) => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime()) && date <= new Date();
      }
    ),
    ValidationRuleFactory.createRule(
      'originalLoanAmount',
      'Original loan amount is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'currentLoanBalance',
      'Current loan balance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'interestRate',
      'Interest rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20
    ),
    ValidationRuleFactory.createRule(
      'loanTerm',
      'Loan term is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 50
    ),
    ValidationRuleFactory.createRule(
      'monthlyPayment',
      'Monthly payment is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'propertyTaxRate',
      'Property tax rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10
    ),
    ValidationRuleFactory.createRule(
      'homeownersInsuranceAnnual',
      'Annual homeowners insurance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000
    ),
    ValidationRuleFactory.createRule(
      'homeImprovements',
      'Home improvements amount is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000
    ),
    ValidationRuleFactory.createRule(
      'marketAppreciationRate',
      'Market appreciation rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= -20 && value <= 20
    ),
    ValidationRuleFactory.createRule(
      'closingCosts',
      'Closing costs are required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000
    ),
    ValidationRuleFactory.createRule(
      'downPayment',
      'Down payment is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'pmiMonthly',
      'Monthly PMI is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000
    ),
    ValidationRuleFactory.createRule(
      'helocBalance',
      'HELOC balance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000
    ),
    ValidationRuleFactory.createRule(
      'secondMortgageBalance',
      'Second mortgage balance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000
    ),
    ValidationRuleFactory.createRule(
      'otherLiens',
      'Other liens amount is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000
    ),
    ValidationRuleFactory.createRule(
      'rentalIncome',
      'Monthly rental income is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'rentalExpenses',
      'Monthly rental expenses are required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'refinanceHistory',
      'Refinance history is required',
      (value: any, allInputs?: Record<string, any>) => ['none', 'one', 'multiple'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'refinanceCosts',
      'Refinance costs are required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000
    ),
    ValidationRuleFactory.createRule(
      'propertyType',
      'Property type is required',
      (value: any, allInputs?: Record<string, any>) => ['single-family', 'condo', 'multi-family', 'investment'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'locationType',
      'Location type is required',
      (value: any, allInputs?: Record<string, any>) => ['urban', 'suburban', 'rural'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'propertyAge',
      'Property age is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 200
    ),
    ValidationRuleFactory.createRule(
      'squareFootage',
      'Square footage is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 100 && value <= 10000
    ),
    ValidationRuleFactory.createRule(
      'bedrooms',
      'Number of bedrooms is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20
    ),
    ValidationRuleFactory.createRule(
      'bathrooms',
      'Number of bathrooms is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20
    ),
    // Cross-field validations
    ValidationRuleFactory.createRule(
      'downPayment',
      'Down payment cannot exceed original purchase price',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.originalPurchasePrice) return true;
        return value <= allInputs?.originalPurchasePrice;
      }
    ),
    ValidationRuleFactory.createRule(
      'originalLoanAmount',
      'Original loan amount cannot exceed original purchase price',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.originalPurchasePrice) return true;
        return value <= allInputs?.originalPurchasePrice;
      }
    ),
    ValidationRuleFactory.createRule(
      'currentLoanBalance',
      'Current loan balance cannot exceed original loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.originalLoanAmount) return true;
        return value <= allInputs?.originalLoanAmount;
      }
    ),
    ValidationRuleFactory.createRule(
      'homeValue',
      'Home value should be reasonable compared to original purchase price',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.originalPurchasePrice) return true;
        const purchasePrice = allInputs?.originalPurchasePrice;
        const minReasonable = purchasePrice * 0.5; // Allow for 50% depreciation
        const maxReasonable = purchasePrice * 5; // Allow for 400% appreciation
        return value >= minReasonable && value <= maxReasonable;
      }
    )
  ];
}
