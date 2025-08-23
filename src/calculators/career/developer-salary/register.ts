import { CalculatorRegistration } from '../../../types/calculator';
import { calculateDeveloperSalary } from './formulas';
import { validateDeveloperSalaryInputs } from './validation';
import { DeveloperSalaryInputs } from './types';

const developerSalaryCalculator: CalculatorRegistration = {
  id: 'developer-salary',
  name: 'Developer Salary Calculator',
  description: 'Calculate software developer salaries based on role, experience, location, and market factors',
  category: 'career',
  tags: ['salary', 'career', 'software', 'developer', 'compensation', 'tech', 'job-market'],
  
  inputs: {
    role: {
      type: 'select',
      label: 'Job Role',
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
    experience: {
      type: 'select',
      label: 'Experience Level',
      required: true,
      options: [
        { value: 'entry', label: 'Entry Level (0-2 years)' },
        { value: 'mid', label: 'Mid Level (3-5 years)' },
        { value: 'senior', label: 'Senior (6-8 years)' },
        { value: 'lead', label: 'Lead (9-12 years)' },
        { value: 'expert', label: 'Expert (13+ years)' }
      ]
    },
    location: {
      type: 'select',
      label: 'Location',
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
    remoteWork: {
      type: 'select',
      label: 'Work Arrangement',
      required: true,
      options: [
        { value: 'onsite', label: 'On-site' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'remote', label: 'Remote' }
      ]
    },
    companySize: {
      type: 'select',
      label: 'Company Size',
      required: true,
      options: [
        { value: 'startup', label: 'Startup (< 50 employees)' },
        { value: 'small', label: 'Small (50-200 employees)' },
        { value: 'medium', label: 'Medium (200-1000 employees)' },
        { value: 'large', label: 'Large (1000+ employees)' },
        { value: 'faang', label: 'FAANG/Tech Giant' }
      ]
    },
    industry: {
      type: 'select',
      label: 'Industry',
      required: false,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'crypto', label: 'Cryptocurrency/Blockchain' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'education', label: 'Education' },
        { value: 'government', label: 'Government' },
        { value: 'nonprofit', label: 'Non-profit' }
      ]
    },
    techStack: {
      type: 'select',
      label: 'Primary Tech Stack',
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
    education: {
      type: 'select',
      label: 'Education Level',
      required: true,
      options: [
        { value: 'bootcamp', label: 'Coding Bootcamp' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelors', label: 'Bachelor\'s Degree' },
        { value: 'masters', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' }
      ]
    },
    certifications: {
      type: 'number',
      label: 'Professional Certifications',
      required: false,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '0'
    },
    performanceRating: {
      type: 'select',
      label: 'Performance Rating',
      required: false,
      options: [
        { value: 'exceeds', label: 'Exceeds Expectations' },
        { value: 'meets', label: 'Meets Expectations' },
        { value: 'below', label: 'Below Expectations' }
      ]
    },
    leadershipExperience: {
      type: 'boolean',
      label: 'Leadership Experience',
      required: false
    },
    negotiationSkills: {
      type: 'select',
      label: 'Negotiation Skills',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'average', label: 'Average' },
        { value: 'poor', label: 'Poor' }
      ]
    },
    jobMarketDemand: {
      type: 'select',
      label: 'Job Market Demand',
      required: false,
      options: [
        { value: 'high', label: 'High Demand' },
        { value: 'moderate', label: 'Moderate Demand' },
        { value: 'low', label: 'Low Demand' }
      ]
    }
  },
  
  calculate: (inputs: DeveloperSalaryInputs, allInputs?: Record<string, any>) => {
    return calculateDeveloperSalary(inputs, allInputs);
  },
  
  validate: (inputs: DeveloperSalaryInputs, allInputs?: Record<string, any>) => {
    return validateDeveloperSalaryInputs(inputs, allInputs);
  },
  
  examples: [
    {
      name: 'Senior Software Engineer in San Francisco',
      inputs: {
        role: 'senior-engineer',
        experience: 'senior',
        location: 'san-francisco',
        remoteWork: 'hybrid',
        companySize: 'large',
        industry: 'technology',
        techStack: 'javascript',
        education: 'bachelors',
        certifications: 3,
        performanceRating: 'meets',
        leadershipExperience: false,
        negotiationSkills: 'good',
        jobMarketDemand: 'high'
      }
    },
    {
      name: 'ML Engineer at FAANG',
      inputs: {
        role: 'ml-engineer',
        experience: 'expert',
        location: 'seattle',
        remoteWork: 'onsite',
        companySize: 'faang',
        industry: 'ai',
        techStack: 'machine-learning',
        education: 'phd',
        certifications: 5,
        performanceRating: 'exceeds',
        leadershipExperience: true,
        negotiationSkills: 'excellent',
        jobMarketDemand: 'high'
      }
    },
    {
      name: 'Frontend Developer Remote',
      inputs: {
        role: 'frontend-developer',
        experience: 'mid',
        location: 'remote',
        remoteWork: 'remote',
        companySize: 'startup',
        industry: 'technology',
        techStack: 'react',
        education: 'bachelors',
        certifications: 1,
        performanceRating: 'meets',
        leadershipExperience: false,
        negotiationSkills: 'average',
        jobMarketDemand: 'moderate'
      }
    }
  ],
  
  relatedCalculators: [
    'ai-prompt-cost',
    'gpu-mining-profitability',
    'crypto-staking-returns',
    'nft-royalty-calculator'
  ]
};

export default developerSalaryCalculator;
