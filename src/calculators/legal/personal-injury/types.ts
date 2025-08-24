export interface PersonalInjuryCalculatorInputs {
  // Case Information
  caseInfo: {
    // Basic Case Details
    basicInfo: {
      caseNumber: string;
      caseType: 'auto_accident' | 'slip_fall' | 'medical_malpractice' | 'product_liability' | 'workplace_injury' | 'premises_liability' | 'dog_bite' | 'wrongful_death' | 'defamation' | 'other';
      jurisdiction: string;
      courtType: 'state' | 'federal' | 'municipal' | 'administrative';
      filingDate: string;
      statuteOfLimitations: string;
      caseStatus: 'investigation' | 'filed' | 'discovery' | 'mediation' | 'trial' | 'settled' | 'closed';
      priority: 'low' | 'medium' | 'high' | 'urgent';
    };
    
    // Parties Information
    partiesInfo: {
      plaintiff: {
        name: string;
        age: number;
        gender: 'male' | 'female' | 'other';
        occupation: string;
        income: number; // annual income
        maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
        dependents: number;
        insurance: {
          health: string;
          auto: string;
          disability: string;
          life: string;
        };
      };
      defendant: {
        name: string;
        type: 'individual' | 'corporation' | 'government' | 'insurance_company';
        insurance: {
          liability: number;
          umbrella: number;
          self_insured: boolean;
        };
        assets: number;
        netWorth: number;
      };
    };
    
    // Incident Information
    incidentInfo: {
      date: string;
      time: string;
      location: string;
      weather: string;
      witnesses: {
        name: string;
        contact: string;
        statement: string;
      }[];
      policeReport: {
        reportNumber: string;
        officer: string;
        department: string;
        findings: string;
      };
      evidence: {
        photos: string[];
        videos: string[];
        documents: string[];
        physicalEvidence: string[];
      };
    };
  };
  
  // Injury Information
  injuryInfo: {
    // Physical Injuries
    physicalInjuries: {
      injury: string;
      severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
      bodyPart: string;
      permanent: boolean;
      disfigurement: boolean;
      disability: boolean;
      treatment: string[];
      prognosis: string;
      recoveryTime: number; // in months
    }[];
    
    // Medical Treatment
    medicalTreatment: {
      emergencyCare: {
        hospital: string;
        date: string;
        treatment: string;
        cost: number;
      };
      surgeries: {
        procedure: string;
        date: string;
        surgeon: string;
        hospital: string;
        cost: number;
        complications: string[];
      }[];
      medications: {
        medication: string;
        dosage: string;
        duration: string;
        cost: number;
        sideEffects: string[];
      }[];
      therapy: {
        type: 'physical' | 'occupational' | 'speech' | 'psychological' | 'recreational';
        provider: string;
        frequency: string;
        duration: string;
        cost: number;
        progress: string;
      }[];
      futureTreatment: {
        procedure: string;
        estimatedCost: number;
        necessity: 'required' | 'recommended' | 'optional';
        timeline: string;
      }[];
    };
    
    // Pain and Suffering
    painSuffering: {
      painLevel: number; // 1-10 scale
      painDuration: number; // in months
      painType: 'acute' | 'chronic' | 'intermittent';
      impactOnLife: {
        dailyActivities: 'none' | 'mild' | 'moderate' | 'severe';
        work: 'none' | 'mild' | 'moderate' | 'severe';
        relationships: 'none' | 'mild' | 'moderate' | 'severe';
        sleep: 'none' | 'mild' | 'moderate' | 'severe';
        recreation: 'none' | 'mild' | 'moderate' | 'severe';
      };
      emotionalDistress: {
        anxiety: boolean;
        depression: boolean;
        ptsd: boolean;
        fear: boolean;
        anger: boolean;
        grief: boolean;
        severity: 'mild' | 'moderate' | 'severe';
      };
    };
  };
  
  // Economic Damages
  economicDamages: {
    // Medical Expenses
    medicalExpenses: {
      pastMedical: number;
      futureMedical: number;
      prescriptionDrugs: number;
      medicalEquipment: number;
      homeModifications: number;
      transportation: number;
      totalMedical: number;
    };
    
    // Lost Income
    lostIncome: {
      pastLostWages: number;
      futureLostWages: number;
      lostBenefits: number;
      lostOpportunities: number;
      totalLostIncome: number;
    };
    
    // Property Damage
    propertyDamage: {
      vehicleDamage: number;
      personalProperty: number;
      clothing: number;
      other: number;
      totalPropertyDamage: number;
    };
    
    // Other Economic Losses
    otherEconomicLosses: {
      householdServices: number;
      childcare: number;
      education: number;
      vocationalRehabilitation: number;
      other: number;
      totalOtherLosses: number;
    };
  };
  
  // Liability Analysis
  liabilityAnalysis: {
    // Fault Assessment
    faultAssessment: {
      plaintiffFault: number; // percentage
      defendantFault: number; // percentage
      comparativeNegligence: boolean;
      contributoryNegligence: boolean;
      pureComparative: boolean;
      modifiedComparative: boolean;
    };
    
    // Legal Theories
    legalTheories: {
      negligence: {
        duty: boolean;
        breach: boolean;
        causation: boolean;
        damages: boolean;
        strength: 'weak' | 'moderate' | 'strong';
      };
      strictLiability: {
        applicable: boolean;
        productDefect: boolean;
        unreasonablyDangerous: boolean;
        strength: 'weak' | 'moderate' | 'strong';
      };
      intentionalTort: {
        applicable: boolean;
        intent: boolean;
        harm: boolean;
        strength: 'weak' | 'moderate' | 'strong';
      };
      premisesLiability: {
        applicable: boolean;
        dangerousCondition: boolean;
        notice: boolean;
        strength: 'weak' | 'moderate' | 'strong';
      };
    };
    
    // Defenses
    defenses: {
      assumptionOfRisk: boolean;
      contributoryNegligence: boolean;
      statuteOfLimitations: boolean;
      governmentalImmunity: boolean;
      workersCompensation: boolean;
      other: string[];
    };
  };
  
  // Settlement Analysis
  settlementAnalysis: {
    // Settlement History
    settlementHistory: {
      initialDemand: number;
      counterOffer: number;
      negotiations: {
        round: number;
        plaintiffOffer: number;
        defendantOffer: number;
        date: string;
      }[];
      currentPosition: number;
    };
    
    // Settlement Factors
    settlementFactors: {
      liabilityStrength: 'weak' | 'moderate' | 'strong';
      damagesStrength: 'weak' | 'moderate' | 'strong';
      defendantResources: 'limited' | 'adequate' | 'substantial';
      insuranceCoverage: 'limited' | 'adequate' | 'substantial';
      trialRisk: 'low' | 'medium' | 'high';
      timeToTrial: number; // in months
      settlementDesire: 'low' | 'medium' | 'high';
    };
    
    // Settlement Range
    settlementRange: {
      minimum: number;
      maximum: number;
      target: number;
      probability: number; // percentage
    };
  };
  
  // Trial Analysis
  trialAnalysis: {
    // Trial Preparation
    trialPreparation: {
      discoveryComplete: boolean;
      expertWitnesses: {
        name: string;
        specialty: string;
        cost: number;
        testimony: string;
      }[];
      layWitnesses: {
        name: string;
        testimony: string;
        credibility: 'low' | 'medium' | 'high';
      }[];
      evidenceStrength: 'weak' | 'moderate' | 'strong';
      juryAppeal: 'low' | 'medium' | 'high';
    };
    
    // Trial Strategy
    trialStrategy: {
      theme: string;
      keyArguments: string[];
      weaknesses: string[];
      strengths: string[];
      juryInstructions: string[];
      verdictForm: string;
    };
    
    // Trial Costs
    trialCosts: {
      expertFees: number;
      courtCosts: number;
      transcriptCosts: number;
      exhibitCosts: number;
      travelCosts: number;
      otherCosts: number;
      totalTrialCosts: number;
    };
  };
  
  // Damages Calculation
  damagesCalculation: {
    // Compensatory Damages
    compensatoryDamages: {
      economicDamages: {
        medicalExpenses: number;
        lostIncome: number;
        propertyDamage: number;
        otherEconomic: number;
        totalEconomic: number;
      };
      nonEconomicDamages: {
        painSuffering: number;
        emotionalDistress: number;
        lossOfConsortium: number;
        lossOfEnjoyment: number;
        disfigurement: number;
        totalNonEconomic: number;
      };
      totalCompensatory: number;
    };
    
    // Punitive Damages
    punitiveDamages: {
      applicable: boolean;
      basis: string;
      multiplier: number;
      amount: number;
      constitutionality: boolean;
    };
    
    // Special Damages
    specialDamages: {
      lossOfConsortium: number;
      wrongfulDeath: number;
      survivalAction: number;
      other: number;
      totalSpecial: number;
    };
  };
  
  // Fee Structure
  feeStructure: {
    // Contingency Fee
    contingencyFee: {
      percentage: number;
      cap: number;
      expenses: number;
      netToClient: number;
    };
    
    // Hourly Fee
    hourlyFee: {
      rate: number;
      hours: number;
      total: number;
    };
    
    // Hybrid Fee
    hybridFee: {
      retainer: number;
      hourlyRate: number;
      contingencyPercentage: number;
      total: number;
    };
    
    // Fee Comparison
    feeComparison: {
      contingencyTotal: number;
      hourlyTotal: number;
      hybridTotal: number;
      recommended: 'contingency' | 'hourly' | 'hybrid';
    };
  };
  
  // Risk Assessment
  riskAssessment: {
    // Case Risks
    caseRisks: {
      liabilityRisk: 'low' | 'medium' | 'high';
      damagesRisk: 'low' | 'medium' | 'high';
      proceduralRisk: 'low' | 'medium' | 'high';
      evidenceRisk: 'low' | 'medium' | 'high';
      witnessRisk: 'low' | 'medium' | 'high';
      overallRisk: 'low' | 'medium' | 'high';
    };
    
    // Financial Risks
    financialRisks: {
      clientResources: 'limited' | 'adequate' | 'substantial';
      defendantResources: 'limited' | 'adequate' | 'substantial';
      insuranceCoverage: 'limited' | 'adequate' | 'substantial';
      collectibility: 'low' | 'medium' | 'high';
      bankruptcyRisk: 'low' | 'medium' | 'high';
    };
    
    // Mitigation Strategies
    mitigationStrategies: {
      strategy: string;
      effectiveness: 'low' | 'medium' | 'high';
      cost: number;
      implementation: string;
    }[];
  };
  
  // Calculation Options
  calculationOptions: {
    includeEconomicDamages: boolean;
    includeNonEconomicDamages: boolean;
    includePunitiveDamages: boolean;
    includeFeeAnalysis: boolean;
    includeRiskAssessment: boolean;
    includeSettlementAnalysis: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface PersonalInjuryCalculatorResults {
  // Case Analysis
  caseAnalysis: {
    basicInfo: {
      caseNumber: string;
      caseType: string;
      jurisdiction: string;
      courtType: string;
      filingDate: string;
      statuteOfLimitations: string;
      caseStatus: string;
      priority: string;
    };
    partiesInfo: {
      plaintiff: {
        name: string;
        age: number;
        gender: string;
        occupation: string;
        income: number;
        maritalStatus: string;
        dependents: number;
        insurance: {
          health: string;
          auto: string;
          disability: string;
          life: string;
        };
      };
      defendant: {
        name: string;
        type: string;
        insurance: {
          liability: number;
          umbrella: number;
          self_insured: boolean;
        };
        assets: number;
        netWorth: number;
      };
    };
    incidentInfo: {
      date: string;
      time: string;
      location: string;
      weather: string;
      witnesses: {
        name: string;
        contact: string;
        statement: string;
      }[];
      policeReport: {
        reportNumber: string;
        officer: string;
        department: string;
        findings: string;
      };
      evidence: {
        photos: string[];
        videos: string[];
        documents: string[];
        physicalEvidence: string[];
      };
    };
    caseEfficiency: number;
  };
  
  // Injury Analysis
  injuryAnalysis: {
    physicalInjuries: {
      injury: string;
      severity: string;
      bodyPart: string;
      permanent: boolean;
      disfigurement: boolean;
      disability: boolean;
      treatment: string[];
      prognosis: string;
      recoveryTime: number;
    }[];
    medicalTreatment: {
      emergencyCare: {
        hospital: string;
        date: string;
        treatment: string;
        cost: number;
      };
      surgeries: {
        procedure: string;
        date: string;
        surgeon: string;
        hospital: string;
        cost: number;
        complications: string[];
      }[];
      medications: {
        medication: string;
        dosage: string;
        duration: string;
        cost: number;
        sideEffects: string[];
      }[];
      therapy: {
        type: string;
        provider: string;
        frequency: string;
        duration: string;
        cost: number;
        progress: string;
      }[];
      futureTreatment: {
        procedure: string;
        estimatedCost: number;
        necessity: string;
        timeline: string;
      }[];
    };
    painSuffering: {
      painLevel: number;
      painDuration: number;
      painType: string;
      impactOnLife: {
        dailyActivities: string;
        work: string;
        relationships: string;
        sleep: string;
        recreation: string;
      };
      emotionalDistress: {
        anxiety: boolean;
        depression: boolean;
        ptsd: boolean;
        fear: boolean;
        anger: boolean;
        grief: boolean;
        severity: string;
      };
    };
    injuryEfficiency: number;
  };
  
  // Economic Damages Analysis
  economicDamagesAnalysis: {
    medicalExpenses: {
      pastMedical: number;
      futureMedical: number;
      prescriptionDrugs: number;
      medicalEquipment: number;
      homeModifications: number;
      transportation: number;
      totalMedical: number;
    };
    lostIncome: {
      pastLostWages: number;
      futureLostWages: number;
      lostBenefits: number;
      lostOpportunities: number;
      totalLostIncome: number;
    };
    propertyDamage: {
      vehicleDamage: number;
      personalProperty: number;
      clothing: number;
      other: number;
      totalPropertyDamage: number;
    };
    otherEconomicLosses: {
      householdServices: number;
      childcare: number;
      education: number;
      vocationalRehabilitation: number;
      other: number;
      totalOtherLosses: number;
    };
    totalEconomicDamages: number;
    economicEfficiency: number;
  };
  
  // Liability Analysis
  liabilityAnalysis: {
    faultAssessment: {
      plaintiffFault: number;
      defendantFault: number;
      comparativeNegligence: boolean;
      contributoryNegligence: boolean;
      pureComparative: boolean;
      modifiedComparative: boolean;
    };
    legalTheories: {
      negligence: {
        duty: boolean;
        breach: boolean;
        causation: boolean;
        damages: boolean;
        strength: string;
      };
      strictLiability: {
        applicable: boolean;
        productDefect: boolean;
        unreasonablyDangerous: boolean;
        strength: string;
      };
      intentionalTort: {
        applicable: boolean;
        intent: boolean;
        harm: boolean;
        strength: string;
      };
      premisesLiability: {
        applicable: boolean;
        dangerousCondition: boolean;
        notice: boolean;
        strength: string;
      };
    };
    defenses: {
      assumptionOfRisk: boolean;
      contributoryNegligence: boolean;
      statuteOfLimitations: boolean;
      governmentalImmunity: boolean;
      workersCompensation: boolean;
      other: string[];
    };
    liabilityEfficiency: number;
  };
  
  // Settlement Analysis
  settlementAnalysis: {
    settlementHistory: {
      initialDemand: number;
      counterOffer: number;
      negotiations: {
        round: number;
        plaintiffOffer: number;
        defendantOffer: number;
        date: string;
      }[];
      currentPosition: number;
    };
    settlementFactors: {
      liabilityStrength: string;
      damagesStrength: string;
      defendantResources: string;
      insuranceCoverage: string;
      trialRisk: string;
      timeToTrial: number;
      settlementDesire: string;
    };
    settlementRange: {
      minimum: number;
      maximum: number;
      target: number;
      probability: number;
    };
    settlementEfficiency: number;
  };
  
  // Trial Analysis
  trialAnalysis: {
    trialPreparation: {
      discoveryComplete: boolean;
      expertWitnesses: {
        name: string;
        specialty: string;
        cost: number;
        testimony: string;
      }[];
      layWitnesses: {
        name: string;
        testimony: string;
        credibility: string;
      }[];
      evidenceStrength: string;
      juryAppeal: string;
    };
    trialStrategy: {
      theme: string;
      keyArguments: string[];
      weaknesses: string[];
      strengths: string[];
      juryInstructions: string[];
      verdictForm: string;
    };
    trialCosts: {
      expertFees: number;
      courtCosts: number;
      transcriptCosts: number;
      exhibitCosts: number;
      travelCosts: number;
      otherCosts: number;
      totalTrialCosts: number;
    };
    trialEfficiency: number;
  };
  
  // Damages Calculation Analysis
  damagesCalculationAnalysis: {
    compensatoryDamages: {
      economicDamages: {
        medicalExpenses: number;
        lostIncome: number;
        propertyDamage: number;
        otherEconomic: number;
        totalEconomic: number;
      };
      nonEconomicDamages: {
        painSuffering: number;
        emotionalDistress: number;
        lossOfConsortium: number;
        lossOfEnjoyment: number;
        disfigurement: number;
        totalNonEconomic: number;
      };
      totalCompensatory: number;
    };
    punitiveDamages: {
      applicable: boolean;
      basis: string;
      multiplier: number;
      amount: number;
      constitutionality: boolean;
    };
    specialDamages: {
      lossOfConsortium: number;
      wrongfulDeath: number;
      survivalAction: number;
      other: number;
      totalSpecial: number;
    };
    totalDamages: number;
    damagesEfficiency: number;
  };
  
  // Fee Structure Analysis
  feeStructureAnalysis: {
    contingencyFee: {
      percentage: number;
      cap: number;
      expenses: number;
      netToClient: number;
    };
    hourlyFee: {
      rate: number;
      hours: number;
      total: number;
    };
    hybridFee: {
      retainer: number;
      hourlyRate: number;
      contingencyPercentage: number;
      total: number;
    };
    feeComparison: {
      contingencyTotal: number;
      hourlyTotal: number;
      hybridTotal: number;
      recommended: string;
    };
    feeEfficiency: number;
  };
  
  // Risk Assessment Analysis
  riskAssessmentAnalysis: {
    caseRisks: {
      liabilityRisk: string;
      damagesRisk: string;
      proceduralRisk: string;
      evidenceRisk: string;
      witnessRisk: string;
      overallRisk: string;
    };
    financialRisks: {
      clientResources: string;
      defendantResources: string;
      insuranceCoverage: string;
      collectibility: string;
      bankruptcyRisk: string;
    };
    mitigationStrategies: {
      strategy: string;
      effectiveness: string;
      cost: number;
      implementation: string;
    }[];
    riskEfficiency: number;
  };
  
  // Value Optimization Analysis
  valueOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialValue: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    damagesOptimization: {
      economicDamages: {
        currentValue: number;
        optimalValue: number;
        improvement: number;
        strategy: string;
      };
      nonEconomicDamages: {
        currentValue: number;
        optimalValue: number;
        improvement: number;
        strategy: string;
      };
      punitiveDamages: {
        currentValue: number;
        optimalValue: number;
        improvement: number;
        strategy: string;
      };
    };
    liabilityOptimization: {
      liabilityStrength: {
        currentStrength: string;
        optimalStrength: string;
        improvement: string;
        strategy: string;
      };
      evidenceOptimization: {
        currentEvidence: string;
        optimalEvidence: string;
        improvement: string;
        strategy: string;
      };
    };
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowDamages: number;
    highDamages: number;
    sensitivity: number;
  }[];
  
  // Personal Injury Score
  personalInjuryScore: {
    overallScore: number;
    componentScores: {
      case: number;
      injury: number;
      economic: number;
      liability: number;
      settlement: number;
      trial: number;
      damages: number;
      fees: number;
      risk: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalCases: {
      date: string;
      caseType: string;
      damages: number;
      settlement: number;
      outcome: string;
      factors: string[];
    }[];
    performanceTrends: string[];
    improvementAreas: string[];
  };
  
  // Business Impact
  businessImpact: {
    caseValue: number;
    feeRevenue: number;
    timeInvestment: number;
    riskExposure: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    caseAssessment: string;
    damagesAssessment: string;
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
    caseType: string;
    totalDamages: number;
    settlementRange: {
      min: number;
      max: number;
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
