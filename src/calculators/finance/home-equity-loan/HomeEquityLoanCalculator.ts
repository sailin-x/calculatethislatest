import { Calculator } from '../../types';
import { HomeEquityLoanInputs, HomeEquityLoanOutputs } from './types';
import { calculateHomeEquityLoan } from './formulas';
import { validateHomeEquityLoanInputs } from './validation';

export const HomeEquityLoanCalculator: Calculator<HomeEquityLoanInputs, HomeEquityLoanOutputs> = {
  id: 'HomeEquityLoan',
  name: 'Home Equity Loan Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate home equity loan terms, payments, and costs for property-based financing',
  longDescription: `A comprehensive home equity loan calculator that analyzes second mortgage financing options. This calculator evaluates equity availability, payment structures, costs, and risks for homeowners seeking additional financing secured by their property. It provides detailed analysis of combined LoanToValue ratios, payment schedules, cost comparisons, and risk assessment to help borrowers make informed decisions about home equity loan financing.`,
  
  inputs: {
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      placeholder: '500000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, City, State 12345'
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
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'single_family'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15'
    },
    propertyCondition: {
      type: 'select',
      label: 'Property Condition',
      description: 'Current condition of the property',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      placeholder: 'good'
    },
    
    // Current Mortgage Information
    currentMortgageBalance: {
      type: 'number',
      label: 'Current Mortgage Balance ($)',
      description: 'Outstanding balance on current mortgage',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '300000'
    },
    currentMortgageRate: {
      type: 'number',
      label: 'Current Mortgage Rate (%)',
      description: 'Interest rate on current mortgage',
      required: true,
      min: 0,
      max: 20,
      step: 0.125,
      placeholder: '4.5'
    },
    currentMortgagePayment: {
      type: 'number',
      label: 'Current Mortgage Payment ($)',
      description: 'Monthly payment on current mortgage',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1500'
    },
    mortgageType: {
      type: 'select',
      label: 'Mortgage Type',
      description: 'Type of current mortgage',
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
    
    // Home Equity Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Requested home equity loan amount',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Interest rate on home equity loan',
      required: true,
      min: 2,
      max: 15,
      step: 0.125,
      placeholder: '7.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Duration of the home equity loan',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '15'
    },
    paymentType: {
      type: 'select',
      label: 'Payment Type',
      description: 'Type of payment structure',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Payment' },
        { value: 'variable', label: 'Variable Payment' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      placeholder: 'fixed'
    },
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
    
    // Borrower Information
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'FICO credit score of the borrower',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
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
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'DebtToIncome Ratio (%)',
      description: 'Borrower\'s DebtToIncome ratio',
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
        { value: 'unemployed', label: 'Unemployed' }
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
      placeholder: '5'
    },
    
    // Fees and Costs
    originationFee: {
      type: 'number',
      label: 'Origination Fee ($)',
      description: 'Loan origination fee',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '500'
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
    attorneyFee: {
      type: 'number',
      label: 'Attorney Fee ($)',
      description: 'Legal fees',
      required: true,
      min: 0,
      max: 2000,
      step: 100,
      placeholder: '500'
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
      max: 100,
      step: 10,
      placeholder: '75'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Additional fees and costs',
      required: true,
      min: 0,
      max: 1000,
      step: 50,
      placeholder: '200'
    },
    
    // Loan Purpose
    loanPurpose: {
      type: 'select',
      label: 'Loan Purpose',
      description: 'Primary purpose for the loan',
      required: true,
      options: [
        { value: 'home_improvement', label: 'Home Improvement' },
        { value: 'debt_consolidation', label: 'Debt Consolidation' },
        { value: 'education', label: 'Education' },
        { value: 'medical', label: 'Medical' },
        { value: 'business', label: 'Business' },
        { value: 'investment', label: 'Investment' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'home_improvement'
    },
    purposeDescription: {
      type: 'text',
      label: 'Purpose Description',
      description: 'Detailed description of loan purpose',
      required: true,
      placeholder: 'Kitchen renovation and bathroom remodel'
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
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected annual market growth rate',
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
      placeholder: '15'
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
    totalEquity: {
      type: 'number',
      label: 'Total Equity',
      description: 'Total equity in the property'
    },
    availableEquity: {
      type: 'number',
      label: 'Available Equity',
      description: 'Equity available for home equity loan'
    },
    combinedLTV: {
      type: 'number',
      label: 'Combined LTV',
      description: 'Combined LoanToValue ratio'
    },
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Payment',
      description: 'Monthly home equity loan payment'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over the term'
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
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk assessment score (1-10)'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive analysis and recommendations'
    }
  },
  
  calculate: (inputs: HomeEquityLoanInputs): HomeEquityLoanOutputs => {
    const validation = validateHomeEquityLoanInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHomeEquityLoan(inputs);
  },
  
  generateReport: (inputs: HomeEquityLoanInputs, outputs: HomeEquityLoanOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Home Equity Loan Analysis Report

## Executive Summary
- **Loan Rating**: ${analysis.loanRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Total Equity**: $${outputs.totalEquity.toLocaleString()}
- **Available Equity**: $${outputs.availableEquity.toLocaleString()}
- **Combined LTV**: ${outputs.combinedLTV.toFixed(2)}%
- **Monthly Payment**: $${outputs.monthlyPayment.toLocaleString()}
- **Effective Interest Rate**: ${outputs.effectiveInterestRate.toFixed(2)}%
- **Total Fees**: $${outputs.totalFees.toLocaleString()}
- **Risk Score**: ${outputs.riskScore}/10

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
    'Total Equity': 'Total Equity = Property Value - Current Mortgage Balance',
    'Available Equity': 'Available Equity = Total Equity × 0.85 (typical limit)',
    'Combined LTV': 'Combined LTV = (Current Mortgage + Home Equity Loan) / Property Value × 100',
    'Monthly Payment': 'Monthly Payment = Loan Amount × Payment Factor',
    'Total Interest': 'Total Interest = (Monthly Payment × Number of Payments) - Loan Amount',
    'Effective Interest Rate': 'EIR = [(1 + r/n)^n - 1] × 100 where r = nominal rate, n = number of compounding periods',
    'Risk Score': 'Weighted average of borrower, property, and market risk factors'
  },
  
  examples: [
    {
      name: 'Home Improvement Loan',
      inputs: {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertyCondition: 'good',
        currentMortgageBalance: 300000,
        currentMortgageRate: 4.5,
        currentMortgagePayment: 1500,
        mortgageType: 'conventional',
        loanAmount: 100000,
        interestRate: 7.5,
        loanTerm: 15,
        paymentType: 'fixed',
        paymentFrequency: 'monthly',
        borrowerCreditScore: 720,
        borrowerIncome: 80000,
        borrowerDebtToIncomeRatio: 35,
        borrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 5,
        originationFee: 500,
        appraisalFee: 400,
        titleInsuranceFee: 800,
        recordingFee: 150,
        attorneyFee: 500,
        creditReportFee: 50,
        floodCertificationFee: 25,
        taxServiceFee: 75,
        otherFees: 200,
        loanPurpose: 'home_improvement',
        purposeDescription: 'Kitchen renovation and bathroom remodel',
        marketCondition: 'stable',
        marketGrowthRate: 3.0,
        marketRisk: 'medium',
        propertyRisk: 'medium',
        borrowerRisk: 'medium',
        analysisPeriod: 15,
        inflationRate: 2.5,
        taxRate: 25,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'home equity loan',
    'second mortgage',
    'real estate',
    'financing',
    'equity',
    'borrowing',
    'property',
    'loan',
    'home improvement',
    'debt consolidation'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
