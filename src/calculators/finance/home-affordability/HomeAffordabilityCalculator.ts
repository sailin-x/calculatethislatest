import { Calculator } from '../../types';
import { HomeAffordabilityInputs, HomeAffordabilityOutputs } from './types';
import { calculateHomeAffordability } from './formulas';
import { validateHomeAffordabilityInputs } from './validation';

export const HomeAffordabilityCalculator: Calculator<HomeAffordabilityInputs, HomeAffordabilityOutputs> = {
  id: 'home-affordability',
  name: 'Home Affordability Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate maximum home price and affordability based on income, debt, and financial situation',
  longDescription: `A comprehensive home affordability calculator that determines the maximum home price a borrower can afford based on their income, debt, down payment, and financial situation. This calculator analyzes DebtToIncome ratios, housing expense ratios, cash flow, and market conditions to provide accurate affordability assessments. It includes stress testing, sensitivity analysis, and market comparisons to help borrowers make informed home buying decisions.`,
  
  inputs: {
    // Borrower Information
    annualIncome: {
      type: 'number',
      label: 'Annual Income ($)',
      description: 'Gross annual income',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '75000'
    },
    monthlyIncome: {
      type: 'number',
      label: 'Monthly Income ($)',
      description: 'Gross monthly income',
      required: true,
      min: 1000,
      max: 100000,
      step: 100,
      placeholder: '6250'
    },
    creditScore: {
      type: 'number',
      label: 'Credit Score',
      description: 'FICO credit score',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    employmentType: {
      type: 'select',
      label: 'Employment Type',
      description: 'Type of employment',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      placeholder: 'employed'
    },
    employmentLength: {
      type: 'number',
      label: 'Employment Length (years)',
      description: 'Length of current employment',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    
    // Financial Information
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Available down payment amount',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    downPaymentPercentage: {
      type: 'number',
      label: 'Down Payment Percentage (%)',
      description: 'Down payment as percentage of home price',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '20'
    },
    monthlyDebtPayments: {
      type: 'number',
      label: 'Monthly Debt Payments ($)',
      description: 'Total monthly debt payments excluding housing',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '500'
    },
    annualDebtPayments: {
      type: 'number',
      label: 'Annual Debt Payments ($)',
      description: 'Total annual debt payments excluding housing',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '6000'
    },
    debtToIncomeRatio: {
      type: 'number',
      label: 'DebtToIncome Ratio (%)',
      description: 'Current DebtToIncome ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '25'
    },
    frontEndRatio: {
      type: 'number',
      label: 'Front-End Ratio (%)',
      description: 'Housing expense to income ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '28'
    },
    backEndRatio: {
      type: 'number',
      label: 'Back-End Ratio (%)',
      description: 'Total debt to income ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '36'
    },
    
    // Assets and Savings
    liquidAssets: {
      type: 'number',
      label: 'Liquid Assets ($)',
      description: 'Cash and liquid investments',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '75000'
    },
    retirementSavings: {
      type: 'number',
      label: 'Retirement Savings ($)',
      description: 'Retirement account balances',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    otherAssets: {
      type: 'number',
      label: 'Other Assets ($)',
      description: 'Other valuable assets',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '25000'
    },
    totalAssets: {
      type: 'number',
      label: 'Total Assets ($)',
      description: 'Total net worth',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '200000'
    },
    
    // Market Information
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Current mortgage interest rate',
      required: true,
      min: 1,
      max: 15,
      step: 0.125,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Mortgage loan term',
      required: true,
      min: 10,
      max: 50,
      step: 5,
      placeholder: '30'
    },
    propertyTaxRate: {
      type: 'number',
      label: 'Property Tax Rate (%)',
      description: 'Annual property tax rate',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '1.2'
    },
    homeownersInsuranceRate: {
      type: 'number',
      label: 'Homeowners Insurance Rate (%)',
      description: 'Annual insurance rate',
      required: true,
      min: 0,
      max: 2,
      step: 0.1,
      placeholder: '0.5'
    },
    pmiRate: {
      type: 'number',
      label: 'PMI Rate (%)',
      description: 'Private mortgage insurance rate',
      required: true,
      min: 0,
      max: 2,
      step: 0.1,
      placeholder: '0.5'
    },
    hoaFees: {
      type: 'number',
      label: 'HOA Fees ($/month)',
      description: 'Monthly HOA fees',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '200'
    },
    
    // Location Information
    propertyLocation: {
      type: 'text',
      label: 'Property Location',
      description: 'City, State for market analysis',
      required: true,
      placeholder: 'Austin, TX'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market conditions',
      required: true,
      options: [
        { value: 'hot', label: 'Hot Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'buyer_market', label: 'Buyer Market' },
        { value: 'declining', label: 'Declining Market' }
      ],
      placeholder: 'stable'
    },
    medianHomePrice: {
      type: 'number',
      label: 'Median Home Price ($)',
      description: 'Median home price in the area',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000,
      placeholder: '350000'
    },
    averageDaysOnMarket: {
      type: 'number',
      label: 'Average Days on Market',
      description: 'Average days homes stay on market',
      required: true,
      min: 1,
      max: 365,
      step: 1,
      placeholder: '30'
    },
    
    // Loan Information
    loanType: {
      type: 'select',
      label: 'Loan Type',
      description: 'Type of mortgage loan',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ],
      placeholder: 'conventional'
    },
    maxLTV: {
      type: 'number',
      label: 'Max LTV (%)',
      description: 'Maximum LoanToValue ratio',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '80'
    },
    maxDTI: {
      type: 'number',
      label: 'Max DTI (%)',
      description: 'Maximum DebtToIncome ratio',
      required: true,
      min: 20,
      max: 60,
      step: 1,
      placeholder: '43'
    },
    maxFrontEndRatio: {
      type: 'number',
      label: 'Max Front-End Ratio (%)',
      description: 'Maximum housing expense ratio',
      required: true,
      min: 20,
      max: 50,
      step: 1,
      placeholder: '28'
    },
    
    // Additional Costs
    closingCosts: {
      type: 'number',
      label: 'Closing Costs ($)',
      description: 'Estimated closing costs',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '8000'
    },
    movingCosts: {
      type: 'number',
      label: 'Moving Costs ($)',
      description: 'Estimated moving expenses',
      required: true,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '2000'
    },
    emergencyFund: {
      type: 'number',
      label: 'Emergency Fund ($)',
      description: 'Required emergency fund',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '15000'
    },
    maintenanceReserve: {
      type: 'number',
      label: 'Maintenance Reserve ($)',
      description: 'Annual maintenance reserve',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '5000'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for affordability analysis',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected annual inflation rate',
      required: true,
      min: -5,
      max: 15,
      step: 0.5,
      placeholder: '2.5'
    },
    incomeGrowthRate: {
      type: 'number',
      label: 'Income Growth Rate (%)',
      description: 'Expected annual income growth',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.5'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'currency'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Include charts in the analysis report',
      required: true,
      placeholder: true
    }
  },
  
  outputs: {
    maxHomePrice: {
      type: 'number',
      label: 'Max Home Price',
      description: 'Maximum affordable home price'
    },
    maxLoanAmount: {
      type: 'number',
      label: 'Max Loan Amount',
      description: 'Maximum loan amount'
    },
    totalMonthlyPayment: {
      type: 'number',
      label: 'Total Monthly Payment',
      description: 'Total monthly housing payment'
    },
    affordabilityScore: {
      type: 'number',
      label: 'Affordability Score',
      description: 'Overall affordability score (1-10)'
    },
    riskLevel: {
      type: 'string',
      label: 'Risk Level',
      description: 'Affordability risk level'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive affordability analysis'
    }
  },
  
  calculate: (inputs: HomeAffordabilityInputs): HomeAffordabilityOutputs => {
    const validation = validateHomeAffordabilityInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHomeAffordability(inputs);
  },
  
  generateReport: (inputs: HomeAffordabilityInputs, outputs: HomeAffordabilityOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Home Affordability Analysis Report

## Executive Summary
- **Affordability Rating**: ${analysis.affordabilityRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Max Home Price**: $${outputs.maxHomePrice.toLocaleString()}
- **Max Loan Amount**: $${outputs.maxLoanAmount.toLocaleString()}
- **Total Monthly Payment**: $${outputs.totalMonthlyPayment.toLocaleString()}
- **Affordability Score**: ${outputs.affordabilityScore}/10
- **Risk Level**: ${outputs.riskLevel}

## Analysis
${analysis.affordabilitySummary}

## Risk Assessment
${analysis.riskAssessment}

## Recommendations
${analysis.actionRecommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Max Home Price': 'Based on income, debt, down payment, and lender requirements',
    'Max Loan Amount': 'Max Home Price - Down Payment',
    'Monthly Payment': 'Principal + Interest + Taxes + Insurance + PMI + HOA',
    'DTI Ratio': 'Total Monthly Debt / Monthly Income × 100',
    'Front-End Ratio': 'Housing Expenses / Monthly Income × 100',
    'Affordability Score': 'Weighted average of financial ratios and market factors'
  },
  
  examples: [
    {
      name: 'First-Time Homebuyer',
      inputs: {
        annualIncome: 75000,
        monthlyIncome: 6250,
        creditScore: 720,
        employmentType: 'employed',
        employmentLength: 5,
        downPayment: 50000,
        downPaymentPercentage: 20,
        monthlyDebtPayments: 500,
        annualDebtPayments: 6000,
        debtToIncomeRatio: 25,
        frontEndRatio: 28,
        backEndRatio: 36,
        liquidAssets: 75000,
        retirementSavings: 100000,
        otherAssets: 25000,
        totalAssets: 200000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTaxRate: 1.2,
        homeownersInsuranceRate: 0.5,
        pmiRate: 0.5,
        hoaFees: 200,
        propertyLocation: 'Austin, TX',
        marketCondition: 'stable',
        medianHomePrice: 350000,
        averageDaysOnMarket: 30,
        loanType: 'conventional',
        maxLTV: 80,
        maxDTI: 43,
        maxFrontEndRatio: 28,
        closingCosts: 8000,
        movingCosts: 2000,
        emergencyFund: 15000,
        maintenanceReserve: 5000,
        analysisPeriod: 10,
        inflationRate: 2.5,
        incomeGrowthRate: 3.0,
        propertyAppreciationRate: 3.5,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'home affordability',
    'mortgage',
    'real estate',
    'buying',
    'financing',
    'DebtToIncome',
    'housing',
    'purchase',
    'qualification',
    'budgeting'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
