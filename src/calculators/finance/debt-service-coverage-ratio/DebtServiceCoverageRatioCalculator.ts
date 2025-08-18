import { Calculator } from '../../types/calculator';
import { calculateDSCR, generateDSCRAnalysis } from './formulas';
import { validateDSCRInputs } from './validation';

export const DebtServiceCoverageRatioCalculator: Calculator = {
  id: 'debt-service-coverage-ratio-calculator',
  name: 'Debt Service Coverage Ratio Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate debt service coverage ratio (DSCR) for real estate investments, including NOI analysis, debt service calculations, and lender requirements.',
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      unit: '',
      required: true,
      description: 'Type of real estate property',
      placeholder: 'Select property type',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail/Commercial' },
        { value: 'industrial', label: 'Industrial/Warehouse' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'self-storage', label: 'Self-Storage' }
      ]
    },
    {
      id: 'grossRentalIncome',
      name: 'Gross Rental Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total annual rental income from all units/tenants',
      placeholder: 'Enter gross rental income',
      min: 10000,
      max: 10000000
    },
    {
      id: 'otherIncome',
      name: 'Other Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Additional income (parking, laundry, vending, etc.)',
      placeholder: 'Enter other income',
      min: 0,
      max: 1000000
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected vacancy rate as a percentage',
      placeholder: 'Enter vacancy rate',
      min: 0,
      max: 50
    },
    {
      id: 'propertyTaxes',
      name: 'Property Taxes',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property taxes',
      placeholder: 'Enter property taxes',
      min: 0,
      max: 500000
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property insurance costs',
      placeholder: 'Enter insurance costs',
      min: 0,
      max: 200000
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual utility costs (electric, water, gas, etc.)',
      placeholder: 'Enter utility costs',
      min: 0,
      max: 300000
    },
    {
      id: 'maintenance',
      name: 'Maintenance & Repairs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual maintenance and repair costs',
      placeholder: 'Enter maintenance costs',
      min: 0,
      max: 400000
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property management fees',
      placeholder: 'Enter management fees',
      min: 0,
      max: 300000
    },
    {
      id: 'landscaping',
      name: 'Landscaping & Grounds',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual landscaping and grounds maintenance',
      placeholder: 'Enter landscaping costs',
      min: 0,
      max: 100000
    },
    {
      id: 'janitorial',
      name: 'Janitorial Services',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual janitorial and cleaning services',
      placeholder: 'Enter janitorial costs',
      min: 0,
      max: 150000
    },
    {
      id: 'security',
      name: 'Security',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual security costs',
      placeholder: 'Enter security costs',
      min: 0,
      max: 100000
    },
    {
      id: 'advertising',
      name: 'Advertising & Marketing',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual advertising and marketing expenses',
      placeholder: 'Enter advertising costs',
      min: 0,
      max: 50000
    },
    {
      id: 'legal',
      name: 'Legal & Professional',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual legal and professional fees',
      placeholder: 'Enter legal costs',
      min: 0,
      max: 75000
    },
    {
      id: 'accounting',
      name: 'Accounting & Administrative',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual accounting and administrative costs',
      placeholder: 'Enter accounting costs',
      min: 0,
      max: 50000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total loan amount',
      placeholder: 'Enter loan amount',
      min: 100000,
      max: 50000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on the loan',
      placeholder: 'Enter interest rate',
      min: 1,
      max: 25
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Loan term in years',
      placeholder: 'Enter loan term',
      min: 5,
      max: 30
    },
    {
      id: 'amortizationPeriod',
      name: 'Amortization Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Amortization period in years',
      placeholder: 'Enter amortization period',
      min: 5,
      max: 40
    },
    {
      id: 'balloonPayment',
      name: 'Balloon Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Balloon payment at end of loan term (if any)',
      placeholder: 'Enter balloon payment',
      min: 0,
      max: 50000000
    },
    {
      id: 'lenderDSCR',
      name: 'Lender DSCR Requirement',
      type: 'number',
      unit: '',
      required: true,
      description: 'Minimum DSCR required by lender',
      placeholder: 'Enter lender DSCR requirement',
      min: 1.0,
      max: 2.5
    },
    {
      id: 'reserves',
      name: 'Reserves',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual reserve requirements',
      placeholder: 'Enter reserve requirements',
      min: 0,
      max: 200000
    },
    {
      id: 'capitalExpenditures',
      name: 'Capital Expenditures',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual capital expenditure budget',
      placeholder: 'Enter capital expenditures',
      min: 0,
      max: 500000
    },
    {
      id: 'tenantImprovements',
      name: 'Tenant Improvements',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual tenant improvement costs',
      placeholder: 'Enter tenant improvement costs',
      min: 0,
      max: 300000
    },
    {
      id: 'leasingCommissions',
      name: 'Leasing Commissions',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual leasing commission costs',
      placeholder: 'Enter leasing commissions',
      min: 0,
      max: 200000
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current estimated property value',
      placeholder: 'Enter property value',
      min: 100000,
      max: 100000000
    },
    {
      id: 'marketCapRate',
      name: 'Market Cap Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Market capitalization rate for similar properties',
      placeholder: 'Enter market cap rate',
      min: 2,
      max: 15
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual property appreciation rate',
      placeholder: 'Enter appreciation rate',
      min: -10,
      max: 15
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual inflation rate',
      placeholder: 'Enter inflation rate',
      min: 0,
      max: 10
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Number of years for analysis',
      placeholder: 'Enter analysis period',
      min: 1,
      max: 30
    }
  ],
  outputs: [
    {
      id: 'effectiveGrossIncome',
      name: 'Effective Gross Income',
      type: 'number',
      unit: 'USD',
      description: 'Gross income minus vacancy losses'
    },
    {
      id: 'operatingExpenses',
      name: 'Total Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Sum of all operating expenses'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income (NOI)',
      type: 'number',
      unit: 'USD',
      description: 'Effective gross income minus operating expenses'
    },
    {
      id: 'annualDebtService',
      name: 'Annual Debt Service',
      type: 'number',
      unit: 'USD',
      description: 'Total annual debt service payments'
    },
    {
      id: 'dscr',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: '',
      description: 'NOI divided by annual debt service'
    },
    {
      id: 'dscrMargin',
      name: 'DSCR Margin',
      type: 'number',
      unit: '%',
      description: 'Percentage margin above lender requirement'
    },
    {
      id: 'cashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'NOI minus debt service'
    },
    {
      id: 'cashOnCashReturn',
      name: 'Cash-on-Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual cash flow divided by equity investment'
    },
    {
      id: 'loanToValue',
      name: 'Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      description: 'Loan amount divided by property value'
    },
    {
      id: 'debtYield',
      name: 'Debt Yield',
      type: 'number',
      unit: '%',
      description: 'NOI divided by loan amount'
    },
    {
      id: 'breakEvenOccupancy',
      name: 'Break-Even Occupancy',
      type: 'number',
      unit: '%',
      description: 'Minimum occupancy needed to cover debt service'
    },
    {
      id: 'maximumLoanAmount',
      name: 'Maximum Loan Amount',
      type: 'number',
      unit: 'USD',
      description: 'Maximum loan amount based on DSCR requirement'
    },
    {
      id: 'debtServiceAnalysis',
      name: 'Debt Service Analysis',
      type: 'object',
      unit: '',
      description: 'Detailed breakdown of debt service components'
    },
    {
      id: 'operatingExpenseAnalysis',
      name: 'Operating Expense Analysis',
      type: 'object',
      unit: '',
      description: 'Detailed breakdown of operating expenses'
    },
    {
      id: 'incomeAnalysis',
      name: 'Income Analysis',
      type: 'object',
      unit: '',
      description: 'Detailed breakdown of income sources'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      unit: '',
      description: 'Risk analysis and recommendations'
    },
    {
      id: 'projections',
      name: 'Financial Projections',
      type: 'array',
      unit: '',
      description: 'Year-by-year financial projections'
    },
    {
      id: 'dscrAnalysis',
      name: 'DSCR Analysis',
      type: 'string',
      unit: '',
      description: 'Comprehensive DSCR analysis and recommendations'
    }
  ],
  calculate: (inputs) => {
    return calculateDSCR(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateDSCRAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Effective Gross Income',
      formula: 'Effective Gross Income = Gross Rental Income + Other Income - Vacancy Loss',
      description: 'Calculate effective gross income after vacancy losses'
    },
    {
      name: 'Net Operating Income',
      formula: 'NOI = Effective Gross Income - Total Operating Expenses',
      description: 'Calculate net operating income'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = NOI ÷ Annual Debt Service',
      description: 'Calculate debt service coverage ratio'
    },
    {
      name: 'Annual Debt Service',
      formula: 'Annual Debt Service = Monthly Payment × 12',
      description: 'Calculate total annual debt service payments'
    },
    {
      name: 'Cash Flow',
      formula: 'Cash Flow = NOI - Annual Debt Service',
      description: 'Calculate annual cash flow'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash Return = (Cash Flow ÷ Equity Investment) × 100',
      description: 'Calculate cash-on-cash return on investment'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount ÷ Property Value) × 100',
      description: 'Calculate loan-to-value ratio'
    },
    {
      name: 'Debt Yield',
      formula: 'Debt Yield = (NOI ÷ Loan Amount) × 100',
      description: 'Calculate debt yield ratio'
    },
    {
      name: 'Break-Even Occupancy',
      formula: 'Break-Even Occupancy = (Annual Debt Service ÷ Gross Rental Income) × 100',
      description: 'Calculate minimum occupancy needed to cover debt service'
    }
  ],
  examples: [
    {
      name: 'Office Building',
      inputs: {
        propertyType: 'office',
        grossRentalIncome: 1200000,
        otherIncome: 50000,
        vacancyRate: 5,
        propertyTaxes: 80000,
        insurance: 25000,
        utilities: 60000,
        maintenance: 40000,
        propertyManagement: 60000,
        landscaping: 15000,
        janitorial: 30000,
        security: 20000,
        advertising: 10000,
        legal: 15000,
        accounting: 8000,
        loanAmount: 8000000,
        interestRate: 5.5,
        loanTerm: 10,
        amortizationPeriod: 30,
        balloonPayment: 0,
        lenderDSCR: 1.25,
        reserves: 25000,
        capitalExpenditures: 30000,
        tenantImprovements: 20000,
        leasingCommissions: 15000,
        propertyValue: 12000000,
        marketCapRate: 6.5,
        appreciationRate: 3,
        inflationRate: 2.5,
        analysisPeriod: 10
      },
      description: 'Office building with $1.2M gross income, $8M loan, 5.5% interest rate'
    },
    {
      name: 'Multifamily Property',
      inputs: {
        propertyType: 'multifamily',
        grossRentalIncome: 800000,
        otherIncome: 20000,
        vacancyRate: 3,
        propertyTaxes: 45000,
        insurance: 18000,
        utilities: 40000,
        maintenance: 25000,
        propertyManagement: 40000,
        landscaping: 8000,
        janitorial: 12000,
        security: 8000,
        advertising: 5000,
        legal: 8000,
        accounting: 5000,
        loanAmount: 5000000,
        interestRate: 6.0,
        loanTerm: 15,
        amortizationPeriod: 30,
        balloonPayment: 0,
        lenderDSCR: 1.20,
        reserves: 15000,
        capitalExpenditures: 20000,
        tenantImprovements: 10000,
        leasingCommissions: 8000,
        propertyValue: 7500000,
        marketCapRate: 7.0,
        appreciationRate: 2.5,
        inflationRate: 2.0,
        analysisPeriod: 15
      },
      description: 'Multifamily property with $800K gross income, $5M loan, 6% interest rate'
    },
    {
      name: 'Retail Property',
      inputs: {
        propertyType: 'retail',
        grossRentalIncome: 600000,
        otherIncome: 15000,
        vacancyRate: 8,
        propertyTaxes: 35000,
        insurance: 15000,
        utilities: 25000,
        maintenance: 20000,
        propertyManagement: 30000,
        landscaping: 6000,
        janitorial: 8000,
        security: 6000,
        advertising: 8000,
        legal: 10000,
        accounting: 4000,
        loanAmount: 3500000,
        interestRate: 6.5,
        loanTerm: 20,
        amortizationPeriod: 25,
        balloonPayment: 0,
        lenderDSCR: 1.30,
        reserves: 10000,
        capitalExpenditures: 15000,
        tenantImprovements: 12000,
        leasingCommissions: 10000,
        propertyValue: 5000000,
        marketCapRate: 7.5,
        appreciationRate: 2.0,
        inflationRate: 2.5,
        analysisPeriod: 20
      },
      description: 'Retail property with $600K gross income, $3.5M loan, 6.5% interest rate'
    }
  ]
};
