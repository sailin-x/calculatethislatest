export interface BusinessValuationCalculatorInputs {
  // Business Information
  businessInfo: {
    // Basic Information
    basicInfo: {
      businessName: string;
      businessType: 'sole_proprietorship' | 'partnership' | 'corporation' | 's_corporation' | 'llc' | 'other';
      industry: string;
      sicCode: string;
      naicsCode: string;
      businessDescription: string;
      yearEstablished: number;
      yearsInOperation: number;
      legalStructure: string;
      taxIdentificationNumber: string;
      stateOfIncorporation: string;
      primaryLocation: string;
      secondaryLocations: string[];
      businessModel: string;
      competitiveAdvantage: string[];
      growthStrategy: string;
    };
    
    // Ownership Information
    ownershipInfo: {
      owners: {
        name: string;
        ownershipPercentage: number;
        role: string;
        startDate: string;
        investmentAmount: number;
        votingRights: number;
        buySellAgreement: boolean;
        keyPersonInsurance: number;
      }[];
      totalOwnership: number;
      minorityDiscount: number;
      controlPremium: number;
      marketabilityDiscount: number;
    };
    
    // Management Information
    managementInfo: {
      executives: {
        name: string;
        title: string;
        startDate: string;
        compensation: number;
        experience: number;
        education: string;
        keyPerson: boolean;
        successionPlan: boolean;
      }[];
      employees: {
        category: string;
        count: number;
        averageSalary: number;
        totalCompensation: number;
        turnoverRate: number;
      }[];
      organizationalStructure: string;
      managementDepth: number;
      successionPlanning: boolean;
    };
    
    // Market Information
    marketInfo: {
      marketSize: number;
      marketGrowth: number;
      marketShare: number;
      competitors: {
        name: string;
        marketShare: number;
        competitivePosition: string;
        strengths: string[];
        weaknesses: string[];
      }[];
      customerBase: {
        totalCustomers: number;
        repeatCustomers: number;
        customerRetention: number;
        averageCustomerValue: number;
        customerConcentration: number;
      };
      geographicReach: string[];
      distributionChannels: string[];
      regulatoryEnvironment: string;
      barriersToEntry: string[];
    };
  };
  
  // Financial Information
  financialInfo: {
    // Historical Financial Data
    historicalFinancials: {
      year: number;
      revenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: {
        salaries: number;
        rent: number;
        utilities: number;
        insurance: number;
        marketing: number;
        legal: number;
        accounting: number;
        depreciation: number;
        amortization: number;
        otherExpenses: number;
        totalOperatingExpenses: number;
      };
      operatingIncome: number;
      interestExpense: number;
      taxes: number;
      netIncome: number;
      ebitda: number;
      ebit: number;
      freeCashFlow: number;
      workingCapital: number;
      totalAssets: number;
      totalLiabilities: number;
      totalEquity: number;
      debtToEquity: number;
      currentRatio: number;
      quickRatio: number;
      returnOnEquity: number;
      returnOnAssets: number;
      profitMargin: number;
      grossMargin: number;
      operatingMargin: number;
    }[];
    
    // Projected Financial Data
    projectedFinancials: {
      year: number;
      revenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: number;
      operatingIncome: number;
      interestExpense: number;
      taxes: number;
      netIncome: number;
      ebitda: number;
      ebit: number;
      freeCashFlow: number;
      workingCapital: number;
      capitalExpenditures: number;
      depreciation: number;
      amortization: number;
    }[];
    
    // Normalization Adjustments
    normalizationAdjustments: {
      ownerCompensation: {
        currentCompensation: number;
        marketCompensation: number;
        adjustment: number;
        reason: string;
      };
      nonRecurringItems: {
        item: string;
        amount: number;
        type: 'income' | 'expense';
        reason: string;
        frequency: string;
      }[];
      relatedPartyTransactions: {
        transaction: string;
        amount: number;
        type: 'income' | 'expense';
        marketRate: number;
        adjustment: number;
        reason: string;
      }[];
      extraordinaryItems: {
        item: string;
        amount: number;
        type: 'income' | 'expense';
        reason: string;
        probability: number;
      }[];
      totalAdjustments: number;
      normalizedEbitda: number;
      normalizedEbit: number;
      normalizedNetIncome: number;
    };
    
    // Working Capital Analysis
    workingCapitalAnalysis: {
      currentAssets: {
        cash: number;
        accountsReceivable: number;
        inventory: number;
        prepaidExpenses: number;
        otherCurrentAssets: number;
        totalCurrentAssets: number;
      };
      currentLiabilities: {
        accountsPayable: number;
        accruedExpenses: number;
        shortTermDebt: number;
        otherCurrentLiabilities: number;
        totalCurrentLiabilities: number;
      };
      workingCapital: number;
      workingCapitalRatio: number;
      daysSalesOutstanding: number;
      daysInventoryOutstanding: number;
      daysPayablesOutstanding: number;
      cashConversionCycle: number;
    };
    
    // Capital Structure
    capitalStructure: {
      debt: {
        shortTermDebt: number;
        longTermDebt: number;
        totalDebt: number;
        interestRate: number;
        maturityDate: string;
        collateral: string;
      };
      equity: {
        commonStock: number;
        preferredStock: number;
        retainedEarnings: number;
        totalEquity: number;
      };
      debtToEquity: number;
      debtToEbitda: number;
      interestCoverage: number;
      weightedAverageCostOfCapital: number;
    };
  };
  
  // Asset Information
  assetInfo: {
    // Tangible Assets
    tangibleAssets: {
      realEstate: {
        property: string;
        type: string;
        location: string;
        squareFootage: number;
        bookValue: number;
        fairMarketValue: number;
        mortgage: number;
        equity: number;
        annualRent: number;
        annualExpenses: number;
        netOperatingIncome: number;
      }[];
      equipment: {
        equipment: string;
        type: string;
        purchaseDate: string;
        originalCost: number;
        bookValue: number;
        fairMarketValue: number;
        usefulLife: number;
        condition: 'excellent' | 'good' | 'fair' | 'poor';
        replacementCost: number;
      }[];
      vehicles: {
        vehicle: string;
        type: string;
        year: number;
        make: string;
        model: string;
        bookValue: number;
        fairMarketValue: number;
        condition: string;
      }[];
      inventory: {
        category: string;
        bookValue: number;
        fairMarketValue: number;
        turnoverRate: number;
        obsolescence: number;
        netRealizableValue: number;
      };
      totalTangibleAssets: number;
    };
    
    // Intangible Assets
    intangibleAssets: {
      intellectualProperty: {
        type: 'patent' | 'trademark' | 'copyright' | 'trade_secret' | 'other';
        description: string;
        registrationNumber: string;
        registrationDate: string;
        expirationDate: string;
        bookValue: number;
        fairMarketValue: number;
        usefulLife: number;
        amortization: number;
      }[];
      customerRelationships: {
        description: string;
        value: number;
        usefulLife: number;
        amortization: number;
      };
      contracts: {
        contract: string;
        type: string;
        parties: string[];
        startDate: string;
        endDate: string;
        annualValue: number;
        remainingValue: number;
        transferable: boolean;
      }[];
      licenses: {
        license: string;
        type: string;
        issuingAuthority: string;
        issueDate: string;
        expirationDate: string;
        annualValue: number;
        transferable: boolean;
      }[];
      goodwill: {
        description: string;
        value: number;
        impairment: number;
        netValue: number;
      };
      totalIntangibleAssets: number;
    };
    
    // Total Assets
    totalAssets: {
      tangibleAssets: number;
      intangibleAssets: number;
      totalAssets: number;
      totalLiabilities: number;
      netAssetValue: number;
    };
  };
  
  // Valuation Methods
  valuationMethods: {
    // Income Approach
    incomeApproach: {
      discountedCashFlow: {
        projectionPeriod: number;
        terminalGrowthRate: number;
        discountRate: number;
        freeCashFlows: number[];
        terminalValue: number;
        presentValue: number;
        enterpriseValue: number;
        equityValue: number;
      };
      capitalizationOfEarnings: {
        normalizedEarnings: number;
        capitalizationRate: number;
        value: number;
      };
      multipleOfEarnings: {
        earnings: number;
        multiple: number;
        value: number;
      };
    };
    
    // Market Approach
    marketApproach: {
      comparableCompanies: {
        company: string;
        industry: string;
        revenue: number;
        ebitda: number;
        ebit: number;
        netIncome: number;
        marketCap: number;
        enterpriseValue: number;
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        adjustments: {
          adjustment: string;
          amount: number;
          reason: string;
        }[];
        adjustedMultiple: number;
      }[];
      comparableTransactions: {
        transaction: string;
        date: string;
        targetCompany: string;
        industry: string;
        transactionValue: number;
        revenue: number;
        ebitda: number;
        ebit: number;
        netIncome: number;
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        adjustments: {
          adjustment: string;
          amount: number;
          reason: string;
        }[];
        adjustedMultiple: number;
      }[];
      selectedMultiples: {
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        value: number;
      };
    };
    
    // Asset Approach
    assetApproach: {
      adjustedBookValue: {
        totalAssets: number;
        totalLiabilities: number;
        bookValue: number;
        adjustments: {
          asset: string;
          bookValue: number;
          fairMarketValue: number;
          adjustment: number;
        }[];
        adjustedValue: number;
      };
      liquidationValue: {
        assetValues: {
          asset: string;
          orderlyLiquidation: number;
          forcedLiquidation: number;
        }[];
        liabilityValues: {
          liability: string;
          amount: number;
          priority: number;
        }[];
        orderlyLiquidationValue: number;
        forcedLiquidationValue: number;
      };
    };
    
    // Weighted Average
    weightedAverage: {
      method: string;
      value: number;
      weight: number;
      weightedValue: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Business Risk
    businessRisk: {
      industryRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
      operationalRisk: number;
      financialRisk: number;
      totalBusinessRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      liquidityRisk: number;
      solvencyRisk: number;
      leverageRisk: number;
      cashFlowRisk: number;
      concentrationRisk: number;
      totalFinancialRisk: number;
    };
    
    // Management Risk
    managementRisk: {
      keyPersonRisk: number;
      successionRisk: number;
      depthRisk: number;
      experienceRisk: number;
      totalManagementRisk: number;
    };
    
    // Market Risk
    marketRisk: {
      economicRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
      commodityRisk: number;
      totalMarketRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskPremium: number;
    discountRate: number;
  };
  
  // Discount Rate Analysis
  discountRateAnalysis: {
    // Risk-Free Rate
    riskFreeRate: {
      rate: number;
      source: string;
      maturity: string;
    };
    
    // Equity Risk Premium
    equityRiskPremium: {
      marketRiskPremium: number;
      beta: number;
      sizeRiskPremium: number;
      companySpecificRisk: number;
      totalEquityRiskPremium: number;
    };
    
    // Cost of Equity
    costOfEquity: {
      riskFreeRate: number;
      equityRiskPremium: number;
      costOfEquity: number;
    };
    
    // Cost of Debt
    costOfDebt: {
      interestRate: number;
      taxRate: number;
      afterTaxCost: number;
    };
    
    // Weighted Average Cost of Capital
    weightedAverageCostOfCapital: {
      costOfEquity: number;
      costOfDebt: number;
      equityWeight: number;
      debtWeight: number;
      wacc: number;
    };
  };
  
  // Synergies and Adjustments
  synergiesAdjustments: {
    // Synergies
    synergies: {
      revenueSynergies: {
        synergy: string;
        amount: number;
        probability: number;
        timing: string;
        presentValue: number;
      }[];
      costSynergies: {
        synergy: string;
        amount: number;
        probability: number;
        timing: string;
        presentValue: number;
      }[];
      totalSynergies: number;
    };
    
    // Adjustments
    adjustments: {
      controlAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      marketabilityAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      minorityAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      totalAdjustments: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Base Case
    baseCase: {
      scenario: string;
      probability: number;
      revenue: number;
      ebitda: number;
      value: number;
      description: string;
    };
    
    // Optimistic Case
    optimisticCase: {
      scenario: string;
      probability: number;
      revenue: number;
      ebitda: number;
      value: number;
      description: string;
    };
    
    // Pessimistic Case
    pessimisticCase: {
      scenario: string;
      probability: number;
      revenue: number;
      ebitda: number;
      value: number;
      description: string;
    };
    
    // Weighted Average
    weightedAverage: {
      scenario: string;
      probability: number;
      value: number;
    };
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRevenueVolatility: boolean;
  includeMarginVolatility: boolean;
  includeDiscountRateVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  valuationDate: string;
  includeSynergies: boolean;
  includeControlPremium: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeIncomeApproach: boolean;
    includeMarketApproach: boolean;
    includeAssetApproach: boolean;
    includeRiskAnalysis: boolean;
    includeDiscountRateAnalysis: boolean;
    includeSynergiesAdjustments: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    year: number;
    revenue: number;
    ebitda: number;
    netIncome: number;
    value: number;
    growth: number;
  }[];
  
  // Reporting Preferences
  includeIncomeApproach: boolean;
  includeMarketApproach: boolean;
  includeAssetApproach: boolean;
  includeRiskAnalysis: boolean;
  includeDiscountRateAnalysis: boolean;
  includeSynergiesAdjustments: boolean;
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

export interface BusinessValuationCalculatorResults {
  // Core Valuation Metrics
  enterpriseValue: number;
  equityValue: number;
  valuePerShare: number;
  valuationMultiple: number;
  discountRate: number;
  
  // Business Valuation Analysis
  businessValuationAnalysis: {
    enterpriseValue: number;
    equityValue: number;
    valuePerShare: number;
    valuationMultiple: number;
    discountRate: number;
    valuationBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    valuationEfficiency: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    historicalFinancials: {
      year: number;
      revenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: {
        salaries: number;
        rent: number;
        utilities: number;
        insurance: number;
        marketing: number;
        legal: number;
        accounting: number;
        depreciation: number;
        amortization: number;
        otherExpenses: number;
        totalOperatingExpenses: number;
      };
      operatingIncome: number;
      interestExpense: number;
      taxes: number;
      netIncome: number;
      ebitda: number;
      ebit: number;
      freeCashFlow: number;
      workingCapital: number;
      totalAssets: number;
      totalLiabilities: number;
      totalEquity: number;
      debtToEquity: number;
      currentRatio: number;
      quickRatio: number;
      returnOnEquity: number;
      returnOnAssets: number;
      profitMargin: number;
      grossMargin: number;
      operatingMargin: number;
    }[];
    projectedFinancials: {
      year: number;
      revenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: number;
      operatingIncome: number;
      interestExpense: number;
      taxes: number;
      netIncome: number;
      ebitda: number;
      ebit: number;
      freeCashFlow: number;
      workingCapital: number;
      capitalExpenditures: number;
      depreciation: number;
      amortization: number;
    }[];
    normalizationAdjustments: {
      ownerCompensation: {
        currentCompensation: number;
        marketCompensation: number;
        adjustment: number;
        reason: string;
      };
      nonRecurringItems: {
        item: string;
        amount: number;
        type: string;
        reason: string;
        frequency: string;
      }[];
      relatedPartyTransactions: {
        transaction: string;
        amount: number;
        type: string;
        marketRate: number;
        adjustment: number;
        reason: string;
      }[];
      extraordinaryItems: {
        item: string;
        amount: number;
        type: string;
        reason: string;
        probability: number;
      }[];
      totalAdjustments: number;
      normalizedEbitda: number;
      normalizedEbit: number;
      normalizedNetIncome: number;
    };
    workingCapitalAnalysis: {
      currentAssets: {
        cash: number;
        accountsReceivable: number;
        inventory: number;
        prepaidExpenses: number;
        otherCurrentAssets: number;
        totalCurrentAssets: number;
      };
      currentLiabilities: {
        accountsPayable: number;
        accruedExpenses: number;
        shortTermDebt: number;
        otherCurrentLiabilities: number;
        totalCurrentLiabilities: number;
      };
      workingCapital: number;
      workingCapitalRatio: number;
      daysSalesOutstanding: number;
      daysInventoryOutstanding: number;
      daysPayablesOutstanding: number;
      cashConversionCycle: number;
    };
    capitalStructure: {
      debt: {
        shortTermDebt: number;
        longTermDebt: number;
        totalDebt: number;
        interestRate: number;
        maturityDate: string;
        collateral: string;
      };
      equity: {
        commonStock: number;
        preferredStock: number;
        retainedEarnings: number;
        totalEquity: number;
      };
      debtToEquity: number;
      debtToEbitda: number;
      interestCoverage: number;
      weightedAverageCostOfCapital: number;
    };
    financialEfficiency: number;
  };
  
  // Asset Analysis
  assetAnalysis: {
    tangibleAssets: {
      realEstate: {
        property: string;
        type: string;
        location: string;
        squareFootage: number;
        bookValue: number;
        fairMarketValue: number;
        mortgage: number;
        equity: number;
        annualRent: number;
        annualExpenses: number;
        netOperatingIncome: number;
      }[];
      equipment: {
        equipment: string;
        type: string;
        purchaseDate: string;
        originalCost: number;
        bookValue: number;
        fairMarketValue: number;
        usefulLife: number;
        condition: string;
        replacementCost: number;
      }[];
      vehicles: {
        vehicle: string;
        type: string;
        year: number;
        make: string;
        model: string;
        bookValue: number;
        fairMarketValue: number;
        condition: string;
      }[];
      inventory: {
        category: string;
        bookValue: number;
        fairMarketValue: number;
        turnoverRate: number;
        obsolescence: number;
        netRealizableValue: number;
      };
      totalTangibleAssets: number;
    };
    intangibleAssets: {
      intellectualProperty: {
        type: string;
        description: string;
        registrationNumber: string;
        registrationDate: string;
        expirationDate: string;
        bookValue: number;
        fairMarketValue: number;
        usefulLife: number;
        amortization: number;
      }[];
      customerRelationships: {
        description: string;
        value: number;
        usefulLife: number;
        amortization: number;
      };
      contracts: {
        contract: string;
        type: string;
        parties: string[];
        startDate: string;
        endDate: string;
        annualValue: number;
        remainingValue: number;
        transferable: boolean;
      }[];
      licenses: {
        license: string;
        type: string;
        issuingAuthority: string;
        issueDate: string;
        expirationDate: string;
        annualValue: number;
        transferable: boolean;
      }[];
      goodwill: {
        description: string;
        value: number;
        impairment: number;
        netValue: number;
      };
      totalIntangibleAssets: number;
    };
    totalAssets: {
      tangibleAssets: number;
      intangibleAssets: number;
      totalAssets: number;
      totalLiabilities: number;
      netAssetValue: number;
    };
    assetEfficiency: number;
  };
  
  // Valuation Methods Analysis
  valuationMethodsAnalysis: {
    incomeApproach: {
      discountedCashFlow: {
        projectionPeriod: number;
        terminalGrowthRate: number;
        discountRate: number;
        freeCashFlows: number[];
        terminalValue: number;
        presentValue: number;
        enterpriseValue: number;
        equityValue: number;
      };
      capitalizationOfEarnings: {
        normalizedEarnings: number;
        capitalizationRate: number;
        value: number;
      };
      multipleOfEarnings: {
        earnings: number;
        multiple: number;
        value: number;
      };
    };
    marketApproach: {
      comparableCompanies: {
        company: string;
        industry: string;
        revenue: number;
        ebitda: number;
        ebit: number;
        netIncome: number;
        marketCap: number;
        enterpriseValue: number;
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        adjustments: {
          adjustment: string;
          amount: number;
          reason: string;
        }[];
        adjustedMultiple: number;
      }[];
      comparableTransactions: {
        transaction: string;
        date: string;
        targetCompany: string;
        industry: string;
        transactionValue: number;
        revenue: number;
        ebitda: number;
        ebit: number;
        netIncome: number;
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        adjustments: {
          adjustment: string;
          amount: number;
          reason: string;
        }[];
        adjustedMultiple: number;
      }[];
      selectedMultiples: {
        revenueMultiple: number;
        ebitdaMultiple: number;
        ebitMultiple: number;
        peRatio: number;
        value: number;
      };
    };
    assetApproach: {
      adjustedBookValue: {
        totalAssets: number;
        totalLiabilities: number;
        bookValue: number;
        adjustments: {
          asset: string;
          bookValue: number;
          fairMarketValue: number;
          adjustment: number;
        }[];
        adjustedValue: number;
      };
      liquidationValue: {
        assetValues: {
          asset: string;
          orderlyLiquidation: number;
          forcedLiquidation: number;
        }[];
        liabilityValues: {
          liability: string;
          amount: number;
          priority: number;
        }[];
        orderlyLiquidationValue: number;
        forcedLiquidationValue: number;
      };
    };
    weightedAverage: {
      method: string;
      value: number;
      weight: number;
      weightedValue: number;
    }[];
    methodsEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    businessRisk: {
      industryRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
      operationalRisk: number;
      financialRisk: number;
      totalBusinessRisk: number;
    };
    financialRisk: {
      liquidityRisk: number;
      solvencyRisk: number;
      leverageRisk: number;
      cashFlowRisk: number;
      concentrationRisk: number;
      totalFinancialRisk: number;
    };
    managementRisk: {
      keyPersonRisk: number;
      successionRisk: number;
      depthRisk: number;
      experienceRisk: number;
      totalManagementRisk: number;
    };
    marketRisk: {
      economicRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
      commodityRisk: number;
      totalMarketRisk: number;
    };
    totalRisk: number;
    riskPremium: number;
    discountRate: number;
    riskEfficiency: number;
  };
  
  // Discount Rate Analysis
  discountRateAnalysis: {
    riskFreeRate: {
      rate: number;
      source: string;
      maturity: string;
    };
    equityRiskPremium: {
      marketRiskPremium: number;
      beta: number;
      sizeRiskPremium: number;
      companySpecificRisk: number;
      totalEquityRiskPremium: number;
    };
    costOfEquity: {
      riskFreeRate: number;
      equityRiskPremium: number;
      costOfEquity: number;
    };
    costOfDebt: {
      interestRate: number;
      taxRate: number;
      afterTaxCost: number;
    };
    weightedAverageCostOfCapital: {
      costOfEquity: number;
      costOfDebt: number;
      equityWeight: number;
      debtWeight: number;
      wacc: number;
    };
    discountRateEfficiency: number;
  };
  
  // Synergies and Adjustments Analysis
  synergiesAdjustmentsAnalysis: {
    synergies: {
      revenueSynergies: {
        synergy: string;
        amount: number;
        probability: number;
        timing: string;
        presentValue: number;
      }[];
      costSynergies: {
        synergy: string;
        amount: number;
        probability: number;
        timing: string;
        presentValue: number;
      }[];
      totalSynergies: number;
    };
    adjustments: {
      controlAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      marketabilityAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      minorityAdjustments: {
        adjustment: string;
        amount: number;
        reason: string;
      }[];
      totalAdjustments: number;
    };
    synergiesAdjustmentsEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowValuation: number;
    highValuation: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    revenue: number;
    ebitda: number;
    value: number;
    recommendation: string;
  }[];
  
  // Valuation Planning Analysis
  valuationPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialValue: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    valuationStrategies: {
      strategy: string;
      description: string;
      expectedValue: number;
      implementationSteps: string[];
      timeline: string;
    }[];
    planningEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeValuations: {
      method: string;
      value: number;
      multiple: number;
      efficiency: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkValue: number;
      actualValue: number;
      difference: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Business Valuation Score
  businessValuationScore: {
    overallScore: number;
    componentScores: {
      financial: number;
      assets: number;
      methods: number;
      risk: number;
      discount: number;
      planning: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanValue: number;
    medianValue: number;
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
      value: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalValue: number;
    historicalRevenue: number;
    historicalEbitda: number;
    historicalGrowth: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    valueEnhancement: number;
    riskReduction: number;
    efficiencyGain: number;
    strategicImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    valuationAssessment: string;
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
    enterpriseValue: number;
    equityValue: number;
    valuePerShare: number;
    valuationMultiple: number;
    discountRate: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedValue: number;
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
