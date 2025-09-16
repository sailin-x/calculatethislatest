export interface FAFSAInputs {
  // Student Information
  studentAge: number;
  isDependent: boolean;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  hasChildren: boolean;
  numberOfChildren: number;

  // Parent Information (for dependent students)
  parentIncome: number;
  parentAssets: number;
  parentFilingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-household';
  numberOfFamilyMembers: number;
  numberOfCollegeStudents: number;

  // Student Financial Information
  studentIncome: number;
  studentAssets: number;
  studentSavings: number;
  studentInvestments: number;

  // Expected Family Contribution (EFC) Components
  homeEquity: number;
  businessValue: number;
  farmValue: number;

  // Academic Information
  gradeLevel: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  enrollmentStatus: 'full-time' | 'three-quarter' | 'half-time' | 'less-half';

  // Cost Information
  costOfAttendance: number;
  tuition: number;
  roomAndBoard: number;
  booksAndSupplies: number;
  transportation: number;
  personalExpenses: number;

  // State Information
  stateOfResidence: string;
  attendingInState: boolean;

  // Additional Factors
  hasDisability: boolean;
  isVeteran: boolean;
  isFosterYouth: boolean;
  hasSpecialCircumstances: boolean;
  specialCircumstancesDescription: string;
}

export interface FAFSAOutputs {
  // Expected Family Contribution
  expectedFamilyContribution: number;
  studentContribution: number;
  parentContribution: number;

  // Financial Need Analysis
  costOfAttendance: number;
  totalAid: number;
  financialNeed: number;
  unmetNeed: number;

  // Aid Eligibility
  pellGrantEligibility: number;
  federalWorkStudyEligibility: number;
  federalLoanEligibility: number;

  // State Aid
  stateGrantEligibility: number;
  stateScholarshipEligibility: number;

  // Private Aid
  institutionalAidEligibility: number;
  privateScholarshipEligibility: number;

  // Breakdown by Aid Type
  grants: number;
  scholarships: number;
  workStudy: number;
  federalLoans: number;
  privateLoans: number;

  // Net Cost
  netCost: number;
  outOfPocket: number;

  // Recommendations
  recommendedActions: string[];
  priorityApplications: string[];
  additionalResources: string[];

  // Eligibility Flags
  pellEligible: boolean;
  subsidizedLoanEligible: boolean;
  workStudyEligible: boolean;

  // Special Considerations
  specialCircumstances: boolean;
  dependencyOverride: boolean;
  professionalJudgment: boolean;
}