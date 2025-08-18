import { describe, it, expect } from 'vitest';
import { EscrowAnalysisCalculator } from './EscrowAnalysisCalculator';
import { calculateEscrowAnalysis } from './formulas';
import { validateEscrowAnalysisInputs } from './validation';
import { validateAllEscrowAnalysisInputs } from './quickValidation';

describe('Escrow Analysis Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(EscrowAnalysisCalculator.id).toBe('escrow-analysis-calculator');
      expect(EscrowAnalysisCalculator.name).toBe('Escrow Analysis Calculator');
      expect(EscrowAnalysisCalculator.category).toBe('finance');
      expect(EscrowAnalysisCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'propertyValue', 'loanAmount', 'interestRate', 'loanTerm', 'monthlyPayment',
        'currentEscrowBalance', 'annualPropertyTax', 'annualHomeInsurance',
        'propertyTaxPaymentFrequency', 'insurancePaymentFrequency', 'escrowCushion',
        'taxAssessmentIncrease', 'insuranceRateIncrease', 'analysisPeriod',
        'paymentHistory', 'escrowAccountType'
      ];

      requiredInputs.forEach(inputId => {
        const input = EscrowAnalysisCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = [
        'monthlyEscrowPayment', 'totalMonthlyPayment', 'requiredEscrowBalance',
        'escrowShortage', 'escrowSurplus', 'shortagePayment', 'surplusRefund',
        'nextEscrowAnalysis', 'projectedPayments', 'escrowAccountStatus',
        'recommendations', 'costBreakdown', 'futureProjections'
      ];

      expectedOutputs.forEach(outputId => {
        const output = EscrowAnalysisCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof EscrowAnalysisCalculator.calculate).toBe('function');
      expect(typeof EscrowAnalysisCalculator.generateReport).toBe('function');
    });

    it('should have formulas and examples', () => {
      expect(EscrowAnalysisCalculator.formulas).toBeDefined();
      expect(EscrowAnalysisCalculator.formulas.length).toBeGreaterThan(0);
      expect(EscrowAnalysisCalculator.examples).toBeDefined();
      expect(EscrowAnalysisCalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateEscrowAnalysisInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const inputs = {
        propertyValue: '25000', // Too low
        loanAmount: '200000',
        interestRate: '5',
        loanTerm: '30',
        monthlyPayment: '1500',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const result = validateEscrowAnalysisInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Property value'))).toBe(true);
    });

    it('should validate loan amount range', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '5000', // Too low
        interestRate: '5',
        loanTerm: '30',
        monthlyPayment: '1500',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const result = validateEscrowAnalysisInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Loan amount'))).toBe(true);
    });

    it('should validate logical consistency', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '350000', // Exceeds property value
        interestRate: '5',
        loanTerm: '30',
        monthlyPayment: '1500',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const result = validateEscrowAnalysisInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('cannot exceed property value'))).toBe(true);
    });

    it('should validate valid inputs', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const result = validateEscrowAnalysisInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate monthly escrow payment correctly', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.monthlyEscrowPayment).toBeGreaterThan(0);
      expect(outputs.monthlyEscrowPayment).toBe(350); // $3000/12 + $1200/12 = $350
    });

    it('should calculate total monthly payment correctly', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.totalMonthlyPayment).toBe(1713); // $1363 + $350
    });

    it('should calculate escrow shortage correctly', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '1000', // Low balance
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.escrowShortage).toBeGreaterThan(0);
    });

    it('should calculate escrow surplus correctly', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '10000', // High balance
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.escrowSurplus).toBeGreaterThan(0);
    });

    it('should handle optional PMI and flood insurance', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        annualPMI: '600',
        annualFloodInsurance: '400',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        pmiPaymentFrequency: 'monthly',
        floodInsurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.monthlyEscrowPayment).toBeGreaterThan(350); // Should include PMI and flood insurance
    });

    it('should calculate required escrow balance correctly', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.requiredEscrowBalance).toBeGreaterThan(0);
      expect(outputs.requiredEscrowBalance).toBe(4200); // 2 months of escrow payments + cushion
    });
  });

  describe('Escrow Analysis Report', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      const report = EscrowAnalysisCalculator.generateReport(inputs, outputs);
      
      expect(report).toContain('Escrow Analysis Report');
      expect(report).toContain('Monthly Escrow Payment');
      expect(report).toContain('Total Monthly Payment');
      expect(report).toContain('Escrow Account Status');
      expect(report).toContain('Recommendations');
    });

    it('should include projected payments analysis', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.projectedPayments).toBeDefined();
      expect(outputs.projectedPayments.length).toBeGreaterThan(0);
    });

    it('should include cost breakdown', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.costBreakdown).toBeDefined();
      expect(outputs.costBreakdown.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property tax', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '0',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '0',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.monthlyEscrowPayment).toBe(100); // Only insurance
    });

    it('should handle zero home insurance', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '0',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '1000',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '0',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.monthlyEscrowPayment).toBe(250); // Only property tax
    });

    it('should handle waived escrow account', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '0',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '0',
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'waived'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.monthlyEscrowPayment).toBe(0);
      expect(outputs.totalMonthlyPayment).toBe(1363); // Only principal and interest
    });

    it('should handle high escrow cushion', () => {
      const inputs = {
        propertyValue: '300000',
        loanAmount: '240000',
        interestRate: '5.5',
        loanTerm: '30',
        monthlyPayment: '1363',
        currentEscrowBalance: '5000',
        annualPropertyTax: '3000',
        annualHomeInsurance: '1200',
        propertyTaxPaymentFrequency: 'monthly',
        insurancePaymentFrequency: 'monthly',
        escrowCushion: '5000', // High cushion
        taxAssessmentIncrease: '2',
        insuranceRateIncrease: '3',
        analysisPeriod: '12',
        paymentHistory: 'current',
        escrowAccountType: 'required'
      };

      const outputs = calculateEscrowAnalysis(inputs);
      expect(outputs.requiredEscrowBalance).toBeGreaterThan(5000);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const propertyValueResult = validateAllEscrowAnalysisInputs({ propertyValue: '25000' });
      expect(propertyValueResult.isValid).toBe(false);
      expect(propertyValueResult.errors.some(e => e.includes('Property value'))).toBe(true);

      const validPropertyValueResult = validateAllEscrowAnalysisInputs({ propertyValue: '300000' });
      expect(validPropertyValueResult.errors.some(e => e.includes('Property value'))).toBe(false);
    });

    it('should handle optional fields', () => {
      const result = validateAllEscrowAnalysisInputs({ annualPMI: '' });
      expect(result.errors.some(e => e.includes('PMI'))).toBe(false);
    });

    it('should validate logical consistency in quick validation', () => {
      const result = validateAllEscrowAnalysisInputs({
        propertyValue: '300000',
        loanAmount: '350000'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('cannot exceed property value'))).toBe(true);
    });
  });
});
