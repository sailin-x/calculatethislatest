import { Calculator } from '../../../types/calculator';
import { calculateVALoan } from './formulas';
import { generateVALoanAnalysis } from './formulas';

export const VALoanCalculator: Calculator = {
  id: 'va-loan-calculator',
  name: 'VA Loan Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate VA loan payments, funding fees, and eligibility for veterans and service members.',
  
  inputs: [
    // Veteran Information
    {
      id: 'veteranStatus',
      label: 'Veteran Status',
      type: 'select',
      required: true,
      options: [
        { value: 'veteran', label: 'Veteran' },
        { value: 'active-duty', label: 'Active Duty Service Member' },
        { value: 'reserves', label: 'Reserves/National Guard' },
        { value: 'surviving-spouse', label: 'Surviving Spouse' }
      ],
      description: 'Current military status'
    },
    {
      id: 'serviceBranch',
      label: 'Service Branch',
      type: 'select',
      required: false,
      options: [
        { value: 'army', label: 'Army' },
        { value: 'navy', label: 'Navy' },
        { value: 'air-force', label: 'Air Force' },
        { value: 'marine-corps', label: 'Marine Corps' },
        { value: 'coast-guard', label: 'Coast Guard' },
        { value: 'space-force', label: 'Space Force' }
      ],
      description: 'Branch of military service'
    },
    {
      id: 'serviceLength',
      label: 'Length of Service',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 30,
      step: 0.5,
      placeholder: '4',
      description: 'Years of military service'
    },
    {
      id: 'dischargeType',
      label: 'Discharge Type',
      type: 'select',
      required: false,
      options: [
        { value: 'honorable', label: 'Honorable' },
        { value: 'general', label: 'General' },
        { value: 'other-than-honorable', label: 'Other Than Honorable' },
        { value: 'bad-conduct', label: 'Bad Conduct' },
        { value: 'dishonorable', label: 'Dishonorable' },
        { value: 'active-duty', label: 'Active Duty' }
      ],
      description: 'Type of military discharge'
    },
    {
      id: 'entitlementUsed',
      label: 'Entitlement Previously Used',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0',
      description: 'Amount of VA entitlement previously used'
    },
    {
      id: 'firstTimeUse',
      label: 'First-Time VA Loan Use',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      description: 'Whether this is the first time using VA loan benefits'
    },

    // Property Information
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 50000,
      max: 2000000,
      step: 1000,
      placeholder: '350000',
      description: 'Purchase price or appraised value of the property'
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
        { value: 'multi-unit', label: 'Multi-Unit (up to 4 units)' }
      ],
      description: 'Type of property being purchased'
    },
    {
      id: 'propertySize',
      label: 'Property Size',
      type: 'number',
      unit: 'sq ft',
      required: false,
      min: 500,
      max: 10000,
      step: 100,
      placeholder: '2500',
      description: 'Square footage of the property'
    },
    {
      id: 'propertyAge',
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '10',
      description: 'Age of the property in years'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Residence' },
        { value: 'investment', label: 'Investment Property' }
      ],
      description: 'How the property will be occupied'
    },
    {
      id: 'state',
      label: 'State',
      type: 'select',
      required: true,
      options: [
        { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' },
        { value: 'ar', label: 'Arkansas' }, { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' },
        { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' }, { value: 'fl', label: 'Florida' },
        { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
        { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' },
        { value: 'ks', label: 'Kansas' }, { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' },
        { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' }, { value: 'ma', label: 'Massachusetts' },
        { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
        { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' },
        { value: 'nv', label: 'Nevada' }, { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' },
        { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' }, { value: 'nc', label: 'North Carolina' },
        { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
        { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' },
        { value: 'sc', label: 'South Carolina' }, { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' },
        { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' }, { value: 'vt', label: 'Vermont' },
        { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
        { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
      ],
      description: 'State where the property is located'
    },

    // Loan Information
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 50000,
      max: 2000000,
      step: 1000,
      placeholder: '350000',
      description: 'Total loan amount needed'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '0',
      description: 'Down payment amount (VA loans typically require 0% down)'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      min: 1,
      max: 10,
      step: 0.125,
      placeholder: '6.0',
      description: 'Annual interest rate on the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      min: 15,
      max: 30,
      step: 1,
      placeholder: '30',
      description: 'Loan term in years'
    },
    {
      id: 'loanType',
      label: 'VA Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'purchase', label: 'Purchase' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'irrrl', label: 'Interest Rate Reduction Refinance Loan (IRRRL)' },
        { value: 'cash-out', label: 'Cash-Out Refinance' }
      ],
      description: 'Type of VA loan'
    },

    // Financial Information
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 1000,
      max: 100000,
      step: 100,
      placeholder: '8000',
      description: 'Monthly household income'
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debts',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '1200',
      description: 'Total monthly debt payments'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      unit: 'score',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720',
      description: 'Borrower credit score'
    },
    {
      id: 'assets',
      label: 'Total Assets',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '75000',
      description: 'Total liquid assets available'
    },
    {
      id: 'reserves',
      label: 'Reserves Required',
      type: 'number',
      unit: 'months',
      required: false,
      min: 0,
      max: 12,
      step: 1,
      placeholder: '2',
      description: 'Number of months of reserves required'
    },

    // VA Funding Fee
    {
      id: 'fundingFeeRate',
      label: 'Funding Fee Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '2.3',
      description: 'VA funding fee percentage (calculated if not provided)'
    },
    {
      id: 'fundingFeeExempt',
      label: 'Funding Fee Exempt',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes (Service-Connected Disability)' },
        { value: 'no', label: 'No' }
      ],
      description: 'Whether the borrower is exempt from funding fees'
    },
    {
      id: 'disabilityRating',
      label: 'Disability Rating',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 100,
      step: 10,
      placeholder: '0',
      description: 'VA disability rating percentage'
    },

    // Costs and Fees
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '8000',
      description: 'Estimated closing costs'
    },
    {
      id: 'prepaidItems',
      label: 'Prepaid Items',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 15000,
      step: 100,
      placeholder: '3000',
      description: 'Prepaid items (insurance, taxes, etc.)'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 30000,
      step: 100,
      placeholder: '3500',
      description: 'Annual property tax amount'
    },
    {
      id: 'homeInsurance',
      label: 'Annual Home Insurance',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 15000,
      step: 100,
      placeholder: '1800',
      description: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '0',
      description: 'Monthly homeowners association fees'
    },

    // Additional Information
    {
      id: 'firstTimeBuyer',
      label: 'First-Time Homebuyer',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      description: 'Whether this is the first home purchase'
    },
    {
      id: 'coBorrower',
      label: 'Co-Borrower',
      type: 'select',
      required: false,
      options: [
        { value: 'spouse', label: 'Spouse' },
        { value: 'other', label: 'Other Veteran' },
        { value: 'civilian', label: 'Civilian' },
        { value: 'none', label: 'No Co-Borrower' }
      ],
      description: 'Type of co-borrower, if any'
    },
    {
      id: 'energyEfficient',
      label: 'Energy Efficient Improvements',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      description: 'Whether energy efficient improvements are included'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Total monthly mortgage payment'
    },
    {
      id: 'principalInterest',
      label: 'Principal & Interest',
      type: 'number',
      unit: 'USD',
      description: 'Monthly principal and interest payment'
    },
    {
      id: 'propertyTaxes',
      label: 'Monthly Property Taxes',
      type: 'number',
      unit: 'USD',
      description: 'Monthly property tax payment'
    },
    {
      id: 'insurance',
      label: 'Monthly Insurance',
      type: 'number',
      unit: 'USD',
      description: 'Monthly insurance payment'
    },
    {
      id: 'fundingFee',
      label: 'VA Funding Fee',
      type: 'number',
      unit: 'USD',
      description: 'One-time VA funding fee amount'
    },
    {
      id: 'fundingFeeFinanced',
      label: 'Funding Fee Financed',
      type: 'number',
      unit: 'USD',
      description: 'Amount of funding fee financed into loan'
    },
    {
      id: 'totalLoanAmount',
      label: 'Total Loan Amount',
      type: 'number',
      unit: 'USD',
      description: 'Total loan amount including financed fees'
    },
    {
      id: 'downPaymentRequired',
      label: 'Down Payment Required',
      type: 'number',
      unit: 'USD',
      description: 'Required down payment amount'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'number',
      unit: '%',
      description: 'Total debt-to-income ratio'
    },
    {
      id: 'housingRatio',
      label: 'Housing Ratio',
      type: 'number',
      unit: '%',
      description: 'Housing expense ratio'
    },
    {
      id: 'loanToValue',
      label: 'Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      description: 'Loan-to-value ratio'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'number',
      unit: 'USD',
      description: 'Total interest paid over loan term'
    },
    {
      id: 'totalCost',
      label: 'Total Cost of Loan',
      type: 'number',
      unit: 'USD',
      description: 'Total cost including principal, interest, and fees'
    },
    {
      id: 'amortizationSchedule',
      label: 'Amortization Schedule',
      type: 'array',
      description: 'Complete loan amortization schedule'
    },
    {
      id: 'eligibilityScore',
      label: 'Eligibility Score',
      type: 'number',
      unit: '0-100',
      description: 'Overall VA loan eligibility assessment score'
    },
    {
      id: 'affordabilityScore',
      label: 'Affordability Score',
      type: 'number',
      unit: '0-100',
      description: 'Affordability assessment score'
    },
    {
      id: 'benefitAnalysis',
      label: 'Benefit Analysis',
      type: 'object',
      description: 'Analysis of VA loan benefits vs conventional'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'object',
      description: 'Comparison with other loan types'
    },
    {
      id: 'entitlementAnalysis',
      label: 'Entitlement Analysis',
      type: 'object',
      description: 'Analysis of VA entitlement usage'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      description: 'Professional recommendations based on analysis'
    }
  ],

  calculate: calculateVALoan,
  generateReport: generateVALoanAnalysis
};
