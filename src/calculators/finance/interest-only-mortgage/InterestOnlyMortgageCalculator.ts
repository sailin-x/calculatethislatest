import { Calculator } from '../../types';
import { InterestOnlyMortgageInputs, InterestOnlyMortgageOutputs } from './types';
import { calculateInterestOnlyMortgage } from './formulas';
import { validateInterestOnlyMortgageInputs } from './validation';

export const InterestOnlyMortgageCalculator: Calculator<InterestOnlyMortgageInputs, InterestOnlyMortgageOutputs> = {
  id: 'InterestOnlyMortgage',
  name: 'Interest-Only Mortgage Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate interest-only mortgage payments, costs, and financial implications',
  longDescription: `A comprehensive interest-only mortgage calculator that analyzes the financial implications of interest-only loan structures. This calculator evaluates monthly payments, total interest costs, principal reduction strategies, and the impact of payment adjustments. It includes payment schedule analysis, cost comparisons with traditional mortgages, and risk assessment to help borrowers understand the benefits and risks of interest-only financing.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Principal loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '300000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 1,
      max: 15,
      step: 0.125,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Total loan term in years',
      required: true,
      min: 5,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    interestOnlyPeriod: {
      type: 'number',
      label: 'Interest-Only Period (years)',
      description: 'Number of years for interest-only payments',
      required: true,
      min: 1,
      max: 20,
      step: 1,
      placeholder: '10'
    },
    
    // Payment Information
    paymentFrequency: {
      type: 'select',
      label: 'Payment Frequency',
      description: 'Frequency of payments',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Biweekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      placeholder: 'monthly'
    },
    additionalPrincipalPayment: {
      type: 'number',
      label: 'Additional Principal Payment ($)',
      description: 'Additional principal payment during interest-only period',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current property value',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '400000'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
      required: true,
      options: [
        { value: 'primary_residence', label: 'Primary Residence' },
        { value: 'secondary_home', label: 'Secondary Home' },
        { value: 'investment_property', label: 'Investment Property' }
      ],
      placeholder: 'primary_residence'
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Annual Income ($)',
      description: 'Annual income of the borrower',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '80000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'FICO credit score',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'DebtToIncome Ratio (%)',
      description: 'Current DebtToIncome ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '35'
    },
    
    // Fees and Costs
    originationFee: {
      type: 'number',
      label: 'Origination Fee ($)',
      description: 'Loan origination fee',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1500'
    },
    appraisalFee: {
      type: 'number',
      label: 'Appraisal Fee ($)',
      description: 'Property appraisal cost',
      required: true,
      min: 0,
      max: 1000,
      step: 50,
      placeholder: '400'
    },
    titleInsuranceFee: {
      type: 'number',
      label: 'Title Insurance ($)',
      description: 'Title insurance premium',
      required: true,
      min: 0,
      max: 2000,
      step: 100,
      placeholder: '800'
    },
    recordingFee: {
      type: 'number',
      label: 'Recording Fee ($)',
      description: 'Document recording fees',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '150'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Additional fees and costs',
      required: true,
      min: 0,
      max: 2000,
      step: 100,
      placeholder: '500'
    },
    
    // Tax Information
    taxRate: {
      type: 'number',
      label: 'Tax Rate (%)',
      description: 'Applicable tax rate for interest deductions',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25'
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
    
    // Market Information
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market conditions',
      required: true,
      options: [
        { value: 'appreciating', label: 'Appreciating' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ],
      placeholder: 'stable'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0'
    },
    
    // Risk Factors
    marketRisk: {
      type: 'select',
      label: 'Market Risk',
      description: 'Level of market risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    paymentShockRisk: {
      type: 'select',
      label: 'Payment Shock Risk',
      description: 'Risk of payment shock after interest-only period',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for financial analysis',
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
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for present value calculations',
      required: true,
      min: 1,
      max: 20,
      step: 0.5,
      placeholder: '8.0'
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
    interestOnlyPayment: {
      type: 'number',
      label: 'Interest-Only Payment',
      description: 'Monthly interest-only payment'
    },
    fullyAmortizedPayment: {
      type: 'number',
      label: 'Fully Amortized Payment',
      description: 'Monthly payment after interest-only period'
    },
    paymentIncrease: {
      type: 'number',
      label: 'Payment Increase',
      description: 'Increase in payment after interest-only period'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over loan term'
    },
    principalBalance: {
      type: 'number',
      label: 'Principal Balance',
      description: 'Remaining principal after interest-only period'
    },
    loanToValueRatio: {
      type: 'number',
      label: 'LoanToValue Ratio',
      description: 'Current LoanToValue ratio'
    },
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk assessment score (1-10)'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive mortgage analysis'
    }
  },
  
  calculate: (inputs: InterestOnlyMortgageInputs): InterestOnlyMortgageOutputs => {
    const validation = validateInterestOnlyMortgageInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateInterestOnlyMortgage(inputs);
  },
  
  generateReport: (inputs: InterestOnlyMortgageInputs, outputs: InterestOnlyMortgageOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Interest-Only Mortgage Analysis Report

## Executive Summary
- **Mortgage Rating**: ${analysis.mortgageRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Interest-Only Payment**: $${outputs.interestOnlyPayment.toLocaleString()}
- **Fully Amortized Payment**: $${outputs.fullyAmortizedPayment.toLocaleString()}
- **Payment Increase**: $${outputs.paymentIncrease.toLocaleString()}
- **Total Interest Paid**: $${outputs.totalInterestPaid.toLocaleString()}
- **Principal Balance**: $${outputs.principalBalance.toLocaleString()}
- **LoanToValue Ratio**: ${outputs.loanToValueRatio.toFixed(2)}%
- **Risk Score**: ${outputs.riskScore}/10

## Analysis
${analysis.mortgageSummary}

## Risk Assessment
${analysis.riskAssessment}

## Recommendations
${analysis.recommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Interest-Only Payment': 'Loan Amount × Monthly Interest Rate',
    'Fully Amortized Payment': 'Standard amortization formula after interest-only period',
    'Payment Increase': 'Fully Amortized Payment - Interest-Only Payment',
    'Total Interest Paid': 'Sum of all interest payments over loan term',
    'Principal Balance': 'Original loan amount (no principal reduction during interest-only period)',
    'LoanToValue Ratio': 'Loan Amount / Property Value × 100',
    'Risk Score': 'Weighted assessment of payment shock, market, and financial risks'
  },
  
  examples: [
    {
      name: 'Standard Interest-Only Mortgage',
      inputs: {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        interestOnlyPeriod: 10,
        paymentFrequency: 'monthly',
        additionalPrincipalPayment: 0,
        propertyValue: 400000,
        propertyType: 'primary_residence',
        borrowerIncome: 80000,
        borrowerCreditScore: 720,
        borrowerDebtToIncomeRatio: 35,
        originationFee: 1500,
        appraisalFee: 400,
        titleInsuranceFee: 800,
        recordingFee: 150,
        otherFees: 500,
        taxRate: 25,
        propertyTaxRate: 1.2,
        marketCondition: 'stable',
        propertyAppreciationRate: 3.0,
        marketRisk: 'medium',
        paymentShockRisk: 'medium',
        analysisPeriod: 10,
        inflationRate: 2.5,
        discountRate: 8.0,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'interest-only mortgage',
    'mortgage calculator',
    'loan payments',
    'real estate',
    'financing',
    'payment shock',
    'mortgage risk',
    'loan analysis',
    'principal reduction',
    'mortgage comparison'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
