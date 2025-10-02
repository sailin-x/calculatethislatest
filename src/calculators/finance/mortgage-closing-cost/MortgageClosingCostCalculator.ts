import { Calculator } from '../../types/calculator';
import { calculateMortgageClosingCost } from './formulas';
import { generateMortgageClosingCostAnalysis } from './formulas';

export const MortgageClosingCostCalculator: Calculator = {
  id: 'mortgage-closing-cost-calculator',
  name: 'Mortgage Closing Cost Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate comprehensive mortgage closing costs including lender fees, third-party fees, prepaid items, and escrow requirements to understand the total cost of homeownership.',
  inputs: {
    loanAmount: {
      type: 'currency',
      value: 300000,
      unit: 'USD',
      description: 'Loan amount',
      placeholder: 'Enter loan amount',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    homePrice: {
      type: 'currency',
      value: 375000,
      unit: 'USD',
      description: 'Home purchase price',
      placeholder: 'Enter home price',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    downPayment: {
      type: 'currency',
      value: 75000,
      unit: 'USD',
      description: 'Down payment amount',
      placeholder: 'Enter down payment',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    interestRate: {
      type: 'percentage',
      value: 6.5,
      unit: '%',
      description: 'Interest rate',
      placeholder: 'Enter interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    loanTerm: {
      type: 'number',
      value: 30,
      unit: 'years',
      description: 'Loan term in years',
      placeholder: 'Enter loan term',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    originationFee: {
      type: 'currency',
      value: 1500,
      unit: 'USD',
      description: 'Loan origination fee',
      placeholder: 'Enter origination fee',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    discountPoints: {
      type: 'number',
      value: 0,
      unit: 'points',
      description: 'Discount points purchased',
      placeholder: 'Enter discount points',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    appraisalFee: {
      type: 'currency',
      value: 500,
      unit: 'USD',
      description: 'Appraisal fee',
      placeholder: 'Enter appraisal fee',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    creditReportFee: {
      type: 'currency',
      value: 50,
      unit: 'USD',
      description: 'Credit report fee',
      placeholder: 'Enter credit report fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    floodCertificationFee: {
      type: 'currency',
      value: 20,
      unit: 'USD',
      description: 'Flood certification fee',
      placeholder: 'Enter flood certification fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    taxServiceFee: {
      type: 'currency',
      value: 75,
      unit: 'USD',
      description: 'Tax service fee',
      placeholder: 'Enter tax service fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    processingFee: {
      type: 'currency',
      value: 300,
      unit: 'USD',
      description: 'Loan processing fee',
      placeholder: 'Enter processing fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    underwritingFee: {
      type: 'currency',
      value: 400,
      unit: 'USD',
      description: 'Underwriting fee',
      placeholder: 'Enter underwriting fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    documentPreparationFee: {
      type: 'currency',
      value: 200,
      unit: 'USD',
      description: 'Document preparation fee',
      placeholder: 'Enter document preparation fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    titleInsurance: {
      type: 'currency',
      value: 1200,
      unit: 'USD',
      description: 'Title insurance premium',
      placeholder: 'Enter title insurance cost',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    titleSearchFee: {
      type: 'currency',
      value: 150,
      unit: 'USD',
      description: 'Title search fee',
      placeholder: 'Enter title search fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    titleEndorsements: {
      type: 'currency',
      value: 100,
      unit: 'USD',
      description: 'Title endorsements',
      placeholder: 'Enter title endorsements',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    escrowFee: {
      type: 'currency',
      value: 800,
      unit: 'USD',
      description: 'Escrow/settlement fee',
      placeholder: 'Enter escrow fee',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    attorneyFee: {
      type: 'currency',
      value: 500,
      unit: 'USD',
      description: 'Attorney fee',
      placeholder: 'Enter attorney fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    surveyFee: {
      type: 'currency',
      value: 300,
      unit: 'USD',
      description: 'Survey fee',
      placeholder: 'Enter survey fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    pestInspectionFee: {
      type: 'currency',
      value: 100,
      unit: 'USD',
      description: 'Pest inspection fee',
      placeholder: 'Enter pest inspection fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    homeInspectionFee: {
      type: 'currency',
      value: 400,
      unit: 'USD',
      description: 'Home inspection fee',
      placeholder: 'Enter home inspection fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    recordingFee: {
      type: 'currency',
      value: 50,
      unit: 'USD',
      description: 'Recording fee',
      placeholder: 'Enter recording fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    transferTax: {
      type: 'currency',
      value: 750,
      unit: 'USD',
      description: 'Transfer tax',
      placeholder: 'Enter transfer tax',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    propertyTaxRate: {
      type: 'percentage',
      value: 1.2,
      unit: '%',
      description: 'Annual property tax rate',
      placeholder: 'Enter property tax rate',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    propertyTaxMonths: {
      type: 'number',
      value: 6,
      unit: 'months',
      description: 'Months of property taxes to prepay',
      placeholder: 'Enter months to prepay',
      validation: {
        required: true,
        min: 0,
        max: 12
      }
    },
    homeownersInsuranceAnnual: {
      type: 'currency',
      value: 1200,
      unit: 'USD/year',
      description: 'Annual homeowners insurance premium',
      placeholder: 'Enter annual insurance premium',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    insuranceMonths: {
      type: 'number',
      value: 12,
      unit: 'months',
      description: 'Months of insurance to prepay',
      placeholder: 'Enter months to prepay',
      validation: {
        required: true,
        min: 0,
        max: 12
      }
    },
    mortgageInsuranceType: {
      type: 'select',
      value: 'none',
      unit: '',
      description: 'Type of mortgage insurance',
      placeholder: 'Select insurance type',
      options: [
        { value: 'none', label: 'None' },
        { value: 'pmi', label: 'Private Mortgage Insurance (PMI)' },
        { value: 'mip', label: 'FHA Mortgage Insurance Premium (MIP)' },
        { value: 'usda', label: 'USDA Guarantee Fee' },
        { value: 'va', label: 'VA Funding Fee' }
      ],
      validation: {
        required: true
      }
    },
    mortgageInsuranceRate: {
      type: 'percentage',
      value: 0.5,
      unit: '%',
      description: 'Mortgage insurance rate',
      placeholder: 'Enter insurance rate',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    lenderCredits: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Lender credits (negative for costs)',
      placeholder: 'Enter lender credits',
      validation: {
        required: true,
        min: -50000,
        max: 50000
      }
    },
    sellerCredits: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Seller credits',
      placeholder: 'Enter seller credits',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    closingDate: {
      type: 'date',
      value: '2024-01-15',
      unit: '',
      description: 'Closing date',
      placeholder: 'Select closing date',
      validation: {
        required: true
      }
    },
    firstPaymentDate: {
      type: 'date',
      value: '2024-03-01',
      unit: '',
      description: 'First mortgage payment date',
      placeholder: 'Select first payment date',
      validation: {
        required: true
      }
    }
  },
  outputs: [
    {
      name: 'totalClosingCosts',
      label: 'Total Closing Costs',
      type: 'currency',
      unit: 'USD',
      description: 'Total closing costs including all fees and prepaid items'
    },
    {
      name: 'lenderFees',
      label: 'Lender Fees',
      type: 'currency',
      unit: 'USD',
      description: 'Total fees charged by the lender'
    },
    {
      name: 'thirdPartyFees',
      label: 'Third-Party Fees',
      type: 'currency',
      unit: 'USD',
      description: 'Total fees charged by third-party services'
    },
    {
      name: 'prepaidItems',
      label: 'Prepaid Items',
      type: 'currency',
      unit: 'USD',
      description: 'Total prepaid items including taxes and insurance'
    },
    {
      name: 'escrowAccount',
      label: 'Escrow Account',
      type: 'currency',
      unit: 'USD',
      description: 'Initial escrow account balance'
    },
    {
      name: 'cashToClose',
      label: 'Cash to Close',
      type: 'currency',
      unit: 'USD',
      description: 'Total cash required at closing'
    },
    {
      name: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly mortgage payment including principal, interest, taxes, and insurance'
    },
    {
      name: 'principalInterest',
      label: 'Principal & Interest',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly principal and interest payment'
    },
    {
      name: 'monthlyTaxes',
      label: 'Monthly Taxes',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly property tax payment'
    },
    {
      name: 'monthlyInsurance',
      label: 'Monthly Insurance',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly homeowners insurance payment'
    },
    {
      name: 'monthlyPMI',
      label: 'Monthly PMI',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly private mortgage insurance payment'
    },
    {
      name: 'closingCostPercentage',
      label: 'Closing Cost % of Loan',
      type: 'percentage',
      unit: '%',
      description: 'Closing costs as percentage of loan amount'
    },
    {
      name: 'closingCostPercentageHome',
      label: 'Closing Cost % of Home Price',
      type: 'percentage',
      unit: '%',
      description: 'Closing costs as percentage of home price'
    },
    {
      name: 'breakdownAnalysis',
      label: 'Cost Breakdown Analysis',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of closing costs by category'
    },
    {
      name: 'savingsOpportunities',
      label: 'Savings Opportunities',
      type: 'string',
      unit: '',
      description: 'Potential areas to reduce closing costs'
    },
    {
      name: 'comparisonAnalysis',
      label: 'Market Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison with typical closing costs in the market'
    },
    {
      name: 'timelineAnalysis',
      label: 'Timeline Analysis',
      type: 'string',
      unit: '',
      description: 'Analysis of closing timeline and prepaid items'
    },
    {
      name: 'escrowAnalysis',
      label: 'Escrow Analysis',
      type: 'string',
      unit: '',
      description: 'Detailed escrow account analysis'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      unit: '',
      description: 'Recommendations for optimizing closing costs'
    },
    {
      name: 'feeBreakdown',
      label: 'Detailed Fee Breakdown',
      type: 'string',
      unit: '',
      description: 'Itemized breakdown of all closing costs'
    },
    {
      name: 'prepaidBreakdown',
      label: 'Prepaid Items Breakdown',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of prepaid items'
    },
    {
      name: 'lenderComparison',
      label: 'Lender Fee Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of lender fees with market averages'
    },
    {
      name: 'negotiationTips',
      label: 'Negotiation Tips',
      type: 'string',
      unit: '',
      description: 'Tips for negotiating closing costs'
    },
    {
      name: 'costProjection',
      label: 'Cost Projection',
      type: 'string',
      unit: '',
      description: 'Projected costs over the life of the loan'
    }
  ],
  calculate: calculateMortgageClosingCost,
  generateReport: generateMortgageClosingCostAnalysis
};
