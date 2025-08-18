import { Calculator } from '../../../types/calculator';
import { calculateHomeAffordability, generateHomeAffordabilityAnalysis } from './formulas';
import { validateHomeAffordabilityInputs } from './validation';

export const HomeAffordabilityCalculator: Calculator = {
  id: 'home-affordability-calculator',
  name: 'Home Affordability Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate maximum home price you can afford based on income, debt, down payment, and other financial factors including DTI ratios and lender requirements.',
  inputs: [
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: true, description: 'Total annual household income', placeholder: '80000', min: 10000, max: 10000000 },
    { id: 'monthlyIncome', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Total monthly household income (auto-calculated if not provided)', placeholder: '6667', min: 833, max: 833333 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Amount available for down payment', placeholder: '40000', min: 0, max: 10000000 },
    { id: 'downPaymentPercent', name: 'Down Payment %', type: 'number', unit: '%', required: false, description: 'Down payment as percentage of home price', placeholder: '20', min: 0, max: 100 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual mortgage interest rate', placeholder: '6.5', min: 1, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Mortgage loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'monthlyDebtPayments', name: 'Monthly Debt Payments', type: 'number', unit: 'USD', required: false, description: 'Total monthly debt payments (credit cards, car loans, etc.)', placeholder: '500', min: 0, max: 100000 },
    { id: 'annualPropertyTaxes', name: 'Annual Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Estimated annual property taxes', placeholder: '3000', min: 0, max: 100000 },
    { id: 'annualHomeownersInsurance', name: 'Annual Homeowners Insurance', type: 'number', unit: 'USD', required: false, description: 'Estimated annual homeowners insurance', placeholder: '1200', min: 0, max: 50000 },
    { id: 'monthlyHoaFees', name: 'Monthly HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly homeowners association fees', placeholder: '200', min: 0, max: 5000 },
    { id: 'monthlyUtilities', name: 'Monthly Utilities', type: 'number', unit: 'USD', required: false, description: 'Estimated monthly utility costs', placeholder: '300', min: 0, max: 2000 },
    { id: 'monthlyMaintenance', name: 'Monthly Maintenance', type: 'number', unit: 'USD', required: false, description: 'Estimated monthly maintenance costs', placeholder: '200', min: 0, max: 5000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', unit: 'score', required: false, description: 'Credit score (affects interest rate and loan terms)', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Target DTI Ratio', type: 'number', unit: '%', required: false, description: 'Target debt-to-income ratio for qualification', placeholder: '43', min: 20, max: 50 },
    { id: 'frontEndDTI', name: 'Front-End DTI', type: 'number', unit: '%', required: false, description: 'Target front-end debt-to-income ratio', placeholder: '28', min: 20, max: 40 },
    { id: 'backEndDTI', name: 'Back-End DTI', type: 'number', unit: '%', required: false, description: 'Target back-end debt-to-income ratio', placeholder: '36', min: 25, max: 50 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: true, description: 'Type of mortgage loan', placeholder: 'conventional', options: ['conventional', 'fha', 'va', 'usda'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property being purchased', placeholder: 'single-family', options: ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property will be occupied', placeholder: 'primary-residence', options: ['primary-residence', 'second-home', 'investment-property'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Property location type', placeholder: 'urban', options: ['urban', 'suburban', 'rural'] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: false, description: 'Current real estate market conditions', placeholder: 'stable', options: ['hot', 'stable', 'declining'] },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%', required: false, description: 'Local property tax rate as percentage of home value', placeholder: '1.2', min: 0, max: 5 },
    { id: 'insuranceRate', name: 'Insurance Rate', type: 'number', unit: '%', required: false, description: 'Homeowners insurance rate as percentage of home value', placeholder: '0.5', min: 0, max: 2 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%', required: false, description: 'Private mortgage insurance rate (if applicable)', placeholder: '0.5', min: 0, max: 2 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Estimated closing costs', placeholder: '5000', min: 0, max: 50000 },
    { id: 'closingCostsPercent', name: 'Closing Costs %', type: 'number', unit: '%', required: false, description: 'Closing costs as percentage of home price', placeholder: '2', min: 0, max: 10 },
    { id: 'reserves', name: 'Required Reserves', type: 'number', unit: 'months', required: false, description: 'Number of months of payments required in reserves', placeholder: '6', min: 0, max: 24 },
    { id: 'emergencyFund', name: 'Emergency Fund', type: 'number', unit: 'USD', required: false, description: 'Additional emergency fund to maintain', placeholder: '10000', min: 0, max: 1000000 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate for cost projections', placeholder: '2.5', min: 0, max: 10 },
    { id: 'incomeGrowthRate', name: 'Income Growth Rate', type: 'number', unit: '%', required: false, description: 'Expected annual income growth rate', placeholder: '3', min: 0, max: 20 },
    { id: 'homeAppreciationRate', name: 'Home Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual home appreciation rate', placeholder: '3', min: 0, max: 15 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Marginal tax rate for tax benefit calculations', placeholder: '22', min: 0, max: 50 }
  ],
  outputs: [
    { id: 'maxHomePrice', name: 'Maximum Home Price', type: 'number', unit: 'USD', description: 'Maximum home price you can afford' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum loan amount you can qualify for' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly mortgage payment (P&I)' },
    { id: 'monthlyPropertyTaxes', name: 'Monthly Property Taxes', type: 'number', unit: 'USD', description: 'Monthly property tax payment' },
    { id: 'monthlyInsurance', name: 'Monthly Insurance', type: 'number', unit: 'USD', description: 'Monthly homeowners insurance payment' },
    { id: 'monthlyPMI', name: 'Monthly PMI', type: 'number', unit: 'USD', description: 'Monthly private mortgage insurance payment' },
    { id: 'monthlyHoaFees', name: 'Monthly HOA Fees', type: 'number', unit: 'USD', description: 'Monthly HOA fees' },
    { id: 'monthlyUtilities', name: 'Monthly Utilities', type: 'number', unit: 'USD', description: 'Monthly utility costs' },
    { id: 'monthlyMaintenance', name: 'Monthly Maintenance', type: 'number', unit: 'USD', description: 'Monthly maintenance costs' },
    { id: 'totalMonthlyPayment', name: 'Total Monthly Payment', type: 'number', unit: 'USD', description: 'Total monthly housing payment including all costs' },
    { id: 'frontEndDTI', name: 'Front-End DTI', type: 'number', unit: '%', description: 'Front-end debt-to-income ratio' },
    { id: 'backEndDTI', name: 'Back-End DTI', type: 'number', unit: '%', description: 'Back-end debt-to-income ratio' },
    { id: 'paymentToIncomeRatio', name: 'Payment-to-Income Ratio', type: 'number', unit: '%', description: 'Housing payment as percentage of income' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage', type: 'number', unit: 'ratio', description: 'Debt service coverage ratio' },
    { id: 'affordabilityScore', name: 'Affordability Score', type: 'number', unit: 'score', description: 'Overall affordability score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Risk assessment score (0-100)' },
    { id: 'comfortLevel', name: 'Comfort Level', type: 'string', description: 'Affordability comfort level assessment' },
    { id: 'recommendedHomePrice', name: 'Recommended Home Price', type: 'number', unit: 'USD', description: 'Recommended home price for comfortable affordability' },
    { id: 'recommendedDownPayment', name: 'Recommended Down Payment', type: 'number', unit: 'USD', description: 'Recommended down payment amount' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Monthly cash flow after housing expenses' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Annual cash flow after housing expenses' },
    { id: 'emergencyFundMonths', name: 'Emergency Fund Months', type: 'number', unit: 'months', description: 'Months of expenses covered by emergency fund' },
    { id: 'taxBenefits', name: 'Annual Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits from mortgage interest and property taxes' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years to break even on homeownership vs renting' },
    { id: 'totalCostOfOwnership', name: 'Total Cost of Ownership', type: 'number', unit: 'USD', description: 'Total cost of homeownership over loan term' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Projected equity build-up over 5 years' },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%', description: 'Projected return on home investment' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', unit: 'score', description: 'Liquidity assessment score (0-100)' },
    { id: 'flexibilityScore', name: 'Flexibility Score', type: 'number', unit: 'score', description: 'Financial flexibility score (0-100)' },
    { id: 'stabilityScore', name: 'Stability Score', type: 'number', unit: 'score', description: 'Financial stability score (0-100)' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended action based on affordability analysis' },
    { id: 'homeAffordabilityAnalysis', name: 'Home Affordability Analysis', type: 'string', description: 'Comprehensive affordability analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHomeAffordability(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHomeAffordabilityAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Maximum Home Price',
      description: 'Maximum home price based on income, debt, and lender requirements',
      formula: 'maxHomePrice = min(incomeBasedPrice, downPaymentBasedPrice, dtiBasedPrice)',
      variables: {
        incomeBasedPrice: 'Based on 28% front-end DTI rule',
        downPaymentBasedPrice: 'Based on available down payment and minimum down payment %',
        dtiBasedPrice: 'Based on 43% back-end DTI rule including all debts'
      }
    },
    {
      name: 'Monthly Payment Calculation',
      description: 'Standard mortgage payment formula',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      variables: {
        P: 'Monthly payment',
        L: 'Loan amount',
        c: 'Monthly interest rate (annual rate / 12)',
        n: 'Total number of payments (years * 12)'
      }
    },
    {
      name: 'Debt-to-Income Ratios',
      description: 'Front-end and back-end DTI calculations',
      formula: 'Front-end DTI = (Housing Payment / Monthly Income) * 100\nBack-end DTI = ((Housing Payment + Other Debts) / Monthly Income) * 100',
      variables: {
        'Housing Payment': 'Principal, interest, taxes, insurance, HOA, utilities, maintenance',
        'Other Debts': 'Credit cards, car loans, student loans, etc.',
        'Monthly Income': 'Gross monthly household income'
      }
    },
    {
      name: 'Affordability Score',
      description: 'Comprehensive affordability assessment',
      formula: 'Score = (Income Factor * 0.3) + (DTI Factor * 0.3) + (Cash Flow Factor * 0.2) + (Emergency Fund Factor * 0.2)',
      variables: {
        'Income Factor': 'Based on income level and stability',
        'DTI Factor': 'Based on debt-to-income ratios',
        'Cash Flow Factor': 'Based on monthly cash flow after housing',
        'Emergency Fund Factor': 'Based on emergency fund adequacy'
      }
    }
  ],
  examples: [
    {
      name: 'First-Time Homebuyer',
      description: 'Typical first-time homebuyer scenario with moderate income and savings',
      inputs: {
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyDebtPayments: 400,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      },
      expectedOutputs: {
        maxHomePrice: 250000,
        monthlyPayment: 1200,
        frontEndDTI: 25,
        backEndDTI: 35,
        affordabilityScore: 75
      }
    },
    {
      name: 'High-Income Buyer',
      description: 'High-income buyer with substantial down payment',
      inputs: {
        annualIncome: 150000,
        downPayment: 100000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyDebtPayments: 800,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      },
      expectedOutputs: {
        maxHomePrice: 600000,
        monthlyPayment: 2400,
        frontEndDTI: 20,
        backEndDTI: 30,
        affordabilityScore: 85
      }
    },
    {
      name: 'Conservative Buyer',
      description: 'Conservative buyer with high down payment and low debt',
      inputs: {
        annualIncome: 60000,
        downPayment: 50000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyDebtPayments: 200,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      },
      expectedOutputs: {
        maxHomePrice: 200000,
        monthlyPayment: 950,
        frontEndDTI: 20,
        backEndDTI: 25,
        affordabilityScore: 80
      }
    }
  ]
};
