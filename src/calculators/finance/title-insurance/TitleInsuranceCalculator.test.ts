import { describe, it, expect } from 'vitest';
import { TitleInsuranceCalculator } from './TitleInsuranceCalculator';
import { validateTitleInsuranceInputs } from './validation';
import { validateAllTitleInsuranceInputs } from './quickValidation';
import { calculateTitleInsurance, generateTitleInsuranceAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('TitleInsuranceCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(TitleInsuranceCalculator.id).toBe('TitleInsuranceCalculator');
      expect(TitleInsuranceCalculator.name).toBe('Title Insurance Calculator');
      expect(TitleInsuranceCalculator.category).toBe('finance');
      expect(TitleInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputs = TitleInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'propertyValue')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'transactionType')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'coverageType')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = TitleInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('ownersPolicyPremium');
      expect(outputIds).toContain('lendersPolicyPremium');
      expect(outputIds).toContain('totalPremium');
      expect(outputIds).toContain('endorsementCosts');
      expect(outputIds).toContain('searchFees');
      expect(outputIds).toContain('settlementFees');
      expect(outputIds).toContain('totalCosts');
      expect(outputIds).toContain('premiumPerThousand');
      expect(outputIds).toContain('costPercentage');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('coverageScore');
      expect(outputIds).toContain('valueScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof TitleInsuranceCalculator.calculate).toBe('function');
      expect(typeof TitleInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    describe('Comprehensive Validation', () => {
      it('should validate required fields', () => {
        const inputs: CalculatorInputs = {};
        const result = validateTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Property value is required');
        expect(result.errors).toContain('Transaction type is required');
        expect(result.errors).toContain('Coverage type is required');
      });

      it('should validate valid inputs', () => {
        const inputs: CalculatorInputs = {
          propertyValue: 400000,
          transactionType: 'purchase',
          coverageType: 'both'
        };
        const result = validateTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should validate property value ranges', () => {
        const inputs: CalculatorInputs = {
          propertyValue: -1000,
          transactionType: 'purchase',
          coverageType: 'both'
        };
        const result = validateTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Property value cannot be negative');
      });

      it('should validate transaction type options', () => {
        const inputs: CalculatorInputs = {
          propertyValue: 400000,
          transactionType: 'invalid',
          coverageType: 'both'
        };
        const result = validateTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Transaction type must be one of: purchase, refinance, construction, equity-line');
      });

      it('should provide warnings for high-risk factors', () => {
        const inputs: CalculatorInputs = {
          propertyValue: 400000,
          transactionType: 'purchase',
          coverageType: 'both',
          knownIssues: 'liens',
          propertyAge: 150
        };
        const result = validateTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Known title issues may affect insurability and increase costs');
        expect(result.warnings).toContain('Very old property may have complex title history and higher risk');
      });
    });

    describe('Quick Validation', () => {
      it('should validate individual fields', () => {
        const { validatePropertyValue, validateTransactionType, validateCoverageType } = require('./quickValidation');
        
        expect(validatePropertyValue(400000)).toBeNull();
        expect(validatePropertyValue(-1000)).toContain('Property value cannot be negative');
        
        expect(validateTransactionType('purchase')).toBeNull();
        expect(validateTransactionType('invalid')).toContain('Transaction type must be one of');
        
        expect(validateCoverageType('both')).toBeNull();
        expect(validateCoverageType('invalid')).toContain('Coverage type must be one of');
      });

      it('should validate all inputs together', () => {
        const inputs: CalculatorInputs = {
          propertyValue: 400000,
          transactionType: 'purchase',
          coverageType: 'both',
          knownIssues: 'liens'
        };
        const result = validateAllTitleInsuranceInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Known title issues may affect insurability and increase costs');
      });
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic title insurance for purchase', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.ownersPolicyPremium).toBeGreaterThan(0);
      expect(outputs.lendersPolicyPremium).toBeGreaterThan(0);
      expect(outputs.totalPremium).toBe(outputs.ownersPolicyPremium + outputs.lendersPolicyPremium);
      expect(outputs.premiumPerThousand).toBeGreaterThan(0);
      expect(outputs.costPercentage).toBeGreaterThan(0);
    });

    it('should calculate owner\'s policy only', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'owners-policy'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.ownersPolicyPremium).toBeGreaterThan(0);
      expect(outputs.lendersPolicyPremium).toBe(0);
      expect(outputs.totalPremium).toBe(outputs.ownersPolicyPremium);
    });

    it('should calculate lender\'s policy only', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'lenders-policy',
        loanAmount: 320000
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.ownersPolicyPremium).toBe(0);
      expect(outputs.lendersPolicyPremium).toBeGreaterThan(0);
      expect(outputs.totalPremium).toBe(outputs.lendersPolicyPremium);
    });

    it('should calculate endorsement costs', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        endorsements: 'survey'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.endorsementCosts).toBeGreaterThan(0);
      expect(outputs.totalCosts).toBeGreaterThan(outputs.totalPremium);
    });

    it('should calculate search and settlement fees', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        titleSearchDepth: 'standard',
        escrowServices: 'full'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.searchFees).toBeGreaterThan(0);
      expect(outputs.settlementFees).toBeGreaterThan(0);
    });

    it('should calculate risk score', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        knownIssues: 'liens',
        propertyAge: 100,
        propertyType: 'commercial'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.riskScore).toBeGreaterThan(50);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate coverage score', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        coverageAmount: 400000
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.coverageScore).toBeGreaterThanOrEqual(0);
      expect(outputs.coverageScore).toBeLessThanOrEqual(100);
    });

    it('should calculate value score', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
    });

    it('should handle refinance discounts', () => {
      const purchaseInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const refinanceInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'refinance',
        coverageType: 'both'
      };
      
      const purchaseOutputs = calculateTitleInsurance(purchaseInputs);
      const refinanceOutputs = calculateTitleInsurance(refinanceInputs);
      
      expect(refinanceOutputs.totalPremium).toBeLessThan(purchaseOutputs.totalPremium);
    });

    it('should handle state rate adjustments', () => {
      const baseInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const caInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        state: 'ca'
      };
      
      const baseOutputs = calculateTitleInsurance(baseInputs);
      const caOutputs = calculateTitleInsurance(caInputs);
      
      expect(caOutputs.totalPremium).toBeGreaterThan(baseOutputs.totalPremium);
    });

    it('should handle property type adjustments', () => {
      const residentialInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        propertyType: 'single-family'
      };
      const commercialInputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        propertyType: 'commercial'
      };
      
      const residentialOutputs = calculateTitleInsurance(residentialInputs);
      const commercialOutputs = calculateTitleInsurance(commercialInputs);
      
      expect(commercialOutputs.totalPremium).toBeGreaterThan(residentialOutputs.totalPremium);
    });

    it('should calculate policy comparison', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.policyComparison).toBeDefined();
      expect(outputs.policyComparison.length).toBeGreaterThan(0);
      expect(outputs.policyComparison[0]).toHaveProperty('type');
      expect(outputs.policyComparison[0]).toHaveProperty('premium');
      expect(outputs.policyComparison[0]).toHaveProperty('cost');
    });

    it('should calculate risk breakdown', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        knownIssues: 'liens',
        propertyAge: 100
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.riskBreakdown).toBeDefined();
      expect(outputs.riskBreakdown).toHaveProperty('knownIssues');
      expect(outputs.riskBreakdown).toHaveProperty('overallRisk');
    });

    it('should calculate cost breakdown', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        endorsements: 'survey'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.costBreakdown).toBeDefined();
      expect(outputs.costBreakdown).toHaveProperty('basePremium');
      expect(outputs.costBreakdown).toHaveProperty('endorsements');
      expect(outputs.costBreakdown).toHaveProperty('totalCosts');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property value', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 10000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.totalPremium).toBeGreaterThan(0);
    });

    it('should handle maximum property value', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 10000000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.totalPremium).toBeGreaterThan(0);
      expect(outputs.premiumPerThousand).toBeLessThan(5); // Should be lower for high values
    });

    it('should handle high-risk factors', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        knownIssues: 'multiple',
        previousClaims: 'multiple',
        chainOfTitle: 'very-complex',
        propertyAge: 150,
        propertyType: 'commercial'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.totalPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(70);
    });

    it('should handle zero loan amount', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'lenders-policy',
        loanAmount: 0
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.lendersPolicyPremium).toBe(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        state: 'ca',
        endorsements: 'survey'
      };
      const outputs = calculateTitleInsurance(inputs);
      const report = generateTitleInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Title Insurance Analysis Report');
      expect(report).toContain('Policy Summary');
      expect(report).toContain('Premium Breakdown');
      expect(report).toContain('Additional Costs');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Risk Breakdown');
      expect(report).toContain('Cost Breakdown');
      expect(report).toContain('Policy Comparison');
      expect(report).toContain('Recommendations');
    });

    it('should include risk information in report', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        knownIssues: 'liens'
      };
      const outputs = calculateTitleInsurance(inputs);
      const report = generateTitleInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Risk Score');
      expect(report).toContain('Risk Breakdown');
    });

    it('should include cost breakdown in report', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both',
        endorsements: 'survey'
      };
      const outputs = calculateTitleInsurance(inputs);
      const report = generateTitleInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Cost Breakdown');
      expect(report).toContain('Endorsement Costs');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'both'
      };
      
      const outputs = TitleInsuranceCalculator.calculate(inputs);
      const report = TitleInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });

    it('should handle validation errors gracefully', () => {
      const inputs: CalculatorInputs = {
        propertyValue: -1000,
        transactionType: 'invalid',
        coverageType: 'both'
      };
      
      const result = validateTitleInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
    });

    it('should provide meaningful recommendations', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 400000,
        transactionType: 'purchase',
        coverageType: 'lenders-policy',
        knownIssues: 'liens'
      };
      const outputs = calculateTitleInsurance(inputs);
      
      expect(outputs.recommendations).toBeDefined();
      expect(typeof outputs.recommendations).toBe('string');
      expect(outputs.recommendations.length).toBeGreaterThan(0);
    });

    it('should handle different transaction types', () => {
      const transactionTypes = ['purchase', 'refinance', 'construction', 'equity-line'];
      
      transactionTypes.forEach(type => {
        const inputs: CalculatorInputs = {
          propertyValue: 400000,
          transactionType: type,
          coverageType: 'both'
        };
        const outputs = calculateTitleInsurance(inputs);
        
        expect(outputs.totalPremium).toBeGreaterThan(0);
        expect(outputs.totalCosts).toBeGreaterThan(0);
      });
    });
  });
});
