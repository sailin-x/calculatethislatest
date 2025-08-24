export interface AlgebraCalculatorInputs {
  // Problem Information
  problemInfo: {
    // Basic Problem Details
    basicInfo: {
      problemType: 'equation' | 'inequality' | 'system' | 'polynomial' | 'function' | 'matrix' | 'vector' | 'sequence' | 'series' | 'other';
      problemCategory: 'linear' | 'quadratic' | 'cubic' | 'polynomial' | 'rational' | 'radical' | 'exponential' | 'logarithmic' | 'trigonometric' | 'complex';
      difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
      variables: string[];
      constants: number[];
      coefficients: number[];
      exponents: number[];
      operators: string[];
      expressions: string[];
    };
    
    // Equation Information
    equationInfo: {
      leftSide: string;
      rightSide: string;
      equation: string;
      standardForm: string;
      factoredForm: string;
      vertexForm: string;
      interceptForm: string;
      slopeInterceptForm: string;
      pointSlopeForm: string;
      generalForm: string;
    };
    
    // System Information
    systemInfo: {
      equations: string[];
      variables: string[];
      coefficients: number[][];
      constants: number[];
      augmentedMatrix: number[][];
      coefficientMatrix: number[][];
      constantVector: number[];
      systemType: 'consistent' | 'inconsistent' | 'dependent' | 'independent';
      solutionType: 'unique' | 'infinite' | 'none';
    };
    
    // Function Information
    functionInfo: {
      functionType: 'linear' | 'quadratic' | 'cubic' | 'polynomial' | 'rational' | 'radical' | 'exponential' | 'logarithmic' | 'trigonometric' | 'piecewise';
      domain: string;
      range: string;
      asymptotes: string[];
      intercepts: {
        xIntercepts: number[];
        yIntercepts: number[];
      };
      criticalPoints: number[];
      inflectionPoints: number[];
      extrema: {
        maximum: number[];
        minimum: number[];
      };
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
      calculus: boolean;
    };
    
    // Algebraic Operations
    algebraicOperations: {
      factoring: boolean;
      expanding: boolean;
      simplifying: boolean;
      rationalizing: boolean;
      completingSquare: boolean;
      quadraticFormula: boolean;
      syntheticDivision: boolean;
      polynomialDivision: boolean;
      partialFractions: boolean;
      substitution: boolean;
    };
  };
  
  // Solution Methods
  solutionMethods: {
    // Equation Solving Methods
    equationSolvingMethods: {
      substitution: boolean;
      elimination: boolean;
      graphing: boolean;
      factoring: boolean;
      quadraticFormula: boolean;
      completingSquare: boolean;
      rationalRootTheorem: boolean;
      syntheticDivision: boolean;
      newtonMethod: boolean;
      bisectionMethod: boolean;
    };
    
    // System Solving Methods
    systemSolvingMethods: {
      substitution: boolean;
      elimination: boolean;
      matrixMethods: boolean;
      cramerRule: boolean;
      gaussianElimination: boolean;
      gaussJordan: boolean;
      luDecomposition: boolean;
      inverseMatrix: boolean;
      graphing: boolean;
      iteration: boolean;
    };
    
    // Function Analysis Methods
    functionAnalysisMethods: {
      domainAnalysis: boolean;
      rangeAnalysis: boolean;
      asymptoteAnalysis: boolean;
      interceptAnalysis: boolean;
      derivativeAnalysis: boolean;
      integralAnalysis: boolean;
      limitAnalysis: boolean;
      continuityAnalysis: boolean;
      optimization: boolean;
      graphing: boolean;
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
    // Equality Constraints
    equalityConstraints: {
      constraint: string;
      equation: string;
      variables: string[];
      description: string;
    }[];
    
    // Inequality Constraints
    inequalityConstraints: {
      constraint: string;
      inequality: string;
      variables: string[];
      type: 'less_than' | 'greater_than' | 'less_equal' | 'greater_equal';
      description: string;
    }[];
    
    // Domain Constraints
    domainConstraints: {
      variable: string;
      domain: string;
      type: 'real' | 'positive' | 'negative' | 'integer' | 'rational' | 'complex';
      description: string;
    }[];
    
    // Logical Constraints
    logicalConstraints: {
      constraint: string;
      logic: string;
      variables: string[];
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
      showAsymptotes: boolean;
      showIntercepts: boolean;
      showCriticalPoints: boolean;
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

export interface AlgebraCalculatorResults {
  // Problem Analysis
  problemAnalysis: {
    basicInfo: {
      problemType: string;
      problemCategory: string;
      difficulty: string;
      variables: string[];
      constants: number[];
      coefficients: number[];
      exponents: number[];
      operators: string[];
      expressions: string[];
    };
    equationInfo: {
      leftSide: string;
      rightSide: string;
      equation: string;
      standardForm: string;
      factoredForm: string;
      vertexForm: string;
      interceptForm: string;
      slopeInterceptForm: string;
      pointSlopeForm: string;
      generalForm: string;
    };
    systemInfo: {
      equations: string[];
      variables: string[];
      coefficients: number[][];
      constants: number[];
      augmentedMatrix: number[][];
      coefficientMatrix: number[][];
      constantVector: number[];
      systemType: string;
      solutionType: string;
    };
    functionInfo: {
      functionType: string;
      domain: string;
      range: string;
      asymptotes: string[];
      intercepts: {
        xIntercepts: number[];
        yIntercepts: number[];
      };
      criticalPoints: number[];
      inflectionPoints: number[];
      extrema: {
        maximum: number[];
        minimum: number[];
      };
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
      complexSolutions: string[];
      parametricSolutions: string[];
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
      calculus: boolean;
    };
    algebraicOperations: {
      factoring: boolean;
      expanding: boolean;
      simplifying: boolean;
      rationalizing: boolean;
      completingSquare: boolean;
      quadraticFormula: boolean;
      syntheticDivision: boolean;
      polynomialDivision: boolean;
      partialFractions: boolean;
      substitution: boolean;
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
    equalityConstraints: {
      constraint: string;
      equation: string;
      variables: string[];
      description: string;
    }[];
    inequalityConstraints: {
      constraint: string;
      inequality: string;
      variables: string[];
      type: string;
      description: string;
    }[];
    domainConstraints: {
      variable: string;
      domain: string;
      type: string;
      description: string;
    }[];
    logicalConstraints: {
      constraint: string;
      logic: string;
      variables: string[];
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
      showAsymptotes: boolean;
      showIntercepts: boolean;
      showCriticalPoints: boolean;
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
  
  // Algebra Score
  algebraScore: {
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
