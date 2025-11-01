import { Calculator } from '../../../types/calculator';
import { NetOperatingIncomeNoiInputs, NetOperatingIncomeNoiOutputs } from './types';
import { calculateNetOperatingIncomeNoi } from './formulas';
import { validateNetOperatingIncomeNoiInputs, validateNetOperatingIncomeNoiBusinessRules } from './validation';

export const NetOperatingIncomeNoiCalculator: Calculator = {
  id: 'NetOperatingIncomeNoiCalculator',
  title: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  subcategory: 'Real Estate Investment',
  description: 'Calculate net operating income, cap rates, cash flow analysis, and investment metrics for income-producing properties with comprehensive valuation and risk assessment.',
  usageInstructions: [
    'Enter property income and operating expenses',
    'Input property details and market data',
    'Specify financing terms and tax information',
    'Review NOI analysis and investment recommendations'
  ],

  inputs: [
    {
      id: 'grossRentalIncome',
      label: 'Gross Rental Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total annual rental income from all tenants'
    },
    {
      id: 'otherIncome',
      label: 'Other Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Additional income from laundry, parking, etc.'
    },
    {
      id: 'propertyManagement',
      label: 'Property Management (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 8,
      tooltip: 'Property management fee as percentage of gross income'
    },
    {
      id: 'maintenance',
      label: 'Maintenance (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 1,
      tooltip: 'Annual maintenance as percentage of gross income'
    },
    {
      id: 'utilities',
      label: 'Utilities ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual utility costs'
    },
    {
      id: 'insurance',
      label: 'Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual insurance premium'
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'legalFees',
      label: 'Legal Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual legal and professional fees'
    },
    {
      id: 'accountingFees',
      label: 'Accounting Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual accounting and audit fees'
    },
    {
      id: 'advertising',
      label: 'Advertising ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual marketing and advertising costs'
    },
    {
      id: 'supplies',
      label: 'Supplies ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual supplies and miscellaneous costs'
    },
    {
      id: 'otherExpenses',
      label: 'Other Expenses ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Other annual operating expenses'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'squareFootage',
      label: 'Square Footage',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Total rentable square footage'
    },
    {
      id: 'numberOfUnits',
      label: 'Number of Units',
      type: 'number',
      required: true,
      min: 1,
      tooltip: 'Total number of rental units'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 5,
      tooltip: 'Expected annual vacancy rate'
    },
    {
      id: 'marketRentPerSqFt',
      label: 'Market Rent per Sq Ft ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Current market rent per square foot'
    },
    {
      id: 'expenseGrowthRate',
      label: 'Annual Expense Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 20,
      defaultValue: 3,
      tooltip: 'Expected annual increase in operating expenses'
    },
    {
      id: 'incomeGrowthRate',
      label: 'Annual Income Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 20,
      defaultValue: 2,
      tooltip: 'Expected annual increase in rental income'
    },
    {
      id: 'marketCapRate',
      label: 'Market Cap Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Current market capitalization rate'
    },
    {
      id: 'targetCapRate',
      label: 'Target Cap Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 0,
      tooltip: 'Desired capitalization rate for investment'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Mortgage loan amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 0,
      tooltip: 'Mortgage interest rate'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      defaultValue: 30,
      tooltip: 'Mortgage loan term in years'
    },
    {
      id: 'downPayment',
      label: 'Down Payment (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 25,
      tooltip: 'Down payment as percentage of property value'
    },
    {
      id: 'depreciationYears',
      label: 'Depreciation Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      defaultValue: 27.5,
      tooltip: 'Useful life for depreciation calculations'
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 25,
      tooltip: 'Your marginal income tax rate'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      defaultValue: 5,
      tooltip: 'Period for financial projections'
    }
  ],

  outputs: [
    {
      id: 'grossIncome',
      label: 'Gross Income',
      type: 'currency',
      explanation: 'Total gross income from all sources'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Gross income adjusted for vacancy losses'
    },
    {
      id: 'totalOperatingExpenses',
      label: 'Total Operating Expenses',
      type: 'currency',
      explanation: 'Sum of all operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income (NOI)',
      type: 'currency',
      explanation: 'Income after operating expenses'
    },
    {
      id: 'noiMargin',
      label: 'NOI Margin (%)',
      type: 'percentage',
      explanation: 'NOI as percentage of effective gross income'
    },
    {
      id: 'noiPerUnit',
      label: 'NOI per Unit',
      type: 'currency',
      explanation: 'Net operating income per rental unit'
    },
    {
      id: 'noiPerSqFt',
      label: 'NOI per Sq Ft',
      type: 'currency',
      explanation: 'Net operating income per square foot'
    },
    {
      id: 'noiYield',
      label: 'NOI Yield (%)',
      type: 'percentage',
      explanation: 'NOI as percentage of property value'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Current capitalization rate'
    },
    {
      id: 'impliedPropertyValue',
      label: 'Implied Property Value',
      type: 'currency',
      explanation: 'Property value based on NOI and market cap rate'
    },
    {
      id: 'targetPropertyValue',
      label: 'Target Property Value',
      type: 'currency',
      explanation: 'Property value based on NOI and target cap rate'
    },
    {
      id: 'annualDebtService',
      label: 'Annual Debt Service',
      type: 'currency',
      explanation: 'Annual mortgage payments'
    },
    {
      id: 'cashFlowBeforeTax',
      label: 'Cash Flow Before Tax',
      type: 'currency',
      explanation: 'Annual cash flow before income taxes'
    },
    {
      id: 'cashFlowAfterTax',
      label: 'Cash Flow After Tax',
      type: 'currency',
      explanation: 'Annual cash flow after income taxes'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'Return on invested cash'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'NOI divided by annual debt service'
    },
    {
      id: 'breakEvenRatio',
      label: 'Break-Even Ratio (%)',
      type: 'percentage',
      explanation: 'Expenses as percentage of effective gross income'
    },
    {
      id: 'grossRentMultiplier',
      label: 'Gross Rent Multiplier',
      type: 'number',
      explanation: 'Property value divided by gross rental income'
    },
    {
      id: 'occupancyRate',
      label: 'Occupancy Rate (%)',
      type: 'percentage',
      explanation: 'Percentage of occupied rental units'
    },
    {
      id: 'rentCollectionRate',
      label: 'Rent Collection Rate (%)',
      type: 'percentage',
      explanation: 'Percentage of rent collected vs. due'
    },
    {
      id: 'investmentRecommendation',
      label: 'Investment Recommendation',
      type: 'text',
      explanation: 'Overall investment recommendation'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of investment risk'
    },
    {
      id: 'keyStrengths',
      label: 'Key Strengths',
      type: 'text',
      explanation: 'Positive aspects of the investment'
    },
    {
      id: 'keyConcerns',
      label: 'Key Concerns',
      type: 'text',
      explanation: 'Potential issues or risks'
    },
    {
      id: 'actionItems',
      label: 'Action Items',
      type: 'text',
      explanation: 'Recommended next steps'
    },
    {
      id: 'noiProjection5Year',
      label: '5-Year NOI Projection',
      type: 'text',
      explanation: 'Projected NOI for next 5 years'
    },
    {
      id: 'cashFlowProjection5Year',
      label: '5-Year Cash Flow Projection',
      type: 'text',
      explanation: 'Projected cash flow for next 5 years'
    },
    {
      id: 'valueAddAnalysis',
      label: 'Value-Add Analysis',
      type: 'text',
      explanation: 'Potential improvements and their impact'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'text',
      explanation: 'How property compares to market'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Small Apartment Building',
      description: 'Analysis of a 10-unit apartment building in a suburban market',
      inputs: {
        grossRentalIncome: 120000,
        otherIncome: 5000,
        propertyManagement: 8,
        maintenance: 1,
        utilities: 8000,
        insurance: 3000,
        propertyTaxes: 15000,
        legalFees: 1000,
        accountingFees: 2000,
        advertising: 1500,
        supplies: 1000,
        otherExpenses: 2000,
        propertyValue: 1500000,
        squareFootage: 12000,
        numberOfUnits: 10,
        vacancyRate: 5,
        marketRentPerSqFt: 1.0,
        expenseGrowthRate: 3,
        incomeGrowthRate: 2,
        marketCapRate: 6.5,
        targetCapRate: 7.0,
        loanAmount: 1125000,
        interestRate: 5.5,
        loanTerm: 30,
        downPayment: 25,
        depreciationYears: 27.5,
        marginalTaxRate: 25,
        analysisPeriod: 5
      },
      expectedOutputs: {
        netOperatingIncome: 85000,
        capRate: 5.67,
        cashOnCashReturn: 8.2,
        debtServiceCoverageRatio: 1.35,
        investmentRecommendation: 'Buy'
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'Analysis of a single-tenant office building in downtown area',
      inputs: {
        grossRentalIncome: 250000,
        otherIncome: 10000,
        propertyManagement: 6,
        maintenance: 1.5,
        utilities: 15000,
        insurance: 8000,
        propertyTaxes: 35000,
        legalFees: 3000,
        accountingFees: 4000,
        advertising: 2000,
        supplies: 2000,
        otherExpenses: 5000,
        propertyValue: 3200000,
        squareFootage: 25000,
        numberOfUnits: 1,
        vacancyRate: 0,
        marketRentPerSqFt: 1.0,
        expenseGrowthRate: 2.5,
        incomeGrowthRate: 3,
        marketCapRate: 7.0,
        targetCapRate: 7.5,
        loanAmount: 2240000,
        interestRate: 6.0,
        loanTerm: 25,
        downPayment: 30,
        depreciationYears: 39,
        marginalTaxRate: 30,
        analysisPeriod: 5
      },
      expectedOutputs: {
        netOperatingIncome: 165000,
        capRate: 5.16,
        cashOnCashReturn: 7.8,
        debtServiceCoverageRatio: 1.28,
        investmentRecommendation: 'Hold'
      }
    }
  ]
};