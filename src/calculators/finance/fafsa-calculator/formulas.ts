import { FAFSAInputs, FAFSAOutputs } from './types';

/**
 * Calculate comprehensive FAFSA analysis including EFC and aid eligibility
 */
export function calculateFAFSA(inputs: FAFSAInputs): FAFSAOutputs {
  const {
    studentAge,
    isDependent,
    maritalStatus,
    hasChildren,
    numberOfChildren,
    parentIncome,
    parentAssets,
    parentFilingStatus,
    numberOfFamilyMembers,
    numberOfCollegeStudents,
    studentIncome,
    studentAssets,
    studentSavings,
    studentInvestments,
    homeEquity,
    businessValue,
    farmValue,
    gradeLevel,
    enrollmentStatus,
    costOfAttendance,
    tuition,
    roomAndBoard,
    booksAndSupplies,
    transportation,
    personalExpenses,
    stateOfResidence,
    attendingInState,
    hasDisability,
    isVeteran,
    isFosterYouth,
    hasSpecialCircumstances,
    specialCircumstancesDescription
  } = inputs;

  // Calculate Expected Family Contribution (EFC)
  const expectedFamilyContribution = calculateEFC(inputs);
  const studentContribution = calculateStudentContribution(inputs);
  const parentContribution = isDependent ? expectedFamilyContribution - studentContribution : 0;

  // Calculate financial need
  const totalAid = 0; // This would be calculated based on actual aid received
  const financialNeed = Math.max(0, costOfAttendance - expectedFamilyContribution);
  const unmetNeed = Math.max(0, financialNeed - totalAid);

  // Calculate aid eligibility
  const pellGrantEligibility = calculatePellGrantEligibility(inputs, financialNeed);
  const federalWorkStudyEligibility = calculateWorkStudyEligibility(inputs);
  const federalLoanEligibility = calculateFederalLoanEligibility(inputs);

  // Calculate state aid
  const stateGrantEligibility = calculateStateGrantEligibility(inputs, stateOfResidence);
  const stateScholarshipEligibility = calculateStateScholarshipEligibility(inputs, stateOfResidence);

  // Calculate private aid
  const institutionalAidEligibility = calculateInstitutionalAidEligibility(inputs);
  const privateScholarshipEligibility = calculatePrivateScholarshipEligibility(inputs);

  // Calculate aid breakdown
  const grants = pellGrantEligibility + stateGrantEligibility;
  const scholarships = stateScholarshipEligibility + privateScholarshipEligibility;
  const workStudy = federalWorkStudyEligibility;
  const federalLoans = federalLoanEligibility;
  const privateLoans = Math.max(0, unmetNeed - federalLoans);

  // Calculate net cost
  const netCost = costOfAttendance - (grants + scholarships + workStudy);
  const outOfPocket = netCost - federalLoans - privateLoans;

  // Generate recommendations
  const recommendedActions = generateRecommendedActions(inputs);
  const priorityApplications = generatePriorityApplications(inputs);
  const additionalResources = generateAdditionalResources(inputs);

  // Determine eligibility flags
  const pellEligible = financialNeed > 0 && expectedFamilyContribution < 6000;
  const subsidizedLoanEligible = isDependent && financialNeed > 0;
  const workStudyEligible = financialNeed > 0;

  // Special considerations
  const specialCircumstances = hasSpecialCircumstances || hasDisability || isVeteran || isFosterYouth;
  const dependencyOverride = !isDependent && studentAge >= 24;
  const professionalJudgment = specialCircumstances || dependencyOverride;

  return {
    expectedFamilyContribution,
    studentContribution,
    parentContribution,
    costOfAttendance,
    totalAid,
    financialNeed,
    unmetNeed,
    pellGrantEligibility,
    federalWorkStudyEligibility,
    federalLoanEligibility,
    stateGrantEligibility,
    stateScholarshipEligibility,
    institutionalAidEligibility,
    privateScholarshipEligibility,
    grants,
    scholarships,
    workStudy,
    federalLoans,
    privateLoans,
    netCost,
    outOfPocket,
    recommendedActions,
    priorityApplications,
    additionalResources,
    pellEligible,
    subsidizedLoanEligible,
    workStudyEligible,
    specialCircumstances,
    dependencyOverride,
    professionalJudgment
  };
}

/**
 * Calculate Expected Family Contribution (EFC)
 */
function calculateEFC(inputs: FAFSAInputs): number {
  const {
    isDependent,
    parentIncome,
    parentAssets,
    studentIncome,
    studentAssets,
    numberOfFamilyMembers,
    numberOfCollegeStudents,
    homeEquity,
    businessValue,
    farmValue
  } = inputs;

  if (!isDependent) {
    // Independent student EFC
    const availableIncome = studentIncome * 0.5;
    const assetContribution = (studentAssets + homeEquity) * 0.35;
    return availableIncome + assetContribution;
  }

  // Dependent student EFC
  const parentAvailableIncome = parentIncome * 0.47;
  const studentAvailableIncome = studentIncome * 0.5;

  const parentAssetContribution = (parentAssets + homeEquity + businessValue + farmValue) * 0.12;
  const studentAssetContribution = studentAssets * 0.35;

  const familySizeAdjustment = Math.max(0, 4000 - (numberOfFamilyMembers - numberOfCollegeStudents) * 2000);

  return parentAvailableIncome + studentAvailableIncome + parentAssetContribution + studentAssetContribution - familySizeAdjustment;
}

/**
 * Calculate student contribution to EFC
 */
function calculateStudentContribution(inputs: FAFSAInputs): number {
  const { studentIncome, studentAssets, studentSavings, studentInvestments } = inputs;

  const incomeContribution = studentIncome * 0.5;
  const assetContribution = (studentAssets + studentSavings + studentInvestments) * 0.35;

  return incomeContribution + assetContribution;
}

/**
 * Calculate Pell Grant eligibility
 */
function calculatePellGrantEligibility(inputs: FAFSAInputs, financialNeed: number): number {
  const efc = calculateEFC(inputs);
  const { enrollmentStatus } = inputs;

  if (efc >= 6000 || financialNeed <= 0) {
    return 0;
  }

  // Base Pell Grant amount (2024-2025)
  const baseAmount = 7420;

  // Adjust for enrollment status
  const enrollmentMultiplier = {
    'full-time': 1.0,
    'three-quarter': 0.75,
    'half-time': 0.5,
    'less-half': 0.25
  }[enrollmentStatus] || 1.0;

  // Adjust for EFC
  const efcAdjustment = Math.max(0, (6000 - efc) / 6000);

  return Math.round(baseAmount * enrollmentMultiplier * efcAdjustment);
}

/**
 * Calculate Federal Work-Study eligibility
 */
function calculateWorkStudyEligibility(inputs: FAFSAInputs): number {
  const { enrollmentStatus, costOfAttendance } = inputs;
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, costOfAttendance - efc);

  if (!financialNeed || financialNeed <= 0) return 0;

  // Average work-study award
  const baseAmount = 3500;

  // Adjust for enrollment status
  const enrollmentMultiplier = {
    'full-time': 1.0,
    'three-quarter': 0.75,
    'half-time': 0.5,
    'less-half': 0.25
  }[enrollmentStatus] || 1.0;

  return Math.round(baseAmount * enrollmentMultiplier);
}

/**
 * Calculate Federal Loan eligibility
 */
function calculateFederalLoanEligibility(inputs: FAFSAInputs): number {
  const { isDependent, gradeLevel, costOfAttendance } = inputs;
  const efc = calculateEFC(inputs);

  const subsidizedLimit = isDependent ? 23000 : 57000;
  const unsubsidizedLimit = isDependent ? 8000 : 20000;

  const annualLimit = gradeLevel === 'freshman' ? 5500 :
                     gradeLevel === 'sophomore' ? 6500 :
                     gradeLevel === 'junior' ? 7500 : 7500;

  const remainingNeed = Math.max(0, costOfAttendance - efc);

  return Math.min(annualLimit, remainingNeed, subsidizedLimit + unsubsidizedLimit);
}

/**
 * Calculate state grant eligibility
 */
function calculateStateGrantEligibility(inputs: FAFSAInputs, state: string): number {
  const { costOfAttendance, attendingInState } = inputs;
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, costOfAttendance - efc);

  if (!financialNeed || financialNeed <= 0) return 0;

  // Average state grant amount (varies by state)
  const baseAmount = attendingInState ? 3000 : 1500;

  // Adjust for EFC
  const efcAdjustment = Math.max(0, (10000 - efc) / 10000);

  return Math.round(baseAmount * efcAdjustment);
}

/**
 * Calculate state scholarship eligibility
 */
function calculateStateScholarshipEligibility(inputs: FAFSAInputs, state: string): number {
  const { gradeLevel, hasDisability, isVeteran, costOfAttendance } = inputs;
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, costOfAttendance - efc);

  if (!financialNeed || financialNeed <= 0) return 0;

  let amount = 0;

  // Merit-based scholarships
  if (gradeLevel !== 'graduate') {
    amount += 1000; // Base merit scholarship
  }

  // Special category scholarships
  if (hasDisability) amount += 2000;
  if (isVeteran) amount += 1500;

  return amount;
}

/**
 * Calculate institutional aid eligibility
 */
function calculateInstitutionalAidEligibility(inputs: FAFSAInputs): number {
  const { costOfAttendance, gradeLevel } = inputs;
  const efc = calculateEFC(inputs);
  const need = Math.max(0, costOfAttendance - efc);

  // Institutional aid typically covers 20-40% of need
  const coverageRate = gradeLevel === 'graduate' ? 0.3 : 0.25;

  return Math.round(need * coverageRate);
}

/**
 * Calculate private scholarship eligibility
 */
function calculatePrivateScholarshipEligibility(inputs: FAFSAInputs): number {
  const { hasDisability, isVeteran, isFosterYouth, costOfAttendance } = inputs;
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, costOfAttendance - efc);

  if (!financialNeed || financialNeed <= 0) return 0;

  let amount = 0;

  // Private scholarships for special circumstances
  if (hasDisability) amount += 5000;
  if (isVeteran) amount += 3000;
  if (isFosterYouth) amount += 4000;

  // General private scholarships
  amount += Math.min(2000, financialNeed * 0.1);

  return amount;
}

/**
 * Generate recommended actions
 */
function generateRecommendedActions(inputs: FAFSAInputs): string[] {
  const actions: string[] = [];
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, inputs.costOfAttendance - efc);

  if (efc > 6000) {
    actions.push('Consider private student loans or alternative financing');
  }

  if (financialNeed > 0) {
    actions.push('Apply for all available federal and state aid programs');
  }

  if (inputs.hasSpecialCircumstances) {
    actions.push('Submit a special circumstances appeal to your school\'s financial aid office');
  }

  if (!inputs.isDependent) {
    actions.push('Review independent student status and appeal if circumstances have changed');
  }

  actions.push('Complete FAFSA as early as possible (October 1 for priority consideration)');
  actions.push('Research and apply for private scholarships');
  actions.push('Contact your school\'s financial aid office for additional assistance');

  return actions;
}

/**
 * Generate priority applications
 */
function generatePriorityApplications(inputs: FAFSAInputs): string[] {
  const applications: string[] = [];
  const efc = calculateEFC(inputs);
  const financialNeed = Math.max(0, inputs.costOfAttendance - efc);
  const pellEligible = financialNeed > 0 && efc < 6000;
  const subsidizedLoanEligible = inputs.isDependent && financialNeed > 0;
  const workStudyEligible = financialNeed > 0;

  if (financialNeed > 0) {
    applications.push('FAFSA (Free Application for Federal Student Aid)');
    applications.push('State financial aid applications');
  }

  if (pellEligible) {
    applications.push('Federal Pell Grant');
  }

  if (subsidizedLoanEligible) {
    applications.push('Federal Direct Subsidized Loans');
  }

  if (workStudyEligible) {
    applications.push('Federal Work-Study Program');
  }

  applications.push('Institutional financial aid applications');
  applications.push('Private scholarship databases (Fastweb, Scholarships.com)');

  return applications;
}

/**
 * Generate additional resources
 */
function generateAdditionalResources(inputs: FAFSAInputs): string[] {
  const resources: string[] = [];

  resources.push('Federal Student Aid website (fafsa.ed.gov)');
  resources.push('College Board\'s financial aid resources');
  resources.push('Your school\'s financial aid office');
  resources.push('State higher education agency');

  if (inputs.hasDisability) {
    resources.push('Office for Civil Rights disability resources');
  }

  if (inputs.isVeteran) {
    resources.push('VA education benefits (GI Bill)');
  }

  resources.push('National Association of Student Financial Aid Administrators');

  return resources;
}

/**
 * Validate FAFSA inputs
 */
export function validateFAFSAInputs(inputs: FAFSAInputs): string[] {
  const errors: string[] = [];

  if (inputs.studentAge < 16 || inputs.studentAge > 30) {
    errors.push('Student age must be between 16 and 30');
  }

  if (inputs.costOfAttendance < 0) {
    errors.push('Cost of attendance cannot be negative');
  }

  if (inputs.tuition < 0) {
    errors.push('Tuition cannot be negative');
  }

  if (inputs.roomAndBoard < 0) {
    errors.push('Room and board cannot be negative');
  }

  if (inputs.booksAndSupplies < 0) {
    errors.push('Books and supplies cannot be negative');
  }

  if (inputs.transportation < 0) {
    errors.push('Transportation cannot be negative');
  }

  if (inputs.personalExpenses < 0) {
    errors.push('Personal expenses cannot be negative');
  }

  if (inputs.parentIncome < 0) {
    errors.push('Parent income cannot be negative');
  }

  if (inputs.parentAssets < 0) {
    errors.push('Parent assets cannot be negative');
  }

  if (inputs.studentIncome < 0) {
    errors.push('Student income cannot be negative');
  }

  if (inputs.studentAssets < 0) {
    errors.push('Student assets cannot be negative');
  }

  if (inputs.numberOfFamilyMembers < 1) {
    errors.push('Number of family members must be at least 1');
  }

  if (inputs.numberOfCollegeStudents < 0) {
    errors.push('Number of college students cannot be negative');
  }

  if (inputs.numberOfChildren < 0) {
    errors.push('Number of children cannot be negative');
  }

  if (inputs.homeEquity < 0) {
    errors.push('Home equity cannot be negative');
  }

  if (inputs.businessValue < 0) {
    errors.push('Business value cannot be negative');
  }

  if (inputs.farmValue < 0) {
    errors.push('Farm value cannot be negative');
  }

  return errors;
}