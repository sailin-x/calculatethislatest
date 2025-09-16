/**
 * Calorie Calculator Formulas
 * Comprehensive nutritional and fitness calculations
 */

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  unitSystem: 'metric' | 'imperial' = 'metric'
): number {
  let weight = weightKg;
  let height = heightCm;

  // Convert to metric if needed
  if (unitSystem === 'imperial') {
    weight = weightKg * 0.453592; // lbs to kg
    height = heightCm * 2.54; // inches to cm
  }

  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
): number {
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    lightly_active: 1.375, // Light exercise 1-3 days/week
    moderately_active: 1.55, // Moderate exercise 3-5 days/week
    very_active: 1.725, // Hard exercise 6-7 days/week
    extremely_active: 1.9 // Very hard exercise, physical job, or 2x training
  };

  return bmr * activityMultipliers[activityLevel];
}

/**
 * Calculate daily calorie needs for weight goals
 */
export function calculateCalorieNeeds(
  tdee: number,
  goal: 'maintain' | 'lose_0_5' | 'lose_1' | 'lose_1_5' | 'lose_2' | 'gain_0_5' | 'gain_1'
): number {
  const calorieAdjustments = {
    maintain: 0,
    lose_0_5: -250, // 0.5 lbs per week
    lose_1: -500, // 1 lb per week
    lose_1_5: -750, // 1.5 lbs per week
    lose_2: -1000, // 2 lbs per week
    gain_0_5: 250, // 0.5 lbs per week
    gain_1: 500 // 1 lb per week
  };

  return tdee + calorieAdjustments[goal];
}

/**
 * Calculate macronutrient breakdown
 */
export function calculateMacronutrients(
  dailyCalories: number,
  macroSplit: 'balanced' | 'high_protein' | 'low_carb' | 'keto' | 'custom',
  customRatios?: { protein: number; carbs: number; fat: number }
): {
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fat: { grams: number; calories: number; percentage: number };
} {
  let proteinRatio: number, carbRatio: number, fatRatio: number;

  switch (macroSplit) {
    case 'balanced':
      proteinRatio = 0.25; // 25% protein
      carbRatio = 0.50; // 50% carbs
      fatRatio = 0.25; // 25% fat
      break;
    case 'high_protein':
      proteinRatio = 0.35;
      carbRatio = 0.40;
      fatRatio = 0.25;
      break;
    case 'low_carb':
      proteinRatio = 0.30;
      carbRatio = 0.30;
      fatRatio = 0.40;
      break;
    case 'keto':
      proteinRatio = 0.20;
      carbRatio = 0.05;
      fatRatio = 0.75;
      break;
    case 'custom':
      if (!customRatios) {
        throw new Error('Custom ratios must be provided');
      }
      proteinRatio = customRatios.protein;
      carbRatio = customRatios.carbs;
      fatRatio = customRatios.fat;
      break;
    default:
      proteinRatio = 0.25;
      carbRatio = 0.50;
      fatRatio = 0.25;
  }

  const proteinCalories = dailyCalories * proteinRatio;
  const carbCalories = dailyCalories * carbRatio;
  const fatCalories = dailyCalories * fatRatio;

  return {
    protein: {
      grams: Math.round(proteinCalories / 4), // 4 calories per gram
      calories: Math.round(proteinCalories),
      percentage: Math.round(proteinRatio * 100)
    },
    carbs: {
      grams: Math.round(carbCalories / 4), // 4 calories per gram
      calories: Math.round(carbCalories),
      percentage: Math.round(carbRatio * 100)
    },
    fat: {
      grams: Math.round(fatCalories / 9), // 9 calories per gram
      calories: Math.round(fatCalories),
      percentage: Math.round(fatRatio * 100)
    }
  };
}

/**
 * Calculate calories burned during exercise
 */
export function calculateExerciseCalories(
  exercise: string,
  durationMinutes: number,
  weightKg: number,
  intensity: 'low' | 'moderate' | 'high' = 'moderate'
): number {
  // MET (Metabolic Equivalent of Task) values for common exercises
  const metValues: Record<string, { low: number; moderate: number; high: number }> = {
    'running': { low: 6.0, moderate: 8.3, high: 12.0 },
    'walking': { low: 3.3, moderate: 4.5, high: 6.0 },
    'cycling': { low: 6.8, moderate: 8.0, high: 12.0 },
    'swimming': { low: 5.8, moderate: 7.0, high: 10.0 },
    'weight_lifting': { low: 3.0, moderate: 6.0, high: 9.0 },
    'yoga': { low: 2.5, moderate: 4.0, high: 6.0 },
    'jump_rope': { low: 8.0, moderate: 10.0, high: 12.0 },
    'basketball': { low: 6.0, moderate: 8.0, high: 12.0 },
    'tennis': { low: 5.0, moderate: 7.0, high: 10.0 },
    'dancing': { low: 4.8, moderate: 6.0, high: 8.0 },
    'hiking': { low: 4.0, moderate: 6.0, high: 8.0 },
    'elliptical': { low: 5.0, moderate: 7.0, high: 9.0 },
    'rowing': { low: 7.0, moderate: 8.5, high: 12.0 },
    'stair_climbing': { low: 4.0, moderate: 6.0, high: 8.0 },
    'skiing': { low: 5.0, moderate: 7.0, high: 9.0 },
    'soccer': { low: 7.0, moderate: 9.0, high: 12.0 }
  };

  const exerciseData = metValues[exercise.toLowerCase()];
  if (!exerciseData) {
    throw new Error(`Exercise '${exercise}' not found in database`);
  }

  const met = exerciseData[intensity];
  const hours = durationMinutes / 60;

  // Calories = MET × weight in kg × time in hours
  return Math.round(met * weightKg * hours);
}

/**
 * Calculate Body Mass Index (BMI)
 */
export function calculateBMI(
  weightKg: number,
  heightCm: number,
  unitSystem: 'metric' | 'imperial' = 'metric'
): {
  bmi: number;
  category: string;
  healthyWeightRange: { min: number; max: number };
} {
  let weight = weightKg;
  let height = heightCm;

  if (unitSystem === 'imperial') {
    weight = weightKg * 0.453592; // lbs to kg
    height = heightCm * 2.54; // inches to cm
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let category: string;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  // Calculate healthy weight range (BMI 18.5-24.9)
  const minHealthyWeight = 18.5 * heightM * heightM;
  const maxHealthyWeight = 24.9 * heightM * heightM;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthyWeightRange: {
      min: Math.round(minHealthyWeight * 10) / 10,
      max: Math.round(maxHealthyWeight * 10) / 10
    }
  };
}

/**
 * Calculate ideal body weight using various formulas
 */
export function calculateIdealBodyWeight(
  heightCm: number,
  gender: 'male' | 'female',
  formula: 'hamwi' | 'devine' | 'robinson' | 'miller' = 'hamwi',
  unitSystem: 'metric' | 'imperial' = 'metric'
): {
  weightKg: number;
  weightLbs: number;
  formula: string;
} {
  let height = heightCm;

  if (unitSystem === 'imperial') {
    height = heightCm * 2.54; // inches to cm
  }

  let weightKg: number;

  switch (formula) {
    case 'hamwi':
      // Hamwi formula: 45.5 kg for 152.4 cm + 2.3 kg per inch over 5 feet
      const baseHeight = 152.4; // 5 feet in cm
      const additionalHeight = Math.max(0, height - baseHeight);
      const additionalInches = additionalHeight / 2.54;
      weightKg = 45.5 + (additionalInches * 2.3);
      if (gender === 'male') {
        weightKg += 4.5; // Add 4.5 kg for males
      }
      break;

    case 'devine':
      // Devine formula: 45.5 kg for 152.4 cm + 2.3 kg per inch over 5 feet
      const devineBase = gender === 'male' ? 50 : 45.5;
      const devineAdditional = Math.max(0, (height - 152.4) / 2.54) * 2.3;
      weightKg = devineBase + devineAdditional;
      break;

    case 'robinson':
      // Robinson formula: Similar to Devine but slightly different coefficients
      const robinsonBase = gender === 'male' ? 52 : 49;
      const robinsonAdditional = Math.max(0, (height - 152.4) / 2.54) * 2.9;
      weightKg = robinsonBase + robinsonAdditional;
      break;

    case 'miller':
      // Miller formula: 53.1 kg for 152.4 cm + 1.36 kg per inch over 5 feet
      const millerBase = gender === 'male' ? 56.2 : 53.1;
      const millerAdditional = Math.max(0, (height - 152.4) / 2.54) * 1.36;
      weightKg = millerBase + millerAdditional;
      break;

    default:
      weightKg = 70; // Default fallback
  }

  return {
    weightKg: Math.round(weightKg * 10) / 10,
    weightLbs: Math.round((weightKg * 2.20462) * 10) / 10,
    formula: formula.charAt(0).toUpperCase() + formula.slice(1)
  };
}

/**
 * Calculate water intake recommendation
 */
export function calculateWaterIntake(
  weightKg: number,
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active',
  climate: 'cool' | 'moderate' | 'hot' | 'very_hot' = 'moderate',
  unitSystem: 'metric' | 'imperial' = 'metric'
): {
  dailyOunces: number;
  dailyLiters: number;
  hourlyRecommendation: number;
} {
  // Base calculation: 30-35 ml per kg of body weight
  let baseMl = weightKg * 33; // Average of 30-35 ml/kg

  // Activity level adjustment
  const activityMultipliers = {
    sedentary: 1.0,
    lightly_active: 1.1,
    moderately_active: 1.2,
    very_active: 1.3,
    extremely_active: 1.4
  };

  baseMl *= activityMultipliers[activityLevel];

  // Climate adjustment
  const climateMultipliers = {
    cool: 0.9,
    moderate: 1.0,
    hot: 1.2,
    very_hot: 1.4
  };

  baseMl *= climateMultipliers[climate];

  const dailyLiters = baseMl / 1000;
  const dailyOunces = dailyLiters * 33.814; // Convert liters to fluid ounces
  const hourlyRecommendation = dailyOunces / 24; // Spread throughout the day

  return {
    dailyOunces: Math.round(dailyOunces),
    dailyLiters: Math.round(dailyLiters * 100) / 100,
    hourlyRecommendation: Math.round(hourlyRecommendation * 10) / 10
  };
}

/**
 * Calculate meal timing and frequency recommendations
 */
export function calculateMealPlan(
  dailyCalories: number,
  goal: 'maintain' | 'lose_weight' | 'gain_weight' | 'build_muscle',
  mealsPerDay: number = 3
): {
  meals: Array<{
    name: string;
    calories: number;
    timing: string;
    macronutrientFocus: string;
  }>;
  snacks: Array<{
    name: string;
    calories: number;
    timing: string;
  }>;
  totalCalories: number;
} {
  const meals = [];
  const snacks = [];

  // Base calorie distribution
  let mealCalories: number;
  let snackCalories = 0;

  if (mealsPerDay === 3) {
    mealCalories = dailyCalories * 0.32; // 32% per main meal
    snackCalories = dailyCalories * 0.04; // 4% per snack
  } else if (mealsPerDay === 4) {
    mealCalories = dailyCalories * 0.23; // 23% per meal
    snackCalories = dailyCalories * 0.08; // 8% total for snacks
  } else if (mealsPerDay === 5) {
    mealCalories = dailyCalories * 0.18; // 18% per meal
    snackCalories = dailyCalories * 0.10; // 10% total for snacks
  } else {
    mealCalories = dailyCalories / mealsPerDay;
  }

  // Define meal structure
  const mealStructure = [
    { name: 'Breakfast', timing: '7:00-9:00 AM', focus: 'Carbs and protein for energy' },
    { name: 'Lunch', timing: '12:00-2:00 PM', focus: 'Balanced macronutrients' },
    { name: 'Dinner', timing: '6:00-8:00 PM', focus: 'Protein and vegetables' }
  ];

  for (let i = 0; i < Math.min(mealsPerDay, 3); i++) {
    meals.push({
      name: mealStructure[i].name,
      calories: Math.round(mealCalories),
      timing: mealStructure[i].timing,
      macronutrientFocus: mealStructure[i].focus
    });
  }

  // Add snacks if applicable
  if (mealsPerDay > 3) {
    const snackCount = mealsPerDay - 3;
    const snackTimings = ['10:00 AM', '3:00 PM', '8:00 PM'];

    for (let i = 0; i < snackCount; i++) {
      snacks.push({
        name: `Snack ${i + 1}`,
        calories: Math.round(snackCalories),
        timing: snackTimings[i] || 'Between meals'
      });
    }
  }

  return {
    meals,
    snacks,
    totalCalories: Math.round(dailyCalories)
  };
}

/**
 * Calculate body fat percentage using various methods
 */
export function calculateBodyFatPercentage(
  method: 'navy' | 'jackson_pollock_3' | 'jackson_pollock_7' | 'parillo' | 'boer',
  measurements: {
    gender: 'male' | 'female';
    age?: number;
    weightKg: number;
    heightCm: number;
    neckCm?: number;
    waistCm?: number;
    hipCm?: number;
    chestCm?: number;
    abdomenCm?: number;
    thighCm?: number;
    bicepCm?: number;
    forearmCm?: number;
    calfCm?: number;
  }
): {
  bodyFatPercentage: number;
  leanBodyMass: number;
  fatMass: number;
  method: string;
} {
  const { gender, weightKg, heightCm } = measurements;
  let bodyFatPercentage: number;

  switch (method) {
    case 'navy':
      // U.S. Navy Method
      if (!measurements.neckCm || !measurements.waistCm || (gender === 'female' && !measurements.hipCm)) {
        throw new Error('Navy method requires neck, waist, and hip (for females) measurements');
      }

      const neck = measurements.neckCm!;
      const waist = measurements.waistCm!;
      const hip = measurements.hipCm || 0;

      if (gender === 'male') {
        const factor1 = waist - neck;
        bodyFatPercentage = 86.010 * Math.log10(factor1) - 70.041 * Math.log10(heightCm) + 36.76;
      } else {
        const factor1 = waist + hip - neck;
        bodyFatPercentage = 163.205 * Math.log10(factor1) - 97.684 * Math.log10(heightCm) - 78.387;
      }
      break;

    case 'jackson_pollock_3':
      // Jackson-Pollock 3-Site Skinfold
      if (!measurements.chestCm || !measurements.abdomenCm || !measurements.thighCm) {
        throw new Error('3-site method requires chest, abdomen, and thigh measurements');
      }

      const sum3 = measurements.chestCm + measurements.abdomenCm + measurements.thighCm;

      if (gender === 'male') {
        const density = 1.10938 - (0.0008267 * sum3) + (0.0000016 * sum3 * sum3) - (0.0002574 * measurements.age!);
        bodyFatPercentage = (495 / density) - 450;
      } else {
        const density = 1.0994921 - (0.0009929 * sum3) + (0.0000023 * sum3 * sum3) - (0.0001392 * measurements.age!);
        bodyFatPercentage = (495 / density) - 450;
      }
      break;

    case 'boer':
      // Boer Formula (simple, requires only height and weight)
      if (gender === 'male') {
        bodyFatPercentage = (0.407 * weightKg) - (0.267 * heightCm) + 12.1;
      } else {
        bodyFatPercentage = (0.252 * weightKg) - (0.190 * heightCm) + 5.3;
      }
      break;

    default:
      throw new Error(`Body fat calculation method '${method}' not implemented`);
  }

  bodyFatPercentage = Math.max(0, Math.min(50, bodyFatPercentage)); // Clamp to reasonable range

  const fatMass = (bodyFatPercentage / 100) * weightKg;
  const leanBodyMass = weightKg - fatMass;

  return {
    bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
    leanBodyMass: Math.round(leanBodyMass * 10) / 10,
    fatMass: Math.round(fatMass * 10) / 10,
    method: method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  };
}

/**
 * Main calorie calculation function
 */
export function calculateCalories(inputs: any): any {
  const {
    calculationType,
    weightKg,
    heightCm,
    age,
    gender,
    unitSystem,
    activityLevel,
    goal,
    macroSplit,
    customRatios,
    exercise,
    durationMinutes,
    intensity,
    exerciseWeightKg,
    formula,
    climate,
    mealsPerDay,
    method,
    measurements
  } = inputs;

  switch (calculationType) {
    case 'bmr_tdee': {
      const bmr = calculateBMR(weightKg, heightCm, age, gender, unitSystem);
      const tdee = calculateTDEE(bmr, activityLevel);
      const calorieNeeds = calculateCalorieNeeds(tdee, goal);

      return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        calorieNeeds: Math.round(calorieNeeds),
        goal,
        activityLevel
      };
    }

    case 'macronutrients': {
      const dailyCalories = inputs.dailyCalories || 2000;
      const macros = calculateMacronutrients(dailyCalories, macroSplit, customRatios);

      return {
        dailyCalories,
        macronutrients: macros,
        macroSplit
      };
    }

    case 'exercise_calories': {
      const caloriesBurned = calculateExerciseCalories(exercise, durationMinutes, exerciseWeightKg || weightKg, intensity);

      return {
        exercise,
        durationMinutes,
        caloriesBurned,
        intensity
      };
    }

    case 'bmi': {
      const bmiResult = calculateBMI(weightKg, heightCm, unitSystem);

      return {
        ...bmiResult,
        weightKg,
        heightCm,
        unitSystem
      };
    }

    case 'ideal_weight': {
      const idealWeight = calculateIdealBodyWeight(heightCm, gender, formula, unitSystem);

      return {
        ...idealWeight,
        heightCm,
        gender
      };
    }

    case 'water_intake': {
      const waterIntake = calculateWaterIntake(weightKg, activityLevel, climate, unitSystem);

      return {
        ...waterIntake,
        weightKg,
        activityLevel,
        climate
      };
    }

    case 'meal_plan': {
      const dailyCalories = inputs.dailyCalories || 2000;
      const mealPlan = calculateMealPlan(dailyCalories, goal, mealsPerDay);

      return {
        ...mealPlan,
        goal,
        mealsPerDay
      };
    }

    case 'body_fat': {
      const bodyFatResult = calculateBodyFatPercentage(method, measurements);

      return {
        ...bodyFatResult,
        measurements
      };
    }

    case 'comprehensive': {
      const bmr = calculateBMR(weightKg, heightCm, age, gender, unitSystem);
      const tdee = calculateTDEE(bmr, activityLevel);
      const calorieNeeds = calculateCalorieNeeds(tdee, goal);
      const macros = calculateMacronutrients(calorieNeeds, macroSplit, customRatios);
      const bmiResult = calculateBMI(weightKg, heightCm, unitSystem);
      const waterIntake = calculateWaterIntake(weightKg, activityLevel, climate, unitSystem);

      return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        calorieNeeds: Math.round(calorieNeeds),
        macronutrients: macros,
        bmi: bmiResult,
        waterIntake,
        goal,
        activityLevel,
        macroSplit
      };
    }

    default:
      throw new Error('Unknown calorie calculation type');
  }
}