import { DeveloperSalaryInputs, DeveloperSalaryOutputs } from './types';
import { calculateDeveloperSalary } from './formulas';
import { developerSalaryValidationRules } from './validation';
import { validateDeveloperSalaryInputs } from './validation';
import { quickValidateExperience, quickValidateLocation, quickValidateRole } from './quickValidation';

export const developerSalaryCalculator = {
  name: 'Developer Salary & Compensation Calculator',
  category: 'Career',
  description: 'Calculate software developer salaries by location, experience, tech stack, and company size with comprehensive market analysis',
  icon: '💻',
  
  inputs: {
    // Core Position Details
    role: {
      type: 'select',
      label: 'Job Role',
      description: 'Software development role and seniority level',
      options: [
        { value: 'software-engineer', label: 'Software Engineer', multiplier: 1.0 },
        { value: 'senior-engineer', label: 'Senior Software Engineer', multiplier: 1.4 },
        { value: 'staff-engineer', label: 'Staff Engineer', multiplier: 1.8 },
        { value: 'principal-engineer', label: 'Principal Engineer', multiplier: 2.2 },
        { value: 'engineering-manager', label: 'Engineering Manager', multiplier: 1.6 },
        { value: 'senior-manager', label: 'Senior Engineering Manager', multiplier: 2.0 },
        { value: 'director', label: 'Director of Engineering', multiplier: 2.5 },
        { value: 'vp-engineering', label: 'VP of Engineering', multiplier: 3.2 },
        { value: 'frontend-developer', label: 'Frontend Developer', multiplier: 0.95 },
        { value: 'backend-developer', label: 'Backend Developer', multiplier: 1.05 },
        { value: 'fullstack-developer', label: 'Full Stack Developer', multiplier: 1.0 },
        { value: 'devops-engineer', label: 'DevOps Engineer', multiplier: 1.15 },
        { value: 'data-engineer', label: 'Data Engineer', multiplier: 1.2 },
        { value: 'ml-engineer', label: 'ML Engineer', multiplier: 1.3 },
        { value: 'security-engineer', label: 'Security Engineer', multiplier: 1.25 },
        { value: 'mobile-developer', label: 'Mobile Developer', multiplier: 1.1 },
        { value: 'qa-engineer', label: 'QA Engineer', multiplier: 0.9 },
        { value: 'architect', label: 'Software Architect', multiplier: 2.0 }
      ],
      required: true
    },
    experience: {
      type: 'select',
      label: 'Experience Level',
      description: 'Years of professional software development experience',
      options: [
        { value: 'entry', label: 'Entry Level (0-2 years)', multiplier: 0.7 },
        { value: 'mid', label: 'Mid Level (3-5 years)', multiplier: 1.0 },
        { value: 'senior', label: 'Senior (6-10 years)', multiplier: 1.4 },
        { value: 'lead', label: 'Lead (10+ years)', multiplier: 1.8 },
        { value: 'expert', label: 'Expert (15+ years)', multiplier: 2.1 }
      ],
      required: true
    },
    
    // Location & Remote Work
    location: {
      type: 'select',
      label: 'Location',
      description: 'Primary work location or market',
      options: [
        { value: 'san-francisco', label: 'San Francisco, CA', multiplier: 1.5, baseSalary: 140000 },
        { value: 'new-york', label: 'New York, NY', multiplier: 1.3, baseSalary: 130000 },
        { value: 'seattle', label: 'Seattle, WA', multiplier: 1.25, baseSalary: 125000 },
        { value: 'austin', label: 'Austin, TX', multiplier: 1.1, baseSalary: 110000 },
        { value: 'boston', label: 'Boston, MA', multiplier: 1.2, baseSalary: 120000 },
        { value: 'los-angeles', label: 'Los Angeles, CA', multiplier: 1.15, baseSalary: 115000 },
        { value: 'chicago', label: 'Chicago, IL', multiplier: 1.0, baseSalary: 100000 },
        { value: 'denver', label: 'Denver, CO', multiplier: 1.05, baseSalary: 105000 },
        { value: 'atlanta', label: 'Atlanta, GA', multiplier: 0.9, baseSalary: 90000 },
        { value: 'miami', label: 'Miami, FL', multiplier: 0.95, baseSalary: 95000 },
        { value: 'toronto', label: 'Toronto, ON', multiplier: 0.85, baseSalary: 85000 },
        { value: 'london', label: 'London, UK', multiplier: 1.1, baseSalary: 110000 },
        { value: 'berlin', label: 'Berlin, Germany', multiplier: 0.8, baseSalary: 80000 },
        { value: 'remote', label: 'Remote (US)', multiplier: 1.1, baseSalary: 110000 }
      ],
      required: true
    },
    remoteWork: {
      type: 'select',
      label: 'Work Arrangement',
      description: 'Remote work flexibility',
      options: [
        { value: 'onsite', label: 'On-site' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'remote', label: 'Fully Remote' }
      ],
      required: true
    },
    
    // Company & Industry
    companySize: {
      type: 'select',
      label: 'Company Size',
      description: 'Size and type of company',
      options: [
        { value: 'startup', label: 'Startup (<50 employees)', multiplier: 0.85, equityMultiplier: 2.0 },
        { value: 'small', label: 'Small (50-200 employees)', multiplier: 0.95, equityMultiplier: 1.5 },
        { value: 'medium', label: 'Medium (200-1000 employees)', multiplier: 1.0, equityMultiplier: 1.0 },
        { value: 'large', label: 'Large (1000+ employees)', multiplier: 1.15, equityMultiplier: 0.8 },
        { value: 'faang', label: 'FAANG/Big Tech', multiplier: 1.4, equityMultiplier: 1.2 },
        { value: 'unicorn', label: 'Unicorn Startup', multiplier: 1.2, equityMultiplier: 2.5 },
        { value: 'consulting', label: 'Consulting Firm', multiplier: 1.1, equityMultiplier: 0.2 }
      ],
      required: true
    },
    industry: {
      type: 'select',
      label: 'Industry',
      description: 'Primary industry sector',
      options: [
        { value: 'technology', label: 'Technology', multiplier: 1.0 },
        { value: 'fintech', label: 'Financial Technology', multiplier: 1.2 },
        { value: 'finance', label: 'Traditional Finance', multiplier: 1.15 },
        { value: 'healthcare', label: 'Healthcare/MedTech', multiplier: 1.1 },
        { value: 'ecommerce', label: 'E-commerce', multiplier: 1.05 },
        { value: 'gaming', label: 'Gaming', multiplier: 0.95 },
        { value: 'crypto', label: 'Cryptocurrency/Web3', multiplier: 1.3 },
        { value: 'ai', label: 'Artificial Intelligence', multiplier: 1.4 },
        { value: 'enterprise', label: 'Enterprise Software', multiplier: 1.1 },
        { value: 'government', label: 'Government/Defense', multiplier: 0.9 },
        { value: 'nonprofit', label: 'Non-profit', multiplier: 0.75 },
        { value: 'other', label: 'Other', multiplier: 1.0 }
      ],
      required: false,
      default: 'technology'
    },
    
    // Technical Skills
    techStack: {
      type: 'select',
      label: 'Primary Tech Stack',
      description: 'Main programming language or technology',
      options: [
        { value: 'javascript', label: 'JavaScript/Node.js', multiplier: 1.0 },
        { value: 'typescript', label: 'TypeScript', multiplier: 1.05 },
        { value: 'python', label: 'Python', multiplier: 1.05 },
        { value: 'java', label: 'Java', multiplier: 1.0 },
        { value: 'csharp', label: 'C#/.NET', multiplier: 1.0 },
        { value: 'go', label: 'Go', multiplier: 1.15 },
        { value: 'rust', label: 'Rust', multiplier: 1.2 },
        { value: 'scala', label: 'Scala', multiplier: 1.25 },
        { value: 'kotlin', label: 'Kotlin', multiplier: 1.1 },
        { value: 'swift', label: 'Swift', multiplier: 1.1 },
        { value: 'react', label: 'React', multiplier: 1.05 },
        { value: 'vue', label: 'Vue.js', multiplier: 1.0 },
        { value: 'angular', label: 'Angular', multiplier: 1.0 },
        { value: 'aws', label: 'AWS/Cloud', multiplier: 1.2 },
        { value: 'kubernetes', label: 'Kubernetes', multiplier: 1.15 },
        { value: 'machine-learning', label: 'Machine Learning', multiplier: 1.3 },
        { value: 'blockchain', label: 'Blockchain', multiplier: 1.4 }
      ],
      required: true
    },
    specializations: {
      type: 'multiselect',
      label: 'Specializations',
      description: 'Additional technical specializations',
      options: [
        { value: 'ai-ml', label: 'AI/Machine Learning', multiplier: 1.2 },
        { value: 'cloud-architecture', label: 'Cloud Architecture', multiplier: 1.15 },
        { value: 'cybersecurity', label: 'Cybersecurity', multiplier: 1.2 },
        { value: 'blockchain', label: 'Blockchain/Web3', multiplier: 1.3 },
        { value: 'data-science', label: 'Data Science', multiplier: 1.15 },
        { value: 'microservices', label: 'Microservices', multiplier: 1.1 },
        { value: 'mobile', label: 'Mobile Development', multiplier: 1.05 },
        { value: 'performance', label: 'Performance Optimization', multiplier: 1.1 },
        { value: 'scalability', label: 'Scalability/Distributed Systems', multiplier: 1.15 }
      ],
      required: false
    },
    
    // Education & Certifications
    education: {
      type: 'select',
      label: 'Education Level',
      description: 'Highest level of education completed',
      options: [
        { value: 'bootcamp', label: 'Bootcamp/Self-taught', multiplier: 0.95 },
        { value: 'associate', label: 'Associate Degree', multiplier: 0.98 },
        { value: 'bachelors', label: 'Bachelor\'s Degree', multiplier: 1.0 },
        { value: 'masters', label: 'Master\'s Degree', multiplier: 1.05 },
        { value: 'phd', label: 'PhD', multiplier: 1.1 }
      ],
      required: true
    },
    certifications: {
      type: 'number',
      label: 'Professional Certifications',
      unit: 'count',
      description: 'Number of relevant professional certifications',
      placeholder: '0',
      required: false,
      min: 0,
      max: 20,
      default: 0
    },
    
    // Performance & Leadership
    performanceRating: {
      type: 'select',
      label: 'Performance Rating',
      description: 'Recent performance evaluation',
      options: [
        { value: 'exceeds', label: 'Exceeds Expectations', multiplier: 1.1 },
        { value: 'meets', label: 'Meets Expectations', multiplier: 1.0 },
        { value: 'below', label: 'Below Expectations', multiplier: 0.9 }
      ],
      required: false,
      default: 'meets'
    },
    leadershipExperience: {
      type: 'boolean',
      label: 'Leadership Experience',
      description: 'Have you managed teams or led projects?',
      required: false,
      default: false
    },
    
    // Market Factors
    negotiationSkills: {
      type: 'select',
      label: 'Negotiation Skills',
      description: 'Self-assessed negotiation ability',
      options: [
        { value: 'poor', label: 'Poor', multiplier: 0.95 },
        { value: 'average', label: 'Average', multiplier: 1.0 },
        { value: 'good', label: 'Good', multiplier: 1.05 },
        { value: 'excellent', label: 'Excellent', multiplier: 1.1 }
      ],
      required: false,
      default: 'average'
    },
    jobMarketDemand: {
      type: 'select',
      label: 'Job Market Demand',
      description: 'Current demand for your skills',
      options: [
        { value: 'low', label: 'Low Demand', multiplier: 0.9 },
        { value: 'moderate', label: 'Moderate Demand', multiplier: 1.0 },
        { value: 'high', label: 'High Demand', multiplier: 1.1 },
        { value: 'very-high', label: 'Very High Demand', multiplier: 1.2 }
      ],
      required: false,
      default: 'moderate'
    }
  },
  
  outputs: {
    // Core Compensation
    baseSalary: {
      type: 'number',
      label: 'Base Salary',
      unit: 'USD',
      description: 'Annual base salary'
    },
    totalCompensation: {
      type: 'number',
      label: 'Total Compensation',
      unit: 'USD',
      description: 'Total annual compensation including all benefits'
    },
    hourlyRate: {
      type: 'number',
      label: 'Hourly Rate',
      unit: 'USD',
      description: 'Equivalent hourly rate'
    },
    
    // Compensation Breakdown
    bonus: {
      type: 'number',
      label: 'Annual Bonus',
      unit: 'USD',
      description: 'Expected annual bonus'
    },
    equity: {
      type: 'number',
      label: 'Equity Value',
      unit: 'USD',
      description: 'Annual equity grant value'
    },
    benefits: {
      type: 'number',
      label: 'Benefits Value',
      unit: 'USD',
      description: 'Value of health, retirement, and other benefits'
    },
    
    // Market Analysis
    marketPercentile: {
      type: 'number',
      label: 'Market Percentile',
      unit: '%',
      description: 'Salary percentile in the market'
    },
    salaryRange: {
      type: 'object',
      label: 'Salary Range',
      description: 'Market salary range for this position'
    },
    
    // Career Insights
    careerGrowthPotential: {
      type: 'string',
      label: 'Career Growth Potential',
      description: 'Assessment of career advancement opportunities'
    },
    skillsGap: {
      type: 'array',
      label: 'Skills Gap',
      description: 'Recommended skills to increase compensation'
    },
    negotiationAdvice: {
      type: 'string',
      label: 'Negotiation Advice',
      description: 'Personalized salary negotiation guidance'
    },
    
    // Comparative Analysis
    locationComparison: {
      type: 'array',
      label: 'Location Comparison',
      description: 'Salary comparison across different locations'
    },
    industryComparison: {
      type: 'array',
      label: 'Industry Comparison',
      description: 'Salary comparison across industries'
    },
    
    // Performance Metrics
    competitiveness: {
      type: 'string',
      label: 'Competitiveness',
      description: 'How competitive your profile is in the market'
    },
    demandLevel: {
      type: 'string',
      label: 'Demand Level',
      description: 'Market demand for your skill set'
    },
    report: {
      type: 'string',
      label: 'Detailed Report',
      description: 'Comprehensive salary and career analysis'
    }
  },
  
  calculate: calculateDeveloperSalary,
  validate: validateDeveloperSalaryInputs,
  validationRules: developerSalaryValidationRules,
  quickValidation: {
    experience: quickValidateExperience,
    location: quickValidateLocation,
    role: quickValidateRole
  }
};
