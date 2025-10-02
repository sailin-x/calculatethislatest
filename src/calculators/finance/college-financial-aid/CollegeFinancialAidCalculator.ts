import { Calculator } from '../../types/calculator';
import { CollegeFinancialAidInputs, CollegeFinancialAidOutputs } from './types';
import { calculateCollegeFinancialAid } from './formulas';
import { validateCollegeFinancialAidInputs } from './validation';

export const CollegeFinancialAidCalculator: Calculator = {
  id: 'college-financial-aid-calculator',
  title: 'College Financial Aid Calculator',
  category: 'finance',
  subcategory: 'Education',
  description: 'Calculate Expected Family Contribution (EFC), aid eligibility, and optimize financial aid strategy for college. Includes FAFSA analysis, merit aid, and comprehensive aid planning.',

  inputs: [
    // Student Information
    {
      id: 'studentAge',
      label: 'Student Age',
      type: 'number',
      required: true,
      min: 14,
      max: 25,
      step: 1,
      placeholder: '17',
      tooltip: 'Current age of the student'
    },
    {
      id: 'isDependent',
      label: 'Is Dependent Student',
      type: 'boolean',
      required: true,
      tooltip: 'Whether student is considered dependent for aid purposes'
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      placeholder: 'single',
      tooltip: 'Student marital status'
    },
    {
      id: 'hasChildren',
      label: 'Has Children',
      type: 'boolean',
      required: true,
      tooltip: 'Whether student has children'
    },
    {
      id: 'numberOfChildren',
      label: 'Number of Children',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0',
      tooltip: 'Number of children student has'
    },

    // Parent Information (for dependent students)
    {
      id: 'parentMaritalStatus',
      label: 'Parent Marital Status',
      type: 'select',
      required: false,
      options: [
        { value: 'married', label: 'Married' },
        { value: 'single', label: 'Single' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
        { value: 'separated', label: 'Separated' }
      ],
      placeholder: 'married',
      tooltip: 'Parent marital status'
    },
    {
      id: 'numberOfParents',
      label: 'Number of Parents',
      type: 'number',
      required: false,
      min: 1,
      max: 2,
      step: 1,
      placeholder: '2',
      tooltip: 'Number of parents in household'
    },
    {
      id: 'hasSiblingInCollege',
      label: 'Has Sibling in College',
      type: 'boolean',
      required: false,
      tooltip: 'Whether student has siblings currently in college'
    },
    {
      id: 'numberOfSiblingsInCollege',
      label: 'Number of Siblings in College',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0',
      tooltip: 'Number of siblings currently enrolled in college'
    },

    // Income Information
    {
      id: 'studentIncome',
      label: 'Student Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Student annual income from work'
    },
    {
      id: 'spouseIncome',
      label: 'Spouse Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '0',
      tooltip: 'Spouse annual income'
    },
    {
      id: 'parentIncome',
      label: 'Parent Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '75000',
      tooltip: 'Parent annual income'
    },
    {
      id: 'parentSpouseIncome',
      label: 'Parent Spouse Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '75000',
      tooltip: 'Parent spouse annual income'
    },

    // Asset Information
    {
      id: 'studentAssets',
      label: 'Student Assets ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2000',
      tooltip: 'Student savings and investments'
    },
    {
      id: 'parentAssets',
      label: 'Parent Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '100000',
      tooltip: 'Parent savings and investments'
    },
    {
      id: 'homeEquity',
      label: 'Home Equity ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 10000,
      placeholder: '200000',
      tooltip: 'Equity in family home'
    },

    // Academic Information
    {
      id: 'gpa',
      label: 'GPA',
      type: 'number',
      required: true,
      min: 0,
      max: 4.0,
      step: 0.1,
      placeholder: '3.5',
      tooltip: 'Student grade point average'
    },
    {
      id: 'satScore',
      label: 'SAT Score',
      type: 'number',
      required: false,
      min: 400,
      max: 1600,
      step: 10,
      placeholder: '1200',
      tooltip: 'SAT test score'
    },
    {
      id: 'actScore',
      label: 'ACT Score',
      type: 'number',
      required: false,
      min: 1,
      max: 36,
      step: 1,
      placeholder: '25',
      tooltip: 'ACT test score'
    },

    // Financial Aid Information
    {
      id: 'costOfAttendance',
      label: 'Cost of Attendance ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 100000,
      step: 1000,
      placeholder: '35000',
      tooltip: 'Total annual cost of college'
    },
    {
      id: 'otherScholarships',
      label: 'Other Scholarships ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2000',
      tooltip: 'Expected scholarships from other sources'
    },

    // Analysis Parameters
    {
      id: 'analysisYear',
      label: 'Analysis Year',
      type: 'number',
      required: true,
      min: new Date().getFullYear(),
      max: new Date().getFullYear() + 10,
      step: 1,
      placeholder: new Date().getFullYear().toString(),
      tooltip: 'Year for aid analysis'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate'
    },

    // Citizenship
    {
      id: 'citizenshipStatus',
      label: 'Citizenship Status',
      type: 'select',
      required: true,
      options: [
        { value: 'us_citizen', label: 'U.S. Citizen' },
        { value: 'permanent_resident', label: 'Permanent Resident' },
        { value: 'international', label: 'International Student' }
      ],
      placeholder: 'us_citizen',
      tooltip: 'Citizenship status for aid eligibility'
    },

    // Preferences
    {
      id: 'preferGrants',
      label: 'Prefer Grants',
      type: 'boolean',
      required: true,
      tooltip: 'Preference for grant-based aid'
    },
    {
      id: 'preferWorkStudy',
      label: 'Prefer Work-Study',
      type: 'boolean',
      required: true,
      tooltip: 'Preference for work-study programs'
    },
    {
      id: 'willingToRelocate',
      label: 'Willing to Relocate',
      type: 'boolean',
      required: true,
      tooltip: 'Willingness to attend college out-of-state'
    },
    {
      id: 'willingToAttendTwoYear',
      label: 'Willing to Attend 2-Year College',
      type: 'boolean',
      required: true,
      tooltip: 'Willingness to attend community college first'
    },

    // Currency
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations'
    }
  ],

  outputs: [
    { id: 'totalExpectedAid', label: 'Total Expected Aid', type: 'currency', explanation: 'Total expected financial aid' },
    { id: 'netCostAfterAid', label: 'Net Cost After Aid', type: 'currency', explanation: 'Cost after all aid is applied' },
    { id: 'aidGap', label: 'Aid Gap', type: 'currency', explanation: 'Uncovered cost that needs funding' },
    { id: 'loanBurden', label: 'Loan Burden', type: 'currency', explanation: 'Total loan amount' },
    { id: 'grantPercentage', label: 'Grant Percentage', type: 'percentage', explanation: 'Percentage of aid from grants' },
    { id: 'workStudyPercentage', label: 'Work-Study Percentage', type: 'percentage', explanation: 'Percentage of aid from work-study' },
    { id: 'loanPercentage', label: 'Loan Percentage', type: 'percentage', explanation: 'Percentage of aid from loans' },
    { id: 'eligibility', label: 'Aid Eligibility', type: 'text', explanation: 'Detailed aid eligibility breakdown' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive aid analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Middle-Income Family',
      description: 'Dependent student from middle-income family with good academic performance',
      inputs: {
        studentAge: 17,
        isDependent: true,
        maritalStatus: 'single',
        hasChildren: false,
        numberOfChildren: 0,
        parentMaritalStatus: 'married',
        numberOfParents: 2,
        hasSiblingInCollege: false,
        numberOfSiblingsInCollege: 0,
        studentIncome: 3000,
        spouseIncome: 0,
        parentIncome: 80000,
        parentSpouseIncome: 75000,
        studentAssets: 5000,
        parentAssets: 150000,
        homeEquity: 200000,
        gpa: 3.7,
        satScore: 1350,
        actScore: 0,
        costOfAttendance: 35000,
        otherScholarships: 2000,
        analysisYear: new Date().getFullYear(),
        inflationRate: 3,
        stateOfResidence: 'California',
        citizenshipStatus: 'us_citizen',
        preferGrants: true,
        preferWorkStudy: false,
        willingToRelocate: true,
        willingToAttendTwoYear: false,
        currency: 'USD'
      },
      expectedOutputs: {
        totalExpectedAid: 15000,
        netCostAfterAid: 20000,
        aidGap: 20000,
        loanBurden: 5500,
        grantPercentage: 67,
        workStudyPercentage: 0,
        loanPercentage: 33,
        eligibility: {
          expectedFamilyContribution: 12000,
          totalAidEligibility: 15000,
          pellGrant: 4000,
          federalGrants: 4000,
          meritAid: 3000,
          workStudyEligibility: 0,
          federalLoanLimit: 5500,
          subsidizedStafford: 3500,
          unsubsidizedStafford: 2000
        },
        analysis: 'Comprehensive financial aid analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter student and family information',
    'Provide income and asset details',
    'Include academic performance metrics',
    'Specify college cost and location',
    'Review aid eligibility and optimization strategies'
  ]
};