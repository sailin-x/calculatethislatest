import { DeveloperSalaryInputs, DeveloperSalaryOutputs, DeveloperSalaryMetrics, SalaryRange, LocationComparison, IndustryComparison } from './types';

export function calculateDeveloperSalary(inputs: DeveloperSalaryInputs): DeveloperSalaryOutputs {
  const metrics = calculateDetailedMetrics(inputs);
  
  return {
    baseSalary: metrics.baseSalary,
    totalCompensation: metrics.totalCompensation,
    hourlyRate: metrics.hourlyRate,
    bonus: metrics.bonus,
    equity: metrics.equity,
    benefits: metrics.benefits,
    marketPercentile: metrics.marketPercentile,
    salaryRange: metrics.salaryRange,
    careerGrowthPotential: metrics.careerGrowthPotential,
    skillsGap: metrics.skillsGap,
    negotiationAdvice: metrics.negotiationAdvice,
    locationComparison: metrics.locationComparison,
    industryComparison: metrics.industryComparison,
    competitiveness: metrics.competitiveness,
    demandLevel: metrics.demandLevel,
    report: generateSalaryReport(inputs, metrics)
  };
}

function calculateDetailedMetrics(inputs: DeveloperSalaryInputs): DeveloperSalaryMetrics {
  const {
    role,
    experience,
    location,
    remoteWork,
    companySize,
    industry = 'technology',
    techStack,
    specializations = [],
    education,
    certifications = 0,
    performanceRating = 'meets',
    leadershipExperience = false,
    negotiationSkills = 'average',
    jobMarketDemand = 'moderate'
  } = inputs;

  // Base salary configurations
  const locations = {
    'san-francisco': { name: 'San Francisco, CA', multiplier: 1.5, baseSalary: 140000, col: 1.8 },
    'new-york': { name: 'New York, NY', multiplier: 1.3, baseSalary: 130000, col: 1.7 },
    'seattle': { name: 'Seattle, WA', multiplier: 1.25, baseSalary: 125000, col: 1.4 },
    'austin': { name: 'Austin, TX', multiplier: 1.1, baseSalary: 110000, col: 1.1 },
    'boston': { name: 'Boston, MA', multiplier: 1.2, baseSalary: 120000, col: 1.3 },
    'los-angeles': { name: 'Los Angeles, CA', multiplier: 1.15, baseSalary: 115000, col: 1.5 },
    'chicago': { name: 'Chicago, IL', multiplier: 1.0, baseSalary: 100000, col: 1.0 },
    'denver': { name: 'Denver, CO', multiplier: 1.05, baseSalary: 105000, col: 1.0 },
    'atlanta': { name: 'Atlanta, GA', multiplier: 0.9, baseSalary: 90000, col: 0.9 },
    'miami': { name: 'Miami, FL', multiplier: 0.95, baseSalary: 95000, col: 1.0 },
    'toronto': { name: 'Toronto, ON', multiplier: 0.85, baseSalary: 85000, col: 0.8 },
    'london': { name: 'London, UK', multiplier: 1.1, baseSalary: 110000, col: 1.2 },
    'berlin': { name: 'Berlin, Germany', multiplier: 0.8, baseSalary: 80000, col: 0.7 },
    'remote': { name: 'Remote (US)', multiplier: 1.1, baseSalary: 110000, col: 1.0 }
  };

  const roles = {
    'software-engineer': { name: 'Software Engineer', multiplier: 1.0 },
    'senior-engineer': { name: 'Senior Software Engineer', multiplier: 1.4 },
    'staff-engineer': { name: 'Staff Engineer', multiplier: 1.8 },
    'principal-engineer': { name: 'Principal Engineer', multiplier: 2.2 },
    'engineering-manager': { name: 'Engineering Manager', multiplier: 1.6 },
    'senior-manager': { name: 'Senior Engineering Manager', multiplier: 2.0 },
    'director': { name: 'Director of Engineering', multiplier: 2.5 },
    'vp-engineering': { name: 'VP of Engineering', multiplier: 3.2 },
    'frontend-developer': { name: 'Frontend Developer', multiplier: 0.95 },
    'backend-developer': { name: 'Backend Developer', multiplier: 1.05 },
    'fullstack-developer': { name: 'Full Stack Developer', multiplier: 1.0 },
    'devops-engineer': { name: 'DevOps Engineer', multiplier: 1.15 },
    'data-engineer': { name: 'Data Engineer', multiplier: 1.2 },
    'ml-engineer': { name: 'ML Engineer', multiplier: 1.3 },
    'security-engineer': { name: 'Security Engineer', multiplier: 1.25 },
    'mobile-developer': { name: 'Mobile Developer', multiplier: 1.1 },
    'qa-engineer': { name: 'QA Engineer', multiplier: 0.9 },
    'architect': { name: 'Software Architect', multiplier: 2.0 }
  };

  const experienceLevels = {
    'entry': { name: 'Entry Level (0-2 years)', multiplier: 0.7 },
    'mid': { name: 'Mid Level (3-5 years)', multiplier: 1.0 },
    'senior': { name: 'Senior (6-10 years)', multiplier: 1.4 },
    'lead': { name: 'Lead (10+ years)', multiplier: 1.8 },
    'expert': { name: 'Expert (15+ years)', multiplier: 2.1 }
  };

  const companySizes = {
    'startup': { name: 'Startup (<50 employees)', multiplier: 0.85, equityMultiplier: 2.0 },
    'small': { name: 'Small (50-200 employees)', multiplier: 0.95, equityMultiplier: 1.5 },
    'medium': { name: 'Medium (200-1000 employees)', multiplier: 1.0, equityMultiplier: 1.0 },
    'large': { name: 'Large (1000+ employees)', multiplier: 1.15, equityMultiplier: 0.8 },
    'faang': { name: 'FAANG/Big Tech', multiplier: 1.4, equityMultiplier: 1.2 },
    'unicorn': { name: 'Unicorn Startup', multiplier: 1.2, equityMultiplier: 2.5 },
    'consulting': { name: 'Consulting Firm', multiplier: 1.1, equityMultiplier: 0.2 }
  };

  const industries = {
    'technology': { name: 'Technology', multiplier: 1.0, growth: 15, demand: 'high' },
    'fintech': { name: 'Financial Technology', multiplier: 1.2, growth: 25, demand: 'very-high' },
    'finance': { name: 'Traditional Finance', multiplier: 1.15, growth: 8, demand: 'moderate' },
    'healthcare': { name: 'Healthcare/MedTech', multiplier: 1.1, growth: 18, demand: 'high' },
    'ecommerce': { name: 'E-commerce', multiplier: 1.05, growth: 12, demand: 'high' },
    'gaming': { name: 'Gaming', multiplier: 0.95, growth: 10, demand: 'moderate' },
    'crypto': { name: 'Cryptocurrency/Web3', multiplier: 1.3, growth: 30, demand: 'very-high' },
    'ai': { name: 'Artificial Intelligence', multiplier: 1.4, growth: 40, demand: 'very-high' },
    'enterprise': { name: 'Enterprise Software', multiplier: 1.1, growth: 12, demand: 'high' },
    'government': { name: 'Government/Defense', multiplier: 0.9, growth: 5, demand: 'low' },
    'nonprofit': { name: 'Non-profit', multiplier: 0.75, growth: 3, demand: 'low' },
    'other': { name: 'Other', multiplier: 1.0, growth: 8, demand: 'moderate' }
  };

  const techStacks = {
    'javascript': { name: 'JavaScript/Node.js', multiplier: 1.0, demand: 'high' },
    'typescript': { name: 'TypeScript', multiplier: 1.05, demand: 'very-high' },
    'python': { name: 'Python', multiplier: 1.05, demand: 'very-high' },
    'java': { name: 'Java', multiplier: 1.0, demand: 'high' },
    'csharp': { name: 'C#/.NET', multiplier: 1.0, demand: 'moderate' },
    'go': { name: 'Go', multiplier: 1.15, demand: 'high' },
    'rust': { name: 'Rust', multiplier: 1.2, demand: 'high' },
    'scala': { name: 'Scala', multiplier: 1.25, demand: 'moderate' },
    'kotlin': { name: 'Kotlin', multiplier: 1.1, demand: 'moderate' },
    'swift': { name: 'Swift', multiplier: 1.1, demand: 'moderate' },
    'react': { name: 'React', multiplier: 1.05, demand: 'very-high' },
    'vue': { name: 'Vue.js', multiplier: 1.0, demand: 'moderate' },
    'angular': { name: 'Angular', multiplier: 1.0, demand: 'moderate' },
    'aws': { name: 'AWS/Cloud', multiplier: 1.2, demand: 'very-high' },
    'kubernetes': { name: 'Kubernetes', multiplier: 1.15, demand: 'high' },
    'machine-learning': { name: 'Machine Learning', multiplier: 1.3, demand: 'very-high' },
    'blockchain': { name: 'Blockchain', multiplier: 1.4, demand: 'high' }
  };

  // Calculate multipliers
  const locationData = locations[location];
  const roleData = roles[role];
  const experienceData = experienceLevels[experience];
  const companyData = companySizes[companySize];
  const industryData = industries[industry];
  const techData = techStacks[techStack];

  const roleMultiplier = roleData.multiplier;
  const experienceMultiplier = experienceData.multiplier;
  const locationMultiplier = locationData.multiplier;
  const companyMultiplier = companyData.multiplier;
  const techStackMultiplier = techData.multiplier;
  const industryMultiplier = industryData.multiplier;

  // Education multiplier
  const educationMultipliers = {
    'bootcamp': 0.95,
    'associate': 0.98,
    'bachelors': 1.0,
    'masters': 1.05,
    'phd': 1.1
  };
  const educationMultiplier = educationMultipliers[education];

  // Performance multiplier
  const performanceMultipliers = {
    'exceeds': 1.1,
    'meets': 1.0,
    'below': 0.9
  };
  const performanceMultiplier = performanceMultipliers[performanceRating];

  // Remote work adjustment
  const remoteWorkMultipliers = {
    'onsite': 1.0,
    'hybrid': 1.02,
    'remote': 0.95
  };
  const remoteWorkMultiplier = remoteWorkMultipliers[remoteWork];

  // Negotiation skills multiplier
  const negotiationMultipliers = {
    'poor': 0.95,
    'average': 1.0,
    'good': 1.05,
    'excellent': 1.1
  };
  const negotiationMultiplier = negotiationMultipliers[negotiationSkills];

  // Market demand multiplier
  const demandMultipliers = {
    'low': 0.9,
    'moderate': 1.0,
    'high': 1.1,
    'very-high': 1.2
  };
  const demandMultiplier = demandMultipliers[jobMarketDemand];

  // Additional bonuses
  const leadershipBonus = leadershipExperience ? 0.05 : 0;
  const certificationBonus = Math.min(certifications * 0.02, 0.1); // Max 10% bonus
  const specializationBonus = Math.min(specializations.length * 0.03, 0.15); // Max 15% bonus

  // Calculate base salary
  const marketBaseSalary = locationData.baseSalary;
  const totalMultiplier = roleMultiplier * experienceMultiplier * companyMultiplier * 
                         techStackMultiplier * industryMultiplier * educationMultiplier * 
                         performanceMultiplier * remoteWorkMultiplier * negotiationMultiplier * 
                         demandMultiplier * (1 + leadershipBonus + certificationBonus + specializationBonus);

  const baseSalary = Math.round(marketBaseSalary * totalMultiplier);

  // Calculate other compensation components
  const bonusPercentage = companySize === 'faang' ? 0.2 : companySize === 'startup' ? 0.1 : 0.15;
  const bonus = Math.round(baseSalary * bonusPercentage);
  
  const equityMultiplier = companyData.equityMultiplier;
  const equity = Math.round(baseSalary * 0.25 * equityMultiplier);
  
  const benefitsPercentage = companySize === 'faang' ? 0.25 : companySize === 'startup' ? 0.15 : 0.2;
  const benefits = Math.round(baseSalary * benefitsPercentage);
  
  const totalCompensation = baseSalary + bonus + equity + benefits;
  const hourlyRate = Math.round(baseSalary / (40 * 52));

  // Market percentile calculation
  const marketPercentile = Math.min(95, Math.max(5, 
    50 + (totalCompensation - 150000) / 5000
  ));

  // Salary range calculation
  const salaryRange: SalaryRange = {
    min: Math.round(baseSalary * 0.8),
    median: baseSalary,
    max: Math.round(baseSalary * 1.4),
    p25: Math.round(baseSalary * 0.9),
    p75: Math.round(baseSalary * 1.15),
    p90: Math.round(baseSalary * 1.3)
  };

  // Career growth potential
  const growthPotentialScore = calculateGrowthPotential(role, experience, techStack, industry);
  const careerGrowthPotential = assessGrowthPotential(growthPotentialScore);

  // Skills gap analysis
  const skillsGap = identifySkillsGap(role, techStack, experience);

  // Negotiation advice
  const negotiationAdvice = generateNegotiationAdvice(marketPercentile, performanceRating, negotiationSkills);

  // Location comparison
  const locationComparison = generateLocationComparison(inputs, baseSalary);

  // Industry comparison
  const industryComparison = generateIndustryComparison(baseSalary, role, experience);

  // Competitiveness assessment
  const competitivenessScore = calculateCompetitivenessScore(inputs, totalCompensation);
  const competitiveness = assessCompetitiveness(competitivenessScore);

  // Demand level assessment
  const demandLevel = assessDemandLevel(techStack, role, industry);

  return {
    baseSalary,
    totalCompensation,
    hourlyRate,
    bonus,
    equity,
    benefits,
    marketPercentile: Math.round(marketPercentile),
    salaryRange,
    careerGrowthPotential,
    skillsGap,
    negotiationAdvice,
    locationComparison,
    industryComparison,
    competitiveness,
    demandLevel,
    roleMultiplier,
    experienceMultiplier,
    locationMultiplier,
    companyMultiplier,
    techStackMultiplier,
    industryMultiplier,
    educationMultiplier,
    performanceMultiplier,
    negotiationMultiplier,
    demandMultiplier,
    remoteWorkMultiplier,
    leadershipBonus,
    certificationBonus,
    specializationBonus,
    totalMultiplier,
    marketBaseSalary,
    equityMultiplier,
    bonusPercentage,
    benefitsPercentage,
    competitivenessScore,
    growthPotentialScore
  };
}

function calculateGrowthPotential(role: string, experience: string, techStack: string, industry: string): number {
  let score = 50; // Base score
  
  // Role growth potential
  const roleGrowth = {
    'software-engineer': 20,
    'senior-engineer': 15,
    'staff-engineer': 10,
    'principal-engineer': 5,
    'engineering-manager': 15,
    'senior-manager': 10,
    'director': 8,
    'vp-engineering': 5,
    'frontend-developer': 18,
    'backend-developer': 18,
    'fullstack-developer': 20,
    'devops-engineer': 25,
    'data-engineer': 30,
    'ml-engineer': 35,
    'security-engineer': 25,
    'mobile-developer': 15,
    'qa-engineer': 12,
    'architect': 10
  };
  score += roleGrowth[role as keyof typeof roleGrowth] || 15;
  
  // Experience level impact
  const expGrowth = {
    'entry': 30,
    'mid': 20,
    'senior': 10,
    'lead': 5,
    'expert': 0
  };
  score += expGrowth[experience as keyof typeof expGrowth];
  
  // Tech stack growth potential
  const techGrowth = {
    'machine-learning': 30,
    'blockchain': 25,
    'aws': 20,
    'kubernetes': 18,
    'go': 15,
    'rust': 15,
    'typescript': 12,
    'python': 10,
    'react': 8,
    'javascript': 5
  };
  score += techGrowth[techStack as keyof typeof techGrowth] || 5;
  
  // Industry growth potential
  const industryGrowth = {
    'ai': 35,
    'crypto': 30,
    'fintech': 25,
    'healthcare': 18,
    'technology': 15,
    'ecommerce': 12,
    'enterprise': 10,
    'finance': 8,
    'gaming': 8,
    'government': 3,
    'nonprofit': 2
  };
  score += industryGrowth[industry as keyof typeof industryGrowth] || 10;
  
  return Math.min(100, Math.max(0, score));
}

function assessGrowthPotential(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Very Good';
  if (score >= 50) return 'Good';
  if (score >= 35) return 'Fair';
  return 'Limited';
}

function identifySkillsGap(role: string, techStack: string, experience: string): string[] {
  const gaps: string[] = [];
  
  // High-value skills by role
  const highValueSkills = {
    'software-engineer': ['System Design', 'Cloud Architecture', 'Microservices'],
    'senior-engineer': ['Leadership', 'Mentoring', 'Architecture Design'],
    'staff-engineer': ['Technical Strategy', 'Cross-team Collaboration', 'Technical Writing'],
    'devops-engineer': ['Kubernetes', 'Terraform', 'Monitoring & Observability'],
    'data-engineer': ['Apache Spark', 'Data Modeling', 'Stream Processing'],
    'ml-engineer': ['MLOps', 'Model Deployment', 'A/B Testing'],
    'security-engineer': ['Zero Trust Architecture', 'Threat Modeling', 'Compliance'],
    'frontend-developer': ['Performance Optimization', 'Accessibility', 'Mobile-First Design'],
    'backend-developer': ['Database Optimization', 'API Design', 'Caching Strategies']
  };
  
  const roleSkills = highValueSkills[role as keyof typeof highValueSkills] || ['Problem Solving', 'Communication', 'Technical Leadership'];
  gaps.push(...roleSkills.slice(0, 3));
  
  // Tech stack specific recommendations
  if (!['machine-learning', 'aws', 'kubernetes'].includes(techStack)) {
    gaps.push('Cloud Technologies (AWS/Azure/GCP)');
  }
  
  if (experience === 'entry' || experience === 'mid') {
    gaps.push('System Design');
    gaps.push('Code Review Best Practices');
  }
  
  return gaps.slice(0, 5); // Return top 5 recommendations
}

function generateNegotiationAdvice(percentile: number, performance: string, negotiation: string): string {
  if (percentile >= 75 && performance === 'exceeds') {
    return 'Strong position for negotiation. Focus on total compensation and career growth opportunities.';
  } else if (percentile >= 50) {
    return 'Good negotiation position. Research market rates and prepare performance examples.';
  } else if (negotiation === 'poor') {
    return 'Improve negotiation skills first. Consider salary negotiation training and practice.';
  } else {
    return 'Focus on skill development and performance improvement to strengthen negotiation position.';
  }
}

function generateLocationComparison(inputs: DeveloperSalaryInputs, baseSalary: number): LocationComparison[] {
  const locations = [
    { key: 'san-francisco', name: 'San Francisco, CA', multiplier: 1.5, col: 1.8 },
    { key: 'new-york', name: 'New York, NY', multiplier: 1.3, col: 1.7 },
    { key: 'seattle', name: 'Seattle, WA', multiplier: 1.25, col: 1.4 },
    { key: 'austin', name: 'Austin, TX', multiplier: 1.1, col: 1.1 },
    { key: 'remote', name: 'Remote (US)', multiplier: 1.1, col: 1.0 }
  ];
  
  return locations.map(loc => {
    const locationSalary = Math.round(baseSalary * (loc.multiplier / 1.0)); // Normalize to current location
    const adjustedSalary = Math.round(locationSalary / loc.col);
    
    return {
      location: loc.name,
      baseSalary: locationSalary,
      totalCompensation: Math.round(locationSalary * 1.6), // Estimate total comp
      costOfLivingMultiplier: loc.col,
      adjustedSalary
    };
  });
}

function generateIndustryComparison(baseSalary: number, role: string, experience: string): IndustryComparison[] {
  const industries = [
    { key: 'ai', name: 'Artificial Intelligence', multiplier: 1.4, growth: 40, demand: 'Very High' },
    { key: 'fintech', name: 'Financial Technology', multiplier: 1.2, growth: 25, demand: 'Very High' },
    { key: 'healthcare', name: 'Healthcare/MedTech', multiplier: 1.1, growth: 18, demand: 'High' },
    { key: 'technology', name: 'Technology', multiplier: 1.0, growth: 15, demand: 'High' },
    { key: 'finance', name: 'Traditional Finance', multiplier: 1.15, growth: 8, demand: 'Moderate' }
  ];
  
  return industries.map(ind => ({
    industry: ind.name,
    averageSalary: Math.round(baseSalary * ind.multiplier),
    growthRate: ind.growth,
    demandLevel: ind.demand,
    description: `${ind.growth}% annual growth, ${ind.demand.toLowerCase()} demand for talent`
  }));
}

function calculateCompetitivenessScore(inputs: DeveloperSalaryInputs, totalComp: number): number {
  let score = 50; // Base score
  
  // Experience boost
  const expBoost = { 'entry': 0, 'mid': 10, 'senior': 20, 'lead': 30, 'expert': 35 };
  score += expBoost[inputs.experience];
  
  // Tech stack competitiveness
  const techBoost = {
    'machine-learning': 25, 'blockchain': 20, 'aws': 15, 'kubernetes': 15,
    'go': 12, 'rust': 12, 'typescript': 10, 'python': 8
  };
  score += techBoost[inputs.techStack as keyof typeof techBoost] || 5;
  
  // Total compensation impact
  if (totalComp > 300000) score += 20;
  else if (totalComp > 200000) score += 15;
  else if (totalComp > 150000) score += 10;
  else if (totalComp > 100000) score += 5;
  
  return Math.min(100, Math.max(0, score));
}

function assessCompetitiveness(score: number): string {
  if (score >= 80) return 'Highly Competitive';
  if (score >= 65) return 'Very Competitive';
  if (score >= 50) return 'Competitive';
  if (score >= 35) return 'Moderately Competitive';
  return 'Needs Improvement';
}

function assessDemandLevel(techStack: string, role: string, industry: string): string {
  const demandScores = {
    tech: { 'machine-learning': 5, 'blockchain': 4, 'aws': 4, 'kubernetes': 4, 'go': 3, 'rust': 3 },
    role: { 'ml-engineer': 5, 'security-engineer': 4, 'devops-engineer': 4, 'data-engineer': 4 },
    industry: { 'ai': 5, 'crypto': 4, 'fintech': 4, 'healthcare': 3 }
  };
  
  const techScore = demandScores.tech[techStack as keyof typeof demandScores.tech] || 2;
  const roleScore = demandScores.role[role as keyof typeof demandScores.role] || 2;
  const industryScore = demandScores.industry[industry as keyof typeof demandScores.industry] || 2;
  
  const totalScore = techScore + roleScore + industryScore;
  
  if (totalScore >= 12) return 'Extremely High';
  if (totalScore >= 10) return 'Very High';
  if (totalScore >= 8) return 'High';
  if (totalScore >= 6) return 'Moderate';
  return 'Low';
}

function generateSalaryReport(inputs: DeveloperSalaryInputs, metrics: DeveloperSalaryMetrics): string {
  const { role, experience, location, companySize, techStack, industry } = inputs;
  const { 
    baseSalary, totalCompensation, marketPercentile, careerGrowthPotential, 
    competitiveness, demandLevel, negotiationAdvice, skillsGap 
  } = metrics;

  return `# Developer Salary Analysis Report

## 📊 Position Overview
- **Role**: ${role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
- **Experience**: ${experience.charAt(0).toUpperCase() + experience.slice(1)} Level
- **Location**: ${location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
- **Company**: ${companySize.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
- **Tech Stack**: ${techStack.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
- **Industry**: ${industry?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Technology'}

## 💰 Compensation Breakdown
- **Base Salary**: $${baseSalary.toLocaleString()}
- **Total Compensation**: $${totalCompensation.toLocaleString()}
- **Market Percentile**: ${marketPercentile}th percentile
- **Hourly Rate**: $${metrics.hourlyRate}

### Component Breakdown:
- **Annual Bonus**: $${metrics.bonus.toLocaleString()} (${(metrics.bonusPercentage * 100).toFixed(1)}% of base)
- **Equity Value**: $${metrics.equity.toLocaleString()} (annual grant value)
- **Benefits**: $${metrics.benefits.toLocaleString()} (${(metrics.benefitsPercentage * 100).toFixed(1)}% of base)

## 📈 Market Analysis
- **Competitiveness**: ${competitiveness}
- **Market Demand**: ${demandLevel}
- **Career Growth Potential**: ${careerGrowthPotential}

## 🎯 Career Development
### Skills Gap Analysis:
${skillsGap.map(skill => `- ${skill}`).join('\n')}

### Negotiation Advice:
${negotiationAdvice}

## 🏙️ Location Insights
${generateLocationInsights(inputs, metrics)}

## 🏢 Industry Trends
${generateIndustryInsights(inputs, metrics)}

## 📋 Key Recommendations
${generateRecommendations(inputs, metrics)}
`;
}

function generateLocationInsights(inputs: DeveloperSalaryInputs, metrics: DeveloperSalaryMetrics): string {
  const topLocations = metrics.locationComparison.slice(0, 3);
  return topLocations.map(loc => 
    `- **${loc.location}**: $${loc.baseSalary.toLocaleString()} (Adjusted for COL: $${loc.adjustedSalary.toLocaleString()})`
  ).join('\n');
}

function generateIndustryInsights(inputs: DeveloperSalaryInputs, metrics: DeveloperSalaryMetrics): string {
  const topIndustries = metrics.industryComparison.slice(0, 3);
  return topIndustries.map(ind => 
    `- **${ind.industry}**: $${ind.averageSalary.toLocaleString()} avg (${ind.growthRate}% growth)`
  ).join('\n');
}

function generateRecommendations(inputs: DeveloperSalaryInputs, metrics: DeveloperSalaryMetrics): string {
  const recommendations: string[] = [];
  
  if (metrics.marketPercentile < 50) {
    recommendations.push('- **Skill Development**: Focus on high-demand technologies to increase market value');
  }
  
  if (inputs.negotiationSkills === 'poor' || inputs.negotiationSkills === 'average') {
    recommendations.push('- **Negotiation Skills**: Improve salary negotiation abilities through training');
  }
  
  if (metrics.careerGrowthPotential === 'Limited' || metrics.careerGrowthPotential === 'Fair') {
    recommendations.push('- **Career Pivot**: Consider roles or technologies with higher growth potential');
  }
  
  if (!inputs.leadershipExperience && (inputs.experience === 'senior' || inputs.experience === 'lead')) {
    recommendations.push('- **Leadership Development**: Gain leadership experience to access management tracks');
  }
  
  recommendations.push('- **Continuous Learning**: Stay updated with industry trends and emerging technologies');
  recommendations.push('- **Network Building**: Develop professional relationships for career opportunities');
  
  return recommendations.join('\n');
}
