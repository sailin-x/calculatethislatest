export interface CollegeCostInputs {
  // Student Information
  studentAge: number;
  yearsUntilCollege: number;
  collegeStartYear: number;
  degreeType: 'associate' | 'bachelor' | 'masters' | 'phd' | 'professional';
  collegeType: 'public_in_state' | 'public_out_state' | 'private_nonprofit' | 'private_for_profit' | 'community_college';

  // Cost Information
  annualTuition: number;
  annualRoomAndBoard: number;
  annualBooksAndSupplies: number;
  annualTransportation: number;
  annualPersonalExpenses: number;
  annualHealthInsurance: number;
  oneTimeFees: number; // Application, orientation, etc.

  // Financial Aid
  expectedGrants: number;
  expectedScholarships: number;
  expectedWorkStudy: number;
  expectedStudentLoans: number;
  expectedParentLoans: number;
  expectedFamilyContribution: number;

  // Planning Parameters
  inflationRate: number;
  investmentReturn: number;
  taxRate: number;
  planningHorizon: number; // Years to plan for

  // Scenario Analysis
  optimisticGrowth: number; // Higher growth scenario
  pessimisticGrowth: number; // Lower growth scenario
  probabilityOptimistic: number;
  probabilityPessimistic: number;

  // Additional Options
  includeSummerSchool: boolean;
  summerSchoolCost: number;
  includeStudyAbroad: boolean;
  studyAbroadCost: number;
  includeInternships: boolean;
  internshipEarnings: number;

  // Currency and Location
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  location: string;
}

export interface CollegeCostMetrics {
  // Total Costs
  totalFourYearCost: number;
  totalDegreeCost: number;
  annualAverageCost: number;
  monthlyAverageCost: number;

  // Cost Breakdown
  totalTuition: number;
  totalRoomAndBoard: number;
  totalBooksAndSupplies: number;
  totalTransportation: number;
  totalPersonalExpenses: number;
  totalHealthInsurance: number;
  totalOneTimeFees: number;

  // Net Costs After Aid
  netAnnualCost: number;
  netTotalCost: number;
  aidPercentage: number;

  // Savings and Investment
  requiredMonthlySavings: number;
  requiredAnnualSavings: number;
  totalSavingsNeeded: number;
  futureValueOfSavings: number;

  // Financial Aid Analysis
  totalAid: number;
  aidGap: number;
  selfFundingPercentage: number;

  // Scenario Analysis
  optimisticTotalCost: number;
  pessimisticTotalCost: number;
  expectedTotalCost: number;
  costVolatility: number;

  // Affordability Metrics
  costAsPercentOfIncome: number;
  affordabilityRating: 'Excellent' | 'Good' | 'Fair' | 'Challenging' | 'Difficult';
}

export interface CollegeCostAnalysis {
  // Executive Summary
  totalCost: number;
  monthlySavingsRequired: number;
  affordabilityAssessment: 'Highly Affordable' | 'Affordable' | 'Manageable' | 'Challenging' | 'Very Challenging';
  recommendation: 'Proceed as Planned' | 'Reduce Scope' | 'Increase Savings' | 'Seek More Aid' | 'Reconsider Options';

  // Key Insights
  keyCostDrivers: string[];
  savingsOpportunities: string[];
  aidMaximizationStrategies: string[];
  riskFactors: string[];

  // Cost Analysis
  costBreakdown: string;
  inflationImpact: string;
  scenarioAnalysis: string;

  // Savings Analysis
  savingsPlan: string;
  investmentStrategy: string;
  taxOptimization: string;

  // Financial Aid Analysis
  aidOptimization: string;
  fundingGapAnalysis: string;
  alternativeFunding: string;

  // Risk Assessment
  costVolatility: string;
  marketRisk: string;
  inflationRisk: string;

  // Implementation
  actionPlan: string[];
  timeline: string;
  monitoringStrategy: string[];

  // Recommendations
  costReductionStrategies: string[];
  savingsAcceleration: string[];
  aidImprovement: string[];

  // Performance Benchmarks
  costBenchmarks: Array<{
    category: string;
    currentCost: number;
    nationalAverage: number;
    percentile: number;
  }>;

  // Decision Support
  decisionSummary: string;
  contingencyPlans: string[];
  nextSteps: string[];
}

export interface CollegeCostOutputs {
  // Core Metrics
  totalFourYearCost: number;
  totalDegreeCost: number;
  requiredMonthlySavings: number;
  netTotalCost: number;

  // Analysis
  analysis: CollegeCostAnalysis;

  // Additional Metrics
  annualAverageCost: number;
  totalAid: number;
  aidGap: number;
  optimisticTotalCost: number;
  pessimisticTotalCost: number;
  affordabilityRating: string;
}