import { Calculator } from '../../../types/calculator';
import { unitConversionCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const unitConversionCalculator: Calculator = {
  id: 'unit-conversion-calculator',
  title: 'Comprehensive Unit Conversion System',
  category: 'math',
  subcategory: 'Unit Conversion',
  description: 'Complete unit conversion system supporting all measurement systems including metric, imperial, scientific units, and specialized conversions with high precision.',
  
  usageInstructions: [
    'Select the category of units you want to convert (length, weight, temperature, etc.)',
    'Choose the source unit you are converting from',
    'Choose the target unit you are converting to',
    'Enter the value to convert',
    'Review the conversion result with formula explanation'
  ],

  inputs: [
    {
      id: 'category',
      label: 'Unit Category',
      type: 'select',
      required: true,
      options: [
        { value: 'length', label: 'Length & Distance' },
        { value: 'weight', label: 'Weight & Mass' },
        { value: 'temperature', label: 'Temperature' },
        { value: 'volume', label: 'Volume & Capacity' },
        { value: 'area', label: 'Area' },
        { value: 'speed', label: 'Speed & Velocity' },
        { value: 'pressure', label: 'Pressure' },
        { value: 'energy', label: 'Energy & Power' },
        { value: 'time', label: 'Time' },
        { value: 'digital', label: 'Digital Storage' }
      ],
      tooltip: 'Choose the category of units to convert'
    },
    {
      id: 'fromUnit',
      label: 'From Unit',
      type: 'select',
      required: true,
      options: [], // Will be populated based on category
      tooltip: 'Unit you are converting from'
    },
    {
      id: 'toUnit',
      label: 'To Unit',
      type: 'select',
      required: true,
      options: [], // Will be populated based on category
      tooltip: 'Unit you are converting to'
    },
    {
      id: 'value',
      label: 'Value to Convert',
      type: 'number',
      required: true,
      placeholder: '1',
      tooltip: 'Enter the numerical value to convert'
    },
    {
      id: 'precision',
      label: 'Decimal Precision',
      type: 'select',
      required: true,
      options: [
        { value: '2', label: '2 decimal places' },
        { value: '4', label: '4 decimal places' },
        { value: '6', label: '6 decimal places' },
        { value: '8', label: '8 decimal places' },
        { value: '10', label: '10 decimal places' }
      ],
      defaultValue: '6',
      tooltip: 'Number of decimal places for the result'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Converted Value',
      type: 'number',
      explanation: 'The converted value in the target unit'
    },
    {
      id: 'formula',
      label: 'Conversion Formula',
      type: 'text',
      explanation: 'The mathematical formula used for conversion'
    },
    {
      id: 'conversionFactor',
      label: 'Conversion Factor',
      type: 'number',
      explanation: 'The multiplication factor used in conversion'
    },
    {
      id: 'reverseConversion',
      label: 'Reverse Conversion',
      type: 'text',
      explanation: 'How to convert back to the original unit'
    },
    {
      id: 'commonEquivalents',
      label: 'Common Equivalents',
      type: 'text',
      explanation: 'Common equivalent values in other units'
    }
  ],

  formulas: [unitConversionCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('category', 'Unit category is required'),
    ValidationRuleFactory.required('fromUnit', 'Source unit is required'),
    ValidationRuleFactory.required('toUnit', 'Target unit is required'),
    ValidationRuleFactory.required('value', 'Value to convert is required'),
    ValidationRuleFactory.required('precision', 'Precision is required'),
    
    ValidationRuleFactory.businessRule(
      'value',
      (value, inputs) => {
        if (inputs?.category === 'temperature' && inputs?.fromUnit === 'kelvin') {
          return value >= 0;
        }
        return true;
      },
      'Kelvin temperature cannot be negative'
    ),
    
    ValidationRuleFactory.businessRule(
      'fromUnit',
      (fromUnit, inputs) => {
        return fromUnit !== inputs?.toUnit;
      },
      'Source and target units must be different'
    )
  ],

  examples: [
    {
      title: 'Length Conversion',
      description: 'Convert 100 meters to feet',
      inputs: {
        category: 'length',
        fromUnit: 'meter',
        toUnit: 'foot',
        value: 100,
        precision: 4
      },
      expectedOutputs: {
        result: 328.084,
        formula: '1 meter = 3.28084 feet'
      }
    },
    {
      title: 'Temperature Conversion',
      description: 'Convert 100°C to Fahrenheit',
      inputs: {
        category: 'temperature',
        fromUnit: 'celsius',
        toUnit: 'fahrenheit',
        value: 100,
        precision: 2
      },
      expectedOutputs: {
        result: 212,
        formula: '°F = (°C × 9/5) + 32'
      }
    }
  ]
};