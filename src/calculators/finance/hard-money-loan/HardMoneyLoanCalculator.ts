import { Calculator } from '../../types';
import { HardMoneyLoanInputs, HardMoneyLoanOutputs } from './types';
import { calculateHardMoneyLoan } from './formulas';
import { validateHardMoneyLoanInputs } from './validation';

export const HardMoneyLoanCalculator: Calculator<HardMoneyLoanInputs, HardMoneyLoanOutputs> = {
  id: 'HardMoneyLoan',
  name: 'Hard Money Loan Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate hard money loan terms, costs, and returns for real estate investments',
  longDescription: `A comprehensive hard money loan calculator that analyzes short-term, asset-based financing for real estate investments. This calculator evaluates loan terms, costs, returns, and risks for FixAndFlip, BuyAndHold, construction, and other real estate projects. It provides detailed analysis of LoanToValue ratios, CashOnCash returns, break-even analysis, and risk assessment to help investors and lenders make informed decisions about hard money financing.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount',
      description: 'Total loan amount requested',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '500000'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (months)',
      description: 'Duration of the loan in months',
      required: true,
      min: 3,
      max: 36,
      step: 1,
      placeholder: '12'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 5,
      max: 25,
      step: 0.25,
      placeholder: '12.5'
    },
    points: {
      type: 'number',
      label: 'Points (%)',
      description: 'Loan origination points',
      required: true,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '2.0'
    },
    originationFee: {
      type: 'number',
      label: 'Origination Fee ($)',
      description: 'Additional origination fee',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2500'
    },
    processingFee: {
      type: 'number',
      label: 'Processing Fee ($)',
      description: 'Loan processing fee',
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
      max: 2000,
      step: 50,
      placeholder: '400'
    },
    titleInsuranceFee: {
      type: 'number',
      label: 'Title Insurance ($)',
      description: 'Title insurance premium',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '1500'
    },
    escrowFee: {
      type: 'number',
      label: 'Escrow Fee ($)',
      description: 'Escrow and closing fees',
      required: true,
      min: 0,
      max: 3000,
      step: 100,
      placeholder: '800'
    },
    recordingFee: {
      type: 'number',
      label: 'Recording Fee ($)',
      description: 'Document recording fees',
      required: true,
      min: 0,
      max: 1000,
      step: 50,
      placeholder: '200'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Additional closing costs',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '300'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '600000'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property being financed',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'land', label: 'Land' },
        { value: 'mixed_use', label: 'Mixed Use' }
      ],
      placeholder: 'residential'
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
        { value: 'poor', label: 'Poor' },
        { value: 'needs_renovation', label: 'Needs Renovation' }
      ],
      placeholder: 'fair'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, City, State 12345'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total square footage of the property',
      required: true,
      min: 100,
      max: 100000,
      step: 100,
      placeholder: '2000'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '25'
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
      placeholder: '650'
    },
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Annual Income ($)',
      description: 'Annual income of the borrower',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '75000'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'DebtToIncome Ratio (%)',
      description: 'Borrower\'s DebtToIncome ratio',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '45'
    },
    borrowerLiquidity: {
      type: 'number',
      label: 'Borrower Liquidity ($)',
      description: 'Available cash and liquid assets',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    borrowerExperience: {
      type: 'select',
      label: 'Borrower Experience',
      description: 'Level of real estate investment experience',
      required: true,
      options: [
        { value: 'none', label: 'None' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'experienced', label: 'Experienced' },
        { value: 'expert', label: 'Expert' }
      ],
      placeholder: 'intermediate'
    },
    
    // Project Information
    projectType: {
      type: 'select',
      label: 'Project Type',
      description: 'Type of real estate project',
      required: true,
      options: [
        { value: 'fix_and_flip', label: 'Fix and Flip' },
        { value: 'buy_and_hold', label: 'Buy and Hold' },
        { value: 'construction', label: 'Construction' },
        { value: 'land_development', label: 'Land Development' },
        { value: 'refinance', label: 'Refinance' }
      ],
      placeholder: 'fix_and_flip'
    },
    projectTimeline: {
      type: 'number',
      label: 'Project Timeline (months)',
      description: 'Expected project completion time',
      required: true,
      min: 1,
      max: 36,
      step: 1,
      placeholder: '6'
    },
    renovationBudget: {
      type: 'number',
      label: 'Renovation Budget ($)',
      description: 'Estimated renovation costs',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    expectedARV: {
      type: 'number',
      label: 'Expected ARV ($)',
      description: 'Expected after-repair value',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '700000'
    },
    exitStrategy: {
      type: 'select',
      label: 'Exit Strategy',
      description: 'Planned exit strategy for the project',
      required: true,
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'rental', label: 'Rental' },
        { value: 'mixed', label: 'Mixed' }
      ],
      placeholder: 'sale'
    },
    
    // Market Information
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
    projectRisk: {
      type: 'select',
      label: 'Project Risk',
      description: 'Level of project execution risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    
    // Legal and Regulatory
    zoningCompliance: {
      type: 'boolean',
      label: 'Zoning Compliance',
      description: 'Property complies with zoning requirements',
      required: true,
      placeholder: true
    },
    environmentalIssues: {
      type: 'boolean',
      label: 'Environmental Issues',
      description: 'Any environmental issues present',
      required: true,
      placeholder: false
    },
    titleIssues: {
      type: 'boolean',
      label: 'Title Issues',
      description: 'Any title or ownership issues',
      required: true,
      placeholder: false
    },
    permitIssues: {
      type: 'boolean',
      label: 'Permit Issues',
      description: 'Any building or renovation permit issues',
      required: true,
      placeholder: false
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (months)',
      description: 'Period for financial analysis',
      required: true,
      min: 1,
      max: 60,
      step: 1,
      placeholder: '12'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Rate used for present value calculations',
      required: true,
      min: 1,
      max: 30,
      step: 0.5,
      placeholder: '10.0'
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
      description: 'Applicable tax rate for returns',
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
    totalLoanCost: {
      type: 'number',
      label: 'Total Loan Cost',
      description: 'Total cost of the loan including all fees'
    },
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Payment',
      description: 'Monthly loan payment amount'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over the loan term'
    },
    effectiveInterestRate: {
      type: 'number',
      label: 'Effective Interest Rate',
      description: 'Effective annual interest rate including fees'
    },
    loanToValueRatio: {
      type: 'number',
      label: 'LoanToValue Ratio',
      description: 'Ratio of loan amount to property value'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'CashOnCash Return',
      description: 'Annual return on cash invested'
    },
    internalRateOfReturn: {
      type: 'number',
      label: 'Internal Rate of Return',
      description: 'Projected IRR of the investment'
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
  
  calculate: (inputs: HardMoneyLoanInputs): HardMoneyLoanOutputs => {
    const validation = validateHardMoneyLoanInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHardMoneyLoan(inputs);
  },
  
  generateReport: (inputs: HardMoneyLoanInputs, outputs: HardMoneyLoanOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Hard Money Loan Analysis Report

## Executive Summary
- **Loan Rating**: ${analysis.loanRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Total Loan Cost**: $${outputs.totalLoanCost.toLocaleString()}
- **Monthly Payment**: $${outputs.monthlyPayment.toLocaleString()}
- **Effective Interest Rate**: ${outputs.effectiveInterestRate.toFixed(2)}%
- **LoanToValue Ratio**: ${outputs.loanToValueRatio.toFixed(2)}%
- **CashOnCash Return**: ${outputs.cashOnCashReturn.toFixed(2)}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn.toFixed(2)}%
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
    'Monthly Payment': 'P = L[c(1 + c)^n]/[(1 + c)^n - 1] where P = payment, L = loan amount, c = monthly interest rate, n = number of payments',
    'Total Interest': 'Total Interest = (Monthly Payment × Number of Payments) - Loan Amount',
    'Effective Interest Rate': 'EIR = [(1 + r/n)^n - 1] × 100 where r = nominal rate, n = number of compounding periods',
    'LoanToValue Ratio': 'LTV = (Loan Amount / Property Value) × 100',
    'CashOnCash Return': 'CoC = (Annual Cash Flow / Total Cash Invested) × 100',
    'Internal Rate of Return': 'IRR is the discount rate that makes NPV = 0',
    'Risk Score': 'Weighted average of borrower, property, market, and project risk factors'
  },
  
  examples: [
    {
      name: 'Fix and Flip Project',
      inputs: {
        loanAmount: 400000,
        loanTerm: 12,
        interestRate: 12.5,
        points: 2.0,
        originationFee: 2500,
        processingFee: 500,
        appraisalFee: 400,
        titleInsuranceFee: 1500,
        escrowFee: 800,
        recordingFee: 200,
        otherFees: 300,
        propertyValue: 500000,
        propertyType: 'residential',
        propertyCondition: 'fair',
        propertyAddress: '123 Main St, City, State 12345',
        propertySize: 2000,
        propertyAge: 25,
        borrowerCreditScore: 650,
        borrowerIncome: 75000,
        borrowerDebtToIncomeRatio: 45,
        borrowerLiquidity: 50000,
        borrowerExperience: 'intermediate',
        projectType: 'fix_and_flip',
        projectTimeline: 6,
        renovationBudget: 50000,
        expectedARV: 700000,
        exitStrategy: 'sale',
        marketCondition: 'stable',
        marketGrowthRate: 3.0,
        marketRisk: 'medium',
        propertyRisk: 'medium',
        borrowerRisk: 'medium',
        projectRisk: 'medium',
        zoningCompliance: true,
        environmentalIssues: false,
        titleIssues: false,
        permitIssues: false,
        analysisPeriod: 12,
        discountRate: 10.0,
        inflationRate: 2.5,
        taxRate: 25,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'hard money',
    'real estate',
    'short-term financing',
    'fix and flip',
    'investment',
    'loan analysis',
    'risk assessment',
    'cash flow',
    'returns',
    'property investment'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
