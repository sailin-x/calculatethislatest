import { describe, it, expect } from 'vitest';
import { calculateMortgageRateLock, generateMortgageRateLockAnalysis } from './formulas';
import { validateMortgageRateLockInputs } from './validation';
import { quickValidateMortgageRateLock } from './quickValidation';
import { MortgageRateLockInputs } from './validation';

describe('Mortgage Rate Lock Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = validateMortgageRateLockInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        currentRate: 4.5,
        lockRate: 4.5
        // Missing other required fields
      };

      const result = validateMortgageRateLockInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid rates', () => {
      const inputs: Partial<MortgageRateLockInputs> = {
        currentRate: 30, // Invalid
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = validateMortgageRateLockInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current rate must be between 0% and 25%');
    });

    it('should reject invalid dates', () => {
      const inputs: Partial<MortgageRateLockInputs> = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-10-01', // Before lock start
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = validateMortgageRateLockInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lock start date must be before expected closing date');
    });

    it('should validate float-down specific fields', () => {
      const inputs: Partial<MortgageRateLockInputs> = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'float-down',
        floatDownThreshold: 0.25,
        floatDownFee: 250,
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = validateMortgageRateLockInputs(inputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<MortgageRateLockInputs> = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      expect(quickValidateMortgageRateLock(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<MortgageRateLockInputs> = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000
        // Missing other required fields
      };

      expect(quickValidateMortgageRateLock(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate favorable lock scenario', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 5.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.lockDecision).toBe('LOCK');
      expect(result.monthlyPaymentDifference).toBeLessThan(0); // Savings
      expect(result.totalInterestDifference).toBeLessThan(0); // Savings
      expect(result.breakEvenDays).toBeLessThan(365);
      expect(result.riskAssessment).toBe('low');
    });

    it('should calculate unfavorable lock scenario', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.lockDecision).toBe('FLOAT');
      expect(result.monthlyPaymentDifference).toBeGreaterThan(0); // Cost
      expect(result.totalInterestDifference).toBeGreaterThan(0); // Cost
      expect(result.breakEvenDays).toBe(Infinity);
    });

    it('should handle extension risk', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 15, // Short lock
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.extensionRisk).toBe('high');
      expect(result.extensionCost).toBeGreaterThan(0);
      expect(result.lockDecision).toBe('FLOAT');
    });

    it('should handle float-down lock type', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'float-down',
        floatDownThreshold: 0.25,
        floatDownFee: 250,
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.costBreakdown.floatDownOpportunity).toBe(250);
      expect(result.recommendations.some(rec => rec.includes('Float-down'))).toBe(true);
    });

    it('should handle rising market trend', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45,
        marketTrend: 'rising'
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.lockDecision).toBe('LOCK');
      expect(result.scenarioAnalysis.risingRates.risk).toContain('Low');
    });

    it('should handle falling market trend', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45,
        marketTrend: 'falling'
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.scenarioAnalysis.fallingRates.risk).toContain('Low');
    });
  });

  describe('Timeline Analysis', () => {
    it('should calculate correct days to closing', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.timelineAnalysis.daysToClosing).toBe(60);
      expect(result.timelineAnalysis.optimalLockDuration).toBe(67);
    });

    it('should identify timeline risks', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 20, // Short lock
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.timelineAnalysis.riskFactors).toContain('Closing date exceeds lock duration');
      expect(result.timelineAnalysis.riskFactors).toContain('Processing time may require extension');
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate total costs correctly', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.costBreakdown.lockFee).toBe(500);
      expect(result.costBreakdown.potentialExtensions).toBe(750); // 30 days * $25
      expect(result.costBreakdown.totalCosts).toBe(1250);
    });

    it('should calculate savings correctly', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 5.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.costBreakdown.totalSavings).toBeGreaterThan(0);
      expect(result.lockValue).toBeGreaterThan(-result.costBreakdown.totalCosts);
    });
  });

  describe('Scenario Analysis', () => {
    it('should analyze rising rates scenario', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.0,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.scenarioAnalysis.risingRates.savings).toBeGreaterThan(0);
      expect(result.scenarioAnalysis.risingRates.risk).toContain('Low');
    });

    it('should analyze falling rates scenario', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.scenarioAnalysis.fallingRates.cost).toBeGreaterThan(0);
      expect(result.scenarioAnalysis.fallingRates.risk).toContain('High');
    });

    it('should analyze volatile rates scenario', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45,
        rateVolatility: 1.0
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.scenarioAnalysis.volatileRates.risk).toContain('High');
      expect(result.timelineAnalysis.riskFactors).toContain('High rate volatility increases risk');
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for high extension risk', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 15,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('longer lock duration'))).toBe(true);
    });

    it('should provide recommendations for unfavorable rates', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('waiting for better rates'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.0,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      const analysis = generateMortgageRateLockAnalysis(inputs, result);
      
      expect(analysis).toContain('Mortgage Rate Lock Analysis');
      expect(analysis).toContain('Lock Decision');
      expect(analysis).toContain('Rate Comparison');
      expect(analysis).toContain('Financial Impact');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Timeline Analysis');
      expect(analysis).toContain('🔒 LOCK THE RATE');
    });

    it('should generate analysis for float recommendation', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.0,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      const analysis = generateMortgageRateLockAnalysis(inputs, result);
      
      expect(analysis).toContain('🌊 FLOAT THE RATE');
      expect(analysis).toContain('Recommendations');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero lock fee', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 30,
        lockFee: 0,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      expect(result.breakEvenDays).toBe(0);
    });

    it('should handle very short lock duration', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 1,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      expect(result.extensionRisk).toBe('high');
      expect(result.extensionCost).toBeGreaterThan(0);
    });

    it('should handle very long lock duration', () => {
      const inputs: MortgageRateLockInputs = {
        currentRate: 4.5,
        lockRate: 4.5,
        loanAmount: 300000,
        loanTerm: 30,
        lockDuration: 365,
        lockFee: 500,
        extensionFee: 25,
        expectedClosingDate: '2024-12-31',
        lockStartDate: '2024-11-01',
        lockType: 'fixed',
        breakLockPenalty: 1000,
        processingTime: 45
      };

      const result = calculateMortgageRateLock(inputs);
      expect(result.extensionRisk).toBe('low');
      expect(result.extensionCost).toBe(0);
    });
  });
});