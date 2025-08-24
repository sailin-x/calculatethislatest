export interface BMRTDEECalculatorInputs {
  // Personal Information
  personalInfo: {
    // Basic Information
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      height: number; // in cm
      weight: number; // in kg
      bodyFatPercentage: number; // optional
      activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
      goal: 'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle' | 'improve_fitness';
    };
    
    // Body Composition
    bodyComposition: {
      height: {
        feet: number;
        inches: number;
        centimeters: number;
      };
      weight: {
        pounds: number;
        kilograms: number;
      };
      bodyFatPercentage: number;
      leanBodyMass: number; // in kg
      muscleMass: number; // in kg
      boneMass: number; // in kg
      waterPercentage: number;
      visceralFat: number;
      subcutaneousFat: number;
    };
    
    // Health Information
    healthInfo: {
      medicalConditions: string[];
      medications: string[];
      allergies: string[];
      injuries: string[];
      surgeries: string[];
      familyHistory: string[];
      currentHealthStatus: 'excellent' | 'good' | 'fair' | 'poor';
      pregnancyStatus: 'not_pregnant' | 'pregnant' | 'breastfeeding';
      pregnancyWeek: number; // if pregnant
      breastfeedingMonths: number; // if breastfeeding
    };
  };
  
  // Activity Information
  activityInfo: {
    // Activity Level Details
    activityLevelDetails: {
      sedentary: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      lightlyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      moderatelyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      veryActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      extremelyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
    };
    
    // Exercise Information
    exerciseInfo: {
      exerciseFrequency: 'never' | 'rarely' | '1_2_times' | '3_4_times' | '5_6_times' | 'daily';
      exerciseDuration: number; // minutes per session
      exerciseIntensity: 'low' | 'moderate' | 'high' | 'very_high';
      exerciseTypes: {
        cardio: {
          frequency: number; // times per week
          duration: number; // minutes per session
          intensity: 'low' | 'moderate' | 'high';
          types: string[];
        };
        strength: {
          frequency: number; // times per week
          duration: number; // minutes per session
          intensity: 'low' | 'moderate' | 'high';
          types: string[];
        };
        flexibility: {
          frequency: number; // times per week
          duration: number; // minutes per session
          intensity: 'low' | 'moderate' | 'high';
          types: string[];
        };
        sports: {
          frequency: number; // times per week
          duration: number; // minutes per session
          intensity: 'low' | 'moderate' | 'high';
          types: string[];
        };
      };
    };
    
    // Daily Activities
    dailyActivities: {
      occupation: {
        type: 'sedentary' | 'light' | 'moderate' | 'heavy';
        description: string;
        hoursPerDay: number;
        energyExpenditure: number; // calories per hour
      };
      commute: {
        method: 'walking' | 'cycling' | 'public_transit' | 'driving' | 'telecommute';
        duration: number; // minutes per day
        energyExpenditure: number; // calories per day
      };
      household: {
        cleaning: number; // minutes per day
        cooking: number; // minutes per day
        gardening: number; // minutes per day
        other: number; // minutes per day
        totalEnergyExpenditure: number; // calories per day
      };
      leisure: {
        walking: number; // minutes per day
        standing: number; // minutes per day
        sitting: number; // minutes per day
        sleeping: number; // hours per day
        totalEnergyExpenditure: number; // calories per day
      };
    };
  };
  
  // Calculation Methods
  calculationMethods: {
    // BMR Calculation Methods
    bmrMethods: {
      mifflinStJeor: boolean;
      harrisBenedict: boolean;
      katchMcArdle: boolean;
      cunningham: boolean;
      preferredMethod: 'mifflin_st_jeor' | 'harris_benedict' | 'katch_mcardle' | 'cunningham';
    };
    
    // TDEE Calculation Methods
    tdeeMethods: {
      activityMultiplier: boolean;
      detailedActivity: boolean;
      heartRateMonitor: boolean;
      preferredMethod: 'activity_multiplier' | 'detailed_activity' | 'heart_rate_monitor';
    };
    
    // Accuracy Factors
    accuracyFactors: {
      bodyComposition: 'estimated' | 'measured';
      activityTracking: 'estimated' | 'tracked';
      metabolicRate: 'estimated' | 'measured';
      accuracyLevel: 'low' | 'medium' | 'high';
    };
  };
  
  // Goals and Targets
  goalsTargets: {
    // Weight Goals
    weightGoals: {
      currentWeight: number; // in kg
      targetWeight: number; // in kg
      weightChange: number; // in kg
      timeframe: number; // in weeks
      weeklyChange: number; // in kg per week
      goalType: 'lose' | 'maintain' | 'gain';
      priority: 'high' | 'medium' | 'low';
    };
    
    // Body Composition Goals
    bodyCompositionGoals: {
      targetBodyFatPercentage: number;
      targetMuscleMass: number; // in kg
      targetLeanBodyMass: number; // in kg
      bodyRecomposition: boolean;
      focus: 'fat_loss' | 'muscle_gain' | 'both';
    };
    
    // Performance Goals
    performanceGoals: {
      strengthGoals: string[];
      enduranceGoals: string[];
      flexibilityGoals: string[];
      athleticGoals: string[];
      healthGoals: string[];
    };
  };
  
  // Nutrition Information
  nutritionInfo: {
    // Current Nutrition
    currentNutrition: {
      dailyCalories: number;
      protein: number; // grams per day
      carbohydrates: number; // grams per day
      fats: number; // grams per day
      fiber: number; // grams per day
      water: number; // liters per day
      supplements: string[];
    };
    
    // Target Nutrition
    targetNutrition: {
      dailyCalories: number;
      protein: number; // grams per day
      carbohydrates: number; // grams per day
      fats: number; // grams per day
      fiber: number; // grams per day
      water: number; // liters per day
      mealTiming: {
        breakfast: string;
        lunch: string;
        dinner: string;
        snacks: string[];
      };
    };
    
    // Dietary Preferences
    dietaryPreferences: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      lowCarb: boolean;
      ketogenic: boolean;
      paleo: boolean;
      mediterranean: boolean;
      other: string[];
    };
  };
  
  // Lifestyle Factors
  lifestyleFactors: {
    // Sleep Information
    sleepInfo: {
      sleepDuration: number; // hours per night
      sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
      sleepSchedule: 'consistent' | 'irregular';
      sleepDisorders: string[];
      recoveryQuality: 'excellent' | 'good' | 'fair' | 'poor';
    };
    
    // Stress Information
    stressInfo: {
      stressLevel: 'low' | 'moderate' | 'high' | 'very_high';
      stressSources: string[];
      stressManagement: string[];
      cortisolLevels: 'normal' | 'elevated' | 'high';
      recoveryTime: 'fast' | 'moderate' | 'slow';
    };
    
    // Environmental Factors
    environmentalFactors: {
      climate: 'cold' | 'temperate' | 'hot' | 'tropical';
      altitude: number; // meters above sea level
      humidity: 'low' | 'moderate' | 'high';
      airQuality: 'excellent' | 'good' | 'fair' | 'poor';
      temperature: number; // average temperature in Celsius
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeBMR: boolean;
    includeTDEE: boolean;
    includeMacros: boolean;
    includeMealPlanning: boolean;
    includeProgressTracking: boolean;
    includeRecommendations: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface BMRTDEECalculatorResults {
  // Personal Analysis
  personalAnalysis: {
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      height: number;
      weight: number;
      bodyFatPercentage: number;
      activityLevel: string;
      goal: string;
    };
    bodyComposition: {
      height: {
        feet: number;
        inches: number;
        centimeters: number;
      };
      weight: {
        pounds: number;
        kilograms: number;
      };
      bodyFatPercentage: number;
      leanBodyMass: number;
      muscleMass: number;
      boneMass: number;
      waterPercentage: number;
      visceralFat: number;
      subcutaneousFat: number;
    };
    healthInfo: {
      medicalConditions: string[];
      medications: string[];
      allergies: string[];
      injuries: string[];
      surgeries: string[];
      familyHistory: string[];
      currentHealthStatus: string;
      pregnancyStatus: string;
      pregnancyWeek: number;
      breastfeedingMonths: number;
    };
    personalEfficiency: number;
  };
  
  // BMR Analysis
  bmrAnalysis: {
    // BMR Calculations
    bmrCalculations: {
      mifflinStJeor: {
        bmr: number;
        formula: string;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
      };
      harrisBenedict: {
        bmr: number;
        formula: string;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
      };
      katchMcArdle: {
        bmr: number;
        formula: string;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
        requiresBodyFat: boolean;
      };
      cunningham: {
        bmr: number;
        formula: string;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
        requiresLeanBodyMass: boolean;
      };
    };
    
    // Recommended BMR
    recommendedBMR: {
      method: string;
      bmr: number;
      confidence: number; // percentage
      range: {
        low: number;
        high: number;
      };
      factors: string[];
    };
    
    // BMR Comparison
    bmrComparison: {
      ageGroup: string;
      genderGroup: string;
      weightGroup: string;
      percentile: number;
      comparison: 'below_average' | 'average' | 'above_average';
      recommendations: string[];
    };
    
    bmrEfficiency: number;
  };
  
  // TDEE Analysis
  tdeeAnalysis: {
    // TDEE Calculations
    tdeeCalculations: {
      activityMultiplier: {
        tdee: number;
        method: string;
        multiplier: number;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
      };
      detailedActivity: {
        tdee: number;
        method: string;
        components: {
          bmr: number;
          exercise: number;
          dailyActivities: number;
          thermicEffect: number;
        };
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
      };
      heartRateMonitor: {
        tdee: number;
        method: string;
        accuracy: 'high' | 'medium' | 'low';
        notes: string;
        requiresEquipment: boolean;
      };
    };
    
    // Recommended TDEE
    recommendedTDEE: {
      method: string;
      tdee: number;
      confidence: number; // percentage
      range: {
        low: number;
        high: number;
      };
      breakdown: {
        bmr: number;
        activity: number;
        exercise: number;
        thermicEffect: number;
      };
    };
    
    // Activity Analysis
    activityAnalysis: {
      totalActivity: number; // calories per day
      exerciseActivity: number; // calories per day
      dailyActivity: number; // calories per day
      activityEfficiency: number; // percentage
      improvementAreas: string[];
      recommendations: string[];
    };
    
    tdeeEfficiency: number;
  };
  
  // Activity Analysis
  activityAnalysis: {
    activityLevelDetails: {
      sedentary: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      lightlyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      moderatelyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      veryActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
      extremelyActive: {
        description: string;
        multiplier: number;
        activities: string[];
        hoursPerDay: number;
      };
    };
    exerciseInfo: {
      exerciseFrequency: string;
      exerciseDuration: number;
      exerciseIntensity: string;
      exerciseTypes: {
        cardio: {
          frequency: number;
          duration: number;
          intensity: string;
          types: string[];
        };
        strength: {
          frequency: number;
          duration: number;
          intensity: string;
          types: string[];
        };
        flexibility: {
          frequency: number;
          duration: number;
          intensity: string;
          types: string[];
        };
        sports: {
          frequency: number;
          duration: number;
          intensity: string;
          types: string[];
        };
      };
    };
    dailyActivities: {
      occupation: {
        type: string;
        description: string;
        hoursPerDay: number;
        energyExpenditure: number;
      };
      commute: {
        method: string;
        duration: number;
        energyExpenditure: number;
      };
      household: {
        cleaning: number;
        cooking: number;
        gardening: number;
        other: number;
        totalEnergyExpenditure: number;
      };
      leisure: {
        walking: number;
        standing: number;
        sitting: number;
        sleeping: number;
        totalEnergyExpenditure: number;
      };
    };
    activityEfficiency: number;
  };
  
  // Goals and Targets Analysis
  goalsTargetsAnalysis: {
    weightGoals: {
      currentWeight: number;
      targetWeight: number;
      weightChange: number;
      timeframe: number;
      weeklyChange: number;
      goalType: string;
      priority: string;
    };
    bodyCompositionGoals: {
      targetBodyFatPercentage: number;
      targetMuscleMass: number;
      targetLeanBodyMass: number;
      bodyRecomposition: boolean;
      focus: string;
    };
    performanceGoals: {
      strengthGoals: string[];
      enduranceGoals: string[];
      flexibilityGoals: string[];
      athleticGoals: string[];
      healthGoals: string[];
    };
    goalsEfficiency: number;
  };
  
  // Nutrition Analysis
  nutritionAnalysis: {
    currentNutrition: {
      dailyCalories: number;
      protein: number;
      carbohydrates: number;
      fats: number;
      fiber: number;
      water: number;
      supplements: string[];
    };
    targetNutrition: {
      dailyCalories: number;
      protein: number;
      carbohydrates: number;
      fats: number;
      fiber: number;
      water: number;
      mealTiming: {
        breakfast: string;
        lunch: string;
        dinner: string;
        snacks: string[];
      };
    };
    dietaryPreferences: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      lowCarb: boolean;
      ketogenic: boolean;
      paleo: boolean;
      mediterranean: boolean;
      other: string[];
    };
    nutritionEfficiency: number;
  };
  
  // Lifestyle Analysis
  lifestyleAnalysis: {
    sleepInfo: {
      sleepDuration: number;
      sleepQuality: string;
      sleepSchedule: string;
      sleepDisorders: string[];
      recoveryQuality: string;
    };
    stressInfo: {
      stressLevel: string;
      stressSources: string[];
      stressManagement: string[];
      cortisolLevels: string;
      recoveryTime: string;
    };
    environmentalFactors: {
      climate: string;
      altitude: number;
      humidity: string;
      airQuality: string;
      temperature: number;
    };
    lifestyleEfficiency: number;
  };
  
  // Calorie Optimization Analysis
  calorieOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialCalories: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    weightLossOptimization: {
      calorieDeficit: number;
      weeklyWeightLoss: number;
      sustainableDeficit: number;
      maximumDeficit: number;
      recommendations: string[];
    };
    weightGainOptimization: {
      calorieSurplus: number;
      weeklyWeightGain: number;
      sustainableSurplus: number;
      maximumSurplus: number;
      recommendations: string[];
    };
    maintenanceOptimization: {
      maintenanceCalories: number;
      flexibility: number;
      adjustments: string[];
      recommendations: string[];
    };
    optimizationEfficiency: number;
  };
  
  // Macro Optimization Analysis
  macroOptimizationAnalysis: {
    proteinOptimization: {
      currentProtein: number;
      targetProtein: number;
      proteinRange: {
        minimum: number;
        maximum: number;
      };
      sources: string[];
      timing: string[];
      recommendations: string[];
    };
    carbohydrateOptimization: {
      currentCarbs: number;
      targetCarbs: number;
      carbRange: {
        minimum: number;
        maximum: number;
      };
      sources: string[];
      timing: string[];
      recommendations: string[];
    };
    fatOptimization: {
      currentFat: number;
      targetFat: number;
      fatRange: {
        minimum: number;
        maximum: number;
      };
      sources: string[];
      timing: string[];
      recommendations: string[];
    };
    macroEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowCalories: number;
    highCalories: number;
    sensitivity: number;
  }[];
  
  // BMR/TDEE Score
  bmrTdeeScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      bmr: number;
      tdee: number;
      activity: number;
      goals: number;
      nutrition: number;
      lifestyle: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      weight: number;
      bmr: number;
      tdee: number;
      bodyFatPercentage: number;
      measurements: {
        chest: number;
        waist: number;
        hips: number;
        arms: number;
        thighs: number;
      };
    }[];
    progressTrends: string[];
    yearOverYearChange: number;
  };
  
  // Health Impact
  healthImpact: {
    metabolicHealth: number;
    bodyComposition: number;
    energyLevels: number;
    performance: number;
    overallHealth: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    bmrAssessment: string;
    tdeeAssessment: string;
    recommendations: string[];
    actionItems: {
      action: string;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      responsibleParty: string;
    }[];
  };
  
  // Executive Summary
  executiveSummary: {
    bmr: number;
    tdee: number;
    calorieNeeds: number;
    macroTargets: {
      protein: number;
      carbs: number;
      fats: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedBenefit: number;
    implementationSteps: string[];
  }[];
  
  // Action Items
  actionItems: {
    action: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    timeline: string;
    responsibleParty: string;
    dependencies: string[];
    successMetrics: string[];
  }[];
}
