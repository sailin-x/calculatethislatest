export interface CookingCalculatorInputs {
  // Recipe Information
  recipeInfo: {
    // Basic Recipe Details
    basicInfo: {
      recipeName: string;
      cuisine: string;
      category: 'appetizer' | 'main_course' | 'dessert' | 'beverage' | 'side_dish' | 'soup' | 'salad' | 'bread' | 'breakfast' | 'snack';
      difficulty: 'easy' | 'medium' | 'hard' | 'expert';
      prepTime: number; // in minutes
      cookTime: number; // in minutes
      totalTime: number; // in minutes
      servings: number;
      yield: string; // e.g., "4 cups", "2 loaves"
      author: string;
      source: string;
      tags: string[];
    };
    
    // Ingredients
    ingredients: {
      ingredient: string;
      amount: number;
      unit: string;
      category: 'proteins' | 'vegetables' | 'fruits' | 'grains' | 'dairy' | 'spices' | 'herbs' | 'oils' | 'sweeteners' | 'other';
      cost: number;
      nutritionalInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
        sugar: number;
        sodium: number;
      };
      substitutions: string[];
      notes: string;
    }[];
    
    // Instructions
    instructions: {
      step: number;
      instruction: string;
      time: number; // in minutes
      temperature: number; // in Fahrenheit/Celsius
      equipment: string[];
      tips: string[];
    }[];
    
    // Equipment
    equipment: {
      item: string;
      type: 'utensil' | 'appliance' | 'cookware' | 'bakeware' | 'gadget';
      essential: boolean;
      alternatives: string[];
      cost: number;
    }[];
    
    // Nutritional Information
    nutritionalInfo: {
      caloriesPerServing: number;
      totalCalories: number;
      macronutrients: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
        sugar: number;
        sodium: number;
      };
      micronutrients: {
        vitaminA: number;
        vitaminC: number;
        vitaminD: number;
        vitaminE: number;
        vitaminK: number;
        vitaminB12: number;
        calcium: number;
        iron: number;
        magnesium: number;
        potassium: number;
        zinc: number;
      };
      allergens: string[];
      dietaryRestrictions: string[];
    };
  };
  
  // Cost Information
  costInfo: {
    // Ingredient Costs
    ingredientCosts: {
      totalIngredientCost: number;
      costPerServing: number;
      costBreakdown: {
        ingredient: string;
        cost: number;
        percentage: number;
      }[];
      seasonalAdjustments: {
        ingredient: string;
        seasonalCost: number;
        regularCost: number;
        savings: number;
      }[];
    };
    
    // Equipment Costs
    equipmentCosts: {
      totalEquipmentCost: number;
      oneTimeCosts: number;
      recurringCosts: number;
      costBreakdown: {
        equipment: string;
        cost: number;
        type: 'one_time' | 'recurring';
      }[];
    };
    
    // Utility Costs
    utilityCosts: {
      electricityCost: number;
      gasCost: number;
      waterCost: number;
      totalUtilityCost: number;
      costPerMinute: number;
    };
    
    // Total Cost Analysis
    totalCostAnalysis: {
      totalRecipeCost: number;
      costPerServing: number;
      costComparison: {
        homemade: number;
        restaurant: number;
        takeout: number;
        savings: number;
      };
      budgetFriendly: boolean;
      costCategory: 'budget' | 'moderate' | 'premium' | 'luxury';
    };
  };
  
  // Time Information
  timeInfo: {
    // Preparation Time
    prepTime: {
      totalPrepTime: number;
      activePrepTime: number;
      passivePrepTime: number;
      timeBreakdown: {
        activity: string;
        time: number;
        type: 'active' | 'passive';
      }[];
      efficiencyTips: string[];
    };
    
    // Cooking Time
    cookTime: {
      totalCookTime: number;
      activeCookTime: number;
      passiveCookTime: number;
      timeBreakdown: {
        step: string;
        time: number;
        type: 'active' | 'passive';
      }[];
      timingTips: string[];
    };
    
    // Total Time Analysis
    totalTimeAnalysis: {
      totalTime: number;
      timePerServing: number;
      timeEfficiency: number;
      timeCategory: 'quick' | 'moderate' | 'time_consuming';
      makeAheadOptions: string[];
      timeSavingTips: string[];
    };
  };
  
  // Skill Information
  skillInfo: {
    // Required Skills
    requiredSkills: {
      skill: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      description: string;
      learningTime: number; // in hours
    }[];
    
    // Techniques Used
    techniques: {
      technique: string;
      difficulty: 'easy' | 'medium' | 'hard';
      description: string;
      videoUrl: string;
      tips: string[];
    }[];
    
    // Skill Development
    skillDevelopment: {
      currentSkillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      targetSkillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      learningPath: string[];
      practiceExercises: string[];
      estimatedLearningTime: number;
    };
  };
  
  // Dietary Information
  dietaryInfo: {
    // Dietary Restrictions
    dietaryRestrictions: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      nutFree: boolean;
      soyFree: boolean;
      lowCarb: boolean;
      lowSodium: boolean;
      lowSugar: boolean;
      keto: boolean;
      paleo: boolean;
      mediterranean: boolean;
      other: string[];
    };
    
    // Allergen Information
    allergens: {
      contains: string[];
      mayContain: string[];
      allergenFree: boolean;
      crossContaminationRisk: boolean;
      safeFor: string[];
    };
    
    // Nutritional Goals
    nutritionalGoals: {
      targetCalories: number;
      targetProtein: number;
      targetCarbs: number;
      targetFat: number;
      targetFiber: number;
      targetSugar: number;
      targetSodium: number;
      meetsGoals: boolean;
      adjustments: string[];
    };
  };
  
  // Scaling Information
  scalingInfo: {
    // Scaling Options
    scalingOptions: {
      servings: number;
      ingredientAdjustments: {
        ingredient: string;
        originalAmount: number;
        originalUnit: string;
        newAmount: number;
        newUnit: string;
      }[];
      timeAdjustments: {
        prepTime: number;
        cookTime: number;
        totalTime: number;
      };
      equipmentAdjustments: {
        equipment: string;
        originalSize: string;
        newSize: string;
        alternatives: string[];
      }[];
    };
    
    // Batch Cooking
    batchCooking: {
      batchSize: number;
      storageInstructions: string[];
      freezingInstructions: string[];
      reheatingInstructions: string[];
      shelfLife: string;
      costSavings: number;
      timeSavings: number;
    };
  };
  
  // Substitution Information
  substitutionInfo: {
    // Ingredient Substitutions
    substitutions: {
      originalIngredient: string;
      substitutes: {
        ingredient: string;
        ratio: string;
        notes: string;
        flavorImpact: 'minimal' | 'moderate' | 'significant';
        textureImpact: 'minimal' | 'moderate' | 'significant';
      }[];
    }[];
    
    // Dietary Substitutions
    dietarySubstitutions: {
      restriction: string;
      substitutions: {
        original: string;
        substitute: string;
        ratio: string;
        notes: string;
      }[];
    }[];
  };
  
  // Calculation Options
  calculationOptions: {
    includeCostAnalysis: boolean;
    includeTimeAnalysis: boolean;
    includeSkillAnalysis: boolean;
    includeNutritionalAnalysis: boolean;
    includeScaling: boolean;
    includeSubstitutions: boolean;
    includeDietaryAnalysis: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface CookingCalculatorResults {
  // Recipe Analysis
  recipeAnalysis: {
    basicInfo: {
      recipeName: string;
      cuisine: string;
      category: string;
      difficulty: string;
      prepTime: number;
      cookTime: number;
      totalTime: number;
      servings: number;
      yield: string;
      author: string;
      source: string;
      tags: string[];
    };
    ingredients: {
      ingredient: string;
      amount: number;
      unit: string;
      category: string;
      cost: number;
      nutritionalInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
        sugar: number;
        sodium: number;
      };
      substitutions: string[];
      notes: string;
    }[];
    instructions: {
      step: number;
      instruction: string;
      time: number;
      temperature: number;
      equipment: string[];
      tips: string[];
    }[];
    equipment: {
      item: string;
      type: string;
      essential: boolean;
      alternatives: string[];
      cost: number;
    }[];
    nutritionalInfo: {
      caloriesPerServing: number;
      totalCalories: number;
      macronutrients: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
        sugar: number;
        sodium: number;
      };
      micronutrients: {
        vitaminA: number;
        vitaminC: number;
        vitaminD: number;
        vitaminE: number;
        vitaminK: number;
        vitaminB12: number;
        calcium: number;
        iron: number;
        magnesium: number;
        potassium: number;
        zinc: number;
      };
      allergens: string[];
      dietaryRestrictions: string[];
    };
    recipeEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    ingredientCosts: {
      totalIngredientCost: number;
      costPerServing: number;
      costBreakdown: {
        ingredient: string;
        cost: number;
        percentage: number;
      }[];
      seasonalAdjustments: {
        ingredient: string;
        seasonalCost: number;
        regularCost: number;
        savings: number;
      }[];
    };
    equipmentCosts: {
      totalEquipmentCost: number;
      oneTimeCosts: number;
      recurringCosts: number;
      costBreakdown: {
        equipment: string;
        cost: number;
        type: string;
      }[];
    };
    utilityCosts: {
      electricityCost: number;
      gasCost: number;
      waterCost: number;
      totalUtilityCost: number;
      costPerMinute: number;
    };
    totalCostAnalysis: {
      totalRecipeCost: number;
      costPerServing: number;
      costComparison: {
        homemade: number;
        restaurant: number;
        takeout: number;
        savings: number;
      };
      budgetFriendly: boolean;
      costCategory: string;
    };
    costEfficiency: number;
  };
  
  // Time Analysis
  timeAnalysis: {
    prepTime: {
      totalPrepTime: number;
      activePrepTime: number;
      passivePrepTime: number;
      timeBreakdown: {
        activity: string;
        time: number;
        type: string;
      }[];
      efficiencyTips: string[];
    };
    cookTime: {
      totalCookTime: number;
      activeCookTime: number;
      passiveCookTime: number;
      timeBreakdown: {
        step: string;
        time: number;
        type: string;
      }[];
      timingTips: string[];
    };
    totalTimeAnalysis: {
      totalTime: number;
      timePerServing: number;
      timeEfficiency: number;
      timeCategory: string;
      makeAheadOptions: string[];
      timeSavingTips: string[];
    };
    timeEfficiency: number;
  };
  
  // Skill Analysis
  skillAnalysis: {
    requiredSkills: {
      skill: string;
      level: string;
      description: string;
      learningTime: number;
    }[];
    techniques: {
      technique: string;
      difficulty: string;
      description: string;
      videoUrl: string;
      tips: string[];
    }[];
    skillDevelopment: {
      currentSkillLevel: string;
      targetSkillLevel: string;
      learningPath: string[];
      practiceExercises: string[];
      estimatedLearningTime: number;
    };
    skillEfficiency: number;
  };
  
  // Dietary Analysis
  dietaryAnalysis: {
    dietaryRestrictions: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      nutFree: boolean;
      soyFree: boolean;
      lowCarb: boolean;
      lowSodium: boolean;
      lowSugar: boolean;
      keto: boolean;
      paleo: boolean;
      mediterranean: boolean;
      other: string[];
    };
    allergens: {
      contains: string[];
      mayContain: string[];
      allergenFree: boolean;
      crossContaminationRisk: boolean;
      safeFor: string[];
    };
    nutritionalGoals: {
      targetCalories: number;
      targetProtein: number;
      targetCarbs: number;
      targetFat: number;
      targetFiber: number;
      targetSugar: number;
      targetSodium: number;
      meetsGoals: boolean;
      adjustments: string[];
    };
    dietaryEfficiency: number;
  };
  
  // Scaling Analysis
  scalingAnalysis: {
    scalingOptions: {
      servings: number;
      ingredientAdjustments: {
        ingredient: string;
        originalAmount: number;
        originalUnit: string;
        newAmount: number;
        newUnit: string;
      }[];
      timeAdjustments: {
        prepTime: number;
        cookTime: number;
        totalTime: number;
      };
      equipmentAdjustments: {
        equipment: string;
        originalSize: string;
        newSize: string;
        alternatives: string[];
      }[];
    };
    batchCooking: {
      batchSize: number;
      storageInstructions: string[];
      freezingInstructions: string[];
      reheatingInstructions: string[];
      shelfLife: string;
      costSavings: number;
      timeSavings: number;
    };
    scalingEfficiency: number;
  };
  
  // Substitution Analysis
  substitutionAnalysis: {
    substitutions: {
      originalIngredient: string;
      substitutes: {
        ingredient: string;
        ratio: string;
        notes: string;
        flavorImpact: string;
        textureImpact: string;
      }[];
    }[];
    dietarySubstitutions: {
      restriction: string;
      substitutions: {
        original: string;
        substitute: string;
        ratio: string;
        notes: string;
      }[];
    }[];
    substitutionEfficiency: number;
  };
  
  // Cost Optimization Analysis
  costOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialSavings: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    ingredientOptimization: {
      ingredient: string;
      currentCost: number;
      alternativeCost: number;
      savings: number;
      qualityImpact: 'minimal' | 'moderate' | 'significant';
    }[];
    equipmentOptimization: {
      equipment: string;
      currentCost: number;
      alternativeCost: number;
      savings: number;
      functionalityImpact: 'minimal' | 'moderate' | 'significant';
    }[];
    optimizationEfficiency: number;
  };
  
  // Time Optimization Analysis
  timeOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      timeSaved: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    prepOptimization: {
      activity: string;
      currentTime: number;
      optimizedTime: number;
      timeSaved: number;
      optimizationMethod: string;
    }[];
    cookOptimization: {
      step: string;
      currentTime: number;
      optimizedTime: number;
      timeSaved: number;
      optimizationMethod: string;
    }[];
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowCost: number;
    highCost: number;
    sensitivity: number;
  }[];
  
  // Cooking Score
  cookingScore: {
    overallScore: number;
    componentScores: {
      recipe: number;
      cost: number;
      time: number;
      skill: number;
      dietary: number;
      scaling: number;
      substitution: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalCosts: {
      date: string;
      totalCost: number;
      costPerServing: number;
      ingredientCosts: number;
      equipmentCosts: number;
      utilityCosts: number;
    }[];
    costTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    costSavings: number;
    timeSavings: number;
    skillDevelopment: number;
    healthImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    recipeAssessment: string;
    costAssessment: string;
    timeAssessment: string;
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
    totalCost: number;
    totalTime: number;
    difficulty: string;
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
