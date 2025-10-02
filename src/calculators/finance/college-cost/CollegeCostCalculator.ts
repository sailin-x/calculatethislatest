import { Calculator } from '../../types/calculator';
import { CollegeCostInputs, CollegeCostOutputs } from './types';
import { calculateCollegeCost } from './formulas';
import { validateCollegeCostInputs } from './validation';

export const CollegeCostCalculator: Calculator = {
  id: 'college-cost-calculator',
  title: 'College Cost Calculator',
  category: 'finance',
  subcategory: 'Education',
  description: 'Calculate total college costs, required savings, and financial aid impact. Plan for tuition, room and board, and other education expenses with inflation and investment projections.',

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
      id: 'yearsUntilCollege',
      label: 'Years Until College',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '1',
      tooltip: 'Years until student starts college'
    },
    {
      id: 'collegeStartYear',
      label: 'College Start Year',
      type: 'number',
      required: true,
      min: new Date().getFullYear(),
      max: new Date().getFullYear() + 20,
      step: 1,
      placeholder: new Date().getFullYear().toString(),
      tooltip: 'Year student will start college'
    },
    {
      id: 'degreeType',
      label: 'Degree Type',
      type: 'select',
      required: true,
      options: [
        { value: 'associate', label: 'Associate Degree (2 years)' },
        { value: 'bachelor', label: 'Bachelor Degree (4 years)' },
        { value: 'masters', label: 'Master Degree (2 years)' },
        { value: 'phd', label: 'PhD (4-6 years)' },
        { value: 'professional', label: 'Professional Degree (3-4 years)' }
      ],
      placeholder: 'bachelor',
      tooltip: 'Type of degree program'
    },
    {
      id: 'collegeType',
      label: 'College Type',
      type: 'select',
      required: true,
      options: [
        { value: 'community_college', label: 'Community College' },
        { value: 'public_in_state', label: 'Public In-State' },
        { value: 'public_out_state', label: 'Public Out-of-State' },
        { value: 'private_nonprofit', label: 'Private Nonprofit' },
        { value: 'private_for_profit', label: 'Private For-Profit' }
      ],
      placeholder: 'public_in_state',
      tooltip: 'Type of college or university'
    },

    // Cost Information
    {
      id: 'annualTuition',
      label: 'Annual Tuition ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 80000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Annual tuition and fees'
    },
    {
      id: 'annualRoomAndBoard',
      label: 'Annual Room & Board ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 30000,
      step: 1000,
      placeholder: '12000',
      tooltip: 'Annual housing and meal costs'
    },
    {
      id: 'annualBooksAndSupplies',
      label: 'Annual Books & Supplies ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '1200',
      tooltip: 'Annual textbook and supply costs'
    },
    {
      id: 'annualTransportation',
      label: 'Annual Transportation ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1500',
      tooltip: 'Annual transportation costs'
    },
    {
      id: 'annualPersonalExpenses',
      label: 'Annual Personal Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2000',
      tooltip: 'Annual miscellaneous personal expenses'
    },
    {
      id: 'annualHealthInsurance',
      label: 'Annual Health Insurance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 8000,
      step: 100,
      placeholder: '2000',
      tooltip: 'Annual health insurance costs'
    },
    {
      id: 'oneTimeFees',
      label: 'One-Time Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '500',
      tooltip: 'Application, orientation, and other one-time fees'
    },

    // Financial Aid
    {
      id: 'expectedGrants',
      label: 'Expected Grants ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Expected annual grant aid'
    },
    {
      id: 'expectedScholarships',
      label: 'Expected Scholarships ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2000',
      tooltip: 'Expected annual scholarship aid'
    },
    {
      id: 'expectedWorkStudy',
      label: 'Expected Work-Study ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 500,
      placeholder: '2000',
      tooltip: 'Expected annual work-study earnings'
    },
    {
      id: 'expectedStudentLoans',
      label: 'Expected Student Loans ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Expected annual student loan borrowing'
    },
    {
      id: 'expectedParentLoans',
      label: 'Expected Parent Loans ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 150000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Expected annual parent loan borrowing'
    },
    {
      id: 'expectedFamilyContribution',
      label: 'Expected Family Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Expected annual family contribution'
    },

    // Planning Parameters
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected annual college cost inflation'
    },
    {
      id: 'investmentReturn',
      label: 'Investment Return (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '7',
      tooltip: 'Expected annual return on savings investments'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '25',
      tooltip: 'Marginal tax rate on investment returns'
    },
    {
      id: 'planningHorizon',
      label: 'Planning Horizon (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 20,
      step: 1,
      placeholder: '4',
      tooltip: 'Years to plan college costs for'
    },

    // Scenario Analysis
    {
      id: 'optimisticGrowth',
      label: 'Optimistic Growth (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: '8',
      tooltip: 'Best case cost increase scenario'
    },
    {
      id: 'pessimisticGrowth',
      label: 'Pessimistic Growth (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 10,
      step: 0.5,
      placeholder: '1',
      tooltip: 'Worst case cost increase scenario'
    },
    {
      id: 'probabilityOptimistic',
      label: 'Probability Optimistic (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 5,
      placeholder: '20',
      tooltip: 'Likelihood of optimistic scenario'
    },
    {
      id: 'probabilityPessimistic',
      label: 'Probability Pessimistic (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 5,
      placeholder: '20',
      tooltip: 'Likelihood of pessimistic scenario'
    },

    // Additional Options
    {
      id: 'includeSummerSchool',
      label: 'Include Summer School',
      type: 'boolean',
      required: true,
      tooltip: 'Include summer school costs'
    },
    {
      id: 'summerSchoolCost',
      label: 'Summer School Cost ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 20000,
      step: 500,
      placeholder: '3000',
      tooltip: 'Annual summer school tuition cost'
    },
    {
      id: 'includeStudyAbroad',
      label: 'Include Study Abroad',
      type: 'boolean',
      required: true,
      tooltip: 'Include study abroad program costs'
    },
    {
      id: 'studyAbroadCost',
      label: 'Study Abroad Cost ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '15000',
      tooltip: 'Total study abroad program cost'
    },
    {
      id: 'includeInternships',
      label: 'Include Internships',
      type: 'boolean',
      required: true,
      tooltip: 'Include internship earnings'
    },
    {
      id: 'internshipEarnings',
      label: 'Internship Earnings ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '15000',
      tooltip: 'Annual internship earnings'
    },

    // Location and Currency
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
    { id: 'totalFourYearCost', label: 'Total 4-Year Cost', type: 'currency', explanation: 'Total cost for 4 years of college' },
    { id: 'totalDegreeCost', label: 'Total Degree Cost', type: 'currency', explanation: 'Total cost for complete degree program' },
    { id: 'requiredMonthlySavings', label: 'Required Monthly Savings', type: 'currency', explanation: 'Monthly savings needed to reach goal' },
    { id: 'netTotalCost', label: 'Net Total Cost', type: 'currency', explanation: 'Total cost after financial aid' },
    { id: 'annualAverageCost', label: 'Annual Average Cost', type: 'currency', explanation: 'Average annual cost' },
    { id: 'totalAid', label: 'Total Aid', type: 'currency', explanation: 'Total expected financial aid' },
    { id: 'aidGap', label: 'Aid Gap', type: 'currency', explanation: 'Uncovered cost after aid' },
    { id: 'optimisticTotalCost', label: 'Optimistic Total Cost', type: 'currency', explanation: 'Best case total cost' },
    { id: 'pessimisticTotalCost', label: 'Pessimistic Total Cost', type: 'currency', explanation: 'Worst case total cost' },
    { id: 'affordabilityRating', label: 'Affordability Rating', type: 'text', explanation: 'Overall affordability assessment' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive cost analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Public In-State University',
      description: '4-year degree at a public university with moderate financial aid',
      inputs: {
        studentAge: 17,
        yearsUntilCollege: 1,
        collegeStartYear: new Date().getFullYear() + 1,
        degreeType: 'bachelor',
        collegeType: 'public_in_state',
        annualTuition: 10000,
        annualRoomAndBoard: 12000,
        annualBooksAndSupplies: 1200,
        annualTransportation: 1500,
        annualPersonalExpenses: 2000,
        annualHealthInsurance: 2000,
        oneTimeFees: 500,
        expectedGrants: 5000,
        expectedScholarships: 2000,
        expectedWorkStudy: 2000,
        expectedStudentLoans: 5000,
        expectedParentLoans: 10000,
        expectedFamilyContribution: 5000,
        inflationRate: 3,
        investmentReturn: 7,
        taxRate: 25,
        planningHorizon: 4,
        optimisticGrowth: 8,
        pessimisticGrowth: 1,
        probabilityOptimistic: 20,
        probabilityPessimistic: 20,
        includeSummerSchool: false,
        includeStudyAbroad: false,
        includeInternships: true,
        internshipEarnings: 15000,
        location: 'State College, USA',
        currency: 'USD'
      },
      expectedOutputs: {
        totalFourYearCost: 160000,
        totalDegreeCost: 160000,
        requiredMonthlySavings: 800,
        netTotalCost: 120000,
        annualAverageCost: 40000,
        totalAid: 40000,
        aidGap: 120000,
        optimisticTotalCost: 180000,
        pessimisticTotalCost: 140000,
        affordabilityRating: 'Manageable',
        analysis: 'Comprehensive college cost analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter student information and college details',
    'Input current and projected costs',
    'Specify expected financial aid amounts',
    'Review savings requirements and affordability analysis'
  ]
};