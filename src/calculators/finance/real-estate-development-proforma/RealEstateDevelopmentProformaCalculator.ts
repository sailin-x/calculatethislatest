import { Calculator } from '../../types';
import { RealEstateDevelopmentProformaInputs, RealEstateDevelopmentProformaOutputs } from './types';
import { calculateRealEstateDevelopmentProforma } from './formulas';
import { validateRealEstateDevelopmentProformaInputs, getValidationErrors } from './validation';

export const realEstateDevelopmentProformaCalculator: Calculator<RealEstateDevelopmentProformaInputs, RealEstateDevelopmentProformaOutputs> = {
  name: 'Real Estate Development Pro-Forma Calculator',
  description: 'Create comprehensive pro-forma analysis for real estate development projects',
  category: 'Finance',
  tags: ['real estate', 'development', 'pro-forma', 'construction', 'investment', 'analysis'],
  inputs: [
    {
      id: 'projectName',
      label: 'Project Name',
      type: 'text',
      placeholder: 'Enter project name',
      required: true,
      description: 'Name of the development project'
    },
    {
      id: 'projectType',
      label: 'Project Type',
      type: 'select',
      placeholder: 'Select project type',
      required: true,
      description: 'Type of real estate development',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' }
      ]
    },
    {
      id: 'totalUnits',
      label: 'Total Units',
      type: 'number',
      placeholder: 'Enter total units',
      required: true,
      description: 'Total number of units in the project'
    },
    {
      id: 'averageUnitSize',
      label: 'Average Unit Size (sq ft)',
      type: 'number',
      placeholder: 'Enter average unit size',
      required: true,
      description: 'Average size of each unit in square feet'
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost',
      type: 'currency',
      placeholder: 'Enter construction cost',
      required: true,
      description: 'Total construction costs'
    },
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      placeholder: 'Enter land cost',
      required: true,
      description: 'Cost of land acquisition'
    },
    {
      id: 'softCosts',
      label: 'Soft Costs',
      type: 'currency',
      placeholder: 'Enter soft costs',
      required: true,
      description: 'Architectural, engineering, and other soft costs'
    },
    {
      id: 'financingCosts',
      label: 'Financing Costs',
      type: 'currency',
      placeholder: 'Enter financing costs',
      required: true,
      description: 'Loan origination and other financing costs'
    },
    {
      id: 'contingency',
      label: 'Contingency',
      type: 'currency',
      placeholder: 'Enter contingency',
      required: true,
      description: 'Contingency reserve for cost overruns'
    },
    {
      id: 'developmentPeriod',
      label: 'Development Period (Years)',
      type: 'number',
      placeholder: 'Enter development period',
      required: true,
      description: 'Time to complete construction'
    },
    {
      id: 'stabilizationPeriod',
      label: 'Stabilization Period (Years)',
      type: 'number',
      placeholder: 'Enter stabilization period',
      required: true,
      description: 'Time to reach stabilized occupancy'
    },
    {
      id: 'averageRent',
      label: 'Average Rent (per unit/month)',
      type: 'currency',
      placeholder: 'Enter average rent',
      required: true,
      description: 'Average monthly rent per unit'
    },
    {
      id: 'occupancyRate',
      label: 'Occupancy Rate',
      type: 'percentage',
      placeholder: 'Enter occupancy rate',
      required: true,
      description: 'Expected stabilized occupancy rate'
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses',
      type: 'currency',
      placeholder: 'Enter operating expenses',
      required: true,
      description: 'Total annual operating expenses'
    },
    {
      id: 'managementFees',
      label: 'Management Fees',
      type: 'currency',
      placeholder: 'Enter management fees',
      required: true,
      description: 'Annual property management fees'
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes',
      type: 'currency',
      placeholder: 'Enter property taxes',
      required: true,
      description: 'Annual property taxes'
    },
    {
      id: 'insurance',
      label: 'Insurance',
      type: 'currency',
      placeholder: 'Enter insurance',
      required: true,
      description: 'Annual insurance costs'
    },
    {
      id: 'utilities',
      label: 'Utilities',
      type: 'currency',
      placeholder: 'Enter utilities',
      required: true,
      description: 'Annual utility costs'
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      type: 'currency',
      placeholder: 'Enter maintenance',
      required: true,
      description: 'Annual maintenance costs'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      type: 'currency',
      placeholder: 'Enter marketing',
      required: true,
      description: 'Annual marketing costs'
    },
    {
      id: 'otherExpenses',
      label: 'Other Expenses',
      type: 'currency',
      placeholder: 'Enter other expenses',
      required: true,
      description: 'Other annual operating expenses'
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate (%)',
      type: 'percentage',
      placeholder: 'Enter exit cap rate',
      required: true,
      description: 'Cap rate for exit valuation'
    },
    {
      id: 'appreciationRate',
      label: 'Appreciation Rate (%)',
      type: 'percentage',
      placeholder: 'Enter appreciation rate',
      required: true,
      description: 'Expected annual appreciation rate'
    },
    {
      id: 'financingRate',
      label: 'Financing Rate (%)',
      type: 'percentage',
      placeholder: 'Enter financing rate',
      required: true,
      description: 'Interest rate on construction loan'
    },
    {
      id: 'loanToCostRatio',
      label: 'Loan-to-Cost Ratio (%)',
      type: 'percentage',
      placeholder: 'Enter loan-to-cost ratio',
      required: true,
      description: 'Percentage of project cost financed'
    },
    {
      id: 'interestOnlyPeriod',
      label: 'Interest-Only Period (Years)',
      type: 'number',
      placeholder: 'Enter interest-only period',
      required: true,
      description: 'Years of interest-only payments'
    }
  ],
  outputs: [
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost',
      type: 'currency',
      description: 'Total cost of the development project'
    },
    {
      id: 'totalFinancing',
      label: 'Total Financing',
      type: 'currency',
      description: 'Total amount of debt financing'
    },
    {
      id: 'equityRequired',
      label: 'Equity Required',
      type: 'currency',
      description: 'Amount of equity required'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      description: 'Expected value at exit'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      description: 'Total return on investment'
    },
    {
      id: 'irr',
      label: 'IRR',
      type: 'percentage',
      description: 'Internal Rate of Return'
    },
    {
      id: 'multiple',
      label: 'Multiple',
      type: 'decimal',
      description: 'Multiple of original investment'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage',
      type: 'decimal',
      description: 'Debt service coverage ratio'
    },
    {
      id: 'breakEvenOccupancy',
      label: 'Break-Even Occupancy',
      type: 'percentage',
      description: 'Occupancy rate needed to break even'
    }
  ],
  calculate: (inputs: RealEstateDevelopmentProformaInputs): RealEstateDevelopmentProformaOutputs => {
    const validation = validateRealEstateDevelopmentProformaInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateDevelopmentProforma(inputs);
  },
  validate: validateRealEstateDevelopmentProformaInputs
};