import { Calculator } from '../../types/calculator';
import { calculateTripleNetLeaseROI } from './formulas';
import { generateTripleNetLeaseROIAnalysis } from './formulas';

export const TripleNetLeaseROICalculator: Calculator = {
  name: 'Triple Net (NNN) Lease ROI Calculator',
  category: 'finance',
  description: 'Calculate ROI and financial metrics for triple net lease investments including property taxes, insurance, and maintenance costs.',
  
  inputs: {
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Total purchase price of the property',
      placeholder: '1000000',
      unit: '$',
      required: true,
      min: 10000,
      max: 100000000,
      step: 1000
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      description: 'Initial down payment amount',
      placeholder: '200000',
      unit: '$',
      required: true,
      min: 1000,
      max: 50000000,
      step: 1000
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate',
      description: 'Annual interest rate on the loan',
      placeholder: '5.5',
      unit: '%',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.1
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term',
      description: 'Length of the loan in years',
      placeholder: '30',
      unit: 'years',
      required: true,
      min: 1,
      max: 30,
      step: 1
    },
    annualRent: {
      type: 'number',
      label: 'Annual Rent',
      description: 'Total annual rent income from tenant',
      placeholder: '80000',
      unit: '$',
      required: true,
      min: 1000,
      max: 5000000,
      step: 1000
    },
    propertyTaxes: {
      type: 'number',
      label: 'Annual Property Taxes',
      description: 'Annual property tax amount (paid by tenant in NNN lease)',
      placeholder: '12000',
      unit: '$',
      required: true,
      min: 0,
      max: 500000,
      step: 100
    },
    insurance: {
      type: 'number',
      label: 'Annual Insurance',
      description: 'Annual insurance premium (paid by tenant in NNN lease)',
      placeholder: '8000',
      unit: '$',
      required: true,
      min: 0,
      max: 100000,
      step: 100
    },
    maintenance: {
      type: 'number',
      label: 'Annual Maintenance',
      description: 'Annual maintenance and repair costs (paid by tenant in NNN lease)',
      placeholder: '5000',
      unit: '$',
      required: true,
      min: 0,
      max: 200000,
      step: 100
    },
    propertyManagement: {
      type: 'number',
      label: 'Property Management Fee',
      description: 'Annual property management fee percentage',
      placeholder: '5',
      unit: '%',
      required: true,
      min: 0,
      max: 20,
      step: 0.1
    },
    vacancyRate: {
      type: 'number',
      label: 'Vacancy Rate',
      description: 'Expected annual vacancy rate',
      placeholder: '5',
      unit: '%',
      required: true,
      min: 0,
      max: 50,
      step: 0.1
    },
    appreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate',
      description: 'Expected annual property value appreciation',
      placeholder: '3',
      unit: '%',
      required: true,
      min: -10,
      max: 15,
      step: 0.1
    },
    rentEscalation: {
      type: 'number',
      label: 'Rent Escalation Rate',
      description: 'Annual rent increase rate',
      placeholder: '2',
      unit: '%',
      required: true,
      min: -5,
      max: 10,
      step: 0.1
    },
    leaseTerm: {
      type: 'number',
      label: 'Lease Term',
      description: 'Length of the lease agreement in years',
      placeholder: '10',
      unit: 'years',
      required: true,
      min: 1,
      max: 50,
      step: 1
    },
    tenantCreditRating: {
      type: 'select',
      label: 'Tenant Credit Rating',
      description: 'Credit rating of the tenant',
      placeholder: 'Select credit rating',
      required: true,
      options: [
        { value: 'aaa', label: 'AAA - Excellent' },
        { value: 'aa', label: 'AA - Very Good' },
        { value: 'a', label: 'A - Good' },
        { value: 'bbb', label: 'BBB - Average' },
        { value: 'bb', label: 'BB - Below Average' },
        { value: 'b', label: 'B - Poor' },
        { value: 'ccc', label: 'CCC - Very Poor' }
      ]
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of commercial property',
      placeholder: 'Select property type',
      required: true,
      options: [
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'medical', label: 'Medical' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'bank', label: 'Bank' },
        { value: 'pharmacy', label: 'Pharmacy' },
        { value: 'convenience', label: 'Convenience Store' },
        { value: 'other', label: 'Other' }
      ]
    },
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period',
      description: 'Number of years for the investment analysis',
      placeholder: '10',
      unit: 'years',
      required: true,
      min: 1,
      max: 30,
      step: 1
    },
    closingCosts: {
      type: 'number',
      label: 'Closing Costs',
      description: 'One-time closing costs for the purchase',
      placeholder: '25000',
      unit: '$',
      required: true,
      min: 0,
      max: 500000,
      step: 1000
    },
    exitCapRate: {
      type: 'number',
      label: 'Exit Cap Rate',
      description: 'Expected cap rate at time of sale',
      placeholder: '6.5',
      unit: '%',
      required: true,
      min: 3,
      max: 12,
      step: 0.1
    }
  },

  outputs: {
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Mortgage Payment',
      description: 'Monthly principal and interest payment',
      unit: '$'
    },
    annualDebtService: {
      type: 'number',
      label: 'Annual Debt Service',
      description: 'Total annual mortgage payments',
      unit: '$'
    },
    netOperatingIncome: {
      type: 'number',
      label: 'Net Operating Income (NOI)',
      description: 'Annual income after operating expenses',
      unit: '$'
    },
    cashFlow: {
      type: 'number',
      label: 'Annual Cash Flow',
      description: 'Net cash flow after debt service',
      unit: '$'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'CashOnCash Return',
      description: 'Annual return on cash invested',
      unit: '%'
    },
    capRate: {
      type: 'number',
      label: 'Cap Rate',
      description: 'Net operating income divided by property value',
      unit: '%'
    },
    debtServiceCoverage: {
      type: 'number',
      label: 'Debt Service Coverage Ratio',
      description: 'NOI divided by annual debt service',
      unit: 'x'
    },
    totalROI: {
      type: 'number',
      label: 'Total ROI',
      description: 'Total return including appreciation and cash flow',
      unit: '%'
    },
    internalRateOfReturn: {
      type: 'number',
      label: 'Internal Rate of Return (IRR)',
      description: 'Annualized rate of return',
      unit: '%'
    },
    netPresentValue: {
      type: 'number',
      label: 'Net Present Value (NPV)',
      description: 'Present value of all cash flows',
      unit: '$'
    },
    paybackPeriod: {
      type: 'number',
      label: 'Payback Period',
      description: 'Years to recover initial investment',
      unit: 'years'
    },
    breakEvenOccupancy: {
      type: 'number',
      label: 'Break-Even Occupancy',
      description: 'Minimum occupancy rate to break even',
      unit: '%'
    },
    projectedValue: {
      type: 'number',
      label: 'Projected Property Value',
      description: 'Estimated property value at end of analysis period',
      unit: '$'
    },
    totalReturn: {
      type: 'number',
      label: 'Total Return',
      description: 'Total dollar return including appreciation',
      unit: '$'
    },
    annualizedReturn: {
      type: 'number',
      label: 'Annualized Return',
      description: 'Average annual return over the analysis period',
      unit: '%'
    },
    tenantRiskScore: {
      type: 'number',
      label: 'Tenant Risk Score',
      description: 'Risk assessment based on tenant credit and lease terms',
      unit: '/100'
    },
    investmentScore: {
      type: 'number',
      label: 'Investment Score',
      description: 'Overall investment quality score',
      unit: '/100'
    },
    recommendation: {
      type: 'string',
      label: 'Investment Recommendation',
      description: 'Detailed investment recommendation and analysis'
    }
  },

  calculate: calculateTripleNetLeaseROI,
  generateReport: generateTripleNetLeaseROIAnalysis
};
