import { describe, it, expect } from 'vitest';
import { calculateMortgageVsRent, generateMortgageVsRentAnalysis } from './formulas';
import { validateMortgageVsRentInputs } from './validation';
import { quickValidateMortgageVsRent } from './quickValidation';
import { MortgageVsRentInputs } from './validation';

describe('Mortgage vs. Rent Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = validateMortgageVsRentInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        homePrice: 350000,
        downPayment: 70000
        // Missing other required fields
      };

      const result = validateMortgageVsRentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid home price', () => {
      const inputs: Partial<MortgageVsRentInputs> = {
        homePrice: 10000, // Too low
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = validateMortgageVsRentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home price must be between $50,000 and $10,000,000');
    });

    it('should reject down payment exceeding home price', () => {
      const inputs: Partial<MortgageVsRentInputs> = {
        homePrice: 350000,
        downPayment: 400000, // Exceeds home price
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = validateMortgageVsRentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot exceed home price');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<MortgageVsRentInputs> = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      expect(quickValidateMortgageVsRent(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<MortgageVsRentInputs> = {
        homePrice: 350000,
        downPayment: 70000
        // Missing other required fields
      };

      expect(quickValidateMortgageVsRent(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate favorable buying scenario', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2500, // High rent
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        homeAppreciationRate: 3.0,
        investmentReturn: 7.0
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.recommendation).toBe('BUY');
      expect(result.breakEvenYears).toBeLessThan(10);
      expect(result.netWorthComparison).toBeGreaterThan(0);
      expect(result.monthlyCostDifference).toBeLessThan(0); // Buying costs less monthly
    });

    it('should calculate unfavorable buying scenario', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000, // Low down payment
        interestRate: 6.0, // High rate
        loanTerm: 30,
        monthlyRent: 1500, // Low rent
        propertyTax: 6000, // High taxes
        homeInsurance: 2000,
        closingCosts: 10000,
        homeAppreciationRate: 1.0, // Low appreciation
        investmentReturn: 8.0 // High investment return
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.recommendation).toBe('RENT');
      expect(result.breakEvenYears).toBeGreaterThan(10);
      expect(result.netWorthComparison).toBeLessThan(0);
      expect(result.monthlyCostDifference).toBeGreaterThan(0); // Buying costs more monthly
    });

    it('should handle PMI calculations', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 35000, // 10% down payment
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        includePMI: true,
        pmiRate: 0.5
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.costBreakdown.buying.pmi).toBeGreaterThan(0);
      expect(result.recommendations.some(rec => rec.includes('PMI'))).toBe(true);
    });

    it('should handle tax benefits', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        taxRate: 24,
        includeTaxBenefits: true
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.financialAnalysis.taxSavings).toBeGreaterThan(0);
      expect(result.netWorthComparison).toBeGreaterThan(result.financialAnalysis.taxSavings);
    });

    it('should handle opportunity cost analysis', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        investmentReturn: 8.0,
        includeOpportunityCost: true
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.financialAnalysis.investmentGrowth).toBeGreaterThan(0);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even when buying is cheaper monthly', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 4.0,
        loanTerm: 30,
        monthlyRent: 2500, // High rent
        propertyTax: 3000,
        homeInsurance: 1000,
        closingCosts: 6000
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.breakEvenYears).toBeLessThan(5);
      expect(result.monthlyCostDifference).toBeLessThan(0);
    });

    it('should calculate break-even when renting is cheaper monthly', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyRent: 1500, // Low rent
        propertyTax: 6000,
        homeInsurance: 2000,
        closingCosts: 10000,
        rentIncreaseRate: 3.0
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.breakEvenYears).toBeGreaterThan(5);
      expect(result.monthlyCostDifference).toBeGreaterThan(0);
    });
  });

  describe('Financial Analysis', () => {
    it('should calculate equity build-up correctly', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        analysisPeriod: 10
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.equityBuildUp).toBeGreaterThan(inputs.downPayment);
      expect(result.financialAnalysis.equityGrowth).toBe(result.equityBuildUp);
    });

    it('should calculate home value growth correctly', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        homeAppreciationRate: 3.0,
        analysisPeriod: 10
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.financialAnalysis.homeValueGrowth).toBeGreaterThan(0);
      expect(result.financialAnalysis.homeValueGrowth).toBeCloseTo(
        inputs.homePrice * Math.pow(1.03, 10) - inputs.homePrice, 0
      );
    });
  });

  describe('Risk Assessment', () => {
    it('should identify buying risks', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000, // Low down payment
        interestRate: 6.0,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 6000,
        homeInsurance: 2000,
        closingCosts: 10000,
        homeAppreciationRate: 1.0 // Low appreciation
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.riskAssessment.buyingRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.buyingRisks.some(risk => risk.includes('equity'))).toBe(true);
      expect(result.riskAssessment.buyingRisks.some(risk => risk.includes('appreciation'))).toBe(true);
    });

    it('should identify renting risks', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.riskAssessment.rentingRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.rentingRisks.some(risk => risk.includes('equity'))).toBe(true);
      expect(result.riskAssessment.rentingRisks.some(risk => risk.includes('increases'))).toBe(true);
    });
  });

  describe('Scenario Analysis', () => {
    it('should analyze high appreciation scenario', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        homeAppreciationRate: 3.0
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.scenarioAnalysis.highAppreciation.netWorth).toBeGreaterThan(0);
      expect(result.scenarioAnalysis.highAppreciation.recommendation).toContain('favors buying');
    });

    it('should analyze low appreciation scenario', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        homeAppreciationRate: 1.0
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.scenarioAnalysis.lowAppreciation.recommendation).toContain('may favor renting');
    });

    it('should analyze high investment return scenario', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        investmentReturn: 10.0
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.scenarioAnalysis.highInvestmentReturn.recommendation).toContain('favors renting');
    });
  });

  describe('Cost Breakdown', () => {
    it('should calculate comprehensive cost breakdown', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        hoaFees: 200,
        maintenanceCosts: 3000,
        includeUtilities: true,
        buyerUtilities: 300,
        renterUtilities: 200
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.costBreakdown.buying.mortgagePayment).toBeGreaterThan(0);
      expect(result.costBreakdown.buying.propertyTax).toBe(3500 / 12);
      expect(result.costBreakdown.buying.hoaFees).toBe(200);
      expect(result.costBreakdown.buying.utilities).toBe(300);
      expect(result.costBreakdown.renting.rent).toBe(2000);
      expect(result.costBreakdown.renting.utilities).toBe(200);
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for favorable buying', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 4.0,
        loanTerm: 30,
        monthlyRent: 2500,
        propertyTax: 3000,
        homeInsurance: 1000,
        closingCosts: 6000
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(rec => rec.includes('favorable'))).toBe(true);
    });

    it('should provide recommendations for high monthly costs', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyRent: 1500,
        propertyTax: 6000,
        homeInsurance: 2000,
        closingCosts: 10000
      };

      const result = calculateMortgageVsRent(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('significantly higher'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000,
        taxRate: 24
      };

      const result = calculateMortgageVsRent(inputs);
      const analysis = generateMortgageVsRentAnalysis(inputs, result);
      
      expect(analysis).toContain('Mortgage vs. Rent Analysis');
      expect(analysis).toContain('Recommendation');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Monthly Cost Comparison');
      expect(analysis).toContain('Property Details');
      expect(analysis).toContain('Financial Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Scenario Analysis');
    });

    it('should generate analysis for buying recommendation', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 4.0,
        loanTerm: 30,
        monthlyRent: 2500,
        propertyTax: 3000,
        homeInsurance: 1000,
        closingCosts: 6000
      };

      const result = calculateMortgageVsRent(inputs);
      const analysis = generateMortgageVsRentAnalysis(inputs, result);
      
      expect(analysis).toContain('🏠 BUY');
    });

    it('should generate analysis for renting recommendation', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyRent: 1500,
        propertyTax: 6000,
        homeInsurance: 2000,
        closingCosts: 10000
      };

      const result = calculateMortgageVsRent(inputs);
      const analysis = generateMortgageVsRentAnalysis(inputs, result);
      
      expect(analysis).toContain('🏢 RENT');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 0,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = calculateMortgageVsRent(inputs);
      expect(result.equityBuildUp).toBe(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
    });

    it('should handle very high rent', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 5000, // Very high rent
        propertyTax: 3500,
        homeInsurance: 1200,
        closingCosts: 7000
      };

      const result = calculateMortgageVsRent(inputs);
      expect(result.recommendation).toBe('BUY');
      expect(result.breakEvenYears).toBeLessThan(3);
    });

    it('should handle very low rent', () => {
      const inputs: MortgageVsRentInputs = {
        homePrice: 500000,
        downPayment: 50000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyRent: 800, // Very low rent
        propertyTax: 6000,
        homeInsurance: 2000,
        closingCosts: 10000
      };

      const result = calculateMortgageVsRent(inputs);
      expect(result.recommendation).toBe('RENT');
      expect(result.breakEvenYears).toBeGreaterThan(15);
    });
  });
});