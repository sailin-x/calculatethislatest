import { Calculator } from '../../types/calculator';
import { calculateTenantImprovement } from './formulas';
import { generateTenantImprovementAnalysis } from './formulas';

export const TenantImprovementCalculator: Calculator = {
  id: 'tenant-improvement-calculator',
  name: 'Tenant Improvement (TI) Allowance Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate tenant improvement allowances, costs, and financial impact for commercial leases.',
  inputs: [
    {
      id: 'spaceSize',
      name: 'Space Size (sq ft)',
      type: 'number',
      unit: 'sq ft',
      description: 'Total square footage of the leased space',
      placeholder: '5000',
      min: 100,
      max: 100000,
      step: 100,
      required: true
    },
    {
      id: 'leaseTerm',
      name: 'Lease Term',
      type: 'number',
      unit: 'years',
      description: 'Length of the lease in years',
      placeholder: '5',
      min: 1,
      max: 20,
      step: 1,
      required: true
    },
    {
      id: 'baseRent',
      name: 'Base Rent per Sq Ft',
      type: 'number',
      unit: '$/sq ft/year',
      description: 'Annual base rent per square foot',
      placeholder: '25',
      min: 5,
      max: 200,
      step: 1,
      required: true
    },
    {
      id: 'tiAllowance',
      name: 'TI Allowance per Sq Ft',
      type: 'number',
      unit: '$/sq ft',
      description: 'Tenant improvement allowance per square foot',
      placeholder: '15',
      min: 0,
      max: 100,
      step: 1,
      required: true
    },
    {
      id: 'constructionCosts',
      name: 'Construction Costs per Sq Ft',
      type: 'number',
      unit: '$/sq ft',
      description: 'Estimated construction costs per square foot',
      placeholder: '20',
      min: 5,
      max: 150,
      step: 1,
      required: true
    },
    {
      id: 'designFees',
      name: 'Design Fees',
      type: 'number',
      unit: '$',
      description: 'Architectural and design fees',
      placeholder: '25000',
      min: 0,
      max: 500000,
      step: 1000,
      required: true
    },
    {
      id: 'permits',
      name: 'Permit Costs',
      type: 'number',
      unit: '$',
      description: 'Building permits and inspection fees',
      placeholder: '5000',
      min: 0,
      max: 100000,
      step: 500,
      required: true
    },
    {
      id: 'furniture',
      name: 'Furniture & Fixtures',
      type: 'number',
      unit: '$',
      description: 'Furniture, fixtures, and equipment costs',
      placeholder: '15000',
      min: 0,
      max: 300000,
      step: 1000,
      required: true
    },
    {
      id: 'technology',
      name: 'Technology Infrastructure',
      type: 'number',
      unit: '$',
      description: 'IT infrastructure and technology costs',
      placeholder: '10000',
      min: 0,
      max: 200000,
      step: 1000,
      required: true
    },
    {
      id: 'contingency',
      name: 'Contingency Reserve',
      type: 'number',
      unit: '%',
      description: 'Contingency percentage for cost overruns',
      placeholder: '10',
      min: 0,
      max: 25,
      step: 1,
      required: true
    },
    {
      id: 'amortizationPeriod',
      name: 'TI Amortization Period',
      type: 'number',
      unit: 'years',
      description: 'Period over which TI costs are amortized',
      placeholder: '5',
      min: 1,
      max: 10,
      step: 1,
      required: true
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      description: 'Interest rate for TI financing',
      placeholder: '6',
      min: 1,
      max: 15,
      step: 0.5,
      required: true
    },
    {
      id: 'tenantContribution',
      name: 'Tenant Contribution',
      type: 'number',
      unit: '$',
      description: 'Additional amount tenant will contribute',
      placeholder: '0',
      min: 0,
      max: 1000000,
      step: 1000,
      required: true
    },
    {
      id: 'landlordContribution',
      name: 'Landlord Additional Contribution',
      type: 'number',
      unit: '$',
      description: 'Additional amount landlord will contribute',
      placeholder: '0',
      min: 0,
      max: 1000000,
      step: 1000,
      required: true
    },
    {
      id: 'rentEscalation',
      name: 'Annual Rent Escalation',
      type: 'number',
      unit: '%',
      description: 'Annual percentage increase in base rent',
      placeholder: '3',
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'operatingExpenses',
      name: 'Operating Expenses per Sq Ft',
      type: 'number',
      unit: '$/sq ft/year',
      description: 'Annual operating expenses per square foot',
      placeholder: '8',
      min: 2,
      max: 50,
      step: 0.5,
      required: true
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: '%',
      description: 'Effective tax rate for the tenant',
      placeholder: '25',
      min: 0,
      max: 50,
      step: 1,
      required: true
    },
    {
      id: 'depreciationPeriod',
      name: 'Depreciation Period',
      type: 'number',
      unit: 'years',
      description: 'Depreciation period for TI improvements',
      placeholder: '39',
      min: 5,
      max: 50,
      step: 1,
      required: true
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period',
      type: 'number',
      unit: 'years',
      description: 'Number of years for the analysis',
      placeholder: '10',
      min: 1,
      max: 20,
      step: 1,
      required: true
    }
  ],
  outputs: [
    {
      id: 'totalTICosts',
      name: 'Total TI Costs',
      type: 'number',
      unit: '$',
      description: 'Total tenant improvement costs'
    },
    {
      id: 'tiAllowanceAmount',
      name: 'TI Allowance Amount',
      type: 'number',
      unit: '$',
      description: 'Total TI allowance provided by landlord'
    },
    {
      id: 'tenantOutOfPocket',
      name: 'Tenant Out-of-Pocket',
      type: 'number',
      unit: '$',
      description: 'Amount tenant must pay out-of-pocket'
    },
    {
      id: 'monthlyTIRent',
      name: 'Monthly TI Rent',
      type: 'number',
      unit: '$',
      description: 'Monthly rent increase for TI amortization'
    },
    {
      id: 'annualTIRent',
      name: 'Annual TI Rent',
      type: 'number',
      unit: '$',
      description: 'Annual rent increase for TI amortization'
    },
    {
      id: 'effectiveRent',
      name: 'Effective Rent per Sq Ft',
      type: 'number',
      unit: '$/sq ft/year',
      description: 'Effective rent including TI amortization'
    },
    {
      id: 'totalLeaseCost',
      name: 'Total Lease Cost',
      type: 'number',
      unit: '$',
      description: 'Total cost over the lease term'
    },
    {
      id: 'presentValue',
      name: 'Present Value of Costs',
      type: 'number',
      unit: '$',
      description: 'Present value of all TI and lease costs'
    },
    {
      id: 'breakEvenYears',
      name: 'Break-Even Years',
      type: 'number',
      unit: 'years',
      description: 'Years to break even on TI investment'
    },
    {
      id: 'roi',
      name: 'ROI on TI Investment',
      type: 'number',
      unit: '%',
      description: 'Return on investment for TI improvements'
    },
    {
      id: 'costBenefitRatio',
      name: 'Cost-Benefit Ratio',
      type: 'number',
      unit: 'ratio',
      description: 'Ratio of benefits to costs'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: '$',
      description: 'Net present value of the TI investment'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return on TI investment'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover TI investment'
    },
    {
      id: 'annualDepreciation',
      name: 'Annual Depreciation',
      type: 'number',
      unit: '$',
      description: 'Annual depreciation expense for tax purposes'
    },
    {
      id: 'taxSavings',
      name: 'Annual Tax Savings',
      type: 'number',
      unit: '$',
      description: 'Annual tax savings from depreciation'
    },
    {
      id: 'afterTaxCost',
      name: 'After-Tax Cost',
      type: 'number',
      unit: '$',
      description: 'After-tax cost of TI improvements'
    },
    {
      id: 'valueScore',
      name: 'Value Score',
      type: 'number',
      unit: '/100',
      description: 'Overall value assessment score'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      unit: '/100',
      description: 'Risk assessment score'
    },
    {
      id: 'recommendation',
      name: 'Recommendation',
      type: 'string',
      description: 'Professional recommendation based on analysis'
    }
  ],
  calculate: calculateTenantImprovement,
  generateReport: generateTenantImprovementAnalysis
};
