import { Calculator } from '../../../types/calculator';
import { calculateHardMoneyLoan, generateHardMoneyLoanAnalysis } from './formulas';
import { validateHardMoneyLoanInputs } from './validation';

export const HardMoneyLoanCalculator: Calculator = {
  id: 'hard-money-loan-calculator',
  name: 'Hard Money Loan Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate hard money loan terms, costs, and investment analysis for real estate projects including bridge financing, fix and flip, and construction loans.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total loan amount requested', placeholder: '300000', min: 10000, max: 10000000 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current or after-repair value of the property', placeholder: '400000', min: 10000, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate on the loan', placeholder: '12', min: 5, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'months', required: true, description: 'Duration of the loan in months', placeholder: '12', min: 3, max: 36 },
    { id: 'points', name: 'Points', type: 'number', unit: 'points', required: true, description: 'Loan origination points (1 point = 1% of loan)', placeholder: '3', min: 0, max: 10 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Cash down payment (if applicable)', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Additional closing costs and fees', placeholder: '5000', min: 0, max: 100000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property being financed', options: [
      { value: 'single-family', label: 'Single Family' },
      { value: 'multi-family', label: 'Multi Family' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'land', label: 'Land' },
      { value: 'mixed-use', label: 'Mixed Use' },
      { value: 'industrial', label: 'Industrial' }
    ] },
    { id: 'loanPurpose', name: 'Loan Purpose', type: 'select', required: true, description: 'Primary purpose of the loan', options: [
      { value: 'purchase', label: 'Property Purchase' },
      { value: 'refinance', label: 'Refinance' },
      { value: 'fix-and-flip', label: 'Fix and Flip' },
      { value: 'construction', label: 'Construction' },
      { value: 'bridge', label: 'Bridge Loan' },
      { value: 'cash-out', label: 'Cash Out' }
    ] },
    { id: 'propertyCondition', name: 'Property Condition', type: 'select', required: true, description: 'Current condition of the property', options: [
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'poor', label: 'Poor' },
      { value: 'needs-repair', label: 'Needs Repair' }
    ] },
    { id: 'location', name: 'Location', type: 'select', required: true, description: 'Property location type', options: [
      { value: 'urban', label: 'Urban' },
      { value: 'suburban', label: 'Suburban' },
      { value: 'rural', label: 'Rural' }
    ] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: true, description: 'Current market conditions', options: [
      { value: 'hot', label: 'Hot Market' },
      { value: 'stable', label: 'Stable Market' },
      { value: 'declining', label: 'Declining Market' }
    ] },
    { id: 'borrowerCredit', name: 'Borrower Credit Score', type: 'number', required: false, description: 'Borrower credit score (if applicable)', placeholder: '650', min: 300, max: 850 },
    { id: 'experienceLevel', name: 'Experience Level', type: 'select', required: false, description: 'Borrower experience in real estate', options: [
      { value: 'beginner', label: 'Beginner (0-2 years)' },
      { value: 'intermediate', label: 'Intermediate (3-5 years)' },
      { value: 'experienced', label: 'Experienced (5+ years)' },
      { value: 'professional', label: 'Professional Investor' }
    ] },
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: true, description: 'Planned exit strategy', options: [
      { value: 'sell', label: 'Sell Property' },
      { value: 'refinance', label: 'Refinance to Conventional' },
      { value: 'hold', label: 'Hold and Rent' },
      { value: 'flip', label: 'Quick Flip' }
    ] },
    { id: 'timeline', name: 'Project Timeline', type: 'number', unit: 'months', required: false, description: 'Expected project completion timeline', placeholder: '6', min: 1, max: 36 },
    { id: 'renovationBudget', name: 'Renovation Budget', type: 'number', unit: 'USD', required: false, description: 'Estimated renovation costs', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'afterRepairValue', name: 'After Repair Value (ARV)', type: 'number', unit: 'USD', required: false, description: 'Estimated value after repairs', placeholder: '450000', min: 10000, max: 10000000 },
    { id: 'monthlyExpenses', name: 'Monthly Expenses', type: 'number', unit: 'USD', required: false, description: 'Monthly property expenses during loan term', placeholder: '2000', min: 0, max: 100000 },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalty', type: 'number', unit: '%', required: false, description: 'Prepayment penalty percentage', placeholder: '2', min: 0, max: 10 },
    { id: 'lateFees', name: 'Late Payment Fees', type: 'number', unit: 'USD', required: false, description: 'Late payment fee amount', placeholder: '100', min: 0, max: 1000 },
    { id: 'extensionFees', name: 'Extension Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly extension fee if loan is extended', placeholder: '500', min: 0, max: 5000 },
    { id: 'appraisalFees', name: 'Appraisal Fees', type: 'number', unit: 'USD', required: false, description: 'Property appraisal costs', placeholder: '500', min: 0, max: 5000 },
    { id: 'titleFees', name: 'Title Fees', type: 'number', unit: 'USD', required: false, description: 'Title insurance and related fees', placeholder: '1000', min: 0, max: 10000 },
    { id: 'escrowFees', name: 'Escrow Fees', type: 'number', unit: 'USD', required: false, description: 'Escrow and closing service fees', placeholder: '500', min: 0, max: 5000 },
    { id: 'inspectionFees', name: 'Inspection Fees', type: 'number', unit: 'USD', required: false, description: 'Property inspection costs', placeholder: '300', min: 0, max: 2000 },
    { id: 'processingFees', name: 'Processing Fees', type: 'number', unit: 'USD', required: false, description: 'Loan processing and underwriting fees', placeholder: '1000', min: 0, max: 10000 },
    { id: 'wireFees', name: 'Wire Transfer Fees', type: 'number', unit: 'USD', required: false, description: 'Wire transfer and funding fees', placeholder: '50', min: 0, max: 500 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Applicable tax rate for deductions', placeholder: '25', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected inflation rate for analysis', placeholder: '3', min: 0, max: 10 }
  ],
  outputs: [
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly loan payment' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost including principal, interest, and fees' },
    { id: 'pointsCost', name: 'Points Cost', type: 'number', unit: 'USD', description: 'Cost of loan origination points' },
    { id: 'totalFees', name: 'Total Fees', type: 'number', unit: 'USD', description: 'Total closing costs and fees' },
    { id: 'loanToValue', name: 'Loan-to-Value (LTV)', type: 'number', unit: '%', description: 'Loan amount as percentage of property value' },
    { id: 'loanToCost', name: 'Loan-to-Cost (LTC)', type: 'number', unit: '%', description: 'Loan amount as percentage of total project cost' },
    { id: 'annualPercentageRate', name: 'Annual Percentage Rate (APR)', type: 'number', unit: '%', description: 'Effective annual interest rate including fees' },
    { id: 'effectiveRate', name: 'Effective Interest Rate', type: 'number', unit: '%', description: 'Effective interest rate including all costs' },
    { id: 'breakEvenMonths', name: 'Break-Even Months', type: 'number', description: 'Number of months to break even on investment' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Annual return on cash investment' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return (IRR)', type: 'number', unit: '%', description: 'Projected IRR on the investment' },
    { id: 'netPresentValue', name: 'Net Present Value (NPV)', type: 'number', unit: 'USD', description: 'Net present value of the investment' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Expected profit margin on the project' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk assessment score (1-10, lower is better)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (1-10, higher is better)' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum loan amount based on LTV/LTC limits' },
    { id: 'minDownPayment', name: 'Minimum Down Payment', type: 'number', unit: 'USD', description: 'Minimum required down payment' },
    { id: 'maxPropertyValue', name: 'Maximum Property Value', type: 'number', unit: 'USD', description: 'Maximum property value for this loan amount' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Expected monthly cash flow during loan term' },
    { id: 'totalCashFlow', name: 'Total Cash Flow', type: 'number', unit: 'USD', description: 'Total cash flow over loan term' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Equity build-up through principal payments' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Estimated tax benefits from interest deductions' },
    { id: 'inflationHedge', name: 'Inflation Hedge Score', type: 'number', description: 'Inflation protection score (1-10, higher is better)' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', description: 'Investment liquidity score (1-10, higher is better)' },
    { id: 'diversificationScore', name: 'Diversification Score', type: 'number', description: 'Portfolio diversification score (1-10, higher is better)' },
    { id: 'investmentGrade', name: 'Investment Grade', type: 'string', description: 'Overall investment grade assessment' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended action based on analysis' },
    { id: 'exitStrategyAnalysis', name: 'Exit Strategy Analysis', type: 'string', description: 'Analysis of planned exit strategy' },
    { id: 'timelineAnalysis', name: 'Timeline Analysis', type: 'string', description: 'Analysis of project timeline feasibility' },
    { id: 'riskFactors', name: 'Risk Factors', type: 'string', description: 'Key risk factors and mitigation strategies' },
    { id: 'optimizationOpportunities', name: 'Optimization Opportunities', type: 'string', description: 'Opportunities to optimize the loan structure' },
    { id: 'marketAnalysis', name: 'Market Analysis', type: 'string', description: 'Market condition analysis and impact' },
    { id: 'comparisonAnalysis', name: 'Comparison Analysis', type: 'string', description: 'Comparison with alternative financing options' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'string', description: 'Sensitivity analysis for key variables' },
    { id: 'hardMoneyLoanAnalysis', name: 'Hard Money Loan Analysis', type: 'string', description: 'Comprehensive hard money loan analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHardMoneyLoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHardMoneyLoanAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'P = L × (r × (1 + r)^n) / ((1 + r)^n - 1)',
      description: 'Where P = monthly payment, L = loan amount, r = monthly interest rate, n = number of payments'
    },
    {
      name: 'Loan-to-Value (LTV)',
      formula: 'LTV = (Loan Amount / Property Value) × 100',
      description: 'Percentage of property value financed by the loan'
    },
    {
      name: 'Loan-to-Cost (LTC)',
      formula: 'LTC = (Loan Amount / Total Project Cost) × 100',
      description: 'Percentage of total project cost financed by the loan'
    },
    {
      name: 'Annual Percentage Rate (APR)',
      formula: 'APR = ((Total Cost / Loan Amount)^(1/n) - 1) × 12 × 100',
      description: 'Effective annual interest rate including all fees and costs'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'CoC = (Net Annual Cash Flow / Total Cash Investment) × 100',
      description: 'Annual return on total cash invested in the project'
    },
    {
      name: 'Internal Rate of Return (IRR)',
      formula: 'IRR = Rate where NPV = 0',
      description: 'Discount rate that makes net present value equal to zero'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Total Investment / Monthly Cash Flow',
      description: 'Number of months to recover total investment'
    }
  ],
  examples: [
    {
      name: 'Fix and Flip Project',
      inputs: {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        timeline: 6,
        renovationBudget: 50000,
        afterRepairValue: 450000
      },
      description: 'Hard money loan for a fix and flip project with renovation budget and ARV consideration'
    },
    {
      name: 'Bridge Loan',
      inputs: {
        loanAmount: 500000,
        propertyValue: 650000,
        interestRate: 10,
        loanTerm: 6,
        points: 2,
        propertyType: 'single-family',
        loanPurpose: 'bridge',
        propertyCondition: 'good',
        location: 'urban',
        marketType: 'hot',
        exitStrategy: 'refinance',
        timeline: 6
      },
      description: 'Bridge loan for property purchase with quick refinance exit strategy'
    },
    {
      name: 'Construction Loan',
      inputs: {
        loanAmount: 800000,
        propertyValue: 1200000,
        interestRate: 14,
        loanTerm: 18,
        points: 4,
        propertyType: 'commercial',
        loanPurpose: 'construction',
        propertyCondition: 'needs-repair',
        location: 'urban',
        marketType: 'stable',
        exitStrategy: 'refinance',
        timeline: 18,
        renovationBudget: 200000,
        afterRepairValue: 1400000
      },
      description: 'Hard money construction loan for commercial property development'
    }
  ]
};
