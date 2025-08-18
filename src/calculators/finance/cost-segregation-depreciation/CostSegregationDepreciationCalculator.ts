import { Calculator } from '../../types/calculator';
import { calculateCostSegregation, generateCostSegregationAnalysis } from './formulas';
import { validateCostSegregationInputs } from './validation';

export const CostSegregationDepreciationCalculator: Calculator = {
  id: 'cost-segregation-depreciation-calculator',
  name: 'Cost Segregation Depreciation Calculator',
  category: 'finance',
  subcategory: 'tax',
  description: 'Calculate accelerated depreciation benefits through cost segregation studies, including 5-year, 7-year, and 15-year property classifications.',
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
        { value: 'warehouse', label: 'Warehouse/Industrial' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'mixed-use', label: 'Mixed-Use' }
      ]
    },
    {
      id: 'totalPropertyCost',
      name: 'Total Property Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total cost of the property including land and improvements',
      placeholder: 'Enter total property cost',
      min: 100000,
      max: 100000000
    },
    {
      id: 'landCost',
      name: 'Land Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of land (not depreciable)',
      placeholder: 'Enter land cost',
      min: 0,
      max: 50000000
    },
    {
      id: 'buildingCost',
      name: 'Building Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of building structure (39.5-year depreciation)',
      placeholder: 'Enter building cost',
      min: 50000,
      max: 80000000
    },
    {
      id: 'siteImprovements',
      name: 'Site Improvements',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Site improvements like parking, landscaping, utilities',
      placeholder: 'Enter site improvements cost',
      min: 0,
      max: 20000000
    },
    {
      id: 'personalProperty',
      name: 'Personal Property',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Personal property items (5-year depreciation)',
      placeholder: 'Enter personal property cost',
      min: 0,
      max: 10000000
    },
    {
      id: 'landImprovements',
      name: 'Land Improvements',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Land improvements (15-year depreciation)',
      placeholder: 'Enter land improvements cost',
      min: 0,
      max: 15000000
    },
    {
      id: 'acquisitionDate',
      name: 'Acquisition Date',
      type: 'date',
      unit: '',
      required: true,
      description: 'Date property was acquired or placed in service',
      placeholder: 'Select acquisition date'
    },
    {
      id: 'studyCost',
      name: 'Cost Segregation Study Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of professional cost segregation study',
      placeholder: 'Enter study cost',
      min: 5000,
      max: 50000
    },
    {
      id: 'taxYear',
      name: 'Tax Year',
      type: 'number',
      unit: '',
      required: true,
      description: 'Tax year for analysis',
      placeholder: 'Enter tax year',
      min: 2015,
      max: 2030
    },
    {
      id: 'marginalTaxRate',
      name: 'Marginal Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Federal marginal tax rate',
      placeholder: 'Enter marginal tax rate',
      min: 10,
      max: 50
    },
    {
      id: 'stateTaxRate',
      name: 'State Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'State tax rate (if applicable)',
      placeholder: 'Enter state tax rate',
      min: 0,
      max: 15
    },
    {
      id: 'propertyAge',
      name: 'Property Age',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Age of property in years',
      placeholder: 'Enter property age',
      min: 0,
      max: 50
    },
    {
      id: 'renovationCost',
      name: 'Renovation Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of recent renovations or improvements',
      placeholder: 'Enter renovation cost',
      min: 0,
      max: 20000000
    },
    {
      id: 'renovationDate',
      name: 'Renovation Date',
      type: 'date',
      unit: '',
      required: true,
      description: 'Date of renovation completion',
      placeholder: 'Select renovation date'
    },
    {
      id: 'propertyUse',
      name: 'Property Use',
      type: 'select',
      unit: '',
      required: true,
      description: 'Primary use of the property',
      placeholder: 'Select property use',
      options: [
        { value: 'business', label: 'Business Use' },
        { value: 'rental', label: 'Rental Property' },
        { value: 'investment', label: 'Investment Property' },
        { value: 'mixed', label: 'Mixed Use' }
      ]
    },
    {
      id: 'ownershipType',
      name: 'Ownership Type',
      type: 'select',
      unit: '',
      required: true,
      description: 'Type of ownership entity',
      placeholder: 'Select ownership type',
      options: [
        { value: 'individual', label: 'Individual' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'corporation', label: 'Corporation' },
        { value: 'llc', label: 'LLC' },
        { value: 'trust', label: 'Trust' }
      ]
    },
    {
      id: 'bonusDepreciation',
      name: 'Bonus Depreciation',
      type: 'select',
      unit: '',
      required: true,
      description: 'Bonus depreciation election',
      placeholder: 'Select bonus depreciation',
      options: [
        { value: '100', label: '100% (2022-2023)' },
        { value: '80', label: '80% (2023)' },
        { value: '60', label: '60% (2024)' },
        { value: '40', label: '40% (2025)' },
        { value: '20', label: '20% (2026)' },
        { value: '0', label: '0% (2027+)' }
      ]
    },
    {
      id: 'section179',
      name: 'Section 179 Deduction',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Section 179 deduction amount',
      placeholder: 'Enter Section 179 deduction',
      min: 0,
      max: 1000000
    },
    {
      id: 'priorDepreciation',
      name: 'Prior Depreciation Taken',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total depreciation already taken on the property',
      placeholder: 'Enter prior depreciation',
      min: 0,
      max: 50000000
    },
    {
      id: 'recoveryPeriod',
      name: 'Recovery Period',
      type: 'select',
      unit: '',
      required: true,
      description: 'Standard recovery period for the property',
      placeholder: 'Select recovery period',
      options: [
        { value: '27.5', label: '27.5 years (Residential)' },
        { value: '39', label: '39 years (Commercial)' },
        { value: '31.5', label: '31.5 years (Mixed-use)' }
      ]
    },
    {
      id: 'depreciationMethod',
      name: 'Depreciation Method',
      type: 'select',
      unit: '',
      required: true,
      description: 'Depreciation method used',
      placeholder: 'Select depreciation method',
      options: [
        { value: 'straight-line', label: 'Straight-Line' },
        { value: 'declining-balance', label: 'Declining Balance' },
        { value: 'sum-of-years', label: 'Sum-of-Years Digits' }
      ]
    },
    {
      id: 'convention',
      name: 'Depreciation Convention',
      type: 'select',
      unit: '',
      required: true,
      description: 'Depreciation convention used',
      placeholder: 'Select depreciation convention',
      options: [
        { value: 'mid-month', label: 'Mid-Month' },
        { value: 'mid-quarter', label: 'Mid-Quarter' },
        { value: 'half-year', label: 'Half-Year' }
      ]
    }
  ],
  outputs: [
    {
      id: 'totalDepreciableCost',
      name: 'Total Depreciable Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost eligible for depreciation'
    },
    {
      id: 'costSegregationAllocation',
      name: 'Cost Segregation Allocation',
      type: 'object',
      unit: '',
      description: 'Breakdown of costs by depreciation period'
    },
    {
      id: 'acceleratedDepreciation',
      name: 'Accelerated Depreciation',
      type: 'number',
      unit: 'USD',
      description: 'Additional depreciation from cost segregation'
    },
    {
      id: 'taxSavings',
      name: 'Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Total tax savings from accelerated depreciation'
    },
    {
      id: 'presentValueTaxSavings',
      name: 'Present Value Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Present value of tax savings'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'months',
      description: 'Time to recover study cost from tax savings'
    },
    {
      id: 'roi',
      name: 'Return on Investment',
      type: 'number',
      unit: '%',
      description: 'Return on investment for cost segregation study'
    },
    {
      id: 'depreciationSchedule',
      name: 'Depreciation Schedule',
      type: 'array',
      unit: '',
      description: 'Year-by-year depreciation schedule'
    },
    {
      id: 'cashFlowImpact',
      name: 'Cash Flow Impact',
      type: 'array',
      unit: '',
      description: 'Annual cash flow impact from tax savings'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: 'USD',
      description: 'Net present value of cost segregation benefits'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return on cost segregation study'
    },
    {
      id: 'depreciationRecapture',
      name: 'Depreciation Recapture',
      type: 'number',
      unit: 'USD',
      description: 'Potential depreciation recapture on sale'
    },
    {
      id: 'adjustedBasis',
      name: 'Adjusted Basis',
      type: 'number',
      unit: 'USD',
      description: 'Adjusted basis after cost segregation'
    },
    {
      id: 'gainDeferral',
      name: 'Gain Deferral Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Benefit from deferring capital gains'
    },
    {
      id: 'complianceRisk',
      name: 'Compliance Risk Assessment',
      type: 'object',
      unit: '',
      description: 'Assessment of compliance risks and recommendations'
    },
    {
      id: 'costSegregationAnalysis',
      name: 'Cost Segregation Analysis',
      type: 'string',
      unit: '',
      description: 'Comprehensive analysis of cost segregation benefits and recommendations'
    }
  ],
  calculate: (inputs) => {
    return calculateCostSegregation(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateCostSegregationAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Depreciable Cost',
      formula: 'Total Depreciable Cost = Building Cost + Site Improvements + Personal Property + Land Improvements',
      description: 'Calculate total cost eligible for depreciation'
    },
    {
      name: 'Accelerated Depreciation',
      formula: 'Accelerated Depreciation = Cost Segregation Depreciation - Standard Depreciation',
      description: 'Calculate additional depreciation from cost segregation'
    },
    {
      name: 'Tax Savings',
      formula: 'Tax Savings = Accelerated Depreciation × (Federal Tax Rate + State Tax Rate)',
      description: 'Calculate total tax savings from accelerated depreciation'
    },
    {
      name: 'Present Value Tax Savings',
      formula: 'PV = Tax Savings ÷ (1 + Discount Rate)^Year',
      description: 'Calculate present value of future tax savings'
    },
    {
      name: 'Payback Period',
      formula: 'Payback Period = Study Cost ÷ Annual Tax Savings',
      description: 'Calculate time to recover study cost'
    },
    {
      name: 'Return on Investment',
      formula: 'ROI = (Total Tax Savings - Study Cost) ÷ Study Cost × 100',
      description: 'Calculate return on investment for the study'
    },
    {
      name: 'Net Present Value',
      formula: 'NPV = Present Value of Tax Savings - Study Cost',
      description: 'Calculate net present value of benefits'
    },
    {
      name: 'Adjusted Basis',
      formula: 'Adjusted Basis = Original Cost - Total Depreciation Taken',
      description: 'Calculate adjusted basis after depreciation'
    }
  ],
  examples: [
    {
      name: 'Office Building',
      inputs: {
        propertyType: 'office',
        totalPropertyCost: 5000000,
        landCost: 1000000,
        buildingCost: 3500000,
        siteImprovements: 300000,
        personalProperty: 150000,
        landImprovements: 50000,
        acquisitionDate: '2023-01-15',
        studyCost: 15000,
        taxYear: 2024,
        marginalTaxRate: 37,
        stateTaxRate: 5,
        propertyAge: 2,
        renovationCost: 200000,
        renovationDate: '2023-06-01',
        propertyUse: 'business',
        ownershipType: 'corporation',
        bonusDepreciation: '80',
        section179: 50000,
        priorDepreciation: 50000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      },
      description: 'Office building with $5M total cost, 2 years old, with recent renovations'
    },
    {
      name: 'Retail Property',
      inputs: {
        propertyType: 'retail',
        totalPropertyCost: 3000000,
        landCost: 800000,
        buildingCost: 1800000,
        siteImprovements: 200000,
        personalProperty: 120000,
        landImprovements: 80000,
        acquisitionDate: '2022-03-01',
        studyCost: 12000,
        taxYear: 2024,
        marginalTaxRate: 32,
        stateTaxRate: 7,
        propertyAge: 3,
        renovationCost: 150000,
        renovationDate: '2023-09-15',
        propertyUse: 'rental',
        ownershipType: 'llc',
        bonusDepreciation: '80',
        section179: 30000,
        priorDepreciation: 75000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      },
      description: 'Retail property with $3M total cost, 3 years old, rental use'
    },
    {
      name: 'Warehouse Facility',
      inputs: {
        propertyType: 'warehouse',
        totalPropertyCost: 8000000,
        landCost: 2000000,
        buildingCost: 5000000,
        siteImprovements: 500000,
        personalProperty: 300000,
        landImprovements: 200000,
        acquisitionDate: '2021-07-01',
        studyCost: 20000,
        taxYear: 2024,
        marginalTaxRate: 24,
        stateTaxRate: 0,
        propertyAge: 4,
        renovationCost: 300000,
        renovationDate: '2023-12-01',
        propertyUse: 'business',
        ownershipType: 'partnership',
        bonusDepreciation: '60',
        section179: 75000,
        priorDepreciation: 120000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      },
      description: 'Warehouse facility with $8M total cost, 4 years old, business use'
    }
  ]
};
