import { Calculator, CalculatorInput, CalculatorOutput, ValidationRule, CalculatorExample } from '../../../types/calculator';
import { calculateDeveloperSalary } from './formulas';
import { validateDeveloperSalaryInputs } from './validation';
import { DeveloperSalaryInputs } from './types';

const developerSalaryCalculator: Calculator = {
  id: 'developer-salary',
  title: 'Developer Salary Calculator',
  description: 'Calculate software developer salaries based on role, experience, location, and market factors',
  category: 'business',
  subcategory: 'career',
  usageInstructions: [
    'Select your job role and experience level',
    'Choose your location and work arrangement',
    'Specify company size and industry',
    'Select your primary tech stack and education level',
    'Review the comprehensive salary analysis'
  ],

  inputs: [
    {
      id: 'role',
      label: 'Job Role',
      type: 'select',
      required: true,
      options: [
        { value: 'software-engineer', label: 'Software Engineer' },
        { value: 'senior-engineer', label: 'Senior Engineer' },
        { value: 'staff-engineer', label: 'Staff Engineer' },
        { value: 'principal-engineer', label: 'Principal Engineer' },
        { value: 'engineering-manager', label: 'Engineering Manager' },
        { value: 'senior-manager', label: 'Senior Manager' },
        { value: 'director', label: 'Director' },
        { value: 'vp-engineering', label: 'VP Engineering' },
        { value: 'frontend-developer', label: 'Frontend Developer' },
        { value: 'backend-developer', label: 'Backend Developer' },
        { value: 'fullstack-developer', label: 'Full Stack Developer' },
        { value: 'devops-engineer', label: 'DevOps Engineer' },
        { value: 'data-engineer', label: 'Data Engineer' },
        { value: 'ml-engineer', label: 'ML Engineer' },
        { value: 'security-engineer', label: 'Security Engineer' },
        { value: 'mobile-developer', label: 'Mobile Developer' },
        { value: 'qa-engineer', label: 'QA Engineer' },
        { value: 'architect', label: 'Software Architect' }
      ]
    },
    {
      id: 'experience',
      label: 'Experience Level',
      type: 'select',
      required: true,
      options: [
        { value: 'entry', label: 'Entry Level (0-2 years)' },
        { value: 'mid', label: 'Mid Level (3-5 years)' },
        { value: 'senior', label: 'Senior (6-8 years)' },
        { value: 'lead', label: 'Lead (9-12 years)' },
        { value: 'expert', label: 'Expert (13+ years)' }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'select',
      required: true,
      options: [
        { value: 'san-francisco', label: 'San Francisco, CA' },
        { value: 'new-york', label: 'New York, NY' },
        { value: 'seattle', label: 'Seattle, WA' },
        { value: 'austin', label: 'Austin, TX' },
        { value: 'boston', label: 'Boston, MA' },
        { value: 'los-angeles', label: 'Los Angeles, CA' },
        { value: 'chicago', label: 'Chicago, IL' },
        { value: 'denver', label: 'Denver, CO' },
        { value: 'atlanta', label: 'Atlanta, GA' },
        { value: 'miami', label: 'Miami, FL' },
        { value: 'toronto', label: 'Toronto, Canada' },
        { value: 'london', label: 'London, UK' },
        { value: 'berlin', label: 'Berlin, Germany' },
        { value: 'remote', label: 'Remote' }
      ]
    },
    {
      id: 'remoteWork',
      label: 'Work Arrangement',
      type: 'select',
      required: true,
      options: [
        { value: 'onsite', label: 'On-site' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'remote', label: 'Remote' }
      ]
    },
    {
      id: 'companySize',
      label: 'Company Size',
      type: 'select',
      required: true,
      options: [
        { value: 'startup', label: 'Startup (< 50 employees)' },
        { value: 'small', label: 'Small (50-200 employees)' },
        { value: 'medium', label: 'Medium (200-1000 employees)' },
        { value: 'large', label: 'Large (1000+ employees)' },
        { value: 'faang', label: 'FAANG/Tech Giant' }
      ]
    },
    {
      id: 'techStack',
      label: 'Primary Tech Stack',
      type: 'select',
      required: true,
      options: [
        { value: 'javascript', label: 'JavaScript/TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'scala', label: 'Scala' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'swift', label: 'Swift' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'aws', label: 'AWS/Cloud' },
        { value: 'kubernetes', label: 'Kubernetes' },
        { value: 'machine-learning', label: 'Machine Learning' },
        { value: 'blockchain', label: 'Blockchain' }
      ]
    },
    {
      id: 'education',
      label: 'Education Level',
      type: 'select',
      required: true,
      options: [
        { value: 'bootcamp', label: 'Coding Bootcamp' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelors', label: 'Bachelor\'s Degree' },
        { value: 'masters', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' }
      ]
    }
  ],

  outputs: [
    {
      id: 'baseSalary',
      label: 'Base Salary',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual base salary'
    },
    {
      id: 'totalCompensation',
      label: 'Total Compensation',
      type: 'currency',
      format: 'USD',
      explanation: 'Total annual compensation including all benefits'
    },
    {
      id: 'marketPercentile',
      label: 'Market Percentile',
      type: 'percentage',
      explanation: 'Salary percentile in the market'
    }
  ],

  formulas: [
    {
      id: 'developer-salary-calculation',
      name: 'Developer Salary Calculation',
      description: 'Calculate comprehensive developer compensation',
      calculate: (inputs: Record<string, any>) => {
        const result = calculateDeveloperSalary(inputs as DeveloperSalaryInputs);
        return {
          outputs: {
            baseSalary: result.baseSalary,
            totalCompensation: result.totalCompensation,
            marketPercentile: result.marketPercentile
          },
          explanation: 'Developer salary calculated based on role, experience, location, and market factors'
        };
      }
    }
  ],

  validationRules: [],

  examples: [
    {
      title: 'Senior Software Engineer in San Francisco',
      description: 'Senior engineer at a large tech company',
      inputs: {
        role: 'senior-engineer',
        experience: 'senior',
        location: 'san-francisco',
        remoteWork: 'hybrid',
        companySize: 'large',
        techStack: 'javascript',
        education: 'bachelors'
      },
      expectedOutputs: {
        baseSalary: 180000,
        totalCompensation: 250000,
        marketPercentile: 75
      }
    }
  ]
};

export default developerSalaryCalculator;
