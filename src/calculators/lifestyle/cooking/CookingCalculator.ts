import { Calculator } from '../../types/calculator';
import { cookingCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const cookingCalculator: Calculator = {
  id: 'cooking-calculator',
  title: 'Comprehensive Cooking & Recipe Calculator',
  category: 'lifestyle',
  subcategory: 'Cooking & Food',
  description: 'Complete cooking calculator supporting recipe scaling, unit conversions, nutritional analysis, cooking time adjustments, and meal planning with ingredient substitutions.',
  
  usageInstructions: [
    'Select the type of cooking calculation (recipe scaling, unit conversion, or cooking time)',
    'Enter your original recipe details or measurements',
    'Specify the desired serving size or target measurements',
    'For cooking time adjustments, enter oven temperature changes',
    'Review scaled recipe with adjusted ingredients and cooking instructions'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'recipe_scaling', label: 'Recipe Scaling' },
        { value: 'unit_conversion', label: 'Cooking Unit Conversion' },
        { value: 'cooking_time', label: 'Cooking Time & Temperature' },
        { value: 'nutritional', label: 'Nutritional Analysis' },
        { value: 'substitution', label: 'Ingredient Substitution' },
        { value: 'meal_planning', label: 'Meal Planning & Portions' }
      ],
      tooltip: 'Choose the type of cooking calculation'
    },
    {
      id: 'originalServings',
      label: 'Original Servings',
      type: 'number',
      required: false,
      min: 1,
      max: 100,
      placeholder: '4',
      tooltip: 'Number of servings in original recipe'
    },
    {
      id: 'desiredServings',
      label: 'Desired Servings',
      type: 'number',
      required: false,
      min: 1,
      max: 500,
      placeholder: '8',
      tooltip: 'Number of servings you want to make'
    },
    {
      id: 'ingredients',
      label: 'Recipe Ingredients',
      type: 'select', // Custom component for ingredient list
      required: false,
      placeholder: '2 cups flour, 1 tsp salt, 3 eggs',
      tooltip: 'List ingredients with quantities (one per line)'
    },
    {
      id: 'originalAmount',
      label: 'Original Amount',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Original quantity to convert'
    },
    {
      id: 'originalUnit',
      label: 'Original Unit',
      type: 'select',
      required: false,
      options: [
        { value: 'cup', label: 'Cup' },
        { value: 'tablespoon', label: 'Tablespoon (tbsp)' },
        { value: 'teaspoon', label: 'Teaspoon (tsp)' },
        { value: 'fluid_ounce', label: 'Fluid Ounce (fl oz)' },
        { value: 'pint', label: 'Pint' },
        { value: 'quart', label: 'Quart' },
        { value: 'gallon', label: 'Gallon' },
        { value: 'milliliter', label: 'Milliliter (mL)' },
        { value: 'liter', label: 'Liter (L)' },
        { value: 'pound', label: 'Pound (lb)' },
        { value: 'ounce', label: 'Ounce (oz)' },
        { value: 'gram', label: 'Gram (g)' },
        { value: 'kilogram', label: 'Kilogram (kg)' }
      ],
      tooltip: 'Unit of the original measurement'
    },
    {
      id: 'targetUnit',
      label: 'Target Unit',
      type: 'select',
      required: false,
      options: [
        { value: 'cup', label: 'Cup' },
        { value: 'tablespoon', label: 'Tablespoon (tbsp)' },
        { value: 'teaspoon', label: 'Teaspoon (tsp)' },
        { value: 'fluid_ounce', label: 'Fluid Ounce (fl oz)' },
        { value: 'pint', label: 'Pint' },
        { value: 'quart', label: 'Quart' },
        { value: 'gallon', label: 'Gallon' },
        { value: 'milliliter', label: 'Milliliter (mL)' },
        { value: 'liter', label: 'Liter (L)' },
        { value: 'pound', label: 'Pound (lb)' },
        { value: 'ounce', label: 'Ounce (oz)' },
        { value: 'gram', label: 'Gram (g)' },
        { value: 'kilogram', label: 'Kilogram (kg)' }
      ],
      tooltip: 'Unit to convert to'
    },
    {
      id: 'originalTemp',
      label: 'Original Temperature (°F)',
      type: 'number',
      required: false,
      min: 200,
      max: 500,
      placeholder: '350',
      tooltip: 'Original oven temperature in Fahrenheit'
    },
    {
      id: 'targetTemp',
      label: 'Target Temperature (°F)',
      type: 'number',
      required: false,
      min: 200,
      max: 500,
      placeholder: '375',
      tooltip: 'Desired oven temperature in Fahrenheit'
    },
    {
      id: 'originalCookTime',
      label: 'Original Cook Time (minutes)',
      type: 'number',
      required: false,
      min: 1,
      max: 480,
      placeholder: '30',
      tooltip: 'Original cooking time in minutes'
    },
    {
      id: 'panSize',
      label: 'Pan Size Change',
      type: 'select',
      required: false,
      options: [
        { value: 'same', label: 'Same Size' },
        { value: 'smaller', label: 'Smaller Pan' },
        { value: 'larger', label: 'Larger Pan' },
        { value: 'different_shape', label: 'Different Shape' }
      ],
      defaultValue: 'same',
      tooltip: 'How the pan size has changed'
    },
    {
      id: 'ingredient',
      label: 'Ingredient to Substitute',
      type: 'select',
      required: false,
      options: [
        { value: 'butter', label: 'Butter' },
        { value: 'sugar', label: 'Sugar' },
        { value: 'flour', label: 'All-Purpose Flour' },
        { value: 'eggs', label: 'Eggs' },
        { value: 'milk', label: 'Milk' },
        { value: 'baking_powder', label: 'Baking Powder' },
        { value: 'vanilla', label: 'Vanilla Extract' },
        { value: 'chocolate', label: 'Chocolate' }
      ],
      tooltip: 'Ingredient you want to substitute'
    }
  ],

  outputs: [
    {
      id: 'scaledRecipe',
      label: 'Scaled Recipe',
      type: 'text',
      explanation: 'Recipe ingredients adjusted for new serving size'
    },
    {
      id: 'convertedAmount',
      label: 'Converted Amount',
      type: 'text',
      explanation: 'Original measurement converted to target unit'
    },
    {
      id: 'adjustedCookTime',
      label: 'Adjusted Cook Time',
      type: 'text',
      explanation: 'Cooking time adjusted for temperature change'
    },
    {
      id: 'cookingTips',
      label: 'Cooking Tips',
      type: 'text',
      explanation: 'Helpful tips for the adjusted recipe'
    },
    {
      id: 'substitutions',
      label: 'Ingredient Substitutions',
      type: 'text',
      explanation: 'Alternative ingredients and ratios'
    },
    {
      id: 'nutritionalInfo',
      label: 'Nutritional Information',
      type: 'text',
      explanation: 'Estimated nutritional content per serving'
    },
    {
      id: 'scalingFactor',
      label: 'Scaling Factor',
      type: 'number',
      explanation: 'Multiplier used to scale the recipe'
    },
    {
      id: 'conversionFactor',
      label: 'Conversion Factor',
      type: 'number',
      explanation: 'Factor used for unit conversion'
    }
  ],

  formulas: [cookingCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    
    ValidationRuleFactory.businessRule(
      'desiredServings',
      (servings, inputs) => {
        if (inputs?.calculationType === 'recipe_scaling' && !servings) {
          return false;
        }
        return true;
      },
      'Desired servings is required for recipe scaling'
    ),
    
    ValidationRuleFactory.businessRule(
      'originalAmount',
      (amount, inputs) => {
        if (inputs?.calculationType === 'unit_conversion' && !amount) {
          return false;
        }
        return true;
      },
      'Original amount is required for unit conversion'
    ),
    
    ValidationRuleFactory.businessRule(
      'originalTemp',
      (temp, inputs) => {
        if (inputs?.calculationType === 'cooking_time' && !temp) {
          return false;
        }
        return true;
      },
      'Original temperature is required for cooking time calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'targetTemp',
      (temp, inputs) => {
        if (inputs?.calculationType === 'cooking_time' && !temp) {
          return false;
        }
        return true;
      },
      'Target temperature is required for cooking time calculations'
    )
  ],

  examples: [
    {
      title: 'Recipe Scaling',
      description: 'Scale a 4-serving recipe to 8 servings',
      inputs: {
        calculationType: 'recipe_scaling',
        originalServings: 4,
        desiredServings: 8,
        ingredients: ['2 cups flour', '1 tsp salt', '3 eggs', '1 cup milk']
      },
      expectedOutputs: {
        scaledRecipe: '4 cups flour, 2 tsp salt, 6 eggs, 2 cups milk',
        scalingFactor: 2
      }
    },
    {
      title: 'Unit Conversion',
      description: 'Convert 2 cups to tablespoons',
      inputs: {
        calculationType: 'unit_conversion',
        originalAmount: 2,
        originalUnit: 'cup',
        targetUnit: 'tablespoon'
      },
      expectedOutputs: {
        convertedAmount: '32 tablespoons',
        conversionFactor: 16
      }
    }
  ]
};