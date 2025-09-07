import { CollegeFinancialAidInputs } from './types';

export function validateCollegeFinancialAidInputs(inputs: CollegeFinancialAidInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Student Information Validation
  if (!inputs.studentAge || inputs.studentAge < 14 || inputs.studentAge > 25) {
    errors.push('Student age must be between 14 and 25');
  }

  if (!inputs.isDependent && typeof inputs.isDependent !== 'boolean') {
    errors.push('Dependency status must be specified');
  }

  if (inputs.isDependent) {
    if (!inputs.numberOfParents || inputs.numberOfParents < 1 || inputs.numberOfParents > 2) {
      errors.push('Number of parents must be 1 or 2 for dependent students');
    }
  }

  // Income Validation
  if (inputs.studentIncome !== undefined && inputs.studentIncome < 0) {
    errors.push('Student income cannot be negative');
  }

  if (inputs.spouseIncome !== undefined && inputs.spouseIncome < 0) {
    errors.push('Spouse income cannot be negative');
  }

  if (inputs.parentIncome !== undefined && inputs.parentIncome < 0) {
    errors.push('Parent income cannot be negative');
  }

  if (inputs.parentSpouseIncome !== undefined && inputs.parentSpouseIncome < 0) {
    errors.push('Parent spouse income cannot be negative');
  }

  // Asset Validation
  if (inputs.studentAssets !== undefined && inputs.studentAssets < 0) {
    errors.push('Student assets cannot be negative');
  }

  if (inputs.parentAssets !== undefined && inputs.parentAssets < 0) {
    errors.push('Parent assets cannot be negative');
  }

  if (inputs.homeEquity !== undefined && inputs.homeEquity < 0) {
    errors.push('Home equity cannot be negative');
  }

  if (inputs.businessValue !== undefined && inputs.businessValue < 0) {
    errors.push('Business value cannot be negative');
  }

  if (inputs.farmValue !== undefined && inputs.farmValue < 0) {
    errors.push('Farm value cannot be negative');
  }

  // Academic Information Validation
  if (inputs.gpa !== undefined && (inputs.gpa < 0 || inputs.gpa > 4.0)) {
    errors.push('GPA must be between 0.0 and 4.0');
  }

  if (inputs.satScore !== undefined && (inputs.satScore < 400 || inputs.satScore > 1600)) {
    errors.push('SAT score must be between 400 and 1600');
  }

  if (inputs.actScore !== undefined && (inputs.actScore < 1 || inputs.actScore > 36)) {
    errors.push('ACT score must be between 1 and 36');
  }

  // Financial Aid Information Validation
  if (!inputs.costOfAttendance || inputs.costOfAttendance <= 0) {
    errors.push('Cost of attendance must be greater than 0');
  }

  if (inputs.otherScholarships !== undefined && inputs.otherScholarships < 0) {
    errors.push('Other scholarships cannot be negative');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisYear || inputs.analysisYear < new Date().getFullYear() || inputs.analysisYear > new Date().getFullYear() + 10) {
    errors.push('Analysis year must be within the next 10 years');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  // State and Citizenship Validation
  if (!inputs.stateOfResidence || inputs.stateOfResidence.trim().length === 0) {
    errors.push('State of residence is required');
  }

  if (!inputs.citizenshipStatus || !['us_citizen', 'permanent_resident', 'international'].includes(inputs.citizenshipStatus)) {
    errors.push('Valid citizenship status must be selected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCollegeFinancialAidBusinessRules(inputs: CollegeFinancialAidInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.studentAge && inputs.studentAge < 16) {
    warnings.push('Very young students may face additional challenges with financial aid applications');
  }

  if (inputs.studentAge && inputs.studentAge > 22) {
    warnings.push('Older students may have limited eligibility for certain aid programs');
  }

  if (inputs.isDependent && inputs.studentAge && inputs.studentAge >= 24) {
    warnings.push('Students 24+ are typically considered independent for aid purposes');
  }

  // Income-based warnings
  const totalIncome = (inputs.studentIncome || 0) + (inputs.spouseIncome || 0) +
                     (inputs.parentIncome || 0) + (inputs.parentSpouseIncome || 0);

  if (totalIncome > 200000) {
    warnings.push('High income may significantly reduce need-based aid eligibility');
  }

  if (totalIncome < 25000) {
    warnings.push('Low income qualifies for maximum need-based aid consideration');
  }

  // Asset-based warnings
  const totalAssets = (inputs.studentAssets || 0) + (inputs.parentAssets || 0) +
                     (inputs.businessValue || 0) + (inputs.farmValue || 0);

  if (totalAssets > 500000) {
    warnings.push('High asset levels may reduce aid eligibility');
  }

  // Academic performance warnings
  if (inputs.gpa && inputs.gpa < 2.0) {
    warnings.push('Low GPA may limit merit-based aid opportunities');
  }

  if (inputs.gpa && inputs.gpa > 3.8) {
    warnings.push('High GPA qualifies for maximum merit-based aid consideration');
  }

  // Test score warnings
  if (inputs.satScore && inputs.satScore < 1000) {
    warnings.push('Low SAT scores may limit merit-based aid opportunities');
  }

  if (inputs.actScore && inputs.actScore < 20) {
    warnings.push('Low ACT scores may limit merit-based aid opportunities');
  }

  // Cost warnings
  if (inputs.costOfAttendance && inputs.costOfAttendance > 70000) {
    warnings.push('Very high cost of attendance - consider more affordable options');
  }

  if (inputs.costOfAttendance && inputs.costOfAttendance < 15000) {
    warnings.push('Low cost of attendance - verify this includes all expenses');
  }

  // State-specific warnings
  if (inputs.stateOfResidence && inputs.stateOfResidence.toLowerCase() === 'california') {
    warnings.push('California has excellent state aid programs - ensure Cal Grant application');
  }

  if (inputs.stateOfResidence && inputs.stateOfResidence.toLowerCase() === 'texas') {
    warnings.push('Texas has strong state aid programs including TEXAS Grant');
  }

  // Citizenship warnings
  if (inputs.citizenshipStatus === 'international') {
    warnings.push('International students have limited federal aid eligibility');
  }

  if (inputs.citizenshipStatus === 'permanent_resident') {
    warnings.push('Permanent residents may have limited state aid eligibility');
  }

  // Timing warnings
  if (inputs.applicationDeadline) {
    const deadline = new Date(inputs.applicationDeadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilDeadline < 30) {
      warnings.push('Application deadline is approaching - submit ASAP');
    }

    if (daysUntilDeadline < 0) {
      warnings.push('Application deadline has passed - check for late submission options');
    }
  }

  // Merit aid warnings
  const hasStrongMeritProfile = (inputs.gpa || 0) >= 3.5 &&
                               ((inputs.satScore || 0) >= 1300 || (inputs.actScore || 0) >= 29);

  if (!hasStrongMeritProfile) {
    warnings.push('Consider academic improvement to qualify for merit-based aid');
  }

  // Work-study warnings
  if (inputs.preferWorkStudy && (!inputs.gpa || inputs.gpa < 2.0)) {
    warnings.push('Work-study programs typically require minimum GPA');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}