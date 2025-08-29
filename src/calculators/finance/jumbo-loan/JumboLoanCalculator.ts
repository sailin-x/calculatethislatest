import { Calculator } from '../../types';
import { JumboLoanInputs, JumboLoanOutputs } from './types';
import { calculateJumboLoan } from './formulas';
import { validateJumboLoanInputs } from './validation';

export const JumboLoanCalculator: Calculator<JumboLoanInputs, JumboLoanOutputs> = {
  id: 'jumbo-loan',
  name: 'Jumbo Loan Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate jumbo loan payments, costs, and requirements for high-value properties',
  longDescription: `A comprehensive jumbo loan calculator that analyzes financing options for high-value properties exceeding conventional loan limits. This calculator evaluates jumbo loan requirements, premium costs, qualification criteria, and financial implications. It includes risk assessment, cost comparisons with conventional loans, qualification analysis, and comprehensive financial modeling to help borrowers understand jumbo loan financing options.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Principal loan amount',
      required: true,
      min: 500000,
      max: 10000000,
      step: 10000,
      placeholder: '800000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 1,
      max: 15,
      step: 0.125,
      placeholder: '7.0'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Loan term in years',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    loanType: {
      type: 'select',
      label: 'Loan Type',
      description: 'Type of jumbo loan',
      required: true,
      options: [
        { value: 'fixed_rate', label: 'Fixed Rate' },
        { value: 'adjustable_rate', label: 'Adjustable Rate' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' }
      ],
      placeholder: 'fixed_rate'
    },
    paymentType: {
      type: 'select',
      label: 'Payment Type',
      description: 'Type of payment structure',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      placeholder: 'principal_interest'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current property value',
      required: true,
      min: 500000,
      max: 20000000,
      step: 10000,
      placeholder: '1000000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Property address',
      required: true,
      placeholder: '123 Luxury Lane, City, State 12345'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'luxury', label: 'Luxury' }
      ],
      placeholder: 'single_family'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Square footage of the property',
      required: true,
      min: 1000,
      max: 20000,
      step: 100,
      placeholder: '4000'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '10'
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Annual Income ($)',
      description: 'Annual income of the borrower',
      required: true,
      min: 100000,
      max: 5000000,
      step: 1000,
      placeholder: '200000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'FICO credit score',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '750'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio (%)',
      description: 'Current debt-to-income ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '35'
    },
    borrowerEmploymentType: {
      type: 'select',
      label: 'Employment Type',
      description: 'Type of employment',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ],
      placeholder: 'employed'
    },
    borrowerEmploymentLength: {
      type: 'number',
      label: 'Employment Length (years)',
      description: 'Length of current employment',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '8'
    },
    borrowerAssets: {
      type: 'number',
      label: 'Borrower Assets ($)',
      description: 'Total assets of the borrower',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      placeholder: '500000'
    },
    borrowerLiquidity: {
      type: 'number',
      label: 'Borrower Liquidity ($)',
      description: 'Liquid assets available',
      required: true,
      min: 50000,
      max: 5000000,
      step: 10000,
      placeholder: '200000'
    },
    
    // Down Payment Information
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Down payment amount',
      required: true,
      min: 100000,
      max: 5000000,
      step: 10000,
      placeholder: '200000'
    },
    downPaymentPercentage: {
      type: 'number',
      label: 'Down Payment Percentage (%)',
      description: 'Down payment as percentage of property value',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      placeholder: '20'
    },
    downPaymentSource: {
      type: 'select',
      label: 'Down Payment Source',
      description: 'Source of down payment funds',
      required: true,
      options: [
        { value: 'savings', label: 'Savings' },
        { value: 'investment_sale', label: 'Investment Sale' },
        { value: 'gift', label: 'Gift' },
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'savings'
    },
    
    // Fees and Costs
    originationFee: {
      type: 'number',
      label: 'Origination Fee ($)',
      description: 'Loan origination fee',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '8000'
    },
    appraisalFee: {
      type: 'number',
      label: 'Appraisal Fee ($)',
      description: 'Property appraisal cost',
      required: true,
      min: 0,
      max: 2000,
      step: 50,
      placeholder: '600'
    },
    titleInsuranceFee: {
      type: 'number',
      label: 'Title Insurance ($)',
      description: 'Title insurance premium',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2000'
    },
    recordingFee: {
      type: 'number',
      label: 'Recording Fee ($)',
      description: 'Document recording fees',
      required: true,
      min: 0,
      max: 1000,
      step: 25,
      placeholder: '200'
    },
    attorneyFee: {
      type: 'number',
      label: 'Attorney Fee ($)',
      description: 'Legal fees',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '1500'
    },
    creditReportFee: {
      type: 'number',
      label: 'Credit Report Fee ($)',
      description: 'Credit report cost',
      required: true,
      min: 0,
      max: 100,
      step: 10,
      placeholder: '50'
    },
    floodCertificationFee: {
      type: 'number',
      label: 'Flood Certification ($)',
      description: 'Flood certification cost',
      required: true,
      min: 0,
      max: 100,
      step: 10,
      placeholder: '25'
    },
    taxServiceFee: {
      type: 'number',
      label: 'Tax Service Fee ($)',
      description: 'Tax service cost',
      required: true,
      min: 0,
      max: 200,
      step: 10,
      placeholder: '100'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Additional fees and costs',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1000'
    },
    
    // Jumbo Loan Specific
    jumboLimit: {
      type: 'number',
      label: 'Jumbo Loan Limit ($)',
      description: 'Conventional loan limit in the area',
      required: true,
      min: 400000,
      max: 2000000,
      step: 10000,
      placeholder: '726200'
    },
    jumboThreshold: {
      type: 'number',
      label: 'Jumbo Threshold ($)',
      description: 'Amount above which jumbo rates apply',
      required: true,
      min: 400000,
      max: 2000000,
      step: 10000,
      placeholder: '726200'
    },
    jumboPremium: {
      type: 'number',
      label: 'Jumbo Premium (%)',
      description: 'Additional rate premium for jumbo loans',
      required: true,
      min: 0,
      max: 2,
      step: 0.125,
      placeholder: '0.5'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Market location for analysis',
      required: true,
      placeholder: 'High-Cost Area'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market conditions',
      required: true,
      options: [
        { value: 'hot', label: 'Hot Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'declining', label: 'Declining Market' },
        { value: 'recovering', label: 'Recovering Market' }
      ],
      placeholder: 'stable'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected annual market growth',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '4.0'
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
    propertyRisk: {
      type: 'select',
      label: 'Property Risk',
      description: 'Level of property-specific risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    borrowerRisk: {
      type: 'select',
      label: 'Borrower Risk',
      description: 'Level of borrower risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'low'
    },
    loanRisk: {
      type: 'select',
      label: 'Loan Risk',
      description: 'Level of loan-specific risk',
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
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '4.0'
    },
    taxRate: {
      type: 'number',
      label: 'Tax Rate (%)',
      description: 'Applicable tax rate',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '35'
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
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Payment',
      description: 'Monthly mortgage payment'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over loan term'
    },
    effectiveInterestRate: {
      type: 'number',
      label: 'Effective Interest Rate',
      description: 'Effective annual interest rate'
    },
    totalFees: {
      type: 'number',
      label: 'Total Fees',
      description: 'Total fees and costs'
    },
    loanToValueRatio: {
      type: 'number',
      label: 'Loan-to-Value Ratio',
      description: 'Loan-to-value ratio percentage'
    },
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk assessment score (1-10)'
    },
    jumboPremium: {
      type: 'number',
      label: 'Jumbo Premium',
      description: 'Additional cost due to jumbo loan status'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive jumbo loan analysis'
    }
  },
  
  calculate: (inputs: JumboLoanInputs): JumboLoanOutputs => {
    const validation = validateJumboLoanInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateJumboLoan(inputs);
  },
  
  generateReport: (inputs: JumboLoanInputs, outputs: JumboLoanOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Jumbo Loan Analysis Report

## Executive Summary
- **Loan Rating**: ${analysis.loanRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Monthly Payment**: $${outputs.monthlyPayment.toLocaleString()}
- **Total Interest Paid**: $${outputs.totalInterestPaid.toLocaleString()}
- **Effective Interest Rate**: ${outputs.effectiveInterestRate.toFixed(2)}%
- **Total Fees**: $${outputs.totalFees.toLocaleString()}
- **Loan-to-Value Ratio**: ${outputs.loanToValueRatio.toFixed(2)}%
- **Risk Score**: ${outputs.riskScore}/10
- **Jumbo Premium**: $${outputs.jumboPremium.toLocaleString()}

## Analysis
${analysis.loanSummary}

## Risk Assessment
${analysis.riskAssessment}

## Recommendations
${analysis.approvalRecommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Monthly Payment': 'Standard mortgage payment formula with jumbo premium',
    'Total Interest Paid': 'Sum of all interest payments over loan term',
    'Effective Interest Rate': 'APR including jumbo premium and fees',
    'Total Fees': 'Sum of all origination, closing, and other fees',
    'Loan-to-Value Ratio': 'Loan Amount / Property Value × 100',
    'Risk Score': 'Weighted assessment of borrower, property, and market risks',
    'Jumbo Premium': 'Additional cost due to loan amount exceeding conventional limits'
  },
  
  examples: [
    {
      name: 'Standard Jumbo Loan',
      inputs: {
        loanAmount: 800000,
        interestRate: 7.0,
        loanTerm: 30,
        loanType: 'fixed_rate',
        paymentType: 'principal_interest',
        propertyValue: 1000000,
        propertyAddress: '123 Luxury Lane, City, State 12345',
        propertyType: 'single_family',
        propertySize: 4000,
        propertyAge: 10,
        borrowerIncome: 200000,
        borrowerCreditScore: 750,
        borrowerDebtToIncomeRatio: 35,
        borrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 8,
        borrowerAssets: 500000,
        borrowerLiquidity: 200000,
        downPayment: 200000,
        downPaymentPercentage: 20,
        downPaymentSource: 'savings',
        originationFee: 8000,
        appraisalFee: 600,
        titleInsuranceFee: 2000,
        recordingFee: 200,
        attorneyFee: 1500,
        creditReportFee: 50,
        floodCertificationFee: 25,
        taxServiceFee: 100,
        otherFees: 1000,
        jumboLimit: 726200,
        jumboThreshold: 726200,
        jumboPremium: 0.5,
        marketLocation: 'High-Cost Area',
        marketCondition: 'stable',
        marketGrowthRate: 4.0,
        marketRisk: 'medium',
        propertyRisk: 'medium',
        borrowerRisk: 'low',
        loanRisk: 'medium',
        analysisPeriod: 10,
        inflationRate: 2.5,
        propertyAppreciationRate: 4.0,
        taxRate: 35,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'jumbo loan',
    'mortgage calculator',
    'high-value property',
    'conventional loan limit',
    'jumbo premium',
    'luxury real estate',
    'mortgage financing',
    'loan qualification',
    'risk assessment',
    'financial analysis'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
