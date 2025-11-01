import { Calculator } from '../../types/calculator';
import { calculateReverseMortgage } from './formulas';
import { generateReverseMortgageAnalysis } from './formulas';

export const ReverseMortgageCalculator: Calculator = {
  id: 'ReverseMortgageCalculator',
  name: 'Reverse Mortgage Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate reverse mortgage payments, loan limits, and financial implications for seniors.',
  
  inputs: [
    // Borrower Information
    {
      id: 'borrowerAge',
      label: 'Youngest Borrower Age',
      type: 'number',
      unit: 'years',
      required: true,
      min: 62,
      max: 100,
      step: 1,
      placeholder: '65',
      description: 'Age of the youngest borrower (must be 62 or older)'
    },
    {
      id: 'spouseAge',
      label: 'Spouse Age (if applicable)',
      type: 'number',
      unit: 'years',
      required: false,
      min: 62,
      max: 100,
      step: 1,
      placeholder: '67',
      description: 'Age of spouse if they will be a co-borrower'
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      description: 'Current marital status'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      description: 'How the property will be occupied'
    },

    // Property Information
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      placeholder: '500000',
      description: 'Current market value of the property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-family', label: 'Single-Family Home' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'manufactured', label: 'Manufactured Home' },
        { value: 'multi-unit', label: 'Multi-Unit (2-4 units)' }
      ],
      description: 'Type of property being mortgaged'
    },
    {
      id: 'propertyAge',
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '25',
      description: 'Age of the property in years'
    },
    {
      id: 'location',
      label: 'Property Location',
      type: 'select',
      required: true,
      options: [
        { value: 'urban', label: 'Urban Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'rural', label: 'Rural Area' }
      ],
      description: 'Location classification of the property'
    },

    // Current Mortgage Information
    {
      id: 'existingMortgage',
      label: 'Existing Mortgage Balance',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 5000000,
      step: 1000,
      placeholder: '0',
      description: 'Current mortgage balance (if any)'
    },
    {
      id: 'existingPayment',
      label: 'Existing Monthly Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0',
      description: 'Current monthly mortgage payment'
    },
    {
      id: 'otherLiens',
      label: 'Other Liens/Encumbrances',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0',
      description: 'Other liens or encumbrances on the property'
    },

    // Loan Terms
    {
      id: 'loanType',
      label: 'Reverse Mortgage Type',
      type: 'select',
      required: true,
      options: [
        { value: 'hecm', label: 'HECM (Home Equity Conversion Mortgage)' },
        { value: 'proprietary', label: 'Proprietary Reverse Mortgage' },
        { value: 'single-purpose', label: 'Single-Purpose Reverse Mortgage' }
      ],
      description: 'Type of reverse mortgage product'
    },
    {
      id: 'paymentOption',
      label: 'Payment Option',
      type: 'select',
      required: true,
      options: [
        { value: 'tenure', label: 'Tenure (Lifetime)' },
        { value: 'term', label: 'Term (Fixed Period)' },
        { value: 'LineOfCredit', label: 'Line of Credit' },
        { value: 'modified-tenure', label: 'Modified Tenure' },
        { value: 'modified-term', label: 'Modified Term' }
      ],
      description: 'How you want to receive the loan proceeds'
    },
    {
      id: 'termYears',
      label: 'Term Length (if applicable)',
      type: 'number',
      unit: 'years',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10',
      description: 'Fixed term length for term or modified term options'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      min: 1,
      max: 15,
      step: 0.125,
      placeholder: '6.5',
      description: 'Annual interest rate on the reverse mortgage'
    },
    {
      id: 'rateType',
      label: 'Rate Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Rate' },
        { value: 'adjustable', label: 'Adjustable Rate' }
      ],
      description: 'Whether the interest rate is fixed or adjustable'
    },

    // Financial Information
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Total monthly income from all sources'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '2500',
      description: 'Total monthly living expenses'
    },
    {
      id: 'savings',
      label: 'Total Savings/Investments',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      description: 'Total savings and investment accounts'
    },
    {
      id: 'otherAssets',
      label: 'Other Assets',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      description: 'Value of other assets (vehicles, etc.)'
    },

    // Costs and Fees
    {
      id: 'originationFee',
      label: 'Origination Fee',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2500',
      description: 'Loan origination fee (if known)'
    },
    {
      id: 'mortgageInsurance',
      label: 'Mortgage Insurance Premium',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '5000',
      description: 'Upfront mortgage insurance premium'
    },
    {
      id: 'closingCosts',
      label: 'Other Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '3000',
      description: 'Other closing costs (appraisal, title, etc.)'
    },

    // Analysis Options
    {
      id: 'analysisPeriod',
      label: 'Analysis Period',
      type: 'number',
      unit: 'years',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '15',
      description: 'Period for financial analysis (default: 15 years)'
    },
    {
      id: 'propertyAppreciation',
      label: 'Annual Property Appreciation',
      type: 'number',
      unit: '%',
      required: false,
      min: -10,
      max: 15,
      step: 0.5,
      placeholder: '3.0',
      description: 'Expected annual property value appreciation rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    }
  ],

  outputs: [
    {
      id: 'principalLimit',
      label: 'Principal Limit',
      type: 'number',
      unit: 'USD',
      description: 'Maximum amount available from the reverse mortgage'
    },
    {
      id: 'availableProceeds',
      label: 'Available Proceeds',
      type: 'number',
      unit: 'USD',
      description: 'Net proceeds available after paying off existing liens'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly payment amount (for tenure/term options)'
    },
    {
      id: 'lineOfCredit',
      label: 'Line of Credit',
      type: 'number',
      unit: 'USD',
      description: 'Available line of credit (for LOC options)'
    },
    {
      id: 'totalCosts',
      label: 'Total Closing Costs',
      type: 'number',
      unit: 'USD',
      description: 'Total upfront costs including fees and insurance'
    },
    {
      id: 'loanBalance',
      label: 'Projected Loan Balance',
      type: 'number',
      unit: 'USD',
      description: 'Projected loan balance at end of analysis period'
    },
    {
      id: 'homeEquity',
      label: 'Remaining Home Equity',
      type: 'number',
      unit: 'USD',
      description: 'Estimated remaining equity after reverse mortgage'
    },
    {
      id: 'debtToEquity',
      label: 'DebtToEquity Ratio',
      type: 'number',
      unit: '%',
      description: 'Ratio of loan balance to property value'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      unit: 'years',
      description: 'Years until costs are recovered through payments'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments Received',
      type: 'number',
      unit: 'USD',
      description: 'Total payments received over analysis period'
    },
    {
      id: 'netBenefit',
      label: 'Net Financial Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Net benefit after accounting for costs and interest'
    },
    {
      id: 'affordabilityScore',
      label: 'Affordability Score',
      type: 'number',
      unit: '0-100',
      description: 'Score indicating how affordable the reverse mortgage is'
    },
    {
      id: 'suitabilityScore',
      label: 'Suitability Score',
      type: 'number',
      unit: '0-100',
      description: 'Score indicating suitability for reverse mortgage'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      unit: '0-100',
      description: 'Risk assessment score for the reverse mortgage'
    },
    {
      id: 'valueScore',
      label: 'Value Score',
      type: 'number',
      unit: '0-100',
      description: 'Overall value assessment of the reverse mortgage'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'array',
      description: 'Detailed payment schedule over the analysis period'
    },
    {
      id: 'equityProjection',
      label: 'Equity Projection',
      type: 'array',
      description: 'Projected equity changes over time'
    },
    {
      id: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'object',
      description: 'Detailed breakdown of all costs and fees'
    },
    {
      id: 'benefitAnalysis',
      label: 'Benefit Analysis',
      type: 'object',
      description: 'Analysis of financial benefits and trade-offs'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      description: 'Professional recommendations based on analysis'
    }
  ],

  calculate: calculateReverseMortgage,
  generateReport: generateReverseMortgageAnalysis
};
