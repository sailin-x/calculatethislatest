import { Calculator } from '@/types/calculator';
import { MortgageVsRentCalculator } from './MortgageVsRentCalculator';

export const mortgageVsRentCalculator: Calculator = {
  id: 'mortgage-vs-rent',
  name: 'Mortgage vs. Rent Calculator',
  description: 'Compare the financial implications of buying a home versus renting. Analyze monthly costs, total expenses, equity buildup, opportunity costs, tax benefits, and long-term financial impact to make an informed decision.',
  category: 'finance',
  tags: ['mortgage', 'rent', 'comparison', 'buying', 'renting', 'housing', 'equity', 'opportunity-cost', 'break-even', 'tax-benefits', 'cash-flow'],
  component: MortgageVsRentCalculator,
  inputs: {
    // Property Information
    propertyValue: {
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '350000',
      description: 'Current market value of the property'
    },
    propertyAddress: {
      label: 'Property Address',
      type: 'text',
      required: false,
      placeholder: '123 Main St, Anytown, USA',
      description: 'Property address for reference'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'condo', label: 'Condominium' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'manufactured', label: 'Manufactured Home' }
      ],
      description: 'Type of property being considered'
    },
    propertySize: {
      label: 'Property Size (sq ft)',
      type: 'number',
      required: false,
      min: 100,
      max: 10000,
      step: 50,
      placeholder: '2000',
      description: 'Square footage of the property'
    },
    propertyAge: {
      label: 'Property Age (years)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15',
      description: 'Age of the property in years'
    },

    // Mortgage Information
    loanAmount: {
      label: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '280000',
      description: 'Amount to be borrowed for the mortgage'
    },
    interestRate: {
      label: 'Interest Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '4.5',
      description: 'Annual interest rate on the mortgage'
    },
    loanTerm: {
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'Length of the mortgage in years'
    },
    loanType: {
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ],
      description: 'Type of mortgage loan'
    },
    paymentType: {
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      description: 'Type of mortgage payment structure'
    },

    // Down Payment Information
    downPayment: {
      label: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '70000',
      description: 'Cash down payment amount'
    },
    downPaymentPercentage: {
      label: 'Down Payment (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '20',
      description: 'Down payment as percentage of property value'
    },
    downPaymentSource: {
      label: 'Down Payment Source',
      type: 'select',
      required: true,
      options: [
        { value: 'savings', label: 'Savings' },
        { value: 'investment_sale', label: 'Investment Sale' },
        { value: 'gift', label: 'Gift' },
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'other', label: 'Other' }
      ],
      description: 'Source of down payment funds'
    },

    // Rent Information
    monthlyRent: {
      label: 'Monthly Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 100,
      max: 50000,
      step: 50,
      placeholder: '2000',
      description: 'Monthly rent payment'
    },
    annualRent: {
      label: 'Annual Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 1200,
      max: 600000,
      step: 600,
      placeholder: '24000',
      description: 'Annual rent payment (should equal monthly rent × 12)'
    },
    rentIncreaseRate: {
      label: 'Rent Increase Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected annual rent increase rate'
    },
    rentEscalationClause: {
      label: 'Rent Escalation Clause',
      type: 'boolean',
      required: true,
      description: 'Whether rent has an escalation clause'
    },
    rentEscalationRate: {
      label: 'Rent Escalation Rate (%)',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '2.5',
      description: 'Rate specified in escalation clause'
    },

    // Insurance and Taxes
    propertyInsurance: {
      label: 'Property Insurance (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '1200',
      description: 'Annual property insurance cost'
    },
    propertyTaxes: {
      label: 'Property Taxes (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '3500',
      description: 'Annual property tax amount'
    },
    hoaFees: {
      label: 'HOA Fees (monthly)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '0',
      description: 'Monthly homeowners association fees'
    },
    floodInsurance: {
      label: 'Flood Insurance (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '0',
      description: 'Annual flood insurance cost'
    },
    mortgageInsurance: {
      label: 'Mortgage Insurance (monthly)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500,
      step: 5,
      placeholder: '0',
      description: 'Monthly mortgage insurance premium'
    },
    rentersInsurance: {
      label: 'Renters Insurance (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 2000,
      step: 25,
      placeholder: '300',
      description: 'Annual renters insurance cost'
    },

    // Maintenance and Utilities
    maintenanceCosts: {
      label: 'Maintenance Costs (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '2400',
      description: 'Annual maintenance and repair costs'
    },
    utilityCosts: {
      label: 'Utility Costs (annual)',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1800',
      description: 'Annual utility costs (electric, water, gas, etc.)'
    },
    rentIncludesUtilities: {
      label: 'Rent Includes Utilities',
      type: 'boolean',
      required: true,
      description: 'Whether rent payment includes utility costs'
    },
    utilitiesIncluded: {
      label: 'Utilities Included in Rent',
      type: 'multiselect',
      required: false,
      options: [
        { value: 'electric', label: 'Electric' },
        { value: 'water', label: 'Water' },
        { value: 'gas', label: 'Gas' },
        { value: 'internet', label: 'Internet' },
        { value: 'cable', label: 'Cable TV' },
        { value: 'trash', label: 'Trash' },
        { value: 'sewer', label: 'Sewer' }
      ],
      description: 'Which utilities are included in rent'
    },

    // Closing Costs and Fees
    closingCosts: {
      label: 'Total Closing Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '5000',
      description: 'Total closing costs for the mortgage'
    },
    originationFee: {
      label: 'Origination Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '1000',
      description: 'Loan origination fee'
    },
    appraisalFee: {
      label: 'Appraisal Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 2000,
      step: 25,
      placeholder: '500',
      description: 'Property appraisal fee'
    },
    titleInsuranceFee: {
      label: 'Title Insurance Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '800',
      description: 'Title insurance fee'
    },
    recordingFee: {
      label: 'Recording Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '200',
      description: 'Recording fee for deed and mortgage'
    },
    attorneyFee: {
      label: 'Attorney Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 2000,
      step: 25,
      placeholder: '300',
      description: 'Attorney fees for closing'
    },
    otherFees: {
      label: 'Other Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '2200',
      description: 'Other closing costs and fees'
    },

    // Market Information
    marketLocation: {
      label: 'Market Location',
      type: 'select',
      required: true,
      options: [
        { value: 'Urban', label: 'Urban' },
        { value: 'Suburban', label: 'Suburban' },
        { value: 'Rural', label: 'Rural' }
      ],
      description: 'Market location type'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'growing', label: 'Growing' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ],
      description: 'Current market condition'
    },
    marketGrowthRate: {
      label: 'Market Growth Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected market growth rate'
    },
    propertyAppreciationRate: {
      label: 'Property Appreciation Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected annual property appreciation rate'
    },
    rentGrowthRate: {
      label: 'Rent Growth Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual rent growth rate'
    },

    // Borrower Information
    borrowerIncome: {
      label: 'Annual Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '80000',
      description: 'Annual household income'
    },
    borrowerCreditScore: {
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '750',
      description: 'Borrower credit score'
    },
    borrowerDebtToIncomeRatio: {
      label: 'Debt-to-Income Ratio (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '35',
      description: 'Current debt-to-income ratio'
    },
    borrowerEmploymentType: {
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      description: 'Employment status'
    },
    borrowerTaxRate: {
      label: 'Tax Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '25',
      description: 'Marginal tax rate for tax benefit calculations'
    },

    // Investment Assumptions
    investmentReturnRate: {
      label: 'Investment Return Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '7.0',
      description: 'Expected annual return on alternative investments'
    },
    inflationRate: {
      label: 'Inflation Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -5,
      max: 15,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    discountRate: {
      label: 'Discount Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5.0',
      description: 'Discount rate for present value calculations'
    },
    analysisPeriod: {
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'Time period for comparison analysis'
    },

    // Lifestyle Factors
    expectedStayDuration: {
      label: 'Expected Stay Duration (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '7',
      description: 'How long you plan to stay in the property'
    },
    flexibilityNeeded: {
      label: 'Need Flexibility',
      type: 'boolean',
      required: true,
      description: 'Whether you need flexibility to move quickly'
    },
    maintenancePreference: {
      label: 'Maintenance Preference',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low (Minimal maintenance)' },
        { value: 'medium', label: 'Medium (Some maintenance)' },
        { value: 'high', label: 'High (Hands-on maintenance)' }
      ],
      description: 'Preference for property maintenance involvement'
    },
    locationStability: {
      label: 'Location Stability',
      type: 'select',
      required: true,
      options: [
        { value: 'stable', label: 'Stable (Long-term location)' },
        { value: 'moderate', label: 'Moderate (Some flexibility)' },
        { value: 'flexible', label: 'Flexible (Frequent moves possible)' }
      ],
      description: 'Stability of your location preference'
    },

    // Reporting Preferences
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' },
        { value: 'AUD', label: 'Australian Dollar (A$)' }
      ],
      description: 'Currency for calculations and display'
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      required: true,
      options: [
        { value: 'currency', label: 'Currency' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'number', label: 'Number' }
      ],
      description: 'Format for displaying numerical results'
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      description: 'Whether to include visual charts in results'
    }
  },
  outputs: {
    recommendation: {
      label: 'Recommendation',
      type: 'string',
      description: 'Overall recommendation (Buy, Rent, Consider Buying, Consider Renting, Requires Review)'
    },
    monthlyCostDifference: {
      label: 'Monthly Cost Difference',
      type: 'number',
      unit: 'USD',
      description: 'Difference between monthly rent and mortgage payment'
    },
    breakEvenMonths: {
      label: 'Break-Even Months',
      type: 'number',
      description: 'Number of months until buying becomes more cost-effective than renting'
    },
    totalCostDifference: {
      label: 'Total Cost Difference',
      type: 'number',
      unit: 'USD',
      description: 'Total cost difference over the analysis period'
    },
    equityBuildUp: {
      label: 'Equity Build-Up',
      type: 'number',
      unit: 'USD',
      description: 'Total equity built up over the analysis period'
    },
    opportunityCost: {
      label: 'Opportunity Cost',
      type: 'number',
      unit: 'USD',
      description: 'Opportunity cost of down payment and monthly differences'
    },
    riskScore: {
      label: 'Risk Score',
      type: 'number',
      unit: '0-100',
      description: 'Risk assessment score for the buying decision'
    },
    probabilityOfBenefit: {
      label: 'Probability of Benefit',
      type: 'number',
      unit: '%',
      description: 'Probability that buying will be financially beneficial'
    },
    monthlyMortgagePayment: {
      label: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly mortgage payment including principal and interest'
    },
    monthlyRentPayment: {
      label: 'Monthly Rent Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly rent payment'
    },
    totalMortgageCost: {
      label: 'Total Mortgage Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost of mortgage over analysis period'
    },
    totalRentCost: {
      label: 'Total Rent Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost of renting over analysis period'
    },
    costSavings: {
      label: 'Cost Savings',
      type: 'number',
      unit: 'USD',
      description: 'Total cost savings from chosen option'
    },
    breakEvenPoint: {
      label: 'Break-Even Point',
      type: 'number',
      unit: 'USD',
      description: 'Property value at break-even point'
    },
    breakEvenYears: {
      label: 'Break-Even Years',
      type: 'number',
      description: 'Number of years until break-even'
    },
    breakEvenPropertyValue: {
      label: 'Break-Even Property Value',
      type: 'number',
      unit: 'USD',
      description: 'Property value needed for break-even'
    },
    equityPercentage: {
      label: 'Equity Percentage',
      type: 'number',
      unit: '%',
      description: 'Percentage of property value in equity'
    },
    totalEquity: {
      label: 'Total Equity',
      type: 'number',
      unit: 'USD',
      description: 'Total equity value at end of analysis period'
    },
    equityGrowth: {
      label: 'Equity Growth',
      type: 'number',
      unit: 'USD',
      description: 'Growth in equity value over time'
    },
    investmentGrowth: {
      label: 'Investment Growth',
      type: 'number',
      unit: 'USD',
      description: 'Growth of alternative investments'
    },
    totalInvestmentValue: {
      label: 'Total Investment Value',
      type: 'number',
      unit: 'USD',
      description: 'Total value of alternative investments'
    },
    netInvestmentBenefit: {
      label: 'Net Investment Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Net benefit from alternative investments'
    },
    mortgageTaxDeduction: {
      label: 'Mortgage Tax Deduction',
      type: 'number',
      unit: 'USD',
      description: 'Annual tax deduction from mortgage interest'
    },
    rentTaxDeduction: {
      label: 'Rent Tax Deduction',
      type: 'number',
      unit: 'USD',
      description: 'Annual tax deduction from rent (if applicable)'
    },
    taxBenefit: {
      label: 'Tax Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Total tax benefit from chosen option'
    },
    afterTaxCost: {
      label: 'After-Tax Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost after tax benefits'
    },
    monthlyCashFlow: {
      label: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Monthly cash flow difference'
    },
    annualCashFlow: {
      label: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Annual cash flow difference'
    },
    totalCashFlow: {
      label: 'Total Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Total cash flow over analysis period'
    },
    cashFlowImprovement: {
      label: 'Cash Flow Improvement',
      type: 'number',
      unit: 'USD',
      description: 'Improvement in cash flow from chosen option'
    },
    analysis: {
      label: 'Analysis Report',
      type: 'object',
      description: 'Detailed analysis with recommendation, ratings, and insights'
    },
    sensitivityMatrix: {
      label: 'Sensitivity Matrix',
      type: 'array',
      description: 'Sensitivity analysis for key variables'
    },
    scenarios: {
      label: 'Scenario Analysis',
      type: 'array',
      description: 'Different scenario analyses'
    },
    timelineAnalysis: {
      label: 'Timeline Analysis',
      type: 'array',
      description: 'Year-by-year analysis of costs and benefits'
    },
    comparisonAnalysis: {
      label: 'Comparison Analysis',
      type: 'array',
      description: 'Detailed comparison of buying vs renting'
    },
    marketAnalysis: {
      label: 'Market Analysis',
      type: 'array',
      description: 'Market condition impact analysis'
    }
  },
  features: [
    'Comprehensive cost comparison between buying and renting',
    'Break-even analysis to determine optimal timing',
    'Equity buildup and opportunity cost calculations',
    'Tax benefit analysis including mortgage interest deductions',
    'Cash flow analysis for both options',
    'Risk assessment and probability of benefit',
    'Sensitivity analysis for key variables',
    'Scenario analysis for different market conditions',
    'Timeline analysis showing year-by-year costs',
    'Market condition impact assessment',
    'Lifestyle factor considerations',
    'Investment opportunity cost analysis',
    'Property appreciation and rent growth modeling',
    'Detailed recommendation with confidence ratings',
    'Visual charts and graphs for easy comparison'
  ],
  examples: [
    {
      name: 'First-Time Homebuyer',
      description: 'Young professional considering buying a $350,000 home vs renting for $2,000/month',
      inputs: {
        propertyValue: 350000,
        loanAmount: 280000,
        interestRate: 4.5,
        monthlyRent: 2000,
        expectedStayDuration: 7,
        borrowerIncome: 80000
      }
    },
    {
      name: 'High-Cost Market',
      description: 'Family in expensive market comparing $800,000 home vs $4,000/month rent',
      inputs: {
        propertyValue: 800000,
        loanAmount: 640000,
        interestRate: 5.2,
        monthlyRent: 4000,
        expectedStayDuration: 10,
        borrowerIncome: 150000
      }
    },
    {
      name: 'Short-Term Stay',
      description: 'Professional planning to stay only 2-3 years in current location',
      inputs: {
        propertyValue: 450000,
        loanAmount: 360000,
        interestRate: 4.8,
        monthlyRent: 2500,
        expectedStayDuration: 2,
        borrowerIncome: 95000
      }
    },
    {
      name: 'Investment Property',
      description: 'Investor comparing buying rental property vs investing in market',
      inputs: {
        propertyValue: 300000,
        loanAmount: 240000,
        interestRate: 4.2,
        monthlyRent: 1800,
        expectedStayDuration: 15,
        investmentReturnRate: 8.0
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'mortgage-qualification',
    'mortgage-refinance',
    'mortgage-points',
    'mortgage-rate-lock',
    'debt-to-income',
    'housing-expense-ratio',
    'investment-return',
    'break-even-analysis',
    'cash-flow-analysis'
  ]
};