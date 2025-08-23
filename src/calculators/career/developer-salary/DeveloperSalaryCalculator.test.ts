import { describe, it, expect } from 'vitest';
import { calculateDeveloperSalary } from './formulas';
import { validateDeveloperSalaryInputs } from './validation';
import { quickValidateExperience, quickValidateLocation, quickValidateRole } from './quickValidation';
import { DeveloperSalaryInputs } from './types';

describe('Developer Salary Calculator', () => {
  const validInputs: DeveloperSalaryInputs = {
    role: 'software-engineer',
    experience: 'mid',
    location: 'san-francisco',
    remoteWork: 'hybrid',
    companySize: 'large',
    industry: 'technology',
    techStack: 'javascript',
    education: 'bachelors',
    certifications: 2,
    performanceRating: 'meets',
    leadershipExperience: false,
    negotiationSkills: 'average',
    jobMarketDemand: 'moderate'
  };

  describe('calculateDeveloperSalary', () => {
    it('should calculate basic salary metrics correctly', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.baseSalary).toBeGreaterThan(0);
      expect(result.totalCompensation).toBeGreaterThan(result.baseSalary);
      expect(result.hourlyRate).toBeGreaterThan(0);
      expect(result.bonus).toBeGreaterThan(0);
      expect(result.equity).toBeGreaterThan(0);
      expect(result.benefits).toBeGreaterThan(0);
    });

    it('should handle different experience levels', () => {
      const entryInputs = { ...validInputs, experience: 'entry' as const };
      const seniorInputs = { ...validInputs, experience: 'senior' as const };
      
      const entryResult = calculateDeveloperSalary(entryInputs);
      const seniorResult = calculateDeveloperSalary(seniorInputs);
      
      expect(seniorResult.baseSalary).toBeGreaterThan(entryResult.baseSalary);
    });

    it('should handle different locations', () => {
      const sfInputs = { ...validInputs, location: 'san-francisco' as const };
      const atlantaInputs = { ...validInputs, location: 'atlanta' as const };
      
      const sfResult = calculateDeveloperSalary(sfInputs);
      const atlantaResult = calculateDeveloperSalary(atlantaInputs);
      
      expect(sfResult.baseSalary).toBeGreaterThan(atlantaResult.baseSalary);
    });

    it('should handle different company sizes', () => {
      const startupInputs = { ...validInputs, companySize: 'startup' as const };
      const faangInputs = { ...validInputs, companySize: 'faang' as const };
      
      const startupResult = calculateDeveloperSalary(startupInputs);
      const faangResult = calculateDeveloperSalary(faangInputs);
      
      expect(faangResult.baseSalary).toBeGreaterThan(startupResult.baseSalary);
    });

    it('should calculate market percentile correctly', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.marketPercentile).toBeGreaterThan(0);
      expect(result.marketPercentile).toBeLessThanOrEqual(100);
    });

    it('should generate comprehensive report', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.report).toContain('Developer Salary Analysis Report');
      expect(result.report).toContain('Position Overview');
      expect(result.report).toContain('Compensation Breakdown');
      expect(result.report).toContain('Market Analysis');
    });

    it('should provide career insights', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.careerGrowthPotential).toBeDefined();
      expect(result.skillsGap).toHaveLength.greaterThan(0);
      expect(result.negotiationAdvice).toBeDefined();
    });

    it('should compare locations', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.locationComparison).toHaveLength.greaterThan(0);
      expect(result.locationComparison[0]).toHaveProperty('location');
      expect(result.locationComparison[0]).toHaveProperty('baseSalary');
    });

    it('should compare industries', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      expect(result.industryComparison).toHaveLength.greaterThan(0);
      expect(result.industryComparison[0]).toHaveProperty('industry');
      expect(result.industryComparison[0]).toHaveProperty('averageSalary');
    });
  });

  describe('validateDeveloperSalaryInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateDeveloperSalaryInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).role;
      
      const result = validateDeveloperSalaryInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Job role is required');
    });

    it('should validate experience-role alignment', () => {
      const invalidInputs = { ...validInputs, role: 'staff-engineer', experience: 'entry' };
      const result = validateDeveloperSalaryInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Senior roles typically require more experience');
    });

    it('should validate education-experience alignment', () => {
      const invalidInputs = { ...validInputs, experience: 'entry', education: 'phd' };
      const result = validateDeveloperSalaryInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Entry-level positions with PhD degrees are unusual');
    });

    it('should validate certification limits', () => {
      const invalidInputs = { ...validInputs, experience: 'entry', certifications: 10 };
      const result = validateDeveloperSalaryInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Certification count seems high for entry level experience');
    });

    it('should validate tech stack alignment', () => {
      const invalidInputs = { ...validInputs, role: 'frontend-developer', techStack: 'python' };
      const result = validateDeveloperSalaryInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tech stack "python" may not be optimal for frontend-developer role');
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateExperience', () => {
      it('should validate correct experience level', () => {
        const result = quickValidateExperience('senior');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid experience level', () => {
        const result = quickValidateExperience('invalid');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid experience level');
      });

      it('should validate experience-role alignment', () => {
        const result = quickValidateExperience('entry', { role: 'staff-engineer' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Senior roles typically require more experience');
      });
    });

    describe('quickValidateLocation', () => {
      it('should validate correct location', () => {
        const result = quickValidateLocation('san-francisco');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid location', () => {
        const result = quickValidateLocation('invalid-city');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid location');
      });

      it('should validate remote work alignment', () => {
        const result = quickValidateLocation('san-francisco', { remoteWork: 'remote' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Remote work should use "Remote" location');
      });
    });

    describe('quickValidateRole', () => {
      it('should validate correct role', () => {
        const result = quickValidateRole('software-engineer');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid role', () => {
        const result = quickValidateRole('invalid-role');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid job role');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle remote work scenarios', () => {
      const remoteInputs = { ...validInputs, location: 'remote', remoteWork: 'remote' };
      const result = calculateDeveloperSalary(remoteInputs);
      
      expect(result.baseSalary).toBeGreaterThan(0);
    });

    it('should handle high-demand tech stacks', () => {
      const mlInputs = { ...validInputs, techStack: 'machine-learning' };
      const result = calculateDeveloperSalary(mlInputs);
      
      expect(result.baseSalary).toBeGreaterThan(validInputs.role === 'ml-engineer' ? 0 : 0);
    });

    it('should handle leadership experience', () => {
      const leadershipInputs = { ...validInputs, leadershipExperience: true };
      const result = calculateDeveloperSalary(leadershipInputs);
      
      expect(result.baseSalary).toBeGreaterThan(0);
    });

    it('should handle multiple certifications', () => {
      const certInputs = { ...validInputs, certifications: 5 };
      const result = calculateDeveloperSalary(certInputs);
      
      expect(result.baseSalary).toBeGreaterThan(0);
    });
  });

  describe('Performance Tests', () => {
    it('should handle complex calculations efficiently', () => {
      const complexInputs = { 
        ...validInputs, 
        role: 'vp-engineering',
        experience: 'expert',
        location: 'san-francisco',
        companySize: 'faang',
        techStack: 'machine-learning'
      };
      
      const startTime = Date.now();
      const result = calculateDeveloperSalary(complexInputs);
      const endTime = Date.now();
      
      expect(result.totalCompensation).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle all role types', () => {
      const roles = [
        'software-engineer', 'senior-engineer', 'staff-engineer', 'principal-engineer',
        'engineering-manager', 'senior-manager', 'director', 'vp-engineering'
      ];
      
      roles.forEach(role => {
        const inputs = { ...validInputs, role: role as any };
        const result = calculateDeveloperSalary(inputs);
        expect(result.baseSalary).toBeGreaterThan(0);
      });
    });
  });

  describe('Market Analysis', () => {
    it('should provide accurate market percentile', () => {
      const highSalaryInputs = { 
        ...validInputs, 
        role: 'vp-engineering',
        experience: 'expert',
        location: 'san-francisco',
        companySize: 'faang'
      };
      
      const result = calculateDeveloperSalary(highSalaryInputs);
      expect(result.marketPercentile).toBeGreaterThan(70);
    });

    it('should compare locations accurately', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      const sfComparison = result.locationComparison.find(loc => loc.location.includes('San Francisco'));
      const remoteComparison = result.locationComparison.find(loc => loc.location.includes('Remote'));
      
      expect(sfComparison?.baseSalary).toBeGreaterThan(remoteComparison?.baseSalary || 0);
    });

    it('should provide industry insights', () => {
      const result = calculateDeveloperSalary(validInputs);
      
      const aiIndustry = result.industryComparison.find(ind => ind.industry.includes('Artificial Intelligence'));
      expect(aiIndustry?.growthRate).toBeGreaterThan(20);
    });
  });
});
