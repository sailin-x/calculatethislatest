import { Calculator, Formula } from '../../../types/calculator';
import { calculateUSDALoan, validateUSDALoanInputs } from './formulas';
import { getUSDALoanValidationRules } from './validation';

/**
 * USDA loan formula implementation
 */
const usdaLoanFormula: Formula = {
  id: 'usda-loan',
  name: 'USDA Loan',
  description: 'Calculate USDA loan eligibility and payments',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateUSDALoan(inputs as any);
    return {
      outputs: result,
      explanation: 'USDA loan analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading USDA loan calculator with comprehensive features
 */
export const usdaLoanCalculator: Calculator = {
  id: 'usda-loan-calculator',
  title: 'USDA Loan Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive USDA loan analysis including eligibility requirements, loan limits, subsidy calculations, and rural housing program benefits for first-time and low-to-moderate income homebuyers.',

  usageInstructions: [
    'Enter property details and household information',
    'Specify income, credit score, and debt-to-income ratio',
    'Review eligibility requirements and loan limits',
    'Analyze subsidy benefits and total cost of borrowing'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '250000',
      tooltip: 'Appraised value of the property',
      defaultValue: 250000
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price',
      type: 'currency',
      required: true,
      placeholder: '250000',
      tooltip: 'Agreed purchase price of the property',
      defaultValue: 250000
    },
    {
      id: 'location',
      label: 'Property Location',
      type: 'select',
      required: true,
      options: [
        { value: 'rural', label: 'Rural Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'small-town', label: 'Small Town' }
      ],
      tooltip: 'Location type (must be eligible rural area)',
      defaultValue: 'rural'
    },
    {
      id: 'householdIncome',
      label: 'Annual Household Income',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Total annual household income before taxes',
      defaultValue: 75000
    },
    {
      id: 'householdSize',
      label: 'Household Size',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Number of people in household',
      defaultValue: 3,
      min: 1,
      max: 10
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      placeholder: '680',
      tooltip: 'Middle credit score of applicants (620 minimum)',
      defaultValue: 680,
      min: 300,
      max: 850
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      required: true,
      placeholder: '35',
      tooltip: 'Total monthly debt payments as % of gross income',
      defaultValue: 35,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Down payment amount (typically 0% for USDA)',
      defaultValue: 0
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Annual interest rate for the loan',
      defaultValue: 6.5,
      min: 0,
      max: 20,
      step: 0.125
    },
    {
      id: 'isPrimaryResidence',
      label: 'Primary Residence',
      type: 'boolean',
      required: true,
      tooltip: 'Property will be your primary residence',
      defaultValue: true
    },
    {
      id: 'isModestHousing',
      label: 'Meets Modest Housing',
      type: 'boolean',
      required: true,
      tooltip: 'Property meets USDA modest housing requirements',
      defaultValue: true
    },
    {
      id: 'meetsIncomeLimits',
      label: 'Meets Income Limits',
      type: 'boolean',
      required: true,
      tooltip: 'Household income meets USDA area income limits',
      defaultValue: true
    },
    {
      id: 'meetsLocationRequirements',
      label: 'Meets Location Requirements',
      type: 'boolean',
      required: true,
      tooltip: 'Property location meets USDA rural development requirements',
      defaultValue: true
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Total closing costs for the loan',
      defaultValue: 5000
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual property tax amount',
      defaultValue: 3000
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200
    },
    {
      id: 'hoaFees',
      label: 'Annual HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Annual homeowners association fees',
      defaultValue: 0
    },
    {
      id: 'includeTaxesInsurance',
      label: 'Include Taxes & Insurance',
      type: 'boolean',
      required: false,
      tooltip: 'Include property taxes and insurance in payment calculation',
      defaultValue: true
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Period over which to analyze the loan',
      defaultValue: 30,
      min: 1,
      max: 50
    }
  ],

  outputs: [
    {
      id: 'isEligible',
      label: 'Eligible for USDA Loan',
      type: 'text',
      explanation: 'Whether you meet USDA loan eligibility requirements'
    },
    {
      id: 'eligibilityReasons',
      label: 'Eligibility Details',
      type: 'text',
      explanation: 'Specific eligibility requirements and status'
    },
    {
      id: 'maximumLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      explanation: 'Maximum loan amount based on income and property limits'
    },
    {
      id: 'requiredDownPayment',
      label: 'Required Down Payment',
      type: 'currency',
      explanation: 'Down payment required for the loan'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      explanation: 'Actual loan amount after down payment'
    },
    {
      id: 'monthlyPrincipalInterest',
      label: 'Monthly Principal & Interest',
      type: 'currency',
      explanation: 'Monthly payment for loan principal and interest'
    },
    {
      id: 'monthlyTaxesInsurance',
      label: 'Monthly Taxes & Insurance',
      type: 'currency',
      explanation: 'Monthly portion of taxes and insurance (if included)'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Complete monthly housing payment'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Loan amount as percentage of property value'
    },
    {
      id: 'frontEndRatio',
      label: 'Front-End Ratio (%)',
      type: 'percentage',
      explanation: 'Housing costs as percentage of income'
    },
    {
      id: 'backEndRatio',
      label: 'Back-End Ratio (%)',
      type: 'percentage',
      explanation: 'Total debt as percentage of income'
    },
    {
      id: 'totalClosingCosts',
      label: 'Total Closing Costs',
      type: 'currency',
      explanation: 'Total closing costs for the transaction'
    },
    {
      id: 'totalMonthlyCosts',
      label: 'Total Monthly Costs',
      type: 'currency',
      explanation: 'Total monthly housing costs'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to recover closing costs through lower payments'
    },
    {
      id: 'guaranteedLoanFee',
      label: 'Guaranteed Loan Fee',
      type: 'currency',
      explanation: 'USDA guarantee fee (2% of loan amount)'
    },
    {
      id: 'annualSubsidy',
      label: 'Annual Subsidy',
      type: 'currency',
      explanation: 'Annual subsidy amount from USDA program'
    },
    {
      id: 'totalSubsidyOverTerm',
      label: 'Total Subsidy Over Term',
      type: 'currency',
      explanation: 'Total subsidy received over loan term'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendation based on eligibility and analysis'
    },
    {
      id: 'nextSteps',
      label: 'Next Steps',
      type: 'text',
      explanation: 'Recommended next steps for USDA loan process'
    },
    {
      id: 'alternativeOptions',
      label: 'Alternative Options',
      type: 'text',
      explanation: 'Alternative loan options if not eligible for USDA'
    }
  ],

  formulas: [usdaLoanFormula],

  validationRules: getUSDALoanValidationRules(),

  examples: [
    {
      title: 'First-Time Rural Homebuyer',
      description: 'Typical first-time homebuyer in rural area with moderate income',
      inputs: {
        propertyValue: 250000,
        purchasePrice: 250000,
        location: 'rural',
        householdIncome: 75000,
        householdSize: 3,
        creditScore: 680,
        debtToIncomeRatio: 35,
        downPayment: 0,
        interestRate: 6.5,
        isPrimaryResidence: true,
        isModestHousing: true,
        meetsIncomeLimits: true,
        meetsLocationRequirements: true,
        closingCosts: 5000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        hoaFees: 0,
        includeTaxesInsurance: true,
        analysisPeriod: 30
      },
      expectedOutputs: {
        isEligible: 'Eligible',
        eligibilityReasons: 'Eligible for USDA loan program',
        maximumLoanAmount: 375000,
        requiredDownPayment: 0,
        loanAmount: 250000,
        monthlyPrincipalInterest: 1583,
        monthlyTaxesInsurance: 350,
        totalMonthlyPayment: 1933,
        loanToValueRatio: 100,
        frontEndRatio: 30.9,
        backEndRatio: 35,
        totalClosingCosts: 5000,
        totalMonthlyCosts: 1933,
        breakEvenPeriod: 3,
        guaranteedLoanFee: 5000,
        annualSubsidy: 9750,
        totalSubsidyOverTerm: 292500,
        recommendation: 'Eligible for USDA loan! This program offers 100% financing with no down payment, making homeownership more accessible.',
        nextSteps: 'Contact USDA-approved lender to verify eligibility, Get pre-approved for USDA loan, Find USDA-eligible property in approved area, Complete required homebuyer education course, Submit loan application with lender',
        alternativeOptions: 'FHA Loan (3.5% down payment minimum), VA Loan (if veteran - 0% down payment), Conventional Loan (3-20% down payment), FHA 203(k) Loan (for purchase and rehab)'
      }
    }
  ]
};