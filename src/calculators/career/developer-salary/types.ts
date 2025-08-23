export interface DeveloperSalaryInputs {
  // Core Position Details
  role: 'software-engineer' | 'senior-engineer' | 'staff-engineer' | 'principal-engineer' | 'engineering-manager' | 'senior-manager' | 'director' | 'vp-engineering' | 'frontend-developer' | 'backend-developer' | 'fullstack-developer' | 'devops-engineer' | 'data-engineer' | 'ml-engineer' | 'security-engineer' | 'mobile-developer' | 'qa-engineer' | 'architect';
  experience: 'entry' | 'mid' | 'senior' | 'lead' | 'expert';
  
  // Location & Remote Work
  location: 'san-francisco' | 'new-york' | 'seattle' | 'austin' | 'boston' | 'los-angeles' | 'chicago' | 'denver' | 'atlanta' | 'miami' | 'toronto' | 'london' | 'berlin' | 'remote';
  remoteWork: 'onsite' | 'hybrid' | 'remote';
  
  // Company & Industry
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'faang' | 'unicorn' | 'consulting';
  industry?: 'technology' | 'fintech' | 'finance' | 'healthcare' | 'ecommerce' | 'gaming' | 'crypto' | 'ai' | 'enterprise' | 'government' | 'nonprofit' | 'other';
  
  // Technical Skills
  techStack: 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'go' | 'rust' | 'scala' | 'kotlin' | 'swift' | 'react' | 'vue' | 'angular' | 'aws' | 'kubernetes' | 'machine-learning' | 'blockchain';
  specializations?: string[];
  
  // Education & Certifications
  education: 'bootcamp' | 'associate' | 'bachelors' | 'masters' | 'phd';
  certifications?: number;
  
  // Performance & Leadership
  performanceRating?: 'exceeds' | 'meets' | 'below';
  leadershipExperience?: boolean;
  
  // Market Factors
  negotiationSkills?: 'poor' | 'average' | 'good' | 'excellent';
  jobMarketDemand?: 'low' | 'moderate' | 'high' | 'very-high';
}

export interface DeveloperSalaryOutputs {
  // Core Compensation
  baseSalary: number;
  totalCompensation: number;
  hourlyRate: number;
  
  // Compensation Breakdown
  bonus: number;
  equity: number;
  benefits: number;
  
  // Market Analysis
  marketPercentile: number;
  salaryRange: SalaryRange;
  
  // Career Insights
  careerGrowthPotential: string;
  skillsGap: string[];
  negotiationAdvice: string;
  
  // Comparative Analysis
  locationComparison: LocationComparison[];
  industryComparison: IndustryComparison[];
  
  // Performance Metrics
  competitiveness: string;
  demandLevel: string;
  report: string;
}

export interface SalaryRange {
  min: number;
  median: number;
  max: number;
  p25: number;
  p75: number;
  p90: number;
}

export interface LocationComparison {
  location: string;
  baseSalary: number;
  totalCompensation: number;
  costOfLivingMultiplier: number;
  adjustedSalary: number;
}

export interface IndustryComparison {
  industry: string;
  averageSalary: number;
  growthRate: number;
  demandLevel: string;
  description: string;
}

export interface DeveloperSalaryMetrics {
  // Core Compensation
  baseSalary: number;
  totalCompensation: number;
  hourlyRate: number;
  
  // Compensation Breakdown
  bonus: number;
  equity: number;
  benefits: number;
  
  // Market Analysis
  marketPercentile: number;
  salaryRange: SalaryRange;
  
  // Career Insights
  careerGrowthPotential: string;
  skillsGap: string[];
  negotiationAdvice: string;
  
  // Comparative Analysis
  locationComparison: LocationComparison[];
  industryComparison: IndustryComparison[];
  
  // Performance Metrics
  competitiveness: string;
  demandLevel: string;
  
  // Internal calculations
  roleMultiplier: number;
  experienceMultiplier: number;
  locationMultiplier: number;
  companyMultiplier: number;
  techStackMultiplier: number;
  industryMultiplier: number;
  educationMultiplier: number;
  performanceMultiplier: number;
  negotiationMultiplier: number;
  demandMultiplier: number;
  remoteWorkMultiplier: number;
  leadershipBonus: number;
  certificationBonus: number;
  specializationBonus: number;
  totalMultiplier: number;
  marketBaseSalary: number;
  equityMultiplier: number;
  bonusPercentage: number;
  benefitsPercentage: number;
  competitivenessScore: number;
  growthPotentialScore: number;
}
