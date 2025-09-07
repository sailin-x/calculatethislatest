import { CollegeFinancialAidInputs } from './types';

export function validateStudentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 14 || value > 25) {
    return { isValid: false, error: 'Student age must be between 14 and 25' };
  }

  if (value < 16) {
    return { isValid: true, error: 'Early college entry may require special arrangements' };
  }

  if (value > 22) {
    return { isValid: true, error: 'Older students may have different aid eligibility' };
  }

  return { isValid: true };
}

export function validateIsDependent(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Dependency status must be specified' };
  }

  if (allInputs?.studentAge >= 24 && value === true) {
    return { isValid: true, error: 'Students 24+ are typically independent' };
  }

  return { isValid: true };
}

export function validateNumberOfParents(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.isDependent) {
    return { isValid: true }; // Not required for independent students
  }

  if (!value || typeof value !== 'number' || value < 1 || value > 2) {
    return { isValid: false, error: 'Number of parents must be 1 or 2' };
  }

  return { isValid: true };
}

export function validateStudentIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Student income cannot be negative' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'High student income may affect aid eligibility' };
  }

  return { isValid: true };
}

export function validateSpouseIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.maritalStatus || allInputs.maritalStatus === 'single') {
    return { isValid: true }; // Not required for single students
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Spouse income cannot be negative' };
  }

  return { isValid: true };
}

export function validateParentIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.isDependent) {
    return { isValid: true }; // Not required for independent students
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Parent income cannot be negative' };
  }

  if (value > 200000) {
    return { isValid: true, error: 'High parent income may reduce aid eligibility' };
  }

  return { isValid: true };
}

export function validateParentSpouseIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.isDependent || allInputs?.numberOfParents === 1) {
    return { isValid: true }; // Not required for single-parent households
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Parent spouse income cannot be negative' };
  }

  return { isValid: true };
}

export function validateStudentAssets(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Student assets cannot be negative' };
  }

  if (value > 10000) {
    return { isValid: true, error: 'Student assets may affect aid eligibility' };
  }

  return { isValid: true };
}

export function validateParentAssets(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.isDependent) {
    return { isValid: true }; // Not required for independent students
  }

  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Parent assets cannot be negative' };
  }

  if (value > 500000) {
    return { isValid: true, error: 'High parent assets may reduce aid eligibility' };
  }

  return { isValid: true };
}

export function validateGpa(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 4.0)) {
    return { isValid: false, error: 'GPA must be between 0.0 and 4.0' };
  }

  if (value < 2.0) {
    return { isValid: true, error: 'Low GPA may limit merit-based aid opportunities' };
  }

  if (value >= 3.8) {
    return { isValid: true, error: 'High GPA qualifies for maximum merit aid' };
  }

  return { isValid: true };
}

export function validateSatScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 400 || value > 1600)) {
    return { isValid: false, error: 'SAT score must be between 400 and 1600' };
  }

  if (value < 1000) {
    return { isValid: true, error: 'Low SAT scores may limit merit aid' };
  }

  if (value >= 1400) {
    return { isValid: true, error: 'High SAT scores qualify for top merit aid' };
  }

  return { isValid: true };
}

export function validateActScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 1 || value > 36)) {
    return { isValid: false, error: 'ACT score must be between 1 and 36' };
  }

  if (value < 20) {
    return { isValid: true, error: 'Low ACT scores may limit merit aid' };
  }

  if (value >= 30) {
    return { isValid: true, error: 'High ACT scores qualify for top merit aid' };
  }

  return { isValid: true };
}

export function validateCostOfAttendance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Cost of attendance must be greater than 0' };
  }

  if (value > 70000) {
    return { isValid: true, error: 'Very high cost - consider more affordable options' };
  }

  if (value < 15000) {
    return { isValid: true, error: 'Verify this includes all college expenses' };
  }

  return { isValid: true };
}

export function validateOtherScholarships(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Other scholarships cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnalysisYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const currentYear = new Date().getFullYear();
  if (!value || typeof value !== 'number' || value < currentYear || value > currentYear + 10) {
    return { isValid: false, error: 'Analysis year must be within the next 10 years' };
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

  return { isValid: true };
}

export function validateStateOfResidence(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'State of residence is required' };
  }

  return { isValid: true };
}

export function validateCitizenshipStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validStatuses = ['us_citizen', 'permanent_resident', 'international'];
  if (!value || !validStatuses.includes(value)) {
    return { isValid: false, error: 'Please select a valid citizenship status' };
  }

  if (value === 'international') {
    return { isValid: true, error: 'International students have limited federal aid' };
  }

  return { isValid: true };
}

export function validateApplicationDeadline(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value) {
    return { isValid: true }; // Optional field
  }

  const deadline = new Date(value);
  if (isNaN(deadline.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }

  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDeadline < 0) {
    return { isValid: true, error: 'Deadline has passed - check for late options' };
  }

  if (daysUntilDeadline < 30) {
    return { isValid: true, error: 'Deadline approaching - submit soon' };
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

export function validatePreferGrants(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Grant preference must be true or false' };
  }

  return { isValid: true };
}

export function validatePreferWorkStudy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Work-study preference must be true or false' };
  }

  return { isValid: true };
}

export function validateWillingToRelocate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Relocation preference must be true or false' };
  }

  return { isValid: true };
}

export function validateWillingToAttendTwoYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Two-year college preference must be true or false' };
  }

  return { isValid: true };
}