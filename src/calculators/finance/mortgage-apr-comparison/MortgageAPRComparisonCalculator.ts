import { Calculator } from '../../../types/calculator';
import { calculateMortgageAPRComparison, generateMortgageAPRComparisonAnalysis } from './formulas';
import { validateMortgageAPRComparisonInputs } from './validation';

export const MortgageAPRComparisonCalculator: Calculator = {
  id: 'mortgage-apr-comparison-calculator',
  title: 'Mortgage APR Comparison Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare Annual Percentage Rates (APR) across different mortgage offers to find the true cost of borrowing, including interest rates, fees, and closing costs.',
  usageInstructions: [
    'Enter your loan amount and term',
    'Add mortgage offers with interest rates and fees',
    'Include property details for accurate comparison',
    'Review APR comparison and recommendations'
  ],
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', required: true, min: 10000, max: 10000000, placeholder: '400000', tooltip: 'Principal loan amount' },
    { id: 'loanTerm', label: 'Loan Term', type: 'number', required: true, min: 1, max: 50, placeholder: '30', tooltip: 'Loan term in years' },
    { id: 'propertyValue', label: 'Property Value', type: 'currency', required: false, min: 10000, max: 10000000, placeholder: '500000', tooltip: 'Property purchase price or value' },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', required: false, min: 0, max: 5000000, placeholder: '100000', tooltip: 'Down payment amount' },
    { id: 'propertyTax', label: 'Property Tax', type: 'currency', required: false, min: 0, max: 100000, placeholder: '6000', tooltip: 'Annual property tax' },
    { id: 'homeInsurance', label: 'Home Insurance', type: 'currency', required: false, min: 0, max: 10000, placeholder: '1200', tooltip: 'Annual home insurance premium' },
    { id: 'pmiRate', label: 'PMI Rate', type: 'percentage', required: false, min: 0, max: 5, placeholder: '0.5', tooltip: 'Private mortgage insurance rate' },
    { id: 'hoaFees', label: 'HOA Fees', type: 'currency', required: false, min: 0, max: 2000, placeholder: '200', tooltip: 'Monthly HOA fees' },
    { id: 'loanType', label: 'Loan Type', type: 'select', required: false, options: [
      { value: 'Conventional', label: 'Conventional' },
      { value: 'FHA', label: 'FHA' },
      { value: 'VA', label: 'VA' },
      { value: 'USDA', label: 'USDA' },
      { value: 'Jumbo', label: 'Jumbo' },
      { value: 'ARM', label: 'ARM' },
      { value: 'Interest-Only', label: 'Interest-Only' },
      { value: 'Balloon', label: 'Balloon' }
    ], placeholder: 'Select loan type', tooltip: 'Type of mortgage loan' },
    { id: 'occupancyType', label: 'Occupancy Type', type: 'select', required: false, options: [
      { value: 'Primary Residence', label: 'Primary Residence' },
      { value: 'Secondary Home', label: 'Secondary Home' },
      { value: 'Investment Property', label: 'Investment Property' }
    ], placeholder: 'Select occupancy type', tooltip: 'How the property will be occupied' },
    { id: 'creditScore', label: 'Credit Score', type: 'number', required: false, min: 300, max: 850, placeholder: '750', tooltip: 'Borrower credit score' },
    { id: 'debtToIncomeRatio', label: 'Debt-to-Income Ratio', type: 'percentage', required: false, min: 0, max: 100, placeholder: '36', tooltip: 'Borrower debt-to-income ratio' },
    { id: 'state', label: 'State', type: 'select', required: false, options: [
      { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
    ], placeholder: 'Select state', tooltip: 'Property state for tax calculations' },
    { id: 'propertyType', label: 'Property Type', type: 'select', required: false, options: [
      { value: 'Single Family Home', label: 'Single Family Home' },
      { value: 'Condo', label: 'Condo' },
      { value: 'Townhouse', label: 'Townhouse' },
      { value: 'Multi-Family', label: 'Multi-Family' },
      { value: 'Manufactured Home', label: 'Manufactured Home' },
      { value: 'Land', label: 'Land' }
    ], placeholder: 'Select property type', tooltip: 'Type of property' },
    { id: 'purchaseType', label: 'Purchase Type', type: 'select', required: false, options: [
      { value: 'Purchase', label: 'Purchase' },
      { value: 'Refinance', label: 'Refinance' },
      { value: 'Cash-Out Refinance', label: 'Cash-Out Refinance' },
      { value: 'Rate and Term Refinance', label: 'Rate and Term Refinance' }
    ], placeholder: 'Select purchase type', tooltip: 'Type of purchase transaction' },
    { id: 'lenderFees', label: 'Lender Fees', type: 'currency', required: false, min: 0, max: 10000, placeholder: '500', tooltip: 'Additional lender-specific fees' },
    { id: 'thirdPartyFees', label: 'Third-Party Fees', type: 'currency', required: false, min: 0, max: 10000, placeholder: '1500', tooltip: 'Third-party fees (appraisal, title, etc.)' },
    { id: 'prepaidItems', label: 'Prepaid Items', type: 'currency', required: false, min: 0, max: 20000, placeholder: '2000', tooltip: 'Prepaid items (escrow, insurance, etc.)' },
    { id: 'comparisonPeriod', label: 'Comparison Period', type: 'number', required: false, min: 1, max: 50, placeholder: '30', tooltip: 'Period for APR comparison' }
  ],
  outputs: [
    { id: 'aprComparison', label: 'APR Comparison', type: 'text', explanation: 'Detailed APR comparison across all offers' },
    { id: 'bestOffer', label: 'Best Offer', type: 'text', explanation: 'Offer with the lowest APR' },
    { id: 'monthlyPaymentComparison', label: 'Monthly Payment Comparison', type: 'text', explanation: 'Monthly payment comparison across offers' },
    { id: 'totalCostComparison', label: 'Total Cost Comparison', type: 'text', explanation: 'Total cost comparison over loan term' },
    { id: 'breakEvenAnalysis', label: 'Break-Even Analysis', type: 'text', explanation: 'Break-even analysis for refinancing scenarios' },
    { id: 'savingsAnalysis', label: 'Savings Analysis', type: 'text', explanation: 'Potential savings analysis' },
    { id: 'recommendations', label: 'Recommendations', type: 'text', explanation: 'Recommendations based on comparison' },
    { id: 'keyMetrics', label: 'Key Metrics', type: 'text', explanation: 'Key comparison metrics' },
    { id: 'aprAnalysis', label: 'APR Analysis', type: 'text', explanation: 'Comprehensive APR comparison analysis report' }
  ],

  formulas: [
    {
      id: 'apr-calculation',
      name: 'APR Calculation',
      description: 'Calculates the Annual Percentage Rate including all costs',
      calculate: (inputs: Record<string, any>) => {
        const { loanAmount, loanTerm, totalPayments, totalFees } = inputs;
        const totalFinanceCharge = totalPayments - loanAmount + totalFees;
        const apr = (totalFinanceCharge / loanAmount / loanTerm) * 100;
        return {
          outputs: { apr: Math.round(apr * 100) / 100 },
          explanation: `APR = ((${totalFinanceCharge} / ${loanAmount}) / ${loanTerm}) × 100 = ${Math.round(apr * 100) / 100}%`
        };
      }
    },
    {
      id: 'monthly-payment',
      name: 'Monthly Payment',
      description: 'Calculates monthly mortgage payment using amortization formula',
      calculate: (inputs: Record<string, any>) => {
        const { principal, monthlyRate, totalPayments } = inputs;
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
        return {
          outputs: { monthlyPayment: Math.round(monthlyPayment) },
          explanation: `Monthly Payment = ${principal} × (${monthlyRate}(1+${monthlyRate})^${totalPayments}) / ((1+${monthlyRate})^${totalPayments} - 1) = $${Math.round(monthlyPayment)}`
        };
      }
    },
    {
      id: 'break-even',
      name: 'Break-Even Point',
      description: 'Calculates months to break even on refinancing',
      calculate: (inputs: Record<string, any>) => {
        const { closingCosts, monthlySavings } = inputs;
        const breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
        return {
          outputs: { breakEvenMonths },
          explanation: `Break-Even = ${closingCosts} / ${monthlySavings} = ${breakEvenMonths} months`
        };
      }
    }
  ],
  examples: [
    {
      title: 'Conventional vs FHA Comparison',
      description: 'Compare two mortgage offers with different interest rates and fee structures',
      inputs: {
        loanAmount: 400000,
        loanTerm: 30,
        propertyValue: 500000,
        downPayment: 100000,
        propertyTax: 6000,
        homeInsurance: 1200,
        pmiRate: 0.5,
        hoaFees: 200,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 36,
        state: 'CA',
        propertyType: 'Single Family Home',
        purchaseType: 'Purchase',
        lenderFees: 500,
        thirdPartyFees: 1500,
        prepaidItems: 2000,
        comparisonPeriod: 30
      },
      expectedOutputs: {
        aprComparison: 'Bank B offers 6.58% APR vs Bank A\'s 6.72% APR',
        bestOffer: 'Bank B with $65 monthly savings',
        monthlyPaymentComparison: '$65 difference in monthly payments',
        totalCostComparison: '$23,400 total savings over 30 years',
        breakEvenAnalysis: 'Immediate savings with Bank B',
        savingsAnalysis: '$65 monthly, $780 annual, $23,400 total savings',
        recommendations: 'Bank B offers the best overall value with lower APR and total cost.',
        keyMetrics: 'Best APR: 6.58%, Monthly Savings: $65, Total Savings: $23,400',
        aprAnalysis: 'Bank B offers the most favorable terms with a 6.58% APR compared to Bank A\'s 6.72% APR. This results in $65 monthly savings and $23,400 total savings over the 30-year term.'
      }
    },
          {
        title: 'Refinance Comparison',
        description: 'Compare current loan with refinance options to find the best deal',
        inputs: {
          loanAmount: 350000,
          loanTerm: 30,
          propertyValue: 450000,
          propertyTax: 5400,
          homeInsurance: 1080,
          loanType: 'Conventional',
          occupancyType: 'Primary Residence',
          creditScore: 780,
          debtToIncomeRatio: 32,
          state: 'TX',
          propertyType: 'Single Family Home',
          purchaseType: 'Refinance',
          comparisonPeriod: 30
        },
        expectedOutputs: {
          aprComparison: 'Refinance Option B offers 5.95% APR vs current 7.5% APR',
          bestOffer: 'Refinance Option B with $404 monthly savings',
          monthlyPaymentComparison: '$404 difference in monthly payments',
          totalCostComparison: '$145,440 total savings over 30 years',
          breakEvenAnalysis: 'Breaks even in 15 months',
          savingsAnalysis: '$404 monthly, $4,848 annual, $145,440 total savings',
          recommendations: 'Refinance Option B offers the best long-term value with significant monthly and total savings.',
          keyMetrics: 'Best APR: 5.95%, Monthly Savings: $404, Total Savings: $145,440',
          aprAnalysis: 'Refinance Option B provides the most favorable terms with a 5.95% APR, resulting in $404 monthly savings and $145,440 total savings over 30 years.'
        }
      },
      {
        title: 'ARM vs Fixed Rate Comparison',
        description: 'Compare fixed-rate and adjustable-rate mortgage options',
        inputs: {
          loanAmount: 300000,
          loanTerm: 30,
          propertyValue: 375000,
          downPayment: 75000,
          propertyTax: 4500,
          homeInsurance: 900,
          loanType: 'Conventional',
          occupancyType: 'Primary Residence',
          creditScore: 760,
          debtToIncomeRatio: 35,
          state: 'FL',
          propertyType: 'Single Family Home',
          purchaseType: 'Purchase',
          comparisonPeriod: 30
        },
        expectedOutputs: {
          aprComparison: '5/1 ARM offers 5.65% APR vs Fixed Rate 6.89% APR',
          bestOffer: '5/1 ARM with $243 monthly savings',
          monthlyPaymentComparison: '$243 difference in monthly payments',
          totalCostComparison: '$87,480 total savings over 30 years',
          breakEvenAnalysis: 'Immediate savings with ARM',
          savingsAnalysis: '$243 monthly, $2,916 annual, $87,480 total savings',
          recommendations: 'The 5/1 ARM offers significant initial savings but consider the risk of rate increases after 5 years.',
          keyMetrics: 'Best APR: 5.65%, Monthly Savings: $243, Total Savings: $87,480',
          aprAnalysis: 'The 5/1 ARM offers a lower initial APR of 5.65% compared to the fixed rate option at 6.89%, providing $243 monthly savings.'
        }
      }
    ],
    validationRules: [
      {
        field: 'loanAmount',
        type: 'required',
        message: 'Loan amount is required',
        validator: (value: any) => value && value > 0
      },
      {
        field: 'loanTerm',
        type: 'required',
        message: 'Loan term is required',
        validator: (value: any) => value && value > 0
      },
      {
        field: 'loanAmount',
        type: 'range',
        message: 'Loan amount must be between $10,000 and $10,000,000',
        validator: (value: any) => value >= 10000 && value <= 10000000
      },
      {
        field: 'loanTerm',
        type: 'range',
        message: 'Loan term must be between 1 and 50 years',
        validator: (value: any) => value >= 1 && value <= 50
      }
    ]
  };