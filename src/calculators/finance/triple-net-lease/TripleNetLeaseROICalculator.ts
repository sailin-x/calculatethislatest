import { Calculator } from '../../../types/calculator';
import { calculateTripleNetLeaseROI } from './formulas';
import { generateTripleNetLeaseROIAnalysis } from './formulas';

export const TripleNetLeaseROICalculator: Calculator = {
  id: 'triple-net-lease-roi-calculator',
  name: 'Triple Net (NNN) Lease ROI Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate ROI, cash flow, and investment metrics for triple net lease properties.',
  
  inputs: [
    // Property Information
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
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
        { value: 'auto', label: 'Automotive' },
        { value: 'other', label: 'Other' }
      ],
      description: 'Type of commercial property'
    },
    {
      id: 'propertySize',
      label: 'Property Size',
      type: 'number',
      unit: 'sq ft',
      required: true,
      min: 100,
      max: 1000000,
      step: 100,
      placeholder: '5000',
      description: 'Total square footage of the property'
    },
    {
      id: 'propertyAge',
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '10',
      description: 'Age of the property in years'
    },
    {
      id: 'propertyCondition',
      label: 'Property Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      description: 'Current condition of the property'
    },
    {
      id: 'location',
      label: 'Location Type',
      type: 'select',
      required: true,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' },
        { value: 'highway', label: 'Highway/Interstate' }
      ],
      description: 'Location classification of the property'
    },

    // Investment Information
    {
      id: 'purchasePrice',
      label: 'Purchase Price',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 100000,
      max: 100000000,
      step: 10000,
      placeholder: '2000000',
      description: 'Total purchase price of the property'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 20000,
      max: 50000000,
      step: 1000,
      placeholder: '400000',
      description: 'Down payment amount'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: '1600000',
      description: 'Total loan amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      min: 1,
      max: 15,
      step: 0.125,
      placeholder: '6.5',
      description: 'Annual interest rate on the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      min: 5,
      max: 30,
      step: 1,
      placeholder: '25',
      description: 'Loan term in years'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000',
      description: 'Total closing costs'
    },

    // Lease Information
    {
      id: 'leaseType',
      label: 'Lease Type',
      type: 'select',
      required: true,
      options: [
        { value: 'nnn', label: 'Triple Net (NNN)' },
        { value: 'nn', label: 'Double Net (NN)' },
        { value: 'modified-nnn', label: 'Modified NNN' },
        { value: 'absolute-nnn', label: 'Absolute NNN' }
      ],
      description: 'Type of net lease'
    },
    {
      id: 'leaseTerm',
      label: 'Lease Term',
      type: 'number',
      unit: 'years',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10',
      description: 'Length of the lease term in years'
    },
    {
      id: 'baseRent',
      label: 'Base Monthly Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 100,
      max: 1000000,
      step: 100,
      placeholder: '12000',
      description: 'Base monthly rent amount'
    },
    {
      id: 'rentPerSqFt',
      label: 'Rent per Square Foot',
      type: 'number',
      unit: 'USD/sq ft/year',
      required: false,
      min: 1,
      max: 200,
      step: 0.5,
      placeholder: '28.8',
      description: 'Annual rent per square foot'
    },
    {
      id: 'rentEscalation',
      label: 'Annual Rent Escalation',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '2.0',
      description: 'Annual rent escalation rate'
    },
    {
      id: 'rentFreePeriod',
      label: 'Rent-Free Period',
      type: 'number',
      unit: 'months',
      required: false,
      min: 0,
      max: 24,
      step: 0.5,
      placeholder: '0',
      description: 'Rent-free period during lease term'
    },

    // Tenant Information
    {
      id: 'tenantCredit',
      label: 'Tenant Credit Rating',
      type: 'select',
      required: false,
      options: [
        { value: 'aaa', label: 'AAA' },
        { value: 'aa', label: 'AA' },
        { value: 'a', label: 'A' },
        { value: 'bbb', label: 'BBB' },
        { value: 'bb', label: 'BB' },
        { value: 'b', label: 'B' },
        { value: 'ccc', label: 'CCC' },
        { value: 'unknown', label: 'Unknown' }
      ],
      description: 'Credit rating of the tenant'
    },
    {
      id: 'tenantGuarantee',
      label: 'Tenant Guarantee',
      type: 'select',
      required: false,
      options: [
        { value: 'corporate', label: 'Corporate Guarantee' },
        { value: 'personal', label: 'Personal Guarantee' },
        { value: 'none', label: 'No Guarantee' }
      ],
      description: 'Type of tenant guarantee'
    },
    {
      id: 'tenantHistory',
      label: 'Tenant Operating History',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '15',
      description: 'Years of operating history for the tenant'
    },

    // Operating Expenses (NNN)
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '25000',
      description: 'Annual property tax amount'
    },
    {
      id: 'insurance',
      label: 'Annual Insurance',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '15000',
      description: 'Annual insurance premium'
    },
    {
      id: 'maintenance',
      label: 'Annual Maintenance',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '10000',
      description: 'Annual maintenance and repair costs'
    },
    {
      id: 'utilities',
      label: 'Annual Utilities',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '8000',
      description: 'Annual utility costs (if not included in NNN)'
    },
    {
      id: 'management',
      label: 'Annual Management Fee',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '5000',
      description: 'Annual property management fee'
    },
    {
      id: 'reserves',
      label: 'Annual Reserves',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Annual reserve fund contribution'
    },

    // Market Factors
    {
      id: 'marketCapRate',
      label: 'Market Cap Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 3,
      max: 12,
      step: 0.1,
      placeholder: '6.5',
      description: 'Market capitalization rate for similar properties'
    },
    {
      id: 'appreciationRate',
      label: 'Property Appreciation Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: -10,
      max: 15,
      step: 0.5,
      placeholder: '2.0',
      description: 'Expected annual property appreciation rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'vacancyRate',
      label: 'Market Vacancy Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: '5.0',
      description: 'Market vacancy rate for similar properties'
    },

    // Analysis Period
    {
      id: 'holdingPeriod',
      label: 'Holding Period',
      type: 'number',
      unit: 'years',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10',
      description: 'Expected holding period for the investment'
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 3,
      max: 12,
      step: 0.1,
      placeholder: '6.0',
      description: 'Expected cap rate at exit'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25',
      description: 'Effective tax rate on income'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly mortgage payment amount'
    },
    {
      id: 'annualRent',
      label: 'Annual Rent',
      type: 'number',
      unit: 'USD',
      description: 'Total annual rent income'
    },
    {
      id: 'annualExpenses',
      label: 'Annual Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Annual Net Operating Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual NOI (rent minus operating expenses)'
    },
    {
      id: 'cashFlow',
      label: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Annual cash flow after debt service'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual cash flow divided by total cash invested'
    },
    {
      id: 'capRate',
      label: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Annual NOI divided by property value'
    },
    {
      id: 'roi',
      label: 'ROI',
      type: 'number',
      unit: '%',
      description: 'Return on investment including appreciation'
    },
    {
      id: 'irr',
      label: 'IRR',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return over holding period'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: 'x',
      description: 'NOI divided by annual debt service'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total return including cash flow and appreciation'
    },
    {
      id: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      unit: 'x',
      description: 'Total return divided by initial equity investment'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      unit: 'years',
      description: 'Years to break even on the investment'
    },
    {
      id: 'presentValue',
      label: 'Present Value',
      type: 'number',
      unit: 'USD',
      description: 'Present value of future cash flows'
    },
    {
      id: 'profitabilityScore',
      label: 'Profitability Score',
      type: 'number',
      unit: '0-100',
      description: 'Overall profitability assessment score'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      unit: '0-100',
      description: 'Risk assessment score'
    },
    {
      id: 'tenantScore',
      label: 'Tenant Quality Score',
      type: 'number',
      unit: '0-100',
      description: 'Assessment of tenant quality and credit'
    },
    {
      id: 'investmentScore',
      label: 'Investment Score',
      type: 'number',
      unit: '0-100',
      description: 'Overall investment quality score'
    },
    {
      id: 'cashFlowProjection',
      label: 'Cash Flow Projection',
      type: 'array',
      description: 'Projected cash flows over holding period'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'object',
      description: 'Analysis of how key variables affect returns'
    },
    {
      id: 'comparisonMetrics',
      label: 'Comparison Metrics',
      type: 'object',
      description: 'Key metrics for comparison with other investments'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      description: 'Professional recommendations based on analysis'
    }
  ],

  calculate: calculateTripleNetLeaseROI,
  generateReport: generateTripleNetLeaseROIAnalysis
};
