import { Calculator } from '../../types/calculator';
import { geometryCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const geometryCalculator: Calculator = {
  id: 'geometry-calculator',
  title: 'Advanced Geometry & Trigonometry Calculator',
  category: 'math',
  subcategory: 'Geometry & Trigonometry',
  description: 'Comprehensive geometry calculator supporting 2D/3D shapes, trigonometric functions, coordinate geometry, and visual representations with detailed calculations.',
  
  usageInstructions: [
    'Select the type of geometric calculation (2D shapes, 3D solids, trigonometry, or coordinate geometry)',
    'Enter the required measurements and parameters',
    'For triangles, specify known sides and angles',
    'For coordinate geometry, enter point coordinates',
    'Review calculations with visual representations and formulas'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'triangle', label: 'Triangle Analysis' },
        { value: 'circle', label: 'Circle Calculations' },
        { value: 'rectangle', label: 'Rectangle/Square' },
        { value: 'polygon', label: 'Regular Polygon' },
        { value: 'sphere', label: 'Sphere' },
        { value: 'cylinder', label: 'Cylinder' },
        { value: 'cone', label: 'Cone' },
        { value: 'trigonometry', label: 'Trigonometric Functions' },
        { value: 'coordinate', label: 'Coordinate Geometry' }
      ],
      tooltip: 'Choose the type of geometric calculation'
    },
    {
      id: 'sideA',
      label: 'Side A / Radius / Length',
      type: 'number',
      required: false,
      min: 0,
      placeholder: '5',
      tooltip: 'First side length, radius, or primary dimension'
    },
    {
      id: 'sideB',
      label: 'Side B / Width / Height',
      type: 'number',
      required: false,
      min: 0,
      placeholder: '3',
      tooltip: 'Second side length, width, or height'
    },
    {
      id: 'sideC',
      label: 'Side C / Depth',
      type: 'number',
      required: false,
      min: 0,
      placeholder: '4',
      tooltip: 'Third side length or depth dimension'
    },
    {
      id: 'angleA',
      label: 'Angle A (degrees)',
      type: 'number',
      required: false,
      min: 0,
      max: 180,
      placeholder: '60',
      tooltip: 'First angle in degrees'
    },
    {
      id: 'angleB',
      label: 'Angle B (degrees)',
      type: 'number',
      required: false,
      min: 0,
      max: 180,
      placeholder: '90',
      tooltip: 'Second angle in degrees'
    },
    {
      id: 'angleC',
      label: 'Angle C (degrees)',
      type: 'number',
      required: false,
      min: 0,
      max: 180,
      placeholder: '30',
      tooltip: 'Third angle in degrees'
    }
  ],

  outputs: [
    {
      id: 'area',
      label: 'Area',
      type: 'number',
      explanation: 'Surface area or cross-sectional area'
    },
    {
      id: 'perimeter',
      label: 'Perimeter/Circumference',
      type: 'number',
      explanation: 'Perimeter, circumference, or edge length'
    },
    {
      id: 'volume',
      label: 'Volume',
      type: 'number',
      explanation: 'Volume for 3D shapes'
    },
    {
      id: 'surfaceArea',
      label: 'Surface Area',
      type: 'number',
      explanation: 'Total surface area for 3D shapes'
    },
    {
      id: 'angles',
      label: 'All Angles',
      type: 'text',
      explanation: 'All angles in the shape'
    },
    {
      id: 'sides',
      label: 'All Sides',
      type: 'text',
      explanation: 'All side lengths'
    }
  ],

  formulas: [geometryCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    
    ValidationRuleFactory.businessRule(
      'sideA',
      (value, inputs) => {
        if (inputs?.calculationType === 'triangle' && value) {
          return value > 0;
        }
        return true;
      },
      'Side lengths must be positive'
    ),
    
    ValidationRuleFactory.businessRule(
      'angleA',
      (value, inputs) => {
        if (inputs?.calculationType === 'triangle' && value) {
          return value > 0 && value < 180;
        }
        return true;
      },
      'Angles must be between 0 and 180 degrees'
    )
  ],

  examples: [
    {
      title: 'Right Triangle',
      description: 'Calculate properties of a 3-4-5 right triangle',
      inputs: {
        calculationType: 'triangle',
        sideA: 3,
        sideB: 4,
        sideC: 5
      },
      expectedOutputs: {
        area: 6,
        perimeter: 12,
        angles: 'A: 36.87°, B: 53.13°, C: 90°'
      }
    },
    {
      title: 'Circle',
      description: 'Calculate area and circumference of circle with radius 5',
      inputs: {
        calculationType: 'circle',
        sideA: 5
      },
      expectedOutputs: {
        area: 78.54,
        perimeter: 31.42
      }
    }
  ]
};