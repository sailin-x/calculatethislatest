export interface AutomotiveCalculatorInputs {
  // Vehicle Information
  vehicleInfo: {
    // Basic Vehicle Details
    basicInfo: {
      make: string;
      model: string;
      year: number;
      trim: string;
      bodyStyle: 'sedan' | 'suv' | 'truck' | 'coupe' | 'convertible' | 'hatchback' | 'wagon' | 'van' | 'pickup';
      transmission: 'automatic' | 'manual' | 'cvt' | 'semi_automatic';
      fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'plug_in_hybrid' | 'hydrogen';
      engineSize: number;
      cylinders: number;
      drivetrain: 'fwd' | 'rwd' | 'awd' | '4wd';
      mileage: number;
      condition: 'excellent' | 'good' | 'fair' | 'poor';
    };
    
    // Performance Specifications
    performanceSpecs: {
      horsepower: number;
      torque: number;
      zeroToSixty: number;
      topSpeed: number;
      fuelEconomy: {
        city: number;
        highway: number;
        combined: number;
      };
      range: number; // For electric vehicles
      batteryCapacity: number; // For electric vehicles
      chargingTime: number; // For electric vehicles
    };
    
    // Dimensions and Capacity
    dimensions: {
      length: number;
      width: number;
      height: number;
      wheelbase: number;
      groundClearance: number;
      cargoCapacity: number;
      seatingCapacity: number;
      towingCapacity: number;
      payloadCapacity: number;
    };
    
    // Safety Features
    safetyFeatures: {
      airbags: number;
      antilockBrakes: boolean;
      tractionControl: boolean;
      stabilityControl: boolean;
      backupCamera: boolean;
      blindSpotMonitoring: boolean;
      laneDepartureWarning: boolean;
      forwardCollisionWarning: boolean;
      automaticEmergencyBraking: boolean;
      adaptiveCruiseControl: boolean;
      parkingSensors: boolean;
      rearCrossTrafficAlert: boolean;
      safetyRating: {
        overall: number;
        frontalCrash: number;
        sideCrash: number;
        rollover: number;
      };
    };
    
    // Technology Features
    technologyFeatures: {
      infotainmentSystem: string;
      navigation: boolean;
      bluetooth: boolean;
      appleCarPlay: boolean;
      androidAuto: boolean;
      wirelessCharging: boolean;
      usbPorts: number;
      wifiHotspot: boolean;
      remoteStart: boolean;
      keylessEntry: boolean;
      pushButtonStart: boolean;
      heatedSeats: boolean;
      ventilatedSeats: boolean;
      heatedSteeringWheel: boolean;
      panoramicSunroof: boolean;
      premiumAudio: boolean;
    };
  };
  
  // Financial Information
  financialInfo: {
    // Purchase Information
    purchaseInfo: {
      purchasePrice: number;
      downPayment: number;
      tradeInValue: number;
      salesTax: number;
      registrationFee: number;
      documentationFee: number;
      titleFee: number;
      otherFees: number;
      totalPurchaseCost: number;
    };
    
    // Financing Information
    financingInfo: {
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      monthlyPayment: number;
      totalInterest: number;
      totalLoanCost: number;
      apr: number;
      prepaymentPenalty: boolean;
      earlyPayoffFee: number;
    };
    
    // Insurance Information
    insuranceInfo: {
      annualPremium: number;
      monthlyPremium: number;
      deductible: number;
      coverageType: 'liability' | 'comprehensive' | 'collision' | 'full_coverage';
      insuranceCompany: string;
      policyNumber: string;
      effectiveDate: string;
      expirationDate: string;
      discounts: {
        safeDriver: boolean;
        multiPolicy: boolean;
        goodStudent: boolean;
        antiTheft: boolean;
        lowMileage: boolean;
      };
    };
    
    // Operating Costs
    operatingCosts: {
      fuelCost: {
        annualFuelCost: number;
        monthlyFuelCost: number;
        costPerMile: number;
        fuelPrice: number;
        fuelEfficiency: number;
      };
      maintenanceCost: {
        annualMaintenance: number;
        monthlyMaintenance: number;
        oilChanges: number;
        tireReplacement: number;
        brakeService: number;
        otherServices: number;
      };
      depreciation: {
        annualDepreciation: number;
        depreciationRate: number;
        estimatedValue: number;
        resaleValue: number;
      };
    };
  };
  
  // Usage Information
  usageInfo: {
    // Driving Patterns
    drivingPatterns: {
      annualMileage: number;
      dailyCommute: number;
      weekendDriving: number;
      longDistanceTrips: number;
      cityDriving: number;
      highwayDriving: number;
      drivingStyle: 'conservative' | 'moderate' | 'aggressive';
      trafficConditions: 'light' | 'moderate' | 'heavy';
      parkingType: 'garage' | 'driveway' | 'street' | 'parking_lot';
    };
    
    // Environmental Impact
    environmentalImpact: {
      co2Emissions: number;
      fuelConsumption: number;
      carbonFootprint: number;
      environmentalRating: number;
      greenVehicle: boolean;
      hybridEfficiency: number;
      electricRange: number;
    };
    
    // Maintenance Schedule
    maintenanceSchedule: {
      oilChangeInterval: number;
      tireRotationInterval: number;
      brakeInspectionInterval: number;
      transmissionServiceInterval: number;
      coolantChangeInterval: number;
      sparkPlugReplacementInterval: number;
      airFilterReplacementInterval: number;
      lastServiceDate: string;
      nextServiceDate: string;
    };
  };
  
  // Comparison Information
  comparisonInfo: {
    // Alternative Vehicles
    alternativeVehicles: {
      vehicle: {
        make: string;
        model: string;
        year: number;
        price: number;
        fuelEconomy: number;
        features: string[];
      };
      comparison: {
        priceDifference: number;
        fuelCostDifference: number;
        featureComparison: string[];
        pros: string[];
        cons: string[];
      };
    }[];
    
    // Market Analysis
    marketAnalysis: {
      averagePrice: number;
      priceRange: {
        min: number;
        max: number;
      };
      marketTrend: 'increasing' | 'decreasing' | 'stable';
      demandLevel: 'high' | 'medium' | 'low';
      supplyLevel: 'high' | 'medium' | 'low';
      resaleValue: number;
      depreciationRate: number;
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeFinancing: boolean;
    includeInsurance: boolean;
    includeMaintenance: boolean;
    includeDepreciation: boolean;
    includeEnvironmentalImpact: boolean;
    includeComparison: boolean;
    includeMarketAnalysis: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface AutomotiveCalculatorResults {
  // Vehicle Analysis
  vehicleAnalysis: {
    basicInfo: {
      make: string;
      model: string;
      year: number;
      trim: string;
      bodyStyle: string;
      transmission: string;
      fuelType: string;
      engineSize: number;
      cylinders: number;
      drivetrain: string;
      mileage: number;
      condition: string;
    };
    performanceSpecs: {
      horsepower: number;
      torque: number;
      zeroToSixty: number;
      topSpeed: number;
      fuelEconomy: {
        city: number;
        highway: number;
        combined: number;
      };
      range: number;
      batteryCapacity: number;
      chargingTime: number;
    };
    dimensions: {
      length: number;
      width: number;
      height: number;
      wheelbase: number;
      groundClearance: number;
      cargoCapacity: number;
      seatingCapacity: number;
      towingCapacity: number;
      payloadCapacity: number;
    };
    safetyFeatures: {
      airbags: number;
      antilockBrakes: boolean;
      tractionControl: boolean;
      stabilityControl: boolean;
      backupCamera: boolean;
      blindSpotMonitoring: boolean;
      laneDepartureWarning: boolean;
      forwardCollisionWarning: boolean;
      automaticEmergencyBraking: boolean;
      adaptiveCruiseControl: boolean;
      parkingSensors: boolean;
      rearCrossTrafficAlert: boolean;
      safetyRating: {
        overall: number;
        frontalCrash: number;
        sideCrash: number;
        rollover: number;
      };
    };
    technologyFeatures: {
      infotainmentSystem: string;
      navigation: boolean;
      bluetooth: boolean;
      appleCarPlay: boolean;
      androidAuto: boolean;
      wirelessCharging: boolean;
      usbPorts: number;
      wifiHotspot: boolean;
      remoteStart: boolean;
      keylessEntry: boolean;
      pushButtonStart: boolean;
      heatedSeats: boolean;
      ventilatedSeats: boolean;
      heatedSteeringWheel: boolean;
      panoramicSunroof: boolean;
      premiumAudio: boolean;
    };
    vehicleEfficiency: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    purchaseInfo: {
      purchasePrice: number;
      downPayment: number;
      tradeInValue: number;
      salesTax: number;
      registrationFee: number;
      documentationFee: number;
      titleFee: number;
      otherFees: number;
      totalPurchaseCost: number;
    };
    financingInfo: {
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      monthlyPayment: number;
      totalInterest: number;
      totalLoanCost: number;
      apr: number;
      prepaymentPenalty: boolean;
      earlyPayoffFee: number;
    };
    insuranceInfo: {
      annualPremium: number;
      monthlyPremium: number;
      deductible: number;
      coverageType: string;
      insuranceCompany: string;
      policyNumber: string;
      effectiveDate: string;
      expirationDate: string;
      discounts: {
        safeDriver: boolean;
        multiPolicy: boolean;
        goodStudent: boolean;
        antiTheft: boolean;
        lowMileage: boolean;
      };
    };
    operatingCosts: {
      fuelCost: {
        annualFuelCost: number;
        monthlyFuelCost: number;
        costPerMile: number;
        fuelPrice: number;
        fuelEfficiency: number;
      };
      maintenanceCost: {
        annualMaintenance: number;
        monthlyMaintenance: number;
        oilChanges: number;
        tireReplacement: number;
        brakeService: number;
        otherServices: number;
      };
      depreciation: {
        annualDepreciation: number;
        depreciationRate: number;
        estimatedValue: number;
        resaleValue: number;
      };
    };
    totalCostOfOwnership: {
      annualCost: number;
      monthlyCost: number;
      costPerMile: number;
      fiveYearCost: number;
      tenYearCost: number;
      breakdown: {
        purchase: number;
        financing: number;
        insurance: number;
        fuel: number;
        maintenance: number;
        depreciation: number;
      };
    };
    financialEfficiency: number;
  };
  
  // Usage Analysis
  usageAnalysis: {
    drivingPatterns: {
      annualMileage: number;
      dailyCommute: number;
      weekendDriving: number;
      longDistanceTrips: number;
      cityDriving: number;
      highwayDriving: number;
      drivingStyle: string;
      trafficConditions: string;
      parkingType: string;
    };
    environmentalImpact: {
      co2Emissions: number;
      fuelConsumption: number;
      carbonFootprint: number;
      environmentalRating: number;
      greenVehicle: boolean;
      hybridEfficiency: number;
      electricRange: number;
    };
    maintenanceSchedule: {
      oilChangeInterval: number;
      tireRotationInterval: number;
      brakeInspectionInterval: number;
      transmissionServiceInterval: number;
      coolantChangeInterval: number;
      sparkPlugReplacementInterval: number;
      airFilterReplacementInterval: number;
      lastServiceDate: string;
      nextServiceDate: string;
    };
    usageEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeVehicles: {
      vehicle: {
        make: string;
        model: string;
        year: number;
        price: number;
        fuelEconomy: number;
        features: string[];
      };
      comparison: {
        priceDifference: number;
        fuelCostDifference: number;
        featureComparison: string[];
        pros: string[];
        cons: string[];
      };
    }[];
    marketAnalysis: {
      averagePrice: number;
      priceRange: {
        min: number;
        max: number;
      };
      marketTrend: string;
      demandLevel: string;
      supplyLevel: string;
      resaleValue: number;
      depreciationRate: number;
    };
    comparisonEfficiency: number;
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
    financingOptimization: {
      optimalLoanTerm: number;
      optimalDownPayment: number;
      refinancingOpportunity: boolean;
      refinancingSavings: number;
    };
    insuranceOptimization: {
      optimalDeductible: number;
      coverageOptimization: string[];
      discountOpportunities: string[];
      potentialSavings: number;
    };
    maintenanceOptimization: {
      preventiveMaintenanceSchedule: string[];
      costSavingTips: string[];
      doItYourselfOpportunities: string[];
      professionalServiceNeeds: string[];
    };
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowTotalCost: number;
    highTotalCost: number;
    sensitivity: number;
  }[];
  
  // Automotive Score
  automotiveScore: {
    overallScore: number;
    componentScores: {
      vehicle: number;
      financial: number;
      usage: number;
      comparison: number;
      optimization: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalCosts: {
      year: number;
      totalCost: number;
      breakdown: {
        purchase: number;
        financing: number;
        insurance: number;
        fuel: number;
        maintenance: number;
        depreciation: number;
      };
    }[];
    costTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    costSavings: number;
    efficiencyImprovement: number;
    environmentalBenefit: number;
    safetyImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    vehicleAssessment: string;
    financialAssessment: string;
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
    totalCostOfOwnership: number;
    monthlyCost: number;
    costPerMile: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedSavings: number;
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
