export interface ConcreteCalculatorInputs {
  // Project Information
  projectInfo: {
    // Basic Project Details
    basicInfo: {
      projectName: string;
      projectType: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'renovation' | 'new_construction';
      projectCategory: 'foundation' | 'slab' | 'wall' | 'column' | 'beam' | 'staircase' | 'driveway' | 'sidewalk' | 'retaining_wall' | 'bridge' | 'dam' | 'tunnel';
      projectSize: 'small' | 'medium' | 'large' | 'mega';
      location: string;
      climate: 'tropical' | 'temperate' | 'cold' | 'arid' | 'coastal';
      seismicZone: number;
      windZone: number;
      frostDepth: number; // in feet
      soilType: 'clay' | 'silt' | 'sand' | 'gravel' | 'rock' | 'organic';
      groundwaterLevel: number; // in feet below surface
    };
    
    // Design Information
    designInfo: {
      designCode: 'ACI' | 'BS' | 'Eurocode' | 'IS' | 'CSA' | 'AS' | 'custom';
      designStandard: string;
      safetyFactor: number;
      loadCombination: string;
      designLife: number; // in years
      exposureClass: 'mild' | 'moderate' | 'severe' | 'very_severe' | 'extreme';
      fireResistance: number; // in hours
      durabilityClass: 'low' | 'medium' | 'high' | 'very_high';
    };
    
    // Structural Information
    structuralInfo: {
      structureType: 'reinforced_concrete' | 'prestressed_concrete' | 'post_tensioned' | 'precast' | 'cast_in_place';
      loadType: 'dead_load' | 'live_load' | 'wind_load' | 'seismic_load' | 'snow_load' | 'impact_load';
      spanLength: number; // in feet
      clearHeight: number; // in feet
      thickness: number; // in inches
      width: number; // in feet
      depth: number; // in feet
      area: number; // in square feet
      volume: number; // in cubic yards
    };
  };
  
  // Material Properties
  materialProperties: {
    // Concrete Properties
    concreteProperties: {
      strengthClass: 'C15' | 'C20' | 'C25' | 'C30' | 'C35' | 'C40' | 'C45' | 'C50' | 'C55' | 'C60' | 'C70' | 'C80' | 'C90' | 'C100';
      compressiveStrength: number; // in psi
      tensileStrength: number; // in psi
      flexuralStrength: number; // in psi
      modulusOfElasticity: number; // in ksi
      density: number; // in lb/ft³
      slump: number; // in inches
      airContent: number; // percentage
      waterCementRatio: number;
      cementContent: number; // in lb/yd³
      aggregateSize: number; // in inches
      aggregateType: 'crushed' | 'rounded' | 'natural' | 'recycled';
    };
    
    // Reinforcement Properties
    reinforcementProperties: {
      steelGrade: 'Grade_40' | 'Grade_60' | 'Grade_75' | 'Grade_80' | 'Grade_100';
      yieldStrength: number; // in ksi
      ultimateStrength: number; // in ksi
      modulusOfElasticity: number; // in ksi
      barSize: number; // in inches
      barSpacing: number; // in inches
      cover: number; // in inches
      developmentLength: number; // in inches
      lapLength: number; // in inches
      stirrupSpacing: number; // in inches
      tieSpacing: number; // in inches
    };
    
    // Aggregate Properties
    aggregateProperties: {
      fineAggregate: {
        type: 'natural_sand' | 'crushed_sand' | 'manufactured_sand';
        specificGravity: number;
        absorption: number; // percentage
        moistureContent: number; // percentage
        finenessModulus: number;
        gradation: string;
      };
      coarseAggregate: {
        type: 'crushed_stone' | 'gravel' | 'recycled';
        specificGravity: number;
        absorption: number; // percentage
        moistureContent: number; // percentage
        maximumSize: number; // in inches
        gradation: string;
      };
    };
    
    // Admixture Properties
    admixtureProperties: {
      waterReducing: {
        type: 'normal' | 'mid_range' | 'high_range';
        dosage: number; // oz/cwt
        waterReduction: number; // percentage
      };
      airEntraining: {
        type: 'vinsol_resin' | 'synthetic';
        dosage: number; // oz/cwt
        airContent: number; // percentage
      };
      retarder: {
        type: 'lignin' | 'hydroxycarboxylic_acid' | 'sugar';
        dosage: number; // oz/cwt
        retardation: number; // hours
      };
      accelerator: {
        type: 'calcium_chloride' | 'non_chloride';
        dosage: number; // oz/cwt
        acceleration: number; // percentage
      };
    };
  };
  
  // Mix Design
  mixDesign: {
    // Proportions
    proportions: {
      cement: number; // lb/yd³
      water: number; // lb/yd³
      fineAggregate: number; // lb/yd³
      coarseAggregate: number; // lb/yd³
      admixtures: {
        waterReducing: number; // oz/cwt
        airEntraining: number; // oz/cwt
        retarder: number; // oz/cwt
        accelerator: number; // oz/cwt
      };
    };
    
    // Properties
    properties: {
      waterCementRatio: number;
      slump: number; // inches
      airContent: number; // percentage
      unitWeight: number; // lb/ft³
      yield: number; // ft³/yd³
      temperature: number; // °F
      workability: 'low' | 'medium' | 'high';
    };
    
    // Quality Control
    qualityControl: {
      strengthTest: boolean;
      slumpTest: boolean;
      airContentTest: boolean;
      temperatureTest: boolean;
      unitWeightTest: boolean;
      samplingFrequency: string;
      testAge: number; // days
      acceptanceCriteria: string;
    };
  };
  
  // Structural Design
  structuralDesign: {
    // Load Analysis
    loadAnalysis: {
      deadLoad: number; // psf
      liveLoad: number; // psf
      windLoad: number; // psf
      seismicLoad: number; // psf
      snowLoad: number; // psf
      totalLoad: number; // psf
      loadFactor: number;
      factoredLoad: number; // psf
    };
    
    // Moment Analysis
    momentAnalysis: {
      positiveMoment: number; // ft-kips
      negativeMoment: number; // ft-kips
      shearForce: number; // kips
      axialForce: number; // kips
      torsion: number; // ft-kips
      deflection: number; // inches
      crackWidth: number; // inches
    };
    
    // Reinforcement Design
    reinforcementDesign: {
      tensionReinforcement: {
        area: number; // in²
        bars: number;
        size: number; // inches
        spacing: number; // inches
        location: string;
      };
      compressionReinforcement: {
        area: number; // in²
        bars: number;
        size: number; // inches
        spacing: number; // inches
        location: string;
      };
      shearReinforcement: {
        area: number; // in²
        bars: number;
        size: number; // inches
        spacing: number; // inches
        location: string;
      };
    };
  };
  
  // Construction Methods
  constructionMethods: {
    // Formwork
    formwork: {
      type: 'wood' | 'steel' | 'aluminum' | 'plastic' | 'fiberglass';
      material: string;
      thickness: number; // inches
      spacing: number; // inches
      bracing: string;
      strippingTime: number; // hours
      reuseCount: number;
      cost: number; // $/ft²
    };
    
    // Placement
    placement: {
      method: 'pump' | 'bucket' | 'chute' | 'tremie' | 'skip';
      equipment: string;
      temperature: number; // °F
      weather: string;
      timeLimit: number; // hours
      vibration: boolean;
      consolidation: string;
    };
    
    // Curing
    curing: {
      method: 'water' | 'membrane' | 'steam' | 'electrical' | 'chemical';
      duration: number; // days
      temperature: number; // °F
      humidity: number; // percentage
      protection: string;
      monitoring: boolean;
    };
  };
  
  // Cost Analysis
  costAnalysis: {
    // Material Costs
    materialCosts: {
      cement: number; // $/ton
      aggregate: number; // $/ton
      reinforcement: number; // $/lb
      admixtures: number; // $/oz
      formwork: number; // $/ft²
      totalMaterials: number; // $
    };
    
    // Labor Costs
    laborCosts: {
      formwork: number; // $/hr
      reinforcement: number; // $/hr
      placement: number; // $/hr
      finishing: number; // $/hr
      curing: number; // $/hr
      totalLabor: number; // $
    };
    
    // Equipment Costs
    equipmentCosts: {
      mixer: number; // $/hr
      pump: number; // $/hr
      vibrator: number; // $/hr
      crane: number; // $/hr
      totalEquipment: number; // $
    };
    
    // Total Costs
    totalCosts: {
      materials: number; // $
      labor: number; // $
      equipment: number; // $
      overhead: number; // $
      profit: number; // $
      total: number; // $
      unitCost: number; // $/yd³
    };
  };
  
  // Quality Assurance
  qualityAssurance: {
    // Testing Requirements
    testingRequirements: {
      compressiveStrength: {
        frequency: string;
        age: number; // days
        specimens: number;
        acceptance: string;
      };
      slump: {
        frequency: string;
        tolerance: number; // inches
        acceptance: string;
      };
      airContent: {
        frequency: string;
        tolerance: number; // percentage
        acceptance: string;
      };
      temperature: {
        frequency: string;
        range: {
          min: number; // °F
          max: number; // °F
        };
        acceptance: string;
      };
    };
    
    // Inspection
    inspection: {
      formwork: boolean;
      reinforcement: boolean;
      placement: boolean;
      finishing: boolean;
      curing: boolean;
      frequency: string;
      inspector: string;
      documentation: boolean;
    };
    
    // Documentation
    documentation: {
      mixDesign: boolean;
      testResults: boolean;
      inspectionReports: boolean;
      asBuilt: boolean;
      warranties: boolean;
      maintenance: boolean;
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeMixDesign: boolean;
    includeStructuralDesign: boolean;
    includeCostAnalysis: boolean;
    includeQualityControl: boolean;
    includeOptimization: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface ConcreteCalculatorResults {
  // Project Analysis
  projectAnalysis: {
    basicInfo: {
      projectName: string;
      projectType: string;
      projectCategory: string;
      projectSize: string;
      location: string;
      climate: string;
      seismicZone: number;
      windZone: number;
      frostDepth: number;
      soilType: string;
      groundwaterLevel: number;
    };
    designInfo: {
      designCode: string;
      designStandard: string;
      safetyFactor: number;
      loadCombination: string;
      designLife: number;
      exposureClass: string;
      fireResistance: number;
      durabilityClass: string;
    };
    structuralInfo: {
      structureType: string;
      loadType: string;
      spanLength: number;
      clearHeight: number;
      thickness: number;
      width: number;
      depth: number;
      area: number;
      volume: number;
    };
    projectEfficiency: number;
  };
  
  // Material Properties Analysis
  materialPropertiesAnalysis: {
    concreteProperties: {
      strengthClass: string;
      compressiveStrength: number;
      tensileStrength: number;
      flexuralStrength: number;
      modulusOfElasticity: number;
      density: number;
      slump: number;
      airContent: number;
      waterCementRatio: number;
      cementContent: number;
      aggregateSize: number;
      aggregateType: string;
    };
    reinforcementProperties: {
      steelGrade: string;
      yieldStrength: number;
      ultimateStrength: number;
      modulusOfElasticity: number;
      barSize: number;
      barSpacing: number;
      cover: number;
      developmentLength: number;
      lapLength: number;
      stirrupSpacing: number;
      tieSpacing: number;
    };
    aggregateProperties: {
      fineAggregate: {
        type: string;
        specificGravity: number;
        absorption: number;
        moistureContent: number;
        finenessModulus: number;
        gradation: string;
      };
      coarseAggregate: {
        type: string;
        specificGravity: number;
        absorption: number;
        moistureContent: number;
        maximumSize: number;
        gradation: string;
      };
    };
    admixtureProperties: {
      waterReducing: {
        type: string;
        dosage: number;
        waterReduction: number;
      };
      airEntraining: {
        type: string;
        dosage: number;
        airContent: number;
      };
      retarder: {
        type: string;
        dosage: number;
        retardation: number;
      };
      accelerator: {
        type: string;
        dosage: number;
        acceleration: number;
      };
    };
    materialsEfficiency: number;
  };
  
  // Mix Design Analysis
  mixDesignAnalysis: {
    proportions: {
      cement: number;
      water: number;
      fineAggregate: number;
      coarseAggregate: number;
      admixtures: {
        waterReducing: number;
        airEntraining: number;
        retarder: number;
        accelerator: number;
      };
    };
    properties: {
      waterCementRatio: number;
      slump: number;
      airContent: number;
      unitWeight: number;
      yield: number;
      temperature: number;
      workability: string;
    };
    qualityControl: {
      strengthTest: boolean;
      slumpTest: boolean;
      airContentTest: boolean;
      temperatureTest: boolean;
      unitWeightTest: boolean;
      samplingFrequency: string;
      testAge: number;
      acceptanceCriteria: string;
    };
    mixDesignEfficiency: number;
  };
  
  // Structural Design Analysis
  structuralDesignAnalysis: {
    loadAnalysis: {
      deadLoad: number;
      liveLoad: number;
      windLoad: number;
      seismicLoad: number;
      snowLoad: number;
      totalLoad: number;
      loadFactor: number;
      factoredLoad: number;
    };
    momentAnalysis: {
      positiveMoment: number;
      negativeMoment: number;
      shearForce: number;
      axialForce: number;
      torsion: number;
      deflection: number;
      crackWidth: number;
    };
    reinforcementDesign: {
      tensionReinforcement: {
        area: number;
        bars: number;
        size: number;
        spacing: number;
        location: string;
      };
      compressionReinforcement: {
        area: number;
        bars: number;
        size: number;
        spacing: number;
        location: string;
      };
      shearReinforcement: {
        area: number;
        bars: number;
        size: number;
        spacing: number;
        location: string;
      };
    };
    structuralEfficiency: number;
  };
  
  // Construction Methods Analysis
  constructionMethodsAnalysis: {
    formwork: {
      type: string;
      material: string;
      thickness: number;
      spacing: number;
      bracing: string;
      strippingTime: number;
      reuseCount: number;
      cost: number;
    };
    placement: {
      method: string;
      equipment: string;
      temperature: number;
      weather: string;
      timeLimit: number;
      vibration: boolean;
      consolidation: string;
    };
    curing: {
      method: string;
      duration: number;
      temperature: number;
      humidity: number;
      protection: string;
      monitoring: boolean;
    };
    constructionEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    materialCosts: {
      cement: number;
      aggregate: number;
      reinforcement: number;
      admixtures: number;
      formwork: number;
      totalMaterials: number;
    };
    laborCosts: {
      formwork: number;
      reinforcement: number;
      placement: number;
      finishing: number;
      curing: number;
      totalLabor: number;
    };
    equipmentCosts: {
      mixer: number;
      pump: number;
      vibrator: number;
      crane: number;
      totalEquipment: number;
    };
    totalCosts: {
      materials: number;
      labor: number;
      equipment: number;
      overhead: number;
      profit: number;
      total: number;
      unitCost: number;
    };
    costEfficiency: number;
  };
  
  // Quality Assurance Analysis
  qualityAssuranceAnalysis: {
    testingRequirements: {
      compressiveStrength: {
        frequency: string;
        age: number;
        specimens: number;
        acceptance: string;
      };
      slump: {
        frequency: string;
        tolerance: number;
        acceptance: string;
      };
      airContent: {
        frequency: string;
        tolerance: number;
        acceptance: string;
      };
      temperature: {
        frequency: string;
        range: {
          min: number;
          max: number;
        };
        acceptance: string;
      };
    };
    inspection: {
      formwork: boolean;
      reinforcement: boolean;
      placement: boolean;
      finishing: boolean;
      curing: boolean;
      frequency: string;
      inspector: string;
      documentation: boolean;
    };
    documentation: {
      mixDesign: boolean;
      testResults: boolean;
      inspectionReports: boolean;
      asBuilt: boolean;
      warranties: boolean;
      maintenance: boolean;
    };
    qualityEfficiency: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    strengthPerformance: {
      compressiveStrength: number;
      tensileStrength: number;
      flexuralStrength: number;
      shearStrength: number;
      bondStrength: number;
    };
    durabilityPerformance: {
      freezeThaw: 'excellent' | 'good' | 'fair' | 'poor';
      sulfateResistance: 'excellent' | 'good' | 'fair' | 'poor';
      chlorideResistance: 'excellent' | 'good' | 'fair' | 'poor';
      alkaliSilicaReaction: 'excellent' | 'good' | 'fair' | 'poor';
      carbonation: 'excellent' | 'good' | 'fair' | 'poor';
    };
    workabilityPerformance: {
      slump: number;
      flow: number;
      compactability: 'excellent' | 'good' | 'fair' | 'poor';
      pumpability: 'excellent' | 'good' | 'fair' | 'poor';
      finishability: 'excellent' | 'good' | 'fair' | 'poor';
    };
    performanceEfficiency: number;
  };
  
  // Optimization Analysis
  optimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialSavings: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    materialOptimization: {
      cementOptimization: {
        currentContent: number;
        optimalContent: number;
        savings: number;
        impact: string;
      };
      aggregateOptimization: {
        currentGradation: string;
        optimalGradation: string;
        savings: number;
        impact: string;
      };
      admixtureOptimization: {
        currentDosage: number;
        optimalDosage: number;
        savings: number;
        impact: string;
      };
    };
    constructionOptimization: {
      formworkOptimization: {
        currentMethod: string;
        optimalMethod: string;
        savings: number;
        impact: string;
      };
      placementOptimization: {
        currentMethod: string;
        optimalMethod: string;
        savings: number;
        impact: string;
      };
      curingOptimization: {
        currentMethod: string;
        optimalMethod: string;
        savings: number;
        impact: string;
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
    lowCost: number;
    highCost: number;
    sensitivity: number;
  }[];
  
  // Concrete Score
  concreteScore: {
    overallScore: number;
    componentScores: {
      project: number;
      materials: number;
      mixDesign: number;
      structural: number;
      construction: number;
      cost: number;
      quality: number;
      performance: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProjects: {
      date: string;
      projectType: string;
      volume: number;
      cost: number;
      performance: number;
      issues: string[];
    }[];
    performanceTrends: string[];
    improvementAreas: string[];
  };
  
  // Business Impact
  businessImpact: {
    costSavings: number;
    timeSavings: number;
    qualityImprovement: number;
    performanceEnhancement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    projectAssessment: string;
    designAssessment: string;
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
    projectType: string;
    volume: number;
    totalCost: number;
    unitCost: number;
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
