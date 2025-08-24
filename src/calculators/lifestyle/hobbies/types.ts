export interface HobbiesCalculatorInputs {
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
      availableSpace: 'small' | 'medium' | 'large' | 'outdoor';
      availableTime: number; // hours per week
      budget: number; // monthly budget for hobbies
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
      interests: string[];
      goals: string[];
    };
  };
  
  // Current Hobbies
  currentHobbies: {
    // Active Hobbies
    activeHobbies: {
      hobby: string;
      category: 'sports' | 'fitness' | 'outdoor' | 'adventure' | 'dance' | 'martial_arts' | 'other';
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      timeSpent: number; // hours per week
      frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
      cost: number; // monthly cost
      equipment: string[];
      location: 'indoor' | 'outdoor' | 'both';
      social: boolean;
      competitive: boolean;
      healthBenefits: string[];
      enjoyment: number; // 1-10 scale
      stressRelief: number; // 1-10 scale
      skillDevelopment: number; // 1-10 scale
    }[];
    
    // Creative Hobbies
    creativeHobbies: {
      hobby: string;
      category: 'art' | 'crafts' | 'music' | 'writing' | 'photography' | 'cooking' | 'gardening' | 'other';
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      timeSpent: number; // hours per week
      frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
      cost: number; // monthly cost
      equipment: string[];
      materials: string[];
      techniques: string[];
      projects: string[];
      inspiration: string[];
      creativity: number; // 1-10 scale
      satisfaction: number; // 1-10 scale
      skillDevelopment: number; // 1-10 scale
    }[];
    
    // Intellectual Hobbies
    intellectualHobbies: {
      hobby: string;
      category: 'reading' | 'puzzles' | 'games' | 'learning' | 'collecting' | 'research' | 'other';
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      timeSpent: number; // hours per week
      frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
      cost: number; // monthly cost
      resources: string[];
      topics: string[];
      challenges: string[];
      achievements: string[];
      mentalStimulation: number; // 1-10 scale
      knowledgeGain: number; // 1-10 scale
      problemSolving: number; // 1-10 scale
    }[];
    
    // Social Hobbies
    socialHobbies: {
      hobby: string;
      category: 'clubs' | 'volunteering' | 'meetups' | 'events' | 'travel' | 'other';
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      timeSpent: number; // hours per week
      frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
      cost: number; // monthly cost
      groupSize: 'small' | 'medium' | 'large';
      socialConnections: number; // number of people
      networking: boolean;
      community: string;
      events: string[];
      socialBenefits: string[];
      relationshipBuilding: number; // 1-10 scale
      communityInvolvement: number; // 1-10 scale
      personalGrowth: number; // 1-10 scale
    }[];
  };
  
  // Hobby Goals
  hobbyGoals: {
    // Short-term Goals
    shortTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number; // percentage
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
    
    // Medium-term Goals
    mediumTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number; // percentage
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
    
    // Long-term Goals
    longTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number; // percentage
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
  };
  
  // Time Management
  timeManagement: {
    // Available Time
    availableTime: {
      weekdayTime: number; // hours per day
      weekendTime: number; // hours per day
      totalWeeklyTime: number; // hours per week
      flexibleTime: number; // hours per week
      scheduledTime: number; // hours per week
      timePreferences: {
        morning: boolean;
        afternoon: boolean;
        evening: boolean;
        night: boolean;
      };
    };
    
    // Time Allocation
    timeAllocation: {
      currentHobbies: number; // percentage
      newHobbies: number; // percentage
      learning: number; // percentage
      practice: number; // percentage
      social: number; // percentage
      rest: number; // percentage
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
  };
  
  // Financial Management
  financialManagement: {
    // Budget Information
    budgetInfo: {
      totalBudget: number; // monthly
      currentSpending: number; // monthly
      availableBudget: number; // monthly
      budgetAllocation: {
        equipment: number; // percentage
        materials: number; // percentage
        classes: number; // percentage
        events: number; // percentage
        travel: number; // percentage
        other: number; // percentage
      };
    };
    
    // Cost Analysis
    costAnalysis: {
      hobbyCosts: {
        hobby: string;
        startupCost: number;
        monthlyCost: number;
        annualCost: number;
        costBreakdown: {
          equipment: number;
          materials: number;
          classes: number;
          events: number;
          travel: number;
          other: number;
        };
      }[];
      costEfficiency: number;
      budgetOptimization: string[];
      costSavingTips: string[];
    };
    
    // Investment Analysis
    investmentAnalysis: {
      returnOnInvestment: {
        hobby: string;
        financialReturn: number;
        skillReturn: number;
        healthReturn: number;
        socialReturn: number;
        totalReturn: number;
      }[];
      investmentPriorities: string[];
      fundingSources: string[];
    };
  };
  
  // Skill Development
  skillDevelopment: {
    // Current Skills
    currentSkills: {
      skill: string;
      hobby: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      experience: number; // years
      proficiency: number; // 1-10 scale
      confidence: number; // 1-10 scale
      achievements: string[];
      certifications: string[];
    }[];
    
    // Learning Goals
    learningGoals: {
      skill: string;
      hobby: string;
      targetLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      timeline: string;
      learningMethod: 'self_study' | 'classes' | 'mentorship' | 'online' | 'workshops';
      resources: string[];
      practicePlan: string[];
      milestones: string[];
    }[];
    
    // Learning Resources
    learningResources: {
      books: string[];
      onlineCourses: string[];
      videos: string[];
      podcasts: string[];
      websites: string[];
      apps: string[];
      communities: string[];
      mentors: string[];
      workshops: string[];
      events: string[];
    };
  };
  
  // Health and Wellness
  healthWellness: {
    // Physical Health
    physicalHealth: {
      fitnessLevel: 'excellent' | 'good' | 'fair' | 'poor';
      mobility: 'excellent' | 'good' | 'fair' | 'poor';
      stamina: 'excellent' | 'good' | 'fair' | 'poor';
      strength: 'excellent' | 'good' | 'fair' | 'poor';
      flexibility: 'excellent' | 'good' | 'fair' | 'poor';
      healthGoals: string[];
      limitations: string[];
      accommodations: string[];
    };
    
    // Mental Health
    mentalHealth: {
      stressLevel: 'low' | 'moderate' | 'high';
      anxietyLevel: 'low' | 'moderate' | 'high';
      moodLevel: 'excellent' | 'good' | 'fair' | 'poor';
      focusLevel: 'high' | 'medium' | 'low';
      motivationLevel: 'high' | 'medium' | 'low';
      mentalHealthGoals: string[];
      copingStrategies: string[];
      supportSystems: string[];
    };
    
    // Wellness Benefits
    wellnessBenefits: {
      stressRelief: number; // 1-10 scale
      moodImprovement: number; // 1-10 scale
      energyBoost: number; // 1-10 scale
      confidenceBuilding: number; // 1-10 scale
      mindfulness: number; // 1-10 scale
      creativity: number; // 1-10 scale
      socialConnection: number; // 1-10 scale
      purposeFulfillment: number; // 1-10 scale
    };
  };
  
  // Social Aspects
  socialAspects: {
    // Social Connections
    socialConnections: {
      familyInvolvement: boolean;
      friendInvolvement: boolean;
      communityInvolvement: boolean;
      onlineCommunities: string[];
      localGroups: string[];
      events: string[];
      networking: boolean;
      mentorship: boolean;
      collaboration: boolean;
    };
    
    // Social Benefits
    socialBenefits: {
      relationshipBuilding: number; // 1-10 scale
      communityInvolvement: number; // 1-10 scale
      networking: number; // 1-10 scale
      supportSystem: number; // 1-10 scale
      culturalExchange: number; // 1-10 scale
      sharedExperiences: number; // 1-10 scale
      socialSkills: number; // 1-10 scale
      belonging: number; // 1-10 scale
    };
    
    // Social Goals
    socialGoals: {
      meetNewPeople: boolean;
      strengthenRelationships: boolean;
      buildCommunity: boolean;
      shareKnowledge: boolean;
      collaborate: boolean;
      mentor: boolean;
      learnFromOthers: boolean;
      contribute: boolean;
    };
  };
  
  // Environmental Impact
  environmentalImpact: {
    // Environmental Considerations
    environmentalConsiderations: {
      sustainability: 'high' | 'medium' | 'low';
      ecoFriendly: boolean;
      materials: string[];
      energyUsage: number;
      wasteProduction: number;
      carbonFootprint: number;
      environmentalAwareness: 'high' | 'medium' | 'low';
    };
    
    // Sustainable Practices
    sustainablePractices: {
      recycledMaterials: boolean;
      renewableResources: boolean;
      energyEfficient: boolean;
      wasteReduction: boolean;
      localSourcing: boolean;
      minimalPackaging: boolean;
      repairReuse: boolean;
      environmentalEducation: boolean;
    };
    
    // Environmental Goals
    environmentalGoals: {
      reduceWaste: boolean;
      useSustainableMaterials: boolean;
      minimizeEnergyUsage: boolean;
      supportLocal: boolean;
      educateOthers: boolean;
      environmentalAdvocacy: boolean;
      conservationEfforts: boolean;
      greenInnovation: boolean;
    };
  };
  
  // Technology Integration
  technologyIntegration: {
    // Digital Tools
    digitalTools: {
      apps: string[];
      websites: string[];
      software: string[];
      devices: string[];
      platforms: string[];
      onlineCommunities: string[];
      digitalResources: string[];
      automation: string[];
    };
    
    // Digital Skills
    digitalSkills: {
      basicComputer: 'excellent' | 'good' | 'fair' | 'poor';
      internetUsage: 'excellent' | 'good' | 'fair' | 'poor';
      socialMedia: 'excellent' | 'good' | 'fair' | 'poor';
      onlineLearning: 'excellent' | 'good' | 'fair' | 'poor';
      digitalCreativity: 'excellent' | 'good' | 'fair' | 'poor';
      problemSolving: 'excellent' | 'good' | 'fair' | 'poor';
    };
    
    // Technology Goals
    technologyGoals: {
      learnNewTools: boolean;
      improveDigitalSkills: boolean;
      createDigitalContent: boolean;
      connectOnline: boolean;
      automateProcesses: boolean;
      stayUpdated: boolean;
      shareKnowledge: boolean;
      innovate: boolean;
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeTimeAnalysis: boolean;
    includeFinancialAnalysis: boolean;
    includeSkillAnalysis: boolean;
    includeHealthAnalysis: boolean;
    includeSocialAnalysis: boolean;
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

export interface HobbiesCalculatorResults {
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
      availableSpace: string;
      availableTime: number;
      budget: number;
      skillLevel: string;
      learningStyle: string;
      interests: string[];
      goals: string[];
    };
    personalEfficiency: number;
  };
  
  // Current Hobbies Analysis
  currentHobbiesAnalysis: {
    activeHobbies: {
      hobby: string;
      category: string;
      skillLevel: string;
      timeSpent: number;
      frequency: string;
      cost: number;
      equipment: string[];
      location: string;
      social: boolean;
      competitive: boolean;
      healthBenefits: string[];
      enjoyment: number;
      stressRelief: number;
      skillDevelopment: number;
    }[];
    creativeHobbies: {
      hobby: string;
      category: string;
      skillLevel: string;
      timeSpent: number;
      frequency: string;
      cost: number;
      equipment: string[];
      materials: string[];
      techniques: string[];
      projects: string[];
      inspiration: string[];
      creativity: number;
      satisfaction: number;
      skillDevelopment: number;
    }[];
    intellectualHobbies: {
      hobby: string;
      category: string;
      skillLevel: string;
      timeSpent: number;
      frequency: string;
      cost: number;
      resources: string[];
      topics: string[];
      challenges: string[];
      achievements: string[];
      mentalStimulation: number;
      knowledgeGain: number;
      problemSolving: number;
    }[];
    socialHobbies: {
      hobby: string;
      category: string;
      skillLevel: string;
      timeSpent: number;
      frequency: string;
      cost: number;
      groupSize: string;
      socialConnections: number;
      networking: boolean;
      community: string;
      events: string[];
      socialBenefits: string[];
      relationshipBuilding: number;
      communityInvolvement: number;
      personalGrowth: number;
    }[];
    hobbiesEfficiency: number;
  };
  
  // Hobby Goals Analysis
  hobbyGoalsAnalysis: {
    shortTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number;
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
    mediumTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number;
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
    longTermGoals: {
      goal: string;
      hobby: string;
      targetDate: string;
      progress: number;
      milestones: string[];
      resources: string[];
      challenges: string[];
      successMetrics: string[];
    }[];
    goalsEfficiency: number;
  };
  
  // Time Management Analysis
  timeManagementAnalysis: {
    availableTime: {
      weekdayTime: number;
      weekendTime: number;
      totalWeeklyTime: number;
      flexibleTime: number;
      scheduledTime: number;
      timePreferences: {
        morning: boolean;
        afternoon: boolean;
        evening: boolean;
        night: boolean;
      };
    };
    timeAllocation: {
      currentHobbies: number;
      newHobbies: number;
      learning: number;
      practice: number;
      social: number;
      rest: number;
    };
    timeEfficiency: {
      productivityScore: number;
      timeWasters: string[];
      efficiencyTips: string[];
      multitaskingAbility: string;
      focusLevel: string;
      procrastinationLevel: string;
    };
    timeEfficiency: number;
  };
  
  // Financial Management Analysis
  financialManagementAnalysis: {
    budgetInfo: {
      totalBudget: number;
      currentSpending: number;
      availableBudget: number;
      budgetAllocation: {
        equipment: number;
        materials: number;
        classes: number;
        events: number;
        travel: number;
        other: number;
      };
    };
    costAnalysis: {
      hobbyCosts: {
        hobby: string;
        startupCost: number;
        monthlyCost: number;
        annualCost: number;
        costBreakdown: {
          equipment: number;
          materials: number;
          classes: number;
          events: number;
          travel: number;
          other: number;
        };
      }[];
      costEfficiency: number;
      budgetOptimization: string[];
      costSavingTips: string[];
    };
    investmentAnalysis: {
      returnOnInvestment: {
        hobby: string;
        financialReturn: number;
        skillReturn: number;
        healthReturn: number;
        socialReturn: number;
        totalReturn: number;
      }[];
      investmentPriorities: string[];
      fundingSources: string[];
    };
    financialEfficiency: number;
  };
  
  // Skill Development Analysis
  skillDevelopmentAnalysis: {
    currentSkills: {
      skill: string;
      hobby: string;
      level: string;
      experience: number;
      proficiency: number;
      confidence: number;
      achievements: string[];
      certifications: string[];
    }[];
    learningGoals: {
      skill: string;
      hobby: string;
      targetLevel: string;
      timeline: string;
      learningMethod: string;
      resources: string[];
      practicePlan: string[];
      milestones: string[];
    }[];
    learningResources: {
      books: string[];
      onlineCourses: string[];
      videos: string[];
      podcasts: string[];
      websites: string[];
      apps: string[];
      communities: string[];
      mentors: string[];
      workshops: string[];
      events: string[];
    };
    skillEfficiency: number;
  };
  
  // Health and Wellness Analysis
  healthWellnessAnalysis: {
    physicalHealth: {
      fitnessLevel: string;
      mobility: string;
      stamina: string;
      strength: string;
      flexibility: string;
      healthGoals: string[];
      limitations: string[];
      accommodations: string[];
    };
    mentalHealth: {
      stressLevel: string;
      anxietyLevel: string;
      moodLevel: string;
      focusLevel: string;
      motivationLevel: string;
      mentalHealthGoals: string[];
      copingStrategies: string[];
      supportSystems: string[];
    };
    wellnessBenefits: {
      stressRelief: number;
      moodImprovement: number;
      energyBoost: number;
      confidenceBuilding: number;
      mindfulness: number;
      creativity: number;
      socialConnection: number;
      purposeFulfillment: number;
    };
    wellnessEfficiency: number;
  };
  
  // Social Aspects Analysis
  socialAspectsAnalysis: {
    socialConnections: {
      familyInvolvement: boolean;
      friendInvolvement: boolean;
      communityInvolvement: boolean;
      onlineCommunities: string[];
      localGroups: string[];
      events: string[];
      networking: boolean;
      mentorship: boolean;
      collaboration: boolean;
    };
    socialBenefits: {
      relationshipBuilding: number;
      communityInvolvement: number;
      networking: number;
      supportSystem: number;
      culturalExchange: number;
      sharedExperiences: number;
      socialSkills: number;
      belonging: number;
    };
    socialGoals: {
      meetNewPeople: boolean;
      strengthenRelationships: boolean;
      buildCommunity: boolean;
      shareKnowledge: boolean;
      collaborate: boolean;
      mentor: boolean;
      learnFromOthers: boolean;
      contribute: boolean;
    };
    socialEfficiency: number;
  };
  
  // Environmental Impact Analysis
  environmentalImpactAnalysis: {
    environmentalConsiderations: {
      sustainability: string;
      ecoFriendly: boolean;
      materials: string[];
      energyUsage: number;
      wasteProduction: number;
      carbonFootprint: number;
      environmentalAwareness: string;
    };
    sustainablePractices: {
      recycledMaterials: boolean;
      renewableResources: boolean;
      energyEfficient: boolean;
      wasteReduction: boolean;
      localSourcing: boolean;
      minimalPackaging: boolean;
      repairReuse: boolean;
      environmentalEducation: boolean;
    };
    environmentalGoals: {
      reduceWaste: boolean;
      useSustainableMaterials: boolean;
      minimizeEnergyUsage: boolean;
      supportLocal: boolean;
      educateOthers: boolean;
      environmentalAdvocacy: boolean;
      conservationEfforts: boolean;
      greenInnovation: boolean;
    };
    environmentalEfficiency: number;
  };
  
  // Technology Integration Analysis
  technologyIntegrationAnalysis: {
    digitalTools: {
      apps: string[];
      websites: string[];
      software: string[];
      devices: string[];
      platforms: string[];
      onlineCommunities: string[];
      digitalResources: string[];
      automation: string[];
    };
    digitalSkills: {
      basicComputer: string;
      internetUsage: string;
      socialMedia: string;
      onlineLearning: string;
      digitalCreativity: string;
      problemSolving: string;
    };
    technologyGoals: {
      learnNewTools: boolean;
      improveDigitalSkills: boolean;
      createDigitalContent: boolean;
      connectOnline: boolean;
      automateProcesses: boolean;
      stayUpdated: boolean;
      shareKnowledge: boolean;
      innovate: boolean;
    };
    technologyEfficiency: number;
  };
  
  // Hobby Optimization Analysis
  hobbyOptimizationAnalysis: {
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
    costOptimization: {
      costSavings: string[];
      budgetOptimizations: string[];
      investmentOpportunities: string[];
      financialBenefits: number;
    };
    skillOptimization: {
      skillGaps: string[];
      learningOpportunities: string[];
      practiceImprovements: string[];
      skillBenefits: number;
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
  
  // Hobbies Score
  hobbiesScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      currentHobbies: number;
      goals: number;
      timeManagement: number;
      financial: number;
      skills: number;
      health: number;
      social: number;
      environmental: number;
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
    skillDevelopment: number;
    creativityEnhancement: number;
    stressReduction: number;
    socialConnections: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    hobbiesAssessment: string;
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
    costEfficiency: number;
    skillEfficiency: number;
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
