import { Calculator } from '../../../types/calculator';
import { MortgageVsRentInputs, MortgageVsRentOutputs } from './types';
import { calculateMortgageVsRent } from './formulas';
import { validateMortgageVsRentInputs, validateMortgageVsRentBusinessRules } from './validation';

export const MortgageVsRentCalculator: Calculator = {
  id: 'MortgageVsRentCalculator',
  title: 'Mortgage vs Rent Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Compare the costs and benefits of buying a home versus renting, including break-even analysis, equity building, and long-term financial implications.',
  usageInstructions: [
    'Enter property details and mortgage terms',
    'Input current rent and expected rent increases',
    'Specify ownership costs and investment assumptions',
    'Review cost comparison and recommendations'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount you will pay as down payment'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Mortgage loan term in years'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Mortgage interest rate'
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current monthly rent payment'
    },
    {
      id: 'annualRentIncrease',
      label: 'Annual Rent Increase (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 20,
      defaultValue: 3,
      tooltip: 'Expected annual rent increase'
    },
    {
      id: 'annualPropertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'annualHomeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'monthlyHOAFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'annualMaintenance',
      label: 'Annual Maintenance (% of Property Value)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 1,
      tooltip: 'Annual maintenance as percentage of property value'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Total closing costs for purchase'
    },
    {
      id: 'expectedHomeAppreciation',
      label: 'Expected Annual Home Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 30,
      defaultValue: 3,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'alternativeInvestmentReturn',
      label: 'Alternative Investment Return (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 50,
      defaultValue: 7,
      tooltip: 'Expected return on alternative investments'
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 25,
      tooltip: 'Your marginal tax rate for tax deductions'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      defaultValue: 10,
      tooltip: 'Time period for analysis'
    },
    {
      id: 'oneTimeMovingCosts',
      label: 'One-Time Moving Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Costs associated with moving'
    },
    {
      id: 'rentDeposit',
      label: 'Rent Deposit ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Security deposit for rental'
    },
    {
      id: 'mortgagePoints',
      label: 'Mortgage Points ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Points paid to lower interest rate'
    },
    {
      id: 'mortgageOriginationFees',
      label: 'Mortgage Origination Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Loan origination fees'
    }
  ],

  outputs: [
    {
      id: 'monthlyOwnershipCost',
      label: 'Monthly Ownership Cost',
      type: 'currency',
      explanation: 'Total monthly cost of homeownership'
    },
    {
      id: 'monthlyRentCost',
      label: 'Monthly Rent Cost',
      type: 'currency',
      explanation: 'Average monthly rent cost over analysis period'
    },
    {
      id: 'monthlyCashFlowDifference',
      label: 'Monthly Cash Flow Difference',
      type: 'currency',
      explanation: 'Difference in monthly cash flow (rent - ownership)'
    },
    {
      id: 'totalOwnershipCost',
      label: 'Total Ownership Cost',
      type: 'currency',
      explanation: 'Total cost of ownership over analysis period'
    },
    {
      id: 'totalRentCost',
      label: 'Total Rent Cost',
      type: 'currency',
      explanation: 'Total cost of renting over analysis period'
    },
    {
      id: 'netCostDifference',
      label: 'Net Cost Difference',
      type: 'currency',
      explanation: 'Difference in total costs (ownership - rent)'
    },
    {
      id: 'homeEquityBuilt',
      label: 'Home Equity Built',
      type: 'currency',
      explanation: 'Equity accumulated through homeownership'
    },
    {
      id: 'investmentFromRentSavings',
      label: 'Investment from Rent Savings',
      type: 'currency',
      explanation: 'Investment growth from money saved by renting'
    },
    {
      id: 'netWealthDifference',
      label: 'Net Wealth Difference',
      type: 'currency',
      explanation: 'Difference in wealth accumulation'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to break even on ownership costs'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to break even on ownership costs'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of ownership vs renting decision'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Rate of return on homeownership investment'
    },
    {
      id: 'ownershipVsRentRatio',
      label: 'Ownership vs Rent Ratio',
      type: 'number',
      explanation: 'Ratio of ownership cost to rent cost'
    },
    {
      id: 'annualTaxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from ownership deductions'
    },
    {
      id: 'totalTaxSavings',
      label: 'Total Tax Savings',
      type: 'currency',
      explanation: 'Total tax savings over analysis period'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Impact of changing assumptions'
    },
    {
      id: 'conservativeScenario',
      label: 'Conservative Scenario',
      type: 'text',
      explanation: 'Analysis with conservative assumptions'
    },
    {
      id: 'expectedScenario',
      label: 'Expected Scenario',
      type: 'text',
      explanation: 'Analysis with expected assumptions'
    },
    {
      id: 'optimisticScenario',
      label: 'Optimistic Scenario',
      type: 'text',
      explanation: 'Analysis with optimistic assumptions'
    },
    {
      id: 'primaryRecommendation',
      label: 'Primary Recommendation',
      type: 'text',
      explanation: 'Overall recommendation based on analysis'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level',
      type: 'text',
      explanation: 'Confidence in the recommendation'
    },
    {
      id: 'keyFactors',
      label: 'Key Factors',
      type: 'text',
      explanation: 'Important factors influencing the decision'
    },
    {
      id: 'alternativeConsiderations',
      label: 'Alternative Considerations',
      type: 'text',
      explanation: 'Other factors to consider'
    },
    {
      id: 'yearlyBreakdown',
      label: 'Yearly Breakdown',
      type: 'text',
      explanation: 'Year-by-year cost and benefit analysis'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'text',
      explanation: 'Detailed breakdown of costs by category'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Urban Apartment vs Condo Purchase',
      description: 'Comparing renting an apartment vs buying a condo in a growing city',
      inputs: {
        propertyValue: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        monthlyRent: 2500,
        annualRentIncrease: 3,
        annualPropertyTaxes: 4800,
        annualHomeownersInsurance: 1200,
        monthlyHOAFees: 400,
        annualMaintenance: 1,
        closingCosts: 12000,
        expectedHomeAppreciation: 4,
        alternativeInvestmentReturn: 7,
        marginalTaxRate: 25,
        analysisPeriod: 10,
        oneTimeMovingCosts: 3000,
        rentDeposit: 2500,
        mortgagePoints: 2000,
        mortgageOriginationFees: 3000
      },
      expectedOutputs: {
        monthlyOwnershipCost: 2800,
        monthlyRentCost: 2500,
        breakEvenYears: 8.5,
        primaryRecommendation: 'Buy',
        confidenceLevel: 'Medium'
      }
    },
    {
      title: 'Suburban House vs Rental',
      description: 'Comparing renting vs buying a house in a stable suburban market',
      inputs: {
        propertyValue: 350000,
        downPayment: 70000,
        loanTerm: 30,
        interestRate: 6.0,
        monthlyRent: 2000,
        annualRentIncrease: 2.5,
        annualPropertyTaxes: 4200,
        annualHomeownersInsurance: 1000,
        monthlyHOAFees: 0,
        annualMaintenance: 1.5,
        closingCosts: 10000,
        expectedHomeAppreciation: 3,
        alternativeInvestmentReturn: 6,
        marginalTaxRate: 22,
        analysisPeriod: 7,
        oneTimeMovingCosts: 2000,
        rentDeposit: 2000,
        mortgagePoints: 1500,
        mortgageOriginationFees: 2500
      },
      expectedOutputs: {
        monthlyOwnershipCost: 2400,
        monthlyRentCost: 2000,
        breakEvenYears: 6.2,
        primaryRecommendation: 'Depends on circumstances',
        confidenceLevel: 'Low'
      }
    }
  ]
};