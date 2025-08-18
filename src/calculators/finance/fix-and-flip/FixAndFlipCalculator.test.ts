import { describe, it, expect } from 'vitest';
import { FixAndFlipCalculator } from './FixAndFlipCalculator';
import { calculateFixAndFlip } from './formulas';
import { validateFixAndFlipInputs } from './validation';
import { validateAllFixAndFlipInputs } from './quickValidation';

describe('Fix and Flip Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FixAndFlipCalculator.id).toBe('fix-and-flip-calculator');
      expect(FixAndFlipCalculator.name).toBe('Fix and Flip Calculator');
      expect(FixAndFlipCalculator.category).toBe('finance');
      expect(FixAndFlipCalculator.subcategory).toBe('investment');
      expect(FixAndFlipCalculator.description).toContain('fix and flip');
    });

    it('should have required inputs', () => {
      const requiredInputIds = [
        'purchasePrice', 'downPayment', 'interestRate', 'loanTerm', 'renovationBudget',
        'renovationTime', 'afterRepairValue', 'sellingCosts', 'holdingCosts',
        'propertyType', 'propertyCondition', 'marketType', 'location'
      ];

      requiredInputIds.forEach(id => {
        const input = FixAndFlipCalculator.inputs.find(i => i.id === id);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputIds = [
        'totalInvestment', 'totalCosts', 'grossProfit', 'netProfit', 'roi',
        'cashOnCashReturn', 'monthlyPayment', 'totalHoldingCosts', 'breakEvenPrice',
        'profitMargin', 'projectDuration', 'monthlyProfit', 'riskScore',
        'feasibilityScore', 'maxPurchasePrice', 'minARV', 'maxRenovationBudget',
        'loanAmount', 'totalInterest', 'debtService', 'equityRequired',
        'liquidityRatio', 'debtToEquityRatio', 'cashFlow', 'paybackPeriod',
        'irr', 'npv', 'profitabilityIndex', 'sensitivityAnalysis', 'marketAnalysis',
        'riskFactors', 'optimizationOpportunities', 'exitStrategyRecommendation',
        'timelineAnalysis', 'fixAndFlipAnalysis'
      ];

      expectedOutputIds.forEach(id => {
        const output = FixAndFlipCalculator.outputs.find(o => o.id === id);
        expect(output).toBeDefined();
      });
    });

    it('should have formulas section', () => {
      expect(FixAndFlipCalculator.formulas).toBeDefined();
      expect(Array.isArray(FixAndFlipCalculator.formulas)).toBe(true);
      expect(FixAndFlipCalculator.formulas.length).toBeGreaterThan(0);
    });

    it('should have examples section', () => {
      expect(FixAndFlipCalculator.examples).toBeDefined();
      expect(Array.isArray(FixAndFlipCalculator.examples)).toBe(true);
      expect(FixAndFlipCalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateFixAndFlipInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.includes('required'))).toBe(true);
    });

    it('should validate purchase price range', () => {
      const inputs = {
        purchasePrice: '5000',
        downPayment: '1000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '20000',
        renovationTime: '3',
        afterRepairValue: '80000',
        sellingCosts: '4000',
        holdingCosts: '500',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const result = validateFixAndFlipInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Purchase price must be between'))).toBe(true);
    });

    it('should validate down payment percentage', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '5000', // 2.5% - too low
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const result = validateFixAndFlipInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Down payment should be at least 10%'))).toBe(true);
    });

    it('should validate after repair value', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '180000', // Lower than purchase price
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const result = validateFixAndFlipInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('After repair value should be higher'))).toBe(true);
    });

    it('should validate renovation time', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '30', // Too long
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const result = validateFixAndFlipInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Renovation time cannot exceed 24 months'))).toBe(true);
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const result = validateFixAndFlipInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic fix and flip correctly', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);

      expect(outputs.totalInvestment).toBe(90000);
      expect(outputs.totalCosts).toBeGreaterThan(200000);
      expect(outputs.grossProfit).toBeGreaterThan(0);
      expect(outputs.netProfit).toBeGreaterThan(0);
      expect(outputs.roi).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.feasibilityScore).toBeGreaterThan(0);
    });

    it('should calculate loan amount correctly', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.loanAmount).toBe(160000);
    });

    it('should calculate risk score based on market conditions', () => {
      const inputs1 = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'hot',
        location: 'Phoenix, AZ'
      };

      const inputs2 = {
        ...inputs1,
        marketType: 'declining'
      };

      const outputs1 = calculateFixAndFlip(inputs1);
      const outputs2 = calculateFixAndFlip(inputs2);

      // Declining market should have higher risk score
      expect(outputs2.riskScore).toBeGreaterThan(outputs1.riskScore);
    });

    it('should calculate risk score based on property condition', () => {
      const inputs1 = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'excellent',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const inputs2 = {
        ...inputs1,
        propertyCondition: 'needs-major-repairs'
      };

      const outputs1 = calculateFixAndFlip(inputs1);
      const outputs2 = calculateFixAndFlip(inputs2);

      // Property needing major repairs should have higher risk score
      expect(outputs2.riskScore).toBeGreaterThan(outputs1.riskScore);
    });

    it('should calculate 70% rule correctly', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      const expectedMaxPurchasePrice = (350000 * 0.7) - 50000;
      expect(outputs.maxPurchasePrice).toBe(expectedMaxPurchasePrice);
    });

    it('should calculate IRR and NPV', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.irr).toBeGreaterThan(0);
      expect(outputs.npv).toBeDefined();
      expect(outputs.profitabilityIndex).toBeDefined();
    });

    it('should handle different property types', () => {
      const propertyTypes = ['single-family', 'duplex', 'condo', 'commercial'];
      
      propertyTypes.forEach(propertyType => {
        const inputs = {
          purchasePrice: '200000',
          downPayment: '40000',
          interestRate: '8',
          loanTerm: '12',
          renovationBudget: '50000',
          renovationTime: '3',
          afterRepairValue: '350000',
          sellingCosts: '17500',
          holdingCosts: '800',
          propertyType,
          propertyCondition: 'fair',
          marketType: 'stable',
          location: 'Phoenix, AZ'
        };

        const outputs = calculateFixAndFlip(inputs);
        expect(outputs.totalInvestment).toBe(90000);
        expect(outputs.riskScore).toBeGreaterThan(0);
      });
    });

    it('should handle different market types', () => {
      const marketTypes = ['hot', 'stable', 'slow', 'declining'];
      
      marketTypes.forEach(marketType => {
        const inputs = {
          purchasePrice: '200000',
          downPayment: '40000',
          interestRate: '8',
          loanTerm: '12',
          renovationBudget: '50000',
          renovationTime: '3',
          afterRepairValue: '350000',
          sellingCosts: '17500',
          holdingCosts: '800',
          propertyType: 'single-family',
          propertyCondition: 'fair',
          marketType,
          location: 'Phoenix, AZ'
        };

        const outputs = calculateFixAndFlip(inputs);
        expect(outputs.totalInvestment).toBe(90000);
        expect(outputs.riskScore).toBeGreaterThan(0);
      });
    });
  });

  describe('Fix and Flip Analysis', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      const analysis = FixAndFlipCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Fix and Flip Investment Analysis');
      expect(analysis).toContain('Project Summary');
      expect(analysis).toContain('Financial Performance');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Analysis Reports');
    });

    it('should include project summary in analysis', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      const analysis = FixAndFlipCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Property: single-family in Phoenix, AZ');
      expect(analysis).toContain('Purchase Price: $200,000');
      expect(analysis).toContain('After Repair Value: $350,000');
      expect(analysis).toContain('Renovation Budget: $50,000');
    });

    it('should include financial performance in analysis', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      const analysis = FixAndFlipCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Total Investment: $90,000');
      expect(analysis).toContain('ROI:');
      expect(analysis).toContain('Cash on Cash Return:');
      expect(analysis).toContain('Profit Margin:');
    });

    it('should include risk assessment in analysis', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      const analysis = FixAndFlipCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Risk Score:');
      expect(analysis).toContain('Feasibility Score:');
      expect(analysis).toContain('Debt to Equity Ratio:');
      expect(analysis).toContain('Payback Period:');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const inputs = {
        purchasePrice: '10000000',
        downPayment: '2000000',
        interestRate: '25',
        loanTerm: '36',
        renovationBudget: '1000000',
        renovationTime: '24',
        afterRepairValue: '15000000',
        sellingCosts: '500000',
        holdingCosts: '10000',
        propertyType: 'commercial',
        propertyCondition: 'needs-major-repairs',
        marketType: 'declining',
        location: 'New York, NY'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.totalInvestment).toBe(3000000);
      expect(outputs.loanAmount).toBe(8000000);
      expect(outputs.riskScore).toBeGreaterThan(70);
    });

    it('should handle minimum values', () => {
      const inputs = {
        purchasePrice: '10000',
        downPayment: '1000',
        interestRate: '1',
        loanTerm: '3',
        renovationBudget: '0',
        renovationTime: '1',
        afterRepairValue: '15000',
        sellingCosts: '0',
        holdingCosts: '0',
        propertyType: 'single-family',
        propertyCondition: 'excellent',
        marketType: 'hot',
        location: 'Austin, TX'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.totalInvestment).toBe(1000);
      expect(outputs.loanAmount).toBe(9000);
      expect(outputs.riskScore).toBeLessThan(50);
    });

    it('should handle zero renovation budget', () => {
      const inputs = {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '0',
        renovationTime: '1',
        afterRepairValue: '250000',
        sellingCosts: '12500',
        holdingCosts: '500',
        propertyType: 'single-family',
        propertyCondition: 'excellent',
        marketType: 'hot',
        location: 'Phoenix, AZ'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.totalInvestment).toBe(40000);
      expect(outputs.renovationBudget).toBe(0);
      expect(outputs.projectDuration).toBe(1);
    });

    it('should handle high-risk scenarios', () => {
      const inputs = {
        purchasePrice: '500000',
        downPayment: '25000', // 5% down payment
        interestRate: '15',
        loanTerm: '24',
        renovationBudget: '200000',
        renovationTime: '12',
        afterRepairValue: '800000',
        sellingCosts: '40000',
        holdingCosts: '2000',
        propertyType: 'commercial',
        propertyCondition: 'needs-major-repairs',
        marketType: 'declining',
        location: 'Detroit, MI'
      };

      const outputs = calculateFixAndFlip(inputs);
      expect(outputs.riskScore).toBeGreaterThan(80);
      expect(outputs.feasibilityScore).toBeLessThan(50);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result1 = validateAllFixAndFlipInputs({ purchasePrice: 'invalid' });
      expect(result1.isValid).toBe(false);
      expect(result1.errors.some(e => e.includes('Purchase price must be a number'))).toBe(true);

      const result2 = validateAllFixAndFlipInputs({ downPayment: '500' });
      expect(result2.isValid).toBe(false);
      expect(result2.errors.some(e => e.includes('Down payment must be at least $1,000'))).toBe(true);

      const result3 = validateAllFixAndFlipInputs({ propertyType: 'invalid' });
      expect(result3.isValid).toBe(false);
      expect(result3.errors.some(e => e.includes('valid property type'))).toBe(true);
    });

    it('should handle optional fields correctly', () => {
      const result = validateAllFixAndFlipInputs({
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ',
        squareFootage: '2000',
        bedrooms: '3'
      });

      expect(result.isValid).toBe(true);
    });

    it('should validate cross-field relationships', () => {
      const result = validateAllFixAndFlipInputs({
        purchasePrice: '200000',
        downPayment: '5000', // Too low
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Down payment should be at least 10%'))).toBe(true);
    });
  });
});
