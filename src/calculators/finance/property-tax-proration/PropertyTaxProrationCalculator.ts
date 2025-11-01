import { Calculator } from '../../types/calculator';
import { calculatePropertyTaxProration } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const PropertyTaxProrationCalculator: Calculator = {
  id: 'PropertyTaxProration-calculator',
  title: 'Property Tax Proration Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate property tax proration for real estate transactions. Determine how property taxes are allocated between buyer and seller based on closing date.',
  usageInstructions: [
    'Enter the property tax amount and closing date',
    'Specify the tax year start and end dates',
    'Choose the proration method used in your area',
    'Calculate the buyer and seller portions'
  ],
  inputs: [
    // Property Tax Information
    { id: 'annualPropertyTax', label: 'Annual Property Tax', type: 'currency', required: true, placeholder: '5000', tooltip: 'Total annual property tax amount' },
    { id: 'taxYearStart', label: 'Tax Year Start Date', type: 'date', required: true, tooltip: 'Start date of the property tax year' },
    { id: 'taxYearEnd', label: 'Tax Year End Date', type: 'date', required: true, tooltip: 'End date of the property tax year' },

    // Transaction Information
    { id: 'closingDate', label: 'Closing Date', type: 'date', required: true, tooltip: 'Date when the property transaction closes' },
    { id: 'prorationMethod', label: 'Proration Method', type: 'select', required: true, options: [
      { value: '365-day', label: '365-Day Year' },
      { value: '366-day', label: '366-Day Year (Leap Year)' },
      { value: '360-day', label: '360-Day Year' },
      { value: 'actual-days', label: 'Actual Days in Period' }
    ], tooltip: 'Method used to calculate proration in your area' },

    // Additional Options
    { id: 'includeInterest', label: 'Include Interest/Penalties', type: 'boolean', required: false, tooltip: 'Include any interest or penalties in the calculation' },
    { id: 'interestAmount', label: 'Interest/Penalty Amount', type: 'currency', required: false, placeholder: '0', tooltip: 'Additional interest or penalty amount to prorate' },
    { id: 'buyerPaysClosingCosts', label: 'Buyer Pays All Closing Costs', type: 'boolean', required: false, tooltip: 'Whether buyer is responsible for all closing costs' }
  ],
  outputs: [
    { id: 'daysInTaxYear', label: 'Days in Tax Year', type: 'number', explanation: 'Total number of days in the property tax year' },
    { id: 'daysOwnedBySeller', label: 'Days Owned by Seller', type: 'number', explanation: 'Number of days the seller owned the property this tax year' },
    { id: 'daysOwnedByBuyer', label: 'Days Owned by Buyer', type: 'number', explanation: 'Number of days the buyer will own the property this tax year' },
    { id: 'sellerTaxPortion', label: 'Seller Tax Portion', type: 'currency', explanation: 'Amount of property tax the seller is responsible for' },
    { id: 'buyerTaxPortion', label: 'Buyer Tax Portion', type: 'currency', explanation: 'Amount of property tax the buyer is responsible for' },
    { id: 'dailyTaxRate', label: 'Daily Tax Rate', type: 'currency', explanation: 'Property tax amount per day' },
    { id: 'sellerInterestPortion', label: 'Seller Interest Portion', type: 'currency', explanation: 'Interest/penalties the seller is responsible for' },
    { id: 'buyerInterestPortion', label: 'Buyer Interest Portion', type: 'currency', explanation: 'Interest/penalties the buyer is responsible for' },
    { id: 'totalSellerResponsibility', label: 'Total Seller Responsibility', type: 'currency', explanation: 'Total amount the seller owes (tax + interest)' },
    { id: 'totalBuyerResponsibility', label: 'Total Buyer Responsibility', type: 'currency', explanation: 'Total amount the buyer owes (tax + interest)' },
    { id: 'prorationDate', label: 'Proration Date', type: 'text', explanation: 'Date used for proration calculation' },
    { id: 'adjustmentAmount', label: 'Adjustment Amount', type: 'currency', explanation: 'Amount to adjust at closing (positive = seller pays buyer, negative = buyer pays seller)' }
  ],
  formulas: [calculatePropertyTaxProration],
  validationRules: [
    ValidationRuleFactory.required('annualPropertyTax', 'Annual property tax is required'),
    ValidationRuleFactory.required('taxYearStart', 'Tax year start date is required'),
    ValidationRuleFactory.required('taxYearEnd', 'Tax year end date is required'),
    ValidationRuleFactory.required('closingDate', 'Closing date is required'),
    ValidationRuleFactory.required('prorationMethod', 'Proration method is required'),
    ValidationRuleFactory.range('annualPropertyTax', 0, 1000000, 'Annual property tax must be between $0 and $1,000,000'),
    ValidationRuleFactory.businessRule(
      'interestAmount',
      (interestAmount, allInputs) => {
        if (!allInputs?.includeInterest) return true;
        return interestAmount !== undefined && interestAmount >= 0;
      },
      'Interest amount must be provided and non-negative when including interest'
    ),
    ValidationRuleFactory.businessRule(
      'closingDate',
      (closingDate, allInputs) => {
        if (!allInputs?.taxYearStart || !allInputs?.taxYearEnd) return true;
        const closing = new Date(closingDate);
        const start = new Date(allInputs.taxYearStart);
        const end = new Date(allInputs.taxYearEnd);
        return closing >= start && closing <= end;
      },
      'Closing date must be within the tax year'
    ),
    ValidationRuleFactory.businessRule(
      'taxYearEnd',
      (taxYearEnd, allInputs) => {
        if (!allInputs?.taxYearStart) return true;
        const start = new Date(allInputs.taxYearStart);
        const end = new Date(taxYearEnd);
        return end > start;
      },
      'Tax year end must be after tax year start'
    )
  ],
  examples: [
    {
      title: 'Standard Property Sale',
      description: 'Mid-year property sale with standard proration',
      inputs: {
        annualPropertyTax: 4800,
        taxYearStart: '20240101',
        taxYearEnd: '20241231',
        closingDate: '20240615',
        prorationMethod: '365-day',
        includeInterest: false,
        interestAmount: 0,
        buyerPaysClosingCosts: false
      },
      expectedOutputs: {
        daysInTaxYear: 365,
        daysOwnedBySeller: 167,
        daysOwnedByBuyer: 198,
        sellerTaxPortion: 2193.15,
        buyerTaxPortion: 2606.85,
        dailyTaxRate: 13.15,
        sellerInterestPortion: 0,
        buyerInterestPortion: 0,
        totalSellerResponsibility: 2193.15,
        totalBuyerResponsibility: 2606.85,
        prorationDate: '20240615',
        adjustmentAmount: 2193.15
      }
    }
  ]
};