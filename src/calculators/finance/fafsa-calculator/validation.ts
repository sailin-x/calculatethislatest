import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * FAFSA validation rules
 */
export const fafsaValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('studentAge', 'Student age is required'),
  ValidationRuleFactory.required('costOfAttendance', 'Cost of attendance is required'),
  ValidationRuleFactory.required('gradeLevel', 'Grade level is required'),
  ValidationRuleFactory.required('enrollmentStatus', 'Enrollment status is required'),

  // Age validations
  ValidationRuleFactory.range('studentAge', 16, 30, 'Student age must be between 16 and 30'),

  // Financial validations
  ValidationRuleFactory.range('costOfAttendance', 0, 100000, 'Cost of attendance must be between $0 and $100,000'),
  ValidationRuleFactory.range('tuition', 0, 50000, 'Tuition must be between $0 and $50,000'),
  ValidationRuleFactory.range('roomAndBoard', 0, 20000, 'Room and board must be between $0 and $20,000'),
  ValidationRuleFactory.range('booksAndSupplies', 0, 5000, 'Books and supplies must be between $0 and $5,000'),
  ValidationRuleFactory.range('transportation', 0, 5000, 'Transportation must be between $0 and $5,000'),
  ValidationRuleFactory.range('personalExpenses', 0, 5000, 'Personal expenses must be between $0 and $5,000'),

  // Parent information validations (for dependent students)
  ValidationRuleFactory.businessRule(
    'parentIncome',
    (parentIncome, allInputs) => {
      if (!allInputs?.isDependent) return true;
      return parentIncome >= 0;
    },
    'Parent income must be provided for dependent students'
  ),

  ValidationRuleFactory.businessRule(
    'parentAssets',
    (parentAssets, allInputs) => {
      if (!allInputs?.isDependent) return true;
      return parentAssets >= 0;
    },
    'Parent assets must be provided for dependent students'
  ),

  // Student information validations
  ValidationRuleFactory.range('studentIncome', 0, 100000, 'Student income must be between $0 and $100,000'),
  ValidationRuleFactory.range('studentAssets', 0, 50000, 'Student assets must be between $0 and $50,000'),
  ValidationRuleFactory.range('studentSavings', 0, 50000, 'Student savings must be between $0 and $50,000'),
  ValidationRuleFactory.range('studentInvestments', 0, 50000, 'Student investments must be between $0 and $50,000'),

  // Family size validations
  ValidationRuleFactory.range('numberOfFamilyMembers', 1, 20, 'Number of family members must be between 1 and 20'),
  ValidationRuleFactory.range('numberOfCollegeStudents', 0, 10, 'Number of college students must be between 0 and 10'),
  ValidationRuleFactory.range('numberOfChildren', 0, 10, 'Number of children must be between 0 and 10'),

  // Asset validations
  ValidationRuleFactory.range('homeEquity', 0, 1000000, 'Home equity must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('businessValue', 0, 5000000, 'Business value must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('farmValue', 0, 5000000, 'Farm value must be between $0 and $5,000,000'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'numberOfCollegeStudents',
    (numberOfCollegeStudents, allInputs) => {
      if (!allInputs?.numberOfFamilyMembers) return true;
      return numberOfCollegeStudents <= allInputs.numberOfFamilyMembers;
    },
    'Number of college students cannot exceed total family members'
  ),

  ValidationRuleFactory.businessRule(
    'parentIncome',
    (parentIncome, allInputs) => {
      if (!allInputs?.isDependent || !allInputs?.parentAssets) return true;
      // Basic reasonableness check
      return parentIncome <= 10000000; // Max $10M
    },
    'Parent income seems unreasonably high'
  ),

  ValidationRuleFactory.businessRule(
    'studentIncome',
    (studentIncome, allInputs) => {
      if (!allInputs?.studentAssets) return true;
      // Basic reasonableness check for student income
      return studentIncome <= 200000; // Max $200K for students
    },
    'Student income seems unreasonably high'
  ),

  ValidationRuleFactory.businessRule(
    'costOfAttendance',
    (costOfAttendance, allInputs) => {
      if (!allInputs?.tuition || !allInputs?.roomAndBoard) return true;
      const calculatedCOA = (allInputs.tuition || 0) + (allInputs.roomAndBoard || 0) +
                           (allInputs.booksAndSupplies || 0) + (allInputs.transportation || 0) +
                           (allInputs.personalExpenses || 0);
      // Allow 20% variance for other costs
      return Math.abs(costOfAttendance - calculatedCOA) / costOfAttendance <= 0.2;
    },
    'Cost of attendance should approximately equal sum of components'
  )
];

/**
 * Get validation rules for FAFSA calculator
 */
export function getFAFSAValidationRules(): ValidationRule[] {
  return fafsaValidationRules;
}