import { CollegeCostInputs } from './types';

export function validateCollegeCostInputs(inputs: CollegeCostInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Student Information Validation
  if (!inputs.studentAge || inputs.studentAge < 14 || inputs.studentAge > 25) {
    errors.push('Student age must be between 14 and 25');
  }

  if (!inputs.yearsUntilCollege || inputs.yearsUntilCollege < 0 || inputs.yearsUntilCollege > 20) {
    errors.push('Years until college must be between 0 and 20');
  }

  if (!inputs.collegeStartYear || inputs.collegeStartYear < new Date().getFullYear() || inputs.collegeStartYear > new Date().getFullYear() + 20) {
    errors.push('College start year must be within the next 20 years');
  }

  if (!inputs.degreeType || !['associate', 'bachelor', 'masters', 'phd', 'professional'].includes(inputs.degreeType)) {
    errors.push('Please select a valid degree type');
  }

  if (!inputs.collegeType || !['public_in_state', 'public_out_state', 'private_nonprofit', 'private_for_profit', 'community_college'].includes(inputs.collegeType)) {
    errors.push('Please select a valid college type');
  }

  // Cost Information Validation
  if (inputs.annualTuition !== undefined && inputs.annualTuition < 0) {
    errors.push('Annual tuition cannot be negative');
  }

  if (inputs.annualRoomAndBoard !== undefined && inputs.annualRoomAndBoard < 0) {
    errors.push('Annual room and board cannot be negative');
  }

  if (inputs.annualBooksAndSupplies !== undefined && inputs.annualBooksAndSupplies < 0) {
    errors.push('Annual books and supplies cannot be negative');
  }

  if (inputs.annualTransportation !== undefined && inputs.annualTransportation < 0) {
    errors.push('Annual transportation cannot be negative');
  }

  if (inputs.annualPersonalExpenses !== undefined && inputs.annualPersonalExpenses < 0) {
    errors.push('Annual personal expenses cannot be negative');
  }

  if (inputs.annualHealthInsurance !== undefined && inputs.annualHealthInsurance < 0) {
    errors.push('Annual health insurance cannot be negative');
  }

  if (inputs.oneTimeFees !== undefined && inputs.oneTimeFees < 0) {
    errors.push('One-time fees cannot be negative');
  }

  // Financial Aid Validation
  if (inputs.expectedGrants !== undefined && inputs.expectedGrants < 0) {
    errors.push('Expected grants cannot be negative');
  }

  if (inputs.expectedScholarships !== undefined && inputs.expectedScholarships < 0) {
    errors.push('Expected scholarships cannot be negative');
  }

  if (inputs.expectedWorkStudy !== undefined && inputs.expectedWorkStudy < 0) {
    errors.push('Expected work-study cannot be negative');
  }

  if (inputs.expectedStudentLoans !== undefined && inputs.expectedStudentLoans < 0) {
    errors.push('Expected student loans cannot be negative');
  }

  if (inputs.expectedParentLoans !== undefined && inputs.expectedParentLoans < 0) {
    errors.push('Expected parent loans cannot be negative');
  }

  if (inputs.expectedFamilyContribution !== undefined && inputs.expectedFamilyContribution < 0) {
    errors.push('Expected family contribution cannot be negative');
  }

  // Planning Parameters Validation
  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.investmentReturn !== undefined && (inputs.investmentReturn < -10 || inputs.investmentReturn > 25)) {
    errors.push('Investment return must be between -10% and 25%');
  }

  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (!inputs.planningHorizon || inputs.planningHorizon < 1 || inputs.planningHorizon > 20) {
    errors.push('Planning horizon must be between 1 and 20 years');
  }

  // Scenario Analysis Validation
  if (inputs.optimisticGrowth !== undefined && (inputs.optimisticGrowth < -10 || inputs.optimisticGrowth > 30)) {
    errors.push('Optimistic growth must be between -10% and 30%');
  }

  if (inputs.pessimisticGrowth !== undefined && (inputs.pessimisticGrowth < -20 || inputs.pessimisticGrowth > 10)) {
    errors.push('Pessimistic growth must be between -20% and 10%');
  }

  if (inputs.probabilityOptimistic !== undefined && (inputs.probabilityOptimistic < 0 || inputs.probabilityOptimistic > 100)) {
    errors.push('Optimistic probability must be between 0% and 100%');
  }

  if (inputs.probabilityPessimistic !== undefined && (inputs.probabilityPessimistic < 0 || inputs.probabilityPessimistic > 100)) {
    errors.push('Pessimistic probability must be between 0% and 100%');
  }

  if ((inputs.probabilityOptimistic || 0) + (inputs.probabilityPessimistic || 0) > 100) {
    errors.push('Combined optimistic and pessimistic probabilities cannot exceed 100%');
  }

  // Additional Options Validation
  if (inputs.includeSummerSchool && (inputs.summerSchoolCost === undefined || inputs.summerSchoolCost < 0)) {
    errors.push('Summer school cost must be provided and cannot be negative when summer school is included');
  }

  if (inputs.includeStudyAbroad && (inputs.studyAbroadCost === undefined || inputs.studyAbroadCost < 0)) {
    errors.push('Study abroad cost must be provided and cannot be negative when study abroad is included');
  }

  if (inputs.includeInternships && (inputs.internshipEarnings === undefined || inputs.internshipEarnings < 0)) {
    errors.push('Internship earnings must be provided and cannot be negative when internships are included');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCollegeCostBusinessRules(inputs: CollegeCostInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.studentAge && inputs.yearsUntilCollege && (inputs.studentAge + inputs.yearsUntilCollege) < 18) {
    warnings.push('Student will be under 18 when starting college - consider age-appropriate programs');
  }

  if (inputs.studentAge && inputs.yearsUntilCollege && (inputs.studentAge + inputs.yearsUntilCollege) > 25) {
    warnings.push('Student will be over 25 when starting college - may affect financial aid eligibility');
  }

  if (inputs.annualTuition && inputs.annualTuition > 60000) {
    warnings.push('Tuition costs are very high - consider cost-saving alternatives');
  }

  if (inputs.annualTuition && inputs.annualTuition < 5000) {
    warnings.push('Tuition costs are very low - verify this is for the intended degree program');
  }

  if (inputs.inflationRate && inputs.inflationRate > 8) {
    warnings.push('High inflation rate assumption may significantly increase total costs');
  }

  if (inputs.inflationRate && inputs.inflationRate < 1) {
    warnings.push('Low inflation rate may not reflect historical college cost increases');
  }

  if (inputs.investmentReturn && inputs.investmentReturn > 15) {
    warnings.push('High investment return assumptions may be unrealistic for college savings');
  }

  if (inputs.investmentReturn && inputs.investmentReturn < 3) {
    warnings.push('Low investment return may make saving goals difficult to achieve');
  }

  if (inputs.yearsUntilCollege && inputs.yearsUntilCollege < 2) {
    warnings.push('Limited time until college - consider immediate savings strategies');
  }

  if (inputs.yearsUntilCollege && inputs.yearsUntilCollege > 15) {
    warnings.push('Long time horizon allows for more aggressive investment strategies');
  }

  if (inputs.planningHorizon && inputs.planningHorizon < 4) {
    warnings.push('Short planning horizon may not capture full degree costs');
  }

  if (inputs.planningHorizon && inputs.planningHorizon > 12) {
    warnings.push('Long planning horizon increases uncertainty in cost projections');
  }

  const totalAid = (inputs.expectedGrants || 0) + (inputs.expectedScholarships || 0) +
                   (inputs.expectedWorkStudy || 0) + (inputs.expectedStudentLoans || 0) +
                   (inputs.expectedParentLoans || 0) + (inputs.expectedFamilyContribution || 0);

  const baseCost = (inputs.annualTuition || 0) + (inputs.annualRoomAndBoard || 0) +
                   (inputs.annualBooksAndSupplies || 0) + (inputs.annualTransportation || 0) +
                   (inputs.annualPersonalExpenses || 0) + (inputs.annualHealthInsurance || 0);

  if (baseCost > 0 && totalAid / baseCost < 0.3) {
    warnings.push('Low financial aid percentage - explore additional aid opportunities');
  }

  if (baseCost > 0 && totalAid / baseCost > 0.8) {
    warnings.push('High financial aid percentage - verify aid is sustainable');
  }

  if (inputs.expectedStudentLoans && inputs.expectedStudentLoans > 50000) {
    warnings.push('High student loan amounts may impact future financial flexibility');
  }

  if (inputs.expectedParentLoans && inputs.expectedParentLoans > 100000) {
    warnings.push('High parent loan amounts may affect retirement planning');
  }

  if (inputs.optimisticGrowth && inputs.pessimisticGrowth &&
      inputs.optimisticGrowth - inputs.pessimisticGrowth > 20) {
    warnings.push('Wide scenario range indicates high uncertainty in cost projections');
  }

  if (inputs.probabilityOptimistic && inputs.probabilityOptimistic > 70) {
    warnings.push('High optimistic probability may lead to overconfidence in planning');
  }

  if (inputs.probabilityPessimistic && inputs.probabilityPessimistic > 50) {
    warnings.push('High pessimistic probability suggests conservative planning approach');
  }

  if (inputs.includeSummerSchool && inputs.summerSchoolCost && inputs.summerSchoolCost > 10000) {
    warnings.push('High summer school costs may not provide good value');
  }

  if (inputs.includeStudyAbroad && inputs.studyAbroadCost && inputs.studyAbroadCost > 20000) {
    warnings.push('High study abroad costs - consider more affordable alternatives');
  }

  if (inputs.includeInternships && inputs.internshipEarnings && inputs.internshipEarnings < 10000) {
    warnings.push('Low internship earnings may not offset opportunity costs');
  }

  if (inputs.collegeType === 'private_for_profit') {
    warnings.push('For-profit colleges may have limited financial aid and higher debt loads');
  }

  if (inputs.collegeType === 'public_out_state' && inputs.annualTuition && inputs.annualTuition > 30000) {
    warnings.push('OutOfState public tuition is high - consider in-state options');
  }

  if (inputs.degreeType === 'phd' || inputs.degreeType === 'professional') {
    warnings.push('Advanced degrees have longer timelines and higher total costs');
  }

  if (inputs.location && inputs.location.toLowerCase().includes('new york') && inputs.annualRoomAndBoard && inputs.annualRoomAndBoard > 20000) {
    warnings.push('New York City costs are extremely high - consider housing alternatives');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}