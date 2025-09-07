export interface CollegeFinancialAidInputs {
  // Student Information
  studentAge: number;
  isDependent: boolean;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  hasChildren: boolean;
  numberOfChildren: number;

  // Parent Information (for dependent students)
  parentMaritalStatus: 'married' | 'single' | 'divorced' | 'widowed' | 'separated';
  numberOfParents: 1 | 2;
  parentAge: number;
  hasSiblingInCollege: boolean;
  numberOfSiblingsInCollege: number;

  // Income Information
  studentIncome: number;
  spouseIncome: number;
  parentIncome: number;
  parentSpouseIncome: number;

  // Asset Information
  studentAssets: number;
  parentAssets: number;
  homeEquity: number;
  businessValue: number;
  farmValue: number;

  // Additional Financial Information
  untaxedIncome: number;
  additionalFinancialInfo: number;
  medicalDentalExpenses: number;
  tuitionPaid: number;

  // Academic Information
  gpa: number;
  satScore: number;
  actScore: number;
  intendedMajor: string;
  academicAchievements: string[];

  // Application Information
  stateOfResidence: string;
  citizenshipStatus: 'us_citizen' | 'permanent_resident' | 'international';
  applicationDeadline: string;

  // Aid Preferences
  preferGrants: boolean;
  preferWorkStudy: boolean;
  willingToRelocate: boolean;
  willingToAttendTwoYear: boolean;

  // Analysis Parameters
  analysisYear: number;
  inflationRate: number;
  costOfAttendance: number;
  otherScholarships: number;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface FinancialAidEligibility {
  // FAFSA Results
  expectedFamilyContribution: number;
  studentAidIndex: number;
  totalAidEligibility: number;

  // Aid Breakdown
  federalGrants: number;
  stateGrants: number;
  institutionalGrants: number;
  workStudyEligibility: number;
  federalLoanLimit: number;
  privateLoanOptions: number;

  // Merit-Based Aid
  academicScholarships: number;
  athleticScholarships: number;
  talentScholarships: number;
  leadershipScholarships: number;

  // Need-Based Aid
  pellGrant: number;
  seogGrant: number;
  stateNeedGrant: number;

  // Work Opportunities
  federalWorkStudy: number;
  institutionalWorkStudy: number;
  offCampusJobs: number;

  // Loan Options
  subsidizedStafford: number;
  unsubsidizedStafford: number;
  parentPlus: number;
  privateLoans: number;
}

export interface FinancialAidAnalysis {
  // Executive Summary
  totalAidPackage: number;
  netCostAfterAid: number;
  aidPercentage: number;
  affordabilityRating: 'Excellent' | 'Good' | 'Fair' | 'Limited' | 'Minimal';

  // Key Insights
  strongestAidSources: string[];
  improvementOpportunities: string[];
  applicationDeadlines: string[];
  specialConsiderations: string[];

  // FAFSA Analysis
  fafsaCompletionStatus: string;
  efcBreakdown: string;
  eligibilityFactors: string[];

  // Merit Aid Analysis
  academicProfile: string;
  competitivePositioning: string;
  scholarshipOpportunities: string[];

  // Financial Need Analysis
  demonstratedNeed: number;
  unmetNeed: number;
  gapFundingOptions: string[];

  // State Aid Analysis
  stateAidEligibility: string;
  stateSpecificPrograms: string[];
  reciprocityConsiderations: string;

  // Institutional Aid Analysis
  institutionalEligibility: string;
  priorityDeadlines: string[];
  interviewRequirements: string;

  // Private Aid Analysis
  privateScholarshipMatches: string[];
  corporateSponsorships: string[];
  communityFoundationAid: string[];

  // Loan Analysis
  loanStrategy: string;
  debtBurdenProjection: string;
  loanForgivenessOptions: string[];

  // Tax Implications
  aidTaxImplications: string;
  taxPlanningStrategies: string[];

  // Implementation Plan
  actionTimeline: Array<{
    timeframe: string;
    action: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;

  nextSteps: string[];
  monitoringPlan: string[];
  contingencyPlans: string[];

  // Performance Benchmarks
  aidBenchmarks: Array<{
    category: string;
    studentAmount: number;
    averageAmount: number;
    percentile: number;
  }>;

  // Decision Support
  aidOptimization: string;
  negotiationStrategies: string[];
  appealOptions: string[];
}

export interface CollegeFinancialAidOutputs {
  // Core Results
  eligibility: FinancialAidEligibility;
  totalExpectedAid: number;
  netCostAfterAid: number;

  // Analysis
  analysis: FinancialAidAnalysis;

  // Additional Metrics
  aidGap: number;
  loanBurden: number;
  grantPercentage: number;
  workStudyPercentage: number;
  loanPercentage: number;
}