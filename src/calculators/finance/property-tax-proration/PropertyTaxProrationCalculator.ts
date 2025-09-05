import { Calculator } from '../../types';
import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs } from './types';
import { calculatePropertyTaxProration } from './formulas';
import { validatePropertyTaxProrationInputs, getValidationErrors } from './validation';

export const propertyTaxProrationCalculator: Calculator<PropertyTaxProrationInputs, PropertyTaxProrationOutputs> = {
  name: 'Property Tax Proration Calculator',
  description: 'Calculate property tax proration for real estate transactions based on closing date',
  category: 'Finance',
  tags: ['property', 'tax', 'proration', 'real estate', 'closing', 'settlement'],
  inputs: [
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      placeholder: 'Enter annual property tax',
      required: true,
      description: 'Total annual property tax amount'
    },
    {
      id: 'closingDate',
      label: 'Closing Date',
      type: 'date',
      placeholder: 'Select closing date',
      required: true,
      description: 'Date of property closing/transfer'
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      placeholder: 'Enter tax year',
      required: true,
      description: 'Tax year for the property taxes'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'select',
      placeholder: 'Select payment schedule',
      required: true,
      description: 'How often property taxes are paid',
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ]
    },
    {
      id: 'sellerPaidMonths',
      label: 'Seller Paid Months',
      type: 'number',
      placeholder: 'Enter months seller paid',
      required: false,
      description: 'Number of months seller has already paid taxes for'
    },
    {
      id: 'buyerPaidMonths',
      label: 'Buyer Paid Months',
      type: 'number',
      placeholder: 'Enter months buyer paid',
      required: false,
      description: 'Number of months buyer has already paid taxes for'
    },
    {
      id: 'prorationMethod',
      label: 'Proration Method',
      type: 'select',
      placeholder: 'Select proration method',
      required: true,
      description: 'Method used to calculate daily proration',
      options: [
        { value: '365-day', label: '365-Day Method' },
        { value: '360-day', label: '360-Day Method' },
        { value: 'actual-days', label: 'Actual Days Method' }
      ]
    },
    {
      id: 'sellerCredits',
      label: 'Seller Credits',
      type: 'currency',
      placeholder: 'Enter seller credits',
      required: false,
      description: 'Additional credits to seller (negative for debits)'
    },
    {
      id: 'buyerCredits',
      label: 'Buyer Credits',
      type: 'currency',
      placeholder: 'Enter buyer credits',
      required: false,
      description: 'Additional credits to buyer (negative for debits)'
    },
    {
      id: 'specialAssessments',
      label: 'Special Assessments',
      type: 'currency',
      placeholder: 'Enter special assessments',
      required: false,
      description: 'Special assessments or district taxes'
    }
  ],
  outputs: [
    {
      id: 'totalDaysInYear',
      label: 'Total Days in Year',
      type: 'number',
      description: 'Total days in the tax year based on proration method'
    },
    {
      id: 'daysFromStartOfYear',
      label: 'Days from Start of Year',
      type: 'number',
      description: 'Days from start of year to closing date'
    },
    {
      id: 'daysRemainingInYear',
      label: 'Days Remaining in Year',
      type: 'number',
      description: 'Days remaining in year after closing date'
    },
    {
      id: 'sellerProration',
      label: 'Seller Proration',
      type: 'currency',
      description: 'Amount seller owes or is owed'
    },
    {
      id: 'buyerProration',
      label: 'Buyer Proration',
      type: 'currency',
      description: 'Amount buyer owes or is owed'
    },
    {
      id: 'netProration',
      label: 'Net Proration',
      type: 'currency',
      description: 'Net amount to be transferred at closing'
    },
    {
      id: 'sellerOwes',
      label: 'Seller Owes',
      type: 'currency',
      description: 'Amount seller must pay at closing'
    },
    {
      id: 'buyerOwes',
      label: 'Buyer Owes',
      type: 'currency',
      description: 'Amount buyer must pay at closing'
    }
  ],
  calculate: (inputs: PropertyTaxProrationInputs): PropertyTaxProrationOutputs => {
    const validation = validatePropertyTaxProrationInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculatePropertyTaxProration(inputs);
  },
  validate: validatePropertyTaxProrationInputs
};