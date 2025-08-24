export interface BondYieldInputs {
  // Bond Information
  bondInfo: {
    bondName: string;
    bondType: 'government' | 'corporate' | 'municipal' | 'agency' | 'supranational' | 'covered' | 'asset_backed' | 'mortgage_backed' | 'convertible' | 'zero_coupon' | 'floating_rate' | 'inflation_linked' | 'other';
    issuer: string;
    issueDate: string;
    maturityDate: string;
    faceValue: number;
    couponRate: number;
    couponFrequency: 'annual' | 'semi_annual' | 'quarterly' | 'monthly' | 'zero';
    dayCountConvention: '30/360' | 'actual/360' | 'actual/365' | 'actual/actual' | '30/365';
    currency: string;
    bondDescription: string;
  };
  
  // Bond Characteristics
  bondCharacteristics: {
    // Basic Characteristics
    basicCharacteristics: {
      parValue: number;
      marketPrice: number;
      cleanPrice: number;
      dirtyPrice: number;
      accruedInterest: number;
      timeToMaturity: number; // in years
      remainingCoupons: number;
    };
    
    // Coupon Information
    couponInformation: {
      couponRate: number;
      couponAmount: number;
      couponPayment: number;
      nextCouponDate: string;
      lastCouponDate: string;
      couponSchedule: {
        date: string;
        payment: number;
        daysSinceLast: number;
      }[];
    };
    
    // Call/Put Features
    callPutFeatures: {
      callable: boolean;
      callDate: string;
      callPrice: number;
      callSchedule: {
        date: string;
        price: number;
      }[];
      putable: boolean;
      putDate: string;
      putPrice: number;
      putSchedule: {
        date: string;
        price: number;
      }[];
    };
    
    // Embedded Options
    embeddedOptions: {
      convertible: boolean;
      conversionRatio: number;
      conversionPrice: number;
      warrant: boolean;
      warrantRatio: number;
      warrantPrice: number;
    };
  };
  
  // Market Data
  marketData: {
    // Current Market Information
    currentMarketInfo: {
      currentPrice: number;
      currentYield: number;
      bidPrice: number;
      askPrice: number;
      bidYield: number;
      askYield: number;
      spread: number;
      volume: number;
      lastTradeDate: string;
    };
    
    // Yield Curve
    yieldCurve: {
      maturity: number;
      yield: number;
      spread: number;
      benchmark: string;
    }[];
    
    // Credit Information
    creditInfo: {
      creditRating: string;
      creditSpread: number;
      defaultProbability: number;
      recoveryRate: number;
      ratingAgency: string;
      ratingDate: string;
    };
    
    // Market Conditions
    marketConditions: {
      interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
      creditEnvironment: 'tight' | 'normal' | 'loose';
      liquidityEnvironment: 'high' | 'medium' | 'low';
      volatilityEnvironment: 'low' | 'medium' | 'high';
    };
  };
  
  // Yield Calculation Parameters
  yieldCalculationParameters: {
    // Yield Types
    yieldTypes: {
      calculateCurrentYield: boolean;
      calculateYieldToMaturity: boolean;
      calculateYieldToCall: boolean;
      calculateYieldToPut: boolean;
      calculateYieldToWorst: boolean;
      calculateRealizedYield: boolean;
      calculateNominalYield: boolean;
    };
    
    // Calculation Method
    calculationMethod: 'newton_raphson' | 'bisection' | 'secant' | 'closed_form' | 'approximation';
    
    // Precision Settings
    precisionSettings: {
      tolerance: number;
      maxIterations: number;
      convergenceCriteria: 'price' | 'yield' | 'both';
    };
    
    // Assumptions
    assumptions: {
      reinvestmentRate: number;
      defaultProbability: number;
      recoveryRate: number;
      taxRate: number;
      inflationRate: number;
    };
  };
  
  // Risk Parameters
  riskParameters: {
    // Interest Rate Risk
    interestRateRisk: {
      duration: number;
      modifiedDuration: number;
      effectiveDuration: number;
      convexity: number;
      keyRateDuration: {
        maturity: number;
        duration: number;
      }[];
    };
    
    // Credit Risk
    creditRisk: {
      creditSpread: number;
      defaultProbability: number;
      recoveryRate: number;
      creditDuration: number;
      creditConvexity: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      bidAskSpread: number;
      tradingVolume: number;
      marketDepth: number;
      liquidityScore: number;
    };
    
    // Reinvestment Risk
    reinvestmentRisk: {
      reinvestmentRate: number;
      reinvestmentHorizon: number;
      cashFlowTiming: {
        date: string;
        amount: number;
        reinvestmentRate: number;
      }[];
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Information
    taxInfo: {
      taxStatus: 'taxable' | 'tax_exempt' | 'tax_deferred';
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      alternativeMinimumTax: boolean;
    };
    
    // Tax Calculations
    taxCalculations: {
      afterTaxYield: number;
      taxEquivalentYield: number;
      taxShield: number;
      effectiveTaxRate: number;
    };
    
    // Tax Loss Harvesting
    taxLossHarvesting: {
      available: boolean;
      washSalePeriod: number;
      taxLossAmount: number;
      replacementBond: string;
    };
  };
  
  // Inflation Considerations
  inflationConsiderations: {
    // Inflation Information
    inflationInfo: {
      inflationLinked: boolean;
      inflationIndex: string;
      baseInflationRate: number;
      currentInflationRate: number;
      expectedInflationRate: number;
    };
    
    // Real Yield Calculations
    realYieldCalculations: {
      realYield: number;
      breakevenInflation: number;
      inflationCompensation: number;
      realReturn: number;
    };
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    // Benchmark Comparison
    benchmarkComparison: {
      benchmark: string;
      benchmarkYield: number;
      yieldSpread: number;
      relativeValue: number;
      benchmarkDuration: number;
      durationSpread: number;
    }[];
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      peerYield: number;
      yieldDifference: number;
      peerRating: string;
      peerDuration: number;
      relativeValue: number;
    }[];
    
    // Sector Comparison
    sectorComparison: {
      sector: string;
      sectorYield: number;
      sectorSpread: number;
      sectorDuration: number;
      sectorConvexity: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenarioName: string;
      probability: number;
      rateChange: number;
      newYield: number;
      priceChange: number;
      return: number;
    }[];
    
    // Credit Scenarios
    creditScenarios: {
      scenarioName: string;
      probability: number;
      spreadChange: number;
      newYield: number;
      priceChange: number;
      return: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      marketCondition: string;
      newYield: number;
      priceChange: number;
      return: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRateVolatility: boolean;
  includeSpreadVolatility: boolean;
  includeDefaultRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeInflation: boolean;
  includeTransactionCosts: boolean;
  includeReinvestmentRisk: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeDurationAnalysis: boolean;
    includeConvexityAnalysis: boolean;
    includeSensitivityAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    price: number;
    yield: number;
    duration: number;
    convexity: number;
    creditSpread: number;
    marketReturn: number;
  }[];
  
  // Reporting Preferences
  includeYieldAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeInflationAnalysis: boolean;
  includeComparativeAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface BondYieldResults {
  // Core Yield Metrics
  currentYield: number;
  yieldToMaturity: number;
  yieldToCall: number;
  yieldToPut: number;
  yieldToWorst: number;
  realizedYield: number;
  nominalYield: number;
  
  // Yield Analysis
  yieldAnalysis: {
    currentYield: number;
    yieldToMaturity: number;
    yieldToCall: number;
    yieldToPut: number;
    yieldToWorst: number;
    yieldBreakdown: {
      yieldType: string;
      yield: number;
      components: {
        component: string;
        value: number;
        contribution: number;
      }[];
    }[];
    yieldEfficiency: number;
  };
  
  // Price Analysis
  priceAnalysis: {
    cleanPrice: number;
    dirtyPrice: number;
    accruedInterest: number;
    priceComponents: {
      component: string;
      value: number;
      percentage: number;
    }[];
    priceEfficiency: number;
  };
  
  // Duration Analysis
  durationAnalysis: {
    macaulayDuration: number;
    modifiedDuration: number;
    effectiveDuration: number;
    keyRateDuration: {
      maturity: number;
      duration: number;
      contribution: number;
    }[];
    durationBreakdown: {
      component: string;
      duration: number;
      contribution: number;
    }[];
    durationEfficiency: number;
  };
  
  // Convexity Analysis
  convexityAnalysis: {
    convexity: number;
    effectiveConvexity: number;
    convexityBreakdown: {
      component: string;
      convexity: number;
      contribution: number;
    }[];
    convexityEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    interestRateRisk: {
      duration: number;
      convexity: number;
      priceSensitivity: number;
      riskContribution: number;
    };
    creditRisk: {
      creditSpread: number;
      defaultProbability: number;
      recoveryRate: number;
      creditDuration: number;
      riskContribution: number;
    };
    liquidityRisk: {
      bidAskSpread: number;
      tradingVolume: number;
      marketDepth: number;
      liquidityScore: number;
      riskContribution: number;
    };
    reinvestmentRisk: {
      reinvestmentRate: number;
      cashFlowTiming: {
        date: string;
        amount: number;
        reinvestmentRate: number;
        risk: number;
      }[];
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    afterTaxYield: number;
    taxEquivalentYield: number;
    taxShield: number;
    effectiveTaxRate: number;
    taxBreakdown: {
      component: string;
      amount: number;
      rate: number;
      impact: number;
    }[];
    taxEfficiency: number;
  };
  
  // Inflation Analysis
  inflationAnalysis: {
    realYield: number;
    breakevenInflation: number;
    inflationCompensation: number;
    realReturn: number;
    inflationBreakdown: {
      component: string;
      value: number;
      impact: number;
    }[];
    inflationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowYield: number;
    highYield: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    yield: number;
    price: number;
    return: number;
    riskLevel: string;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    benchmarkComparison: {
      benchmark: string;
      benchmarkYield: number;
      yieldSpread: number;
      relativeValue: number;
      outperformance: number;
    }[];
    peerComparison: {
      peer: string;
      peerYield: number;
      yieldDifference: number;
      relativeValue: number;
      outperformance: number;
    }[];
    sectorComparison: {
      sector: string;
      sectorYield: number;
      sectorSpread: number;
      relativeValue: number;
      outperformance: number;
    }[];
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanYield: number;
    medianYield: number;
    standardDeviation: number;
    percentiles: {
      p5: number;
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
      p95: number;
    };
    probabilityDistribution: {
      yield: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalYield: number;
    historicalPrice: number;
    historicalReturn: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Bond Score
  bondScore: {
    overallScore: number;
    componentScores: {
      yield: number;
      risk: number;
      liquidity: number;
      credit: number;
      tax: number;
    };
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
  };
  
  // Optimization Opportunities
  optimizationOpportunities: {
    category: string;
    description: string;
    potentialImprovement: number;
    implementationDifficulty: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high';
  }[];
  
  // Business Impact
  businessImpact: {
    yieldImprovement: number;
    riskReduction: number;
    costSavings: number;
    valueCreation: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    bondAssessment: string;
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
    yieldToMaturity: number;
    duration: number;
    convexity: number;
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedImpact: number;
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
