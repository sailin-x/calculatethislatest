import { ValidationRule } from '../../../types/validation';
import { ValidationRuleFactory } from '../../../utils/validation';
import { DeveloperSalaryInputs } from './types';

export const developerSalaryValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('role', 'Job role is required'),
  ValidationRuleFactory.required('experience', 'Experience level is required'),
  ValidationRuleFactory.required('location', 'Location is required'),
  ValidationRuleFactory.required('remoteWork', 'Work arrangement is required'),
  ValidationRuleFactory.required('companySize', 'Company size is required'),
  ValidationRuleFactory.required('techStack', 'Tech stack is required'),
  ValidationRuleFactory.required('education', 'Education level is required'),

  // Optional fields with ranges
  ValidationRuleFactory.range('certifications', 0, 20, 'Certifications must be between 0 and 20'),

  // Cross-field validations
  ValidationRuleFactory.createRule('experience', 'Experience level should align with role seniority', (value: any, allInputs?: Record<string, any>) => {
    const role = allInputs?.role;
    if (!role || !value) return true;
    
    // Senior roles should have appropriate experience
    const seniorRoles = ['staff-engineer', 'principal-engineer', 'senior-manager', 'director', 'vp-engineering'];
    if (seniorRoles.includes(role) && value === 'entry') return false;
    
    // Entry roles shouldn't have expert experience
    const entryRoles = ['software-engineer', 'frontend-developer', 'backend-developer', 'qa-engineer'];
    if (entryRoles.includes(role) && value === 'expert') return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('education', 'Education level should be realistic for experience', (value: any, allInputs?: Record<string, any>) => {
    const experience = allInputs?.experience;
    if (!experience || !value) return true;
    
    // Entry level with PhD is unusual
    if (experience === 'entry' && value === 'phd') return false;
    
    // Expert level with bootcamp only is unusual
    if (experience === 'expert' && value === 'bootcamp') return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('certifications', 'Certifications should be reasonable for experience level', (value: any, allInputs?: Record<string, any>) => {
    const experience = allInputs?.experience;
    if (!experience || !value) return true;
    
    const maxCerts = {
      'entry': 3,
      'mid': 5,
      'senior': 8,
      'lead': 10,
      'expert': 15
    };
    
    const maxForLevel = maxCerts[experience as keyof typeof maxCerts];
    return value <= maxForLevel;
  }),

  ValidationRuleFactory.createRule('techStack', 'Tech stack should align with role requirements', (value: any, allInputs?: Record<string, any>) => {
    const role = allInputs?.role;
    if (!role || !value) return true;
    
    const roleTechAlignment = {
      'frontend-developer': ['javascript', 'typescript', 'react', 'vue', 'angular'],
      'backend-developer': ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust'],
      'ml-engineer': ['python', 'machine-learning'],
      'devops-engineer': ['aws', 'kubernetes', 'go', 'python'],
      'data-engineer': ['python', 'java', 'scala', 'aws'],
      'security-engineer': ['python', 'go', 'rust', 'aws']
    };
    
    const expectedTech = roleTechAlignment[role as keyof typeof roleTechAlignment];
    if (expectedTech && !expectedTech.includes(value)) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('location', 'Location should be realistic for remote work arrangement', (value: any, allInputs?: Record<string, any>) => {
    const remoteWork = allInputs?.remoteWork;
    if (!remoteWork || !value) return true;
    
    // Remote work with specific city location might be confusing
    if (remoteWork === 'remote' && value !== 'remote') return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('companySize', 'Company size should align with industry expectations', (value: any, allInputs?: Record<string, any>) => {
    const industry = allInputs?.industry;
    if (!industry || !value) return true;
    
    // FAANG companies are typically large
    if (value === 'faang' && industry === 'nonprofit') return false;
    
    // Startups are typically in tech/crypto/ai
    if (value === 'startup' && ['government', 'nonprofit'].includes(industry)) return false;
    
    return true;
  })
];

export function validateDeveloperSalaryInputs(inputs: DeveloperSalaryInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.role) errors.push('Job role is required');
  if (!inputs.experience) errors.push('Experience level is required');
  if (!inputs.location) errors.push('Location is required');
  if (!inputs.remoteWork) errors.push('Work arrangement is required');
  if (!inputs.companySize) errors.push('Company size is required');
  if (!inputs.techStack) errors.push('Tech stack is required');
  if (!inputs.education) errors.push('Education level is required');
  
  // Optional field validations
  if (inputs.certifications !== undefined) {
    if (inputs.certifications < 0 || inputs.certifications > 20) {
      errors.push('Certifications must be between 0 and 20');
    }
  }
  
  // Cross-field validations
  const seniorRoles = ['staff-engineer', 'principal-engineer', 'senior-manager', 'director', 'vp-engineering'];
  if (seniorRoles.includes(inputs.role) && inputs.experience === 'entry') {
    errors.push('Senior roles typically require more experience than entry level');
  }
  
  const entryRoles = ['software-engineer', 'frontend-developer', 'backend-developer', 'qa-engineer'];
  if (entryRoles.includes(inputs.role) && inputs.experience === 'expert') {
    errors.push('Entry-level roles are typically not filled by expert-level candidates');
  }
  
  if (inputs.experience === 'entry' && inputs.education === 'phd') {
    errors.push('Entry-level positions with PhD degrees are unusual');
  }
  
  if (inputs.experience === 'expert' && inputs.education === 'bootcamp') {
    errors.push('Expert-level positions typically require more formal education');
  }
  
  if (inputs.certifications !== undefined) {
    const maxCerts = {
      'entry': 3,
      'mid': 5,
      'senior': 8,
      'lead': 10,
      'expert': 15
    };
    
    const maxForLevel = maxCerts[inputs.experience as keyof typeof maxCerts];
    if (inputs.certifications > maxForLevel) {
      errors.push(`Certification count seems high for ${inputs.experience} level experience`);
    }
  }
  
  // Tech stack validation
  const roleTechAlignment = {
    'frontend-developer': ['javascript', 'typescript', 'react', 'vue', 'angular'],
    'backend-developer': ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust'],
    'ml-engineer': ['python', 'machine-learning'],
    'devops-engineer': ['aws', 'kubernetes', 'go', 'python'],
    'data-engineer': ['python', 'java', 'scala', 'aws'],
    'security-engineer': ['python', 'go', 'rust', 'aws']
  };
  
  const expectedTech = roleTechAlignment[inputs.role as keyof typeof roleTechAlignment];
  if (expectedTech && !expectedTech.includes(inputs.techStack)) {
    errors.push(`Tech stack "${inputs.techStack}" may not be optimal for ${inputs.role} role`);
  }
  
  // Remote work validation
  if (inputs.remoteWork === 'remote' && inputs.location !== 'remote') {
    errors.push('Remote work arrangement should use "Remote" location');
  }
  
  // Company size validation
  if (inputs.companySize === 'faang' && inputs.industry === 'nonprofit') {
    errors.push('FAANG companies are not typically non-profit organizations');
  }
  
  if (inputs.companySize === 'startup' && ['government', 'nonprofit'].includes(inputs.industry || '')) {
    errors.push('Startups are typically not government or non-profit organizations');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
