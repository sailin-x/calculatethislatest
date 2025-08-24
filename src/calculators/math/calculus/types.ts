export interface CalculusCalculatorInputs {
  // Problem Information
  problemInfo: {
    // Basic Problem Details
    basicInfo: {
      problemType: 'limit' | 'derivative' | 'integral' | 'series' | 'sequence' | 'differential_equation' | 'partial_derivative' | 'multiple_integral' | 'vector_calculus' | 'optimization';
      problemCategory: 'single_variable' | 'multi_variable' | 'vector' | 'complex' | 'numerical' | 'symbolic';
      difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
      variables: string[];
      constants: number[];
      functions: string[];
      expressions: string[];
      domain: string;
      range: string;
    };
    
    // Function Information
    functionInfo: {
      functionType: 'polynomial' | 'rational' | 'trigonometric' | 'exponential' | 'logarithmic' | 'hyperbolic' | 'piecewise' | 'implicit' | 'parametric' | 'vector';
      function: string;
      domain: string;
      range: string;
      continuity: 'continuous' | 'discontinuous' | 'piecewise_continuous';
      differentiability: 'differentiable' | 'not_differentiable' | 'piecewise_differentiable';
      integrability: 'integrable' | 'not_integrable' | 'conditionally_integrable';
      asymptotes: string[];
      criticalPoints: number[];
      inflectionPoints: number[];
      extrema: {
        maximum: number[];
        minimum: number[];
      };
    };
    
    // Limit Information
    limitInfo: {
      limitType: 'two_sided' | 'left_sided' | 'right_sided' | 'infinite' | 'at_infinity';
      approachingPoint: number | string; // can be infinity
      expression: string;
      indeterminateForm: 'none' | 'zero_over_zero' | 'infinity_over_infinity' | 'zero_times_infinity' | 'infinity_minus_infinity' | 'zero_to_zero' | 'infinity_to_zero' | 'one_to_infinity';
      lhopitalApplicable: boolean;
      squeezeTheoremApplicable: boolean;
    };
    
    // Derivative Information
    derivativeInfo: {
      derivativeType: 'first' | 'second' | 'nth' | 'partial' | 'directional' | 'total';
      order: number;
      variables: string[];
      respectTo: string;
      chainRule: boolean;
      productRule: boolean;
      quotientRule: boolean;
      implicitDifferentiation: boolean;
      logarithmicDifferentiation: boolean;
    };
    
    // Integral Information
    integralInfo: {
      integralType: 'definite' | 'indefinite' | 'improper' | 'line' | 'surface' | 'volume' | 'multiple';
      order: number;
      variables: string[];
      limits: {
        lower: number | string;
        upper: number | string;
      };
      integrationMethod: 'substitution' | 'parts' | 'partial_fractions' | 'trigonometric' | 'numerical' | 'symbolic';
      convergence: 'convergent' | 'divergent' | 'conditionally_convergent';
    };
    
    // Series Information
    seriesInfo: {
      seriesType: 'geometric' | 'arithmetic' | 'power' | 'taylor' | 'maclaurin' | 'fourier' | 'laurent' | 'telescoping';
      generalTerm: string;
      firstTerm: number;
      commonRatio: number;
      commonDifference: number;
      center: number;
      radius: number;
      interval: string;
      convergence: 'convergent' | 'divergent' | 'conditionally_convergent';
    };
  };
  
  // Mathematical Operations
  mathematicalOperations: {
    // Basic Operations
    basicOperations: {
      addition: boolean;
      subtraction: boolean;
      multiplication: boolean;
      division: boolean;
      exponentiation: boolean;
      rootExtraction: boolean;
      absoluteValue: boolean;
      factorial: boolean;
    };
    
    // Calculus Operations
    calculusOperations: {
      limits: boolean;
      derivatives: boolean;
      integrals: boolean;
      series: boolean;
      sequences: boolean;
      differentialEquations: boolean;
      partialDerivatives: boolean;
      multipleIntegrals: boolean;
      vectorCalculus: boolean;
      optimization: boolean;
    };
    
    // Advanced Operations
    advancedOperations: {
      logarithms: boolean;
      exponentials: boolean;
      trigonometric: boolean;
      inverseTrigonometric: boolean;
      hyperbolic: boolean;
      inverseHyperbolic: boolean;
      complexNumbers: boolean;
      matrices: boolean;
      vectors: boolean;
      tensors: boolean;
    };
  };
  
  // Solution Methods
  solutionMethods: {
    // Limit Methods
    limitMethods: {
      directSubstitution: boolean;
      factoring: boolean;
      rationalizing: boolean;
      lhopitalRule: boolean;
      squeezeTheorem: boolean;
      seriesExpansion: boolean;
      numericalApproximation: boolean;
    };
    
    // Derivative Methods
    derivativeMethods: {
      powerRule: boolean;
      productRule: boolean;
      quotientRule: boolean;
      chainRule: boolean;
      implicitDifferentiation: boolean;
      logarithmicDifferentiation: boolean;
      partialDerivatives: boolean;
      directionalDerivatives: boolean;
    };
    
    // Integral Methods
    integralMethods: {
      substitution: boolean;
      integrationByParts: boolean;
      partialFractions: boolean;
      trigonometricSubstitution: boolean;
      numericalIntegration: boolean;
      symbolicIntegration: boolean;
      multipleIntegration: boolean;
      lineIntegration: boolean;
    };
    
    // Series Methods
    seriesMethods: {
      ratioTest: boolean;
      rootTest: boolean;
      comparisonTest: boolean;
      limitComparisonTest: boolean;
      integralTest: boolean;
      alternatingSeriesTest: boolean;
      taylorSeries: boolean;
      maclaurinSeries: boolean;
    };
  };
  
  // Variables and Constants
  variablesConstants: {
    // Variable Information
    variables: {
      variable: string;
      type: 'real' | 'complex' | 'integer' | 'rational' | 'irrational';
      domain: string;
      constraints: string[];
      initialValue: number;
      currentValue: number;
      targetValue: number;
    }[];
    
    // Constant Information
    constants: {
      constant: string;
      value: number;
      type: 'mathematical' | 'physical' | 'custom';
      description: string;
      precision: number;
      units: string;
    }[];
    
    // Parameter Information
    parameters: {
      parameter: string;
      value: number;
      range: {
        min: number;
        max: number;
      };
      step: number;
      description: string;
    }[];
  };
  
  // Constraints and Conditions
  constraintsConditions: {
    // Domain Constraints
    domainConstraints: {
      variable: string;
      domain: string;
      type: 'real' | 'positive' | 'negative' | 'integer' | 'rational' | 'complex';
      description: string;
    }[];
    
    // Continuity Constraints
    continuityConstraints: {
      function: string;
      point: number;
      continuityType: 'continuous' | 'discontinuous' | 'removable_discontinuity' | 'jump_discontinuity' | 'infinite_discontinuity';
      description: string;
    }[];
    
    // Differentiability Constraints
    differentiabilityConstraints: {
      function: string;
      point: number;
      differentiabilityType: 'differentiable' | 'not_differentiable' | 'piecewise_differentiable';
      description: string;
    }[];
    
    // Convergence Constraints
    convergenceConstraints: {
      series: string;
      convergenceType: 'convergent' | 'divergent' | 'conditionally_convergent';
      radius: number;
      interval: string;
      description: string;
    }[];
  };
  
  // Accuracy and Precision
  accuracyPrecision: {
    // Numerical Precision
    numericalPrecision: {
      decimalPlaces: number;
      significantFigures: number;
      tolerance: number;
      maxIterations: number;
      convergenceCriteria: number;
    };
    
    // Symbolic Precision
    symbolicPrecision: {
      exactForm: boolean;
      simplifiedForm: boolean;
      factoredForm: boolean;
      expandedForm: boolean;
      rationalizedForm: boolean;
    };
    
    // Computational Settings
    computationalSettings: {
      useComplexNumbers: boolean;
      useExactArithmetic: boolean;
      useFloatingPoint: boolean;
      useIntervalArithmetic: boolean;
      useSymbolicComputation: boolean;
    };
  };
  
  // Visualization Options
  visualizationOptions: {
    // Graphing Options
    graphingOptions: {
      showGraph: boolean;
      showGrid: boolean;
      showAxes: boolean;
      showLabels: boolean;
      showPoints: boolean;
      showLines: boolean;
      showCurves: boolean;
      showTangentLines: boolean;
      showNormalLines: boolean;
      showArea: boolean;
    };
    
    // Plot Settings
    plotSettings: {
      xRange: {
        min: number;
        max: number;
      };
      yRange: {
        min: number;
        max: number;
      };
      resolution: number;
      colorScheme: string;
      lineStyle: string;
      pointStyle: string;
    };
    
    // 3D Plotting
    threeDPlotting: {
      show3DGraph: boolean;
      xRange: {
        min: number;
        max: number;
      };
      yRange: {
        min: number;
        max: number;
      };
      zRange: {
        min: number;
        max: number;
      };
      viewAngle: {
        x: number;
        y: number;
        z: number;
      };
    };
  };
  
  // Calculation Options
  calculationOptions: {
    includeSolution: boolean;
    includeSteps: boolean;
    includeVerification: boolean;
    includeGraph: boolean;
    includeAnalysis: boolean;
    includeOptimization: boolean;
  };
  
  // Output Preferences
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
}

export interface CalculusCalculatorResults {
  // Problem Analysis
  problemAnalysis: {
    basicInfo: {
      problemType: string;
      problemCategory: string;
      difficulty: string;
      variables: string[];
      constants: number[];
      functions: string[];
      expressions: string[];
      domain: string;
      range: string;
    };
    functionInfo: {
      functionType: string;
      function: string;
      domain: string;
      range: string;
      continuity: string;
      differentiability: string;
      integrability: string;
      asymptotes: string[];
      criticalPoints: number[];
      inflectionPoints: number[];
      extrema: {
        maximum: number[];
        minimum: number[];
      };
    };
    limitInfo: {
      limitType: string;
      approachingPoint: number | string;
      expression: string;
      indeterminateForm: string;
      lhopitalApplicable: boolean;
      squeezeTheoremApplicable: boolean;
    };
    derivativeInfo: {
      derivativeType: string;
      order: number;
      variables: string[];
      respectTo: string;
      chainRule: boolean;
      productRule: boolean;
      quotientRule: boolean;
      implicitDifferentiation: boolean;
      logarithmicDifferentiation: boolean;
    };
    integralInfo: {
      integralType: string;
      order: number;
      variables: string[];
      limits: {
        lower: number | string;
        upper: number | string;
      };
      integrationMethod: string;
      convergence: string;
    };
    seriesInfo: {
      seriesType: string;
      generalTerm: string;
      firstTerm: number;
      commonRatio: number;
      commonDifference: number;
      center: number;
      radius: number;
      interval: string;
      convergence: string;
    };
    problemEfficiency: number;
  };
  
  // Solution Analysis
  solutionAnalysis: {
    // Solution Results
    solutionResults: {
      solutions: {
        solution: string;
        method: string;
        accuracy: number;
        verification: boolean;
      }[];
      exactSolutions: string[];
      approximateSolutions: number[];
      numericalSolutions: number[];
      symbolicSolutions: string[];
    };
    
    // Solution Methods Used
    solutionMethodsUsed: {
      method: string;
      success: boolean;
      steps: string[];
      timeComplexity: string;
      spaceComplexity: string;
      accuracy: number;
    }[];
    
    // Solution Verification
    solutionVerification: {
      verified: boolean;
      verificationMethod: string;
      error: number;
      tolerance: number;
      passed: boolean;
    };
    
    solutionEfficiency: number;
  };
  
  // Mathematical Operations Analysis
  mathematicalOperationsAnalysis: {
    basicOperations: {
      addition: boolean;
      subtraction: boolean;
      multiplication: boolean;
      division: boolean;
      exponentiation: boolean;
      rootExtraction: boolean;
      absoluteValue: boolean;
      factorial: boolean;
    };
    calculusOperations: {
      limits: boolean;
      derivatives: boolean;
      integrals: boolean;
      series: boolean;
      sequences: boolean;
      differentialEquations: boolean;
      partialDerivatives: boolean;
      multipleIntegrals: boolean;
      vectorCalculus: boolean;
      optimization: boolean;
    };
    advancedOperations: {
      logarithms: boolean;
      exponentials: boolean;
      trigonometric: boolean;
      inverseTrigonometric: boolean;
      hyperbolic: boolean;
      inverseHyperbolic: boolean;
      complexNumbers: boolean;
      matrices: boolean;
      vectors: boolean;
      tensors: boolean;
    };
    operationsEfficiency: number;
  };
  
  // Variables and Constants Analysis
  variablesConstantsAnalysis: {
    variables: {
      variable: string;
      type: string;
      domain: string;
      constraints: string[];
      initialValue: number;
      currentValue: number;
      targetValue: number;
    }[];
    constants: {
      constant: string;
      value: number;
      type: string;
      description: string;
      precision: number;
      units: string;
    }[];
    parameters: {
      parameter: string;
      value: number;
      range: {
        min: number;
        max: number;
      };
      step: number;
      description: string;
    }[];
    variablesEfficiency: number;
  };
  
  // Constraints and Conditions Analysis
  constraintsConditionsAnalysis: {
    domainConstraints: {
      variable: string;
      domain: string;
      type: string;
      description: string;
    }[];
    continuityConstraints: {
      function: string;
      point: number;
      continuityType: string;
      description: string;
    }[];
    differentiabilityConstraints: {
      function: string;
      point: number;
      differentiabilityType: string;
      description: string;
    }[];
    convergenceConstraints: {
      series: string;
      convergenceType: string;
      radius: number;
      interval: string;
      description: string;
    }[];
    constraintsEfficiency: number;
  };
  
  // Accuracy and Precision Analysis
  accuracyPrecisionAnalysis: {
    numericalPrecision: {
      decimalPlaces: number;
      significantFigures: number;
      tolerance: number;
      maxIterations: number;
      convergenceCriteria: number;
    };
    symbolicPrecision: {
      exactForm: boolean;
      simplifiedForm: boolean;
      factoredForm: boolean;
      expandedForm: boolean;
      rationalizedForm: boolean;
    };
    computationalSettings: {
      useComplexNumbers: boolean;
      useExactArithmetic: boolean;
      useFloatingPoint: boolean;
      useIntervalArithmetic: boolean;
      useSymbolicComputation: boolean;
    };
    accuracyEfficiency: number;
  };
  
  // Visualization Analysis
  visualizationAnalysis: {
    graphingOptions: {
      showGraph: boolean;
      showGrid: boolean;
      showAxes: boolean;
      showLabels: boolean;
      showPoints: boolean;
      showLines: boolean;
      showCurves: boolean;
      showTangentLines: boolean;
      showNormalLines: boolean;
      showArea: boolean;
    };
    plotSettings: {
      xRange: {
        min: number;
        max: number;
      };
      yRange: {
        min: number;
        max: number;
      };
      resolution: number;
      colorScheme: string;
      lineStyle: string;
      pointStyle: string;
    };
    threeDPlotting: {
      show3DGraph: boolean;
      xRange: {
        min: number;
        max: number;
      };
      yRange: {
        min: number;
        max: number;
      };
      zRange: {
        min: number;
        max: number;
      };
      viewAngle: {
        x: number;
        y: number;
        z: number;
      };
    };
    visualizationEfficiency: number;
  };
  
  // Step-by-Step Solution
  stepByStepSolution: {
    steps: {
      step: number;
      description: string;
      operation: string;
      input: string;
      output: string;
      method: string;
      explanation: string;
    }[];
    intermediateResults: {
      step: number;
      result: string;
      form: string;
      simplification: string;
    }[];
    finalResult: {
      solution: string;
      form: string;
      verification: boolean;
      accuracy: number;
    };
    solutionEfficiency: number;
  };
  
  // Error Analysis
  errorAnalysis: {
    computationalErrors: {
      error: string;
      type: 'rounding' | 'truncation' | 'convergence' | 'numerical' | 'symbolic';
      magnitude: number;
      impact: string;
      mitigation: string;
    }[];
    methodErrors: {
      error: string;
      method: string;
      cause: string;
      solution: string;
    }[];
    validationErrors: {
      error: string;
      validation: string;
      expected: string;
      actual: string;
      difference: number;
    }[];
    errorEfficiency: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    computationalPerformance: {
      executionTime: number; // milliseconds
      memoryUsage: number; // bytes
      cpuUsage: number; // percentage
      iterations: number;
      convergenceRate: number;
    };
    algorithmPerformance: {
      timeComplexity: string;
      spaceComplexity: string;
      efficiency: number;
      optimization: string[];
    };
    accuracyPerformance: {
      precision: number;
      accuracy: number;
      reliability: number;
      confidence: number;
    };
    performanceEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowResult: string;
    highResult: string;
    sensitivity: number;
  }[];
  
  // Calculus Score
  calculusScore: {
    overallScore: number;
    componentScores: {
      problem: number;
      solution: number;
      operations: number;
      variables: number;
      constraints: number;
      accuracy: number;
      visualization: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProblems: {
      date: string;
      problemType: string;
      difficulty: string;
      solutionTime: number;
      accuracy: number;
      method: string;
    }[];
    performanceTrends: string[];
    improvementAreas: string[];
  };
  
  // Educational Impact
  educationalImpact: {
    learningOutcomes: number;
    skillDevelopment: number;
    problemSolving: number;
    mathematicalThinking: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    problemAssessment: string;
    solutionAssessment: string;
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
    problemType: string;
    difficulty: string;
    solution: string;
    accuracy: number;
    method: string;
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
