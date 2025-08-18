import { Formula, CalculationResult } from '../../../types/calculator';

export interface CookingInputs {
  calculationType: 'recipe_scaling' | 'unit_conversion' | 'cooking_time' | 'nutritional' | 'substitution' | 'meal_planning';
  originalServings?: number;
  desiredServings?: number;
  ingredients?: string[];
  originalAmount?: number;
  originalUnit?: string;
  targetUnit?: string;
  originalTemp?: number;
  targetTemp?: number;
  originalCookTime?: number;
  panSize?: string;
  ingredient?: string;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}

export class CookingFormulas {
  // Cooking unit conversion factors (to cups for volume, to grams for weight)
  private static readonly VOLUME_CONVERSIONS: Record<string, number> = {
    'teaspoon': 1/48,
    'tablespoon': 1/16,
    'fluid_ounce': 1/8,
    'cup': 1,
    'pint': 2,
    'quart': 4,
    'gallon': 16,
    'milliliter': 1/236.588,
    'liter': 4.22675
  };

  private static readonly WEIGHT_CONVERSIONS: Record<string, number> = {
    'ounce': 28.3495,
    'pound': 453.592,
    'gram': 1,
    'kilogram': 1000
  };

  // Common ingredient substitutions
  private static readonly SUBSTITUTIONS: Record<string, Array<{substitute: string, ratio: string, notes: string}>> = {
    'butter': [
      { substitute: 'vegetable oil', ratio: '3/4 the amount', notes: 'Use 3/4 cup oil for 1 cup butter' },
      { substitute: 'applesauce', ratio: '1/2 the amount', notes: 'For baking, reduces fat content' },
      { substitute: 'margarine', ratio: '1:1', notes: 'Direct substitution' }
    ],
    'sugar': [
      { substitute: 'honey', ratio: '3/4 the amount', notes: 'Reduce liquid by 1/4 cup' },
      { substitute: 'maple syrup', ratio: '3/4 the amount', notes: 'Reduce liquid by 3 tbsp' },
      { substitute: 'brown sugar', ratio: '1:1', notes: 'Packed measurement' }
    ],
    'flour': [
      { substitute: 'almond flour', ratio: '1:1', notes: 'May need binding agent' },
      { substitute: 'coconut flour', ratio: '1/4 the amount', notes: 'Highly absorbent' },
      { substitute: 'oat flour', ratio: '1:1', notes: 'Blend oats to make flour' }
    ],
    'eggs': [
      { substitute: 'flax eggs', ratio: '1 tbsp ground flax + 3 tbsp water per egg', notes: 'Let sit 5 minutes' },
      { substitute: 'applesauce', ratio: '1/4 cup per egg', notes: 'For binding in baking' },
      { substitute: 'banana', ratio: '1/4 cup mashed per egg', notes: 'Adds sweetness' }
    ],
    'milk': [
      { substitute: 'almond milk', ratio: '1:1', notes: 'Unsweetened preferred' },
      { substitute: 'coconut milk', ratio: '1:1', notes: 'Canned for richness' },
      { substitute: 'water + butter', ratio: '1 cup water + 1 tbsp butter', notes: 'For cooking' }
    ]
  };

  /**
   * Parse ingredient string into structured format
   */
  static parseIngredient(ingredientStr: string): Ingredient {
    // Simple parsing - in practice would use more sophisticated NLP
    const parts = ingredientStr.trim().split(' ');
    let amount = 1;
    let unit = '';
    let name = '';

    // Try to extract amount
    const amountMatch = parts[0].match(/^(\d+(?:\.\d+)?|\d+\/\d+)/);
    if (amountMatch) {
      const amountStr = amountMatch[1];
      if (amountStr.includes('/')) {
        const [num, den] = amountStr.split('/');
        amount = parseInt(num) / parseInt(den);
      } else {
        amount = parseFloat(amountStr);
      }
      parts.shift();
    }

    // Try to extract unit
    if (parts.length > 0) {
      const possibleUnit = parts[0].toLowerCase();
      const unitAliases: Record<string, string> = {
        'tsp': 'teaspoon',
        'tbsp': 'tablespoon',
        'c': 'cup',
        'cups': 'cup',
        'oz': 'ounce',
        'lb': 'pound',
        'lbs': 'pound',
        'g': 'gram',
        'kg': 'kilogram',
        'ml': 'milliliter',
        'l': 'liter'
      };
      
      if (unitAliases[possibleUnit] || this.VOLUME_CONVERSIONS[possibleUnit] || this.WEIGHT_CONVERSIONS[possibleUnit]) {
        unit = unitAliases[possibleUnit] || possibleUnit;
        parts.shift();
      }
    }

    name = parts.join(' ');

    return { amount, unit, name };
  }

  /**
   * Scale recipe ingredients
   */
  static scaleRecipe(ingredients: string[], scalingFactor: number): {
    scaledIngredients: string[];
    scalingFactor: number;
  } {
    const scaledIngredients = ingredients.map(ingredientStr => {
      const ingredient = this.parseIngredient(ingredientStr);
      const scaledAmount = ingredient.amount * scalingFactor;
      
      // Format scaled amount nicely
      let formattedAmount: string;
      if (scaledAmount < 0.125) {
        formattedAmount = `${Math.round(scaledAmount * 16)}/16`;
      } else if (scaledAmount < 1) {
        const fraction = this.decimalToFraction(scaledAmount);
        formattedAmount = fraction;
      } else if (scaledAmount % 1 === 0) {
        formattedAmount = scaledAmount.toString();
      } else {
        formattedAmount = scaledAmount.toFixed(2);
      }

      return `${formattedAmount}${ingredient.unit ? ' ' + ingredient.unit : ''} ${ingredient.name}`.trim();
    });

    return { scaledIngredients, scalingFactor };
  }

  /**
   * Convert between cooking units
   */
  static convertCookingUnits(amount: number, fromUnit: string, toUnit: string): {
    convertedAmount: number;
    conversionFactor: number;
    formattedResult: string;
  } {
    let convertedAmount: number;
    let conversionFactor: number;

    // Check if both units are volume units
    if (this.VOLUME_CONVERSIONS[fromUnit] && this.VOLUME_CONVERSIONS[toUnit]) {
      const amountInCups = amount * this.VOLUME_CONVERSIONS[fromUnit];
      convertedAmount = amountInCups / this.VOLUME_CONVERSIONS[toUnit];
      conversionFactor = this.VOLUME_CONVERSIONS[fromUnit] / this.VOLUME_CONVERSIONS[toUnit];
    }
    // Check if both units are weight units
    else if (this.WEIGHT_CONVERSIONS[fromUnit] && this.WEIGHT_CONVERSIONS[toUnit]) {
      const amountInGrams = amount * this.WEIGHT_CONVERSIONS[fromUnit];
      convertedAmount = amountInGrams / this.WEIGHT_CONVERSIONS[toUnit];
      conversionFactor = this.WEIGHT_CONVERSIONS[fromUnit] / this.WEIGHT_CONVERSIONS[toUnit];
    }
    else {
      throw new Error(`Cannot convert between ${fromUnit} and ${toUnit} - incompatible unit types`);
    }

    // Format result nicely
    let formattedResult: string;
    if (convertedAmount < 1 && convertedAmount > 0) {
      const fraction = this.decimalToFraction(convertedAmount);
      formattedResult = `${fraction} ${toUnit}${convertedAmount !== 1 ? 's' : ''}`;
    } else {
      formattedResult = `${convertedAmount.toFixed(2)} ${toUnit}${convertedAmount !== 1 ? 's' : ''}`;
    }

    return { convertedAmount, conversionFactor, formattedResult };
  }

  /**
   * Adjust cooking time for temperature changes
   */
  static adjustCookingTime(originalTime: number, originalTemp: number, targetTemp: number, panSize: string = 'same'): {
    adjustedTime: number;
    timeChange: number;
    recommendations: string[];
  } {
    // Basic temperature adjustment formula
    const tempRatio = originalTemp / targetTemp;
    let adjustedTime = originalTime * Math.pow(tempRatio, 0.67); // Empirical cooking formula

    // Pan size adjustments
    const panAdjustments: Record<string, number> = {
      'same': 1.0,
      'smaller': 1.15, // Thicker, takes longer
      'larger': 0.85,  // Thinner, cooks faster
      'different_shape': 1.0
    };

    adjustedTime *= panAdjustments[panSize] || 1.0;

    const timeChange = adjustedTime - originalTime;
    const recommendations: string[] = [];

    if (targetTemp > originalTemp) {
      recommendations.push('Higher temperature - watch carefully to prevent burning');
      recommendations.push('Check doneness 5-10 minutes early');
    } else if (targetTemp < originalTemp) {
      recommendations.push('Lower temperature - may take longer to cook');
      recommendations.push('Check internal temperature if applicable');
    }

    if (panSize === 'smaller') {
      recommendations.push('Smaller pan - food will be thicker and take longer');
    } else if (panSize === 'larger') {
      recommendations.push('Larger pan - food will be thinner and cook faster');
    }

    return {
      adjustedTime: Math.round(adjustedTime),
      timeChange: Math.round(timeChange),
      recommendations
    };
  }

  /**
   * Get ingredient substitutions
   */
  static getSubstitutions(ingredient: string): Array<{substitute: string, ratio: string, notes: string}> {
    return this.SUBSTITUTIONS[ingredient.toLowerCase()] || [];
  }

  /**
   * Convert decimal to fraction (simplified)
   */
  static decimalToFraction(decimal: number): string {
    const commonFractions: Record<string, string> = {
      '0.125': '1/8',
      '0.25': '1/4',
      '0.333': '1/3',
      '0.5': '1/2',
      '0.667': '2/3',
      '0.75': '3/4'
    };

    const rounded = Math.round(decimal * 1000) / 1000;
    const key = rounded.toString();
    
    if (commonFractions[key]) {
      return commonFractions[key];
    }

    // Simple fraction approximation
    for (let denominator = 2; denominator <= 16; denominator++) {
      const numerator = Math.round(decimal * denominator);
      if (Math.abs(decimal - numerator / denominator) < 0.01) {
        return `${numerator}/${denominator}`;
      }
    }

    return decimal.toFixed(2);
  }

  /**
   * Estimate nutritional information (simplified)
   */
  static estimateNutrition(ingredients: string[], servings: number): {
    caloriesPerServing: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    notes: string[];
  } {
    // This is a very simplified estimation - real implementation would use nutrition database
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    const nutritionEstimates: Record<string, {calories: number, protein: number, carbs: number, fat: number}> = {
      'flour': { calories: 455, protein: 13, carbs: 95, fat: 1 }, // per cup
      'sugar': { calories: 774, protein: 0, carbs: 200, fat: 0 }, // per cup
      'butter': { calories: 1628, protein: 2, carbs: 0, fat: 184 }, // per cup
      'eggs': { calories: 70, protein: 6, carbs: 1, fat: 5 }, // per egg
      'milk': { calories: 150, protein: 8, carbs: 12, fat: 8 } // per cup
    };

    ingredients.forEach(ingredientStr => {
      const ingredient = this.parseIngredient(ingredientStr);
      const name = ingredient.name.toLowerCase();
      
      // Simple keyword matching
      for (const [key, nutrition] of Object.entries(nutritionEstimates)) {
        if (name.includes(key)) {
          const factor = ingredient.unit === 'cup' ? ingredient.amount : ingredient.amount * 0.1;
          totalCalories += nutrition.calories * factor;
          totalProtein += nutrition.protein * factor;
          totalCarbs += nutrition.carbs * factor;
          totalFat += nutrition.fat * factor;
          break;
        }
      }
    });

    return {
      caloriesPerServing: Math.round(totalCalories / servings),
      proteinGrams: Math.round(totalProtein / servings),
      carbsGrams: Math.round(totalCarbs / servings),
      fatGrams: Math.round(totalFat / servings),
      notes: [
        'Nutritional values are estimates only',
        'Actual values may vary based on specific ingredients and preparation',
        'Consult nutrition labels for accurate information'
      ]
    };
  }
}

export const cookingCalculatorFormula: Formula = {
  id: 'cooking-calculator',
  name: 'Comprehensive Cooking & Recipe Calculator',
  description: 'Complete cooking calculations including recipe scaling, conversions, and substitutions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const cookingInputs = inputs as CookingInputs;
    
    try {
      let result: any = {};
      let explanation = '';
      let steps: any = {};

      switch (cookingInputs.calculationType) {
        case 'recipe_scaling':
          if (!cookingInputs.originalServings || !cookingInputs.desiredServings) {
            throw new Error('Original and desired servings required for recipe scaling');
          }
          
          const scalingFactor = cookingInputs.desiredServings / cookingInputs.originalServings;
          const ingredients = cookingInputs.ingredients || [];
          const scaled = CookingFormulas.scaleRecipe(ingredients, scalingFactor);
          
          result = {
            scaledRecipe: scaled.scaledIngredients.join(', '),
            scalingFactor: scalingFactor,
            cookingTips: scalingFactor > 2 ? 
              'Large batch - may need longer mixing time and larger cookware' :
              scalingFactor < 0.5 ?
              'Small batch - watch cooking times carefully, may cook faster' :
              'Standard scaling - cooking times should remain similar'
          };
          
          explanation = `Recipe scaled from ${cookingInputs.originalServings} to ${cookingInputs.desiredServings} servings (${scalingFactor.toFixed(2)}x)`;
          
          steps = {
            'Original Servings': cookingInputs.originalServings.toString(),
            'Desired Servings': cookingInputs.desiredServings.toString(),
            'Scaling Factor': scalingFactor.toFixed(2),
            'Ingredients Scaled': ingredients.length.toString()
          };
          break;

        case 'unit_conversion':
          if (!cookingInputs.originalAmount || !cookingInputs.originalUnit || !cookingInputs.targetUnit) {
            throw new Error('Amount and units required for conversion');
          }
          
          const conversion = CookingFormulas.convertCookingUnits(
            cookingInputs.originalAmount,
            cookingInputs.originalUnit,
            cookingInputs.targetUnit
          );
          
          result = {
            convertedAmount: conversion.formattedResult,
            conversionFactor: conversion.conversionFactor,
            cookingTips: `1 ${cookingInputs.originalUnit} = ${(1 * conversion.conversionFactor).toFixed(3)} ${cookingInputs.targetUnit}s`
          };
          
          explanation = `${cookingInputs.originalAmount} ${cookingInputs.originalUnit} = ${conversion.formattedResult}`;
          
          steps = {
            'Original Amount': `${cookingInputs.originalAmount} ${cookingInputs.originalUnit}`,
            'Target Unit': cookingInputs.targetUnit,
            'Conversion Factor': conversion.conversionFactor.toFixed(4),
            'Result': conversion.formattedResult
          };
          break;

        case 'cooking_time':
          if (!cookingInputs.originalTemp || !cookingInputs.targetTemp || !cookingInputs.originalCookTime) {
            throw new Error('Temperature and cooking time required for time adjustment');
          }
          
          const timeAdjustment = CookingFormulas.adjustCookingTime(
            cookingInputs.originalCookTime,
            cookingInputs.originalTemp,
            cookingInputs.targetTemp,
            cookingInputs.panSize
          );
          
          result = {
            adjustedCookTime: `${timeAdjustment.adjustedTime} minutes`,
            cookingTips: timeAdjustment.recommendations.join('; ')
          };
          
          explanation = `Cooking time adjusted from ${cookingInputs.originalCookTime} to ${timeAdjustment.adjustedTime} minutes for temperature change`;
          
          steps = {
            'Original Temperature': `${cookingInputs.originalTemp}°F`,
            'Target Temperature': `${cookingInputs.targetTemp}°F`,
            'Original Time': `${cookingInputs.originalCookTime} minutes`,
            'Time Change': `${timeAdjustment.timeChange > 0 ? '+' : ''}${timeAdjustment.timeChange} minutes`,
            'Pan Size Factor': cookingInputs.panSize || 'same'
          };
          break;

        case 'substitution':
          if (!cookingInputs.ingredient) {
            throw new Error('Ingredient required for substitution lookup');
          }
          
          const substitutions = CookingFormulas.getSubstitutions(cookingInputs.ingredient);
          
          if (substitutions.length === 0) {
            result = {
              substitutions: 'No common substitutions found for this ingredient'
            };
          } else {
            const substitutionList = substitutions.map(sub => 
              `${sub.substitute} (${sub.ratio}) - ${sub.notes}`
            ).join('; ');
            
            result = {
              substitutions: substitutionList,
              cookingTips: 'Substitutions may affect taste, texture, and cooking time'
            };
          }
          
          explanation = `Found ${substitutions.length} substitution(s) for ${cookingInputs.ingredient}`;
          
          steps = {
            'Original Ingredient': cookingInputs.ingredient,
            'Substitutions Found': substitutions.length.toString(),
            'Primary Substitute': substitutions[0]?.substitute || 'None'
          };
          break;

        case 'nutritional':
          if (!cookingInputs.ingredients || !cookingInputs.desiredServings) {
            throw new Error('Ingredients and servings required for nutritional analysis');
          }
          
          const nutrition = CookingFormulas.estimateNutrition(
            cookingInputs.ingredients,
            cookingInputs.desiredServings
          );
          
          result = {
            nutritionalInfo: `${nutrition.caloriesPerServing} calories, ${nutrition.proteinGrams}g protein, ${nutrition.carbsGrams}g carbs, ${nutrition.fatGrams}g fat per serving`,
            cookingTips: nutrition.notes.join('; ')
          };
          
          explanation = `Estimated nutrition per serving: ${nutrition.caloriesPerServing} calories`;
          
          steps = {
            'Servings': cookingInputs.desiredServings.toString(),
            'Calories per Serving': nutrition.caloriesPerServing.toString(),
            'Protein per Serving': `${nutrition.proteinGrams}g`,
            'Carbs per Serving': `${nutrition.carbsGrams}g`,
            'Fat per Serving': `${nutrition.fatGrams}g`
          };
          break;

        default:
          throw new Error(`Unknown calculation type: ${cookingInputs.calculationType}`);
      }

      return {
        outputs: result,
        explanation,
        intermediateSteps: steps
      };
    } catch (error) {
      throw new Error(`Cooking calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};