import { Calculator } from '../../types/calculator';
import { concreteCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const concreteCalculator: Calculator = {
  id: 'concrete-calculator',
  title: 'Concrete Calculator',
  category: 'construction',
  subcategory: 'Material Calculators',
  description: 'Calculate concrete volume, materials needed, and project costs with industry-standard waste factors, regional pricing, and labor estimates.',
  
  usageInstructions: [
    'Enter the length, width, and thickness of your concrete project',
    'Select the concrete strength (PSI) required for your application',
    'Add waste factor percentage (typically 5-10% for slabs)',
    'Include delivery distance for accurate pricing',
    'Choose finish type and reinforcement options',
    'Review material quantities and total project costs'
  ],

  inputs: [
    {
      id: 'length',
      label: 'Length (feet)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Length of the concrete area in feet',
      defaultValue: 20,
      min: 1,
      max: 1000
    },
    {
      id: 'width',
      label: 'Width (feet)',
      type: 'number',
      required: true,
      placeholder: '15',
      tooltip: 'Width of the concrete area in feet',
      defaultValue: 15,
      min: 1,
      max: 1000
    },
    {
      id: 'thickness',
      label: 'Thickness (inches)',
      type: 'number',
      required: true,
      placeholder: '4',
      tooltip: 'Thickness of concrete slab in inches',
      defaultValue: 4,
      min: 2,
      max: 24,
      step: 0.5
    },
    {
      id: 'wasteFactor',
      label: 'Waste Factor (%)',
      type: 'percentage',
      required: true,
      placeholder: '10',
      tooltip: 'Additional concrete to account for waste and spillage',
      defaultValue: 10,
      step: 1
    },
    {
      id: 'concreteStrength',
      label: 'Concrete Strength (PSI)',
      type: 'select',
      required: true,
      options: [
        { value: '2500', label: '2500 PSI (Residential walkways)' },
        { value: '3000', label: '3000 PSI (Driveways, patios)' },
        { value: '3500', label: '3500 PSI (Foundation walls)' },
        { value: '4000', label: '4000 PSI (Heavy-duty slabs)' },
        { value: '4500', label: '4500 PSI (Commercial applications)' },
        { value: '5000', label: '5000 PSI (High-strength applications)' }
      ],
      tooltip: 'Concrete compressive strength for your application',
      defaultValue: '3000'
    },
    {
      id: 'deliveryDistance',
      label: 'Delivery Distance (miles)',
      type: 'number',
      required: true,
      placeholder: '15',
      tooltip: 'Distance from concrete plant (affects delivery cost)',
      defaultValue: 15,
      min: 0,
      max: 100
    },
    {
      id: 'laborIncluded',
      label: 'Include Labor Costs?',
      type: 'boolean',
      required: true,
      tooltip: 'Include labor costs for pouring and finishing',
      defaultValue: true
    },
    {
      id: 'finishType',
      label: 'Finish Type',
      type: 'select',
      required: true,
      options: [
        { value: 'broom', label: 'Broom Finish (Standard)' },
        { value: 'smooth', label: 'Smooth Trowel Finish' },
        { value: 'stamped', label: 'Stamped/Decorative' },
        { value: 'exposed-aggregate', label: 'Exposed Aggregate' }
      ],
      tooltip: 'Type of concrete finish (affects labor cost)',
      defaultValue: 'broom'
    },
    {
      id: 'reinforcement',
      label: 'Reinforcement',
      type: 'select',
      required: true,
      options: [
        { value: 'none', label: 'No Reinforcement' },
        { value: 'wire-mesh', label: 'Wire Mesh' },
        { value: 'rebar', label: 'Rebar' }
      ],
      tooltip: 'Type of reinforcement (affects cost)',
      defaultValue: 'wire-mesh'
    }
  ],

  outputs: [
    {
      id: 'area',
      label: 'Total Area',
      type: 'number',
      explanation: 'Total square footage of the concrete project'
    },
    {
      id: 'baseVolume',
      label: 'Base Volume',
      type: 'number',
      explanation: 'Concrete volume needed without waste factor (cubic yards)'
    },
    {
      id: 'concreteNeeded',
      label: 'Concrete Needed',
      type: 'number',
      explanation: 'Total concrete volume including waste factor (cubic yards)'
    },
    {
      id: 'bagsNeeded',
      label: 'Bags Needed (80lb)',
      type: 'number',
      explanation: 'Number of 80lb concrete bags needed for small projects'
    },
    {
      id: 'concreteCost',
      label: 'Concrete Cost',
      type: 'currency',
      explanation: 'Cost of ready-mix concrete including delivery'
    },
    {
      id: 'laborCost',
      label: 'Labor Cost',
      type: 'currency',
      explanation: 'Estimated labor cost for pouring and finishing'
    },
    {
      id: 'totalCost',
      label: 'Total Project Cost',
      type: 'currency',
      explanation: 'Total cost including materials and labor'
    },
    {
      id: 'costPerSquareFoot',
      label: 'Cost Per Square Foot',
      type: 'currency',
      explanation: 'Total project cost per square foot'
    }
  ],

  formulas: [concreteCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('length', 'Length is required'),
    ValidationRuleFactory.required('width', 'Width is required'),
    ValidationRuleFactory.required('thickness', 'Thickness is required'),
    ValidationRuleFactory.required('wasteFactor', 'Waste factor is required'),
    ValidationRuleFactory.required('concreteStrength', 'Concrete strength is required'),
    ValidationRuleFactory.required('deliveryDistance', 'Delivery distance is required'),
    
    ValidationRuleFactory.positive('length', 'Length must be positive'),
    ValidationRuleFactory.positive('width', 'Width must be positive'),
    ValidationRuleFactory.positive('thickness', 'Thickness must be positive'),
    ValidationRuleFactory.range('thickness', 2, 24, 'Thickness must be between 2 and 24 inches'),
    ValidationRuleFactory.range('wasteFactor', 0, 50, 'Waste factor must be between 0% and 50%'),
    ValidationRuleFactory.nonNegative('deliveryDistance', 'Delivery distance cannot be negative'),
    
    ValidationRuleFactory.businessRule(
      'thickness',
      (thickness, allInputs) => {
        const strength = allInputs?.concreteStrength;
        if (strength === '2500' && thickness > 6) {
          return false;
        }
        return true;
      },
      '2500 PSI concrete is typically used for thinner applications (≤6 inches)'
    )
  ],

  examples: [
    {
      title: 'Residential Driveway',
      description: 'Standard residential driveway with broom finish',
      inputs: {
        length: 24,
        width: 12,
        thickness: 4,
        wasteFactor: 10,
        concreteStrength: '3000',
        deliveryDistance: 12,
        laborIncluded: true,
        finishType: 'broom',
        reinforcement: 'wire-mesh'
      },
      expectedOutputs: {
        area: 288,
        concreteNeeded: 3.9,
        totalCost: 1650
      }
    },
    {
      title: 'Patio Slab',
      description: 'Decorative stamped concrete patio',
      inputs: {
        length: 16,
        width: 12,
        thickness: 4,
        wasteFactor: 8,
        concreteStrength: '3000',
        deliveryDistance: 8,
        laborIncluded: true,
        finishType: 'stamped',
        reinforcement: 'wire-mesh'
      },
      expectedOutputs: {
        area: 192,
        concreteNeeded: 2.6,
        totalCost: 1890
      }
    }
  ]
};