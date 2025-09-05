import { Calculator } from '../../types';
import { PropertyTaxInputs, PropertyTaxOutputs } from './types';
import { calculatePropertyTax } from './formulas';
import { validatePropertyTaxInputs, getValidationErrors } from './validation';

export const propertyTaxCalculator: Calculator<PropertyTaxInputs, PropertyTaxOutputs> = {
  name: 'Property Tax Calculator',
  description: 'Calculate property taxes including exemptions, assessments, and local taxes',
  category: 'Finance',
  tags: ['property', 'tax', 'real estate', 'exemptions', 'assessment'],
  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      placeholder: 'Enter property value',
      required: true,
      description: 'The assessed or market value of the property'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      placeholder: 'Enter tax rate',
      required: true,
      description: 'Annual property tax rate as a percentage'
    },
    {
      id: 'exemptions',
      label: 'General Exemptions',
      type: 'currency',
      placeholder: 'Enter exemption amount',
      required: false,
      description: 'General property tax exemptions'
    },
    {
      id: 'assessmentRatio',
      label: 'Assessment Ratio',
      type: 'decimal',
      placeholder: '1.0',
      required: false,
      description: 'Ratio of assessed value to market value (default: 1.0)'
    },
    {
      id: 'homesteadExemption',
      label: 'Homestead Exemption',
      type: 'currency',
      placeholder: 'Enter homestead exemption',
      required: false,
      description: 'Homestead exemption amount'
    },
    {
      id: 'seniorExemption',
      label: 'Senior Exemption',
      type: 'currency',
      placeholder: 'Enter senior exemption',
      required: false,
      description: 'Senior citizen exemption amount'
    },
    {
      id: 'disabilityExemption',
      label: 'Disability Exemption',
      type: 'currency',
      placeholder: 'Enter disability exemption',
      required: false,
      description: 'Disability exemption amount'
    },
    {
      id: 'veteranExemption',
      label: 'Veteran Exemption',
      type: 'currency',
      placeholder: 'Enter veteran exemption',
      required: false,
      description: 'Veteran exemption amount'
    },
    {
      id: 'localTaxes',
      label: 'Local Taxes',
      type: 'currency',
      placeholder: 'Enter local taxes',
      required: false,
      description: 'Additional local taxes and fees'
    },
    {
      id: 'specialAssessments',
      label: 'Special Assessments',
      type: 'currency',
      placeholder: 'Enter special assessments',
      required: false,
      description: 'Special assessments and district taxes'
    }
  ],
  outputs: [
    {
      id: 'assessedValue',
      label: 'Assessed Value',
      type: 'currency',
      description: 'The assessed value of the property'
    },
    {
      id: 'taxableValue',
      label: 'Taxable Value',
      type: 'currency',
      description: 'Assessed value minus all exemptions'
    },
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      description: 'Total annual property tax amount'
    },
    {
      id: 'monthlyPropertyTax',
      label: 'Monthly Property Tax',
      type: 'currency',
      description: 'Monthly property tax payment'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      description: 'Actual tax rate as percentage of property value'
    },
    {
      id: 'totalExemptions',
      label: 'Total Exemptions',
      type: 'currency',
      description: 'Sum of all exemptions applied'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      description: 'Amount saved due to exemptions'
    }
  ],
  calculate: (inputs: PropertyTaxInputs): PropertyTaxOutputs => {
    const validation = validatePropertyTaxInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculatePropertyTax(inputs);
  },
  validate: validatePropertyTaxInputs
};