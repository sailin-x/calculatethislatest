import { describe, it, expect } from 'vitest';
import { PersonalInjuryFormulas } from './formulas';
import { personalInjuryCalculatorFormula } from './formulas';
import { getPersonalInjuryValidationRules } from './validation';

describe('PersonalInjuryCalculator', () => {
  describe('PersonalInjuryFormulas', () => {
    describe('calculateFutureMedicalPV', () => {
      it('should calculate present value of future medical costs', () => {
        const pv = PersonalInjuryFormulas.calculateFutureMedicalPV(25000, 20, 3.0, 4.2);
        expect(pv).toBeGreaterThan(400000); // Should be substantial over 20 years
        expect(pv).toBeLessThan(600000); // But discounted
      });

      it('should handle zero inflation', () => {
        const pv = PersonalInjuryFormulas.calculateFutureMedicalPV(25000, 10, 3.0, 0);
        expect(pv).toBeCloseTo(213394, -3); // Standard annuity calculation
      });

      it('should increase with higher inflation', () => {
        const lowInflation = PersonalInjuryFormulas.calculateFutureMedicalPV(25000, 20, 3.0, 2.0);
        const highInflation = PersonalInjuryFormulas.calculateFutureMedicalPV(25000, 20, 3.0, 6.0);
        expect(highInflation).toBeGreaterThan(lowInflation);
      });
    });

    describe('calculateFutureLostWagesPV', () => {
      it('should calculate present value of future lost wages', () => {
        const pv = PersonalInjuryFormulas.calculateFutureLostWagesPV(75000, 30, 3.0, 2.5, 3.0, 100);
        expect(pv).toBeGreaterThan(1500000); // Should be substantial over 30 years
        expect(pv).toBeLessThan(3000000); // But discounted
      });

      it('should handle partial disability', () => {
        const fullDisability = PersonalInjuryFormulas.calculateFutureLostWagesPV(75000, 30, 3.0, 2.5, 3.0, 100);
        const partialDisability = PersonalInjuryFormulas.calculateFutureLostWagesPV(75000, 30, 3.0, 2.5, 3.0, 50);
        expect(partialDisability).toBeCloseTo(fullDisability * 0.5, -4);
      });

      it('should account for career growth', () => {
        const noGrowth = PersonalInjuryFormulas.calculateFutureLostWagesPV(75000, 20, 0, 2.5, 3.0, 100);
        const withGrowth = PersonalInjuryFormulas.calculateFutureLostWagesPV(75000, 20, 4.0, 2.5, 3.0, 100);
        expect(withGrowth).toBeGreaterThan(noGrowth);
      });
    });

    describe('calculatePainAndSuffering', () => {
      it('should calculate pain and suffering with jurisdiction multipliers', () => {
        const california = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', false);
        const texas = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'texas', false);
        
        expect(california).toBe(400000); // 4.0x multiplier for moderate in CA
        expect(texas).toBe(350000); // 3.5x multiplier for moderate in TX
      });

      it('should increase multiplier for permanent injuries', () => {
        const temporary = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', false);
        const permanent = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', true);
        
        expect(permanent).toBeGreaterThan(temporary);
        expect(permanent).toBeCloseTo(temporary * 1.3, -2);
      });

      it('should use custom multiplier when provided', () => {
        const custom = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', false, 5.0);
        expect(custom).toBe(500000);
      });

      it('should handle different injury severities', () => {
        const minor = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'minor', 'california', false);
        const moderate = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', false);
        const severe = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'severe', 'california', false);
        const catastrophic = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'catastrophic', 'california', false);
        
        expect(minor).toBeLessThan(moderate);
        expect(moderate).toBeLessThan(severe);
        expect(severe).toBeLessThan(catastrophic);
      });
    });

    describe('calculateLossOfConsortium', () => {
      it('should return zero for non-permanent injuries', () => {
        const loss = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 35, false, true);
        expect(loss).toBe(0);
      });

      it('should return zero for unmarried individuals', () => {
        const loss = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 35, true, false);
        expect(loss).toBe(0);
      });

      it('should calculate loss for permanent injuries', () => {
        const loss = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 35, true, true);
        expect(loss).toBeGreaterThan(0);
        expect(loss).toBeCloseTo(90000, -3); // 75000 * 1.2 for age 35
      });

      it('should adjust for age', () => {
        const young = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 25, true, true);
        const middle = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 40, true, true);
        const old = PersonalInjuryFormulas.calculateLossOfConsortium('severe', 70, true, true);
        
        expect(young).toBeGreaterThan(middle);
        expect(middle).toBeGreaterThan(old);
      });
    });

    describe('applyComparativeNegligence', () => {
      it('should apply pure comparative negligence', () => {
        const result = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 25, 'california');
        expect(result.netSettlement).toBe(750000);
        expect(result.reduction).toBe(250000);
        expect(result.isBarred).toBe(false);
      });

      it('should bar recovery in modified comparative states', () => {
        const result = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 60, 'texas');
        expect(result.netSettlement).toBe(0);
        expect(result.reduction).toBe(1000000);
        expect(result.isBarred).toBe(true);
      });

      it('should allow recovery at exactly 50% in 51% rule states', () => {
        const result = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 50, 'illinois');
        expect(result.netSettlement).toBe(500000);
        expect(result.isBarred).toBe(false);
      });

      it('should bar recovery above 50% in 51% rule states', () => {
        const result = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 51, 'illinois');
        expect(result.netSettlement).toBe(0);
        expect(result.isBarred).toBe(true);
      });
    });

    describe('calculateAttorneyFees', () => {
      it('should calculate standard contingency fees', () => {
        const result = PersonalInjuryFormulas.calculateAttorneyFees(1000000, 33.33, 5000);
        expect(result.attorneyFees).toBeCloseTo(333300, -2);
        expect(result.expenses).toBe(5000);
        expect(result.clientReceives).toBeCloseTo(661700, -2);
      });

      it('should handle different contingency rates', () => {
        const standard = PersonalInjuryFormulas.calculateAttorneyFees(1000000, 33.33, 0);
        const higher = PersonalInjuryFormulas.calculateAttorneyFees(1000000, 40.0, 0);
        
        expect(higher.attorneyFees).toBeGreaterThan(standard.attorneyFees);
        expect(higher.clientReceives).toBeLessThan(standard.clientReceives);
      });
    });

    describe('applyPolicyLimits', () => {
      it('should not limit settlement below policy limit', () => {
        const result = PersonalInjuryFormulas.applyPolicyLimits(500000, 1000000);
        expect(result.limitedSettlement).toBe(500000);
        expect(result.isLimited).toBe(false);
        expect(result.excessAmount).toBe(0);
      });

      it('should limit settlement to policy limit', () => {
        const result = PersonalInjuryFormulas.applyPolicyLimits(1500000, 1000000);
        expect(result.limitedSettlement).toBe(1000000);
        expect(result.isLimited).toBe(true);
        expect(result.excessAmount).toBe(500000);
      });

      it('should handle no policy limit', () => {
        const result = PersonalInjuryFormulas.applyPolicyLimits(1500000);
        expect(result.limitedSettlement).toBe(1500000);
        expect(result.isLimited).toBe(false);
        expect(result.excessAmount).toBe(0);
      });
    });
  });

  describe('personalInjuryCalculatorFormula', () => {
    it('should calculate complete settlement analysis', () => {
      const inputs = {
        pastMedicalCosts: 50000,
        futureMedicalCosts: 25000,
        pastLostWages: 30000,
        futureLostWages: 0,
        ageAtInjury: 35,
        retirementAge: 65,
        annualSalary: 75000,
        careerGrowthRate: 3.0,
        injurySeverity: 'moderate',
        isPermanent: false,
        jurisdiction: 'california',
        comparativeNegligence: 0,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 40
      };

      const result = personalInjuryCalculatorFormula.calculate(inputs);

      expect(result.outputs.totalEconomicDamages).toBeGreaterThan(0);
      expect(result.outputs.totalNonEconomicDamages).toBeGreaterThan(0);
      expect(result.outputs.painAndSuffering).toBeGreaterThan(0);
      expect(result.outputs.grossSettlement).toBeGreaterThan(0);
      expect(result.outputs.netSettlement).toBe(result.outputs.grossSettlement); // No negligence
      expect(result.outputs.clientReceives).toBeLessThan(result.outputs.netSettlement); // After fees
      expect(result.explanation).toContain('Settlement calculation');
      expect(result.intermediateSteps).toBeDefined();
    });

    it('should handle catastrophic injury with life care costs', () => {
      const inputs = {
        pastMedicalCosts: 200000,
        futureMedicalCosts: 50000,
        lifeCareCost: 1000000,
        pastLostWages: 100000,
        futureLostWages: 80000,
        ageAtInjury: 30,
        retirementAge: 65,
        annualSalary: 80000,
        careerGrowthRate: 3.5,
        injurySeverity: 'catastrophic',
        isPermanent: true,
        disabilityPercentage: 100,
        jurisdiction: 'california',
        comparativeNegligence: 0,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 45
      };

      const result = personalInjuryCalculatorFormula.calculate(inputs);

      expect(result.outputs.totalEconomicDamages).toBeGreaterThan(2000000); // Should be substantial
      expect(result.outputs.painAndSuffering).toBeGreaterThan(1000000); // High multiplier for catastrophic
      expect(result.outputs.grossSettlement).toBeGreaterThan(3000000);
    });

    it('should apply comparative negligence correctly', () => {
      const inputs = {
        pastMedicalCosts: 50000,
        futureMedicalCosts: 25000,
        pastLostWages: 30000,
        futureLostWages: 0,
        ageAtInjury: 35,
        retirementAge: 65,
        annualSalary: 75000,
        careerGrowthRate: 3.0,
        injurySeverity: 'moderate',
        isPermanent: false,
        jurisdiction: 'california',
        comparativeNegligence: 30,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 40
      };

      const result = personalInjuryCalculatorFormula.calculate(inputs);

      expect(result.outputs.netSettlement).toBeLessThan(result.outputs.grossSettlement);
      expect(result.outputs.netSettlement).toBeCloseTo(result.outputs.grossSettlement * 0.7, -4);
    });

    it('should handle policy limits', () => {
      const inputs = {
        pastMedicalCosts: 100000,
        futureMedicalCosts: 50000,
        pastLostWages: 75000,
        futureLostWages: 60000,
        ageAtInjury: 35,
        retirementAge: 65,
        annualSalary: 85000,
        careerGrowthRate: 3.0,
        injurySeverity: 'severe',
        isPermanent: true,
        jurisdiction: 'california',
        comparativeNegligence: 0,
        insurancePolicyLimit: 500000,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 40
      };

      const result = personalInjuryCalculatorFormula.calculate(inputs);

      if (result.outputs.grossSettlement > 500000) {
        expect(result.outputs.netSettlement).toBe(500000);
        expect(result.outputs.isLimitedByPolicy).toBe('Yes');
        expect(result.outputs.excessAmount).toBeGreaterThan(0);
      }
    });

    it('should throw error for invalid inputs', () => {
      const inputs = {
        pastMedicalCosts: -50000, // Invalid negative cost
        futureMedicalCosts: 25000,
        pastLostWages: 30000,
        futureLostWages: 0,
        ageAtInjury: 35,
        retirementAge: 65,
        annualSalary: 75000,
        careerGrowthRate: 3.0,
        injurySeverity: 'moderate',
        isPermanent: false,
        jurisdiction: 'california',
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 40
      };

      expect(() => personalInjuryCalculatorFormula.calculate(inputs)).toThrow();
    });
  });

  describe('Validation Rules', () => {
    const validationRules = getPersonalInjuryValidationRules();

    it('should validate required fields', () => {
      const requiredFields = [
        'pastMedicalCosts', 'futureMedicalCosts', 'pastLostWages', 'futureLostWages',
        'ageAtInjury', 'retirementAge', 'annualSalary', 'injurySeverity', 'jurisdiction'
      ];
      const requiredRules = validationRules.filter(rule => rule.type === 'required');
      
      expect(requiredRules.length).toBeGreaterThanOrEqual(requiredFields.length);
    });

    it('should validate age consistency', () => {
      const ageRules = validationRules.filter(rule => 
        rule.field === 'retirementAge' && rule.type === 'business'
      );
      expect(ageRules.length).toBeGreaterThan(0);
    });

    it('should validate medical cost reasonableness', () => {
      const medicalRules = validationRules.filter(rule => 
        rule.field === 'futureMedicalCosts' && rule.message.includes('disproportionate')
      );
      expect(medicalRules.length).toBeGreaterThan(0);
    });

    it('should validate comparative negligence range', () => {
      const negligenceRules = validationRules.filter(rule => 
        rule.field === 'comparativeNegligence'
      );
      expect(negligenceRules.length).toBeGreaterThan(0);
    });
  });

  describe('Legal Industry Benchmark Validation', () => {
    it('should match typical pain and suffering multipliers', () => {
      // Test against known industry standards
      const moderate = PersonalInjuryFormulas.calculatePainAndSuffering(100000, 'moderate', 'california', false);
      expect(moderate).toBe(400000); // 4x multiplier is industry standard for moderate injuries
    });

    it('should match comparative negligence rules by state', () => {
      // Test California (pure comparative)
      const caResult = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 80, 'california');
      expect(caResult.netSettlement).toBe(200000);
      expect(caResult.isBarred).toBe(false);

      // Test Texas (modified 51%)
      const txResult = PersonalInjuryFormulas.applyComparativeNegligence(1000000, 60, 'texas');
      expect(txResult.netSettlement).toBe(0);
      expect(txResult.isBarred).toBe(true);
    });

    it('should match attorney fee standards', () => {
      // Standard contingency fee is 33.33%
      const fees = PersonalInjuryFormulas.calculateAttorneyFees(1000000, 33.33, 0);
      expect(fees.attorneyFees).toBeCloseTo(333300, -2);
    });

    it('should match present value calculations', () => {
      // Test against financial calculator standards
      const pv = PersonalInjuryFormulas.calculateFutureMedicalPV(25000, 10, 3.0, 0);
      expect(pv).toBeCloseTo(213394, -3); // Standard annuity present value
    });
  });
});