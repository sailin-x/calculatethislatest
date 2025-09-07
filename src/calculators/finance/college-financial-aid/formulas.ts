import {
  CollegeFinancialAidInputs,
  CollegeFinancialAidOutputs,
  FinancialAidEligibility,
  FinancialAidAnalysis
} from './types';

// Helper function to calculate FAFSA Expected Family Contribution (EFC)
function calculateEFC(inputs: CollegeFinancialAidInputs): number {
  const {
    isDependent,
    studentIncome,
    spouseIncome,
    parentIncome,
    parentSpouseIncome,
    studentAssets,
    parentAssets,
    numberOfParents,
    hasSiblingInCollege,
    numberOfSiblingsInCollege
  } = inputs;

  if (!isDependent) {
    // Independent student EFC calculation
    const totalIncome = studentIncome + (spouseIncome || 0);
    const availableIncome = totalIncome * 0.5; // Simplified income protection allowance
    const assetContribution = studentAssets * 0.2; // 20% of assets
    return Math.max(0, availableIncome + assetContribution);
  } else {
    // Dependent student EFC calculation
    const totalParentIncome = (parentIncome || 0) + (parentSpouseIncome || 0);
    const familySize = numberOfParents + 1 + (hasSiblingInCollege ? numberOfSiblingsInCollege : 0);

    // Income protection allowance based on family size
    const incomeProtection = 6000 + (familySize - 2) * 4000;
    const availableIncome = Math.max(0, totalParentIncome - incomeProtection);

    // Asset contribution (excluding home equity)
    const parentAssetContribution = (parentAssets || 0) * 0.12; // 12% of parent assets
    const studentAssetContribution = studentAssets * 0.2; // 20% of student assets

    return Math.max(0, availableIncome * 0.22 + parentAssetContribution + studentAssetContribution);
  }
}

// Helper function to calculate Pell Grant eligibility
function calculatePellGrant(efc: number, costOfAttendance: number): number {
  if (efc >= 5841) return 0; // No Pell Grant eligibility

  const maximumPell = 6930; // 2024-2025 maximum
  const federalShare = Math.max(0, costOfAttendance - efc);
  const pellShare = Math.min(federalShare, maximumPell);

  // Pell Grant formula: Maximum - (EFC * 0.5)
  return Math.max(0, maximumPell - (efc * 0.5));
}

// Helper function to calculate merit-based aid
function calculateMeritAid(inputs: CollegeFinancialAidInputs): number {
  const { gpa, satScore, actScore, academicAchievements } = inputs;

  let meritScore = 0;

  // GPA contribution (0-4.0 scale)
  if (gpa >= 4.0) meritScore += 1000;
  else if (gpa >= 3.8) meritScore += 800;
  else if (gpa >= 3.5) meritScore += 600;
  else if (gpa >= 3.0) meritScore += 400;
  else meritScore += 200;

  // Test score contribution
  const combinedScore = Math.max(satScore || 0, (actScore || 0) * 10);
  if (combinedScore >= 1500) meritScore += 1000;
  else if (combinedScore >= 1400) meritScore += 800;
  else if (combinedScore >= 1300) meritScore += 600;
  else if (combinedScore >= 1200) meritScore += 400;
  else meritScore += 200;

  // Academic achievements bonus
  meritScore += (academicAchievements?.length || 0) * 200;

  return Math.min(meritScore, 5000); // Cap at $5,000
}

// Helper function to calculate work-study eligibility
function calculateWorkStudyEligibility(efc: number): number {
  if (efc > 5000) return 0;

  // Work-study eligibility based on need
  const maxWorkStudy = 5000;
  return Math.max(0, maxWorkStudy - (efc * 0.5));
}

// Helper function to calculate loan limits
function calculateLoanLimits(efc: number, year: 'freshman' | 'sophomore' | 'junior' | 'senior'): {
  subsidized: number;
  unsubsidized: number;
} {
  const limits = {
    freshman: { subsidized: 3500, unsubsidized: 5500 },
    sophomore: { subsidized: 4500, unsubsidized: 6500 },
    junior: { subsidized: 5500, unsubsidized: 7500 },
    senior: { subsidized: 5500, unsubsidized: 7500 }
  };

  const yearLimits = limits[year];

  // Reduce subsidized amount based on EFC
  const subsidizedReduction = Math.min(yearLimits.subsidized, efc * 0.1);
  const subsidized = Math.max(0, yearLimits.subsidized - subsidizedReduction);

  return {
    subsidized,
    unsubsidized: yearLimits.unsubsidized
  };
}

// Helper function to assess affordability
function assessAffordability(totalAid: number, costOfAttendance: number): string {
  const aidPercentage = (totalAid / costOfAttendance) * 100;

  if (aidPercentage >= 80) return 'Excellent';
  if (aidPercentage >= 60) return 'Good';
  if (aidPercentage >= 40) return 'Fair';
  if (aidPercentage >= 20) return 'Limited';
  return 'Minimal';
}

// Main calculation function
export function calculateCollegeFinancialAid(inputs: CollegeFinancialAidInputs): CollegeFinancialAidOutputs {
  const {
    costOfAttendance,
    otherScholarships,
    analysisYear,
    isDependent
  } = inputs;

  // Calculate Expected Family Contribution
  const efc = calculateEFC(inputs);

  // Calculate Pell Grant
  const pellGrant = calculatePellGrant(efc, costOfAttendance);

  // Calculate merit-based aid
  const meritAid = calculateMeritAid(inputs);

  // Calculate work-study eligibility
  const workStudyEligibility = calculateWorkStudyEligibility(efc);

  // Calculate loan limits (assuming freshman year)
  const loanLimits = calculateLoanLimits(efc, 'freshman');

  // Calculate total aid package
  const totalAid = pellGrant + meritAid + workStudyEligibility +
                   loanLimits.subsidized + loanLimits.unsubsidized +
                   (otherScholarships || 0);

  // Calculate net cost
  const netCostAfterAid = Math.max(0, costOfAttendance - totalAid);

  // Create eligibility object
  const eligibility: FinancialAidEligibility = {
    expectedFamilyContribution: efc,
    studentAidIndex: efc,
    totalAidEligibility: totalAid,

    federalGrants: pellGrant,
    stateGrants: pellGrant * 0.2, // Estimated state supplement
    institutionalGrants: meritAid * 0.8,
    workStudyEligibility,
    federalLoanLimit: loanLimits.subsidized + loanLimits.unsubsidized,
    privateLoanOptions: Math.max(0, netCostAfterAid - loanLimits.unsubsidized),

    academicScholarships: meritAid * 0.6,
    athleticScholarships: 0, // Not calculated here
    talentScholarships: meritAid * 0.2,
    leadershipScholarships: meritAid * 0.2,

    pellGrant,
    seogGrant: Math.min(4000, pellGrant * 0.1),
    stateNeedGrant: pellGrant * 0.15,

    federalWorkStudy: workStudyEligibility,
    institutionalWorkStudy: workStudyEligibility * 0.5,
    offCampusJobs: 5000, // Estimated off-campus earnings

    subsidizedStafford: loanLimits.subsidized,
    unsubsidizedStafford: loanLimits.unsubsidized,
    parentPlus: isDependent ? Math.max(0, netCostAfterAid * 0.5) : 0,
    privateLoans: Math.max(0, netCostAfterAid - loanLimits.unsubsidized - (isDependent ? Math.max(0, netCostAfterAid * 0.5) : 0))
  };

  // Create analysis object
  const analysis: FinancialAidAnalysis = {
    totalAidPackage: totalAid,
    netCostAfterAid: netCostAfterAid,
    aidPercentage: (totalAid / costOfAttendance) * 100,
    affordabilityRating: assessAffordability(totalAid, costOfAttendance) as any,

    strongestAidSources: [
      pellGrant > 0 ? 'Federal Pell Grant' : '',
      meritAid > 1000 ? 'Merit-Based Scholarships' : '',
      workStudyEligibility > 0 ? 'Federal Work-Study' : '',
      'Federal Student Loans'
    ].filter(Boolean),

    improvementOpportunities: [
      efc > 5000 ? 'Consider independent student status' : '',
      meritAid < 2000 ? 'Improve academic profile for merit aid' : '',
      'Apply for additional private scholarships',
      'Consider state-specific aid programs'
    ].filter(Boolean),

    applicationDeadlines: [
      'FAFSA: June 30th (priority)',
      'CSS Profile: Varies by school',
      'Institutional applications: Varies by school'
    ],

    specialConsiderations: [
      isDependent ? 'Parent income affects EFC significantly' : 'Independent student status may improve aid',
      meritAid > 0 ? 'Strong academic profile qualifies for merit aid' : 'Consider academic improvement for merit aid',
      'Review state residency requirements for in-state tuition'
    ].filter(Boolean),

    fafsaCompletionStatus: 'Complete FAFSA with accurate information',
    efcBreakdown: `EFC of $${efc.toLocaleString()} based on income and assets`,
    eligibilityFactors: [
      `Income: $${(inputs.studentIncome + (inputs.spouseIncome || 0) + (inputs.parentIncome || 0) + (inputs.parentSpouseIncome || 0)).toLocaleString()}`,
      `Assets: $${((inputs.studentAssets || 0) + (inputs.parentAssets || 0)).toLocaleString()}`,
      `Family Size: ${inputs.numberOfParents + 1 + (inputs.hasSiblingInCollege ? inputs.numberOfSiblingsInCollege : 0)}`
    ],

    academicProfile: `GPA: ${inputs.gpa}, Test Scores: SAT ${inputs.satScore || 'N/A'}/ACT ${inputs.actScore || 'N/A'}`,
    competitivePositioning: meritAid > 2000 ? 'Strong candidate for merit aid' : 'Consider strengthening academic profile',
    scholarshipOpportunities: [
      'University merit scholarships',
      'Departmental scholarships',
      'Private scholarship databases',
      'Local community foundations'
    ],

    demonstratedNeed: Math.max(0, costOfAttendance - efc),
    unmetNeed: netCostAfterAid,
    gapFundingOptions: [
      'Private student loans',
      'Additional scholarships',
      'Part-time employment',
      'Payment plans'
    ],

    stateAidEligibility: `Check ${inputs.stateOfResidence} state aid programs`,
    stateSpecificPrograms: [`${inputs.stateOfResidence} State Grant Programs`],
    reciprocityConsiderations: 'Review state reciprocity agreements',

    institutionalEligibility: meritAid > 0 ? 'Eligible for institutional merit aid' : 'Limited institutional aid eligibility',
    priorityDeadlines: ['Early Decision', 'Early Action', 'Regular Decision'],
    interviewRequirements: 'Some schools require admissions interviews',

    privateScholarshipMatches: [
      'Fastweb scholarship database',
      'Unigo scholarship search',
      'Local community foundations',
      'Professional association scholarships'
    ],

    corporateSponsorships: [
      'Employer tuition assistance',
      'Corporate scholarship programs',
      'Professional association awards'
    ],

    communityFoundationAid: [
      'Local United Way',
      'Community foundation scholarships',
      'Rotary Club awards'
    ],

    loanStrategy: `Federal loans first, then private loans if needed. Total borrowing: $${eligibility.federalLoanLimit.toLocaleString()}`,
    debtBurdenProjection: `Monthly payment estimate: $${Math.round((eligibility.federalLoanLimit * 0.01))}-${Math.round((eligibility.federalLoanLimit * 0.015))}`,
    loanForgivenessOptions: [
      'Public Service Loan Forgiveness',
      'Teacher Loan Forgiveness',
      'Income-Driven Repayment Plans'
    ],

    aidTaxImplications: 'Most grants and scholarships are tax-free',
    taxPlanningStrategies: [
      'Consider 529 plan withdrawals',
      'Review education tax credits',
      'Plan for tax implications of loans'
    ],

    actionTimeline: [
      {
        timeframe: 'Immediate (1-2 weeks)',
        action: 'Complete FAFSA application',
        priority: 'High'
      },
      {
        timeframe: 'Next 4-6 weeks',
        action: 'Apply for institutional aid',
        priority: 'High'
      },
      {
        timeframe: 'Next 2-3 months',
        action: 'Apply for private scholarships',
        priority: 'Medium'
      },
      {
        timeframe: 'Ongoing',
        action: 'Monitor aid awards and appeal if needed',
        priority: 'Medium'
      }
    ],

    nextSteps: [
      'Complete FAFSA at fafsa.ed.gov',
      'Research institutional aid deadlines',
      'Create scholarship application calendar',
      'Prepare tax documents for aid applications'
    ],

    monitoringPlan: [
      'Track application deadlines',
      'Monitor aid award letters',
      'Compare aid packages between schools',
      'Review renewal requirements'
    ],

    contingencyPlans: [
      'Apply to schools with strong aid programs',
      'Consider part-time enrollment',
      'Explore community college options',
      'Research loan forgiveness programs'
    ],

    aidBenchmarks: [
      {
        category: 'Federal Pell Grant',
        studentAmount: pellGrant,
        averageAmount: 4000,
        percentile: pellGrant > 4000 ? 75 : pellGrant > 2000 ? 50 : 25
      },
      {
        category: 'Merit Scholarships',
        studentAmount: meritAid,
        averageAmount: 2000,
        percentile: meritAid > 2000 ? 75 : meritAid > 1000 ? 50 : 25
      }
    ],

    aidOptimization: `Maximize aid through FAFSA completion, merit aid, and private scholarships`,
    negotiationStrategies: [
      'Compare aid packages between schools',
      'Appeal initial aid awards',
      'Highlight special circumstances',
      'Consider professional aid negotiation services'
    ],

    appealOptions: [
      'Special circumstances appeal',
      'Professional judgment review',
      'Dependency status appeal',
      'Merit aid reconsideration'
    ]
  };

  return {
    eligibility,
    totalExpectedAid: totalAid,
    netCostAfterAid: netCostAfterAid,
    analysis,
    aidGap: netCostAfterAid,
    loanBurden: eligibility.federalLoanLimit,
    grantPercentage: ((pellGrant + meritAid) / totalAid) * 100,
    workStudyPercentage: (workStudyEligibility / totalAid) * 100,
    loanPercentage: (eligibility.federalLoanLimit / totalAid) * 100
  };
}

// Validation function
export function validateCollegeFinancialAidInputs(inputs: CollegeFinancialAidInputs): string[] {
  const errors: string[] = [];

  if (!inputs.studentAge || inputs.studentAge < 14 || inputs.studentAge > 25) {
    errors.push('Student age must be between 14 and 25');
  }

  if (inputs.studentIncome !== undefined && inputs.studentIncome < 0) {
    errors.push('Student income cannot be negative');
  }

  if (inputs.parentIncome !== undefined && inputs.parentIncome < 0) {
    errors.push('Parent income cannot be negative');
  }

  if (inputs.studentAssets !== undefined && inputs.studentAssets < 0) {
    errors.push('Student assets cannot be negative');
  }

  if (inputs.parentAssets !== undefined && inputs.parentAssets < 0) {
    errors.push('Parent assets cannot be negative');
  }

  if (inputs.gpa !== undefined && (inputs.gpa < 0 || inputs.gpa > 4.0)) {
    errors.push('GPA must be between 0.0 and 4.0');
  }

  if (inputs.satScore !== undefined && (inputs.satScore < 400 || inputs.satScore > 1600)) {
    errors.push('SAT score must be between 400 and 1600');
  }

  if (inputs.actScore !== undefined && (inputs.actScore < 1 || inputs.actScore > 36)) {
    errors.push('ACT score must be between 1 and 36');
  }

  if (!inputs.costOfAttendance || inputs.costOfAttendance <= 0) {
    errors.push('Cost of attendance must be greater than 0');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.analysisYear && (inputs.analysisYear < new Date().getFullYear() || inputs.analysisYear > new Date().getFullYear() + 10)) {
    errors.push('Analysis year must be within the next 10 years');
  }

  return errors;
}