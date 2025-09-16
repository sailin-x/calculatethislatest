import { ValidationResult } from '../../../types/calculator';

export function validateStudentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 16 || value > 30) {
    return { isValid: false, errors: { studentAge: 'Student age must be between 16 and 30' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCostOfAttendance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { costOfAttendance: 'Cost of attendance cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { costOfAttendance: 'Cost of attendance cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTuition(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { tuition: 'Tuition cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { tuition: 'Tuition cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRoomAndBoard(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { roomAndBoard: 'Room and board cannot be negative' } };
  }
  if (value > 20000) {
    return { isValid: false, errors: { roomAndBoard: 'Room and board cannot exceed $20,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBooksAndSupplies(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { booksAndSupplies: 'Books and supplies cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { booksAndSupplies: 'Books and supplies cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTransportation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { transportation: 'Transportation cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { transportation: 'Transportation cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePersonalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { personalExpenses: 'Personal expenses cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { personalExpenses: 'Personal expenses cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateParentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { parentIncome: 'Parent income cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { parentIncome: 'Parent income cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateParentAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { parentAssets: 'Parent assets cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { parentAssets: 'Parent assets cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStudentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { studentIncome: 'Student income cannot be negative' } };
  }
  if (value > 200000) {
    return { isValid: false, errors: { studentIncome: 'Student income cannot exceed $200,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStudentAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { studentAssets: 'Student assets cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { studentAssets: 'Student assets cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStudentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { studentSavings: 'Student savings cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { studentSavings: 'Student savings cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStudentInvestments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { studentInvestments: 'Student investments cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { studentInvestments: 'Student investments cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfFamilyMembers(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 20) {
    return { isValid: false, errors: { numberOfFamilyMembers: 'Number of family members must be between 1 and 20' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfCollegeStudents(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { numberOfCollegeStudents: 'Number of college students must be between 0 and 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { numberOfChildren: 'Number of children must be between 0 and 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { homeEquity: 'Home equity cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { homeEquity: 'Home equity cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBusinessValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { businessValue: 'Business value cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { businessValue: 'Business value cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFarmValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { farmValue: 'Farm value cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { farmValue: 'Farm value cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGradeLevel(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['freshman', 'sophomore', 'junior', 'senior', 'graduate'].includes(value)) {
    return { isValid: false, errors: { gradeLevel: 'Please select a valid grade level' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEnrollmentStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['full-time', 'three-quarter', 'half-time', 'less-half'].includes(value)) {
    return { isValid: false, errors: { enrollmentStatus: 'Please select a valid enrollment status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaritalStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married', 'divorced', 'widowed'].includes(value)) {
    return { isValid: false, errors: { maritalStatus: 'Please select a valid marital status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateParentFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married-joint', 'married-separate', 'head-household'].includes(value)) {
    return { isValid: false, errors: { parentFilingStatus: 'Please select a valid filing status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsDependent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isDependent: 'Dependency status must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasChildren: 'Has children must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAttendingInState(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { attendingInState: 'In-state attendance must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasDisability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasDisability: 'Disability status must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsVeteran(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isVeteran: 'Veteran status must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsFosterYouth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isFosterYouth: 'Foster youth status must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasSpecialCircumstances(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasSpecialCircumstances: 'Special circumstances must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasOutOfStateProperty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasOutOfStateProperty: 'Out of state property must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOutOfStateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { outOfStateValue: 'Out of state value cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { outOfStateValue: 'Out of state value cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualExclusionGifts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualExclusionGifts: 'Annual exclusion gifts cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { annualExclusionGifts: 'Annual exclusion gifts cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifetimeExclusionUsed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { lifetimeExclusionUsed: 'Lifetime exclusion used cannot be negative' } };
  }
  if (value > 12900000) {
    return { isValid: false, errors: { lifetimeExclusionUsed: 'Lifetime exclusion used cannot exceed $12,900,000' } };
  }
  return { isValid: true, errors: {} };
}