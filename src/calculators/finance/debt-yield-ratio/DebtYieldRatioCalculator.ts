import { Calculator } from '../../types/calculator';
import { calculateDebtYield, generateDebtYieldAnalysis } from './formulas';
import { validateDebtYieldInputs } from './validation';

export const DebtYieldRatioCalculator: Calculator = {
  id: 'DebtYieldRatio-calculator',
  name: 'Debt Yield Ratio Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate debt yield ratio for commercial real estate loans, including NOI analysis, loan sizing, and lender risk assessment.',
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      unit: '',
      required: true,
      description: 'Type of commercial property',
      placeholder: 'Select property type',
      options: [
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'self-storage', label: 'Self-Storage' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'land', label: 'Land' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'grossRentalIncome',
      name: 'Gross Rental Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual gross rental income from the property',
      placeholder: 'Enter annual gross rental income',
      min: 0,
      max: 100000000
    },
    {
      id: 'otherIncome',
      name: 'Other Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Additional income from parking, storage, etc.',
      placeholder: 'Enter other annual income',
      min: 0,
      max: 50000000
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
      max: 100
    },
    {
      id: 'operatingExpenses',
      name: 'Operating Expenses',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual operating expenses excluding debt service',
      placeholder: 'Enter annual operating expenses',
      min: 0,
      max: 50000000
    },
    {
      id: 'propertyManagementFee',
      name: 'Property Management Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property management fees',
      placeholder: 'Enter property management fees',
      min: 0,
      max: 5000000
    },
    {
      id: 'maintenanceCosts',
      name: 'Maintenance Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual maintenance and repair costs',
      placeholder: 'Enter maintenance costs',
      min: 0,
      max: 10000000
    },
    {
      id: 'insuranceCosts',
      name: 'Insurance Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property insurance costs',
      placeholder: 'Enter insurance costs',
      min: 0,
      max: 5000000
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
      max: 10000000
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual utility costs',
      placeholder: 'Enter utility costs',
      min: 0,
      max: 5000000
    },
    {
      id: 'repairs',
      name: 'Repairs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual repair costs',
      placeholder: 'Enter repair costs',
      min: 0,
      max: 5000000
    },
    {
      id: 'landscaping',
      name: 'Landscaping',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual landscaping costs',
      placeholder: 'Enter landscaping costs',
      min: 0,
      max: 2000000
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
      max: 2000000
    },
    {
      id: 'advertising',
      name: 'Advertising',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual advertising and marketing costs',
      placeholder: 'Enter advertising costs',
      min: 0,
      max: 1000000
    },
    {
      id: 'legalFees',
      name: 'Legal Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual legal fees',
      placeholder: 'Enter legal fees',
      min: 0,
      max: 1000000
    },
    {
      id: 'accountingFees',
      name: 'Accounting Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual accounting fees',
      placeholder: 'Enter accounting fees',
      min: 0,
      max: 500000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total loan amount',
      placeholder: 'Enter loan amount',
      min: 0,
      max: 100000000
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the property',
      placeholder: 'Enter property value',
      min: 0,
      max: 500000000
    },
    {
      id: 'requiredDebtYield',
      name: 'Required Debt Yield',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Lender required minimum debt yield ratio',
      placeholder: 'Enter required debt yield',
      min: 7,
      max: 15
    },
    {
      id: 'marketCapRate',
      name: 'Market Cap Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Market capitalization rate for similar properties',
      placeholder: 'Enter market cap rate',
      min: 0,
      max: 20
    },
    {
      id: 'propertyAge',
      name: 'Property Age',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Age of the property in years',
      placeholder: 'Enter property age',
      min: 0,
      max: 100
    },
    {
      id: 'occupancyRate',
      name: 'Occupancy Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Current occupancy rate as a percentage',
      placeholder: 'Enter occupancy rate',
      min: 0,
      max: 100
    },
    {
      id: 'leaseType',
      name: 'Lease Type',
      type: 'select',
      unit: '',
      required: true,
      description: 'Type of lease structure',
      placeholder: 'Select lease type',
      options: [
        { value: 'gross', label: 'Gross Lease' },
        { value: 'net', label: 'Net Lease' },
        { value: 'triple-net', label: 'Triple Net (NNN)' },
        { value: 'modified-gross', label: 'Modified Gross' },
        { value: 'percentage', label: 'Percentage Lease' },
        { value: 'ground', label: 'Ground Lease' }
      ]
    },
    {
      id: 'tenantCreditRating',
      name: 'Tenant Credit Rating',
      type: 'select',
      unit: '',
      required: true,
      description: 'Credit quality of primary tenants',
      placeholder: 'Select tenant credit rating',
      options: [
        { value: 'investment-grade', label: 'Investment Grade (BBB+ or higher)' },
        { value: 'NonInvestmentGrade', label: 'Non-Investment Grade (BB+ to BBB-)' },
        { value: 'speculative', label: 'Speculative (BB- or lower)' },
        { value: 'unrated', label: 'Unrated' }
      ]
    },
    {
      id: 'marketConditions',
      name: 'Market Conditions',
      type: 'select',
      unit: '',
      required: true,
      description: 'Current market conditions',
      placeholder: 'Select market conditions',
      options: [
        { value: 'strong', label: 'Strong Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'weak', label: 'Weak Market' },
        { value: 'declining', label: 'Declining Market' }
      ]
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Loan term in years',
      placeholder: 'Enter loan term',
      min: 1,
      max: 50
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on the loan',
      placeholder: 'Enter interest rate',
      min: 0,
      max: 25
    },
    {
      id: 'amortizationPeriod',
      name: 'Amortization Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Amortization period in years',
      placeholder: 'Enter amortization period',
      min: 1,
      max: 50
    },
    {
      id: 'loanToValue',
      name: 'LoanToValue Ratio',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Current LoanToValue ratio',
      placeholder: 'Enter LTV ratio',
      min: 0,
      max: 100
    },
    {
      id: 'debtServiceCoverageRatio',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: '',
      required: true,
      description: 'Current debt service coverage ratio',
      placeholder: 'Enter DSCR',
      min: 0,
      max: 5
    }
  ],
  outputs: [
    {
      id: 'noi',
      name: 'Net Operating Income (NOI)',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'debtYieldRatio',
      name: 'Debt Yield Ratio',
      type: 'number',
      unit: '%',
      description: 'Calculated debt yield ratio'
    },
    {
      id: 'maxLoanAmount',
      name: 'Maximum Loan Amount',
      type: 'number',
      unit: 'USD',
      description: 'Maximum loan amount based on debt yield requirements'
    },
    {
      id: 'loanToValueRatio',
      name: 'LoanToValue Ratio',
      type: 'number',
      unit: '%',
      description: 'Calculated LoanToValue ratio'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Calculated capitalization rate'
    },
    {
      id: 'debtServiceCoverageRatio',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: '',
      description: 'Calculated debt service coverage ratio'
    },
    {
      id: 'annualDebtService',
      name: 'Annual Debt Service',
      type: 'number',
      unit: 'USD',
      description: 'Annual debt service payment'
    },
    {
      id: 'cashFlowAfterDebtService',
      name: 'Cash Flow After Debt Service',
      type: 'number',
      unit: 'USD',
      description: 'Annual cash flow after debt service'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      unit: '',
      description: 'Debt yield risk assessment and analysis'
    },
    {
      id: 'sensitivityAnalysis',
      name: 'Sensitivity Analysis',
      type: 'array',
      unit: '',
      description: 'Debt yield sensitivity to NOI changes'
    },
    {
      id: 'lenderRequirements',
      name: 'Lender Requirements',
      type: 'object',
      unit: '',
      description: 'Lender requirements and risk scoring'
    },
    {
      id: 'cashFlowAnalysis',
      name: 'Cash Flow Analysis',
      type: 'object',
      unit: '',
      description: 'Detailed cash flow analysis'
    },
    {
      id: 'performanceMetrics',
      name: 'Performance Metrics',
      type: 'object',
      unit: '',
      description: 'Property performance metrics'
    },
    {
      id: 'debtYieldAnalysis',
      name: 'Debt Yield Analysis',
      type: 'string',
      unit: '',
      description: 'Comprehensive debt yield analysis report'
    }
  ],
  calculate: (inputs) => {
    return calculateDebtYield(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateDebtYieldAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Net Operating Income (NOI)',
      formula: 'NOI = Effective Gross Income - Total Operating Expenses',
      description: 'Net operating income is calculated by subtracting all operating expenses from effective gross income (gross income minus vacancy loss).'
    },
    {
      name: 'Debt Yield Ratio',
      formula: 'Debt Yield = (NOI / Loan Amount) × 100',
      description: 'Debt yield ratio measures the annual NOI as a percentage of the loan amount, providing a risk metric independent of interest rates.'
    },
    {
      name: 'Maximum Loan Amount',
      formula: 'Max Loan = NOI / Required Debt Yield',
      description: 'Maximum loan amount is calculated by dividing NOI by the required debt yield ratio.'
    },
    {
      name: 'LoanToValue Ratio',
      formula: 'LTV = (Loan Amount / Property Value) × 100',
      description: 'LoanToValue ratio measures the loan amount as a percentage of the property value.'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (NOI / Property Value) × 100',
      description: 'Capitalization rate is the ratio of NOI to property value, indicating the property\'s return on investment.'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = NOI / Annual Debt Service',
      description: 'Debt service coverage ratio measures the property\'s ability to cover debt payments from operating income.'
    }
  ],
  examples: [
    {
      name: 'Office Building Example',
      inputs: {
        propertyType: 'office',
        grossRentalIncome: 1200000,
        otherIncome: 60000,
        vacancyRate: 5,
        operatingExpenses: 240000,
        propertyManagementFee: 60000,
        maintenanceCosts: 90000,
        insuranceCosts: 30000,
        propertyTaxes: 120000,
        utilities: 36000,
        repairs: 24000,
        landscaping: 12000,
        security: 18000,
        advertising: 6000,
        legalFees: 9600,
        accountingFees: 3600,
        loanAmount: 6000000,
        propertyValue: 10000000,
        requiredDebtYield: 10,
        marketCapRate: 7.5,
        propertyAge: 12,
        occupancyRate: 95,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable',
        loanTerm: 30,
        interestRate: 5.5,
        amortizationPeriod: 30,
        loanToValue: 60,
        debtServiceCoverageRatio: 1.35
      },
      description: 'A 50,000 sq ft office building with strong tenant credit and stable market conditions.'
    },
    {
      name: 'Retail Property Example',
      inputs: {
        propertyType: 'retail',
        grossRentalIncome: 800000,
        otherIncome: 40000,
        vacancyRate: 8,
        operatingExpenses: 160000,
        propertyManagementFee: 40000,
        maintenanceCosts: 60000,
        insuranceCosts: 20000,
        propertyTaxes: 80000,
        utilities: 24000,
        repairs: 16000,
        landscaping: 8000,
        security: 12000,
        advertising: 4000,
        legalFees: 6400,
        accountingFees: 2400,
        loanAmount: 4000000,
        propertyValue: 7000000,
        requiredDebtYield: 11,
        marketCapRate: 8.2,
        propertyAge: 18,
        occupancyRate: 92,
        leaseType: 'net',
        tenantCreditRating: 'NonInvestmentGrade',
        marketConditions: 'stable',
        loanTerm: 25,
        interestRate: 6.0,
        amortizationPeriod: 25,
        loanToValue: 57,
        debtServiceCoverageRatio: 1.25
      },
      description: 'A neighborhood retail center with mixed tenant credit quality.'
    },
    {
      name: 'Industrial Warehouse Example',
      inputs: {
        propertyType: 'industrial',
        grossRentalIncome: 1500000,
        otherIncome: 75000,
        vacancyRate: 3,
        operatingExpenses: 300000,
        propertyManagementFee: 75000,
        maintenanceCosts: 112500,
        insuranceCosts: 37500,
        propertyTaxes: 150000,
        utilities: 45000,
        repairs: 30000,
        landscaping: 15000,
        security: 22500,
        advertising: 7500,
        legalFees: 12000,
        accountingFees: 4500,
        loanAmount: 8000000,
        propertyValue: 12000000,
        requiredDebtYield: 9.5,
        marketCapRate: 6.8,
        propertyAge: 8,
        occupancyRate: 97,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'strong',
        loanTerm: 30,
        interestRate: 5.0,
        amortizationPeriod: 30,
        loanToValue: 67,
        debtServiceCoverageRatio: 1.45
      },
      description: 'A modern industrial warehouse with strong tenant credit and high occupancy.'
    }
  ]
};
