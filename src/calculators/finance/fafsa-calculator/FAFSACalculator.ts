import { Calculator, Formula } from '../../types/calculator';
import { calculateFAFSA, validateFAFSAInputs } from './formulas';
import { getFAFSAValidationRules } from './validation';

/**
 * FAFSA formula implementation
 */
const fafsaFormula: Formula = {
  id: 'fafsa',
  name: 'FAFSA Analysis',
  description: 'Comprehensive Free Application for Federal Student Aid analysis including EFC, aid eligibility, and planning recommendations',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateFAFSA(inputs as any);
    return {
      outputs: result,
      explanation: 'FAFSA analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading FAFSA Calculator
 */
export const fafsaCalculator: Calculator = {
  id: 'fafsa-calculator',
  title: 'FAFSA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive Free Application for Federal Student Aid (FAFSA) analysis including Expected Family Contribution (EFC), federal and state aid eligibility, scholarship opportunities, and personalized financial aid planning recommendations.',

  usageInstructions: [
    'Enter your personal and family financial information',
    'Provide details about your college costs and enrollment plans',
    'Review your Expected Family Contribution and aid eligibility',
    'Follow the recommended action steps to maximize your aid'
  ],

  inputs: [
    {
      id: 'studentAge',
      label: 'Student Age',
      type: 'number',
      required: true,
      placeholder: '18',
      tooltip: 'Your current age',
      defaultValue: 18,
      min: 16,
      max: 30
    },
    {
      id: 'isDependent',
      label: 'Are you a dependent student?',
      type: 'boolean',
      required: true,
      tooltip: 'Check if you are claimed as a dependent on your parents\' tax return',
      defaultValue: true
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: false,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      tooltip: 'Your marital status',
      defaultValue: 'single'
    },
    {
      id: 'hasChildren',
      label: 'Do you have children?',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have children who receive more than half their support from you',
      defaultValue: false
    },
    {
      id: 'numberOfChildren',
      label: 'Number of Children',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Number of children you support',
      defaultValue: 0,
      min: 0,
      max: 10
    },
    {
      id: 'parentIncome',
      label: 'Parent(s) Adjusted Gross Income',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Total adjusted gross income from parents\' tax return',
      defaultValue: 100000
    },
    {
      id: 'parentAssets',
      label: 'Parent(s) Assets',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Value of parents\' investments, savings, and other assets',
      defaultValue: 50000
    },
    {
      id: 'parentFilingStatus',
      label: 'Parent(s) Filing Status',
      type: 'select',
      required: false,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married-joint', label: 'Married Filing Jointly' },
        { value: 'married-separate', label: 'Married Filing Separately' },
        { value: 'head-household', label: 'Head of Household' }
      ],
      tooltip: 'Parents\' tax filing status',
      defaultValue: 'married-joint'
    },
    {
      id: 'numberOfFamilyMembers',
      label: 'Number of Family Members',
      type: 'number',
      required: true,
      placeholder: '4',
      tooltip: 'Total number of people in your household',
      defaultValue: 4,
      min: 1,
      max: 20
    },
    {
      id: 'numberOfCollegeStudents',
      label: 'Number of College Students in Family',
      type: 'number',
      required: true,
      placeholder: '1',
      tooltip: 'Number of family members attending college this year',
      defaultValue: 1,
      min: 0,
      max: 10
    },
    {
      id: 'studentIncome',
      label: 'Your Income',
      type: 'currency',
      required: true,
      placeholder: '5000',
      tooltip: 'Your total income from all sources',
      defaultValue: 5000
    },
    {
      id: 'studentAssets',
      label: 'Your Assets',
      type: 'currency',
      required: true,
      placeholder: '2000',
      tooltip: 'Value of your savings, checking, and other accounts',
      defaultValue: 2000
    },
    {
      id: 'studentSavings',
      label: 'Your Savings',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Amount in savings accounts',
      defaultValue: 1000
    },
    {
      id: 'studentInvestments',
      label: 'Your Investments',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Value of stocks, bonds, and other investments',
      defaultValue: 500
    },
    {
      id: 'homeEquity',
      label: 'Home Equity',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Equity in your family home',
      defaultValue: 50000
    },
    {
      id: 'businessValue',
      label: 'Business/Farm Value',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Value of family business or farm',
      defaultValue: 0
    },
    {
      id: 'farmValue',
      label: 'Farm Value',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Value of family farm',
      defaultValue: 0
    },
    {
      id: 'gradeLevel',
      label: 'Grade Level',
      type: 'select',
      required: true,
      options: [
        { value: 'freshman', label: 'Freshman' },
        { value: 'sophomore', label: 'Sophomore' },
        { value: 'junior', label: 'Junior' },
        { value: 'senior', label: 'Senior' },
        { value: 'graduate', label: 'Graduate Student' }
      ],
      tooltip: 'Your current academic year',
      defaultValue: 'freshman'
    },
    {
      id: 'enrollmentStatus',
      label: 'Enrollment Status',
      type: 'select',
      required: true,
      options: [
        { value: 'full-time', label: 'Full-time' },
        { value: 'three-quarter', label: 'Three-quarter time' },
        { value: 'half-time', label: 'Half-time' },
        { value: 'less-half', label: 'Less than half-time' }
      ],
      tooltip: 'Your planned enrollment status',
      defaultValue: 'full-time'
    },
    {
      id: 'costOfAttendance',
      label: 'Cost of Attendance',
      type: 'currency',
      required: true,
      placeholder: '35000',
      tooltip: 'Total cost of attending your college',
      defaultValue: 35000
    },
    {
      id: 'tuition',
      label: 'Tuition & Fees',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Tuition and required fees',
      defaultValue: 25000
    },
    {
      id: 'roomAndBoard',
      label: 'Room & Board',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Housing and meal plan costs',
      defaultValue: 8000
    },
    {
      id: 'booksAndSupplies',
      label: 'Books & Supplies',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Textbooks and school supplies',
      defaultValue: 1000
    },
    {
      id: 'transportation',
      label: 'Transportation',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Transportation costs',
      defaultValue: 1000
    },
    {
      id: 'personalExpenses',
      label: 'Personal Expenses',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Personal and miscellaneous expenses',
      defaultValue: 2000
    },
    {
      id: 'attendingInState',
      label: 'Attending In-State College',
      type: 'boolean',
      required: false,
      tooltip: 'Check if attending a public college in your state',
      defaultValue: true
    },
    {
      id: 'hasDisability',
      label: 'Have a Disability',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have a documented disability',
      defaultValue: false
    },
    {
      id: 'isVeteran',
      label: 'Are you a Veteran',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you are a veteran or eligible dependent',
      defaultValue: false
    },
    {
      id: 'isFosterYouth',
      label: 'Are you a Former Foster Youth',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you were in foster care',
      defaultValue: false
    },
    {
      id: 'hasSpecialCircumstances',
      label: 'Have Special Circumstances',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have special financial circumstances',
      defaultValue: false
    },
    {
      id: 'annualExclusionGifts',
      label: 'Annual Exclusion Gifts',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Value of gifts received this year',
      defaultValue: 15000
    },
    {
      id: 'lifetimeExclusionUsed',
      label: 'Lifetime Gift Tax Exclusion Used',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Portion of lifetime gift tax exclusion already used',
      defaultValue: 0
    }
  ],

  outputs: [
    {
      id: 'expectedFamilyContribution',
      label: 'Expected Family Contribution (EFC)',
      type: 'currency',
      explanation: 'Amount your family is expected to contribute toward education costs'
    },
    {
      id: 'studentContribution',
      label: 'Student Contribution',
      type: 'currency',
      explanation: 'Portion of EFC attributed to student'
    },
    {
      id: 'parentContribution',
      label: 'Parent Contribution',
      type: 'currency',
      explanation: 'Portion of EFC attributed to parents'
    },
    {
      id: 'financialNeed',
      label: 'Financial Need',
      type: 'currency',
      explanation: 'Difference between cost of attendance and EFC'
    },
    {
      id: 'pellGrantEligibility',
      label: 'Pell Grant Eligibility',
      type: 'currency',
      explanation: 'Estimated Federal Pell Grant amount'
    },
    {
      id: 'federalWorkStudyEligibility',
      label: 'Federal Work-Study Eligibility',
      type: 'currency',
      explanation: 'Estimated Federal Work-Study award'
    },
    {
      id: 'federalLoanEligibility',
      label: 'Federal Loan Eligibility',
      type: 'currency',
      explanation: 'Estimated Federal Direct Loan eligibility'
    },
    {
      id: 'stateGrantEligibility',
      label: 'State Grant Eligibility',
      type: 'currency',
      explanation: 'Estimated state grant amount'
    },
    {
      id: 'stateScholarshipEligibility',
      label: 'State Scholarship Eligibility',
      type: 'currency',
      explanation: 'Estimated state scholarship amount'
    },
    {
      id: 'institutionalAidEligibility',
      label: 'Institutional Aid Eligibility',
      type: 'currency',
      explanation: 'Estimated institutional aid amount'
    },
    {
      id: 'privateScholarshipEligibility',
      label: 'Private Scholarship Eligibility',
      type: 'currency',
      explanation: 'Estimated private scholarship amount'
    },
    {
      id: 'grants',
      label: 'Total Grants',
      type: 'currency',
      explanation: 'Sum of all grant aid'
    },
    {
      id: 'scholarships',
      label: 'Total Scholarships',
      type: 'currency',
      explanation: 'Sum of all scholarship aid'
    },
    {
      id: 'workStudy',
      label: 'Work-Study',
      type: 'currency',
      explanation: 'Federal Work-Study award amount'
    },
    {
      id: 'federalLoans',
      label: 'Federal Loans',
      type: 'currency',
      explanation: 'Federal loan amounts'
    },
    {
      id: 'privateLoans',
      label: 'Private Loans',
      type: 'currency',
      explanation: 'Private loan amounts needed'
    },
    {
      id: 'netCost',
      label: 'Net Cost',
      type: 'currency',
      explanation: 'Cost after grants and scholarships'
    },
    {
      id: 'outOfPocket',
      label: 'Out-of-Pocket Cost',
      type: 'currency',
      explanation: 'Amount you need to pay after all aid'
    },
    {
      id: 'pellEligible',
      label: 'Pell Grant Eligible',
      type: 'text',
      explanation: 'Whether you qualify for Pell Grant'
    },
    {
      id: 'subsidizedLoanEligible',
      label: 'Subsidized Loan Eligible',
      type: 'text',
      explanation: 'Whether you qualify for subsidized loans'
    },
    {
      id: 'workStudyEligible',
      label: 'Work-Study Eligible',
      type: 'text',
      explanation: 'Whether you qualify for Federal Work-Study'
    },
    {
      id: 'recommendedActions',
      label: 'Recommended Actions',
      type: 'text',
      explanation: 'Steps you should take to maximize aid'
    },
    {
      id: 'priorityApplications',
      label: 'Priority Applications',
      type: 'text',
      explanation: 'Aid programs you should apply for first'
    },
    {
      id: 'additionalResources',
      label: 'Additional Resources',
      type: 'text',
      explanation: 'Other resources and contacts'
    }
  ],

  formulas: [fafsaFormula],

  validationRules: getFAFSAValidationRules(),

  examples: [
    {
      title: 'First-Year Dependent Student',
      description: 'Traditional freshman student with middle-income parents',
      inputs: {
        studentAge: 18,
        isDependent: true,
        maritalStatus: 'single',
        hasChildren: false,
        numberOfChildren: 0,
        parentIncome: 85000,
        parentAssets: 75000,
        parentFilingStatus: 'married-joint',
        numberOfFamilyMembers: 4,
        numberOfCollegeStudents: 1,
        studentIncome: 3000,
        studentAssets: 1500,
        studentSavings: 800,
        studentInvestments: 200,
        homeEquity: 60000,
        businessValue: 0,
        farmValue: 0,
        gradeLevel: 'freshman',
        enrollmentStatus: 'full-time',
        costOfAttendance: 35000,
        tuition: 25000,
        roomAndBoard: 8000,
        booksAndSupplies: 1000,
        transportation: 800,
        personalExpenses: 1200,
        attendingInState: true,
        hasDisability: false,
        isVeteran: false,
        isFosterYouth: false,
        hasSpecialCircumstances: false,
        specialCircumstancesDescription: '',
        annualExclusionGifts: 15000,
        lifetimeExclusionUsed: 0
      },
      expectedOutputs: {
        expectedFamilyContribution: 12000,
        studentContribution: 2000,
        parentContribution: 10000,
        financialNeed: 23000,
        pellGrantEligibility: 4000,
        federalWorkStudyEligibility: 3500,
        federalLoanEligibility: 5500,
        stateGrantEligibility: 2500,
        stateScholarshipEligibility: 1000,
        institutionalAidEligibility: 3000,
        privateScholarshipEligibility: 2000,
        grants: 6500,
        scholarships: 3000,
        workStudy: 3500,
        federalLoans: 5500,
        privateLoans: 6500,
        netCost: 28500,
        outOfPocket: 12000,
        pellEligible: 'Yes',
        subsidizedLoanEligible: 'Yes',
        workStudyEligible: 'Yes',
        recommendedActions: 'Complete FAFSA by October 1, Apply for state aid programs, Research institutional scholarships',
        priorityApplications: 'FAFSA, State aid applications, Institutional aid',
        additionalResources: 'College financial aid office, Federal Student Aid website, State higher education agency'
      }
    }
  ]
};