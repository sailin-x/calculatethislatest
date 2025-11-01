import { Calculator } from '../../types/calculator';
import { calculateLeaseBuyout, generateBuyoutAnalysis } from './formulas';
import { validateLeaseBuyoutInputs } from './validation';

export const CommercialLeaseBuyoutCalculator: Calculator = {
  id: 'CommercialLeaseBuyout-calculator',
  name: 'Commercial Lease Buyout Calculator',
  category: 'finance',
  subcategory: 'business',
  description: 'Calculate commercial lease buyout options, purchase price, financing terms, and investment analysis.',
  
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the commercial property',
      placeholder: '2500000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'buyoutPrice',
      name: 'Buyout Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Purchase price for the lease buyout',
      placeholder: '2200000',
      min: 50000,
      max: 100000000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial cash investment for the buyout',
      placeholder: '550000',
      min: 25000,
      max: 20000000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Commercial mortgage loan amount',
      placeholder: '1650000',
      min: 25000,
      max: 80000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on the commercial loan',
      placeholder: '5.5',
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Length of the commercial mortgage in years',
      placeholder: '25',
      min: 5,
      max: 30
    },
    {
      id: 'currentRent',
      name: 'Current Rent',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Current monthly rent being paid',
      placeholder: '15000',
      min: 500,
      max: 500000
    },
    {
      id: 'marketRent',
      name: 'Market Rent',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Current market rent for similar properties',
      placeholder: '18000',
      min: 500,
      max: 500000
    },
    {
      id: 'remainingLeaseTerm',
      name: 'Remaining Lease Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Years remaining on current lease',
      placeholder: '5',
      min: 1,
      max: 20
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Total closing costs for the purchase',
      placeholder: '75000',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property tax',
      placeholder: '45000',
      min: 0,
      max: 1000000,
      default: 0
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property insurance',
      placeholder: '18000',
      min: 0,
      max: 500000,
      default: 0
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual maintenance and repairs',
      placeholder: '36000',
      min: 0,
      max: 1000000,
      default: 0
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Property management fee percentage',
      placeholder: '5.0',
      min: 0,
      max: 15,
      default: 5.0
    },
    {
      id: 'hoaFees',
      name: 'HOA/Condo Fees',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual HOA or condo association fees',
      placeholder: '0',
      min: 0,
      max: 200000,
      default: 0
    },
    {
      id: 'otherExpenses',
      name: 'Other Expenses',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Other annual expenses',
      placeholder: '12000',
      min: 0,
      max: 500000,
      default: 0
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      min: -10,
      max: 15,
      default: 3.0
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      default: 2.5
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Your marginal tax rate for deductions',
      placeholder: '25.0',
      min: 0,
      max: 50,
      default: 25.0
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: false,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Space' },
        { value: 'industrial', label: 'Industrial/Warehouse' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'other', label: 'Other' }
      ],
      default: 'office'
    }
  ],
  
  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly principal and interest payment'
    },
    {
      id: 'totalCashInvested',
      name: 'Total Cash Invested',
      type: 'number',
      unit: 'USD',
      description: 'Total cash required (down payment + closing costs)'
    },
    {
      id: 'monthlyExpenses',
      name: 'Monthly Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total monthly operating expenses'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income (NOI)',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net monthly cash flow'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net annual cash flow'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate (NOI / Property Value)'
    },
    {
      id: 'cashOnCashReturn',
      name: 'CashOnCash Return',
      type: 'number',
      unit: '%',
      description: 'Annual return on cash investment'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total annual return including appreciation'
    },
    {
      id: 'rentSavings',
      name: 'Rent Savings',
      type: 'number',
      unit: 'USD/month',
      description: 'Monthly savings compared to current rent'
    },
    {
      id: 'annualRentSavings',
      name: 'Annual Rent Savings',
      type: 'number',
      unit: 'USD',
      description: 'Annual savings compared to current rent'
    },
    {
      id: 'breakEvenMonths',
      name: 'Break-Even Months',
      type: 'number',
      unit: 'months',
      description: 'Months to break even on total cash invested'
    },
    {
      id: 'loanToValue',
      name: 'LoanToValue Ratio',
      type: 'number',
      unit: '%',
      description: 'Loan amount as percentage of property value'
    },
    {
      id: 'debtServiceCoverage',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: '',
      description: 'NOI divided by annual debt service'
    },
    {
      id: 'buyoutGrade',
      name: 'Buyout Grade',
      type: 'string',
      description: 'Assessment of buyout opportunity'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      description: 'Assessment of buyout risks'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Buyout recommendations and strategies'
    }
  ],
  
  calculate: (inputs: Record<string, any>): Record<string, any> => {
    // Validate inputs
    const validation = validateLeaseBuyoutInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }
    
    // Calculate lease buyout metrics
    const buyoutMetrics = calculateLeaseBuyout(inputs);
    
    // Generate analysis
    const analysis = generateBuyoutAnalysis(inputs, buyoutMetrics);
    
    return {
      monthlyPayment: buyoutMetrics.monthlyPayment,
      totalCashInvested: buyoutMetrics.totalCashInvested,
      monthlyExpenses: buyoutMetrics.monthlyExpenses,
      netOperatingIncome: buyoutMetrics.netOperatingIncome,
      monthlyCashFlow: buyoutMetrics.monthlyCashFlow,
      annualCashFlow: buyoutMetrics.annualCashFlow,
      capRate: buyoutMetrics.capRate,
      cashOnCashReturn: buyoutMetrics.cashOnCashReturn,
      totalReturn: buyoutMetrics.totalReturn,
      rentSavings: buyoutMetrics.rentSavings,
      annualRentSavings: buyoutMetrics.annualRentSavings,
      breakEvenMonths: buyoutMetrics.breakEvenMonths,
      loanToValue: buyoutMetrics.loanToValue,
      debtServiceCoverage: buyoutMetrics.debtServiceCoverage,
      buyoutGrade: analysis.buyoutGrade,
      riskAssessment: analysis.riskAssessment,
      recommendations: analysis.recommendations
    };
  },
  
  formulas: [
    {
      name: 'Net Operating Income (NOI)',
      formula: 'NOI = Market Rent - Total Operating Expenses',
      description: 'Measures property profitability before financing'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (NOI / Property Value) × 100',
      description: 'Measures unleveraged return on property value'
    },
    {
      name: 'CashOnCash Return',
      formula: 'CashOnCash = (Annual Cash Flow / Total Cash Invested) × 100',
      description: 'Measures annual return on cash investment'
    },
    {
      name: 'Rent Savings',
      formula: 'Rent Savings = Current Rent - Monthly Payment - Monthly Expenses',
      description: 'Calculates monthly savings compared to renting'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Total Cash Invested / Monthly Rent Savings',
      description: 'Calculates months to recover investment'
    }
  ],
  
  examples: [
    {
      name: 'Office Building Buyout',
      description: 'A business buying out their office lease to own the property',
      inputs: {
        propertyValue: 2500000,
        buyoutPrice: 2200000,
        downPayment: 550000,
        loanAmount: 1650000,
        interestRate: 5.5,
        loanTerm: 25,
        currentRent: 15000,
        marketRent: 18000,
        remainingLeaseTerm: 5,
        closingCosts: 75000,
        propertyTax: 45000,
        insurance: 18000,
        maintenance: 36000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 12000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        propertyType: 'office'
      },
      expectedOutputs: {
        monthlyPayment: 10120,
        totalCashInvested: 625000,
        monthlyExpenses: 11250,
        netOperatingIncome: 81000,
        monthlyCashFlow: -4360,
        annualCashFlow: -52320,
        capRate: 3.2,
        cashOnCashReturn: -8.4,
        totalReturn: -5.4,
        rentSavings: -6610,
        annualRentSavings: -79320,
        breakEvenMonths: 0,
        loanToValue: 66.0,
        debtServiceCoverage: 0.67
      }
    },
    {
      name: 'Retail Space Buyout',
      description: 'A retailer buying out their store lease with strong cash flow',
      inputs: {
        propertyValue: 1800000,
        buyoutPrice: 1600000,
        downPayment: 400000,
        loanAmount: 1200000,
        interestRate: 5.0,
        loanTerm: 25,
        currentRent: 12000,
        marketRent: 15000,
        remainingLeaseTerm: 3,
        closingCosts: 60000,
        propertyTax: 32000,
        insurance: 14000,
        maintenance: 28000,
        propertyManagement: 4.0,
        hoaFees: 0,
        otherExpenses: 8000,
        appreciationRate: 3.5,
        inflationRate: 2.5,
        taxRate: 25.0,
        propertyType: 'retail'
      },
      expectedOutputs: {
        monthlyPayment: 7010,
        totalCashInvested: 460000,
        monthlyExpenses: 7500,
        netOperatingIncome: 90000,
        monthlyCashFlow: 2490,
        annualCashFlow: 29880,
        capRate: 5.0,
        cashOnCashReturn: 6.5,
        totalReturn: 10.0,
        rentSavings: 2490,
        annualRentSavings: 29880,
        breakEvenMonths: 185.5,
        loanToValue: 66.7,
        debtServiceCoverage: 1.07
      }
    }
  ]
};
