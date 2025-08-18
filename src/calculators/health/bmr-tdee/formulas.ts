import { Formula, CalculationResult } from '../../../types/calculator';

export interface BMRInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number; // in pounds or kg
  height: number; // in inches or cm
  weightUnit: 'lbs' | 'kg';
  heightUnit: 'inches' | 'cm';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  bodyFatPercentage?: number;
  goal: 'maintain' | 'lose' | 'gain';
  targetWeightLoss?: number; // lbs per week
}

export class BMRFormulas {
  /**
   * Harris-Benedict Equation (Revised)
   */
  static harrisBenedict(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  }

  /**
   * Mifflin-St Jeor Equation (More accurate)
   */
  static mifflinStJeor(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
    const bmr = (10 * weight) + (6.25 * height) - (5 * age);
    return gender === 'male' ? bmr + 5 : bmr - 161;
  }

  /**
   * Katch-McArdle Formula (uses body fat percentage)
   */
  static katchMcArdle(weight: number, bodyFatPercentage: number): number {
    const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
    return 370 + (21.6 * leanBodyMass);
  }

  /**
   * Calculate TDEE based on activity level
   */
  static calculateTDEE(bmr: number, activityLevel: string): number {
    const multipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2);
  }

  /**
   * Convert units
   */
  static convertWeight(weight: number, from: 'lbs' | 'kg', to: 'lbs' | 'kg'): number {
    if (from === to) return weight;
    return from === 'lbs' ? weight * 0.453592 : weight * 2.20462;
  }

  static convertHeight(height: number, from: 'inches' | 'cm', to: 'inches' | 'cm'): number {
    if (from === to) return height;
    return from === 'inches' ? height * 2.54 : height * 0.393701;
  }
}

export const bmrTdeeCalculatorFormula: Formula = {
  id: 'bmr-tdee-calculator',
  name: 'BMR & TDEE Calculator',
  description: 'Calculate Basal Metabolic Rate and Total Daily Energy Expenditure using multiple validated formulas',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const bmrInputs = inputs as BMRInputs;
    
    // Convert to metric for calculations
    const weightKg = BMRFormulas.convertWeight(bmrInputs.weight, bmrInputs.weightUnit, 'kg');
    const heightCm = BMRFormulas.convertHeight(bmrInputs.height, bmrInputs.heightUnit, 'cm');
    
    // Calculate BMR using multiple formulas
    const harrisBenedictBMR = BMRFormulas.harrisBenedict(weightKg, heightCm, bmrInputs.age, bmrInputs.gender);
    const mifflinStJeorBMR = BMRFormulas.mifflinStJeor(weightKg, heightCm, bmrInputs.age, bmrInputs.gender);
    
    let katchMcArdleBMR = null;
    if (bmrInputs.bodyFatPercentage) {
      katchMcArdleBMR = BMRFormulas.katchMcArdle(weightKg, bmrInputs.bodyFatPercentage);
    }
    
    // Use Mifflin-St Jeor as primary (most accurate)
    const primaryBMR = mifflinStJeorBMR;
    const tdee = BMRFormulas.calculateTDEE(primaryBMR, bmrInputs.activityLevel);
    
    // Calculate calorie goals
    let calorieGoal = tdee;
    if (bmrInputs.goal === 'lose' && bmrInputs.targetWeightLoss) {
      const calorieDeficit = bmrInputs.targetWeightLoss * 3500 / 7; // 3500 cal per lb, per week
      calorieGoal = tdee - calorieDeficit;
    } else if (bmrInputs.goal === 'gain') {
      calorieGoal = tdee + 500; // Standard surplus for weight gain
    }
    
    return {
      outputs: {
        harrisBenedictBMR: Math.round(harrisBenedictBMR),
        mifflinStJeorBMR: Math.round(mifflinStJeorBMR),
        katchMcArdleBMR: katchMcArdleBMR ? Math.round(katchMcArdleBMR) : null,
        recommendedBMR: Math.round(primaryBMR),
        tdee: Math.round(tdee),
        calorieGoal: Math.round(calorieGoal),
        weightKg: Math.round(weightKg * 10) / 10,
        heightCm: Math.round(heightCm * 10) / 10
      },
      explanation: `Your BMR is ${Math.round(primaryBMR)} calories/day using the Mifflin-St Jeor equation. With ${bmrInputs.activityLevel} activity level, your TDEE is ${Math.round(tdee)} calories/day. ${bmrInputs.goal === 'lose' ? `To lose ${bmrInputs.targetWeightLoss} lbs/week, target ${Math.round(calorieGoal)} calories/day.` : bmrInputs.goal === 'gain' ? `For weight gain, target ${Math.round(calorieGoal)} calories/day.` : `To maintain weight, consume ${Math.round(tdee)} calories/day.`}`,
      intermediateSteps: {
        'Weight (kg)': `${bmrInputs.weight} ${bmrInputs.weightUnit} = ${weightKg.toFixed(1)} kg`,
        'Height (cm)': `${bmrInputs.height} ${bmrInputs.heightUnit} = ${heightCm.toFixed(1)} cm`,
        'Mifflin-St Jeor BMR': `${Math.round(primaryBMR)} calories/day`,
        'Activity Multiplier': `${bmrInputs.activityLevel} = ${BMRFormulas.calculateTDEE(1, bmrInputs.activityLevel)}x`,
        'TDEE': `${Math.round(primaryBMR)} × ${BMRFormulas.calculateTDEE(1, bmrInputs.activityLevel)} = ${Math.round(tdee)} calories/day`
      }
    };
  }
};