export interface EverydayCalculatorInputs {
  // Personal Information
  personalInfo: {
    // Basic Information
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
      dependents: number;
      occupation: string;
      employer: string;
      employmentStatus: 'employed' | 'self_employed' | 'retired' | 'unemployed' | 'student';
      education: string;
      healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
      lifeExpectancy: number;
    };
    
    // Contact Information
    contactInfo: {
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      phone: string;
      email: string;
      emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
        email: string;
      };
    };
    
    // Lifestyle Information
    lifestyleInfo: {
      livingSituation: 'apartment' | 'house' | 'condo' | 'townhouse' | 'mobile_home' | 'other';
      homeOwnership: 'own' | 'rent' | 'lease' | 'mortgage';
      commuteDistance: number; // in miles
      commuteTime: number; // in minutes
      commuteMethod: 'car' | 'public_transit' | 'bike' | 'walk' | 'telecommute' | 'other';
      workSchedule: 'full_time' | 'part_time' | 'flexible' | 'shift_work' | 'remote';
      workHours: number;
      vacationDays: number;
      sickDays: number;
    };
  };
  
  // Daily Activities
  dailyActivities: {
    // Sleep Schedule
    sleepSchedule: {
      bedtime: string;
      wakeTime: string;
      sleepDuration: number; // in hours
      sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
      sleepInterruptions: number;
      sleepEnvironment: {
        roomTemperature: number;
        noiseLevel: 'quiet' | 'moderate' | 'loud';
        lightLevel: 'dark' | 'dim' | 'bright';
        comfortLevel: 'excellent' | 'good' | 'fair' | 'poor';
      };
    };
    
    // Work Activities
    workActivities: {
      workStartTime: string;
      workEndTime: string;
      breakTime: number; // in minutes
      lunchTime: number; // in minutes
      productivityLevel: 'high' | 'medium' | 'low';
      stressLevel: 'low' | 'moderate' | 'high';
      workEnvironment: {
        officeType: 'private' | 'shared' | 'open_plan' | 'home' | 'co_working';
        ergonomics: 'excellent' | 'good' | 'fair' | 'poor';
        noiseLevel: 'quiet' | 'moderate' | 'loud';
        airQuality: 'excellent' | 'good' | 'fair' | 'poor';
      };
    };
    
    // Personal Activities
    personalActivities: {
      exerciseTime: number; // in minutes
      exerciseType: string[];
      exerciseIntensity: 'low' | 'moderate' | 'high';
      mealTimes: {
        breakfast: string;
        lunch: string;
        dinner: string;
        snacks: string[];
      };
      mealDuration: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
      };
      leisureTime: number; // in minutes
      leisureActivities: string[];
      socialTime: number; // in minutes
      socialActivities: string[];
    };
    
    // Household Activities
    householdActivities: {
      cleaningTime: number; // in minutes
      cleaningFrequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly';
      laundryTime: number; // in minutes
      laundryFrequency: 'daily' | 'weekly' | 'bi_weekly';
      cookingTime: number; // in minutes
      cookingFrequency: 'daily' | 'weekly' | 'occasionally';
      shoppingTime: number; // in minutes
      shoppingFrequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly';
      maintenanceTime: number; // in minutes
      maintenanceFrequency: 'weekly' | 'monthly' | 'quarterly' | 'as_needed';
    };
  };
  
  // Time Management
  timeManagement: {
    // Time Allocation
    timeAllocation: {
      sleep: number; // percentage
      work: number; // percentage
      commute: number; // percentage
      exercise: number; // percentage
      meals: number; // percentage
      leisure: number; // percentage
      social: number; // percentage
      household: number; // percentage
      personal: number; // percentage
      other: number; // percentage
    };
    
    // Time Efficiency
    timeEfficiency: {
      productivityScore: number;
      timeWasters: string[];
      efficiencyTips: string[];
      multitaskingAbility: 'excellent' | 'good' | 'fair' | 'poor';
      focusLevel: 'high' | 'medium' | 'low';
      procrastinationLevel: 'low' | 'moderate' | 'high';
    };
    
    // Schedule Optimization
    scheduleOptimization: {
      optimalWakeTime: string;
      optimalBedtime: string;
      optimalWorkHours: {
        start: string;
        end: string;
      };
      optimalBreakTimes: string[];
      optimalExerciseTime: string;
      optimalMealTimes: {
        breakfast: string;
        lunch: string;
        dinner: string;
      };
    };
  };
  
  // Health and Wellness
  healthWellness: {
    // Physical Health
    physicalHealth: {
      exerciseFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
      exerciseDuration: number; // in minutes
      exerciseType: string[];
      exerciseIntensity: 'low' | 'moderate' | 'high';
      nutritionQuality: 'excellent' | 'good' | 'fair' | 'poor';
      hydrationLevel: 'excellent' | 'good' | 'fair' | 'poor';
      sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
      stressLevel: 'low' | 'moderate' | 'high';
      energyLevel: 'high' | 'medium' | 'low';
    };
    
    // Mental Health
    mentalHealth: {
      moodLevel: 'excellent' | 'good' | 'fair' | 'poor';
      stressManagement: 'excellent' | 'good' | 'fair' | 'poor';
      relaxationTime: number; // in minutes
      relaxationActivities: string[];
      socialConnections: 'strong' | 'moderate' | 'weak';
      workLifeBalance: 'excellent' | 'good' | 'fair' | 'poor';
      lifeSatisfaction: number; // 1-10 scale
      purposeAlignment: 'high' | 'medium' | 'low';
    };
    
    // Preventive Care
    preventiveCare: {
      annualCheckup: boolean;
      dentalCheckup: boolean;
      visionCheckup: boolean;
      vaccinations: boolean;
      screenings: string[];
      lastCheckup: string;
      nextCheckup: string;
      healthGoals: string[];
    };
  };
  
  // Financial Management
  financialManagement: {
    // Income and Expenses
    incomeExpenses: {
      monthlyIncome: number;
      monthlyExpenses: number;
      savingsRate: number; // percentage
      emergencyFund: number;
      debtLevel: 'low' | 'moderate' | 'high';
      financialGoals: string[];
      budgetAdherence: 'excellent' | 'good' | 'fair' | 'poor';
    };
    
    // Financial Habits
    financialHabits: {
      budgetTracking: 'daily' | 'weekly' | 'monthly' | 'rarely';
      expenseTracking: 'excellent' | 'good' | 'fair' | 'poor';
      savingHabits: 'excellent' | 'good' | 'fair' | 'poor';
      investmentActivity: 'active' | 'moderate' | 'passive' | 'none';
      debtManagement: 'excellent' | 'good' | 'fair' | 'poor';
      financialLiteracy: 'high' | 'medium' | 'low';
    };
    
    // Financial Planning
    financialPlanning: {
      retirementPlanning: boolean;
      insuranceCoverage: boolean;
      estatePlanning: boolean;
      taxPlanning: boolean;
      investmentStrategy: string;
      financialAdvisor: boolean;
      financialEducation: string[];
    };
  };
  
  // Relationships and Social
  relationshipsSocial: {
    // Family Relationships
    familyRelationships: {
      familyTime: number; // in minutes per day
      familyActivities: string[];
      familyCommunication: 'excellent' | 'good' | 'fair' | 'poor';
      familySupport: 'strong' | 'moderate' | 'weak';
      familyConflicts: number; // frequency
      familyGoals: string[];
    };
    
    // Friendships
    friendships: {
      friendTime: number; // in minutes per day
      friendActivities: string[];
      friendQuality: 'excellent' | 'good' | 'fair' | 'poor';
      friendQuantity: 'many' | 'moderate' | 'few';
      friendSupport: 'strong' | 'moderate' | 'weak';
      socialNetwork: 'large' | 'medium' | 'small';
    };
    
    // Community Involvement
    communityInvolvement: {
      volunteerTime: number; // in minutes per week
      volunteerActivities: string[];
      communityEvents: number; // frequency
      communityConnections: 'strong' | 'moderate' | 'weak';
      civicEngagement: 'high' | 'medium' | 'low';
      communityGoals: string[];
    };
  };
  
  // Personal Development
  personalDevelopment: {
    // Learning and Growth
    learningGrowth: {
      learningTime: number; // in minutes per day
      learningActivities: string[];
      skillDevelopment: string[];
      careerDevelopment: string[];
      personalGoals: string[];
      growthMindset: 'strong' | 'moderate' | 'weak';
      curiosityLevel: 'high' | 'medium' | 'low';
    };
    
    // Hobbies and Interests
    hobbiesInterests: {
      hobbyTime: number; // in minutes per day
      hobbies: string[];
      interestAreas: string[];
      creativeActivities: string[];
      outdoorActivities: string[];
      indoorActivities: string[];
      skillLevel: {
        hobby: string;
        level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      }[];
    };
    
    // Personal Goals
    personalGoals: {
      shortTermGoals: string[];
      mediumTermGoals: string[];
      longTermGoals: string[];
      goalProgress: {
        goal: string;
        progress: number; // percentage
        timeline: string;
        status: 'on_track' | 'behind' | 'ahead' | 'completed';
      }[];
      goalAlignment: 'high' | 'medium' | 'low';
    };
  };
  
  // Environment and Sustainability
  environmentSustainability: {
    // Environmental Impact
    environmentalImpact: {
      carbonFootprint: number;
      energyConsumption: number;
      waterConsumption: number;
      wasteProduction: number;
      transportationImpact: number;
      foodImpact: number;
      environmentalAwareness: 'high' | 'medium' | 'low';
    };
    
    // Sustainable Practices
    sustainablePractices: {
      recycling: boolean;
      composting: boolean;
      energyEfficiency: boolean;
      waterConservation: boolean;
      sustainableTransport: boolean;
      sustainableFood: boolean;
      sustainableShopping: boolean;
      renewableEnergy: boolean;
      greenProducts: boolean;
      environmentalAdvocacy: boolean;
    };
    
    // Sustainability Goals
    sustainabilityGoals: {
      carbonReduction: number; // percentage
      wasteReduction: number; // percentage
      energyEfficiency: number; // percentage
      sustainableLifestyle: number; // percentage
      environmentalEducation: string[];
      communityAction: string[];
    };
  };
  
  // Technology and Digital Life
  technologyDigital: {
    // Technology Usage
    technologyUsage: {
      screenTime: number; // in hours per day
      deviceUsage: {
        smartphone: number;
        computer: number;
        tablet: number;
        tv: number;
        other: number;
      };
      appUsage: string[];
      socialMediaTime: number; // in minutes per day
      digitalCommunication: number; // in minutes per day
      onlineShopping: number; // in minutes per day
      digitalEntertainment: number; // in minutes per day
    };
    
    // Digital Wellness
    digitalWellness: {
      digitalDetox: boolean;
      screenFreeTime: number; // in minutes per day
      digitalBalance: 'excellent' | 'good' | 'fair' | 'poor';
      onlinePrivacy: 'excellent' | 'good' | 'fair' | 'poor';
      cybersecurity: 'excellent' | 'good' | 'fair' | 'poor';
      digitalLiteracy: 'high' | 'medium' | 'low';
      technologyStress: 'low' | 'moderate' | 'high';
    };
    
    // Digital Productivity
    digitalProductivity: {
      productivityApps: string[];
      automationTools: string[];
      digitalOrganization: 'excellent' | 'good' | 'fair' | 'poor';
      onlineLearning: string[];
      digitalSkills: string[];
      technologyGoals: string[];
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeTimeAnalysis: boolean;
    includeHealthAnalysis: boolean;
    includeFinancialAnalysis: boolean;
    includeRelationshipAnalysis: boolean;
    includePersonalDevelopment: boolean;
    includeEnvironmentalAnalysis: boolean;
    includeTechnologyAnalysis: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface EverydayCalculatorResults {
  // Personal Analysis
  personalAnalysis: {
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      maritalStatus: string;
      dependents: number;
      occupation: string;
      employer: string;
      employmentStatus: string;
      education: string;
      healthStatus: string;
      lifeExpectancy: number;
    };
    contactInfo: {
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      phone: string;
      email: string;
      emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
        email: string;
      };
    };
    lifestyleInfo: {
      livingSituation: string;
      homeOwnership: string;
      commuteDistance: number;
      commuteTime: number;
      commuteMethod: string;
      workSchedule: string;
      workHours: number;
      vacationDays: number;
      sickDays: number;
    };
    personalEfficiency: number;
  };
  
  // Daily Activities Analysis
  dailyActivitiesAnalysis: {
    sleepSchedule: {
      bedtime: string;
      wakeTime: string;
      sleepDuration: number;
      sleepQuality: string;
      sleepInterruptions: number;
      sleepEnvironment: {
        roomTemperature: number;
        noiseLevel: string;
        lightLevel: string;
        comfortLevel: string;
      };
    };
    workActivities: {
      workStartTime: string;
      workEndTime: string;
      breakTime: number;
      lunchTime: number;
      productivityLevel: string;
      stressLevel: string;
      workEnvironment: {
        officeType: string;
        ergonomics: string;
        noiseLevel: string;
        airQuality: string;
      };
    };
    personalActivities: {
      exerciseTime: number;
      exerciseType: string[];
      exerciseIntensity: string;
      mealTimes: {
        breakfast: string;
        lunch: string;
        dinner: string;
        snacks: string[];
      };
      mealDuration: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
      };
      leisureTime: number;
      leisureActivities: string[];
      socialTime: number;
      socialActivities: string[];
    };
    householdActivities: {
      cleaningTime: number;
      cleaningFrequency: string;
      laundryTime: number;
      laundryFrequency: string;
      cookingTime: number;
      cookingFrequency: string;
      shoppingTime: number;
      shoppingFrequency: string;
      maintenanceTime: number;
      maintenanceFrequency: string;
    };
    activitiesEfficiency: number;
  };
  
  // Time Management Analysis
  timeManagementAnalysis: {
    timeAllocation: {
      sleep: number;
      work: number;
      commute: number;
      exercise: number;
      meals: number;
      leisure: number;
      social: number;
      household: number;
      personal: number;
      other: number;
    };
    timeEfficiency: {
      productivityScore: number;
      timeWasters: string[];
      efficiencyTips: string[];
      multitaskingAbility: string;
      focusLevel: string;
      procrastinationLevel: string;
    };
    scheduleOptimization: {
      optimalWakeTime: string;
      optimalBedtime: string;
      optimalWorkHours: {
        start: string;
        end: string;
      };
      optimalBreakTimes: string[];
      optimalExerciseTime: string;
      optimalMealTimes: {
        breakfast: string;
        lunch: string;
        dinner: string;
      };
    };
    timeEfficiency: number;
  };
  
  // Health and Wellness Analysis
  healthWellnessAnalysis: {
    physicalHealth: {
      exerciseFrequency: string;
      exerciseDuration: number;
      exerciseType: string[];
      exerciseIntensity: string;
      nutritionQuality: string;
      hydrationLevel: string;
      sleepQuality: string;
      stressLevel: string;
      energyLevel: string;
    };
    mentalHealth: {
      moodLevel: string;
      stressManagement: string;
      relaxationTime: number;
      relaxationActivities: string[];
      socialConnections: string;
      workLifeBalance: string;
      lifeSatisfaction: number;
      purposeAlignment: string;
    };
    preventiveCare: {
      annualCheckup: boolean;
      dentalCheckup: boolean;
      visionCheckup: boolean;
      vaccinations: boolean;
      screenings: string[];
      lastCheckup: string;
      nextCheckup: string;
      healthGoals: string[];
    };
    wellnessEfficiency: number;
  };
  
  // Financial Management Analysis
  financialManagementAnalysis: {
    incomeExpenses: {
      monthlyIncome: number;
      monthlyExpenses: number;
      savingsRate: number;
      emergencyFund: number;
      debtLevel: string;
      financialGoals: string[];
      budgetAdherence: string;
    };
    financialHabits: {
      budgetTracking: string;
      expenseTracking: string;
      savingHabits: string;
      investmentActivity: string;
      debtManagement: string;
      financialLiteracy: string;
    };
    financialPlanning: {
      retirementPlanning: boolean;
      insuranceCoverage: boolean;
      estatePlanning: boolean;
      taxPlanning: boolean;
      investmentStrategy: string;
      financialAdvisor: boolean;
      financialEducation: string[];
    };
    financialEfficiency: number;
  };
  
  // Relationships and Social Analysis
  relationshipsSocialAnalysis: {
    familyRelationships: {
      familyTime: number;
      familyActivities: string[];
      familyCommunication: string;
      familySupport: string;
      familyConflicts: number;
      familyGoals: string[];
    };
    friendships: {
      friendTime: number;
      friendActivities: string[];
      friendQuality: string;
      friendQuantity: string;
      friendSupport: string;
      socialNetwork: string;
    };
    communityInvolvement: {
      volunteerTime: number;
      volunteerActivities: string[];
      communityEvents: number;
      communityConnections: string;
      civicEngagement: string;
      communityGoals: string[];
    };
    socialEfficiency: number;
  };
  
  // Personal Development Analysis
  personalDevelopmentAnalysis: {
    learningGrowth: {
      learningTime: number;
      learningActivities: string[];
      skillDevelopment: string[];
      careerDevelopment: string[];
      personalGoals: string[];
      growthMindset: string;
      curiosityLevel: string;
    };
    hobbiesInterests: {
      hobbyTime: number;
      hobbies: string[];
      interestAreas: string[];
      creativeActivities: string[];
      outdoorActivities: string[];
      indoorActivities: string[];
      skillLevel: {
        hobby: string;
        level: string;
      }[];
    };
    personalGoals: {
      shortTermGoals: string[];
      mediumTermGoals: string[];
      longTermGoals: string[];
      goalProgress: {
        goal: string;
        progress: number;
        timeline: string;
        status: string;
      }[];
      goalAlignment: string;
    };
    developmentEfficiency: number;
  };
  
  // Environment and Sustainability Analysis
  environmentSustainabilityAnalysis: {
    environmentalImpact: {
      carbonFootprint: number;
      energyConsumption: number;
      waterConsumption: number;
      wasteProduction: number;
      transportationImpact: number;
      foodImpact: number;
      environmentalAwareness: string;
    };
    sustainablePractices: {
      recycling: boolean;
      composting: boolean;
      energyEfficiency: boolean;
      waterConservation: boolean;
      sustainableTransport: boolean;
      sustainableFood: boolean;
      sustainableShopping: boolean;
      renewableEnergy: boolean;
      greenProducts: boolean;
      environmentalAdvocacy: boolean;
    };
    sustainabilityGoals: {
      carbonReduction: number;
      wasteReduction: number;
      energyEfficiency: number;
      sustainableLifestyle: number;
      environmentalEducation: string[];
      communityAction: string[];
    };
    sustainabilityEfficiency: number;
  };
  
  // Technology and Digital Life Analysis
  technologyDigitalAnalysis: {
    technologyUsage: {
      screenTime: number;
      deviceUsage: {
        smartphone: number;
        computer: number;
        tablet: number;
        tv: number;
        other: number;
      };
      appUsage: string[];
      socialMediaTime: number;
      digitalCommunication: number;
      onlineShopping: number;
      digitalEntertainment: number;
    };
    digitalWellness: {
      digitalDetox: boolean;
      screenFreeTime: number;
      digitalBalance: string;
      onlinePrivacy: string;
      cybersecurity: string;
      digitalLiteracy: string;
      technologyStress: string;
    };
    digitalProductivity: {
      productivityApps: string[];
      automationTools: string[];
      digitalOrganization: string;
      onlineLearning: string[];
      digitalSkills: string[];
      technologyGoals: string[];
    };
    technologyEfficiency: number;
  };
  
  // Lifestyle Optimization Analysis
  lifestyleOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialBenefit: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    timeOptimization: {
      timeWasters: string[];
      efficiencyImprovements: string[];
      scheduleOptimizations: string[];
      timeSavings: number;
    };
    healthOptimization: {
      healthImprovements: string[];
      wellnessEnhancements: string[];
      preventiveMeasures: string[];
      healthBenefits: number;
    };
    financialOptimization: {
      costSavings: string[];
      investmentOpportunities: string[];
      financialImprovements: string[];
      financialBenefits: number;
    };
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowEfficiency: number;
    highEfficiency: number;
    sensitivity: number;
  }[];
  
  // Everyday Score
  everydayScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      activities: number;
      timeManagement: number;
      health: number;
      financial: number;
      relationships: number;
      development: number;
      sustainability: number;
      technology: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      overallScore: number;
      componentScores: {
        component: string;
        score: number;
      }[];
      improvements: string[];
    }[];
    progressTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    productivityImprovement: number;
    healthBenefits: number;
    financialSavings: number;
    qualityOfLife: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    lifestyleAssessment: string;
    optimizationAssessment: string;
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
    overallScore: number;
    timeEfficiency: number;
    healthScore: number;
    financialScore: number;
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
