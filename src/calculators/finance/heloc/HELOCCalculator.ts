import { Calculator } from '../../types';
import { HELOCInputs, HELOCOutputs } from './types';
import { calculateHELOC } from './formulas';
import { validateHELOCInputs } from './validation';

export const HELOCCalculator: Calculator<HELOCInputs, HELOCOutputs> = {
  id: 'heloc',
  name: 'HELOC (Home Equity Line of Credit) Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate HELOC terms, payments, and costs for home equity financing',
  longDescription: `A comprehensive HELOC calculator that analyzes home equity line of credit financing options. This calculator evaluates equity availability, payment structures, costs, and risks for homeowners seeking flexible credit lines secured by their property. It provides detailed analysis of combined LoanToValue ratios, payment schedules, cost comparisons, and risk assessment to help borrowers make informed decisions about HELOC financing.`,
  
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
    
    // HELOC Information
    helocAmount: {
      type: 'number',
      label: 'HELOC Amount ($)',
      description: 'Requested HELOC credit limit',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    helocRate: {
      type: 'number',
      label: 'HELOC Interest Rate (%)',
      description: 'Interest rate on HELOC',
      required: true,
      min: 2,
      max: 15,
      step: 0.125,
      placeholder: '6.5'
    },
    helocRateType: {
      type: 'select',
      label: 'HELOC Rate Type',
      description: 'Type of interest rate',
      required: true,
      options: [
        { value: 'variable', label: 'Variable' },
        { value: 'fixed', label: 'Fixed' },
        { value: 'introductory', label: 'Introductory' }
      ],
      placeholder: 'variable'
    },
    drawPeriod: {
      type: 'number',
      label: 'Draw Period (years)',
      description: 'Period during which funds can be drawn',
      required: true,
      min: 1,
      max: 15,
      step: 1,
      placeholder: '10'
    },
    repaymentPeriod: {
      type: 'number',
      label: 'Repayment Period (years)',
      description: 'Period for repaying the HELOC',
      required: true,
      min: 1,
      max: 20,
      step: 1,
      placeholder: '15'
    },
    minimumPayment: {
      type: 'number',
      label: 'Minimum Payment ($)',
      description: 'Minimum monthly payment amount',
      required: true,
      min: 0,
      max: 5000,
      step: 10,
      placeholder: '100'
    },
    minimumPaymentType: {
      type: 'select',
      label: 'Minimum Payment Type',
      description: 'Type of minimum payment required',
      required: true,
      options: [
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'percentage', label: 'Percentage of Balance' }
      ],
      placeholder: 'interest_only'
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
    annualFee: {
      type: 'number',
      label: 'Annual Fee ($)',
      description: 'Annual maintenance fee',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '50'
    },
    inactivityFee: {
      type: 'number',
      label: 'Inactivity Fee ($)',
      description: 'Fee for account inactivity',
      required: true,
      min: 0,
      max: 100,
      step: 10,
      placeholder: '25'
    },
    earlyClosureFee: {
      type: 'number',
      label: 'Early Closure Fee ($)',
      description: 'Fee for closing account early',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '100'
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
    
    // Usage Information
    intendedUse: {
      type: 'select',
      label: 'Intended Use',
      description: 'Primary purpose for HELOC funds',
      required: true,
      options: [
        { value: 'home_improvement', label: 'Home Improvement' },
        { value: 'debt_consolidation', label: 'Debt Consolidation' },
        { value: 'education', label: 'Education' },
        { value: 'emergency_fund', label: 'Emergency Fund' },
        { value: 'investment', label: 'Investment' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'home_improvement'
    },
    drawAmount: {
      type: 'number',
      label: 'Initial Draw Amount ($)',
      description: 'Amount to draw initially',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    drawFrequency: {
      type: 'select',
      label: 'Draw Frequency',
      description: 'Frequency of planned draws',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' },
        { value: 'as_needed', label: 'As Needed' }
      ],
      placeholder: 'as_needed'
    },
    repaymentStrategy: {
      type: 'select',
      label: 'Repayment Strategy',
      description: 'Planned repayment approach',
      required: true,
      options: [
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'balloon', label: 'Balloon Payment' },
        { value: 'custom', label: 'Custom' }
      ],
      placeholder: 'interest_only'
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
      description: 'Equity available for HELOC'
    },
    combinedLTV: {
      type: 'number',
      label: 'Combined LTV',
      description: 'Combined LoanToValue ratio'
    },
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Payment',
      description: 'Monthly HELOC payment'
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
  
  calculate: (inputs: HELOCInputs): HELOCOutputs => {
    const validation = validateHELOCInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHELOC(inputs);
  },
  
  generateReport: (inputs: HELOCInputs, outputs: HELOCOutputs): string => {
    const { analysis } = outputs;
    
    return `
# HELOC Analysis Report

## Executive Summary
- **HELOC Rating**: ${analysis.helocRating}
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
${analysis.helocSummary}

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
    'Available Equity': 'Available Equity = Total Equity × 0.85 (typical HELOC limit)',
    'Combined LTV': 'Combined LTV = (Current Mortgage + HELOC Amount) / Property Value × 100',
    'Monthly Payment': 'Monthly Payment = Outstanding Balance × Monthly Interest Rate',
    'Total Interest': 'Total Interest = Sum of all interest payments over the term',
    'Effective Interest Rate': 'EIR = [(1 + r/n)^n - 1] × 100 where r = nominal rate, n = number of compounding periods',
    'Risk Score': 'Weighted average of borrower, property, and market risk factors'
  },
  
  examples: [
    {
      name: 'Home Improvement HELOC',
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
        helocAmount: 100000,
        helocRate: 6.5,
        helocRateType: 'variable',
        drawPeriod: 10,
        repaymentPeriod: 15,
        minimumPayment: 100,
        minimumPaymentType: 'interest_only',
        borrowerCreditScore: 720,
        borrowerIncome: 80000,
        borrowerDebtToIncomeRatio: 35,
        borrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 5,
        originationFee: 500,
        appraisalFee: 400,
        titleInsuranceFee: 800,
        recordingFee: 150,
        annualFee: 50,
        inactivityFee: 25,
        earlyClosureFee: 100,
        otherFees: 200,
        intendedUse: 'home_improvement',
        drawAmount: 50000,
        drawFrequency: 'as_needed',
        repaymentStrategy: 'interest_only',
        marketCondition: 'stable',
        marketGrowthRate: 3.0,
        marketRisk: 'medium',
        propertyRisk: 'medium',
        borrowerRisk: 'medium',
        analysisPeriod: 10,
        inflationRate: 2.5,
        taxRate: 25,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'heloc',
    'home equity',
    'line of credit',
    'real estate',
    'financing',
    'equity',
    'mortgage',
    'borrowing',
    'credit line',
    'home improvement'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
