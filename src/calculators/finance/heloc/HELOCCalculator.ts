import { Calculator } from '../../../types/calculator';
import { calculateHELOC, generateHELOCAnalysis } from './formulas';
import { validateHELOCInputs } from './validation';

export const HELOCCalculator: Calculator = {
  id: 'heloc-calculator',
  name: 'HELOC (Home Equity Line of Credit) Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate HELOC terms, payments, and borrowing capacity for home equity lines of credit including draw periods, repayment periods, and interest-only payments.',
  inputs: [
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the home', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'currentMortgageBalance', name: 'Current Mortgage Balance', type: 'number', unit: 'USD', required: true, description: 'Outstanding balance on existing mortgage', placeholder: '300000', min: 0, max: 10000000 },
    { id: 'requestedCreditLimit', name: 'Requested Credit Limit', type: 'number', unit: 'USD', required: true, description: 'Desired HELOC credit limit', placeholder: '100000', min: 1000, max: 1000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate on the HELOC', placeholder: '7.5', min: 1, max: 20 },
    { id: 'drawPeriod', name: 'Draw Period', type: 'number', unit: 'years', required: true, description: 'Length of draw period in years', placeholder: '10', min: 1, max: 30 },
    { id: 'repaymentPeriod', name: 'Repayment Period', type: 'number', unit: 'years', required: true, description: 'Length of repayment period in years', placeholder: '20', min: 1, max: 30 },
    { id: 'maxLTV', name: 'Maximum LTV', type: 'number', unit: '%', required: false, description: 'Maximum loan-to-value ratio allowed', placeholder: '85', min: 50, max: 95 },
    { id: 'maxCLTV', name: 'Maximum CLTV', type: 'number', unit: '%', required: false, description: 'Maximum combined loan-to-value ratio', placeholder: '90', min: 50, max: 95 },
    { id: 'annualFee', name: 'Annual Fee', type: 'number', unit: 'USD', required: false, description: 'Annual maintenance fee for the HELOC', placeholder: '50', min: 0, max: 1000 },
    { id: 'originationFee', name: 'Origination Fee', type: 'number', unit: 'USD', required: false, description: 'One-time origination fee', placeholder: '500', min: 0, max: 10000 },
    { id: 'appraisalFee', name: 'Appraisal Fee', type: 'number', unit: 'USD', required: false, description: 'Property appraisal cost', placeholder: '400', min: 0, max: 1000 },
    { id: 'titleFees', name: 'Title Fees', type: 'number', unit: 'USD', required: false, description: 'Title insurance and related fees', placeholder: '800', min: 0, max: 2000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Additional closing costs', placeholder: '1000', min: 0, max: 5000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Current debt-to-income ratio', placeholder: '35', min: 0, max: 100 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property', options: [
      { value: 'primary-residence', label: 'Primary Residence' },
      { value: 'second-home', label: 'Second Home' },
      { value: 'investment-property', label: 'Investment Property' }
    ] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: true, description: 'Occupancy status', options: [
      { value: 'owner-occupied', label: 'Owner Occupied' },
      { value: 'non-owner-occupied', label: 'Non-Owner Occupied' }
    ] },
    { id: 'propertyLocation', name: 'Property Location', type: 'select', required: true, description: 'Property location type', options: [
      { value: 'urban', label: 'Urban' },
      { value: 'suburban', label: 'Suburban' },
      { value: 'rural', label: 'Rural' }
    ] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: true, description: 'Current market conditions', options: [
      { value: 'hot', label: 'Hot Market' },
      { value: 'stable', label: 'Stable Market' },
      { value: 'declining', label: 'Declining Market' }
    ] },
    { id: 'purpose', name: 'Purpose', type: 'select', required: true, description: 'Primary purpose of the HELOC', options: [
      { value: 'home-improvement', label: 'Home Improvement' },
      { value: 'debt-consolidation', label: 'Debt Consolidation' },
      { value: 'education', label: 'Education' },
      { value: 'emergency-fund', label: 'Emergency Fund' },
      { value: 'investment', label: 'Investment' },
      { value: 'other', label: 'Other' }
    ] },
    { id: 'estimatedUsage', name: 'Estimated Usage', type: 'number', unit: '%', required: false, description: 'Estimated percentage of credit limit to be used', placeholder: '60', min: 0, max: 100 },
    { id: 'monthlyIncome', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Monthly household income', placeholder: '8000', min: 1000, max: 1000000 },
    { id: 'monthlyDebtPayments', name: 'Monthly Debt Payments', type: 'number', unit: 'USD', required: false, description: 'Total monthly debt payments excluding mortgage', placeholder: '1500', min: 0, max: 100000 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD/year', required: false, description: 'Annual property taxes', placeholder: '6000', min: 0, max: 100000 },
    { id: 'homeownersInsurance', name: 'Homeowners Insurance', type: 'number', unit: 'USD/year', required: false, description: 'Annual homeowners insurance premium', placeholder: '2400', min: 0, max: 100000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees if applicable', placeholder: '200', min: 0, max: 10000 },
    { id: 'minimumPayment', name: 'Minimum Payment', type: 'number', unit: '%', required: false, description: 'Minimum payment as percentage of outstanding balance', placeholder: '1.5', min: 0.5, max: 5 },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalty', type: 'number', unit: '%', required: false, description: 'Prepayment penalty percentage', placeholder: '0', min: 0, max: 5 },
    { id: 'lateFees', name: 'Late Payment Fees', type: 'number', unit: 'USD', required: false, description: 'Late payment fee amount', placeholder: '25', min: 0, max: 100 },
    { id: 'inactivityFee', name: 'Inactivity Fee', type: 'number', unit: 'USD', required: false, description: 'Fee for account inactivity', placeholder: '0', min: 0, max: 100 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Applicable tax rate for deductions', placeholder: '25', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected inflation rate for analysis', placeholder: '3', min: 0, max: 10 }
  ],
  outputs: [
    { id: 'availableEquity', name: 'Available Equity', type: 'number', unit: 'USD', description: 'Total available home equity' },
    { id: 'maxCreditLimit', name: 'Maximum Credit Limit', type: 'number', unit: 'USD', description: 'Maximum HELOC credit limit based on LTV/CLTV' },
    { id: 'approvedCreditLimit', name: 'Approved Credit Limit', type: 'number', unit: 'USD', description: 'Approved credit limit (lesser of requested or maximum)' },
    { id: 'currentLTV', name: 'Current LTV', type: 'number', unit: '%', description: 'Current loan-to-value ratio' },
    { id: 'proposedCLTV', name: 'Proposed CLTV', type: 'number', unit: '%', description: 'Proposed combined loan-to-value ratio' },
    { id: 'monthlyInterestOnly', name: 'Monthly Interest-Only Payment', type: 'number', unit: 'USD', description: 'Monthly interest-only payment during draw period' },
    { id: 'monthlyPrincipalInterest', name: 'Monthly P&I Payment', type: 'number', unit: 'USD', description: 'Monthly principal and interest payment during repayment period' },
    { id: 'totalFees', name: 'Total Fees', type: 'number', unit: 'USD', description: 'Total closing costs and fees' },
    { id: 'annualPercentageRate', name: 'Annual Percentage Rate (APR)', type: 'number', unit: '%', description: 'Effective annual interest rate including fees' },
    { id: 'effectiveRate', name: 'Effective Interest Rate', type: 'number', unit: '%', description: 'Effective interest rate including all costs' },
    { id: 'totalInterest', name: 'Total Interest Paid', type: 'number', unit: 'USD', description: 'Total interest paid over the life of the HELOC' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost including principal, interest, and fees' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage Ratio', type: 'number', description: 'Ratio of income to debt payments' },
    { id: 'paymentToIncome', name: 'Payment-to-Income Ratio', type: 'number', unit: '%', description: 'HELOC payment as percentage of income' },
    { id: 'breakEvenMonths', name: 'Break-Even Months', type: 'number', description: 'Number of months to break even on closing costs' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Estimated tax benefits from interest deductions' },
    { id: 'inflationHedge', name: 'Inflation Hedge Score', type: 'number', description: 'Inflation protection score (1-10, higher is better)' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', description: 'Liquidity score (1-10, higher is better)' },
    { id: 'flexibilityScore', name: 'Flexibility Score', type: 'number', description: 'Flexibility score (1-10, higher is better)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk assessment score (1-10, lower is better)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (1-10, higher is better)' },
    { id: 'maxBorrowingAmount', name: 'Maximum Borrowing Amount', type: 'number', unit: 'USD', description: 'Maximum amount that can be borrowed based on income and debt ratios' },
    { id: 'recommendedCreditLimit', name: 'Recommended Credit Limit', type: 'number', unit: 'USD', description: 'Recommended credit limit based on analysis' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow Impact', type: 'number', unit: 'USD', description: 'Impact on monthly cash flow' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow Impact', type: 'number', unit: 'USD', description: 'Impact on annual cash flow' },
    { id: 'equityUtilization', name: 'Equity Utilization', type: 'number', unit: '%', description: 'Percentage of available equity being utilized' },
    { id: 'costOfBorrowing', name: 'Cost of Borrowing', type: 'number', unit: '%', description: 'Effective cost of borrowing including all fees' },
    { id: 'investmentGrade', name: 'Investment Grade', type: 'string', description: 'Overall investment grade assessment' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended action based on analysis' },
    { id: 'purposeAnalysis', name: 'Purpose Analysis', type: 'string', description: 'Analysis of the intended use of funds' },
    { id: 'riskFactors', name: 'Risk Factors', type: 'string', description: 'Key risk factors and mitigation strategies' },
    { id: 'optimizationOpportunities', name: 'Optimization Opportunities', type: 'string', description: 'Opportunities to optimize the HELOC structure' },
    { id: 'marketAnalysis', name: 'Market Analysis', type: 'string', description: 'Market condition analysis and impact' },
    { id: 'comparisonAnalysis', name: 'Comparison Analysis', type: 'string', description: 'Comparison with alternative financing options' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'string', description: 'Sensitivity analysis for key variables' },
    { id: 'helocAnalysis', name: 'HELOC Analysis', type: 'string', description: 'Comprehensive HELOC analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHELOC(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHELOCAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Available Equity',
      formula: 'Available Equity = Home Value - Current Mortgage Balance',
      description: 'Total equity available in the home'
    },
    {
      name: 'Maximum Credit Limit',
      formula: 'Max Credit Limit = Home Value × Max CLTV - Current Mortgage Balance',
      description: 'Maximum HELOC amount based on combined loan-to-value ratio'
    },
    {
      name: 'Current LTV',
      formula: 'Current LTV = (Current Mortgage Balance / Home Value) × 100',
      description: 'Current loan-to-value ratio'
    },
    {
      name: 'Proposed CLTV',
      formula: 'Proposed CLTV = ((Current Mortgage Balance + HELOC Amount) / Home Value) × 100',
      description: 'Combined loan-to-value ratio after HELOC'
    },
    {
      name: 'Monthly Interest-Only Payment',
      formula: 'Monthly Interest = Outstanding Balance × (Interest Rate / 12)',
      description: 'Interest-only payment during draw period'
    },
    {
      name: 'Monthly P&I Payment',
      formula: 'P = L × (r × (1 + r)^n) / ((1 + r)^n - 1)',
      description: 'Principal and interest payment during repayment period'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = Monthly Income / Total Monthly Debt Payments',
      description: 'Ratio of income to debt service requirements'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Total Closing Costs / Monthly Interest Savings',
      description: 'Time to recover closing costs through interest savings'
    }
  ],
  examples: [
    {
      name: 'Home Improvement HELOC',
      inputs: {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 7.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        maxLTV: 85,
        maxCLTV: 90,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement',
        estimatedUsage: 80,
        monthlyIncome: 8000,
        monthlyDebtPayments: 1500
      },
      description: 'HELOC for home improvement projects with 80% utilization'
    },
    {
      name: 'Debt Consolidation HELOC',
      inputs: {
        homeValue: 400000,
        currentMortgageBalance: 250000,
        requestedCreditLimit: 50000,
        interestRate: 8.0,
        drawPeriod: 10,
        repaymentPeriod: 15,
        maxLTV: 80,
        maxCLTV: 85,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'urban',
        marketType: 'hot',
        purpose: 'debt-consolidation',
        estimatedUsage: 100,
        monthlyIncome: 6000,
        monthlyDebtPayments: 2000
      },
      description: 'HELOC for debt consolidation with full utilization'
    },
    {
      name: 'Emergency Fund HELOC',
      inputs: {
        homeValue: 600000,
        currentMortgageBalance: 350000,
        requestedCreditLimit: 75000,
        interestRate: 6.5,
        drawPeriod: 10,
        repaymentPeriod: 25,
        maxLTV: 85,
        maxCLTV: 90,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'emergency-fund',
        estimatedUsage: 20,
        monthlyIncome: 10000,
        monthlyDebtPayments: 1800
      },
      description: 'HELOC for emergency fund with low utilization'
    }
  ]
};
