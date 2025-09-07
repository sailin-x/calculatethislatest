import { CollegeCostInputs } from './types';

export function validateStudentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 14 || value > 25) {
    return { isValid: false, error: 'Student age must be between 14 and 25' };
  }

  if (value < 16) {
    return { isValid: true, error: 'Early college entry may require special arrangements' };
  }

  if (value > 22) {
    return { isValid: true, error: 'Older students may have different financial aid options' };
  }

  return { isValid: true };
}

export function validateYearsUntilCollege(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 20) {
    return { isValid: false, error: 'Years until college must be between 0 and 20' };
  }

  if (value < 1) {
    return { isValid: true, error: 'Immediate college attendance requires accelerated planning' };
  }

  if (value > 10) {
    return { isValid: true, error: 'Long time horizon allows for strategic savings planning' };
  }

  return { isValid: true };
}

export function validateCollegeStartYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const currentYear = new Date().getFullYear();
  if (!value || typeof value !== 'number' || value < currentYear || value > currentYear + 20) {
    return { isValid: false, error: 'College start year must be within the next 20 years' };
  }

  return { isValid: true };
}

export function validateDegreeType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['associate', 'bachelor', 'masters', 'phd', 'professional'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid degree type' };
  }

  if (value === 'phd' || value === 'professional') {
    return { isValid: true, error: 'Advanced degrees have longer timelines and higher costs' };
  }

  return { isValid: true };
}

export function validateCollegeType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['public_in_state', 'public_out_state', 'private_nonprofit', 'private_for_profit', 'community_college'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid college type' };
  }

  if (value === 'private_for_profit') {
    return { isValid: true, error: 'For-profit colleges may have limited financial aid' };
  }

  if (value === 'public_out_state') {
    return { isValid: true, error: 'Out-of-state tuition is typically higher' };
  }

  return { isValid: true };
}

export function validateAnnualTuition(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual tuition cannot be negative' };
  }

  if (value > 60000) {
    return { isValid: true, error: 'Tuition costs are very high - consider alternatives' };
  }

  if (value < 5000) {
    return { isValid: true, error: 'Verify this tuition amount is for the intended program' };
  }

  return { isValid: true };
}

export function validateAnnualRoomAndBoard(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual room and board cannot be negative' };
  }

  if (value > 20000) {
    return { isValid: true, error: 'Housing costs are very high' };
  }

  return { isValid: true };
}

export function validateAnnualBooksAndSupplies(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual books and supplies cannot be negative' };
  }

  if (value > 2000) {
    return { isValid: true, error: 'Book costs are higher than average' };
  }

  return { isValid: true };
}

export function validateAnnualTransportation(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual transportation cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnnualPersonalExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual personal expenses cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnnualHealthInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual health insurance cannot be negative' };
  }

  return { isValid: true };
}

export function validateOneTimeFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'One-time fees cannot be negative' };
  }

  return { isValid: true };
}

export function validateExpectedGrants(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected grants cannot be negative' };
  }

  return { isValid: true };
}

export function validateExpectedScholarships(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected scholarships cannot be negative' };
  }

  return { isValid: true };
}

export function validateExpectedWorkStudy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected work-study cannot be negative' };
  }

  return { isValid: true };
}

export function validateExpectedStudentLoans(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected student loans cannot be negative' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'High loan amounts may impact future finances' };
  }

  return { isValid: true };
}

export function validateExpectedParentLoans(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected parent loans cannot be negative' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'High parent loans may affect retirement' };
  }

  return { isValid: true };
}

export function validateExpectedFamilyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected family contribution cannot be negative' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -5 || value > 15)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }

  if (value > 8) {
    return { isValid: true, error: 'High inflation may significantly increase costs' };
  }

  if (value < 1) {
    return { isValid: true, error: 'Low inflation may not reflect college cost trends' };
  }

  return { isValid: true };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 25)) {
    return { isValid: false, error: 'Investment return must be between -10% and 25%' };
  }

  if (value > 15) {
    return { isValid: true, error: 'Return above 15% may be unrealistic' };
  }

  if (value < 3) {
    return { isValid: true, error: 'Return below 3% may make savings difficult' };
  }

  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Tax rate must be between 0% and 50%' };
  }

  return { isValid: true };
}

export function validatePlanningHorizon(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 20) {
    return { isValid: false, error: 'Planning horizon must be between 1 and 20 years' };
  }

  if (value < 4) {
    return { isValid: true, error: 'Short horizon may not capture full costs' };
  }

  if (value > 12) {
    return { isValid: true, error: 'Long horizon increases projection uncertainty' };
  }

  return { isValid: true };
}

export function validateOptimisticGrowth(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 30)) {
    return { isValid: false, error: 'Optimistic growth must be between -10% and 30%' };
  }

  return { isValid: true };
}

export function validatePessimisticGrowth(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -20 || value > 10)) {
    return { isValid: false, error: 'Pessimistic growth must be between -20% and 10%' };
  }

  return { isValid: true };
}

export function validateProbabilityOptimistic(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Optimistic probability must be between 0% and 100%' };
  }

  if (value > 70) {
    return { isValid: true, error: 'High optimistic probability may lead to overconfidence' };
  }

  return { isValid: true };
}

export function validateProbabilityPessimistic(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Pessimistic probability must be between 0% and 100%' };
  }

  if ((value || 0) + (allInputs?.probabilityOptimistic || 0) > 100) {
    return { isValid: false, error: 'Combined probabilities cannot exceed 100%' };
  }

  if (value > 50) {
    return { isValid: true, error: 'High pessimistic probability suggests conservative planning' };
  }

  return { isValid: true };
}

export function validateSummerSchoolCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.includeSummerSchool) {
    return { isValid: true }; // Not required if summer school not included
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Summer school cost cannot be negative' };
  }

  if (value > 10000) {
    return { isValid: true, error: 'High summer school costs may not provide good value' };
  }

  return { isValid: true };
}

export function validateStudyAbroadCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.includeStudyAbroad) {
    return { isValid: true }; // Not required if study abroad not included
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Study abroad cost cannot be negative' };
  }

  if (value > 20000) {
    return { isValid: true, error: 'High study abroad costs - consider alternatives' };
  }

  return { isValid: true };
}

export function validateInternshipEarnings(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.includeInternships) {
    return { isValid: true }; // Not required if internships not included
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Internship earnings cannot be negative' };
  }

  if (value < 10000) {
    return { isValid: true, error: 'Low internship earnings may not offset costs' };
  }

  return { isValid: true };
}

export function validateCurrency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid currency' };
  }

  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Location is required' };
  }

  return { isValid: true };
}

export function validateIncludeSummerSchool(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include summer school must be true or false' };
  }

  return { isValid: true };
}

export function validateIncludeStudyAbroad(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include study abroad must be true or false' };
  }

  return { isValid: true };
}

export function validateIncludeInternships(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include internships must be true or false' };
  }

  return { isValid: true };
}