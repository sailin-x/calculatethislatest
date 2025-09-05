import { Calculator } from '../../types';
import { MortgageRefinanceInputs, MortgageRefinanceOutputs } from './types';
import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';

export const MortgageRefinanceCalculator: Calculator<MortgageRefinanceInputs, MortgageRefinanceOutputs> = {
  id: 'mortgage-refinance',
  name: 'Mortgage Refinance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage refinance savings, costs, and break-even analysis',
  longDescription: `A comprehensive mortgage refinance calculator that analyzes refinance opportunities, costs, and benefits. This calculator evaluates current vs. new loan terms, calculates savings, break-even points, and ROI to help borrowers make informed refinance decisions. It includes detailed cost analysis, payment comparisons, and strategic recommendations for optimal refinance timing.`,
  
  inputs: {
    // Current Loan Information
    currentLoanAmount: {
      type: 'number',
      label: 'Current Loan Amount ($)',
      description: 'Original loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '400000'
    },
    currentInterestRate: {
      type: 'number',
      label: 'Current Interest Rate (%)',
      description: 'Current interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '7.5'
    },
    currentLoanTerm: {
      type: 'number',
      label: 'Current Loan Term (years)',
      description: 'Original loan term in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    currentLoanType: {
      type: 'select',
      label: 'Current Loan Type',
      description: 'Type of current mortgage loan',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      placeholder: 'conventional'
    },
    currentPaymentType: {
      type: 'select',
      label: 'Current Payment Type',
      description: 'Type of current mortgage payment',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      placeholder: 'principal_interest'
    },
    currentMonthlyPayment: {
      type: 'number',
      label: 'Current Monthly Payment ($)',
      description: 'Current monthly payment amount',
      required: true,
      min: 100,
      max: 50000,
      step: 10,
      placeholder: '2796'
    },
    currentRemainingTerm: {
      type: 'number',
      label: 'Current Remaining Term (years)',
      description: 'Years remaining on current loan',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '25'
    },
    currentPrincipalBalance: {
      type: 'number',
      label: 'Current Principal Balance ($)',
      description: 'Current outstanding principal balance',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '350000'
    },
    
    // New Loan Information
    newLoanAmount: {
      type: 'number',
      label: 'New Loan Amount ($)',
      description: 'New loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '350000'
    },
    newInterestRate: {
      type: 'number',
      label: 'New Interest Rate (%)',
      description: 'New interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '6.5'
    },
    newLoanTerm: {
      type: 'number',
      label: 'New Loan Term (years)',
      description: 'New loan term in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    newLoanType: {
      type: 'select',
      label: 'New Loan Type',
      description: 'Type of new mortgage loan',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      placeholder: 'conventional'
    },
    newPaymentType: {
      type: 'select',
      label: 'New Payment Type',
      description: 'Type of new mortgage payment',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      placeholder: 'principal_interest'
    },
    refinanceType: {
      type: 'select',
      label: 'Refinance Type',
      description: 'Type of refinance',
      required: true,
      options: [
        { value: 'rate_term', label: 'Rate & Term' },
        { value: 'cash_out', label: 'Cash Out' },
        { value: 'cash_in', label: 'Cash In' },
        { value: 'streamline', label: 'Streamline' },
        { value: 'fha_to_conventional', label: 'FHA to Conventional' }
      ],
      placeholder: 'rate_term'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 50000,
      max: 50000000,
      step: 1000,
      placeholder: '500000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full address of the property',
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
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'single_family'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Square footage of the property',
      required: true,
      min: 100,
      max: 50000,
      step: 100,
      placeholder: '2000'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '20'
    },
    
    // Refinance Costs
    closingCosts: {
      type: 'number',
      label: 'Closing Costs ($)',
      description: 'Total closing costs',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '5000'
    },
    originationFee: {
      type: 'number',
      label: 'Origination Fee ($)',
      description: 'Loan origination fee',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1000'
    },
    appraisalFee: {
      type: 'number',
      label: 'Appraisal Fee ($)',
      description: 'Property appraisal fee',
      required: true,
      min: 0,
      max: 2000,
      step: 50,
      placeholder: '500'
    },
    titleInsuranceFee: {
      type: 'number',
      label: 'Title Insurance Fee ($)',
      description: 'Title insurance fee',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '1000'
    },
    recordingFee: {
      type: 'number',
      label: 'Recording Fee ($)',
      description: 'Recording fee',
      required: true,
      min: 0,
      max: 1000,
      step: 25,
      placeholder: '200'
    },
    attorneyFee: {
      type: 'number',
      label: 'Attorney Fee ($)',
      description: 'Attorney fee',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '500'
    },
    creditReportFee: {
      type: 'number',
      label: 'Credit Report Fee ($)',
      description: 'Credit report fee',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '50'
    },
    floodCertificationFee: {
      type: 'number',
      label: 'Flood Certification Fee ($)',
      description: 'Flood certification fee',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '25'
    },
    taxServiceFee: {
      type: 'number',
      label: 'Tax Service Fee ($)',
      description: 'Tax service fee',
      required: true,
      min: 0,
      max: 500,
      step: 25,
      placeholder: '75'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Other miscellaneous fees',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '650'
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Income ($)',
      description: 'Annual income of the borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '120000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'Credit score of the borrower',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '750'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio',
      description: 'Debt-to-income ratio of the borrower',
      required: true,
      min: 0,
      max: 1,
      step: 0.01,
      placeholder: '0.36'
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
    borrowerTaxRate: {
      type: 'number',
      label: 'Borrower Tax Rate (%)',
      description: 'Effective tax rate of the borrower',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '25.0'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Geographic location of the market',
      required: true,
      placeholder: 'Los Angeles, CA'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market condition',
      required: true,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot' }
      ],
      placeholder: 'stable'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected market growth rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '4.0'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for analysis',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected inflation rate',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      placeholder: '3.0'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected property appreciation rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '4.0'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for present value calculations',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '6.0'
    },
    taxDeductionPeriod: {
      type: 'number',
      label: 'Tax Deduction Period (years)',
      description: 'Period for tax deduction analysis',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5'
    },
    
    // Refinance Goals
    refinanceGoal: {
      type: 'select',
      label: 'Refinance Goal',
      description: 'Primary goal of refinancing',
      required: true,
      options: [
        { value: 'lower_payment', label: 'Lower Payment' },
        { value: 'lower_rate', label: 'Lower Rate' },
        { value: 'cash_out', label: 'Cash Out' },
        { value: 'shorter_term', label: 'Shorter Term' },
        { value: 'remove_pmi', label: 'Remove PMI' },
        { value: 'consolidate_debt', label: 'Consolidate Debt' }
      ],
      placeholder: 'lower_payment'
    },
    targetMonthlySavings: {
      type: 'number',
      label: 'Target Monthly Savings ($)',
      description: 'Target monthly payment savings',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '200'
    },
    targetRate: {
      type: 'number',
      label: 'Target Rate (%)',
      description: 'Target interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '6.0'
    },
    cashOutAmount: {
      type: 'number',
      label: 'Cash Out Amount ($)',
      description: 'Amount to cash out',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations',
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
      description: 'Include charts in the analysis',
      required: true,
      placeholder: true
    }
  },
  
  outputs: {
    monthlyPaymentSavings: {
      type: 'number',
      label: 'Monthly Payment Savings ($)',
      description: 'Monthly payment savings from refinance',
      format: 'currency'
    },
    interestSavings: {
      type: 'number',
      label: 'Interest Savings ($)',
      description: 'Total interest savings',
      format: 'currency'
    },
    breakEvenMonths: {
      type: 'number',
      label: 'Break-Even Months',
      description: 'Months to break even on refinance costs',
      format: 'number'
    },
    netSavings: {
      type: 'number',
      label: 'Net Savings ($)',
      description: 'Net savings over analysis period',
      format: 'currency'
    },
    returnOnInvestment: {
      type: 'number',
      label: 'Return on Investment (%)',
      description: 'Return on investment from refinance',
      format: 'percentage'
    },
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Risk score (0-100)',
      format: 'number'
    },
    newMonthlyPayment: {
      type: 'number',
      label: 'New Monthly Payment ($)',
      description: 'New monthly payment amount',
      format: 'currency'
    },
    totalRefinanceCost: {
      type: 'number',
      label: 'Total Refinance Cost ($)',
      description: 'Total cost of refinancing',
      format: 'currency'
    },
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis of the refinance'
    }
  },
  
  calculate: calculateMortgageRefinance,
  validate: validateMortgageRefinanceInputs
};