import { describe, it, expect } from 'vitest';
import { TermLifeInsuranceCalculator } from './TermLifeInsuranceCalculator';
import { validateTermLifeInsuranceInputs } from './validation';
import { validateAllTermLifeInsuranceInputs } from './quickValidation';
import { calculateTermLifeInsurance, generateTermLifeInsuranceAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('TermLifeInsuranceCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(TermLifeInsuranceCalculator.id).toBe('term-life-insurance-calculator');
      expect(TermLifeInsuranceCalculator.name).toBe('Term Life Insurance Calculator');
      expect(TermLifeInsuranceCalculator.category).toBe('finance');
      expect(TermLifeInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputs = TermLifeInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'age')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'gender')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'coverageAmount')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'termLength')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = TermLifeInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualPremium');
      expect(outputIds).toContain('monthlyPremium');
      expect(outputIds).toContain('totalPremium');
      expect(outputIds).toContain('coverageNeeded');
      expect(outputIds).toContain('coverageGap');
      expect(outputIds).toContain('premiumPerThousand');
      expect(outputIds).toContain('affordabilityScore');
      expect(outputIds).toContain('adequacyScore');
      expect(outputIds).toContain('valueScore');
      expect(outputIds).toContain('riskScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof TermLifeInsuranceCalculator.calculate).toBe('function');
      expect(typeof TermLifeInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    describe('Comprehensive Validation', () => {
      it('should validate required fields', () => {
        const inputs: CalculatorInputs = {};
        const result = validateTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Age is required');
        expect(result.errors).toContain('Gender is required');
        expect(result.errors).toContain('Coverage amount is required');
        expect(result.errors).toContain('Term length is required');
      });

      it('should validate valid inputs', () => {
        const inputs: CalculatorInputs = {
          age: 35,
          gender: 'male',
          coverageAmount: 500000,
          termLength: 20
        };
        const result = validateTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should validate age ranges', () => {
        const inputs: CalculatorInputs = {
          age: 15,
          gender: 'male',
          coverageAmount: 500000,
          termLength: 20
        };
        const result = validateTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Age must be at least 18');
      });

      it('should validate coverage amount ranges', () => {
        const inputs: CalculatorInputs = {
          age: 35,
          gender: 'male',
          coverageAmount: 5000,
          termLength: 20
        };
        const result = validateTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Coverage amount must be at least $10,000');
      });

      it('should provide warnings for smoking status', () => {
        const inputs: CalculatorInputs = {
          age: 35,
          gender: 'male',
          coverageAmount: 500000,
          termLength: 20,
          filingStatus: 'smoker'
        };
        const result = validateTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Smoking significantly increases premiums - consider quitting for better rates');
      });
    });

    describe('Quick Validation', () => {
      it('should validate individual fields', () => {
        const { validateAge, validateGender, validateCoverageAmount } = require('./quickValidation');
        
        expect(validateAge(35)).toBeNull();
        expect(validateAge(15)).toContain('Age must be at least 18');
        
        expect(validateGender('male')).toBeNull();
        expect(validateGender('invalid')).toContain('Gender must be one of');
        
        expect(validateCoverageAmount(500000)).toBeNull();
        expect(validateCoverageAmount(5000)).toContain('Coverage amount must be at least $10,000');
      });

      it('should validate all inputs together', () => {
        const inputs: CalculatorInputs = {
          age: 35,
          gender: 'male',
          coverageAmount: 500000,
          termLength: 20,
          filingStatus: 'smoker'
        };
        const result = validateAllTermLifeInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Smoking significantly increases premiums - consider quitting for better rates');
      });
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic premium for healthy male', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        healthRating: 'preferred-plus'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBe(outputs.annualPremium / 12);
      expect(outputs.totalPremium).toBe(outputs.annualPremium * 20);
      expect(outputs.premiumPerThousand).toBeGreaterThan(0);
      expect(outputs.costPerDay).toBeGreaterThan(0);
    });

    it('should calculate coverage needs', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        annualIncome: 75000,
        debts: 200000,
        dependents: 2,
        spouseIncome: 50000
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.coverageNeeded).toBeGreaterThan(0);
      expect(outputs.coverageGap).toBeDefined();
    });

    it('should calculate affordability score', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        annualIncome: 75000
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.affordabilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(100);
    });

    it('should calculate adequacy score', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        annualIncome: 75000,
        debts: 200000
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.adequacyScore).toBeGreaterThanOrEqual(0);
      expect(outputs.adequacyScore).toBeLessThanOrEqual(100);
    });

    it('should calculate value score', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
    });

    it('should calculate risk score', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        healthRating: 'standard',
        medicalConditions: 'none'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle smoker premiums', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        filingStatus: 'smoker'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });

    it('should handle different health ratings', () => {
      const baseInputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      
      const preferredOutputs = calculateTermLifeInsurance({ ...baseInputs, healthRating: 'preferred-plus' });
      const standardOutputs = calculateTermLifeInsurance({ ...baseInputs, healthRating: 'standard' });
      const substandardOutputs = calculateTermLifeInsurance({ ...baseInputs, healthRating: 'substandard' });
      
      expect(preferredOutputs.annualPremium).toBeLessThan(standardOutputs.annualPremium);
      expect(standardOutputs.annualPremium).toBeLessThan(substandardOutputs.annualPremium);
    });

    it('should calculate term comparison', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.termComparison).toBeDefined();
      expect(outputs.termComparison.length).toBeGreaterThan(0);
      expect(outputs.termComparison[0]).toHaveProperty('term');
      expect(outputs.termComparison[0]).toHaveProperty('annualPremium');
    });

    it('should calculate policy comparison', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.policyComparison).toBeDefined();
      expect(outputs.policyComparison.length).toBeGreaterThan(0);
      expect(outputs.policyComparison[0]).toHaveProperty('type');
      expect(outputs.policyComparison[0]).toHaveProperty('annualPremium');
    });

    it('should calculate financial metrics', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        discountRate: 5,
        investmentReturn: 7
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.presentValue).toBeDefined();
      expect(outputs.futureValue).toBeDefined();
      expect(outputs.opportunityCost).toBeDefined();
      expect(outputs.breakevenYears).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum coverage amount', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 10000,
        termLength: 10
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle maximum age', () => {
      const inputs: CalculatorInputs = {
        age: 75,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 10
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });

    it('should handle high-risk factors', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        filingStatus: 'smoker',
        healthRating: 'substandard',
        occupation: 'aviation',
        hobbies: 'skydiving'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(70);
    });

    it('should handle zero income', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.affordabilityScore).toBe(50); // Default score for no income
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        annualIncome: 75000,
        filingStatus: 'non-smoker'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      const report = generateTermLifeInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Term Life Insurance Analysis Report');
      expect(report).toContain('Policy Summary');
      expect(report).toContain('Coverage Analysis');
      expect(report).toContain('Financial Analysis');
      expect(report).toContain('Term Length Comparison');
      expect(report).toContain('Policy Type Comparison');
      expect(report).toContain('Recommendations');
    });

    it('should include coverage gap information', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 200000,
        termLength: 20,
        annualIncome: 75000,
        debts: 300000
      };
      const outputs = calculateTermLifeInsurance(inputs);
      const report = generateTermLifeInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Coverage Gap');
    });

    it('should include risk factors in report', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20,
        filingStatus: 'smoker'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      const report = generateTermLifeInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Risk Score');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 500000,
        termLength: 20
      };
      
      const outputs = TermLifeInsuranceCalculator.calculate(inputs);
      const report = TermLifeInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });

    it('should handle validation errors gracefully', () => {
      const inputs: CalculatorInputs = {
        age: 15,
        gender: 'invalid',
        coverageAmount: 5000
      };
      
      const result = validateTermLifeInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
    });

    it('should provide meaningful recommendations', () => {
      const inputs: CalculatorInputs = {
        age: 35,
        gender: 'male',
        coverageAmount: 200000,
        termLength: 20,
        annualIncome: 75000,
        filingStatus: 'smoker'
      };
      const outputs = calculateTermLifeInsurance(inputs);
      
      expect(outputs.recommendations).toBeDefined();
      expect(typeof outputs.recommendations).toBe('string');
      expect(outputs.recommendations.length).toBeGreaterThan(0);
    });
  });
});
