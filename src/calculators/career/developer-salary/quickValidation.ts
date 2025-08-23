export function quickValidateExperience(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Experience level is required' };
  }
  
  const validLevels = ['entry', 'mid', 'senior', 'lead', 'expert'];
  if (!validLevels.includes(value)) {
    return { isValid: false, message: 'Invalid experience level' };
  }
  
  // Cross-validation with role
  const role = allInputs?.role;
  if (role) {
    const seniorRoles = ['staff-engineer', 'principal-engineer', 'senior-manager', 'director', 'vp-engineering'];
    if (seniorRoles.includes(role) && value === 'entry') {
      return { isValid: false, message: 'Senior roles typically require more experience' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateLocation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Location is required' };
  }
  
  const validLocations = [
    'san-francisco', 'new-york', 'seattle', 'austin', 'boston', 'los-angeles',
    'chicago', 'denver', 'atlanta', 'miami', 'toronto', 'london', 'berlin', 'remote'
  ];
  
  if (!validLocations.includes(value)) {
    return { isValid: false, message: 'Invalid location' };
  }
  
  // Cross-validation with remote work
  const remoteWork = allInputs?.remoteWork;
  if (remoteWork === 'remote' && value !== 'remote') {
    return { isValid: false, message: 'Remote work should use "Remote" location' };
  }
  
  return { isValid: true };
}

export function quickValidateRole(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Job role is required' };
  }
  
  const validRoles = [
    'software-engineer', 'senior-engineer', 'staff-engineer', 'principal-engineer',
    'engineering-manager', 'senior-manager', 'director', 'vp-engineering',
    'frontend-developer', 'backend-developer', 'fullstack-developer', 'devops-engineer',
    'data-engineer', 'ml-engineer', 'security-engineer', 'mobile-developer',
    'qa-engineer', 'architect'
  ];
  
  if (!validRoles.includes(value)) {
    return { isValid: false, message: 'Invalid job role' };
  }
  
  return { isValid: true };
}

export function quickValidateTechStack(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Tech stack is required' };
  }
  
  const validTechStacks = [
    'javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust', 'scala',
    'kotlin', 'swift', 'react', 'vue', 'angular', 'aws', 'kubernetes',
    'machine-learning', 'blockchain'
  ];
  
  if (!validTechStacks.includes(value)) {
    return { isValid: false, message: 'Invalid tech stack' };
  }
  
  // Cross-validation with role
  const role = allInputs?.role;
  if (role) {
    const roleTechAlignment = {
      'frontend-developer': ['javascript', 'typescript', 'react', 'vue', 'angular'],
      'backend-developer': ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust'],
      'ml-engineer': ['python', 'machine-learning'],
      'devops-engineer': ['aws', 'kubernetes', 'go', 'python'],
      'data-engineer': ['python', 'java', 'scala', 'aws'],
      'security-engineer': ['python', 'go', 'rust', 'aws']
    };
    
    const expectedTech = roleTechAlignment[role as keyof typeof roleTechAlignment];
    if (expectedTech && !expectedTech.includes(value)) {
      return { isValid: false, message: `Tech stack may not be optimal for ${role} role` };
    }
  }
  
  return { isValid: true };
}

export function quickValidateEducation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Education level is required' };
  }
  
  const validEducation = ['bootcamp', 'associate', 'bachelors', 'masters', 'phd'];
  if (!validEducation.includes(value)) {
    return { isValid: false, message: 'Invalid education level' };
  }
  
  // Cross-validation with experience
  const experience = allInputs?.experience;
  if (experience === 'entry' && value === 'phd') {
    return { isValid: false, message: 'Entry level with PhD is unusual' };
  }
  
  if (experience === 'expert' && value === 'bootcamp') {
    return { isValid: false, message: 'Expert level with bootcamp only is unusual' };
  }
  
  return { isValid: true };
}

export function quickValidateCertifications(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Certifications must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Certifications cannot be negative' };
  }
  
  if (numValue > 20) {
    return { isValid: false, message: 'Certifications cannot exceed 20' };
  }
  
  // Cross-validation with experience
  const experience = allInputs?.experience;
  if (experience) {
    const maxCerts = {
      'entry': 3,
      'mid': 5,
      'senior': 8,
      'lead': 10,
      'expert': 15
    };
    
    const maxForLevel = maxCerts[experience as keyof typeof maxCerts];
    if (numValue > maxForLevel) {
      return { isValid: false, message: `Certification count seems high for ${experience} level` };
    }
  }
  
  return { isValid: true };
}
